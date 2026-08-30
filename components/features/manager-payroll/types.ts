// Shared types and helpers for the Manager Payroll Dashboard.

export type Colors = {
  cardBg: string;
  cardBorder: string;
  rowDivider: string;
  headingText: string;
  bodyText: string;
  mutedText: string;
  colHeader: string;
  highSalary: string;
  mediumSalary: string;
  lowSalary: string;
  deduction: string;
  allowance: string;
};

export interface ManagerPayrollDashboardProps {
  c: Colors;
  isDark: boolean;
  readOnly?: boolean;
}

export type CutoffType = "26th-10th" | "11th-25th";

export interface PayrollRow {
  id: string;
  employeeId: string;
  employeeIdNum: number;
  name: string;
  position: string;
  basic: number;
  ot: number;
  sss: number;
  philHealth: number;
  pagIbig: number;
  tax: number;
  bonus: number;
  netPay: number;
  payoutMethod: "ATM" | "Cash" | "GCash";
  status?: string;
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  }).format(amount);
}

export const getCutoffDate = (cutoff: CutoffType): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  return cutoff === "26th-10th" ? `${year}-${month}-10` : `${year}-${month}-25`;
};
