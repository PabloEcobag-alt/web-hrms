"use client";

import { useState, useMemo, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ApplicationTrend } from "@/lib/types/analytics";

interface ApplicationTrendsChartProps {
  data: ApplicationTrend[] | null;
  isLoading: boolean;
  startDate?: string;
  endDate?: string;
}

const OFFICIAL_ROLES = [
  "On Call",
  "Merchandiser On Call",
  "Store Attendant",
  "Commissary Helper",
  "OJT (On-the-Job Trainee)",
  "Intern/Summer Job"
];

const COLOR_PALETTE = [
  "#7C3AED", // violet-600
  "#2563EB", // blue-600
  "#10B981", // emerald-500
  "#F59E0B", // amber-500
  "#EF4444", // red-500
  "#EC4899", // pink-500
  "#06B6D4", // cyan-500
  "#65A30D", // lime-600
];

export function ApplicationTrendsChart({ data, isLoading, startDate, endDate }: ApplicationTrendsChartProps) {
  // Role selection state - initialized with all official roles
  const [selectedRoles, setSelectedRoles] = useState<string[]>(OFFICIAL_ROLES);

  const toggleRole = (role: string) => {
    setSelectedRoles(prev => 
      prev.includes(role) 
        ? prev.filter(r => r !== role)
        : [...prev, role]
    );
  };

  const toggleAll = () => {
    if (selectedRoles.length === OFFICIAL_ROLES.length) {
      setSelectedRoles([]);
    } else {
      setSelectedRoles(OFFICIAL_ROLES);
    }
  };

  // Client-side pivoting and zero-filling
  const chartData = useMemo(() => {
    if (!data || data.length === 0) return [];

    let minDate: string;
    let maxDate: string;

    // Use DateFilter boundaries if provided, otherwise fall back to data range
    if (startDate && endDate) {
      minDate = startDate;
      maxDate = endDate;
    } else {
      const dates = data.map(d => d.date).sort();
      minDate = dates[0];
      maxDate = dates[dates.length - 1];
    }

    // Generate all continuous dates between min and max
    const allDates: string[] = [];
    const currentDate = new Date(minDate);
    const endDateObj = new Date(maxDate);

    while (currentDate <= endDateObj) {
      allDates.push(currentDate.toISOString().split('T')[0]);
      currentDate.setDate(currentDate.getDate() + 1);
    }

    // Create a map of existing data for quick lookup
    const dataMap = new Map<string, Map<string, number>>();
    data.forEach(d => {
      if (!dataMap.has(d.date)) {
        dataMap.set(d.date, new Map());
      }
      dataMap.get(d.date)!.set(d.role, d.count);
    });

    // Map over continuous dates, filling gaps with zeros
    return allDates.map(date => {
      const obj: Record<string, any> = { date };
      
      // Initialize ALL official roles to 0 for every day
      OFFICIAL_ROLES.forEach(role => {
        obj[role] = 0;
      });

      // Overwrite with actual counts from backend data
      const dateData = dataMap.get(date);
      if (dateData) {
        OFFICIAL_ROLES.forEach(role => {
          if (dateData.has(role)) {
            obj[role] = dateData.get(role);
          }
        });
      }

      return obj;
    });
  }, [data, startDate, endDate]);

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded mb-4 w-1/3"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Application Trends
        </h3>
        <div className="h-64 flex items-center justify-center text-gray-500">
          No trend data available
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          Application Trends Over Time
        </h3>
        
        {/* Role Filter UI */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={toggleAll}
            className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
              selectedRoles.length === OFFICIAL_ROLES.length
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {selectedRoles.length === OFFICIAL_ROLES.length ? "Deselect All" : "Select All"}
          </button>
          
          {OFFICIAL_ROLES.map((role, index) => (
            <button
              key={role}
              onClick={() => toggleRole(role)}
              className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
                selectedRoles.includes(role)
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              style={{
                ...(selectedRoles.includes(role) && { 
                  backgroundColor: COLOR_PALETTE[index % COLOR_PALETTE.length] 
                })
              }}
            >
              {role}
            </button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={256}>
        <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey="date" 
            stroke="#6b7280"
            tick={{ fill: '#6b7280' }}
            minTickGap={30}
          />
          <YAxis 
            stroke="#6b7280"
            tick={{ fill: '#6b7280' }}
            allowDecimals={false}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#ffffff', 
              border: '1px solid #e5e7eb',
              borderRadius: '0.5rem',
              color: '#111827'
            }}
          />
          {selectedRoles.map((role, index) => (
            <Line
              key={role}
              type="monotone"
              dataKey={role}
              stroke={COLOR_PALETTE[index % COLOR_PALETTE.length]}
              strokeWidth={2}
              dot={false}
              name={role}
              connectNulls={true}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
