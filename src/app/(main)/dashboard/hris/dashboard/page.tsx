import { StatCards } from "./_components/stat-cards";
import { WorkforceBreakdown } from "./_components/workforce-breakdown";

export default function HrDashboardPage() {
  return (
    <div className="@container/main flex flex-col gap-4 md:gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="font-semibold text-xl">HR Dashboard</h1>
        <p className="text-muted-foreground text-sm">Gambaran umum kondisi SDM perusahaan</p>
      </div>
      <StatCards />
      <WorkforceBreakdown />
    </div>
  );
}
