"use client";

import EmployeeShiftSchedule from "./EmployeeShiftSchedule";
import type { ESSProps } from "./features/employee-ess/types";
import { CutoffViewer } from "./features/employee-ess/CutoffViewer";
import { LeaveForm } from "./features/employee-ess/LeaveForm";
import { CashAdvanceForm } from "./features/employee-ess/CashAdvanceForm";

export default function EmployeeESS({ c, isDark }: ESSProps) {
  return (
    <div className="flex flex-col gap-4 md:gap-6">
      {/* US-HRMS-002: Shift Schedule Card + Monthly Calendar */}
      <EmployeeShiftSchedule c={c} isDark={isDark} />

      <CutoffViewer c={c} isDark={isDark} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <LeaveForm c={c} isDark={isDark} />
        <CashAdvanceForm c={c} isDark={isDark} />
      </div>
    </div>
  );
}
