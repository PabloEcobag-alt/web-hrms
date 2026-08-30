"use client";

import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from "react";
import api from "../lib/api";

type User = {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  mustChangePassword: boolean;
  role: string;
  apps: string[];
  appNames: string[];
  appObjects: any[];
  moduleAccess?: string[];
  permissions?: string[];
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  logout: () => Promise<void>;
  updateUser: (updates: Partial<User>) => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const validate = useCallback(async (): Promise<User | null> => {
    try {
      const res = await api.get("/api/erp-auth/validate");
      
      const rawUser = res.data.user || res.data;
      if (!rawUser) return null;
      
      const moduleAccess = rawUser?.apps?.flatMap((a: any) => 
        a.modules?.map((m: any) => m.moduleName) || []
      ) || [];
      
      const appNames = rawUser?.apps?.map((a: any) => a.appName) || [];
      const apps = [...new Set([...appNames, ...moduleAccess])];
      
      const mappedUser = {
        ...rawUser,
        role: rawUser?.roles?.[0] || "Employee",
        apps,
        appNames,
        appObjects: rawUser?.apps || [],
        moduleAccess,
        permissions: moduleAccess
      };
      
      return mappedUser;
    } catch { return null; }
  }, []);

  const refresh = useCallback(async (): Promise<boolean> => {
    try {
      await api.post("/api/erp-auth/refresh");
      return true;
    } catch { return false; }
  }, []);

  useEffect(() => {
    const init = async () => {
      let u = await validate();
      if (u) { setUser(u); setIsLoading(false); return; }

      const refreshed = await refresh();
      if (refreshed) u = await validate();

      setUser(u);
      setIsLoading(false);
    };

    init();
  }, [validate, refresh]);

  const logout = useCallback(async (): Promise<void> => {
    try {
      await api.post("/api/erp-auth/logout");
    } finally {
      setUser(null);
    }
  }, []);

  const updateUser = useCallback((updates: Partial<User>) => {
    setUser(prev => prev ? { ...prev, ...updates } : null);
  }, []);

  const contextValue = useMemo(() => ({
    user,
    isLoading,
    logout,
    updateUser
  }), [user, isLoading, logout, updateUser]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};