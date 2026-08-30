"use client";

import React, { useState, useMemo } from "react";
import { AppSelect } from "@/components/ui/app-select";

type Colors = {
  cardBg: string;
  cardBorder: string;
  rowDivider: string;
  headingText: string;
  bodyText: string;
  mutedText: string;
  colHeader: string;
  onTime: string;
  late: string;
  earlyOut: string;
  overtime: string;
  bannerTitle: string;
};

interface ShiftScheduleProps {
  c: Colors;
  isDark: boolean;
}

type ShiftType = "Morning" | "Afternoon" | "Night" | "Rest Day";

interface ShiftDay {
  date: number;
  dayName: string;
  shift: ShiftType;
  isRestDay: boolean;
  isCurrentDay: boolean;
}

const MOCK_SHIFT_DATA: ShiftDay[] = [
  { date: 1, dayName: "Mon", shift: "Morning", isRestDay: false, isCurrentDay: false },
  { date: 2, dayName: "Tue", shift: "Morning", isRestDay: false, isCurrentDay: false },
  { date: 3, dayName: "Wed", shift: "Morning", isRestDay: false, isCurrentDay: false },
  { date: 4, dayName: "Thu", shift: "Morning", isRestDay: false, isCurrentDay: false },
  { date: 5, dayName: "Fri", shift: "Morning", isRestDay: false, isCurrentDay: false },
  { date: 6, dayName: "Sat", shift: "Rest Day", isRestDay: true, isCurrentDay: false },
  { date: 7, dayName: "Sun", shift: "Rest Day", isRestDay: true, isCurrentDay: false },
  { date: 8, dayName: "Mon", shift: "Morning", isRestDay: false, isCurrentDay: false },
  { date: 9, dayName: "Tue", shift: "Morning", isRestDay: false, isCurrentDay: false },
  { date: 10, dayName: "Wed", shift: "Morning", isRestDay: false, isCurrentDay: false },
  { date: 11, dayName: "Thu", shift: "Morning", isRestDay: false, isCurrentDay: false },
  { date: 12, dayName: "Fri", shift: "Morning", isRestDay: false, isCurrentDay: false },
  { date: 13, dayName: "Sat", shift: "Rest Day", isRestDay: true, isCurrentDay: false },
  { date: 14, dayName: "Sun", shift: "Rest Day", isRestDay: true, isCurrentDay: false },
  { date: 15, dayName: "Mon", shift: "Afternoon", isRestDay: false, isCurrentDay: true }, // Rotating shift starts here
  { date: 16, dayName: "Tue", shift: "Afternoon", isRestDay: false, isCurrentDay: false },
  { date: 17, dayName: "Wed", shift: "Afternoon", isRestDay: false, isCurrentDay: false },
  { date: 18, dayName: "Thu", shift: "Afternoon", isRestDay: false, isCurrentDay: false },
  { date: 19, dayName: "Fri", shift: "Afternoon", isRestDay: false, isCurrentDay: false },
  { date: 20, dayName: "Sat", shift: "Rest Day", isRestDay: true, isCurrentDay: false },
  { date: 21, dayName: "Sun", shift: "Rest Day", isRestDay: true, isCurrentDay: false },
  { date: 22, dayName: "Mon", shift: "Afternoon", isRestDay: false, isCurrentDay: false },
  { date: 23, dayName: "Tue", shift: "Afternoon", isRestDay: false, isCurrentDay: false },
  { date: 24, dayName: "Wed", shift: "Afternoon", isRestDay: false, isCurrentDay: false },
  { date: 25, dayName: "Thu", shift: "Afternoon", isRestDay: false, isCurrentDay: false },
  { date: 26, dayName: "Fri", shift: "Afternoon", isRestDay: false, isCurrentDay: false },
  { date: 27, dayName: "Sat", shift: "Rest Day", isRestDay: true, isCurrentDay: false },
  { date: 28, dayName: "Sun", shift: "Rest Day", isRestDay: true, isCurrentDay: false },
  { date: 29, dayName: "Mon", shift: "Night", isRestDay: false, isCurrentDay: false },
  { date: 30, dayName: "Tue", shift: "Night", isRestDay: false, isCurrentDay: false },
  { date: 31, dayName: "Wed", shift: "Night", isRestDay: false, isCurrentDay: false },
];

const CURRENT_SHIFT = {
  type: "Afternoon" as ShiftType,
  time: "13:00 - 22:00",
  date: "January 15, 2025",
};

function shiftColor(shift: ShiftType, c: Colors): string {
  switch (shift) {
    case "Morning": return c.onTime;
    case "Afternoon": return c.overtime;
    case "Night": return c.earlyOut;
    case "Rest Day": return c.mutedText;
    default: return c.bodyText;
  }
}

function shiftBg(shift: ShiftType, c: Colors, isDark: boolean): string {
  switch (shift) {
    case "Morning": return c.onTime + "15";
    case "Afternoon": return c.overtime + "15";
    case "Night": return c.earlyOut + "15";
    case "Rest Day": return isDark ? "#1f2937" : "#f3f4f6";
    default: return c.cardBg;
  }
}

export default function EmployeeShiftSchedule({ c, isDark }: ShiftScheduleProps) {
  const [selectedMonth, setSelectedMonth] = useState("January 2025");

  const weeks = useMemo(() => {
    const result: ShiftDay[][] = [];
    let currentWeek: ShiftDay[] = [];
    
    MOCK_SHIFT_DATA.forEach((day, idx) => {
      currentWeek.push(day);
      if (currentWeek.length === 7 || idx === MOCK_SHIFT_DATA.length - 1) {
        result.push(currentWeek);
        currentWeek = [];
      }
    });
    
    return result;
  }, []);

  return (
    <div className="space-y-4">
      {/* Current Shift Card */}
      <div className="rounded-xl border p-4 md:p-5" style={{ background: c.cardBg, borderColor: c.cardBorder }}>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base md:text-lg font-semibold m-0" style={{ color: c.headingText }}>Current Shift</h2>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold" style={{ background: shiftColor(CURRENT_SHIFT.type, c) + "20", color: shiftColor(CURRENT_SHIFT.type, c) }}>
            <span className="w-2 h-2 rounded-full" style={{ background: shiftColor(CURRENT_SHIFT.type, c) }} />
            {CURRENT_SHIFT.type}
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-xs mb-1" style={{ color: c.mutedText }}>Time</p>
            <p className="text-sm font-semibold" style={{ color: c.bodyText }}>{CURRENT_SHIFT.time}</p>
          </div>
          <div>
            <p className="text-xs mb-1" style={{ color: c.mutedText }}>Date</p>
            <p className="text-sm font-semibold" style={{ color: c.bodyText }}>{CURRENT_SHIFT.date}</p>
          </div>
        </div>
      </div>

      {/* Monthly Shift Calendar */}
      <div className="rounded-xl border overflow-hidden" style={{ background: c.cardBg, borderColor: c.cardBorder }}>
        <div className="p-3 md:p-5 border-b flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2" style={{ borderColor: c.cardBorder }}>
          <h2 className="text-base md:text-lg font-semibold m-0" style={{ color: c.headingText }}>Monthly Shift Calendar</h2>
          <AppSelect
            value={selectedMonth}
            onValueChange={setSelectedMonth}
            options={[
              { value: "January 2025", label: "January 2025" },
              { value: "February 2025", label: "February 2025" },
              { value: "March 2025", label: "March 2025" },
            ]}
            className="w-[160px]"
          />
        </div>
        
        {/* Calendar Grid */}
        <div className="p-3 md:p-5">
          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map((day) => (
              <div key={day} className="text-center text-xs font-bold py-2" style={{ color: c.colHeader, letterSpacing: "0.07em" }}>
                {day}
              </div>
            ))}
          </div>
          
          {/* Calendar Days */}
          <div className="space-y-1">
            {weeks.map((week, weekIdx) => (
              <div key={weekIdx} className="grid grid-cols-7 gap-1">
                {week.map((day) => (
                  <div
                    key={`${day.date}-${day.dayName}`}
                    className="rounded-lg p-2 text-center transition-all"
                    style={{
                      background: day.isRestDay 
                        ? (isDark ? "#1f2937" : "#f3f4f6")
                        : shiftBg(day.shift, c, isDark),
                      border: day.isCurrentDay ? `2px solid ${c.onTime}` : "none",
                      opacity: day.isRestDay ? 0.6 : 1,
                    }}
                  >
                    <div className="text-xs font-semibold mb-1" style={{ color: day.isRestDay ? c.mutedText : c.headingText }}>
                      {day.date}
                    </div>
                    <div className="text-xs font-medium" style={{ color: day.isRestDay ? c.mutedText : shiftColor(day.shift, c) }}>
                      {day.isRestDay ? "Rest" : day.shift}
                    </div>
                    {day.isCurrentDay && (
                      <div className="mt-1">
                        <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background: c.onTime }} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t" style={{ borderColor: c.rowDivider }}>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded" style={{ background: c.onTime }} />
              <span className="text-xs" style={{ color: c.bodyText }}>Morning</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded" style={{ background: c.overtime }} />
              <span className="text-xs" style={{ color: c.bodyText }}>Afternoon</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded" style={{ background: c.earlyOut }} />
              <span className="text-xs" style={{ color: c.bodyText }}>Night</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded" style={{ background: isDark ? "#1f2937" : "#f3f4f6" }} />
              <span className="text-xs" style={{ color: c.bodyText }}>Rest Day</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
