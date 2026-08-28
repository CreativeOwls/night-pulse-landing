import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

import type { RevenueSlice } from "@/lib/nightpulse-data";

type Props = { split: RevenueSlice[]; total: string };

export function RevenueDonut({ split, total }: Props) {
  return (
    <article className="np-glass np-rise rounded-2xl p-5">
      <header className="mb-2">
        <h2 className="text-sm font-semibold tracking-tight text-foreground">Revenue Split</h2>
        <p className="text-xs text-muted-foreground">Share of {total} gross</p>
      </header>

      <div className="relative h-[190px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={split}
              dataKey="share"
              nameKey="name"
              innerRadius={58}
              outerRadius={82}
              paddingAngle={3}
              stroke="none"
            >
              {split.map((slice) => (
                <Cell key={slice.name} fill={slice.token} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number, name: string) => {
                const slice = split.find((s) => s.name === name);
                return [`${value}% · $${slice?.value.toLocaleString()}`, name];
              }}
              contentStyle={{
                background: "var(--np-surface-strong)",
                border: "1px solid var(--np-hairline)",
                borderRadius: 12,
                color: "var(--foreground)",
                fontSize: 12,
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xl font-semibold text-foreground">{total}</span>
          <span className="text-xs text-muted-foreground">Total gross</span>
        </div>
      </div>

      <ul className="mt-3 space-y-2">
        {split.map((slice) => (
          <li key={slice.name} className="flex items-center justify-between gap-3 text-sm">
            <span className="flex items-center gap-2 text-muted-foreground">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ background: slice.token, boxShadow: `0 0 10px -1px ${slice.token}` }}
              />
              {slice.name}
            </span>
            <span className="font-medium text-foreground tabular-nums">
              {slice.share}% · ${slice.value.toLocaleString()}
            </span>
          </li>
        ))}
      </ul>
    </article>
  );
}
