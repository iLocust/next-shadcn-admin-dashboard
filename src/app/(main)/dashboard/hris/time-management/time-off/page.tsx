import { CalendarOff, Check, Clock, X } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { mockEmployees } from "@/data/hris/employees";
import { mockLeaveRequests } from "@/data/hris/time-off";

import { LeaveTable } from "./_components/leave-table";
import type { LeaveRequestRow } from "./_components/schema";

function buildRows(): LeaveRequestRow[] {
  return mockLeaveRequests.map((req) => {
    const emp = mockEmployees.find((e) => e.id === req.employeeId);
    return {
      ...req,
      employeeName: emp?.fullName ?? "Unknown",
    };
  });
}

export default function TimeOffPage() {
  const rows = buildRows();
  const pending = rows.filter((r) => r.status === "Pending").length;
  const approved = rows.filter((r) => r.status === "Approved").length;
  const rejected = rows.filter((r) => r.status === "Rejected").length;
  const totalDays = rows.filter((r) => r.status === "Approved").reduce((s, r) => s + r.totalDays, 0);

  return (
    <div className="@container/main flex flex-col gap-4 md:gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="font-semibold text-xl">Time Off</h1>
        <p className="text-muted-foreground text-sm">Kelola pengajuan cuti dan izin karyawan</p>
      </div>

      {/* Stat cards */}
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
            <p className="text-muted-foreground text-sm">Menunggu keputusan HR</p>
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
            <p className="text-muted-foreground text-sm">{totalDays} hari total diambil</p>
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
            <p className="text-muted-foreground text-sm">Pengajuan ditolak</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex size-7 items-center justify-center rounded-lg border bg-muted text-muted-foreground">
              <CalendarOff className="size-4" />
            </CardTitle>
            <CardDescription>Total Pengajuan</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="font-medium text-3xl tabular-nums">{rows.length}</div>
            <p className="text-muted-foreground text-sm">Bulan ini</p>
          </CardContent>
        </Card>
      </div>

      <LeaveTable data={rows} />
    </div>
  );
}
