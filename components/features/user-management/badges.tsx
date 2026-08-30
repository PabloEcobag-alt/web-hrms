"use client";

// Badge and stat-card presentational components for the User Management feature.

import type { UserStatus } from "./types";
import { type Colors, getRoleColor, getStatusColor } from "./utils";
import { ROLE_DISPLAY_MAP } from "./constants";

export function RoleBadge({ role, c }: { role: string; c: Colors }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold" style={{
      background: getRoleColor(role, c) + "20",
      color: getRoleColor(role, c),
    }}>
      {ROLE_DISPLAY_MAP[role] ?? role}
    </span>
  );
}

export function StatusBadge({ status, c }: { status: UserStatus; c: Colors }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold" style={{
      background: getStatusColor(status, c) + "20",
      color: getStatusColor(status, c),
    }}>
      <div className="w-2 h-2 rounded-full" style={{ background: getStatusColor(status, c) }} />
      {status}
    </span>
  );
}

export function HRStatCard({ label, count, inactiveCount }: {
  label: string; count: number; inactiveCount: number;
}) {
  return (
    <div className="bg-white text-black border border-gray-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between min-h-[110px]">
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="text-xs font-medium text-black uppercase tracking-wider truncate">{label}</span>
        {inactiveCount > 0 && (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-normal bg-gray-100 text-black border border-gray-200">
            {inactiveCount} Inactive
          </span>
        )}
      </div>
      <div className="text-3xl font-semibold text-black tracking-tight">{count}</div>
    </div>
  );
}
