// Badge / stat-card / meta-row presentational components for
// the Digital 201 File feature.

import type { EmployeeStatus } from "./types";
import { type Colors } from "./utils";

export function MetaRow({ icon, label, value, c }: any) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 text-gray-400 flex-shrink-0">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-[10px] font-bold uppercase tracking-wider m-0" style={{ color: c.mutedText }}>{label}</p>
        <p className="text-xs font-medium m-0 truncate" style={{ color: c.bodyText }}>{value}</p>
      </div>
    </div>
  );
}

export function StatusBadge({ status }: { status: EmployeeStatus; c?: Colors }) {
  const getStyle = () => {
    switch (status) {
      case "Regular":
        return "bg-emerald-50 text-emerald-700 border-emerald-200/60";
      case "Probationary":
        return "bg-purple-50 text-purple-700 border-purple-200/60";
      case "Training":
        return "bg-amber-50 text-amber-700 border-amber-200/60";
      case "Seasonal":
        return "bg-violet-50 text-violet-700 border-violet-200/60";
      case "AWOL":
        return "bg-orange-50 text-orange-700 border-orange-200/60";
      case "Resigned":
        return "bg-slate-50 text-slate-700 border-slate-200/60";
      case "Terminated":
        return "bg-rose-50 text-rose-700 border-rose-200/60";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200/60";
    }
  };
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStyle()}`}
    >
      {status}
    </span>
  );
}

export function DocumentBadge({ completed }: {
  completed: boolean;
  lastUpdated: string;
  c: Colors;
}) {
  const style = completed
    ? "bg-emerald-50 text-emerald-700 border-emerald-200/60"
    : "bg-slate-50 text-slate-700 border-slate-200/60";
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${style}`}>
      {completed ? "Completed" : "Pending"}
    </span>
  );
}

export function EmployeeStatCard({ label, count, pendingCount, onClick }: {
  label: string; count: number; pendingCount: number;
  c?: Colors;
  onClick?: () => void;
  theme?: "blue" | "orange" | "purple";
}) {
  return (
    <div
      onClick={onClick}
      className={`bg-white text-black border border-gray-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between min-h-[110px] ${
        onClick ? "cursor-pointer transition-all hover:border-gray-300" : ""
      }`}
    >
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="text-xs font-medium text-black uppercase tracking-wider truncate">{label}</span>
        {pendingCount > 0 && (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-black border border-gray-200">
            {pendingCount} Pending
          </span>
        )}
      </div>
      <div className="flex items-baseline justify-between gap-2">
        <div className="text-3xl font-semibold text-black tracking-tight">{count}</div>
        {onClick && (
          <span className="text-xs font-medium text-black hover:underline inline-flex items-center gap-1">
            Review
            <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        )}
      </div>
    </div>
  );
}
