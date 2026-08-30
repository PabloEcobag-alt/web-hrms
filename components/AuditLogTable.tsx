"use client";

import React, { useState, useMemo } from "react";
import { AppSelect } from "@/components/ui/app-select";

type Colors = {
  cardBg: string;
  cardBorder: string;
  rowDivider: string;
  headingText: string;
  bodyText: string;
  mutedText: string;
  colHeader: string;
  highSalary: string;
};

interface AuditLogTableProps {
  c: Colors;
  isDark: boolean;
  readOnly?: boolean;
}

interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  role: "manager" | "vp" | "employee";
  action: string;
  module: string;
}

const MOCK_AUDIT_LOGS: AuditLog[] = [
  { id: "1", timestamp: "2026-06-01 09:15:32", user: "Maria Garcia", role: "manager", action: "Approved leave request", module: "Attendance" },
  { id: "2", timestamp: "2026-06-01 08:45:10", user: "John Smith", role: "employee", action: "Submitted leave request", module: "Attendance" },
  { id: "3", timestamp: "2026-06-01 08:30:00", user: "David Chen", role: "employee", action: "Viewed payslip", module: "Payroll" },
  { id: "4", timestamp: "2026-05-31 17:20:45", user: "Maria Garcia", role: "manager", action: "Finalized payroll", module: "Payroll" },
  { id: "5", timestamp: "2026-05-31 16:55:22", user: "Sarah Johnson", role: "employee", action: "Updated shift schedule", module: "Attendance" },
  { id: "6", timestamp: "2026-05-31 14:10:15", user: "Robert Wilson", role: "vp", action: "Viewed audit logs", module: "System" },
  { id: "7", timestamp: "2026-05-31 11:30:00", user: "Maria Garcia", role: "manager", action: "Override attendance log", module: "Attendance" },
  { id: "8", timestamp: "2026-05-31 10:15:33", user: "Emily Brown", role: "employee", action: "Downloaded payslip PDF", module: "Payroll" },
  { id: "9", timestamp: "2026-05-30 17:45:00", user: "David Chen", role: "employee", action: "Submitted cash advance", module: "Payroll" },
  { id: "10", timestamp: "2026-05-30 15:20:12", user: "Maria Garcia", role: "manager", action: "Updated employee profile", module: "201 File" },
  { id: "11", timestamp: "2026-05-30 14:00:00", user: "Robert Wilson", role: "vp", action: "Reviewed recruitment pipeline", module: "Recruitment" },
  { id: "12", timestamp: "2026-05-30 09:30:45", user: "John Smith", role: "employee", action: "Viewed shift calendar", module: "Attendance" },
];

const MODULES = ["All", "Attendance", "Payroll", "201 File", "Recruitment", "System"];
const ACTIONS = ["All", "Viewed", "Submitted", "Approved", "Rejected", "Updated", "Finalized", "Downloaded", "Override"];
const ROLES = ["All", "manager", "vp", "employee"];

export default function AuditLogTable({ c, isDark, readOnly = false }: AuditLogTableProps) {
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedAction, setSelectedAction] = useState("All");
  const [selectedModule, setSelectedModule] = useState("All");
  const [selectedRole, setSelectedRole] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredLogs = useMemo(() => {
    return MOCK_AUDIT_LOGS.filter((log) => {
      if (selectedUser && !log.user.toLowerCase().includes(selectedUser.toLowerCase())) return false;
      if (selectedAction !== "All" && !log.action.toLowerCase().includes(selectedAction.toLowerCase())) return false;
      if (selectedModule !== "All" && log.module !== selectedModule) return false;
      if (selectedRole !== "All" && log.role !== selectedRole) return false;
      if (dateRange.start && log.timestamp < dateRange.start) return false;
      if (dateRange.end && log.timestamp > dateRange.end + " 23:59:59") return false;
      return true;
    });
  }, [dateRange, selectedUser, selectedAction, selectedModule, selectedRole]);

  const paginatedLogs = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredLogs.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredLogs, currentPage]);

  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage);

  const handleExportExcel = () => {
    console.log("Exporting audit logs to Excel");
  };

  const uniqueUsers = useMemo(() => {
    return Array.from(new Set(MOCK_AUDIT_LOGS.map((log) => log.user))).sort();
  }, []);

  return (
    <div className="rounded-xl border overflow-hidden" style={{ background: c.cardBg, borderColor: c.cardBorder }}>
      <div className="p-3 md:p-5 border-b flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3" style={{ borderColor: c.cardBorder }}>
        <div>
          <h2 className="text-base md:text-lg font-semibold m-0" style={{ color: c.headingText }}>Audit Log</h2>
          <p className="text-xs md:text-sm mt-1" style={{ color: c.mutedText }}>
            Track system activities and user actions
          </p>
        </div>
        {!readOnly && (
          <button
            onClick={handleExportExcel}
            className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5"
          >
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export to Excel
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="p-3 md:p-4 border-b" style={{ borderColor: c.cardBorder }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
          <div>
            <label className="block text-xs font-medium mb-1.5" style={{ color: c.headingText }}>Date Range</label>
            <div className="flex gap-2">
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                className="w-full px-2 py-1.5 rounded-lg border text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{ background: isDark ? "#1d2939" : "#ffffff", borderColor: c.cardBorder, color: c.bodyText }}
              />
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                className="w-full px-2 py-1.5 rounded-lg border text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{ background: isDark ? "#1d2939" : "#ffffff", borderColor: c.cardBorder, color: c.bodyText }}
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium mb-1.5" style={{ color: c.headingText }}>User</label>
            <AppSelect
              value={selectedUser}
              onValueChange={setSelectedUser}
              options={[{ value: "", label: "All Users" }, ...uniqueUsers.map((user) => ({ value: user, label: user }))]}
              placeholder="All Users"
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1.5" style={{ color: c.headingText }}>Action</label>
            <AppSelect
              value={selectedAction}
              onValueChange={setSelectedAction}
              options={ACTIONS.map((action) => ({ value: action, label: action }))}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1.5" style={{ color: c.headingText }}>Module</label>
            <AppSelect
              value={selectedModule}
              onValueChange={setSelectedModule}
              options={MODULES.map((module) => ({ value: module, label: module }))}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1.5" style={{ color: c.headingText }}>Role</label>
            <AppSelect
              value={selectedRole}
              onValueChange={setSelectedRole}
              options={ROLES.map((role) => ({ value: role, label: role }))}
              className="w-full"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={() => {
                setDateRange({ start: "", end: "" });
                setSelectedUser("");
                setSelectedAction("All");
                setSelectedModule("All");
                setSelectedRole("All");
                setCurrentPage(1);
              }}
              className="w-full px-3 py-1.5 rounded-lg text-xs font-medium"
              style={{ border: `1px solid ${c.cardBorder}`, color: c.bodyText, background: isDark ? "#1d2939" : "#ffffff" }}
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${c.cardBorder}` }}>
              {["TIMESTAMP", "USER", "ROLE", "ACTION", "MODULE"].map((col) => (
                <th key={col} style={{
                  padding: "10px 12px",
                  textAlign: "left",
                  fontSize: 10,
                  fontWeight: 700,
                  color: c.colHeader,
                  letterSpacing: "0.07em",
                  whiteSpace: "nowrap",
                }}>
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedLogs.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ padding: "16px 12px", textAlign: "center", color: c.mutedText, fontSize: 12 }}>
                  No audit logs found matching the filters.
                </td>
              </tr>
            ) : (
              paginatedLogs.map((log, idx) => (
                <tr key={log.id} style={{
                  borderBottom: idx < paginatedLogs.length - 1 ? `1px solid ${c.rowDivider}` : "none",
                  background: c.cardBg,
                }}>
                  <td style={{ padding: "12px", color: c.bodyText, fontSize: 11 }}>{log.timestamp}</td>
                  <td style={{ padding: "12px", fontWeight: 600, color: c.headingText, fontSize: 11 }}>{log.user}</td>
                  <td style={{ padding: "12px" }}>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium" style={{
                      background: c.cardBorder + "20",
                      color: c.bodyText,
                    }}>
                      {log.role}
                    </span>
                  </td>
                  <td style={{ padding: "12px", color: c.bodyText, fontSize: 11 }}>{log.action}</td>
                  <td style={{ padding: "12px" }}>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium" style={{
                      background: c.highSalary + "15",
                      color: c.highSalary,
                    }}>
                      {log.module}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="p-3 md:p-4 border-t flex items-center justify-between" style={{ borderColor: c.cardBorder }}>
          <span className="text-xs" style={{ color: c.mutedText }}>
            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredLogs.length)} of {filteredLogs.length} entries
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1.5 rounded-lg text-xs font-medium disabled:opacity-50"
              style={{ border: `1px solid ${c.cardBorder}`, color: c.bodyText, background: isDark ? "#1d2939" : "#ffffff" }}
            >
              Previous
            </button>
            <span className="text-xs font-medium" style={{ color: c.headingText }}>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 rounded-lg text-xs font-medium disabled:opacity-50"
              style={{ border: `1px solid ${c.cardBorder}`, color: c.bodyText, background: isDark ? "#1d2939" : "#ffffff" }}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
