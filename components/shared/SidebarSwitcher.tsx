"use client";

import React, { useState } from "react";
import {
  ChevronsUpDown,
  Building2,
  Briefcase,
  Globe,
  Layers,
  LayoutGrid,
  Plus,
  Check,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

export type Organization = {
  id: string;
  name: string;
  subtitle: string;
  plan: string;
  icon: React.ElementType;
  colorClass: string;
  badgeClass: string;
};

export const ORGANIZATIONS: Organization[] = [
  {
    id: "portal",
    name: "Enterprise Portal",
    subtitle: "All Systems Hub",
    plan: "Portal",
    icon: LayoutGrid,
    colorClass: "bg-slate-800 text-white",
    badgeClass: "bg-slate-700 text-white",
  },
  {
    id: "org-1",
    name: "Bren Raphael's",
    subtitle: "HR Management System",
    plan: "Enterprise",
    icon: Building2,
    colorClass: "bg-violet-600 text-white",
    badgeClass: "bg-violet-500 text-white",
  },
  {
    id: "org-2",
    name: "Acme Corp",
    subtitle: "Manila Headquarters",
    plan: "HQ",
    icon: Briefcase,
    colorClass: "bg-blue-600 text-white",
    badgeClass: "bg-blue-500 text-white",
  },
  {
    id: "org-3",
    name: "SentraCX Tech",
    subtitle: "Cebu Regional Branch",
    plan: "Regional",
    icon: Globe,
    colorClass: "bg-emerald-600 text-white",
    badgeClass: "bg-emerald-500 text-white",
  },
  {
    id: "org-4",
    name: "Global Operations",
    subtitle: "Davao Logistics Hub",
    plan: "Operations",
    icon: Layers,
    colorClass: "bg-amber-600 text-white",
    badgeClass: "bg-amber-500 text-white",
  },
];

export function SidebarSwitcher() {
  const [selectedOrg, setSelectedOrg] = useState<Organization>(
    ORGANIZATIONS.find((org) => org.id === "org-1") ?? ORGANIZATIONS[0]
  );

  const IconComponent = selectedOrg.icon;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="w-full flex items-center justify-between gap-xs p-xs rounded-xl hover:bg-sidebar-accent transition-colors cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-ring group border border-transparent hover:border-border/50 text-left"
        >
          <div className="flex items-center gap-sm min-w-0 overflow-hidden flex-1">
            <div
              className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm shrink-0 shadow-xs transition-transform group-hover:scale-105 ${selectedOrg.colorClass}`}
            >
              <IconComponent className="w-5 h-5" />
            </div>

            <div className="flex flex-col min-w-0 overflow-hidden flex-1">
              <span className="font-extrabold text-base tracking-tight text-sidebar-foreground truncate">
                {selectedOrg.name}
              </span>
              <span
                className={`text-[11px] font-semibold px-1.5 py-0.5 rounded truncate w-fit transition-colors ${selectedOrg.badgeClass}`}
              >
                {selectedOrg.subtitle}
              </span>
            </div>
          </div>

          <ChevronsUpDown className="w-4 h-4 text-muted-foreground shrink-0 group-hover:text-sidebar-foreground transition-colors" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-64 bg-popover border-border text-popover-foreground z-[99999] shadow-xl p-sm rounded-xl space-y-1"
        side="bottom"
        align="start"
      >
        <DropdownMenuLabel className="text-xs font-bold text-muted-foreground uppercase tracking-wider px-sm py-xs">
          Workspaces &amp; Branches
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="bg-border" />

        {ORGANIZATIONS.map((org, index) => {
          const OrgIcon = org.icon;
          const isSelected = org.id === selectedOrg.id;

          return (
            <DropdownMenuItem
              key={org.id}
              onClick={() => setSelectedOrg(org)}
              className={`cursor-pointer text-xs font-medium gap-sm p-sm rounded-lg transition-colors flex items-center justify-between ${
                isSelected
                  ? "bg-sidebar-accent font-semibold text-sidebar-accent-foreground"
                  : "hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              <div className="flex items-center gap-sm min-w-0 overflow-hidden">
                <div
                  className={`w-7 h-7 rounded-md flex items-center justify-center shrink-0 ${org.colorClass}`}
                >
                  <OrgIcon className="w-4 h-4" />
                </div>
                <div className="flex flex-col min-w-0 overflow-hidden">
                  <span className="truncate font-bold text-foreground text-xs">
                    {org.name}
                  </span>
                  <span className="truncate text-[10px] text-muted-foreground">
                    {org.subtitle}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0 ml-2">
                <Badge
                  variant="outline"
                  className="text-[9px] px-1.5 py-0 font-medium"
                >
                  {org.plan}
                </Badge>
                {isSelected ? (
                  <Check className="w-4 h-4 text-violet-600 shrink-0" />
                ) : (
                  <DropdownMenuShortcut className="text-[10px] font-mono text-muted-foreground">
                    ⌘{index + 1}
                  </DropdownMenuShortcut>
                )}
              </div>
            </DropdownMenuItem>
          );
        })}

        <DropdownMenuSeparator className="bg-border" />

        <DropdownMenuItem
          onClick={() => {
            alert("Organization management & creation modal coming soon!");
          }}
          className="cursor-pointer text-xs font-medium gap-sm p-sm rounded-lg hover:bg-accent text-violet-600 hover:text-violet-700 flex items-center"
        >
          <div className="w-7 h-7 rounded-md bg-violet-100 border border-violet-200 flex items-center justify-center shrink-0">
            <Plus className="w-4 h-4 text-violet-600" />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-xs">Add New Workspace</span>
            <span className="text-[10px] text-muted-foreground">
              Create or join an organization
            </span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
