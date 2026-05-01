"use client";
"use no memo";

import type { ColumnDef } from "@tanstack/react-table";
import { Check, Eye, X } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDateId } from "@/lib/date";
import { getInitials } from "@/lib/utils";

import type { LeaveRequestRow } from "./schema";

const statusConfig: Record<
  LeaveRequestRow["status"],
  { label: string; variant: "default" | "secondary" | "destructive" | "outline" }
> = {
  Pending: { label: "Pending", variant: "secondary" },
  Approved: { label: "Approved", variant: "default" },
  Rejected: { label: "Rejected", variant: "destructive" },
  Cancelled: { label: "Cancelled", variant: "outline" },
};

const leaveTypeColor: Record<LeaveRequestRow["leaveType"], string> = {
  "Cuti Tahunan": "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  "Cuti Sakit": "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  "Cuti Melahirkan": "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  "Cuti Penting": "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
};

export const leaveColumns: ColumnDef<LeaveRequestRow>[] = [
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
    accessorKey: "leaveType",
    header: "Jenis Cuti",
    cell: ({ row }) => (
      <span
        className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${leaveTypeColor[row.original.leaveType]}`}
      >
        {row.original.leaveType}
      </span>
    ),
    filterFn: "equalsString",
  },
  {
    accessorKey: "startDate",
    header: "Tanggal Mulai",
    cell: ({ row }) => <div className="text-sm tabular-nums">{formatDateId(row.original.startDate)}</div>,
  },
  {
    accessorKey: "endDate",
    header: "Tanggal Selesai",
    cell: ({ row }) => <div className="text-sm tabular-nums">{formatDateId(row.original.endDate)}</div>,
  },
  {
    accessorKey: "totalDays",
    header: "Hari",
    cell: ({ row }) => <div className="text-sm tabular-nums font-medium">{row.original.totalDays} hari</div>,
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
          <span className="sr-only">Lihat detail</span>
        </Button>
        {row.original.status === "Pending" && (
          <>
            <Button variant="ghost" size="icon" className="size-8 text-green-600 hover:text-green-600">
              <Check className="size-4" />
              <span className="sr-only">Approve</span>
            </Button>
            <Button variant="ghost" size="icon" className="size-8 text-destructive hover:text-destructive">
              <X className="size-4" />
              <span className="sr-only">Reject</span>
            </Button>
          </>
        )}
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
];
