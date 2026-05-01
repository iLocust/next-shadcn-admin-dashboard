"use client";
"use no memo";

import Link from "next/link";

import type { ColumnDef } from "@tanstack/react-table";
import { Eye, Pencil, Trash2 } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { formatDateId } from "@/lib/date";
import { getInitials } from "@/lib/utils";

import type { EmployeeRow } from "./schema";

const statusVariant: Record<EmployeeRow["status"], "default" | "secondary" | "outline"> = {
  Active: "default",
  Probation: "secondary",
  Inactive: "outline",
};

const employmentTypeBadge: Record<EmployeeRow["employmentType"], string> = {
  Tetap: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  Kontrak: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  Probation: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
};

export const employeeColumns: ColumnDef<EmployeeRow>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Pilih semua karyawan"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label={`Pilih ${row.original.fullName}`}
      />
    ),
    enableHiding: false,
    enableSorting: false,
  },
  {
    accessorKey: "nip",
    header: "NIP",
    cell: ({ row }) => <div className="font-mono text-xs text-muted-foreground">{row.original.nip}</div>,
  },
  {
    accessorKey: "fullName",
    header: "Nama Karyawan",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <Avatar className="size-8">
          <AvatarFallback className="text-xs">{getInitials(row.original.fullName)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="font-medium text-sm">{row.original.fullName}</span>
          <span className="text-xs text-muted-foreground">{row.original.email}</span>
        </div>
      </div>
    ),
    filterFn: (row, _columnId, filterValue: string) => {
      const name = row.original.fullName.toLowerCase();
      const nip = row.original.nip.toLowerCase();
      const q = filterValue.toLowerCase();
      return name.includes(q) || nip.includes(q);
    },
  },
  {
    accessorKey: "division",
    header: "Divisi",
    cell: ({ row }) => <div className="text-sm">{row.original.division}</div>,
    filterFn: "equalsString",
  },
  {
    accessorKey: "jobPosition",
    header: "Jabatan",
    cell: ({ row }) => <div className="text-sm">{row.original.jobPosition}</div>,
  },
  {
    accessorKey: "branch",
    header: "Cabang",
    cell: ({ row }) => <div className="text-sm">{row.original.branch}</div>,
    filterFn: "equalsString",
  },
  {
    accessorKey: "employmentType",
    header: "Tipe",
    cell: ({ row }) => (
      <span
        className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${employmentTypeBadge[row.original.employmentType]}`}
      >
        {row.original.employmentType}
      </span>
    ),
    filterFn: "equalsString",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant={statusVariant[row.original.status]} className="rounded-full">
        {row.original.status}
      </Badge>
    ),
    filterFn: "equalsString",
  },
  {
    accessorKey: "joinDate",
    header: "Bergabung",
    cell: ({ row }) => (
      <div className="text-sm tabular-nums text-muted-foreground">{formatDateId(row.original.joinDate)}</div>
    ),
  },
  {
    id: "actions",
    header: () => <div className="text-right">Aksi</div>,
    cell: ({ row }) => (
      <div className="flex items-center justify-end gap-1">
        <Button variant="ghost" size="icon" className="size-8" asChild>
          <Link href={`/dashboard/hris/employees/${row.original.id}`}>
            <Eye className="size-4" />
            <span className="sr-only">Lihat detail {row.original.fullName}</span>
          </Link>
        </Button>
        <Button variant="ghost" size="icon" className="size-8">
          <Pencil className="size-4" />
          <span className="sr-only">Edit {row.original.fullName}</span>
        </Button>
        <Button variant="ghost" size="icon" className="size-8 text-destructive hover:text-destructive">
          <Trash2 className="size-4" />
          <span className="sr-only">Hapus {row.original.fullName}</span>
        </Button>
      </div>
    ),
    enableHiding: false,
    enableSorting: false,
  },
];
