"use client";

import { AVATAR_STYLES } from "./data";

interface AvatarProps {
  name: string;
  size?: "sm" | "md" | "lg";
  avatarIndex?: number;
  initials?: string;
}

export function Avatar({ name, size = "md", avatarIndex = 0, initials }: AvatarProps) {
  const style = AVATAR_STYLES[avatarIndex % AVATAR_STYLES.length];
  const avatarInitials = initials || name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  
  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-11 h-11 text-sm",
    lg: "w-16 h-16 text-xl"
  };

  return (
    <div
      className={`${sizeClasses[size]} rounded-full flex items-center justify-center font-bold flex-shrink-0`}
      style={{ background: style.bg, color: style.color }}
    >
      {avatarInitials}
    </div>
  );
}
