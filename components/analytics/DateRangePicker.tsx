"use client";

import { useState } from "react";
import { AppSelect } from "@/components/ui/app-select";

interface DateRangePickerProps {
  onDateChange: (startDate: string | undefined, endDate: string | undefined) => void;
}

type DatePreset = "all-time" | "7-days" | "30-days" | "this-month" | "custom";

export function DateRangePicker({ onDateChange }: DateRangePickerProps) {
  const [preset, setPreset] = useState<DatePreset>("all-time");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const calculateDateRange = (selectedPreset: DatePreset) => {
    const today = new Date();
    let start: Date | undefined;
    let end: Date | undefined;

    switch (selectedPreset) {
      case "all-time":
        start = undefined;
        end = undefined;
        break;
      case "7-days":
        start = new Date(today);
        start.setDate(today.getDate() - 7);
        end = today;
        break;
      case "30-days":
        start = new Date(today);
        start.setDate(today.getDate() - 30);
        end = today;
        break;
      case "this-month":
        start = new Date(today.getFullYear(), today.getMonth(), 1);
        end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        break;
      case "custom":
        // Keep current custom dates
        start = startDate ? new Date(startDate) : undefined;
        end = endDate ? new Date(endDate) : undefined;
        break;
    }

    return {
      start: start ? start.toISOString().split('T')[0] : undefined,
      end: end ? end.toISOString().split('T')[0] : undefined
    };
  };

  const handlePresetChange = (newPreset: DatePreset) => {
    setPreset(newPreset);
    const { start, end } = calculateDateRange(newPreset);
    setStartDate(start || "");
    setEndDate(end || "");
    onDateChange(start, end);
  };

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setStartDate(value);
    setPreset("custom");
    onDateChange(value || undefined, endDate || undefined);
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEndDate(value);
    setPreset("custom");
    onDateChange(startDate || undefined, value || undefined);
  };

  const handleClear = () => {
    setPreset("all-time");
    setStartDate("");
    setEndDate("");
    onDateChange(undefined, undefined);
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <AppSelect
        id="datePreset"
        value={preset}
        onValueChange={(v) => handlePresetChange(v as DatePreset)}
        options={[
          { value: "all-time", label: "All Time" },
          { value: "7-days", label: "Last 7 Days" },
          { value: "30-days", label: "Last 30 Days" },
          { value: "this-month", label: "This Month" },
          { value: "custom", label: "Custom Range" },
        ]}
        className="w-[160px]"
        triggerClassName="px-3 py-2 text-sm"
      />

      {preset === "custom" && (
        <>
          <input
            id="startDate"
            type="date"
            value={startDate}
            onChange={handleStartDateChange}
            className="px-3 py-2 border border-border rounded-lg text-sm bg-white focus:outline-none focus:ring-1 focus:ring-ring"
          />
          <input
            id="endDate"
            type="date"
            value={endDate}
            onChange={handleEndDateChange}
            className="px-3 py-2 border border-border rounded-lg text-sm bg-white focus:outline-none focus:ring-1 focus:ring-ring"
          />
        </>
      )}

      {preset !== "all-time" && (
        <button
          onClick={handleClear}
          className="px-3 py-2 bg-muted text-foreground text-sm font-medium rounded-lg hover:bg-muted/80 transition-colors"
        >
          Reset
        </button>
      )}
    </div>
  );
}
