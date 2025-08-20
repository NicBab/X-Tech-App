"use client";

import { useMemo, useState } from "react";
import {
  DataGrid,
  GridColDef,
  GridRowParams,
  GridRowId,
} from "@mui/x-data-grid";
import { Card } from "@/components/ui/card"; // if you use shadcn/ui; otherwise remove Card and wrap with divs
import { cn } from "@/lib/utils"; // optional; remove if you don't use a cn helper
import { TimeEntryGroup, TimeEntryJob } from "@/redux/slices/time/TimeTypes";

type Props = {
  rows: TimeEntryGroup[];          // submitted groups
  loading?: boolean;
  error?: boolean;
  title?: string;
  className?: string;
};

export default function SubmittedTimesMasterDetail({
  rows,
  loading = false,
  error = false,
  title = "Employees Submitted Times",
  className,
}: Props) {
  const [selectedId, setSelectedId] = useState<GridRowId | null>(null);

  const selectedGroup: TimeEntryGroup | undefined = useMemo(() => {
    if (selectedId == null) return undefined;
    return rows.find((g) => String(g.id) === String(selectedId));
  }, [rows, selectedId]);

  // ------- Master columns (TimeEntryGroup) -------
  const masterCols = useMemo<GridColDef<TimeEntryGroup>[]>(
    () => [
      { field: "id", headerName: "ID", width: 110 },
      {
        field: "name",
        headerName: "Employee",
        flex: 1,
        valueGetter: (v, row) => row.user?.name ?? row.userName ?? "—",
      },
      {
        field: "date",
        headerName: "Date",
        width: 140,
        valueGetter: (_, row) => {
          // support either `date` or `weekEnding`; format lightly
          const d = row.date ?? row.weekEnding;
          return d ? new Date(d).toLocaleDateString() : "—";
        },
      },
      {
        field: "totalHours",
        headerName: "Hours",
        width: 100,
        type: "number",
      },
      {
        field: "status",
        headerName: "Status",
        width: 130,
      },
      {
        field: "jobsCount",
        headerName: "Jobs",
        width: 90,
        type: "number",
        valueGetter: (_, row) => row.jobs?.length ?? 0,
      },
    ],
    []
  );

  // ------- Detail columns (TimeEntryJob) -------
  const detailCols = useMemo<GridColDef<TimeEntryJob>[]>(
    () => [
      { field: "jobNumber", headerName: "Job #", width: 160 },
      {
        field: "hours",
        headerName: "Hours",
        type: "number",
        width: 110,
      },
      {
        field: "miles",
        headerName: "Miles",
        type: "number",
        width: 110,
        valueGetter: (_, row) => row.miles ?? 0,
      },
      {
        field: "expenses",
        headerName: "Expenses",
        type: "number",
        width: 120,
        valueGetter: (_, row) => row.expenses ?? 0,
      },
      {
        field: "notes",
        headerName: "Notes",
        flex: 1,
        valueGetter: (_, row) => row.notes ?? "",
      },
    ],
    []
  );

  return (
    <div className={cn?.("space-y-6", className) ?? "space-y-6"}>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{title}</h2>
        {selectedGroup ? (
          <button
            className="rounded-lg px-3 py-1 border"
            onClick={() => setSelectedId(null)}
          >
            Clear selection
          </button>
        ) : null}
      </div>

      {/* MASTER: Submitted Time Entries */}
      <Card className="p-2">
        <DataGrid
          rows={rows}
          columns={masterCols}
          getRowId={(r) => r.id} // ensure your PK is `id`; change if different
          loading={loading}
          autoHeight
          disableRowSelectionOnClick
          onRowClick={(params: GridRowParams<TimeEntryGroup>) =>
            setSelectedId(params.id)
          }
          slots={{
            noRowsOverlay: () => (
              <div className="p-6 text-center">No submitted time entries.</div>
            ),
            errorOverlay: () => (
              <div className="p-6 text-center text-red-600">
                Failed to load entries.
              </div>
            ),
          }}
          slotProps={{
            errorOverlay: { message: error ? "Error" : undefined },
          }}
        />
      </Card>

      {/* DETAIL: Jobs for Selected Entry */}
      {selectedGroup && (
        <Card className="p-2">
          <div className="mb-3">
            <h3 className="text-lg font-medium">
              Jobs for Entry #{String(selectedGroup.id)} —{" "}
              {selectedGroup.user?.name ?? selectedGroup.userName ?? "Employee"}
            </h3>
            <p className="text-sm opacity-75">
              Date:{" "}
              {selectedGroup.date
                ? new Date(selectedGroup.date).toLocaleDateString()
                : selectedGroup.weekEnding
                ? new Date(selectedGroup.weekEnding).toLocaleDateString()
                : "—"}
              {" · "}
              Total Hours: {selectedGroup.totalHours ?? 0}
            </p>
          </div>

          <DataGrid
            rows={(selectedGroup.jobs ?? []).map((j, idx) => ({
              // ensure a stable id for the detail grid rows
              id: `${selectedGroup.id}-${j.jobNumber ?? idx}`,
              ...j,
            }))}
            columns={detailCols}
            autoHeight
            getRowId={(r) => r.id}
            disableRowSelectionOnClick
            slots={{
              noRowsOverlay: () => (
                <div className="p-6 text-center">No jobs in this entry.</div>
              ),
            }}
          />
        </Card>
      )}
    </div>
  );
}
