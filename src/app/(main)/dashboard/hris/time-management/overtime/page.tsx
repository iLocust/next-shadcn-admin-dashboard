import { Check, Clock, Timer, X } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { mockEmployees } from "@/data/hris/employees";
import { mockOvertimeRequests } from "@/data/hris/overtime";

import { OvertimeTable } from "./_components/overtime-table";
import type { OvertimeRow } from "./_components/schema";

function buildRows(): OvertimeRow[] {
  return mockOvertimeRequests.map((ot) => {
    const emp = mockEmployees.find((e) => e.id === ot.employeeId);
    return { ...ot, employeeName: emp?.fullName ?? "Unknown" };
  });
}

export default function OvertimePage() {
  const rows = buildRows();
  const pending = rows.filter((r) => r.status === "Pending HR").length;
  const approved = rows.filter((r) => r.status === "Approved").length;
  const rejected = rows.filter((r) => r.status === "Rejected").length;
  const totalHours = rows.filter((r) => r.status === "Approved").reduce((s, r) => s + r.duration, 0);
  const totalHoursFormatted = `${Math.floor(totalHours / 60)}j ${totalHours % 60}m`;

  return (
    <div className="@container/main flex flex-col gap-4 md:gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="font-semibold text-xl">Overtime (Lembur)</h1>
        <p className="text-muted-foreground text-sm">Kelola pengajuan dan persetujuan lembur karyawan</p>
      </div>

      <div className="grid grid-cols-2 gap-4 *:data-[slot=card]:shadow-xs lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex size-7 items-center justify-center rounded-lg border bg-muted text-muted-foreground">
              <Clock className="size-4" />
            </CardTitle>
            <CardDescription>Pending Approval</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="font-medium text-3xl tabular-nums">{pending}</div>
            <p className="text-muted-foreground text-sm">Menunggu HR</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex size-7 items-center justify-center rounded-lg border bg-muted text-muted-foreground">
              <Check className="size-4" />
            </CardTitle>
            <CardDescription>Approved</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="font-medium text-3xl tabular-nums">{approved}</div>
            <p className="text-muted-foreground text-sm">Lembur disetujui</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex size-7 items-center justify-center rounded-lg border bg-muted text-muted-foreground">
              <X className="size-4" />
            </CardTitle>
            <CardDescription>Rejected</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="font-medium text-3xl tabular-nums">{rejected}</div>
            <p className="text-muted-foreground text-sm">Ditolak HR</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex size-7 items-center justify-center rounded-lg border bg-muted text-muted-foreground">
              <Timer className="size-4" />
            </CardTitle>
            <CardDescription>Total Jam Lembur</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="font-medium text-3xl tabular-nums">{totalHoursFormatted}</div>
            <p className="text-muted-foreground text-sm">Yang sudah disetujui</p>
          </CardContent>
        </Card>
      </div>

      <OvertimeTable data={rows} />
    </div>
  );
}
