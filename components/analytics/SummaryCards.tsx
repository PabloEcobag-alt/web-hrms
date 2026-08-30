"use client";

import { StatCard } from "@/components/StatCard";
import { DashboardSummary } from "@/lib/types/analytics";
import { Users, CheckCircle, AlertTriangle, XCircle, BarChart3 } from "lucide-react";

interface SummaryCardsProps {
  data: DashboardSummary | null;
  isLoading: boolean;
}

function SkeletonCard() {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm animate-pulse">
      <div className="h-4 w-24 bg-gray-200 rounded mb-4" />
      <div className="h-8 w-16 bg-gray-200 rounded" />
    </div>
  );
}

export function SummaryCards({ data, isLoading }: SummaryCardsProps) {
  if (isLoading || !data) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
      <StatCard label="Total Applicants" value={data.totalApplicants} icon={Users} />
      <StatCard label="Qualified Rate" value={`${data.qualifiedRate}%`} icon={CheckCircle} />
      <StatCard label="Average Match Score" value={data.averageMatchScore} icon={BarChart3} />
      <StatCard label="Review Rate" value={`${data.reviewRate}%`} icon={AlertTriangle} />
      <StatCard label="Not Qualified Rate" value={`${data.notQualifiedRate}%`} icon={XCircle} />
    </div>
  );
}
