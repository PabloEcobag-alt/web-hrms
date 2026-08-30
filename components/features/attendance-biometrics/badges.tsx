"use client";

// Badge / stat-card presentational components for the Attendance & Biometrics feature.

import { type Colors, getAttendanceStatus } from "./utils";

// Pastel semantic pill styles keyed by attendance status label.
const ATTENDANCE_BADGE_STYLES: Record<string, string> = {
  "On Time": "bg-emerald-50 text-emerald-700 border-emerald-200/60",
  Late: "bg-amber-50 text-amber-700 border-amber-200/60",
  Early: "bg-sky-50 text-sky-700 border-sky-200/60",
  Absent: "bg-rose-50 text-rose-700 border-rose-200/60",
};

export function AttendanceBadge({ status }: {
  status: ReturnType<typeof getAttendanceStatus>;
  c?: Colors;
}) {
  const style = ATTENDANCE_BADGE_STYLES[status.label] || "bg-slate-50 text-slate-700 border-slate-200/60";
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${style}`}>
      {status.label}
    </span>
  );
}

// Pastel semantic pill styles keyed by time-badge status.
const TIME_BADGE_STYLES: Record<string, string> = {
  "on-time": "bg-emerald-50 text-emerald-700 border-emerald-200/60",
  late: "bg-amber-50 text-amber-700 border-amber-200/60",
  overtime: "bg-violet-50 text-violet-700 border-violet-200/60",
  absent: "bg-rose-50 text-rose-700 border-rose-200/60",
};

export function TimeBadge({ time, status }: {
  time: string;
  status: "on-time" | "late" | "overtime" | "absent";
  c?: Colors;
}) {
  const style = TIME_BADGE_STYLES[status] || "bg-slate-50 text-slate-700 border-slate-200/60";
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${style}`}>
      {time}
    </span>
  );
}

export function AttendanceStatCard({ label, count, issuesCount }: {
  label: string; count: number; issuesCount: number;
  c?: Colors;
}) {
  return (
    <div className="bg-card text-card-foreground border border-border rounded-2xl p-5 shadow-xs flex flex-col justify-between min-h-[110px]">
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider truncate">{label}</span>
        {issuesCount > 0 && (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-normal bg-amber-50 text-amber-700 border border-amber-200/60">
            {issuesCount} Issues
          </span>
        )}
      </div>
      <div className="text-3xl font-semibold text-foreground tracking-tight">{count}</div>
    </div>
  );
}
