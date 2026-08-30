"use client";

// Hooks and pure helpers shared across the Recruitment & Hiring feature.

import type { Applicant, ApplicantStatus, HiringStage } from "./types";

export function useDarkMode() {
  // Dark theme removed — the app is light-only. Always report light mode so
  // no consumer applies dark styling regardless of the document class.
  return false;
}

export function useColors(_isDark: boolean) {
  return {
    pageBg: "#ffffff",
    cardBg: "#ffffff",
    cardBorder: "#e5e7eb",
    rowDivider: "#f3f4f6",
    headingText: "#111827",
    bodyText: "#374151",
    mutedText: "#6b7280",
    colHeader: "#6b7280",
    bannerBg: "#f5f3ff",
    bannerBorder: "#ddd6fe",
    bannerTitle: "#7c3aed",
    badgeBg: "#f5f3ff",
    badgeText: "#7c3aed",
    tabActive: "#7c3aed",
    tabInactive: "#6b7280",
    tabBorder: "#e5e7eb",
    training: "#a78bfa",
    probationary: "#8b5cf6",
    regular: "#7c3aed",
    interview: "#6d28d9",
    pending: "#6b7280",
  };
}

export type Colors = ReturnType<typeof useColors>;

export function getInitials(a: Applicant) {
  return (a.firstName[0] || "") + (a.lastName[0] || "");
}

export function getFullName(a: Applicant) {
  return `${a.firstName}${a.middleName ? " " + a.middleName : ""} ${a.lastName}`
    .replace(/\s+/g, " ")
    .trim();
}

export function getDaysUntil(date: string) {
  if (!date) return NaN;
  const today = new Date();
  const d = new Date(date);
  if (isNaN(d.getTime())) return NaN;
  return Math.ceil((d.getTime() - today.getTime()) / 86400000);
}

export function formatDate(date: string) {
  if (!date) return "-";
  const d = new Date(date);
  if (isNaN(d.getTime())) return "-";
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function getStatusColor(status: ApplicantStatus, c: Colors) {
  if (status === "Training") return c.training;
  if (status === "Probationary") return c.probationary;
  return c.regular;
}

export function getStageColor(stage: HiringStage, c: Colors) {
  if (stage === "Hired") return c.regular;
  if (stage === "Probationary") return c.probationary;
  if (stage === "Initial Interview" || stage === "Final Interview")
    return c.interview;
  if (stage === "Job Offer") return c.training;
  if (stage === "Failed") return c.badgeText;
  return c.pending;
}

export function countCompleted(obj?: Record<string, boolean>) {
  if (!obj) return 0;
  return Object.values(obj).filter(Boolean).length;
}

// Build a compact list of page numbers with ellipsis for pagination controls.
export function getPageNumbers(
  current: number,
  total: number,
): (number | "...")[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  const pages: (number | "...")[] = [1];
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  if (start > 2) pages.push("...");
  for (let i = start; i <= end; i++) pages.push(i);
  if (end < total - 1) pages.push("...");
  pages.push(total);
  return pages;
}
