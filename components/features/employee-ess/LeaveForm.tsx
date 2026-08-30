"use client";

import { useState } from "react";
import { AppSelect } from "@/components/ui/app-select";
import type { ESSProps, LeaveStatus } from "./types";
import { LEAVE_TYPES, TOTAL_LEAVE_CREDITS } from "./constants";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";

export function LeaveForm({ c, isDark }: ESSProps) {
  const [leaveType, setLeaveType] = useState(LEAVE_TYPES[0]);
  const [leaveDate, setLeaveDate] = useState("");
  const [reason, setReason] = useState("");
  const [status, setStatus] = useState<LeaveStatus | null>(null);
  const [usedCredits, setUsedCredits] = useState(4);
  const [error, setError] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);

  const remaining = TOTAL_LEAVE_CREDITS - usedCredits;

  const statusColor = (s: LeaveStatus) =>
    s === "Approved" ? c.onTime : s === "Rejected" ? c.late : c.earlyOut;

  const requestSubmit = () => {
    if (!reason.trim()) {
      setError("Reason is required.");
      return;
    }
    if (!leaveDate) {
      setError("Leave date is required.");
      return;
    }
    setError("");
    setConfirmOpen(true);
  };

  const handleSubmit = () => {
    setStatus("Pending Approval");
    setUsedCredits((u) => Math.min(TOTAL_LEAVE_CREDITS, u + 1));
    console.log("Leave request submitted:", { leaveType, leaveDate, reason });
  };

  return (
    <div className="rounded-xl border p-3 md:p-5" style={{ background: c.cardBg, borderColor: c.cardBorder }}>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base md:text-lg font-semibold m-0" style={{ color: c.headingText }}>Leave Application</h2>
        <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ background: c.onTime + "20", color: c.onTime }}>
          {remaining} / {TOTAL_LEAVE_CREDITS} credits left
        </span>
      </div>

      <div className="flex flex-col gap-3">
        <div>
          <label className="block text-xs font-medium mb-1.5" style={{ color: c.headingText }}>Leave Type</label>
          <AppSelect
            value={leaveType}
            onValueChange={setLeaveType}
            options={LEAVE_TYPES.map((t) => ({ value: t, label: t }))}
            className="w-full"
            triggerClassName="text-xs md:text-sm py-2"
          />
        </div>

        <div>
          <label className="block text-xs font-medium mb-1.5" style={{ color: c.headingText }}>Leave Date <span style={{ color: c.late }}>*</span></label>
          <input
            type="date"
            value={leaveDate}
            onChange={(e) => setLeaveDate(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            style={{ background: isDark ? "#1d2939" : "#ffffff", borderColor: error && !leaveDate ? c.late : c.cardBorder, color: c.bodyText }}
          />
        </div>

        <div>
          <label className="block text-xs font-medium mb-1.5" style={{ color: c.headingText }}>Reason <span style={{ color: c.late }}>*</span></label>
          <textarea
            rows={3}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Provide the reason for your leave..."
            className="w-full px-3 py-2 rounded-lg border text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            style={{ background: isDark ? "#1d2939" : "#ffffff", borderColor: error ? c.late : c.cardBorder, color: c.bodyText }}
          />
          {error && <p className="text-xs mt-1" style={{ color: c.late }}>{error}</p>}
        </div>

        <div className="flex items-center justify-between">
          {status ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold" style={{ background: statusColor(status) + "20", color: statusColor(status) }}>
              <div className="w-2 h-2 rounded-full" style={{ background: statusColor(status) }} />
              {status}
            </span>
          ) : <span />}
          <button
            onClick={requestSubmit}
            className="px-4 py-2 bg-black hover:bg-black/90 text-white rounded-lg text-xs font-medium transition-colors"
          >
            Submit Leave Request
          </button>
        </div>
      </div>

      <ConfirmDialog
        open={confirmOpen}
        title="Submit leave request?"
        description="This will submit your leave application for approval."
        confirmLabel="Submit Request"
        cancelLabel="Cancel"
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => { setConfirmOpen(false); handleSubmit(); }}
      />
    </div>
  );
}
