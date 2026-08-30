// Pure business-logic helpers for the User Management feature.
// Extracted from ViewUserManagement to keep the view component lean.

import type { AppAccessRequest, UserReadDto } from "@/lib/services";
import type { RoleAssignments, EmployeeProfileDto, TabKey } from "./types";
import {
  APP_OPTIONS,
  MASTER_MODULE_MAPPING,
  EMPLOYEE_PERMISSION_TEMPLATES,
} from "./constants";

const LOCATION_MAP: Record<string, number> = {
  "Marigman Main": 1,
  "Antipolo Cathedral": 2,
  "Commissary": 3,
  "Bazaar": 4,
};

/**
 * Restrict/normalize the list of selected apps for a given role.
 * Employees can only access a subset and always get hr-management as a parent.
 */
export function sanitizeAppPayload(apps: string[], userRole: string): string[] {
  if (userRole === "Employee") {
    const allowedApps = apps.filter(
      (app) => !["recruitment-hiring", "user-management"].includes(app)
    );
    if (
      !allowedApps.includes("hr-management") &&
      apps.some((app) =>
        ["digital-201-file", "attendance-biometrics", "payroll-deduction"].includes(app)
      )
    ) {
      allowedApps.push("hr-management");
    }
    return allowedApps;
  }
  return apps;
}

/**
 * Derive POS/SCMS role assignments from an existing user's AppAccesses.
 */
export function parseRoleAssignments(user: any): RoleAssignments {
  const result: RoleAssignments = {};
  const posAccess = user?.AppAccesses?.find((a: any) => a.appName === "point-of-sale");
  if (posAccess) {
    result.pos = {
      branchLocation: posAccess.branchLocation || "",
      branchRole: posAccess.subRole || "",
    };
  }
  const scmsAccess = user?.AppAccesses?.find((a: any) => a.appName === "supply-chain");
  if (scmsAccess) {
    result.scms = { role: scmsAccess.subRole || "" };
  }
  return result;
}

/** Default apps a role is allowed to access. */
export function getAppRestrictions(role: string): string[] {
  switch (role) {
    case "Employee":
      return ["digital-201-file", "attendance-biometrics", "payroll-deduction"];
    case "Manager":
      return ["hr-management", "digital-201-file", "attendance-biometrics", "payroll-deduction"];
    case "Admin":
      return APP_OPTIONS.map((app) => app.key);
    default:
      return [];
  }
}

/**
 * Build the AppAccessRequest[] payload for register/update calls.
 * `role` decides permission templates, `selectedApps` is the full selection
 * used to derive employee HR sub-modules, and `roleAssignments` supplies
 * POS/SCMS location + sub-role details.
 */
export function buildAppAccesses(
  apps: string[],
  role: string,
  selectedApps: string[],
  roleAssignments: RoleAssignments,
  stripAdminModules = false
): AppAccessRequest[] {
  const result = sanitizeAppPayload(apps, role).map((appKey) => {
    let permissions;
    if (role === "Employee") {
      if (appKey === "hr-management") {
        permissions = { canRead: true, canWrite: false, canDelete: false, canExport: true };
      } else {
        permissions = EMPLOYEE_PERMISSION_TEMPLATES[appKey] || EMPLOYEE_PERMISSION_TEMPLATES.default;
      }
    } else {
      permissions = { canRead: true, canWrite: true, canDelete: true, canExport: true };
    }

    return {
      appName: appKey,
      modules: (() => {
        if (role === "Employee" && appKey === "hr-management") {
          const employeeModules = [];
          if (selectedApps.includes("digital-201-file")) {
            employeeModules.push({ moduleName: "digital-201-file", canRead: true, canWrite: true, canDelete: false, canExport: true });
          }
          if (selectedApps.includes("attendance-biometrics")) {
            employeeModules.push({ moduleName: "attendance-biometrics", canRead: true, canWrite: false, canDelete: false, canExport: true });
          }
          if (selectedApps.includes("payroll-deduction")) {
            employeeModules.push({ moduleName: "payroll-deduction", canRead: true, canWrite: false, canDelete: false, canExport: true });
          }
          return employeeModules;
        }
        const childModules = MASTER_MODULE_MAPPING[appKey] || MASTER_MODULE_MAPPING["default"];
        return childModules.map((moduleName) => ({ moduleName, ...permissions }));
      })(),
      locationId:
        appKey === "point-of-sale" && roleAssignments.pos
          ? LOCATION_MAP[roleAssignments.pos.branchLocation ?? ""]
          : undefined,
      subRole:
        appKey === "point-of-sale"
          ? roleAssignments.pos?.branchRole
          : appKey === "supply-chain"
          ? roleAssignments.scms?.role
          : undefined,
    };
  });

  // For Employee role, strip admin-only sub-modules.
  if (stripAdminModules) {
    result.forEach((appAccess) => {
      appAccess.modules = appAccess.modules.filter(
        (module) => module.moduleName !== "user-management" && module.moduleName !== "recruitment-hiring"
      );
    });
  }

  return result;
}

/**
 * Build a multipart FormData payload mirroring an existing HRMS employee
 * profile, overriding Position/AssignedLocation from the edited role
 * assignments.
 */
export function buildHrmsFormData(
  hrmsEmployeeData: EmployeeProfileDto,
  editApps: string[],
  editRoleAssignments: RoleAssignments
): FormData {
  const form = new FormData();
  form.append("FirstName", hrmsEmployeeData.FirstName);
  form.append("MiddleName", hrmsEmployeeData.MiddleName);
  form.append("LastName", hrmsEmployeeData.LastName);
  form.append("DateOfBirth", hrmsEmployeeData.DateOfBirth);
  form.append("DateHired", hrmsEmployeeData.DateHired);
  form.append("Status", hrmsEmployeeData.Status);
  form.append("Email", hrmsEmployeeData.Email);
  form.append("PhoneNumber", hrmsEmployeeData.PhoneNumber);
  form.append("EmergencyContactName", hrmsEmployeeData.EmergencyContactName);
  form.append("EmergencyContactPhone", hrmsEmployeeData.EmergencyContactPhone);
  form.append("EmergencyContactAddress", hrmsEmployeeData.EmergencyContactAddress);
  form.append("EmergencyContactRelationship", hrmsEmployeeData.EmergencyContactRelationship);
  form.append("SSS", hrmsEmployeeData.SSS);
  form.append("PhilHealth", hrmsEmployeeData.PhilHealth);
  form.append("PagIbig", hrmsEmployeeData.PagIbig);
  form.append("TIN", hrmsEmployeeData.TIN);
  form.append("NbiClearanceDate", hrmsEmployeeData.NbiClearanceDate);
  form.append("BarangayClearanceDate", hrmsEmployeeData.BarangayClearanceDate);
  form.append("BankDetails", hrmsEmployeeData.BankDetails);
  form.append("UniformIssued", (hrmsEmployeeData.UniformIssued ?? false).toString());
  form.append("CompanyIdIssued", (hrmsEmployeeData.CompanyIdIssued ?? false).toString());
  form.append("CompanyIdNumber", hrmsEmployeeData.CompanyIdNumber);
  form.append("EquipmentIssued", hrmsEmployeeData.EquipmentIssued);
  form.append("CheckedBy", hrmsEmployeeData.CheckedBy);
  form.append("CheckedDate", hrmsEmployeeData.CheckedDate);
  form.append("Remarks", hrmsEmployeeData.Remarks);

  if (editApps.includes("point-of-sale")) {
    form.append("Position", editRoleAssignments.pos?.branchRole || hrmsEmployeeData.Position);
    form.append("AssignedLocation", editRoleAssignments.pos?.branchLocation || hrmsEmployeeData.AssignedLocation);
  } else if (editApps.includes("supply-chain")) {
    form.append("Position", editRoleAssignments.scms?.role || hrmsEmployeeData.Position);
    form.append("AssignedLocation", hrmsEmployeeData.AssignedLocation);
  }

  return form;
}

export interface TabData {
  tabUsers: UserReadDto[];
  title: string;
  subtitle: string;
  usersByRole?: Record<string, UserReadDto[]>;
  usersByStatus?: Record<string, UserReadDto[]>;
}

/**
 * Filter users by search query and derive the active-tab title/subtitle and
 * any role/status groupings.
 */
export function getTabData(
  users: UserReadDto[],
  searchQuery: string,
  activeTab: TabKey
): TabData {
  const filteredUsers = users.filter((user) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      user.FirstName?.toLowerCase().includes(query) ||
      user.LastName?.toLowerCase().includes(query) ||
      user.Email?.toLowerCase().includes(query) ||
      user.Username?.toLowerCase().includes(query)
    );
  });

  switch (activeTab) {
    case "role": {
      const usersByRole = filteredUsers.reduce((acc, user) => {
        const r = user.Role || "Employee";
        if (!acc[r]) acc[r] = [];
        acc[r].push(user);
        return acc;
      }, {} as Record<string, UserReadDto[]>);
      return {
        tabUsers: filteredUsers,
        title: "Users by Role",
        subtitle: "Users organized by their assigned roles",
        usersByRole,
      };
    }
    case "status": {
      const usersByStatus = filteredUsers.reduce((acc, user) => {
        const status = user.Status || "Active";
        if (!acc[status]) acc[status] = [];
        acc[status].push(user);
        return acc;
      }, {} as Record<string, UserReadDto[]>);
      return {
        tabUsers: filteredUsers,
        title: "Users by Status",
        subtitle: "Users organized by their current status",
        usersByStatus,
      };
    }
    default:
      return {
        tabUsers: filteredUsers,
        title: "All Users",
        subtitle: `Complete list of ${filteredUsers.length} users in the system`,
      };
  }
}
