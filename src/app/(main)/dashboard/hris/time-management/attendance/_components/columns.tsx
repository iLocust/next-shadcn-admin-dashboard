"use client";
"use no memo";

import type { ColumnDef } from "@tanstack/react-table";
import { Eye, MapPin, Pencil } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDateWithDayId } from "@/lib/date";
import { getInitials } from "@/lib/utils";

import type { AttendanceRow } from "./schema";

const statusConfig: Record<
  AttendanceRow["status"],
  { variant: "default" | "secondary" | "destructive" | "outline"; className: string }
> = {
  "On-time": { variant: "default", className: "" },
  Late: {
    variant: "secondary",
    className: "border-yellow-300 bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  },
  "Early Leave": { variant: "outline", className: "border-orange-300 text-orange-600" },
  Absent: { variant: "destructive", className: "" },
};

function formatDuration(minutes?: number) {
  if (!minutes) return "—";
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}j ${m}m`;
}

export const attendanceColumns: ColumnDef<AttendanceRow>[] = [
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
      <div className="text-sm tabular-nums text-muted-foreground">{formatDateWithDayId(row.original.date)}</div>
    ),
  },
  {
    accessorKey: "checkIn",
    header: "Masuk",
    cell: ({ row }) => <div className="font-mono text-sm tabular-nums">{row.original.checkIn ?? "—"}</div>,
  },
  {
    accessorKey: "checkOut",
    header: "Keluar",
    cell: ({ row }) => <div className="font-mono text-sm tabular-nums">{row.original.checkOut ?? "—"}</div>,
  },
  {
    accessorKey: "duration",
    header: "Durasi",
    cell: ({ row }) => (
      <div className="text-sm tabular-nums text-muted-foreground">{formatDuration(row.original.duration)}</div>
    ),
  },
  {
    accessorKey: "shift",
    header: "Shift",
    cell: ({ row }) => <div className="text-sm">{row.original.shift}</div>,
  },
  {
    accessorKey: "location",
    header: "Lokasi",
    cell: ({ row }) => (
      <div className="flex items-center gap-1 text-sm text-muted-foreground">
        {row.original.location ? (
          <>
            <MapPin className="size-3" />
            {row.original.location}
          </>
        ) : (
          "—"
        )}
      </div>
    ),
    filterFn: "equalsString",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const cfg = statusConfig[row.original.status];
      return (
        <Badge variant={cfg.variant} className={`rounded-full ${cfg.className}`}>
          {row.original.status}
        </Badge>
      );
    },
    filterFn: "equalsString",
  },
  {
    id: "actions",
    header: () => <div className="text-right">Aksi</div>,
    cell: () => (
      <div className="flex items-center justify-end gap-1">
        <Button variant="ghost" size="icon" className="size-8">
          <Eye className="size-4" />
        </Button>
        <Button variant="ghost" size="icon" className="size-8">
          <Pencil className="size-4" />
        </Button>
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
];
