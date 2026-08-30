// Mock attendance records for the Attendance & Biometrics feature.

import type { AttendanceRecord } from "./types";

export const MOCK_ATTENDANCE: AttendanceRecord[] = [
  {
    id: "1",
    employeeId: "EMP-001",
    name: "John Smith",
    department: "Engineering",
    standardHours: "350:00",
    actualHours: "350:15",
    late: { frequency: 1, minutes: 15 },
    early: { frequency: 0, minutes: 0 },
    absences: 0,
    date: "2024-01-15",
    avatarIndex: 0,
    initials: "JS"
  },
  {
    id: "2",
    employeeId: "EMP-002",
    name: "Maria Garcia",
    department: "Human Resources",
    standardHours: "350:00",
    actualHours: "349:45",
    late: { frequency: 0, minutes: 0 },
    early: { frequency: 1, minutes: 15 },
    absences: 0,
    date: "2024-01-15",
    avatarIndex: 1,
    initials: "MG"
  },
  {
    id: "3",
    employeeId: "EMP-003",
    name: "David Chen",
    department: "Marketing",
    standardHours: "350:00",
    actualHours: "350:00",
    late: { frequency: 0, minutes: 0 },
    early: { frequency: 0, minutes: 0 },
    absences: 0,
    date: "2024-01-15",
    avatarIndex: 2,
    initials: "DC"
  },
  {
    id: "4",
    employeeId: "EMP-004",
    name: "Sarah Johnson",
    department: "Sales",
    standardHours: "350:00",
    actualHours: "350:00",
    late: { frequency: 0, minutes: 0 },
    early: { frequency: 0, minutes: 0 },
    absences: 0,
    date: "2024-01-15",
    avatarIndex: 3,
    initials: "SJ"
  },
  {
    id: "5",
    employeeId: "EMP-005",
    name: "Robert Wilson",
    department: "Operations",
    standardHours: "350:00",
    actualHours: "--:--",
    late: { frequency: 0, minutes: 0 },
    early: { frequency: 0, minutes: 0 },
    absences: 1,
    date: "2024-01-15",
    avatarIndex: 4,
    initials: "RW"
  },
  {
    id: "6",
    employeeId: "EMP-006",
    name: "Emily Brown",
    department: "Operations",
    standardHours: "350:00",
    actualHours: "313:10",
    late: { frequency: 35, minutes: 1990 },
    early: { frequency: 2, minutes: 30 },
    absences: 0,
    date: "2024-01-15",
    avatarIndex: 0,
    initials: "EB"
  }
];
