export interface UserFormState {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  appAccesses: AppAccessState[];
}

export interface AppAccessState {
  appName: "HRMS" | "POS" | "CRMS" | "SCRMS";
  enabled: boolean;
  modules?: ModuleAccessState[];
  subRole?: "Cashier" | "Manager";
  locationId?: number;
}

export interface ModuleAccessState {
  moduleName: "EmployeePortal" | "Payroll" | "Attendance";
  permissions: {
    canRead: boolean;
    canWrite: boolean;
    canDelete: boolean;
    canExport: boolean;
  };
}

export interface LocationOption {
  id: number;
  name: string;
}

export const MOCK_LOCATIONS: LocationOption[] = [
  { id: 101, name: "Branch 1 (Main)" },
  { id: 102, name: "Branch 2 (North)" },
  { id: 103, name: "Branch 3 (South)" },
  { id: 104, name: "Branch 4 (East)" },
  { id: 105, name: "Branch 5 (West)" }
];
