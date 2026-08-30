"use client";

import React from "react";

interface StatCardProps {
  label: string;
  value: string | number;
  color?: string;
  icon?: React.ComponentType<{ className?: string }>;
  badge?: React.ReactNode;
  description?: string;
}

export function StatCard({ label, value, icon: Icon, badge, description }: StatCardProps) {
  return (
    <div className="bg-white text-black border border-gray-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between min-h-[110px]">
      <div className="flex flex-col items-start gap-1.5 sm:flex-row sm:items-center sm:justify-between sm:gap-2 mb-2">
        <div className="flex items-center gap-2 min-w-0">
          {Icon && <Icon className="w-4 h-4 text-black shrink-0" />}
          <span className="text-xs font-medium text-black uppercase tracking-wider truncate">
            {label}
          </span>
        </div>
        {badge}
      </div>
      <div className="flex items-baseline justify-between gap-2">
        <div className="text-3xl font-semibold text-black tracking-tight">{value}</div>
        {description && (
          <span className="text-xs font-normal text-black truncate">{description}</span>
        )}
      </div>
    </div>
  );
}
