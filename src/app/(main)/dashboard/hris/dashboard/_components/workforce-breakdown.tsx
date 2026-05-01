"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockEmployees } from "@/data/hris/employees";

function computeDivisionData() {
  const counts: Record<string, number> = {};
  for (const emp of mockEmployees) {
    if (emp.status === "Active" || emp.status === "Probation") {
      counts[emp.division] = (counts[emp.division] ?? 0) + 1;
    }
  }
  return Object.entries(counts)
    .map(([division, total]) => ({ division: division.split(" ")[0], total }))
    .sort((a, b) => b.total - a.total);
}

function computeStatusData() {
  const tetap = mockEmployees.filter((e) => e.employmentType === "Tetap").length;
  const kontrak = mockEmployees.filter((e) => e.employmentType === "Kontrak").length;
  const probation = mockEmployees.filter((e) => e.employmentType === "Probation").length;
  return [
    { name: "Tetap", value: tetap },
    { name: "Kontrak", value: kontrak },
    { name: "Probation", value: probation },
  ];
}

export function WorkforceBreakdown() {
  const divisionData = computeDivisionData();
  const statusData = computeStatusData();

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      {/* Per Divisi */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Karyawan per Divisi</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={divisionData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="division" tick={{ fontSize: 12 }} className="text-muted-foreground" />
              <YAxis tick={{ fontSize: 12 }} className="text-muted-foreground" />
              <Tooltip
                contentStyle={{ borderRadius: 8, fontSize: 12 }}
                labelFormatter={(v) => `Divisi: ${v}`}
                formatter={(v) => [v, "Karyawan"]}
              />
              <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Per Tipe Kontrak */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Distribusi Tipe Kontrak</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3 pt-2">
            {statusData.map((item) => {
              const total = mockEmployees.length;
              const pct = Math.round((item.value / total) * 100);
              return (
                <div key={item.name} className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <span>{item.name}</span>
                    <span className="font-medium tabular-nums">
                      {item.value} <span className="text-muted-foreground font-normal text-xs">({pct}%)</span>
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full bg-primary" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
