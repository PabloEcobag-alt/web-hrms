// Mock payroll data for the Payroll & Deduction feature.

import type { PayrollCalculation } from "./types";

export const MOCK_PAYROLL: PayrollCalculation[] = [
  {
    id: "1",
    employeeId: "EMP-001",
    employeeName: "John Smith",
    position: "Software Developer",
    basicSalary: 25000,
    additionalWage: {
      allowances: 2000,
      overtime: 1500,
      total: 3500
    },
    reducedWage: {
      lates: 0,
      casualLeave: 0,
      total: 0
    },
    deductions: {
      sss: 1350,
      philHealth: 437.50,
      pagIbig: 200,
      tax: 2000,
      total: 3987.50
    },
    realPay: 24512.50,
    payPeriod: "2026-04-01 to 2026-04-25",
    avatarIndex: 0,
    initials: "JS"
  },
  {
    id: "2",
    employeeId: "EMP-002",
    employeeName: "Maria Garcia",
    position: "HR Manager",
    basicSalary: 30000,
    additionalWage: {
      allowances: 2500,
      overtime: 0,
      total: 2500
    },
    reducedWage: {
      lates: 500,
      casualLeave: 0,
      total: 500
    },
    deductions: {
      sss: 1620,
      philHealth: 525,
      pagIbig: 240,
      tax: 2500,
      total: 4885
    },
    realPay: 27115,
    payPeriod: "2026-04-01 to 2026-04-25",
    avatarIndex: 1,
    initials: "MG"
  },
  {
    id: "3",
    employeeId: "EMP-003",
    employeeName: "David Chen",
    position: "Marketing Specialist",
    basicSalary: 22000,
    additionalWage: {
      allowances: 1800,
      overtime: 2000,
      total: 3800
    },
    reducedWage: {
      lates: 200,
      casualLeave: 1000,
      total: 1200
    },
    deductions: {
      sss: 1188,
      philHealth: 385,
      pagIbig: 176,
      tax: 1800,
      total: 3549
    },
    realPay: 21051,
    payPeriod: "2026-04-01 to 2026-04-25",
    avatarIndex: 2,
    initials: "DC"
  },
  {
    id: "4",
    employeeId: "EMP-004",
    employeeName: "Sarah Johnson",
    position: "Sales Representative",
    basicSalary: 20000,
    additionalWage: {
      allowances: 1500,
      overtime: 2500,
      total: 4000
    },
    reducedWage: {
      lates: 0,
      casualLeave: 0,
      total: 0
    },
    deductions: {
      sss: 1080,
      philHealth: 350,
      pagIbig: 160,
      tax: 1600,
      total: 3190
    },
    realPay: 20810,
    payPeriod: "2026-04-01 to 2026-04-25",
    avatarIndex: 3,
    initials: "SJ"
  },
  {
    id: "5",
    employeeId: "EMP-005",
    employeeName: "Robert Wilson",
    position: "Operations Manager",
    basicSalary: 32000,
    additionalWage: { allowances: 3000, overtime: 1200, total: 4200 },
    reducedWage: { lates: 0, casualLeave: 0, total: 0 },
    deductions: { sss: 1728, philHealth: 560, pagIbig: 256, tax: 2800, total: 5344 },
    // 32000 + 4200 - 0 - 5344
    realPay: 30856,
    payPeriod: "2026-04-01 to 2026-04-25",
    avatarIndex: 0,
    initials: "RW"
  },
  {
    id: "6",
    employeeId: "EMP-006",
    employeeName: "Emily Brown",
    position: "Accountant",
    basicSalary: 26000,
    additionalWage: { allowances: 2200, overtime: 800, total: 3000 },
    reducedWage: { lates: 300, casualLeave: 0, total: 300 },
    deductions: { sss: 1404, philHealth: 455, pagIbig: 208, tax: 2100, total: 4167 },
    // 26000 + 3000 - 300 - 4167
    realPay: 24533,
    payPeriod: "2026-04-01 to 2026-04-25",
    avatarIndex: 1,
    initials: "EB"
  },
  {
    id: "7",
    employeeId: "EMP-007",
    employeeName: "Michael Torres",
    position: "IT Support",
    basicSalary: 21000,
    additionalWage: { allowances: 1600, overtime: 1800, total: 3400 },
    reducedWage: { lates: 150, casualLeave: 700, total: 850 },
    deductions: { sss: 1134, philHealth: 367.50, pagIbig: 168, tax: 1700, total: 3369.50 },
    // 21000 + 3400 - 850 - 3369.50
    realPay: 20180.50,
    payPeriod: "2026-04-01 to 2026-04-25",
    avatarIndex: 2,
    initials: "MT"
  },
  {
    id: "8",
    employeeId: "EMP-008",
    employeeName: "Jessica Lee",
    position: "Graphic Designer",
    basicSalary: 23000,
    additionalWage: { allowances: 1800, overtime: 0, total: 1800 },
    reducedWage: { lates: 0, casualLeave: 0, total: 0 },
    deductions: { sss: 1242, philHealth: 402.50, pagIbig: 184, tax: 1850, total: 3678.50 },
    // 23000 + 1800 - 0 - 3678.50
    realPay: 21121.50,
    payPeriod: "2026-04-01 to 2026-04-25",
    avatarIndex: 3,
    initials: "JL"
  },
  {
    id: "9",
    employeeId: "EMP-009",
    employeeName: "Daniel Cruz",
    position: "Warehouse Supervisor",
    basicSalary: 24000,
    additionalWage: { allowances: 2000, overtime: 3000, total: 5000 },
    reducedWage: { lates: 0, casualLeave: 0, total: 0 },
    deductions: { sss: 1296, philHealth: 420, pagIbig: 192, tax: 1950, total: 3858 },
    // 24000 + 5000 - 0 - 3858
    realPay: 25142,
    payPeriod: "2026-04-01 to 2026-04-25",
    avatarIndex: 0,
    initials: "DC"
  },
  {
    id: "10",
    employeeId: "EMP-010",
    employeeName: "Angela Reyes",
    position: "Customer Service Lead",
    basicSalary: 27000,
    additionalWage: { allowances: 2400, overtime: 600, total: 3000 },
    reducedWage: { lates: 250, casualLeave: 1200, total: 1450 },
    deductions: { sss: 1458, philHealth: 472.50, pagIbig: 216, tax: 2200, total: 4346.50 },
    // 27000 + 3000 - 1450 - 4346.50
    realPay: 24203.50,
    payPeriod: "2026-04-01 to 2026-04-25",
    avatarIndex: 1,
    initials: "AR"
  },
  {
    id: "11",
    employeeId: "EMP-011",
    employeeName: "Kevin Santos",
    position: "Logistics Coordinator",
    basicSalary: 22500,
    additionalWage: { allowances: 1700, overtime: 1400, total: 3100 },
    reducedWage: { lates: 0, casualLeave: 0, total: 0 },
    deductions: { sss: 1215, philHealth: 393.75, pagIbig: 180, tax: 1800, total: 3588.75 },
    // 22500 + 3100 - 0 - 3588.75
    realPay: 22011.25,
    payPeriod: "2026-04-01 to 2026-04-25",
    avatarIndex: 2,
    initials: "KS"
  },
  {
    id: "12",
    employeeId: "EMP-012",
    employeeName: "Patricia Gomez",
    position: "Finance Analyst",
    basicSalary: 29000,
    additionalWage: { allowances: 2600, overtime: 900, total: 3500 },
    reducedWage: { lates: 400, casualLeave: 0, total: 400 },
    deductions: { sss: 1566, philHealth: 507.50, pagIbig: 232, tax: 2450, total: 4755.50 },
    // 29000 + 3500 - 400 - 4755.50
    realPay: 27344.50,
    payPeriod: "2026-04-01 to 2026-04-25",
    avatarIndex: 3,
    initials: "PG"
  }
];
