import { DollarSign, TrendingUp, Users, Wine } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import type { Kpi } from "@/lib/nightpulse-data";

const ICONS: Record<string, LucideIcon> = {
  revenue: DollarSign,
  attendance: Users,
  vip: Wine,
  door: TrendingUp,
};

export function KpiGrid({ kpis }: { kpis: Kpi[] }) {
  return (
    <section
      aria-label="Key performance indicators"
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
    >
      {kpis.map((kpi, i) => {
        const Icon = ICONS[kpi.id] ?? TrendingUp;
        return (
          <article
            key={kpi.id}
            className="np-glass np-rise relative overflow-hidden rounded-2xl p-5"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <div className="np-noise pointer-events-none absolute inset-0 opacity-40" />
            <div className="relative flex items-start justify-between gap-3">
              <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                {kpi.label}
              </p>
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--np-violet-soft)]">
                <Icon className="h-4 w-4 text-[var(--np-violet)]" />
              </span>
            </div>
            <p className="relative mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              {kpi.value}
            </p>
            <p
              className={
                kpi.deltaTone === "positive"
                  ? "relative mt-2 text-sm font-medium text-[var(--np-emerald)]"
                  : "relative mt-2 text-sm font-medium text-[var(--np-cyan)]"
              }
            >
              {kpi.delta}
            </p>
            <p className="relative mt-1 text-xs text-muted-foreground">{kpi.detail}</p>
          </article>
        );
      })}
    </section>
  );
}
