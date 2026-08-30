"use client";

import React, { useMemo, useState } from "react";
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { TableToolbar, TablePagination } from "@/components/features/attendance-biometrics/TableControls";

type Colors = {
  cardBg: string;
  cardBorder: string;
  rowDivider: string;
  headingText: string;
  bodyText: string;
  mutedText: string;
  colHeader: string;
  onTime: string;
  late: string;
  earlyOut: string;
  overtime: string;
  bannerTitle: string;
};

interface BiometricDashboardProps {
  c: Colors;
  isDark: boolean;
  readOnly?: boolean;
}

type EntryMethod = "biometric" | "rfid";
type AttendanceStatus = "On Time" | "Late" | "Early Out" | "Absent";

interface BiometricLog {
  id: string;
  name: string;
  initials: string;
  shift: string;
  timeIn: string; // "" means missing
  timeOut: string; // "" means missing
  status: AttendanceStatus;
  entryMethod: EntryMethod;
  adjusted: boolean;
  adjustReason?: string;
}

const MOCK_BIOMETRIC: BiometricLog[] = [
  { id: "1", name: "John Smith", initials: "JS", shift: "08:00 - 17:00", timeIn: "08:02", timeOut: "17:05", status: "On Time", entryMethod: "biometric", adjusted: false },
  { id: "2", name: "Maria Garcia", initials: "MG", shift: "08:00 - 17:00", timeIn: "08:00", timeOut: "16:40", status: "Early Out", entryMethod: "biometric", adjusted: false },
  { id: "3", name: "David Chen", initials: "DC", shift: "09:00 - 18:00", timeIn: "09:25", timeOut: "18:10", status: "Late", entryMethod: "rfid", adjusted: false },
  { id: "4", name: "Sarah Johnson", initials: "SJ", shift: "08:00 - 17:00", timeIn: "", timeOut: "", status: "Absent", entryMethod: "biometric", adjusted: false },
  { id: "5", name: "Robert Wilson", initials: "RW", shift: "10:00 - 19:00", timeIn: "10:00", timeOut: "", status: "On Time", entryMethod: "rfid", adjusted: false },
  { id: "6", name: "Emily Brown", initials: "EB", shift: "08:00 - 17:00", timeIn: "07:58", timeOut: "17:01", status: "On Time", entryMethod: "biometric", adjusted: false },
];

// Pastel semantic pill styles keyed by attendance status (matches recruitment badges).
const STATUS_BADGE_STYLES: Record<AttendanceStatus, string> = {
  "On Time": "bg-emerald-50 text-emerald-700 border-emerald-200/60",
  Late: "bg-amber-50 text-amber-700 border-amber-200/60",
  "Early Out": "bg-sky-50 text-sky-700 border-sky-200/60",
  Absent: "bg-rose-50 text-rose-700 border-rose-200/60",
};

export default function ManagerBiometricDashboard({ c, isDark, readOnly = false }: BiometricDashboardProps) {
  const [logs, setLogs] = useState<BiometricLog[]>(MOCK_BIOMETRIC);
  const [editing, setEditing] = useState<BiometricLog | null>(null);
  const [formIn, setFormIn] = useState("");
  const [formOut, setFormOut] = useState("");
  const [formReason, setFormReason] = useState("");
  const [error, setError] = useState("");

  // Search + status filter + pagination (recruitment-parity controls).
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 8;

  const statusOptions = useMemo(
    () => Array.from(new Set(MOCK_BIOMETRIC.map((l) => l.status))),
    []
  );
  const filteredLogs = useMemo(() => {
    return logs.filter((l) => {
      const matchName = l.name.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === "" || l.status === statusFilter;
      return matchName && matchStatus;
    });
  }, [logs, search, statusFilter]);
  const total = filteredLogs.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const startIndex = total === 0 ? 0 : (safePage - 1) * PAGE_SIZE;
  const paginatedLogs = filteredLogs.slice(startIndex, startIndex + PAGE_SIZE);

  const isMissing = (log: BiometricLog) => log.timeIn === "" || log.timeOut === "";

  const openOverride = (log: BiometricLog) => {
    if (readOnly) return;
    setEditing(log);
    setFormIn(log.timeIn);
    setFormOut(log.timeOut);
    setFormReason("");
    setError("");
  };

  const saveOverride = () => {
    if (!editing) return;
    if (!formReason.trim()) {
      setError("A reason is required for manual adjustments.");
      return;
    }
    setLogs((prev) =>
      prev.map((l) =>
        l.id === editing.id
          ? {
              ...l,
              timeIn: formIn || l.timeIn,
              timeOut: formOut || l.timeOut,
              status: formIn && formOut && l.status === "Absent" ? "On Time" : l.status,
              adjusted: true,
              adjustReason: formReason.trim(),
            }
          : l
      )
    );
    console.log("Manual attendance override:", { id: editing.id, timeIn: formIn, timeOut: formOut, reason: formReason });
    setEditing(null);
  };

  return (
    <div className="border border-border rounded-lg bg-white shadow-xs overflow-hidden p-6 space-y-6">
      <TableToolbar
        search={search}
        onSearchChange={(v) => { setSearch(v); setPage(1); }}
        searchPlaceholder="Search by name..."
        filters={[
          {
            value: statusFilter,
            onChange: (v) => { setStatusFilter(v); setPage(1); },
            allLabel: "All Statuses",
            options: statusOptions,
            minWidth: "min-w-[140px]",
          },
        ]}
      />

      <div className="border border-border rounded-lg bg-white">
        {paginatedLogs.length === 0 ? (
          <div className="p-8 text-center text-sm text-muted-foreground">
            No punches match the current filters.
          </div>
        ) : (
        <Table className="w-full" wrapperClassName="max-h-[600px] rounded-lg">
          <TableHeader className="bg-background sticky top-0 z-10">
            <TableRow className="border-b border-border">
              <TableHead className="w-[280px] min-w-[280px] text-base font-medium text-muted-foreground px-5 py-4">Name</TableHead>
              <TableHead className="w-[180px] min-w-[180px] text-base font-medium text-muted-foreground px-5 py-4">Shift</TableHead>
              <TableHead className="w-[150px] min-w-[150px] text-base font-medium text-muted-foreground px-5 py-4">Time-In</TableHead>
              <TableHead className="w-[150px] min-w-[150px] text-base font-medium text-muted-foreground px-5 py-4">Time-Out</TableHead>
              <TableHead className="w-[220px] min-w-[220px] text-base font-medium text-muted-foreground px-5 py-4">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedLogs.map((log) => {
              const missing = isMissing(log);
              return (
                <TableRow
                  key={log.id}
                  onClick={() => openOverride(log)}
                  className={`border-b border-border transition-colors ${readOnly ? "" : "cursor-pointer hover:bg-muted/50"}`}
                >
                  <TableCell className="w-[280px] min-w-[280px] px-5 py-4">
                    <div>
                      <span className="font-medium text-base text-foreground block">{log.name}</span>
                      {log.entryMethod === "rfid" ? (
                        <span className="inline-flex items-center gap-1 text-xs text-violet-700 font-medium">
                          <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13a7 7 0 0114 0M8.5 13a3.5 3.5 0 017 0M12 13h.01" /></svg>
                          Badge
                        </span>
                      ) : (
                        <span className="text-xs text-muted-foreground">Biometric</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="w-[180px] min-w-[180px] px-5 py-4 text-base font-normal text-muted-foreground">{log.shift}</TableCell>
                  <TableCell className="w-[150px] min-w-[150px] px-5 py-4">
                    {log.timeIn === "" ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border bg-rose-50 text-rose-700 border-rose-200/60">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                        Missing Log
                      </span>
                    ) : (
                      <span className="text-base text-foreground">{log.timeIn}</span>
                    )}
                  </TableCell>
                  <TableCell className="w-[150px] min-w-[150px] px-5 py-4">
                    {log.timeOut === "" ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border bg-rose-50 text-rose-700 border-rose-200/60">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                        Missing Log
                      </span>
                    ) : (
                      <span className="text-base text-foreground">{log.timeOut}</span>
                    )}
                  </TableCell>
                  <TableCell className="w-[220px] min-w-[220px] px-5 py-4">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${STATUS_BADGE_STYLES[log.status] || "bg-slate-50 text-slate-700 border-slate-200/60"}`}>
                        {log.status}
                      </span>
                      {log.adjusted && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border bg-violet-50 text-violet-700 border-violet-200/60" title={log.adjustReason}>
                          <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                          Manually Adjusted
                        </span>
                      )}
                      {missing && !readOnly && (
                        <span className="text-xs text-muted-foreground">(click to fix)</span>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        )}
      </div>

      <TablePagination
        totalItems={total}
        pageSize={PAGE_SIZE}
        startIndex={startIndex}
        safePage={safePage}
        totalPages={totalPages}
        itemLabel="punches"
        onPrevPage={() => setPage((p) => Math.max(1, p - 1))}
        onNextPage={() => setPage((p) => Math.min(totalPages, p + 1))}
      />

      {/* Manual Override Modal */}
      {editing && !readOnly && (
        <div className="fixed inset-0 flex items-center justify-center z-[9999] p-4" style={{ background: "rgba(0,0,0,0.5)" }}>
          <div className="rounded-xl w-full max-w-md p-4 md:p-6" style={{ background: c.cardBg, border: `1px solid ${c.cardBorder}` }}>
            <div className="flex items-start justify-between mb-1">
              <h2 className="text-lg font-bold m-0" style={{ color: c.headingText }}>Manual Time Override</h2>
              <button onClick={() => setEditing(null)} className="p-1 rounded-lg" style={{ color: c.bodyText }}>
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <p className="text-xs mb-4" style={{ color: c.mutedText }}>Correcting attendance for <span style={{ fontWeight: 600, color: c.headingText }}>{editing.name}</span> ({editing.shift})</p>

            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: c.headingText }}>Corrected Time-In</label>
                <input type="time" value={formIn} onChange={(e) => setFormIn(e.target.value)} className="w-full px-2.5 py-1.5 rounded-lg border text-xs focus:outline-none focus:ring-2 focus:ring-blue-500" style={{ background: isDark ? "#1d2939" : "#ffffff", borderColor: c.cardBorder, color: c.bodyText }} />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: c.headingText }}>Corrected Time-Out</label>
                <input type="time" value={formOut} onChange={(e) => setFormOut(e.target.value)} className="w-full px-2.5 py-1.5 rounded-lg border text-xs focus:outline-none focus:ring-2 focus:ring-blue-500" style={{ background: isDark ? "#1d2939" : "#ffffff", borderColor: c.cardBorder, color: c.bodyText }} />
              </div>
            </div>

            <div className="mb-3">
              <label className="block text-xs font-medium mb-1.5" style={{ color: c.headingText }}>Reason <span style={{ color: c.late }}>*</span></label>
              <textarea rows={3} value={formReason} onChange={(e) => setFormReason(e.target.value)} placeholder="e.g., Biometric scanner failure; verified via security logbook." className="w-full px-3 py-2 rounded-lg border text-xs focus:outline-none focus:ring-2 focus:ring-blue-500" style={{ background: isDark ? "#1d2939" : "#ffffff", borderColor: error ? c.late : c.cardBorder, color: c.bodyText }} />
              {error && <p className="text-xs mt-1" style={{ color: c.late }}>{error}</p>}
            </div>

            <div className="flex justify-end gap-2">
              <button onClick={() => setEditing(null)} className="px-3 py-1.5 rounded-lg text-xs font-medium" style={{ border: `1px solid ${c.cardBorder}`, color: c.bodyText, background: isDark ? "#1d2939" : "#ffffff" }}>Cancel</button>
              <button onClick={saveOverride} className="px-3 py-1.5 bg-black hover:bg-black/90 text-white rounded-lg text-xs font-medium transition-colors">Save Override</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
