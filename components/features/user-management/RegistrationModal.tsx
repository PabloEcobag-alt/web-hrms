"use client";

import React from "react";
import { AppSelect } from "@/components/ui/app-select";
import type { UnregisteredEmployeeDto, RoleAssignments } from "./types";
import type { Colors } from "./utils";
import { APP_OPTIONS } from "./constants";

interface RegistrationModalProps {
  isDark: boolean;
  c: Colors;
  submitting: boolean;
  selectedEmployee: UnregisteredEmployeeDto | null;
  unregisteredEmployees: UnregisteredEmployeeDto[];
  role: string;
  selectedApps: string[];
  userType: string;
  roleAssignments: RoleAssignments;
  editStatus: "Active" | "Deactivated";
  onClose: () => void;
  onSelectEmployee: (employee: UnregisteredEmployeeDto | null) => void;
  onRoleChange: (role: string) => void;
  onSelectAllApps: () => void;
  onToggleApp: (appKey: string) => void;
  onUserTypeChange: (type: string) => void;
  onRoleAssignmentsChange: React.Dispatch<React.SetStateAction<RoleAssignments>>;
  onSubmit: (e?: React.FormEvent<HTMLFormElement>) => void;
  onRequestConfirm: () => void;
}

/**
 * Employee Registration modal extracted from ViewUserManagement.
 */
export function RegistrationModal({
  isDark,
  c,
  submitting,
  selectedEmployee,
  unregisteredEmployees,
  role,
  selectedApps,
  userType,
  roleAssignments,
  editStatus,
  onClose,
  onSelectEmployee,
  onRoleChange,
  onSelectAllApps,
  onToggleApp,
  onUserTypeChange,
  onRoleAssignmentsChange,
  onSubmit,
  onRequestConfirm,
}: RegistrationModalProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-[9999] p-4" style={{ background: "rgba(0,0,0,0.5)" }}>
      <div className="rounded-xl w-full max-w-lg p-4 md:p-6" style={{ background: c.cardBg, border: `1px solid ${c.cardBorder}` }}>
        <div className="flex items-start justify-between mb-4">
          <h2 className="text-lg font-bold m-0" style={{ color: c.headingText }}>Employee Registration</h2>
          <button onClick={onClose} className="p-1 rounded-lg" style={{ color: c.bodyText }}>
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-3 mb-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="employee-select" className="text-xs font-medium" style={{ color: c.headingText }}>Select Employee</label>
            <AppSelect
              id="employee-select"
              value={selectedEmployee?.employeeId ? String(selectedEmployee.employeeId) : ""}
              onValueChange={(v) => {
                const employee = unregisteredEmployees.find(emp => emp.employeeId === Number.parseInt(v));
                onSelectEmployee(employee || null);
              }}
              placeholder="Choose an employee..."
              className="w-full"
              options={[
                { value: "", label: "Choose an employee..." },
                ...unregisteredEmployees.map(emp => ({
                  value: String(emp.employeeId),
                  label: `${`${emp.firstName} ${emp.lastName}`.trim() || "Unknown Name"}${emp.position ? ` - ${emp.position}` : ""}${emp.department ? ` (${emp.department})` : ""}`,
                })),
              ]}
            />
          </div>

          {selectedEmployee && (
            <div className="p-3 rounded-lg border" style={{ borderColor: c.cardBorder, background: isDark ? "#1a2535" : "#f8fafc" }}>
              <h4 className="text-xs font-semibold mb-2" style={{ color: c.headingText }}>Employee Details</h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span style={{ color: c.mutedText }}>Name:</span>
                  <div style={{ color: c.bodyText, fontWeight: 500 }}>
                    {`${selectedEmployee.firstName} ${selectedEmployee.lastName}`.trim() || "Unknown Name"}
                  </div>
                </div>
                <div>
                  <span style={{ color: c.mutedText }}>Email:</span>
                  <div style={{ color: c.bodyText, fontWeight: 500 }}>
                    {selectedEmployee.emailAddress || "No email"}
                  </div>
                </div>
                <div>
                  <span style={{ color: c.mutedText }}>Position:</span>
                  <div style={{ color: c.bodyText, fontWeight: 500 }}>
                    {selectedEmployee.position || "No position"}
                  </div>
                </div>
                <div>
                  <span style={{ color: c.mutedText }}>Department:</span>
                  <div style={{ color: c.bodyText, fontWeight: 500 }}>
                    {selectedEmployee.department || "No department"}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-1">
            <label htmlFor="system-role" className="text-xs font-medium" style={{ color: c.headingText }}>System Role</label>
            <AppSelect
              id="system-role"
              value={role}
              onValueChange={onRoleChange}
              className="w-full"
              options={[
                { value: "Admin", label: "Admin" },
                { value: "Manager", label: "Manager" },
                { value: "Employee", label: "Employee" },
              ]}
            />
          </div>
          {selectedApps.includes("point-of-sale") && (
            <div className="space-y-3 p-3 rounded-lg border" style={{ borderColor: c.cardBorder, background: isDark ? "#1a2535" : "#f8fafc" }}>
              <h4 className="text-xs font-semibold" style={{ color: c.headingText }}>POS Configuration</h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label htmlFor="branch-location" className="text-xs font-medium" style={{ color: c.headingText }}>Branch Location</label>
                  <AppSelect
                    id="branch-location"
                    value={roleAssignments.pos?.branchLocation || ""}
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
                  <label htmlFor="branch-role" className="text-xs font-medium" style={{ color: c.headingText }}>Branch Role</label>
                  <AppSelect
                    id="branch-role"
                    value={roleAssignments.pos?.branchRole || ""}
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

          {selectedApps.includes("supply-chain") && (
            <div className="space-y-3 p-3 rounded-lg border" style={{ borderColor: c.cardBorder, background: isDark ? "#1a2535" : "#f8fafc" }}>
              <h4 className="text-xs font-semibold" style={{ color: c.headingText }}>SCMS Configuration</h4>
              <div className="flex flex-col gap-1">
                <label htmlFor="scms-role" className="text-xs font-medium" style={{ color: c.headingText }}>SCMS Role</label>
                <AppSelect
                  id="scms-role"
                  value={roleAssignments.scms?.role || ""}
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
            {role === "Admin" && (
              <div className="flex items-center gap-2">
                <label className="flex items-center gap-1.5 px-2 py-1 rounded-lg border text-xs cursor-pointer" style={{ borderColor: c.cardBorder, color: c.bodyText, background: selectedApps.length === APP_OPTIONS.length ? c.bannerBg : "transparent" }}>
                  <input
                    type="checkbox"
                    checked={selectedApps.length === APP_OPTIONS.length}
                    onChange={onSelectAllApps}
                    className="w-3.5 h-3.5"
                  />
                  Select All Apps
                </label>
              </div>
            )}
            <div className="flex flex-wrap gap-2">
              {APP_OPTIONS.map((app) => {
                const isRestricted = role === "Employee" && ["hr-management", "recruitment-hiring"].includes(app.key);
                const isInactiveUser = editStatus === "Deactivated";
                const isDisabled = isRestricted || isInactiveUser;

                return (
                  <label
                    key={app.key}
                    className={`flex items-center gap-1.5 px-2 py-1 rounded-lg border text-xs ${
                      isDisabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
                    }`}
                    style={{
                      borderColor: c.cardBorder,
                      color: isDisabled ? c.mutedText : c.bodyText,
                      background: selectedApps.includes(app.key) ? c.bannerBg : "transparent"
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={selectedApps.includes(app.key)}
                      onChange={() => !isDisabled && onToggleApp(app.key)}
                      disabled={isDisabled}
                      className="w-3.5 h-3.5"
                    />
                    {app.label}
                    {isRestricted && (
                      <span className="text-xs" style={{ color: c.mutedText }}>
                        (Admin only)
                      </span>
                    )}
                  </label>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium" style={{ color: c.headingText }}>User Type</label>
            <AppSelect
              value={userType}
              onValueChange={onUserTypeChange}
              className="w-full"
              options={[
                { value: "Internal", label: "Internal" },
                { value: "Customer", label: "Customer" },
              ]}
            />
          </div>

          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-3 py-1.5 rounded-lg text-xs font-medium" style={{ border: `1px solid ${c.cardBorder}`, color: c.bodyText, background: isDark ? "#1d2939" : "#ffffff" }}>Cancel</button>
            <button
              type="button"
              onClick={onRequestConfirm}
              disabled={submitting || !selectedEmployee || selectedApps.length === 0 || !role}
              className="px-3 py-1.5 bg-black hover:bg-black/90 text-white rounded-lg text-xs font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? "Registering…" : "Register Employee"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
