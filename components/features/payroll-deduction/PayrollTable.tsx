"use client";

import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import type { PayrollCalculation } from "./types";
import { type Colors, formatCurrency } from "./utils";

export function PayrollTable({ payroll, wrapperClassName }: {
  payroll: PayrollCalculation[];
  c?: Colors;
  title?: string;
  subtitle?: string;
  payPeriod?: string;
  wrapperClassName?: string;
}) {
  if (payroll.length === 0) {
    return (
      <div className="p-8 text-center text-sm text-muted-foreground">
        No payroll records match the current filters.
      </div>
    );
  }

  return (
    <Table className="w-full" wrapperClassName={wrapperClassName}>
      <TableHeader className="bg-background sticky top-0 z-10">
        <TableRow className="border-b border-border">
          <TableHead className="w-[240px] min-w-[240px] text-base font-medium text-muted-foreground px-5 py-4 whitespace-nowrap">Employee</TableHead>
          <TableHead className="w-[180px] min-w-[180px] text-base font-medium text-muted-foreground px-5 py-4 whitespace-nowrap">Position</TableHead>
          <TableHead className="w-[120px] min-w-[120px] text-base font-medium text-muted-foreground px-5 py-4 whitespace-nowrap">Basic</TableHead>
          <TableHead className="w-[140px] min-w-[140px] text-base font-medium text-muted-foreground px-5 py-4 whitespace-nowrap">Add&apos;l Wage</TableHead>
          <TableHead className="w-[150px] min-w-[150px] text-base font-medium text-muted-foreground px-5 py-4 whitespace-nowrap">Reduced Wage</TableHead>
          <TableHead className="w-[110px] min-w-[110px] text-base font-medium text-muted-foreground px-5 py-4 whitespace-nowrap">SSS</TableHead>
          <TableHead className="w-[130px] min-w-[130px] text-base font-medium text-muted-foreground px-5 py-4 whitespace-nowrap">PhilHealth</TableHead>
          <TableHead className="w-[120px] min-w-[120px] text-base font-medium text-muted-foreground px-5 py-4 whitespace-nowrap">Pag-IBIG</TableHead>
          <TableHead className="w-[110px] min-w-[110px] text-base font-medium text-muted-foreground px-5 py-4 whitespace-nowrap">Tax</TableHead>
          <TableHead className="w-[130px] min-w-[130px] text-base font-medium text-muted-foreground px-5 py-4 whitespace-nowrap">Real Pay</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {payroll.map((record) => (
          <TableRow key={record.id} className="hover:bg-muted/50 transition-colors border-b border-border">
            <TableCell className="w-[240px] min-w-[240px] px-5 py-4">
              <span className="font-medium text-base text-foreground whitespace-nowrap">{record.employeeName}</span>
            </TableCell>
            <TableCell className="w-[180px] min-w-[180px] px-5 py-4 text-base font-normal text-muted-foreground whitespace-nowrap">{record.position}</TableCell>
            <TableCell className="w-[120px] min-w-[120px] px-5 py-4 text-base text-foreground">{formatCurrency(record.basicSalary)}</TableCell>
            <TableCell className="w-[140px] min-w-[140px] px-5 py-4 text-base text-emerald-600">+{formatCurrency(record.additionalWage.total)}</TableCell>
            <TableCell className={`w-[150px] min-w-[150px] px-5 py-4 text-base ${record.reducedWage.total > 0 ? "text-rose-600" : "text-muted-foreground"}`}>-{formatCurrency(record.reducedWage.total)}</TableCell>
            <TableCell className="w-[110px] min-w-[110px] px-5 py-4 text-base text-muted-foreground">{formatCurrency(record.deductions.sss)}</TableCell>
            <TableCell className="w-[130px] min-w-[130px] px-5 py-4 text-base text-muted-foreground">{formatCurrency(record.deductions.philHealth)}</TableCell>
            <TableCell className="w-[120px] min-w-[120px] px-5 py-4 text-base text-muted-foreground">{formatCurrency(record.deductions.pagIbig)}</TableCell>
            <TableCell className="w-[110px] min-w-[110px] px-5 py-4 text-base text-muted-foreground">{formatCurrency(record.deductions.tax)}</TableCell>
            <TableCell className="w-[130px] min-w-[130px] px-5 py-4 text-base font-semibold text-foreground">{formatCurrency(record.realPay)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
