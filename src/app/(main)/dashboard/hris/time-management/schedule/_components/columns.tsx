"use client";
"use no memo";

import type { ColumnDef } from "@tanstack/react-table";
import { MapPin, Pencil, Trash2 } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDateWithDayId } from "@/lib/date";
import { getInitials } from "@/lib/utils";

import type { ScheduleRow } from "./schema";

const shiftConfig: Record<ScheduleRow["shiftType"], { label: string; className: string }> = {
  Morning: { label: "Morning", className: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400" },
  Evening: { label: "Evening", className: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400" },
  Night: { label: "Night", className: "bg-slate-100 text-slate-800 dark:bg-slate-900/30 dark:text-slate-400" },
};

export const scheduleColumns: ColumnDef<ScheduleRow>[] = [
  {
    accessorKey: "employeeName",
    header: "Karyawan",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Avatar className="size-7">
          <AvatarFallback className="text-xs">{getInitials(row.original.employeeName)}</AvatarFallback>
        </Avatar>
        <span className="text-sm font-medium">{row.original.employeeName}</span>
      </div>
    ),
    filterFn: (row, _id, q: string) => row.original.employeeName.toLowerCase().includes(q.toLowerCase()),
  },
  {
    accessorKey: "date",
    header: "Tanggal",
    cell: ({ row }) => (
      <div className="text-sm tabular-nums text-muted-foreground">{formatDateWithDayId(row.original.date, true)}</div>
    ),
  },
  {
    id: "time",
    header: "Jam Kerja",
    cell: ({ row }) => (
      <div className="font-mono text-sm tabular-nums">
        {row.original.startTime} – {row.original.endTime}
      </div>
    ),
  },
  {
    accessorKey: "shiftType",
    header: "Shift",
    cell: ({ row }) => {
      const cfg = shiftConfig[row.original.shiftType];
      return (
        <Badge variant="outline" className={`rounded-full border-0 ${cfg.className}`}>
          {cfg.label}
        </Badge>
      );
    },
    filterFn: "equalsString",
  },
  {
    accessorKey: "location",
    header: "Lokasi",
    cell: ({ row }) => (
      <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
        <MapPin className="size-3.5 shrink-0" />
        {row.original.location ?? "—"}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant={row.original.status === "Active" ? "default" : "secondary"} className="rounded-full">
        {row.original.status === "Active" ? "Aktif" : "Tidak Aktif"}
      </Badge>
    ),
  },
  {
    id: "actions",
    header: () => <div className="text-right">Aksi</div>,
    cell: () => (
      <div className="flex items-center justify-end gap-1">
        <Button variant="ghost" size="icon" className="size-8">
          <Pencil className="size-4" />
        </Button>
        <Button variant="ghost" size="icon" className="size-8 text-destructive hover:text-destructive">
          <Trash2 className="size-4" />
        </Button>
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
];
