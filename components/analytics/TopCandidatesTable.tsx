"use client";

import { TopCandidate } from "@/lib/types/analytics";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface TopCandidatesTableProps {
  data: TopCandidate[] | null;
  isLoading: boolean;
}

function Skeleton() {
  return (
    <div className="bg-white border border-border rounded-xl p-5 shadow-xs animate-pulse h-80">
      <div className="h-5 w-32 bg-muted rounded mb-4" />
      <div className="h-4 w-full bg-muted rounded mb-2" />
      <div className="h-4 w-full bg-muted rounded mb-2" />
      <div className="h-4 w-5/6 bg-muted rounded" />
    </div>
  );
}

export function TopCandidatesTable({ data, isLoading }: TopCandidatesTableProps) {
  if (isLoading) {
    return <Skeleton />;
  }

  return (
    <div className="bg-white border border-border rounded-xl p-5 shadow-xs h-80 space-y-4">
      <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
        Top Candidates
      </h3>
      <div className="border border-border rounded-lg max-h-60 overflow-y-auto">
        <Table>
          <TableHeader className="sticky top-0 bg-white z-10 shadow-xs">
            <TableRow>
              <TableHead className="font-semibold">Name</TableHead>
              <TableHead className="font-semibold">Position</TableHead>
              <TableHead className="font-semibold">Match Score</TableHead>
              <TableHead className="font-semibold">Result</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data && data.length > 0 ? (
              data.map((candidate, index) => (
                <TableRow key={`${candidate.applicantId}-${index}`}>
                  <TableCell className="font-medium text-foreground whitespace-nowrap">
                    {candidate.firstName} {candidate.lastName}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {candidate.position}
                  </TableCell>
                  <TableCell className="font-semibold text-foreground">
                    {candidate.matchScore}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="font-medium">
                      {candidate.screeningResult}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                  No candidates scored yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
