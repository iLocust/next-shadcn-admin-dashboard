import { CalendarDays, Moon, Sun, Users } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { mockEmployees } from "@/data/hris/employees";
import { mockSchedules } from "@/data/hris/schedules";

import { ScheduleTable } from "./_components/schedule-table";
import type { ScheduleRow } from "./_components/schema";

const TODAY = "2025-05-01";

function buildRows(): ScheduleRow[] {
  return mockSchedules.map((sc) => {
    const emp = mockEmployees.find((e) => e.id === sc.employeeId);
    return { ...sc, employeeName: emp?.fullName ?? "Unknown" };
  });
}

export default function SchedulePage() {
  const rows = buildRows();
  const activeRows = rows.filter((r) => r.status === "Active");
  const todayRows = activeRows.filter((r) => r.date === TODAY);
  const totalActive = activeRows.length;
  const todayTotal = todayRows.length;
  const morningShift = todayRows.filter((r) => r.shiftType === "Morning").length;
  const eveningShift = todayRows.filter((r) => r.shiftType === "Evening").length;

  return (
    <div className="@container/main flex flex-col gap-4 md:gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="font-semibold text-xl">Jadwal Kerja</h1>
        <p className="text-muted-foreground text-sm">Kelola jadwal dan shift kerja karyawan</p>
      </div>

      <div className="grid grid-cols-2 gap-4 *:data-[slot=card]:shadow-xs lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex size-7 items-center justify-center rounded-lg border bg-muted text-muted-foreground">
              <CalendarDays className="size-4" />
            </CardTitle>
            <CardDescription>Total Jadwal Aktif</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="font-medium text-3xl tabular-nums">{totalActive}</div>
            <p className="text-muted-foreground text-sm">Semua jadwal aktif</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex size-7 items-center justify-center rounded-lg border bg-muted text-muted-foreground">
              <Users className="size-4" />
            </CardTitle>
            <CardDescription>Jadwal Hari Ini</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="font-medium text-3xl tabular-nums">{todayTotal}</div>
            <p className="text-muted-foreground text-sm">Karyawan terjadwal</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex size-7 items-center justify-center rounded-lg border bg-muted text-muted-foreground">
              <Sun className="size-4" />
            </CardTitle>
            <CardDescription>Morning Shift</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="font-medium text-3xl tabular-nums">{morningShift}</div>
            <p className="text-muted-foreground text-sm">08:00 – 17:00</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex size-7 items-center justify-center rounded-lg border bg-muted text-muted-foreground">
              <Moon className="size-4" />
            </CardTitle>
            <CardDescription>Evening Shift</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="font-medium text-3xl tabular-nums">{eveningShift}</div>
            <p className="text-muted-foreground text-sm">14:00 – 22:00</p>
          </CardContent>
        </Card>
      </div>

      <ScheduleTable data={rows} />
    </div>
  );
}
