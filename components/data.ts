import type { 
  Employee, 
  Applicant, 
  User, 
  AttendanceRecord, 
  PayrollCalculation
} from "./types.js";

export const AVATAR_STYLES = [
  { bg: "#E6F1FB", color: "#185FA5" },
  { bg: "#FAEEDA", color: "#854F0B" },
  { bg: "#EAF3DE", color: "#3B6D11" },
  { bg: "#F1EFE8", color: "#5F5E5A" },
  { bg: "#FAEEDA", color: "#854F0B" },
];

export const MOCK_EMPLOYEES: Employee[] = [
  {
    id: "1",
    name: "John Smith",
    initials: "JS",
    position: "Software Developer",
    department: "Engineering",
    hireDate: "2023-01-15",
    status: "Regular",
    email: "john.smith@company.com",
    phone: "+1 555-0123",
    avatarIndex: 0,
    documents: {
      personal: { completed: true, lastUpdated: "2023-01-20" },
      government: { completed: true, lastUpdated: "2023-01-25" },
      company: { completed: false, lastUpdated: "2023-01-18" },
      performance: { completed: true, lastUpdated: "2023-03-15" }
    }
  },
  {
    id: "2",
    name: "Maria Garcia",
    initials: "MG",
    position: "HR Manager",
    department: "Human Resources",
    hireDate: "2022-06-10",
    status: "Regular",
    email: "maria.garcia@company.com",
    phone: "+1 555-0124",
    avatarIndex: 1,
    documents: {
      personal: { completed: true, lastUpdated: "2022-06-15" },
      government: { completed: true, lastUpdated: "2022-06-20" },
      company: { completed: true, lastUpdated: "2022-06-25" },
      performance: { completed: true, lastUpdated: "2022-09-15" }
    }
  },
  {
    id: "3",
    name: "David Chen",
    initials: "DC",
    position: "Marketing Specialist",
    department: "Marketing",
    hireDate: "2023-03-01",
    status: "Probationary",
    email: "david.chen@company.com",
    phone: "+1 555-0125",
    avatarIndex: 2,
    documents: {
      personal: { completed: true, lastUpdated: "2023-03-05" },
      government: { completed: false, lastUpdated: "2023-03-03" },
      company: { completed: true, lastUpdated: "2023-03-10" },
      performance: { completed: false, lastUpdated: "" }
    }
  },
  {
    id: "4",
    name: "Sarah Johnson",
    initials: "SJ",
    position: "Sales Representative",
    department: "Sales",
    hireDate: "2023-02-15",
    status: "Training",
    email: "sarah.johnson@company.com",
    phone: "+1 555-0126",
    avatarIndex: 3,
    documents: {
      personal: { completed: false, lastUpdated: "2023-02-16" },
      government: { completed: false, lastUpdated: "" },
      company: { completed: false, lastUpdated: "2023-02-17" },
      performance: { completed: false, lastUpdated: "" }
    }
  }
];

export const MOCK_APPLICANTS: Applicant[] = [
  {
    id: "1",
    name: "Alex Thompson",
    initials: "AT",
    position: "Frontend Developer",
    status: "Training",
    email: "alex.thompson@email.com",
    phone: "+1 555-0130",
    avatarIndex: 0,
    appliedDate: "2023-11-01",
    interviewDate: "2023-11-05",
    expectedStart: "2023-12-01"
  },
  {
    id: "2",
    name: "Emma Wilson",
    initials: "EW",
    position: "UX Designer",
    status: "Probationary",
    email: "emma.wilson@email.com",
    phone: "+1 555-0131",
    avatarIndex: 1,
    appliedDate: "2023-10-15",
    interviewDate: "2023-10-20",
    expectedStart: "2023-11-15"
  },
  {
    id: "3",
    name: "Michael Brown",
    initials: "MB",
    position: "Backend Developer",
    status: "Regular",
    email: "michael.brown@email.com",
    phone: "+1 555-0132",
    avatarIndex: 2,
    appliedDate: "2023-09-01",
    interviewDate: "2023-09-05",
    expectedStart: "2023-10-01"
  }
];

export const MOCK_USERS: User[] = [
  {
    id: "1",
    name: "Admin User",
    initials: "AU",
    email: "admin@company.com",
    position: "System Administrator",
    currentRole: "HR Admin",
    status: "Active",
    permissions: ["full_access"],
    lastLogin: "2024-01-15",
    avatarIndex: 0
  },
  {
    id: "2",
    name: "Jane Manager",
    initials: "JM",
    email: "jane.manager@company.com",
    position: "Marketing Manager",
    currentRole: "Marketing Manager",
    status: "Active",
    permissions: ["marketing_access"],
    lastLogin: "2024-01-14",
    avatarIndex: 1
  },
  {
    id: "3",
    name: "Robert VP",
    initials: "RV",
    email: "robert.vp@company.com",
    position: "Vice President",
    currentRole: "Vice President",
    status: "Active",
    permissions: ["executive_access"],
    lastLogin: "2024-01-15",
    avatarIndex: 2
  },
  {
    id: "4",
    name: "Test Employee",
    initials: "TE",
    email: "test.employee@company.com",
    position: "Developer",
    currentRole: "Employee",
    status: "Inactive",
    permissions: ["basic_access"],
    lastLogin: "2024-01-10",
    avatarIndex: 3
  }
];

export const MOCK_ATTENDANCE: AttendanceRecord[] = [
  {
    id: "1",
    employeeId: "1",
    name: "John Smith",
    department: "Engineering",
    standardHours: "09:00",
    actualHours: "09:15",
    late: { frequency: 1, minutes: 15 },
    overtime: { frequency: 0, minutes: 0 },
    absences: 0,
    date: "2024-01-15"
  },
  {
    id: "2",
    employeeId: "2",
    name: "Maria Garcia",
    department: "Human Resources",
    standardHours: "09:00",
    actualHours: "08:45",
    late: { frequency: 0, minutes: 0 },
    overtime: { frequency: 1, minutes: 15 },
    absences: 0,
    date: "2024-01-15"
  },
  {
    id: "3",
    employeeId: "3",
    name: "David Chen",
    department: "Marketing",
    standardHours: "09:00",
    actualHours: "10:00",
    late: { frequency: 0, minutes: 0 },
    overtime: { frequency: 1, minutes: 60 },
    absences: 0,
    date: "2024-01-15"
  }
];

export const MOCK_PAYROLL: PayrollCalculation[] = [
  {
    id: "1",
    employeeId: "1",
    employeeName: "John Smith",
    position: "Software Developer",
    basicSalary: 5000,
    additionalWage: {
      allowances: 500,
      overtime: 200,
      bonuses: 1000
    },
    deductions: {
      tax: 800,
      insurance: 200,
      other: 100,
      total: 1100
    },
    grossPay: 6700,
    netPay: 5600,
    payPeriod: "2024-01"
  },
  {
    id: "2",
    employeeId: "2",
    employeeName: "Maria Garcia",
    position: "HR Manager",
    basicSalary: 6000,
    additionalWage: {
      allowances: 600,
      overtime: 0,
      bonuses: 800
    },
    deductions: {
      tax: 960,
      insurance: 240,
      other: 120,
      total: 1320
    },
    grossPay: 7400,
    netPay: 6080,
    payPeriod: "2024-01"
  }
];
