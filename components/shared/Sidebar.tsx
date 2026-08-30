"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronsUpDown, Check, X, ChevronRight } from "lucide-react";
import {
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  dashboardItem,
  navGroups,
  settingsNavItem,
  settingsChildren,
  systems,
} from "./SidebarNav";
import { SidebarProfileFooter } from "./SidebarProfileFooter";
import { SidebarNavSkeleton } from "./SidebarNavSkeleton";

export function Sidebar() {
  const pathname = usePathname();
  const { open, openMobile, setOpenMobile, toggleSidebar, isMobile } = useSidebar();
  const [mounted, setMounted] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setMounted(true);
  }, []);

  // Auto-expand any nav item whose route (or a sub-item route) is active.
  useEffect(() => {
    navGroups.forEach((group) => {
      group.children.forEach((item) => {
        if (item.subItems && item.subItems.length > 0) {
          const base = item.href.split("?")[0];
          if (pathname === base || pathname.startsWith(base)) {
            setExpandedItems((prev) => ({ ...prev, [item.name]: true }));
          }
        }
      });
    });
  }, [pathname]);

  const toggleExpanded = (name: string) => {
    setExpandedItems((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const isOpen = isMobile ? openMobile : open;

  const handleNavClick = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  if (mounted && !isOpen) {
    return null;
  }

  const DashboardIcon = dashboardItem.icon;
  const isDashboardActive = pathname === dashboardItem.href || pathname === "/";

  const isNavLoading = !mounted;

  // Flatten all group sub-items into a single list
  const allNavItems = navGroups.flatMap((group) => group.children);

  return (
    <>
      {isMobile && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[55] animate-in fade-in duration-200"
        />
      )}
      <aside className="fixed left-0 top-0 h-full w-72 flex flex-col border-r border-border bg-sidebar text-sidebar-foreground z-[60] transition-all duration-300 shadow-xl md:shadow-none animate-in slide-in-from-left duration-300">
        {/* Enterprise Module Switcher copied & aligned with clean spacing */}
        <SidebarHeader className="p-3 border-b border-border/50">
          <div className="flex items-center justify-between gap-2">
            <div className="flex-1 min-w-0">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex items-center justify-between p-2 rounded-xl hover:bg-sidebar-accent cursor-pointer transition-colors group gap-2 border border-transparent hover:border-border/40">
                    <div className="flex flex-col min-w-0 gap-1 pr-1">
                      <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-sidebar-foreground truncate leading-none">
                        Bren Raphael&apos;s
                      </h1>
                      <span className="text-xs font-semibold bg-violet-500 text-white px-2.5 py-1 rounded-md truncate mt-0.5 w-fit shadow-xs inline-block">
                        Human Resource Mgmt.
                      </span>
                    </div>
                    <ChevronsUpDown className="w-4 h-4 text-muted-foreground shrink-0 group-hover:text-sidebar-foreground transition-colors" />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-72 sm:w-80 bg-popover border border-border text-popover-foreground z-[99999] p-2 space-y-1 shadow-xl rounded-xl"
                  align="start"
                  side="bottom"
                  sideOffset={6}
                >
                  <DropdownMenuLabel className="text-[11px] text-muted-foreground font-bold uppercase tracking-wider px-3 py-1.5">
                    Select Enterprise Module
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="my-1 bg-border" />
                  {systems.map((sys) => {
                    const SysIcon = sys.icon;
                    return (
                      <DropdownMenuItem
                        key={sys.fullName}
                        onClick={() => {
                          if (sys.url) {
                            window.location.href = sys.url;
                          }
                        }}
                        className={`cursor-pointer text-xs flex items-center justify-between p-2.5 rounded-lg transition-all font-medium gap-3 ${
                          sys.active
                            ? "bg-violet-500/10 text-violet-700 dark:text-violet-300 font-semibold"
                            : "hover:bg-accent hover:text-accent-foreground"
                        }`}
                      >
                        <div className="flex items-center gap-3 overflow-hidden min-w-0 flex-1">
                          <div
                            className={`w-8 h-8 rounded-md flex items-center justify-center shrink-0 transition-colors ${
                              sys.active
                                ? "bg-violet-600 text-white shadow-xs"
                                : "bg-muted text-muted-foreground"
                            }`}
                          >
                            <SysIcon className="w-4 h-4 shrink-0" />
                          </div>
                          <div className="flex flex-col min-w-0 overflow-hidden flex-1 justify-center gap-0.5">
                            <span
                              className={`font-semibold text-xs truncate leading-snug ${
                                sys.active ? "text-foreground font-bold" : "text-foreground"
                              }`}
                            >
                              {sys.fullName}
                            </span>
                            <span className="text-[11px] text-muted-foreground truncate leading-tight">
                              {sys.desc}
                            </span>
                          </div>
                        </div>
                        {sys.active && (
                          <div className="w-5 h-5 rounded-full bg-violet-600 text-white flex items-center justify-center shrink-0 ml-2 shadow-xs">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                        )}
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            {isMobile && (
              <SidebarTrigger
                className="text-muted-foreground hover:text-sidebar-foreground h-8 w-8 rounded-lg shrink-0 cursor-pointer"
                title="Close Sidebar"
              >
                <X className="w-5 h-5" />
              </SidebarTrigger>
            )}
          </div>
        </SidebarHeader>

        {/* Sidebar Content Area with Flat Navigation List */}
        <SidebarContent className="p-md overflow-y-auto">
          <SidebarGroup className="p-0">
            <SidebarGroupContent>
              {isNavLoading ? (
                <SidebarNavSkeleton rows={6} />
              ) : (
                <SidebarMenu>
                  {/* Dashboard Tab */}
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      isActive={isDashboardActive}
                      className="w-full flex items-center gap-sm px-sm py-sm rounded-lg text-sm text-foreground transition-colors"
                    >
                      <Link href={dashboardItem.href} onClick={handleNavClick}>
                        <DashboardIcon className="w-4 h-4 shrink-0" />
                        <span>{dashboardItem.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  {/* Flat HR Navigation Links */}
                  {allNavItems.map((item) => {
                    const ItemIcon = item.icon;
                    const isActive =
                      pathname === item.href ||
                      (item.href !== "/" && pathname.startsWith(item.href));

                    // Items with subItems render as an expandable dropdown.
                    if (item.subItems && item.subItems.length > 0) {
                      const isExpanded = !!expandedItems[item.name];
                      const base = item.href.split("?")[0];
                      const isParentActive = pathname === base || pathname.startsWith(base);
                      return (
                        <SidebarMenuItem key={item.name}>
                          <SidebarMenuButton
                            isActive={isParentActive}
                            onClick={() => toggleExpanded(item.name)}
                            className="w-full flex items-center gap-sm px-sm py-sm rounded-lg text-sm text-foreground transition-colors cursor-pointer"
                          >
                            <ItemIcon className="w-4 h-4 shrink-0 text-muted-foreground" />
                            <span className="font-medium flex-1 text-left">{item.name}</span>
                            <ChevronRight
                              className={`w-4 h-4 shrink-0 text-muted-foreground transition-transform duration-200 ${isExpanded ? "rotate-90" : ""}`}
                            />
                          </SidebarMenuButton>

                          {isExpanded && (
                            <div className="mt-1 ml-4 flex flex-col gap-0.5 border-l border-border pl-2 animate-in fade-in slide-in-from-top-1 duration-200">
                              {item.subItems.map((sub) => {
                                const subActive = pathname === sub.href;
                                return (
                                  <SidebarMenuButton
                                    key={sub.name}
                                    asChild
                                    isActive={subActive}
                                    className="w-full flex items-center gap-sm px-sm py-1.5 rounded-lg text-sm text-foreground transition-colors hover:bg-sidebar-accent"
                                  >
                                    <Link href={sub.href} onClick={handleNavClick}>
                                      <span className="font-medium leading-snug">{sub.name}</span>
                                    </Link>
                                  </SidebarMenuButton>
                                );
                              })}
                            </div>
                          )}
                        </SidebarMenuItem>
                      );
                    }

                    return (
                      <SidebarMenuItem key={item.name}>
                        <SidebarMenuButton
                          asChild
                          isActive={isActive}
                          className="w-full flex items-center gap-sm px-sm py-sm rounded-lg text-sm text-foreground transition-colors"
                        >
                          <Link href={item.href} onClick={handleNavClick}>
                            <ItemIcon className="w-4 h-4 shrink-0 text-muted-foreground" />
                            <span className="font-medium">{item.name}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              )}
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        {/* Sidebar Footer with Settings & Profile */}
        <SidebarFooter className="p-sm border-t border-border space-y-2">
          {/* Settings Item rendered as flat navigation */}
          {settingsChildren.map((item) => {
            const ItemIcon = item.icon;
            const isActive = pathname === item.href;
            return (
              <SidebarMenuButton
                key={item.name}
                asChild
                isActive={isActive}
                className="w-full flex items-center gap-sm px-sm py-sm rounded-lg text-sm text-foreground transition-colors hover:bg-sidebar-accent"
              >
                <Link href={item.href} onClick={handleNavClick}>
                  <ItemIcon className="w-4 h-4 shrink-0 text-muted-foreground" />
                  <span className="flex-1 text-left font-medium">{item.name}</span>
                </Link>
              </SidebarMenuButton>
            );
          })}

          <div className="pt-sm border-t border-border">
            <SidebarProfileFooter />
          </div>
        </SidebarFooter>

        <SidebarRail />
      </aside>
    </>
  );
}
