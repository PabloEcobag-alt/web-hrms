// Static / mock data for the Employee Self-Service (ESS) feature.

import type { CutoffKey, TimeLog } from "./types";

export const CUTOFFS: Record<
  CutoffKey,
  { label: string; start: string; end: string; logs: TimeLog[] }
> = {
  active: {
    label: "Active (Upcoming) — May 1-15",
    start: "2026-05-01",
    end: "2026-05-15",
    logs: [
      { date: "2026-05-01", timeIn: "08:02", timeOut: "17:05" },
      { date: "2026-05-02", timeIn: "07:58", timeOut: "17:01" },
      { date: "2026-05-05", timeIn: "08:10", timeOut: "17:00" },
      { date: "2026-05-06", timeIn: "08:00", timeOut: "17:03" },
      { date: "2026-05-20", timeIn: "08:00", timeOut: "17:00" }, // future date, must be hidden
    ],
  },
  inactive: {
    label: "Inactive (Previous) — Apr 16-30",
    start: "2026-04-16",
    end: "2026-04-30",
    logs: [
      { date: "2026-04-16", timeIn: "08:05", timeOut: "17:00" },
      { date: "2026-04-17", timeIn: "08:00", timeOut: "16:58" },
      { date: "2026-04-20", timeIn: "08:01", timeOut: "17:10" },
      { date: "2026-04-29", timeIn: "07:55", timeOut: "17:02" },
    ],
  },
};

export const LEAVE_TYPES = ["Sick Leave", "Vacation Leave"];
export const TOTAL_LEAVE_CREDITS = 15;
