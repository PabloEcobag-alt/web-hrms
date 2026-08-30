"use client";

// Hooks and helpers for the Attendance & Biometrics feature.

import { useState, useEffect } from "react";
import type { AttendanceRecord } from "./types";

export function useDarkMode() {
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    const check = () =>
      setIsDark(document.documentElement.classList.contains("dark"));
    check();
    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);
  return isDark;
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
    tableRowHover: "#f9fafb",
    bannerBg: "#f5f3ff",
    bannerBorder: "#ddd6fe",
    bannerTitle: "#7c3aed",
    bannerText: "#6d28d9",
    badgeBg: "#f5f3ff",
    badgeText: "#7c3aed",
    tabActive: "#7c3aed",
    tabInactive: "#6b7280",
    tabBorder: "#e5e7eb",
    barBg: "#e5e7eb",
    onTime: "#7c3aed",
    late: "#6b7280",
    earlyOut: "#8b5cf6",
    absent: "#111827",
    overtime: "#7c3aed",
  };
}

export type Colors = ReturnType<typeof useColors>;

export function getAttendanceStatus(record: AttendanceRecord, _c?: Colors) {
  if (record.absences > 0) return { label: "Absent" as const };
  if (record.late.frequency > 0) return { label: "Late" as const };
  if (record.early.frequency > 0) return { label: "Early" as const };
  return { label: "On Time" as const };
}
