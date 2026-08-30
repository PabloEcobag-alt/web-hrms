"use client";

interface StatusConfig {
  bg: string;
  color: string;
  label: string;
}

const STATUS_CONFIGS: Record<string, StatusConfig> = {
  // Employee/Applicant Status
  training: { bg: "#F1F5F9", color: "#334155", label: "Training" },
  probationary: { bg: "#E2E8F0", color: "#1E293B", label: "Probationary" },
  regular: { bg: "#0F172A", color: "#F8FAFC", label: "Regular" },
  
  // User Roles
  "marketing-manager": { bg: "#F1F5F9", color: "#334155", label: "Marketing Manager" },
  "vice-president": { bg: "#0F172A", color: "#F8FAFC", label: "Vice President" },
  "hr-admin": { bg: "#334155", color: "#F8FAFC", label: "HR Admin" },
  employee: { bg: "#F8FAFC", color: "#64748B", label: "Employee" },
  
  // Account Status
  active: { bg: "#0F172A", color: "#F8FAFC", label: "Active" },
  inactive: { bg: "#F1F5F9", color: "#64748B", label: "Inactive" },
  suspended: { bg: "#334155", color: "#F8FAFC", label: "Suspended" },
  
  // Attendance Status
  critical: { bg: "#0F172A", color: "#F8FAFC", label: "Critical" },
  warning: { bg: "#475569", color: "#F8FAFC", label: "Warning" },
  attention: { bg: "#64748B", color: "#F8FAFC", label: "Attention" },
  good: { bg: "#0F172A", color: "#F8FAFC", label: "Good" },
};

interface StatusBadgeProps {
  status: string;
  size?: "sm" | "md";
}

export function StatusBadge({ status, size = "sm" }: StatusBadgeProps) {
  const config = STATUS_CONFIGS[status.toLowerCase()] || STATUS_CONFIGS.active;
  const fontSize = size === "sm" ? "11px" : "12px";
  const padding = size === "sm" ? "2px 8px" : "3px 10px";

  return (
    <span
      style={{
        fontSize,
        fontWeight: 500,
        padding,
        borderRadius: "100px",
        background: config.bg,
        color: config.color,
        display: "inline-flex",
        alignItems: "center",
        whiteSpace: "nowrap",
      }}
    >
      {config.label}
    </span>
  );
}
