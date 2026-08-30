"use client";

import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import type { AttendanceRecord } from "./types";
import { type Colors, getAttendanceStatus } from "./utils";
import { AttendanceBadge } from "./badges";

export function AttendanceTable({ attendance, c, wrapperClassName }: {
  attendance: AttendanceRecord[];
  c?: Colors;
  // title/subtitle kept optional for backwards-compat; header now lives in the section.
  title?: string;
  subtitle?: string;
  wrapperClassName?: string;
}) {
  if (attendance.length === 0) {
    return (
      <div className="p-8 text-center text-sm text-muted-foreground">
        No attendance records match the current filters.
      </div>
    );
  }

  return (
    <Table className="w-full" wrapperClassName={wrapperClassName}>
      <TableHeader className="bg-background sticky top-0 z-10">
        <TableRow className="border-b border-border">
          <TableHead className="w-[260px] min-w-[260px] text-base font-medium text-muted-foreground px-5 py-4">Employee</TableHead>
          <TableHead className="w-[160px] min-w-[160px] text-base font-medium text-muted-foreground px-5 py-4">Department</TableHead>
          <TableHead className="w-[120px] min-w-[120px] text-base font-medium text-muted-foreground px-5 py-4">Standard</TableHead>
          <TableHead className="w-[120px] min-w-[120px] text-base font-medium text-muted-foreground px-5 py-4">Actual</TableHead>
          <TableHead className="w-[100px] min-w-[100px] text-base font-medium text-muted-foreground px-5 py-4">Late</TableHead>
          <TableHead className="w-[100px] min-w-[100px] text-base font-medium text-muted-foreground px-5 py-4">Early</TableHead>
          <TableHead className="w-[110px] min-w-[110px] text-base font-medium text-muted-foreground px-5 py-4">Absences</TableHead>
          <TableHead className="w-[140px] min-w-[140px] text-base font-medium text-muted-foreground px-5 py-4">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {attendance.map((record) => {
          const status = getAttendanceStatus(record);
          const isHighLateMinutes = record.late.minutes >= 1000;
          return (
            <TableRow
              key={record.id}
              className="hover:bg-muted/50 transition-colors border-b border-border"
            >
              <TableCell className="w-[260px] min-w-[260px] px-5 py-4">
                <span className="font-medium text-base text-foreground">{record.name}</span>
              </TableCell>
              <TableCell className="w-[160px] min-w-[160px] px-5 py-4 text-base font-normal text-muted-foreground">{record.department}</TableCell>
              <TableCell className="w-[120px] min-w-[120px] px-5 py-4 text-base font-normal text-foreground">{record.standardHours}</TableCell>
              <TableCell className="w-[120px] min-w-[120px] px-5 py-4">
                {record.actualHours === "--:--" ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border bg-rose-50 text-rose-700 border-rose-200/60">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                    Missing Log
                  </span>
                ) : (
                  <span className={`text-base ${record.absences > 0 ? "text-rose-600" : "text-foreground"}`}>{record.actualHours}</span>
                )}
              </TableCell>
              <TableCell className="w-[100px] min-w-[100px] px-5 py-4">
                <span className={`text-sm ${record.late.frequency > 0 ? "text-amber-600 font-medium" : "text-muted-foreground"} ${isHighLateMinutes ? "font-bold" : ""}`}>
                  {record.late.frequency > 0 ? `${record.late.frequency}/${record.late.minutes}` : "0/0"}
                </span>
              </TableCell>
              <TableCell className="w-[100px] min-w-[100px] px-5 py-4">
                <span className={`text-sm ${record.early.frequency > 0 ? "text-sky-600" : "text-muted-foreground"}`}>
                  {record.early.frequency > 0 ? `${record.early.frequency}/${record.early.minutes}` : "0/0"}
                </span>
              </TableCell>
              <TableCell className="w-[110px] min-w-[110px] px-5 py-4">
                <span className={`text-sm ${record.absences > 0 ? "text-rose-600 font-medium" : "text-muted-foreground"}`}>
                  {record.absences > 0 ? `${record.absences}` : "0"}
                </span>
              </TableCell>
              <TableCell className="w-[140px] min-w-[140px] px-5 py-4">
                <AttendanceBadge status={status} />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
