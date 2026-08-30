"use client";

import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import type { UserReadDto } from "@/lib/services";
import type { UserStatus } from "./types";
import { type Colors } from "./utils";
import { AVATAR_STYLES } from "./constants";
import { RoleBadge, StatusBadge } from "./badges";

export function UserTable({ users, title, subtitle, c, onEdit, onDelete }: {
  users: UserReadDto[]; title: string; subtitle: string;
  c: Colors;
  onEdit: (user: UserReadDto) => void;
  onDelete?: (user: UserReadDto) => void;
}) {
  const getInitials = (first: string | null | undefined, last: string | null | undefined) =>
    `${first?.charAt(0) || ''}${last?.charAt(0) || ''}`.toUpperCase();

  return (
    <div className="rounded-xl border overflow-hidden" style={{
      background: c.cardBg,
      borderColor: c.cardBorder,
    }}>
      <div className="p-5 border-b" style={{
        borderColor: c.cardBorder,
      }}>
        <h2 className="text-lg font-semibold m-0" style={{ color: c.headingText }}>{title}</h2>
        <p className="text-sm mt-1" style={{ color: c.mutedText }}>{subtitle}</p>
      </div>
      <div className="overflow-x-auto">
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 15 }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${c.cardBorder}` }}>
              {["NAME", "USERNAME", "EMAIL", "ROLE", "STATUS", "TYPE", "APPS", "ACTIONS"].map((col) => (
                <th key={col} style={{
                  padding: "14px 24px",
                  textAlign: "left",
                  fontSize: 12,
                  fontWeight: 700,
                  color: c.colHeader,
                  letterSpacing: "0.07em",
                  whiteSpace: "nowrap",
                }}>
                  {col}
                </th>
              ))}</tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={user.Id}
                onClick={() => onEdit(user)}
                style={{
                  borderBottom: idx < users.length - 1 ? `1px solid ${c.rowDivider}` : "none",
                  background: c.cardBg,
                  cursor: "pointer",
                }}>
                <td style={{ padding: "18px 24px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 700,
                      fontSize: 14,
                      background: AVATAR_STYLES[idx % AVATAR_STYLES.length].bg,
                      color: AVATAR_STYLES[idx % AVATAR_STYLES.length].color,
                    }}>
                      {getInitials(user.FirstName, user.LastName)}
                    </div>
                    <span style={{ fontWeight: 600, color: c.headingText, fontSize: 15 }}>
                      {user.FirstName} {user.LastName}
                    </span>
                  </div>
                </td>
                <td style={{ padding: "18px 24px", color: c.bodyText, fontSize: 15 }}>{user.Username}</td>
                <td style={{ padding: "18px 24px", color: c.bodyText, fontSize: 15 }}>{user.Email}</td>
                <td style={{ padding: "18px 24px" }}>
                  <RoleBadge role={user.Role} c={c} />
                </td>
                <td style={{ padding: "18px 24px" }}>
                  <StatusBadge status={user.Status as UserStatus} c={c} />
                </td>
                <td style={{ padding: "18px 24px", color: c.bodyText, fontSize: 15 }}>
                  {user.Type || "Internal"}
                </td>
                <td style={{ padding: "18px 24px", color: c.bodyText, fontSize: 15 }}>
                  {user.Apps?.length ?? 0} modules
                </td>
                <td style={{ padding: "18px 24px" }} onClick={(e) => e.stopPropagation()}>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        className="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                        aria-label="Row actions"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-44 rounded-lg border border-border bg-white p-1.5 shadow-md">
                      <DropdownMenuItem
                        onClick={() => onEdit(user)}
                        className="flex cursor-pointer items-center gap-3 rounded-md px-3.5 py-2.5 text-sm font-normal text-black hover:bg-muted"
                      >
                        <Pencil className="h-4 w-4 text-muted-foreground" />
                        <span>Edit User</span>
                      </DropdownMenuItem>
                      {onDelete && (
                        <DropdownMenuItem
                          onClick={() => onDelete(user)}
                          className="flex cursor-pointer items-center gap-3 rounded-md px-3.5 py-2.5 text-sm font-normal text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
