"use client";

import { useState } from "react";
import type { ESSProps } from "./types";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";

export function CashAdvanceForm({ c, isDark }: ESSProps) {
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");
  const [fileName, setFileName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
    console.log("Cash advance submitted:", { amount, reason, fileName });
  };

  return (
    <div className="rounded-xl border p-3 md:p-5" style={{ background: c.cardBg, borderColor: c.cardBorder }}>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base md:text-lg font-semibold m-0" style={{ color: c.headingText }}>Cash Advance Request</h2>
        {submitted && (
          <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ background: c.earlyOut + "20", color: c.earlyOut }}>
            Routed to Ma&apos;am Vira for review
          </span>
        )}
      </div>

      <div className="flex flex-col gap-3">
        <div>
          <label className="block text-xs font-medium mb-1.5" style={{ color: c.headingText }}>Custom Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="e.g., 5000"
            className="w-full px-3 py-2 rounded-lg border text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            style={{ background: isDark ? "#1d2939" : "#ffffff", borderColor: c.cardBorder, color: c.bodyText }}
          />
        </div>

        <div>
          <label className="block text-xs font-medium mb-1.5" style={{ color: c.headingText }}>Emergency Reason</label>
          <textarea
            rows={3}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Describe the emergency..."
            className="w-full px-3 py-2 rounded-lg border text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            style={{ background: isDark ? "#1d2939" : "#ffffff", borderColor: c.cardBorder, color: c.bodyText }}
          />
        </div>

        <div>
          <label className="block text-xs font-medium mb-1.5" style={{ color: c.headingText }}>Supporting Document</label>
          <label
            className="flex flex-col items-center justify-center gap-1 px-3 py-6 rounded-lg border-2 border-dashed cursor-pointer text-center"
            style={{ borderColor: c.cardBorder, background: isDark ? "#1d2939" : "#ffffff" }}
          >
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke={c.mutedText}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <span className="text-xs" style={{ color: c.mutedText }}>{fileName || "Click to upload a file"}</span>
            <input type="file" className="hidden" onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")} />
          </label>
        </div>

        <div className="flex justify-end">
          <button
            onClick={() => setConfirmOpen(true)}
            className="px-4 py-2 bg-black hover:bg-black/90 text-white rounded-lg text-xs font-medium transition-colors"
          >
            Submit Request
          </button>
        </div>
      </div>

      <ConfirmDialog
        open={confirmOpen}
        title="Submit cash advance request?"
        description="This will submit your cash advance request for review."
        confirmLabel="Submit Request"
        cancelLabel="Cancel"
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => { setConfirmOpen(false); handleSubmit(); }}
      />
    </div>
  );
}
