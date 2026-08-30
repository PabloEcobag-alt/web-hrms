"use client";

import type { UserReadDto } from "@/lib/services";
import type { Colors } from "./utils";
import type { TabKey } from "./types";
import { UserTable } from "./UserTable";
import { Pagination } from "./Pagination";

interface UserListSectionProps {
  c: Colors;
  loading: boolean;
  users: UserReadDto[];
  activeTab: TabKey;
  title: string;
  subtitle: string;
  usersByRole?: Record<string, UserReadDto[]>;
  usersByStatus?: Record<string, UserReadDto[]>;
  paginatedUsers: UserReadDto[];
  onEdit: (user: UserReadDto) => void;
  // Pagination
  totalItems: number;
  pageSize: number;
  safePage: number;
  totalPages: number;
  startIndex: number;
  onPageSizeChange: (size: number) => void;
  onPageChange: (page: number) => void;
}

/**
 * Renders the user list area for ViewUserManagement: loading / empty states,
 * the grouped-or-flat user tables, and pagination controls.
 */
export function UserListSection({
  c,
  loading,
  users,
  activeTab,
  title,
  subtitle,
  usersByRole,
  usersByStatus,
  paginatedUsers,
  onEdit,
  totalItems,
  pageSize,
  safePage,
  totalPages,
  startIndex,
  onPageSizeChange,
  onPageChange,
}: UserListSectionProps) {
  if (loading) {
    return (
      <div className="rounded-xl border p-8 text-center" style={{ background: c.cardBg, borderColor: c.cardBorder }}>
        <p className="text-sm font-medium" style={{ color: c.mutedText }}>Loading users…</p>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="rounded-xl border p-8 text-center" style={{ background: c.cardBg, borderColor: c.cardBorder }}>
        <p className="text-sm font-medium" style={{ color: c.mutedText }}>No users found</p>
      </div>
    );
  }

  return (
    <>
      {activeTab === "role" && usersByRole ? (
        <div className="flex flex-col gap-6">
          {Object.entries(usersByRole).map(([role, roleUsers]) => (
            <div key={role}>
              <h3 className="text-lg font-semibold mb-3" style={{ color: c.headingText }}>
                {role} ({roleUsers.length})
              </h3>
              <UserTable users={roleUsers} title={title} subtitle={subtitle} c={c} onEdit={onEdit} />
            </div>
          ))}
        </div>
      ) : activeTab === "status" && usersByStatus ? (
        <div className="flex flex-col gap-6">
          {Object.entries(usersByStatus).map(([status, statusUsers]) => (
            <div key={status}>
              <h3 className="text-lg font-semibold mb-3" style={{ color: c.headingText }}>
                {status} ({statusUsers.length})
              </h3>
              <UserTable users={statusUsers} title={title} subtitle={subtitle} c={c} onEdit={onEdit} />
            </div>
          ))}
        </div>
      ) : (
        <UserTable users={paginatedUsers} title={title} subtitle={subtitle} c={c} onEdit={onEdit} />
      )}

      {/* Pagination Controls */}
      <Pagination
        totalItems={totalItems}
        pageSize={pageSize}
        safePage={safePage}
        totalPages={totalPages}
        startIndex={startIndex}
        onPageSizeChange={onPageSizeChange}
        onPageChange={onPageChange}
      />
    </>
  );
}
