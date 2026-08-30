"use client";

import { CreditCard, Wallet, Smartphone } from "lucide-react";
import { StatCard } from "@/components/StatCard";
import { type Colors, type PayrollRow, formatCurrency } from "./types";

interface PayoutSummary {
  atmTotal: number;
  cashTotal: number;
  gcashTotal: number;
  grandTotal: number;
}

interface PayoutSummaryCardsProps {
  c?: Colors;
  payrollData: PayrollRow[];
  payoutSummary: PayoutSummary;
}

/** The ATM / Cash / GCash payout summary cards (shared StatCard style). */
export function PayoutSummaryCards({ payrollData, payoutSummary }: PayoutSummaryCardsProps) {
  const countBy = (method: PayrollRow["payoutMethod"]) =>
    payrollData.filter((r) => r.payoutMethod === method).length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
      <StatCard
        label="ATM Total"
        value={formatCurrency(payoutSummary.atmTotal)}
        icon={CreditCard}
        description={`${countBy("ATM")} employees`}
      />
      <StatCard
        label="Cash Total"
        value={formatCurrency(payoutSummary.cashTotal)}
        icon={Wallet}
        description={`${countBy("Cash")} employees`}
      />
      <StatCard
        label="GCash Total"
        value={formatCurrency(payoutSummary.gcashTotal)}
        icon={Smartphone}
        description={`${countBy("GCash")} employees`}
      />
    </div>
  );
}
