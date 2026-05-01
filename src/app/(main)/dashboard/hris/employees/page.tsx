import { mockEmployees } from "@/data/hris/employees";

import { EmployeeTable } from "./_components/employee-table";

export default function EmployeesPage() {
  return (
    <div className="@container/main flex flex-col gap-4 md:gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="font-semibold text-xl">Employee Management</h1>
        <p className="text-muted-foreground text-sm">Kelola data seluruh karyawan perusahaan</p>
      </div>
      <EmployeeTable data={mockEmployees} />
    </div>
  );
}
