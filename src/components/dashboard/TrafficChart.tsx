import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceArea,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { FOOT_TRAFFIC } from "@/lib/nightpulse-data";

export function TrafficChart() {
  return (
    <article className="np-glass np-rise rounded-2xl p-5 xl:col-span-2">
      <header className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <h2 className="text-sm font-semibold tracking-tight text-foreground">
            Hourly Foot Traffic & Entry Curve
          </h2>
          <p className="text-xs text-muted-foreground">10 PM – 4 AM · entries vs live occupancy</p>
        </div>
        <span className="rounded-full bg-[var(--np-violet-soft)] px-3 py-1 text-xs font-medium text-[var(--np-violet)]">
          Peak 11:30 PM – 1:00 AM
        </span>
      </header>

      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={FOOT_TRAFFIC} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
            <defs>
              <linearGradient id="npEntries" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--np-violet)" stopOpacity={0.55} />
                <stop offset="100%" stopColor="var(--np-violet)" stopOpacity={0.02} />
              </linearGradient>
              <linearGradient id="npOccupancy" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--np-emerald)" stopOpacity={0.35} />
                <stop offset="100%" stopColor="var(--np-emerald)" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--np-hairline)" vertical={false} />
            <XAxis
              dataKey="time"
              tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
              tickLine={false}
              axisLine={false}
              interval="preserveStartEnd"
              minTickGap={16}
            />
            <YAxis
              tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
              tickLine={false}
              axisLine={false}
            />
            <ReferenceArea x1="11:30 PM" x2="1:00 AM" fill="var(--np-violet)" fillOpacity={0.07} />
            <Tooltip
              cursor={{ stroke: "var(--np-violet)", strokeOpacity: 0.4 }}
              contentStyle={{
                background: "var(--np-surface-strong)",
                border: "1px solid var(--np-hairline)",
                borderRadius: 12,
                color: "var(--foreground)",
                fontSize: 12,
              }}
            />
            <Area
              type="monotone"
              dataKey="occupancy"
              name="Occupancy"
              stroke="var(--np-emerald)"
              strokeWidth={2}
              fill="url(#npOccupancy)"
            />
            <Area
              type="monotone"
              dataKey="entries"
              name="Entries"
              stroke="var(--np-violet)"
              strokeWidth={2.5}
              fill="url(#npEntries)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </article>
  );
}
