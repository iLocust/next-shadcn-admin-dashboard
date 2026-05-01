import type React from "react";

import { notFound } from "next/navigation";

import { Briefcase, Building2, Calendar, Mail, MapPin, Phone, User } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { mockEmployees } from "@/data/hris/employees";
import { getInitials } from "@/lib/utils";

const statusVariant = {
  Active: "default",
  Probation: "secondary",
  Inactive: "outline",
} as const;

export default async function EmployeeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const employee = mockEmployees.find((e) => e.id === id);

  if (!employee) notFound();

  return (
    <div className="@container/main flex flex-col gap-4 md:gap-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="size-16">
            <AvatarFallback className="text-lg">{getInitials(employee.fullName)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1">
            <h1 className="font-semibold text-xl">{employee.fullName}</h1>
            <p className="text-muted-foreground text-sm">
              {employee.jobPosition} · {employee.division}
            </p>
            <div className="flex items-center gap-2">
              <Badge variant={statusVariant[employee.status]} className="rounded-full text-xs">
                {employee.status}
              </Badge>
              <span className="text-muted-foreground text-xs">{employee.nip}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Info Pribadi */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <User className="size-4" />
              Informasi Pribadi
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <InfoRow icon={Mail} label="Email" value={employee.email} />
            <InfoRow icon={Phone} label="Nomor HP" value={employee.phone} />
            <InfoRow icon={MapPin} label="Alamat" value={employee.address ?? "—"} />
            <InfoRow icon={User} label="Jenis Kelamin" value={employee.gender} />
          </CardContent>
        </Card>

        {/* Info Pekerjaan */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Briefcase className="size-4" />
              Info Pekerjaan
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <InfoRow icon={Building2} label="Cabang" value={employee.branch} />
            <InfoRow icon={Building2} label="Region" value={employee.region} />
            <InfoRow icon={Briefcase} label="Divisi" value={employee.division} />
            <InfoRow icon={Briefcase} label="Jabatan" value={employee.jobPosition} />
            <Separator />
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-xs">Tipe Karyawan</span>
              <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                {employee.employmentType}
              </span>
            </div>
            <InfoRow
              icon={Calendar}
              label="Bergabung"
              value={new Date(employee.joinDate).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            />
            {employee.contractEndDate && (
              <InfoRow
                icon={Calendar}
                label="Kontrak Berakhir"
                value={new Date(employee.contractEndDate).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              />
            )}
            {employee.probationEndDate && (
              <InfoRow
                icon={Calendar}
                label="Probation Berakhir"
                value={new Date(employee.probationEndDate).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              />
            )}
          </CardContent>
        </Card>

        {/* Onboarding Progress */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="text-base">Onboarding Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary transition-all"
                  style={{ width: `${employee.onboardingProgress}%` }}
                />
              </div>
              <span className="font-medium text-sm tabular-nums">{employee.onboardingProgress}%</span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-5">
              <OnboardingStep label="Data Dasar" done={employee.onboardingProgress >= 20} />
              <OnboardingStep label="Role & Akses" done={employee.onboardingProgress >= 40} />
              <OnboardingStep label="Jadwal & Shift" done={employee.onboardingProgress >= 60} />
              <OnboardingStep label="KPI Pertama" done={employee.onboardingProgress >= 80} />
              <OnboardingStep label="Dokumen" done={employee.onboardingProgress >= 100} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function InfoRow({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="flex items-start gap-2">
      <Icon className="mt-0.5 size-3.5 shrink-0 text-muted-foreground" />
      <div className="flex flex-col gap-0.5">
        <span className="text-muted-foreground text-xs">{label}</span>
        <span className="text-sm">{value}</span>
      </div>
    </div>
  );
}

function OnboardingStep({ label, done }: { label: string; done: boolean }) {
  return (
    <div
      className={`flex items-center gap-1.5 rounded-md border px-3 py-2 text-xs ${done ? "border-primary/30 bg-primary/5 text-primary" : "text-muted-foreground"}`}
    >
      <div className={`size-1.5 rounded-full ${done ? "bg-primary" : "bg-muted-foreground/30"}`} />
      {label}
    </div>
  );
}
