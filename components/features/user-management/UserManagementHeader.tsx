"use client";

import type { UserReadDto } from "@/lib/services";
import type { Colors } from "./utils";
import type { TabKey } from "./types";
import { tabs } from "./constants";
import { HRStatCard } from "./badges";

interface UserManagementHeaderProps {
  c: Colors;
  isAdmin: boolean;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onOpenRegister: () => void;
  users: UserReadDto[];
  activeUsers: number;
  inactiveUsers: number;
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
  errorMsg: string;
}

/**
 * Header block for the User Management view: title, search box,
 * register button, info banner, stat cards, and tabs.
 */
export function UserManagementHeader({
  c,
  isAdmin,
  searchQuery,
  onSearchChange,
  onOpenRegister,
  users,
  activeUsers,
  inactiveUsers,
  activeTab,
  onTabChange,
  errorMsg,
}: UserManagementHeaderProps) {
  return (
    <>
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white m-0">User Management</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1.5">
            Manage user roles, permissions, and access levels across the organization
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search employees..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          {isAdmin && (
            <button
              onClick={onOpenRegister}
              className="px-4 py-2 bg-black hover:bg-black/90 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
            >
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Employee Registration
            </button>
          )}
        </div>
      </div>

      {/* Info Banner */}
      <div className="flex items-start gap-3 p-4 rounded-xl border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950">
        <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke={c.bannerTitle}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
        <div>
          <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 m-0">Centralized User Hub</p>
          <p className="text-sm text-blue-500 dark:text-blue-300 mt-1">
            Assign specific roles and permissions to control user access to different parts of the system.
            Only users with appropriate permissions can modify sensitive data.
          </p>
        </div>
      </div>

      {errorMsg && (
        <div className="rounded-xl border p-3 text-sm font-medium" style={{ background: c.badgeBg, borderColor: c.badgeText, color: c.badgeText }}>
          {errorMsg}
        </div>
      )}

      {/* Stat Cards */}
      <div className="flex gap-4">
        <HRStatCard label="Total Users" count={users.length} inactiveCount={inactiveUsers} c={c} />
        <HRStatCard label="Active Users" count={activeUsers} inactiveCount={0} c={c} />
        <HRStatCard label="Inactive Users" count={inactiveUsers} inactiveCount={0} c={c} />
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => onTabChange(tab.key)}
              className={`px-5.5 py-3 text-sm font-medium border-none border-b-2 cursor-pointer whitespace-nowrap transition-colors focus:outline-none ${
                activeTab === tab.key
                  ? "border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400"
                  : "border-transparent text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
