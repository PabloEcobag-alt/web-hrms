"use client";

import type { Employee } from "./types";
import type { Colors } from "./utils";
import { AVATAR_STYLES } from "./constants";
import { SideInput, SideSelect } from "./editFields";
import {
  EDIT_POSITIONS,
  EDIT_STATUSES,
  EDIT_ROLES,
  EDIT_LOCATIONS,
  EDIT_SUPERVISORS,
} from "./editEmployeeConstants";

interface EmployeeEditSidebarProps {
  c: Colors;
  employee: Employee;
  editData: any;
  setEditData: (data: any) => void;
  progressPercent: number;
  submittedRequiredCount: number;
  requiredCount: number;
  onSave: () => void;
}

/** Left sidebar of the Employee Edit modal: avatar, profile form, progress. */
export function EmployeeEditSidebar({
  c,
  employee,
  editData,
  setEditData,
  progressPercent,
  submittedRequiredCount,
  requiredCount,
  onSave,
}: EmployeeEditSidebarProps) {
  const avatar = AVATAR_STYLES[employee.avatarIndex % AVATAR_STYLES.length];

  return (
    <div className="w-full sm:w-[280px] flex-shrink-0 border-r flex flex-col" style={{ borderColor: c.cardBorder, background: "#f8fafc" }}>
      <div className="p-6 flex flex-col items-center border-b" style={{ borderColor: c.cardBorder }}>
        <div className="relative group cursor-pointer">
          <div style={{
            width: 88, height: 88, borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: 700, fontSize: 32,
            background: avatar.bg, color: avatar.color,
            boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
          }}>
            {employee.initials}
          </div>
          <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="white"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          </div>
        </div>

        <div className="w-full mt-4 flex gap-2">
          <SideInput placeholder="First Name" value={editData.firstName} onChange={(e: any) => setEditData({ ...editData, firstName: e.target.value })} c={c} />
          <SideInput placeholder="Last Name" value={editData.lastName} onChange={(e: any) => setEditData({ ...editData, lastName: e.target.value })} c={c} />
        </div>
        <div className="w-full mt-3 flex gap-2">
          <SideSelect value={editData.position} onChange={(e: any) => setEditData({ ...editData, position: e.target.value })} options={EDIT_POSITIONS} c={c} />
        </div>
        <div className="w-full mt-2 flex justify-center">
          <SideSelect value={editData.status} onChange={(e: any) => setEditData({ ...editData, status: e.target.value })} options={EDIT_STATUSES} c={c} />
        </div>
        <div className="w-full mt-2 flex justify-center">
          <SideSelect value={editData.role} onChange={(e: any) => setEditData({ ...editData, role: e.target.value })} options={EDIT_ROLES} c={c} />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 hidden sm:block">
        <div className="space-y-3">
          <h4 className="text-[11px] font-bold uppercase tracking-wider mb-2" style={{ color: c.mutedText }}>Employee Information</h4>

          <SideInput label="Email" value={editData.email} onChange={(e: any) => setEditData({ ...editData, email: e.target.value })} c={c} />
          <SideInput label="Phone Number" value={editData.phone} onChange={(e: any) => setEditData({ ...editData, phone: e.target.value })} c={c} />
          <SideInput label="Date of Birth" type="date" value={editData.dateOfBirth} onChange={(e: any) => setEditData({ ...editData, dateOfBirth: e.target.value })} c={c} />
          <SideSelect label="Location" value={editData.location} onChange={(e: any) => setEditData({ ...editData, location: e.target.value })} options={EDIT_LOCATIONS} c={c} />
          <SideSelect label="Supervisor" value={editData.supervisor} onChange={(e: any) => setEditData({ ...editData, supervisor: e.target.value })} options={EDIT_SUPERVISORS} c={c} />

          <div className="pt-3 mt-1 border-t" style={{ borderColor: c.cardBorder }}>
            <h4 className="text-[11px] font-bold uppercase tracking-wider mb-2" style={{ color: c.mutedText }}>Emergency Contact</h4>
            <div className="space-y-2">
              <SideInput placeholder="Name" value={editData.emergencyContactName} onChange={(e: any) => setEditData({ ...editData, emergencyContactName: e.target.value })} c={c} />
              <SideInput placeholder="Phone Number" value={editData.emergencyContactPhone} onChange={(e: any) => setEditData({ ...editData, emergencyContactPhone: e.target.value })} c={c} />
            </div>
          </div>

          <div className="mt-4 pt-2">
            <button
              onClick={onSave}
              className="w-full py-2.5 bg-black hover:bg-black/90 text-white font-bold text-sm rounded-lg transition-colors shadow-xs focus:outline-none"
            >
              Save Profile
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 border-t" style={{ borderColor: c.cardBorder, background: "#f1f5f9" }}>
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: c.headingText }}>File Completeness</span>
          <span className="text-[10px] font-bold text-foreground">{progressPercent}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
          <div className="bg-primary h-full rounded-full transition-all duration-500 ease-out" style={{ width: `${progressPercent}%` }}></div>
        </div>
        <p className="text-[10px] mt-1.5 font-medium" style={{ color: c.mutedText }}>{submittedRequiredCount} of {requiredCount} required documents</p>
      </div>
    </div>
  );
}
