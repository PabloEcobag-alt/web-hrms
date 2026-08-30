"use client";

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface SidebarNavSkeletonProps {
  rows?: number;
}

export function SidebarNavSkeleton({ rows = 5 }: SidebarNavSkeletonProps) {
  return (
    <div
      className="animate-in fade-in duration-300"
      role="status"
      aria-label="Loading navigation"
    >
      <div className="flex items-center gap-sm px-sm py-sm">
        <Skeleton className="h-4 w-4 rounded" />
        <Skeleton className="h-4 w-24 rounded" />
      </div>

      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-sm px-sm py-sm mt-xs">
          <Skeleton className="h-4 w-4 rounded" />
          <Skeleton className="h-4 flex-1 rounded" style={{ maxWidth: `${60 + ((i * 17) % 40)}%` }} />
          <Skeleton className="h-4 w-4 rounded" />
        </div>
      ))}
      <span className="sr-only">Loading navigation&#x2026;</span>
    </div>
  );
}
