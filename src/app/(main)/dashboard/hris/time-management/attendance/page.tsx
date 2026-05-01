import { AlertTriangle, Clock, UserCheck, UserX } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { mockAttendance } from "@/data/hris/attendance";
import { mockEmployees } from "@/data/hris/employees";

import { AttendanceTable } from "./_components/attendance-table";
import type { AttendanceRow } from "./_components/schema";

const TODAY = "2025-05-01";

function buildRows(): AttendanceRow[] {
  return mockAttendance.map((a) => {
    const emp = mockEmployees.find((e) => e.id === a.employeeId);
    return { ...a, employeeName: emp?.fullName ?? "Unknown" };
  });
}

export default function AttendancePage() {
  const rows = buildRows();
  const todayRows = rows.filter((r) => r.date === TODAY);
  const onTime = todayRows.filter((r) => r.status === "On-time").length;
  const late = todayRows.filter((r) => r.status === "Late").length;
  const earlyLeave = todayRows.filter((r) => r.status === "Early Leave").length;
  const absent = todayRows.filter((r) => r.status === "Absent").length;

  return (
    <div className="@container/main flex flex-col gap-4 md:gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="font-semibold text-xl">Attendance</h1>
        <p className="text-muted-foreground text-sm">
          Rekap kehadiran karyawan —{" "}
          {new Date(TODAY).toLocaleDateString("id-ID", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 *:data-[slot=card]:shadow-xs lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex size-7 items-center justify-center rounded-lg border bg-muted text-muted-foreground">
              <UserCheck className="size-4" />
            </CardTitle>
            <CardDescription>Hadir Tepat Waktu</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="font-medium text-3xl tabular-nums">{onTime}</div>
            <p className="text-muted-foreground text-sm">Hari ini</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex size-7 items-center justify-center rounded-lg border bg-muted text-muted-foreground">
              <Clock className="size-4" />
            </CardTitle>
            <CardDescription>Terlambat</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="font-medium text-3xl tabular-nums">{late}</div>
            <p className="text-muted-foreground text-sm">Lebih dari jam masuk</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex size-7 items-center justify-center rounded-lg border bg-muted text-muted-foreground">
              <AlertTriangle className="size-4" />
            </CardTitle>
            <CardDescription>Pulang Lebih Awal</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="font-medium text-3xl tabular-nums">{earlyLeave}</div>
            <p className="text-muted-foreground text-sm">Early leave hari ini</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex size-7 items-center justify-center rounded-lg border bg-muted text-muted-foreground">
              <UserX className="size-4" />
            </CardTitle>
            <CardDescription>Tidak Hadir</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="font-medium text-3xl tabular-nums">{absent}</div>
            <p className="text-muted-foreground text-sm">Tanpa keterangan</p>
          </CardContent>
        </Card>
      </div>

      <AttendanceTable data={rows} />
    </div>
  );
}
