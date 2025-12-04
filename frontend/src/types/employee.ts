export interface Employee {
    id: string;
    name: string;
    email: string;
    position: string;
    salary: number;
    createdAt: string;
    updatedAt: string;
}

export interface EmployeeFilters {
    search?: string;
    position?: string;
    minSalary?: number;
    maxSalary?: number;
    sortBy?: "name" | "email" | "position" | "salary" | "createdAt" | "updatedAt";
    sortOrder?: "asc" | "desc";
}

export interface EmployeeStats {
    totalEmployees: number;
    averageSalary: number;
    totalPayroll: number;
    highestSalary: {
        id: string;
        name: string;
        salary: number;
        position: string;
    } | null;
    lowestSalary: {
        id: string;
        name: string;
        salary: number;
        position: string;
    } | null;
}
