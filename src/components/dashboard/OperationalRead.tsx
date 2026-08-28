import type { OperationalItem } from "@/lib/nightpulse-data";

export function OperationalRead({ items }: { items: OperationalItem[] }) {
  return (
    <section className="np-glass np-rise rounded-2xl p-5">
      <header className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-sm font-semibold tracking-tight text-foreground">Operational Read</h2>
        <p className="text-xs text-muted-foreground">Door, occupancy and VIP service summary</p>
      </header>

      <dl className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 sm:gap-4 md:grid-cols-3 xl:grid-cols-6">
        {items.map((item) => (
          <div
            key={item.label}
            className="rounded-xl border border-[var(--np-hairline)] bg-[var(--np-surface-strong)] p-4"
          >
            <dt className="text-xs tracking-wide text-muted-foreground uppercase">{item.label}</dt>
            <dd className="mt-2 text-base font-semibold text-foreground">{item.value}</dd>
            <p className="mt-1 text-xs text-[var(--np-emerald)]">{item.hint}</p>
          </div>
        ))}
      </dl>
    </section>
  );
}
