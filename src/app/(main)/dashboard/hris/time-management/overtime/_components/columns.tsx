"use client";
"use no memo";

import type { ColumnDef } from "@tanstack/react-table";
import { Check, Eye, X } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDateId } from "@/lib/date";
import { getInitials } from "@/lib/utils";

import type { OvertimeRow } from "./schema";

const statusConfig: Record<OvertimeRow["status"], { label: string; variant: "default" | "secondary" | "destructive" }> =
  {
    "Pending HR": { label: "Pending HR", variant: "secondary" },
    Approved: { label: "Approved", variant: "default" },
    Rejected: { label: "Rejected", variant: "destructive" },
  };

function formatDuration(minutes: number) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}j ${m}m` : `${h} jam`;
}

function formatRupiah(amount?: number) {
  if (!amount) return "—";
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(
    amount,
  );
}

export const overtimeColumns: ColumnDef<OvertimeRow>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div className="font-mono text-xs text-muted-foreground">{row.original.id}</div>,
  },
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
      <div className="text-sm tabular-nums text-muted-foreground">{formatDateId(row.original.date)}</div>
    ),
  },
  {
    id: "time",
    header: "Jam Lembur",
    cell: ({ row }) => (
      <div className="font-mono text-sm tabular-nums">
        {row.original.startTime} – {row.original.endTime}
      </div>
    ),
  },
  {
    accessorKey: "duration",
    header: "Durasi",
    cell: ({ row }) => <div className="text-sm tabular-nums">{formatDuration(row.original.duration)}</div>,
  },
  {
    accessorKey: "compensation",
    header: "Kompensasi",
    cell: ({ row }) => <div className="text-sm tabular-nums">{formatRupiah(row.original.compensation)}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const cfg = statusConfig[row.original.status];
      return (
        <Badge variant={cfg.variant} className="rounded-full">
          {cfg.label}
        </Badge>
      );
    },
    filterFn: "equalsString",
  },
  {
    id: "actions",
    header: () => <div className="text-right">Aksi</div>,
    cell: ({ row }) => (
      <div className="flex items-center justify-end gap-1">
        <Button variant="ghost" size="icon" className="size-8">
          <Eye className="size-4" />
        </Button>
        {row.original.status === "Pending HR" && (
          <>
            <Button variant="ghost" size="icon" className="size-8 text-green-600 hover:text-green-600">
              <Check className="size-4" />
            </Button>
            <Button variant="ghost" size="icon" className="size-8 text-destructive hover:text-destructive">
              <X className="size-4" />
            </Button>
          </>
        )}
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
];
