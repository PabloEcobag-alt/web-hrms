import {
  LayoutDashboard,
  Users,
  FileText,
  Clock,
  DollarSign,
  UserCheck,
  BarChart3,
  Settings,
  Building2,
  ShoppingCart,
  Users2,
  CreditCard,
  Truck,
  Activity,
  ClipboardList,
  CalendarDays,
  Calculator,
  Wallet,
  LayoutGrid,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface NavItem {
  name: string;
  href: string;
  icon: LucideIcon;
  subItems?: NavItem[];
}

export interface NavGroup {
  name: string;
  icon: LucideIcon;
  children: NavItem[];
}

export interface SystemItem {
  fullName: string;
  desc: string;
  icon: LucideIcon;
  active: boolean;
  url?: string;
}

export const dashboardItem: NavItem = {
  name: "Dashboard",
  href: "/",
  icon: LayoutDashboard,
};

export const navGroups: NavGroup[] = [
  {
    name: "HR Management",
    icon: Users,
    children: [
      { name: "Recruitment & Hiring", href: "/recruitment-hiring", icon: UserCheck },
      { name: "Recruitment & Analytics", href: "/recruitment-analytics", icon: BarChart3 },
      { name: "Digital 201 Files", href: "/digital-201-file", icon: FileText },
      { name: "Attendance & Biometrics", href: "/attendance-biometrics", icon: Clock, subItems: [
        { name: "Live Biometrics", href: "/attendance-biometrics/live-biometrics", icon: Activity },
        { name: "Leave & Cash Advance", href: "/attendance-biometrics/leave-cash-advance", icon: ClipboardList },
        { name: "Daily Attendance", href: "/attendance-biometrics/daily-attendance", icon: CalendarDays },
      ] },
      { name: "Payroll & Deductions", href: "/payroll-deduction", icon: DollarSign, subItems: [
        { name: "Payroll Computation", href: "/payroll-deduction/payroll-computation", icon: Calculator },
        { name: "Employee Payroll", href: "/payroll-deduction/employee-payroll", icon: Wallet },
      ] },
      // { name: "User Management", href: "/user-management", icon: Users2 }, // temporarily hidden
    ],
  },
];

export const settingsNavItem: NavItem = {
  name: "Settings",
  href: "/settings",
  icon: Settings,
};

export const settingsChildren: NavItem[] = [
  // { name: "User Management", href: "/user-management", icon: Users2 }, // temporarily hidden
  { name: "Access Control", href: "#", icon: Settings },
];

export const systems: SystemItem[] = [
  {
    fullName: "Enterprise Portal",
    desc: "All systems hub & app launcher",
    icon: LayoutGrid,
    active: false,
    url: process.env.NEXT_PUBLIC_HOST_URL ?? "https://localhost:3000/",
  },
  {
    fullName: "Customer Relationship Management",
    desc: "Contact profiles, tickets & marketing",
    icon: Building2,
    active: false,
    url: process.env.NEXT_PUBLIC_CRMS_URL ?? "https://localhost:3005/",
  },
  {
    fullName: "Human Resource Management",
    desc: "Staff directory, recruitment & payroll",
    icon: Users2,
    active: true,
    url: process.env.NEXT_PUBLIC_HRMS_URL ?? "https://localhost:3001/",
  },
  {
    fullName: "E-Commerce Storefront",
    desc: "Online orders & products",
    icon: ShoppingCart,
    active: false,
    url: process.env.NEXT_PUBLIC_OOS_URL ?? "https://localhost:3004/",
  },
  {
    fullName: "Point of Sale",
    desc: "Retail & register checkout",
    icon: CreditCard,
    active: false,
    url: process.env.NEXT_PUBLIC_POS_URL ?? "https://localhost:3002/",
  },
  {
    fullName: "Supply Chain Management",
    desc: "Inventory & logistics",
    icon: Truck,
    active: false,
    url: process.env.NEXT_PUBLIC_SCMS_URL ?? "https://localhost:3003/",
  },
];
