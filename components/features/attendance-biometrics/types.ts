// Types for the Attendance & Biometrics feature.

export interface LateInfo {
  frequency: number;
  minutes: number;
}

export interface EarlyInfo {
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
  early: EarlyInfo;
  absences: number;
  date: string;
  avatarIndex: number;
  initials: string;
}

export type TabKey = "daily" | "monthly" | "department";
