// Shared types for the Employee Self-Service (ESS) feature.

export type Colors = {
  cardBg: string;
  cardBorder: string;
  rowDivider: string;
  headingText: string;
  bodyText: string;
  mutedText: string;
  colHeader: string;
  bannerTitle: string;
  onTime: string;
  late: string;
  earlyOut: string;
  absent: string;
  overtime: string;
};

export interface ESSProps {
  c: Colors;
  isDark: boolean;
}

export type CutoffKey = "active" | "inactive";

export interface TimeLog {
  date: string; // YYYY-MM-DD
  timeIn: string;
  timeOut: string;
}

export type LeaveStatus = "Pending Approval" | "Approved" | "Rejected";
