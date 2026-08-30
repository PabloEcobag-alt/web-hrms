// Mock payroll runs for the Manager Payroll Computation dashboard.
// Used as a fallback when the payroll API is unavailable or returns no data.

import type { PayrollRow } from "./types";

// netPay = basic + ot + bonus - sss - philHealth - pagIbig - tax
export const MOCK_PAYROLL_ROWS: PayrollRow[] = [
  {
    id: "1", employeeId: "EMP-001", employeeIdNum: 1,
    name: "John Smith", position: "Software Developer",
    basic: 25000, ot: 1500, sss: 1350, philHealth: 437.5, pagIbig: 200, tax: 2000, bonus: 0,
    netPay: 22512.5, payoutMethod: "ATM", status: "Draft",
  },
  {
    id: "2", employeeId: "EMP-002", employeeIdNum: 2,
    name: "Maria Garcia", position: "HR Manager",
    basic: 30000, ot: 0, sss: 1620, philHealth: 525, pagIbig: 240, tax: 2500, bonus: 1000,
    netPay: 26115, payoutMethod: "ATM", status: "Computed",
  },
  {
    id: "3", employeeId: "EMP-003", employeeIdNum: 3,
    name: "David Chen", position: "Marketing Specialist",
    basic: 22000, ot: 2000, sss: 1188, philHealth: 385, pagIbig: 176, tax: 1800, bonus: 0,
    netPay: 20451, payoutMethod: "GCash", status: "Draft",
  },
  {
    id: "4", employeeId: "EMP-004", employeeIdNum: 4,
    name: "Sarah Johnson", position: "Sales Representative",
    basic: 20000, ot: 2500, sss: 1080, philHealth: 350, pagIbig: 160, tax: 1600, bonus: 500,
    netPay: 19810, payoutMethod: "Cash", status: "Finalized",
  },
  {
    id: "5", employeeId: "EMP-005", employeeIdNum: 5,
    name: "Robert Wilson", position: "Operations Manager",
    basic: 32000, ot: 1200, sss: 1728, philHealth: 560, pagIbig: 256, tax: 2800, bonus: 0,
    netPay: 27856, payoutMethod: "ATM", status: "Computed",
  },
  {
    id: "6", employeeId: "EMP-006", employeeIdNum: 6,
    name: "Emily Brown", position: "Accountant",
    basic: 26000, ot: 800, sss: 1404, philHealth: 455, pagIbig: 208, tax: 2100, bonus: 0,
    netPay: 22633, payoutMethod: "GCash", status: "Draft",
  },
  {
    id: "7", employeeId: "EMP-007", employeeIdNum: 7,
    name: "Michael Torres", position: "IT Support",
    basic: 21000, ot: 1800, sss: 1134, philHealth: 367.5, pagIbig: 168, tax: 1700, bonus: 0,
    netPay: 19430.5, payoutMethod: "Cash", status: "Draft",
  },
  {
    id: "8", employeeId: "EMP-008", employeeIdNum: 8,
    name: "Jessica Lee", position: "Graphic Designer",
    basic: 23000, ot: 0, sss: 1242, philHealth: 402.5, pagIbig: 184, tax: 1850, bonus: 750,
    netPay: 20071.5, payoutMethod: "ATM", status: "Finalized",
  },
  {
    id: "9", employeeId: "EMP-009", employeeIdNum: 9,
    name: "Daniel Cruz", position: "Warehouse Supervisor",
    basic: 24000, ot: 3000, sss: 1296, philHealth: 420, pagIbig: 192, tax: 1950, bonus: 0,
    netPay: 23142, payoutMethod: "ATM", status: "Disbursed",
  },
  {
    id: "10", employeeId: "EMP-010", employeeIdNum: 10,
    name: "Angela Reyes", position: "Customer Service Lead",
    basic: 27000, ot: 600, sss: 1458, philHealth: 472.5, pagIbig: 216, tax: 2200, bonus: 0,
    netPay: 23253.5, payoutMethod: "GCash", status: "Computed",
  },
];
