export type EmployeeStatus = "Probationary" | "Regular" | "Training";
export type ApplicantStatus = "Training" | "Probationary" | "Regular";
export type UserRole = "Marketing Manager" | "Vice President" | "HR Admin" | "Employee";
export type UserStatus = "Active" | "Inactive" | "Suspended";

export interface DocumentStatus {
  completed: boolean;
  lastUpdated: string;
}

export interface Employee {
  id: string;
  name: string;
  initials: string;
  position: string;
  department: string;
  hireDate: string;
  status: EmployeeStatus;
  email: string;
  phone: string;
  avatarIndex: number;
  documents: {
    personal: DocumentStatus;
    government: DocumentStatus;
    company: DocumentStatus;
    performance: DocumentStatus;
  };
}

export interface Applicant {
  id: string;
  name: string;
  initials: string;
  position: string;
  status: ApplicantStatus;
  email: string;
  phone: string;
  avatarIndex: number;
  appliedDate: string;
  interviewDate: string;
  expectedStart: string;
}

export interface User {
  id: string;
  name: string;
  initials: string;
  email: string;
  position: string;
  currentRole: UserRole;
  status: UserStatus;
  permissions: string[];
  lastLogin: string;
  avatarIndex: number;
}

export interface LateInfo {
  frequency: number;
  minutes: number;
}

export interface OvertimeInfo {
  frequency: number;
  minutes: number;
}

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  name: string;
  department: string;
  standardHours: string;
  actualHours: string;
  late: LateInfo;
  overtime: OvertimeInfo;
  absences: number;
  date: string;
}

export interface AdditionalWage {
  allowances: number;
  overtime: number;
  bonuses: number;
}

export interface Deductions {
  tax: number;
  insurance: number;
  other: number;
  total: number;
}

export interface PayrollCalculation {
  id: string;
  employeeId: string;
  employeeName: string;
  position: string;
  basicSalary: number;
  additionalWage: AdditionalWage;
  deductions: Deductions;
  grossPay: number;
  netPay: number;
  payPeriod: string;
}
