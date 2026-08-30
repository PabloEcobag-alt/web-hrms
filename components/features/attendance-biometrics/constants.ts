// Static data for the Attendance & Biometrics feature.

import type { TabKey } from "./types";

export const AVATAR_STYLES = [
  { bg: "#E6F1FB", color: "#185FA5" },
  { bg: "#FAEEDA", color: "#854F0B" },
  { bg: "#EAF3DE", color: "#3B6D11" },
  { bg: "#F1EFE8", color: "#5F5E5A" },
  { bg: "#FAEEDA", color: "#854F0B" },
];

export const tabs: { key: TabKey; label: string }[] = [
  { key: "daily", label: "Daily View" },
  { key: "monthly", label: "Monthly Summary" },
  { key: "department", label: "By Department" },
];
