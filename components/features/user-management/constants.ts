// Static data for the User Management feature.

import type { ModulePermissions, TabKey } from "./types";

export const AVATAR_STYLES = [
  { bg: "#E6F1FB", color: "#185FA5" },
  { bg: "#FAEEDA", color: "#854F0B" },
  { bg: "#EAF3DE", color: "#3B6D11" },
  { bg: "#F1EFE8", color: "#5F5E5A" },
  { bg: "#FAEEDA", color: "#854F0B" },
];

export const ROLE_DISPLAY_MAP: Record<string, string> = {
  Admin: "Admin",
  Manager: "Manager",
  Employee: "Employee",
};

export const APP_OPTIONS = [
  { key: "hr-management", label: "HR Management" },
  { key: "recruitment-hiring", label: "Recruitment & Hiring" },
  { key: "digital-201-file", label: "Employee Information" },
  { key: "attendance-biometrics", label: "Attendance & Biometrics" },
  { key: "payroll-deduction", label: "Payroll & Deductions" },
  { key: "point-of-sale", label: "Point of Sale" },
  { key: "supply-chain", label: "Supply Chain" },
  { key: "customer-relation", label: "Customer Relation" },
];

export const MASTER_MODULE_MAPPING: Record<string, string[]> = {
  "hr-management": ["recruitment-hiring", "digital-201-file", "attendance-biometrics", "payroll-deduction", "user-management"],
  "point-of-sale": ["sales-processing", "order-management"],
  "supply-chain": ["resources-suppliers", "orders-procurement", "inventory", "production-quality", "distribution-analytics"],
  "customer-relation": ["customers", "marketing", "support"],
  "default": [],
};

export const EMPLOYEE_PERMISSION_TEMPLATES: Record<string, ModulePermissions> = {
  "digital-201-file": { canRead: true, canWrite: true, canDelete: false, canExport: false },
  "payroll-deduction": { canRead: true, canWrite: false, canDelete: false, canExport: true },
  "attendance-biometrics": { canRead: true, canWrite: true, canDelete: false, canExport: false },
  "default": { canRead: true, canWrite: false, canDelete: false, canExport: false },
};

export const tabs: { key: TabKey; label: string }[] = [
  { key: "all", label: "All Users" },
  { key: "role", label: "By Role" },
  { key: "status", label: "By Status" },
];
