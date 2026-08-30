"use client";

import { type Colors, type CutoffType, formatCurrency } from "./types";

interface FinalizeModalProps {
  c: Colors;
  isDark: boolean;
  cutoff: CutoffType;
  grandTotal: number;
  headcount: number;
  onClose: () => void;
  onConfirm: () => void;
}

/** Finalize payroll confirmation modal. */
export function FinalizeModal({ c, isDark, cutoff, grandTotal, headcount, onClose, onConfirm }: FinalizeModalProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-[9999] p-4" style={{ background: "rgba(0,0,0,0.5)" }}>
      <div className="rounded-xl w-full max-w-md p-4 md:p-6" style={{ background: c.cardBg, border: `1px solid ${c.cardBorder}` }}>
        <div className="flex items-start justify-between mb-4">
          <h2 className="text-lg font-bold m-0" style={{ color: c.headingText }}>Confirm Payroll Finalization</h2>
          <button onClick={onClose} className="p-1 rounded-lg" style={{ color: c.bodyText }}>
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex justify-between items-center py-2 border-b" style={{ borderColor: c.rowDivider }}>
            <span className="text-xs" style={{ color: c.mutedText }}>Cut-off Period</span>
            <span className="text-xs font-semibold" style={{ color: c.headingText }}>{cutoff}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b" style={{ borderColor: c.rowDivider }}>
            <span className="text-xs" style={{ color: c.mutedText }}>Total Amount</span>
            <span className="text-sm font-bold" style={{ color: c.highSalary }}>{formatCurrency(grandTotal)}</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-xs" style={{ color: c.mutedText }}>Headcount</span>
            <span className="text-xs font-semibold" style={{ color: c.headingText }}>{headcount} employees</span>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-3 py-1.5 rounded-lg text-xs font-medium" style={{ border: `1px solid ${c.cardBorder}`, color: c.bodyText, background: isDark ? "#1d2939" : "#ffffff" }}>Cancel</button>
          <button onClick={onConfirm} className="px-3 py-1.5 bg-black hover:bg-black/90 text-white rounded-lg text-xs font-medium transition-colors">Confirm & Finalize</button>
        </div>
      </div>
    </div>
  );
}

interface DisburseModalProps {
  c: Colors;
  isDark: boolean;
  batchRef: string;
  onBatchRefChange: (v: string) => void;
  loadingDisburse: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

/** Disburse-via-GCash modal. */
export function DisburseModal({ c, isDark, batchRef, onBatchRefChange, loadingDisburse, onClose, onConfirm }: DisburseModalProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-[9999] p-4" style={{ background: "rgba(0,0,0,0.5)" }}>
      <div className="rounded-xl w-full max-w-md p-4 md:p-6" style={{ background: c.cardBg, border: `1px solid ${c.cardBorder}` }}>
        <div className="flex items-start justify-between mb-4">
          <h2 className="text-lg font-bold m-0" style={{ color: c.headingText }}>Disburse Payroll via GCash</h2>
          <button onClick={onClose} className="p-1 rounded-lg" style={{ color: c.bodyText }}>
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="space-y-3 mb-4">
          <p className="text-xs" style={{ color: c.mutedText }}>
            Please enter the Batch Reference Number for this GCash disbursement.
          </p>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium" style={{ color: c.headingText }}>Batch Reference Number</label>
            <input
              type="text"
              value={batchRef}
              onChange={(e) => onBatchRefChange(e.target.value)}
              placeholder="e.g. GCASH-2026-001"
              className="w-full px-3 py-1.5 rounded-lg border text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{ background: isDark ? "#1d2939" : "#ffffff", borderColor: c.cardBorder, color: c.bodyText }}
            />
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-3 py-1.5 rounded-lg text-xs font-medium" style={{ border: `1px solid ${c.cardBorder}`, color: c.bodyText, background: isDark ? "#1d2939" : "#ffffff" }}>Cancel</button>
          <button
            onClick={onConfirm}
            disabled={!batchRef.trim() || loadingDisburse}
            className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loadingDisburse ? "Processing…" : "Confirm Disburse"}
          </button>
        </div>
      </div>
    </div>
  );
}
