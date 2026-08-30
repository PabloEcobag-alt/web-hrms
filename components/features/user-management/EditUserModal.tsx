"use client";

import React from "react";
import { AppSelect } from "@/components/ui/app-select";
import type { UserReadDto } from "@/lib/services";
import type { RoleAssignments, EmployeeProfileDto } from "./types";
import type { Colors } from "./utils";
import { APP_OPTIONS } from "./constants";

interface EditUserModalProps {
  isDark: boolean;
  c: Colors;
  editingUser: UserReadDto;
  hrmsEmployeeData: EmployeeProfileDto | null;
  editFirstName: string;
  editLastName: string;
  editEmail: string;
  editStatus: "Active" | "Deactivated";
  editApps: string[];
  editRole: string;
  editSubmitting: boolean;
  editRoleAssignments: RoleAssignments;
  onClose: () => void;
  onFirstNameChange: (value: string) => void;
  onLastNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onStatusChange: (value: "Active" | "Deactivated") => void;
  onRoleChange: (value: string) => void;
  onAppsChange: React.Dispatch<React.SetStateAction<string[]>>;
  onToggleApp: (appKey: string) => void;
  onRoleAssignmentsChange: React.Dispatch<React.SetStateAction<RoleAssignments>>;
  onRequestConfirm: () => void;
}

/**
 * Edit User modal extracted from ViewUserManagement.
 */
export function EditUserModal({
  isDark,
  c,
  editingUser,
  hrmsEmployeeData,
  editFirstName,
  editLastName,
  editEmail,
  editStatus,
  editApps,
  editRole,
  editSubmitting,
  editRoleAssignments,
  onClose,
  onFirstNameChange,
  onLastNameChange,
  onEmailChange,
  onStatusChange,
  onRoleChange,
  onAppsChange,
  onToggleApp,
  onRoleAssignmentsChange,
  onRequestConfirm,
}: EditUserModalProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-[9999] p-4" style={{ background: "rgba(0,0,0,0.5)" }}>
      <div className="rounded-xl w-full max-w-lg p-4 md:p-6" style={{ background: c.cardBg, border: `1px solid ${c.cardBorder}` }}>
        <div className="flex items-start justify-between mb-4">
          <h2 className="text-lg font-bold m-0" style={{ color: c.headingText }}>Edit User</h2>
          <button onClick={onClose} className="p-1 rounded-lg" style={{ color: c.bodyText }}>
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {hrmsEmployeeData && (
          <div className="p-3 rounded-lg border mb-4" style={{
            borderColor: c.cardBorder,
            background: isDark ? "#1a2535" : "#f8fafc"
          }}>
            <h4 className="text-xs font-semibold mb-2" style={{ color: c.headingText }}>
              Employee Details (Read-Only)
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span style={{ color: c.mutedText }}>Name:</span>
                <div style={{ color: c.bodyText, fontWeight: 500 }}>
                  {hrmsEmployeeData.FirstName} {hrmsEmployeeData.LastName}
                </div>
              </div>
              <div>
                <span style={{ color: c.mutedText }}>Email:</span>
                <div style={{ color: c.bodyText, fontWeight: 500 }}>
                  {hrmsEmployeeData.Email}
                </div>
              </div>
              <div>
                <span style={{ color: c.mutedText }}>Position:</span>
                <div style={{ color: c.bodyText, fontWeight: 500 }}>
                  {hrmsEmployeeData.Position}
                </div>
              </div>
              <div>
                <span style={{ color: c.mutedText }}>Department:</span>
                <div style={{ color: c.bodyText, fontWeight: 500 }}>
                  {hrmsEmployeeData.Department}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-3 mb-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium" style={{ color: c.headingText }}>First Name</label>
              <input type="text" value={editFirstName} onChange={(e) => onFirstNameChange(e.target.value)} className="w-full px-3 py-1.5 rounded-lg border text-xs focus:outline-none focus:ring-2 focus:ring-blue-500" style={{ background: isDark ? "#1d2939" : "#ffffff", borderColor: c.cardBorder, color: c.bodyText }} />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium" style={{ color: c.headingText }}>Last Name</label>
              <input type="text" value={editLastName} onChange={(e) => onLastNameChange(e.target.value)} className="w-full px-3 py-1.5 rounded-lg border text-xs focus:outline-none focus:ring-2 focus:ring-blue-500" style={{ background: isDark ? "#1d2939" : "#ffffff", borderColor: c.cardBorder, color: c.bodyText }} />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium" style={{ color: c.headingText }}>Email</label>
            <input type="email" value={editEmail} onChange={(e) => onEmailChange(e.target.value)} className="w-full px-3 py-1.5 rounded-lg border text-xs focus:outline-none focus:ring-2 focus:ring-blue-500" style={{ background: isDark ? "#1d2939" : "#ffffff", borderColor: c.cardBorder, color: c.bodyText }} />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium" style={{ color: c.mutedText }}>Username (Read-only)</label>
            <input type="text" value={editingUser.Username} disabled className="w-full px-3 py-1.5 rounded-lg border text-xs focus:outline-none" style={{ background: "#ffffff", borderColor: c.cardBorder, color: c.mutedText }} />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium" style={{ color: c.headingText }}>Role</label>
            <AppSelect
              value={editRole}
              onValueChange={(v) => {
                onRoleChange(v);
                // Auto-configure HRMS apps when role is Employee
                if (v === "Employee") {
                  const hrmsApps = ["hr-management", "digital-201-file", "attendance-biometrics", "payroll-deduction"];
                  onAppsChange(prev => {
                    const filtered = prev.filter(app => app !== "recruitment-hiring" && app !== "user-management");
                    hrmsApps.forEach(app => {
                      if (!filtered.includes(app)) filtered.push(app);
                    });
                    return filtered;
                  });
                }
              }}
              className="w-full"
              options={[
                { value: "Employee", label: "Employee" },
                { value: "Manager", label: "Manager" },
                { value: "Admin", label: "Admin" },
              ]}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium" style={{ color: c.headingText }}>Status</label>
            <AppSelect
              value={editStatus}
              onValueChange={(v) => onStatusChange(v as "Active" | "Deactivated")}
              className="w-full"
              options={[
                { value: "Active", label: "Active" },
                { value: "Deactivated", label: "Deactivated" },
              ]}
            />
          </div>
          {editApps.includes("point-of-sale") && (
            <div className="space-y-3 p-3 rounded-lg border" style={{ borderColor: c.cardBorder, background: isDark ? "#1a2535" : "#f8fafc" }}>
              <h4 className="text-xs font-semibold" style={{ color: c.headingText }}>POS Configuration</h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label htmlFor="edit-branch-location" className="text-xs font-medium" style={{ color: c.headingText }}>Branch Location</label>
                  <AppSelect
                    id="edit-branch-location"
                    value={editRoleAssignments.pos?.branchLocation || ""}
                    onValueChange={(v) => onRoleAssignmentsChange(prev => ({
                      ...prev,
                      pos: { ...prev.pos, branchLocation: v, branchRole: prev.pos?.branchRole || "" }
                    }))}
                    placeholder="Select Branch"
                    className="w-full"
                    options={[
                      { value: "", label: "Select Branch" },
                      { value: "Marigman Main", label: "Marigman Main" },
                      { value: "Antipolo Cathedral", label: "Antipolo Cathedral" },
                      { value: "Commissary", label: "Commissary" },
                      { value: "Bazaar", label: "Bazaar" },
                    ]}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="edit-branch-role" className="text-xs font-medium" style={{ color: c.headingText }}>Branch Role</label>
                  <AppSelect
                    id="edit-branch-role"
                    value={editRoleAssignments.pos?.branchRole || ""}
                    onValueChange={(v) => onRoleAssignmentsChange(prev => ({
                      ...prev,
                      pos: { ...prev.pos, branchRole: v, branchLocation: prev.pos?.branchLocation || "" }
                    }))}
                    placeholder="Select Role"
                    className="w-full"
                    options={[
                      { value: "", label: "Select Role" },
                      { value: "Cashier", label: "Cashier" },
                      { value: "Manager", label: "Manager" },
                      { value: "Admin", label: "Admin" },
                      { value: "Inventory Manager", label: "Inventory Manager" },
                      { value: "Order Manager", label: "Order Manager" },
                    ]}
                  />
                </div>
              </div>
            </div>
          )}

          {editApps.includes("supply-chain") && (
            <div className="space-y-3 p-3 rounded-lg border" style={{ borderColor: c.cardBorder, background: isDark ? "#1a2535" : "#f8fafc" }}>
              <h4 className="text-xs font-semibold" style={{ color: c.headingText }}>SCMS Configuration</h4>
              <div className="flex flex-col gap-1">
                <label htmlFor="edit-scms-role" className="text-xs font-medium" style={{ color: c.headingText }}>SCMS Role</label>
                <AppSelect
                  id="edit-scms-role"
                  value={editRoleAssignments.scms?.role || ""}
                  onValueChange={(v) => onRoleAssignmentsChange(prev => ({
                    ...prev,
                    scms: { role: v }
                  }))}
                  placeholder="Select SCMS Role"
                  className="w-full"
                  options={[
                    { value: "", label: "Select SCMS Role" },
                    { value: "QA/Inventory Manager", label: "QA/Inventory Manager" },
                    { value: "Head Cook", label: "Head Cook" },
                    { value: "Admin", label: "Admin" },
                  ]}
                />
              </div>
            </div>
          )}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium" style={{ color: c.headingText }}>Apps</label>
            {editingUser?.Role === "Admin" && (
              <div className="flex items-center gap-2">
                <label className="flex items-center gap-1.5 px-2 py-1 rounded-lg border text-xs cursor-pointer" style={{ borderColor: c.cardBorder, color: c.bodyText, background: editApps.length === APP_OPTIONS.length ? c.bannerBg : "transparent" }}>
                  <input
                    type="checkbox"
                    checked={editApps.length === APP_OPTIONS.length}
                    onChange={() => onAppsChange(APP_OPTIONS.map(app => app.key))}
                    className="w-3.5 h-3.5"
                  />
                  Select All Apps
                </label>
              </div>
            )}
            <div className="flex flex-wrap gap-2">
              {APP_OPTIONS.map((app) => {
                const isInactiveUser = editStatus === "Deactivated";
                const isRecruitmentForEmployee = editRole === "Employee" && app.key === "recruitment-hiring";
                const isDisabled = isInactiveUser || isRecruitmentForEmployee;

                return (
                  <label
                    key={app.key}
                    className={`flex items-center gap-1.5 px-2 py-1 rounded-lg border text-xs ${
                      isDisabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
                    }`}
                    style={{
                      borderColor: c.cardBorder,
                      color: isDisabled ? c.mutedText : c.bodyText,
                      background: editApps.includes(app.key) ? c.bannerBg : "transparent"
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={editApps.includes(app.key)}
                      onChange={() => !isDisabled && onToggleApp(app.key)}
                      disabled={isDisabled}
                      className="w-3.5 h-3.5"
                    />
                    {app.label}
                  </label>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-3 py-1.5 rounded-lg text-xs font-medium" style={{ border: `1px solid ${c.cardBorder}`, color: c.bodyText, background: isDark ? "#1d2939" : "#ffffff" }}>Cancel</button>
          <button
            onClick={onRequestConfirm}
            disabled={editSubmitting || !editFirstName.trim() || !editLastName.trim() || !editEmail.trim()}
            className="px-3 py-1.5 bg-black hover:bg-black/90 text-white rounded-lg text-xs font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {editSubmitting ? "Updating…" : "Update User"}
          </button>
        </div>
      </div>
    </div>
  );
}
