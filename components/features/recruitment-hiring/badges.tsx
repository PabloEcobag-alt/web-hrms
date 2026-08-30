"use client";

// Status / stage / date badge presentational components for
// the Recruitment & Hiring feature.

import { Calendar } from "lucide-react";
import type { ApplicantStatus, HiringStage } from "./types";
import { getDaysUntil, formatDate } from "./utils";

export function StatusBadge({
  status,
  className,
}: {
  status: ApplicantStatus;
  c?: unknown;
  className?: string;
}) {
  const getStyle = () => {
    switch (status) {
      case "Regular":
        return "bg-emerald-50 text-emerald-700 border-emerald-200/60";
      case "Probationary":
        return "bg-purple-50 text-purple-700 border-purple-200/60";
      case "Training":
        return "bg-amber-50 text-amber-700 border-amber-200/60";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200/60";
    }
  };
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStyle()} ${className || ""}`}
    >
      {status}
    </span>
  );
}

export function StageBadge({
  stage,
  className,
}: {
  stage: HiringStage;
  c?: unknown;
  className?: string;
}) {
  const getStyle = () => {
    switch (stage) {
      case "Hired":
        return "bg-emerald-50 text-emerald-700 border-emerald-200/60";
      case "Probationary":
        return "bg-indigo-50 text-indigo-700 border-indigo-200/60";
      case "Job Offer":
        return "bg-violet-50 text-violet-700 border-violet-200/60";
      case "Final Interview":
        return "bg-sky-50 text-sky-700 border-sky-200/60";
      case "Initial Interview":
        return "bg-teal-50 text-teal-700 border-teal-200/60";
      case "Failed":
        return "bg-rose-50 text-rose-700 border-rose-200/60";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200/60";
    }
  };
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStyle()} ${className || ""}`}
    >
      {stage}
    </span>
  );
}

export function DateBadge({ date }: { date: string; c?: unknown }) {
  if (!date)
    return <span className="text-muted-foreground text-base">—</span>;
  const days = getDaysUntil(date);
  const label = isNaN(days)
    ? ""
    : days === 0
      ? "Today"
      : days < 0
        ? `${Math.abs(days)}d ago`
        : `${days}d`;
  return (
    <div className="inline-flex items-center gap-1.5 text-sm text-muted-foreground font-normal">
      <Calendar className="w-4 h-4 text-muted-foreground shrink-0" />
      <span>{formatDate(date)}</span>
      {label && <span className="text-foreground font-medium">({label})</span>}
    </div>
  );
}
