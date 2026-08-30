"use client";

import { useState, useMemo } from "react";
import { AppSelect } from "@/components/ui/app-select";
import type { ESSProps, CutoffKey } from "./types";
import { CUTOFFS } from "./constants";

export function CutoffViewer({ c, isDark }: ESSProps) {
  const [cutoff, setCutoff] = useState<CutoffKey>("active");
  const today = new Date();

  const visibleLogs = useMemo(() => {
    const period = CUTOFFS[cutoff];
    return period.logs.filter((log) => {
      const d = new Date(log.date);
      if (d < new Date(period.start) || d > new Date(period.end)) return false;
      // Active cut-off: only show logs up to the current date
      if (cutoff === "active" && d > today) return false;
      return true;
    });
  }, [cutoff]);

  return (
    <div className="rounded-xl border overflow-hidden" style={{ background: c.cardBg, borderColor: c.cardBorder }}>
      <div className="p-3 md:p-5 border-b flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3" style={{ borderColor: c.cardBorder }}>
        <div>
          <h2 className="text-base md:text-lg font-semibold m-0" style={{ color: c.headingText }}>Cut-off Time-in / Time-out</h2>
          <p className="text-xs md:text-sm mt-1" style={{ color: c.mutedText }}>View your logs by cut-off period</p>
        </div>
        <div>
          <label className="block text-xs font-medium mb-1.5" style={{ color: c.headingText }}>Cut-off Period</label>
          <AppSelect
            value={cutoff}
            onValueChange={(v) => setCutoff(v as CutoffKey)}
            options={[
              { value: "active", label: CUTOFFS.active.label },
              { value: "inactive", label: CUTOFFS.inactive.label },
            ]}
            className="w-full"
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${c.cardBorder}` }}>
              {["DATE", "TIME IN", "TIME OUT"].map((col) => (
                <th key={col} style={{ padding: "10px 12px", textAlign: "left", fontSize: 10, fontWeight: 700, color: c.colHeader, letterSpacing: "0.07em", whiteSpace: "nowrap" }}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visibleLogs.length === 0 ? (
              <tr>
                <td colSpan={3} style={{ padding: "16px 12px", textAlign: "center", color: c.mutedText, fontSize: 12 }}>
                  No logs available for this cut-off yet.
                </td>
              </tr>
            ) : (
              visibleLogs.map((log, idx) => (
                <tr key={log.date} style={{ borderBottom: idx < visibleLogs.length - 1 ? `1px solid ${c.rowDivider}` : "none", background: c.cardBg }}>
                  <td style={{ padding: "12px", color: c.bodyText, fontSize: 12 }}>{log.date}</td>
                  <td style={{ padding: "12px" }}>
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold" style={{ background: c.onTime + "20", color: c.onTime }}>{log.timeIn}</span>
                  </td>
                  <td style={{ padding: "12px" }}>
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold" style={{ background: c.overtime + "20", color: c.overtime }}>{log.timeOut}</span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
