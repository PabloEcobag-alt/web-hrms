"use client";

import React, { useState, useMemo } from "react";

type Colors = {
  cardBg: string;
  cardBorder: string;
  headingText: string;
  bodyText: string;
  mutedText: string;
  deduction: string;
  inProgress: string;
};

interface DocumentExpiryWidgetProps {
  c: Colors;
  isDark: boolean;
}

interface ExpiringDoc {
  employeeId: string;
  employeeName: string;
  documentType: string;
  expiryDate: string;
}

const MOCK_EXPIRING_DOCS: ExpiringDoc[] = [
  {
    employeeId: "EMP-003",
    employeeName: "David Chen",
    documentType: "NBI Clearance",
    expiryDate: "2026-06-02",
  },
  {
    employeeId: "EMP-004",
    employeeName: "Sarah Johnson",
    documentType: "Medical Certificate",
    expiryDate: "2026-06-05",
  },
  {
    employeeId: "EMP-001",
    employeeName: "John Smith",
    documentType: "Contract Renewal",
    expiryDate: "2026-06-10",
  },
];

function getExpiryStatus(expiryDate: string): { status: "expired" | "warning" | "ok"; daysUntil: number } {
  // Normalize both dates to midnight to avoid timezone/time-of-day issues
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const expiry = new Date(expiryDate);
  expiry.setHours(0, 0, 0, 0);
  
  const diffTime = expiry.getTime() - today.getTime();
  const daysUntil = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  // Strictly expired: expiry date is before today
  if (daysUntil < 0) return { status: "expired", daysUntil };
  // Warning: expiry date is within 30 days (including today)
  if (daysUntil <= 30) return { status: "warning", daysUntil };
  return { status: "ok", daysUntil };
}

export default function DocumentExpiryWidget({ c, isDark }: DocumentExpiryWidgetProps) {
  const [dismissed, setDismissed] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const criticalDocs = useMemo(() => {
    return MOCK_EXPIRING_DOCS.filter((doc) => {
      const status = getExpiryStatus(doc.expiryDate);
      return status.status === "warning" && status.daysUntil < 7;
    });
  }, []);

  if (dismissed) return null;

  return (
    <div className="space-y-3">
      {/* Dismissible Banner for < 7 days */}
      {criticalDocs.length > 0 && (
        <div className="flex items-start gap-3 p-3 rounded-xl border" style={{ 
          background: c.deduction + "15", 
          borderColor: c.deduction 
        }}>
          <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke={c.deduction}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <div className="flex-1">
            <p className="text-xs font-semibold m-0" style={{ color: c.deduction }}>
              {criticalDocs.length} Document(s) Expiring Soon
            </p>
            <p className="text-xs mt-1" style={{ color: c.bodyText }}>
              Documents expiring within 7 days require immediate attention.
            </p>
          </div>
          <button
            onClick={() => setDismissed(true)}
            className="p-1 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
            style={{ color: c.bodyText }}
          >
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      {/* Expiring Documents Widget */}
      <div className="rounded-xl border overflow-hidden" style={{ background: c.cardBg, borderColor: c.cardBorder }}>
        <div className="p-3 md:p-5 border-b flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3" style={{ borderColor: c.cardBorder }}>
          <div>
            <h2 className="text-base md:text-lg font-semibold m-0" style={{ color: c.headingText }}>Expiring Documents</h2>
            <p className="text-xs md:text-sm mt-1" style={{ color: c.mutedText }}>
              Track documents approaching expiration
            </p>
          </div>
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-xs font-medium px-3 py-1.5 rounded-lg border transition-colors"
            style={{ 
              borderColor: c.cardBorder, 
              color: c.bodyText,
              background: "#ffffff"
            }}
          >
            {showAll ? "Show Critical Only" : `Show All (${MOCK_EXPIRING_DOCS.length})`}
          </button>
        </div>

        <div className="overflow-x-auto">
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${c.cardBorder}` }}>
                {["EMPLOYEE", "DOCUMENT TYPE", "EXPIRY DATE", "DAYS REMAINING", "STATUS"].map((col) => (
                  <th key={col} style={{
                    padding: "10px 12px",
                    textAlign: "left",
                    fontSize: 10,
                    fontWeight: 700,
                    color: c.mutedText,
                    letterSpacing: "0.07em",
                    whiteSpace: "nowrap",
                  }}>
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(showAll ? MOCK_EXPIRING_DOCS : criticalDocs).map((doc, idx) => {
                const status = getExpiryStatus(doc.expiryDate);
                const isCritical = status.status === "warning" && status.daysUntil < 7;
                const isExpired = status.status === "expired";
                return (
                  <tr key={`${doc.employeeId}-${doc.documentType}`} style={{
                    borderBottom: idx < (showAll ? MOCK_EXPIRING_DOCS : criticalDocs).length - 1 ? `1px solid ${c.cardBorder}` : "none",
                    background: isExpired ? c.deduction + "15" : isCritical ? c.inProgress + "15" : c.cardBg,
                  }}>
                    <td style={{ padding: "12px" }}>
                      <div>
                        <span style={{ fontWeight: 600, color: c.headingText, fontSize: 11, display: "block" }}>{doc.employeeName}</span>
                        <span style={{ fontSize: 10, color: c.mutedText }}>{doc.employeeId}</span>
                      </div>
                    </td>
                    <td style={{ padding: "12px", color: c.bodyText, fontSize: 11 }}>{doc.documentType}</td>
                    <td style={{ padding: "12px", color: c.bodyText, fontSize: 11 }}>{doc.expiryDate}</td>
                    <td style={{ padding: "12px" }}>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold" style={{
                        background: isExpired ? c.deduction + "20" : isCritical ? c.inProgress + "20" : c.cardBorder + "20",
                        color: isExpired ? c.deduction : isCritical ? c.inProgress : c.bodyText,
                      }}>
                        {isExpired ? "Expired" : `${status.daysUntil} days`}
                      </span>
                    </td>
                    <td style={{ padding: "12px" }}>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold" style={{
                        background: isExpired ? c.deduction + "20" : isCritical ? c.inProgress + "20" : c.cardBorder + "20",
                        color: isExpired ? c.deduction : isCritical ? c.inProgress : c.bodyText,
                      }}>
                        <span className="w-2 h-2 rounded-full" style={{ background: isExpired ? c.deduction : isCritical ? c.inProgress : c.bodyText }} />
                        {isExpired ? "Action Required" : isCritical ? "Urgent" : "Monitor"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
