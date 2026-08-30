"use client";

// Badge / stat-card presentational components for the Payroll & Deduction feature.

import { type Colors, getSalaryColor, formatCurrency } from "./utils";
import { StatCard } from "@/components/StatCard";

export function SalaryBadge({ amount, c }: { amount: number; c: Colors }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold" style={{
      background: getSalaryColor(amount, c) + "20",
      color: getSalaryColor(amount, c),
    }}>
      {formatCurrency(amount)}
    </span>
  );
}

export function DeductionBadge({ amount, c }: { amount: number; c: Colors }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold" style={{
      background: c.deduction + "20",
      color: c.deduction,
    }}>
      -{formatCurrency(amount)}
    </span>
  );
}

export function AllowanceBadge({ amount, c }: { amount: number; c: Colors }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold" style={{
      background: c.allowance + "20",
      color: c.allowance,
    }}>
      +{formatCurrency(amount)}
    </span>
  );
}

export function PayrollStatCard({ label, amount, count }: {
  label: string; amount: number; count: number;
  c?: Colors;
}) {
  return (
    <StatCard
      label={label}
      value={formatCurrency(amount)}
      badge={
        <span className="px-2.5 py-0.5 rounded-full text-xs font-normal bg-muted text-muted-foreground border border-border">
          {count} Employees
        </span>
      }
    />
  );
}
