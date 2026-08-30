"use client";

// Hooks and helpers for the User Management feature.

import { useState, useEffect } from "react";
import type { UserStatus } from "./types";

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
    activeStatus: "#7c3aed",
    inactiveStatus: "#6b7280",
    suspendedStatus: "#111827",
    roleAdmin: "#7c3aed",
    roleManager: "#8b5cf6",
    roleEmployee: "#6b7280",
  };
}

export type Colors = ReturnType<typeof useColors>;

export function getRoleColor(role: string, c: Colors) {
  switch (role) {
    case "SystemAdmin": return c.roleAdmin;
    case "Manager": return c.roleManager;
    default: return c.roleEmployee;
  }
}

export function getStatusColor(status: UserStatus, c: Colors) {
  switch (status) {
    case "Active": return c.activeStatus;
    case "Inactive": return c.inactiveStatus;
    case "Suspended": return c.suspendedStatus;
    default: return c.bodyText;
  }
}

// Build a compact list of page numbers with ellipsis for pagination controls.
export function getPageNumbers(current: number, total: number): (number | "...")[] {
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
