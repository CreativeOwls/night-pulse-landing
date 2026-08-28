import { Flame } from "lucide-react";

import type { Drink } from "@/lib/nightpulse-data";

export function DrinksChart({ drinks }: { drinks: Drink[] }) {
  const max = Math.max(...drinks.map((d) => d.revenue));

  return (
    <article className="np-glass np-rise rounded-2xl p-5">
      <header className="mb-4">
        <h2 className="text-sm font-semibold tracking-tight text-foreground">
          Top 5 Selling Drinks
        </h2>
        <p className="text-xs text-muted-foreground">Gross revenue · units · margin</p>
      </header>

      <ul className="space-y-4">
        {drinks.map((drink) => (
          <li key={drink.name}>
            <div className="flex items-baseline justify-between gap-3">
              <p className="truncate text-sm font-medium text-foreground">
                <span className="mr-2 text-xs text-muted-foreground">0{drink.rank}</span>
                {drink.name}
              </p>
              <p className="shrink-0 text-sm font-semibold text-foreground tabular-nums">
                ${drink.revenue.toLocaleString()}
              </p>
            </div>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-[oklch(1_0_0/0.06)]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[var(--np-violet)] to-[var(--np-emerald)] transition-[width] duration-500"
                style={{
                  width: `${Math.round((drink.revenue / max) * 100)}%`,
                  boxShadow: "0 0 14px -2px var(--np-violet)",
                }}
              />
            </div>
            <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
              <span>{drink.units} units</span>
              <span>{drink.margin}% margin</span>
              {drink.flag ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-[var(--np-emerald-soft)] px-2 py-0.5 font-medium text-[var(--np-emerald)]">
                  <Flame className="h-3 w-3" />
                  {drink.flag}
                </span>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </article>
  );
}
