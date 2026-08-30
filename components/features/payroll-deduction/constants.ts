// Static data for the Payroll & Deduction feature.

import type { TabKey } from "./types";

export const AVATAR_STYLES = [
  { bg: "#E6F1FB", color: "#185FA5" },
  { bg: "#FAEEDA", color: "#854F0B" },
  { bg: "#EAF3DE", color: "#3B6D11" },
  { bg: "#F1EFE8", color: "#5F5E5A" },
  { bg: "#FAEEDA", color: "#854F0B" },
];

export const tabs: { key: TabKey; label: string }[] = [
  { key: "all", label: "All Employees" },
  { key: "department", label: "By Department" },
  { key: "period", label: "Pay Period" },
];
