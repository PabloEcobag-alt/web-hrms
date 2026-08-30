"use client";

import { toast } from "sonner";
import type { Applicant } from "./types";

/**
 * Renders the "New Application Received" toast body for a given applicant.
 * Kept as a standalone renderer so the view's fetch effect stays lean.
 */
export function renderNewApplicantToast(a: Applicant, t: { id: string; visible: boolean }) {
  return (
    <div
      style={{
        display: "flex", alignItems: "flex-start", gap: 10,
        background: "#ffffff", border: "1px solid #d1fae5",
        borderLeft: "4px solid #10b981", borderRadius: 10,
        padding: "12px 14px", boxShadow: "0 6px 20px rgba(0,0,0,0.12)",
        maxWidth: 340, opacity: t.visible ? 1 : 0, transition: "opacity 0.2s",
      }}
    >
      <div style={{ flex: 1 }}>
        <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: "#065f46" }}>
          🟢 New Application Received!
        </p>
        <p style={{ margin: "6px 0 0", fontSize: 12, color: "#111827" }}>
          <strong>Name:</strong> {a.firstName} {a.lastName}
        </p>
        <p style={{ margin: "2px 0 0", fontSize: 12, color: "#111827" }}>
          <strong>Role:</strong> {a.position}
        </p>
        <p style={{ margin: "2px 0 0", fontSize: 12, color: "#111827" }}>
          <strong>AI Match:</strong>{" "}
          {typeof a.aiMatchScore === "number" ? `${a.aiMatchScore}%` : "Processing..."}
        </p>
      </div>
      <button
        onClick={() => toast.dismiss(t.id)}
        style={{ background: "none", border: "none", color: "#6b7280", cursor: "pointer", fontSize: 16, padding: 0, lineHeight: 1 }}
        aria-label="Dismiss"
      >
        ×
      </button>
    </div>
  );
}
