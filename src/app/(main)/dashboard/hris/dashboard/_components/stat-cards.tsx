import { AlertTriangle, CalendarOff, TrendingDown, TrendingUp, UserCheck, UserPlus, Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { mockEmployees } from "@/data/hris/employees";

function computeStats() {
  const total = mockEmployees.length;
  const active = mockEmployees.filter((e) => e.status === "Active").length;
  const probation = mockEmployees.filter((e) => e.status === "Probation").length;
  const kontrak = mockEmployees.filter((e) => e.employmentType === "Kontrak").length;

  // Kontrak berakhir dalam 60 hari
  const now = new Date();
  const in60Days = new Date(now.getTime() + 60 * 24 * 60 * 60 * 1000);
  const contractExpiring = mockEmployees.filter((e) => {
    if (!e.contractEndDate) return false;
    const end = new Date(e.contractEndDate);
    return end >= now && end <= in60Days;
  }).length;

  // Onboarding belum selesai
  const onboarding = mockEmployees.filter((e) => e.onboardingProgress < 100).length;

  return { total, active, probation, kontrak, contractExpiring, onboarding };
}

export function StatCards() {
  const { total, active, probation, contractExpiring, onboarding } = computeStats();

  return (
    <div className="grid grid-cols-1 gap-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs sm:grid-cols-2 xl:grid-cols-5 dark:*:data-[slot=card]:bg-card">
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex size-7 items-center justify-center rounded-lg border bg-muted text-muted-foreground">
              <Users className="size-4" />
            </div>
          </CardTitle>
          <CardDescription>Total Karyawan</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2">
            <div className="font-medium text-3xl tabular-nums leading-none tracking-tight">{total}</div>
            <Badge>
              <TrendingUp className="size-3" />
              +3 bulan ini
            </Badge>
          </div>
          <p className="text-muted-foreground text-sm">
            {active} aktif · {probation} probation
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex size-7 items-center justify-center rounded-lg border bg-muted text-muted-foreground">
              <UserCheck className="size-4" />
            </div>
          </CardTitle>
          <CardDescription>Hadir Hari Ini</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2">
            <div className="font-medium text-3xl tabular-nums leading-none tracking-tight">16</div>
            <Badge variant="secondary">
              <TrendingDown className="size-3" />2 terlambat
            </Badge>
          </div>
          <p className="text-muted-foreground text-sm">Dari {active} karyawan aktif</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex size-7 items-center justify-center rounded-lg border bg-muted text-muted-foreground">
              <CalendarOff className="size-4" />
            </div>
          </CardTitle>
          <CardDescription>Sedang Cuti</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2">
            <div className="font-medium text-3xl tabular-nums leading-none tracking-tight">3</div>
          </div>
          <p className="text-muted-foreground text-sm">1 pending approval</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex size-7 items-center justify-center rounded-lg border bg-muted text-muted-foreground">
              <AlertTriangle className="size-4" />
            </div>
          </CardTitle>
          <CardDescription>Kontrak Hampir Habis</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2">
            <div className="font-medium text-3xl tabular-nums leading-none tracking-tight">{contractExpiring}</div>
            {contractExpiring > 0 && <Badge variant="destructive">Perlu tindakan</Badge>}
          </div>
          <p className="text-muted-foreground text-sm">Dalam 60 hari ke depan</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex size-7 items-center justify-center rounded-lg border bg-muted text-muted-foreground">
              <UserPlus className="size-4" />
            </div>
          </CardTitle>
          <CardDescription>Onboarding Berjalan</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2">
            <div className="font-medium text-3xl tabular-nums leading-none tracking-tight">{onboarding}</div>
          </div>
          <p className="text-muted-foreground text-sm">Checklist belum 100%</p>
        </CardContent>
      </Card>
    </div>
  );
}
