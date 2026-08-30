// Types for the Payroll & Deduction feature.

export interface AdditionalWage {
  allowances: number;
  overtime: number;
  total: number;
}

export interface Deductions {
  sss: number;
  philHealth: number;
  pagIbig: number;
  tax: number;
  total: number;
}

export interface ReducedWage {
  lates: number;
  casualLeave: number;
  total: number;
}

export interface PayrollCalculation {
  id: string;
  employeeId: string;
  employeeName: string;
  position: string;
  basicSalary: number;
  additionalWage: AdditionalWage;
  reducedWage: ReducedWage;
  deductions: Deductions;
  realPay: number;
  payPeriod: string;
  avatarIndex: number;
  initials: string;
}

export type TabKey = "all" | "department" | "period";
