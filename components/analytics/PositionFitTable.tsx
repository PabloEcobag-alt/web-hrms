"use client";

import { PositionFit } from "@/lib/types/analytics";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface PositionFitTableProps {
  data: PositionFit[] | null;
  isLoading: boolean;
}

function Skeleton() {
  return (
    <div className="bg-white border border-border rounded-xl p-5 shadow-xs animate-pulse">
      <div className="h-5 w-32 bg-muted rounded mb-4" />
      <div className="space-y-2">
        <div className="h-4 w-full bg-muted rounded" />
        <div className="h-4 w-5/6 bg-muted rounded" />
        <div className="h-4 w-4/6 bg-muted rounded" />
      </div>
    </div>
  );
}

export function PositionFitTable({ data, isLoading }: PositionFitTableProps) {
  if (isLoading) {
    return <Skeleton />;
  }

  return (
    <div className="bg-white border border-border rounded-xl p-5 shadow-xs space-y-4">
      <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
        Position Fit
      </h3>
      <div className="border border-border rounded-lg overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/30">
            <TableRow>
              <TableHead className="font-semibold">Position</TableHead>
              <TableHead className="font-semibold">Applicants</TableHead>
              <TableHead className="font-semibold">Avg Match Score</TableHead>
              <TableHead className="font-semibold">Qualified</TableHead>
              <TableHead className="font-semibold">Review</TableHead>
              <TableHead className="font-semibold">Not Qualified</TableHead>
              <TableHead className="font-semibold">Fit</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data && data.length > 0 ? (
              data.map((fit, index) => (
                <TableRow key={`${fit.position}-${index}`}>
                  <TableCell className="font-medium text-foreground whitespace-nowrap">
                    {fit.position}
                  </TableCell>
                  <TableCell className="text-muted-foreground">{fit.totalApplicants}</TableCell>
                  <TableCell className="font-semibold text-foreground">
                    {fit.averageMatchScore}
                  </TableCell>
                  <TableCell className="font-semibold">{fit.qualifiedCount}</TableCell>
                  <TableCell className="text-muted-foreground">{fit.reviewCount}</TableCell>
                  <TableCell className="text-muted-foreground">{fit.notQualifiedCount}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="font-medium">
                      {fit.fitIndication}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                  No position data available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
