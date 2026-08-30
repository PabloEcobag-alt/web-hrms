"use client";

// Hooks and helpers for the Payroll & Deduction feature.

import { useState, useEffect } from "react";

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
    highSalary: "#7c3aed",
    mediumSalary: "#8b5cf6",
    lowSalary: "#6b7280",
    deduction: "#6b7280",
    allowance: "#7c3aed",
  };
}

export type Colors = ReturnType<typeof useColors>;

export function getSalaryColor(salary: number, c: Colors) {
  if (salary >= 6000) return c.highSalary;
  if (salary >= 4500) return c.mediumSalary;
  return c.lowSalary;
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  }).format(amount);
}
