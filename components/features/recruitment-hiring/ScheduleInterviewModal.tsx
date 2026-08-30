"use client";

import type { Applicant } from "./types";
import type { Colors } from "./utils";
import { getFullName } from "./utils";

interface ScheduleInterviewModalProps {
  applicant: Applicant;
  c: Colors;
  onCancel: () => void;
  onSave: (applicantId: string, date: string, notes?: string) => void;
}

/**
 * Simple modal for scheduling/updating an applicant's interview date.
 */
export function ScheduleInterviewModal({ applicant, c, onCancel, onSave }: ScheduleInterviewModalProps) {
  const defaultDate = applicant.interviewDate || new Date().toISOString().split("T")[0];

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 10000, background: "rgba(0,0,0,0.45)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ width: "100%", maxWidth: 520, background: c.cardBg, border: `1px solid ${c.cardBorder}`, borderRadius: 12, padding: 18 }}>
        <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: c.headingText }}>Schedule Interview — {getFullName(applicant)}</h3>
        <div style={{ marginTop: 12, display: "grid", gridTemplateColumns: "1fr", gap: 10 }}>
          <div>
            <label style={{ display: "block", fontSize: 12, color: c.mutedText, marginBottom: 6 }}>Date</label>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <input id="sch-date" type="date" defaultValue={defaultDate} style={{ width: "100%", padding: "8px", borderRadius: 8, border: `1px solid ${c.cardBorder}`, background: "#fff" }} />
              <button onClick={() => { const el = document.getElementById("sch-date") as any; if (el?.showPicker) el.showPicker(); else el?.focus(); }} style={{ border: "none", background: "transparent", cursor: "pointer" }} title="Open calendar">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={c.mutedText} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
              </button>
            </div>
          </div>
          <div>
            <label style={{ display: "block", fontSize: 12, color: c.mutedText, marginBottom: 6 }}>Notes (optional)</label>
            <input id="sch-notes" type="text" placeholder="e.g., Zoom link or location" style={{ width: "100%", padding: "8px", borderRadius: 8, border: `1px solid ${c.cardBorder}`, background: "#fff" }} />
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 14 }}>
          <button onClick={onCancel} style={{ padding: "8px 14px", borderRadius: 8, border: `1px solid ${c.cardBorder}`, background: "transparent", color: c.bodyText }}>Cancel</button>
          <button onClick={() => {
            const dateInput = (document.getElementById("sch-date") as HTMLInputElement).value;
            const notesInput = (document.getElementById("sch-notes") as HTMLInputElement).value;
            onSave(applicant.id, dateInput || defaultDate, notesInput || undefined);
          }} style={{ padding: "8px 14px", borderRadius: 8, border: "none", background: "#000000", color: "white" }}>Save</button>
        </div>
      </div>
    </div>
  );
}
