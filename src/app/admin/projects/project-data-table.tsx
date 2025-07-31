import type { RouterOutputs } from "~/trpc/react";
import {
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

import { useState } from "react";
import { Input } from "~/components/ui/input";
import { ProjectStatusSelector } from "./project-status-selector";
import { PublishStatusSelector } from "./publish-status-selector";
import { OwnerSelector } from "./owner-selector";
import { ProjectRowActions } from "./project-actions";

type Project = RouterOutputs["project"]["getProject"][number];

export const columns: ColumnDef<Project>[] = [
  {
    accessorKey: "project_id",
    header: "ID",
  },
  {
    accessorKey: "title",
    header: "ชื่อโครงการ",
  },
  {
    accessorKey: "status",
    header: "สถานะ",
    cell: ({ row }) => {
      return (
        <ProjectStatusSelector
          projectId={row.getValue("project_id")}
          status={row.getValue("status")}
        />
      );
    },
  },
  {
    accessorKey: "published",
    header: "เผยแพร่อยู่",
    cell: ({ row }) => {
      const published = row.getValue("published");
      return (
        <PublishStatusSelector
          projectId={row.getValue("project_id")}
          isPublished={published as boolean}
        />
      );
    },
  },
  {
    accessorKey: "owner",
    header: "เจ้าของโครงการ",
    cell: ({ row }) => (
      <OwnerSelector
        projectId={row.getValue("project_id")}
        owner={row.getValue("owner")}
      />
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      return <span>{date.toLocaleDateString()}</span>;
    },
  },
  {
    accessorKey: "actions",
    header: "",
    cell: ({ row }) => {
      return <ProjectRowActions projectId={row.getValue("project_id")} />;
    },
  },
];

export function ProjectDataTable({ projects }: { projects: Project[] }) {
  interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
  }

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data: projects,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  });

  function DataTable<TData, TValue>({
    columns,
  }: DataTableProps<TData, TValue>) {
    return (
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  ไม่พบโครงการ
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    );
  }
  return (
    <div>
      <div className="flex items-center justify-between py-4">
        <Input
          placeholder="ค้นหาโครง"
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <DataTable columns={columns} data={projects} />
    </div>
  );
}
