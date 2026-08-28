import { Bot, CalendarDays, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DATE_OPTIONS, VENUE } from "@/lib/nightpulse-data";

type Props = {
  date: string;
  headline: string;
  onDateChange: (value: string) => void;
  onAskAgent: () => void;
  onGenerateDeck: () => void;
};

export function DashboardHeader({
  date,
  headline,
  onDateChange,
  onAskAgent,
  onGenerateDeck,
}: Props) {
  return (
    <header className="np-glass sticky top-0 z-30 rounded-2xl px-4 py-4 sm:px-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3">
          <div className="np-glow-violet flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--np-violet-soft)]">
            <Sparkles className="h-5 w-5 text-[var(--np-violet)]" />
          </div>
          <div className="min-w-0">
            <h1 className="truncate text-lg font-semibold tracking-tight text-foreground sm:text-xl">
              NightPulse AI
            </h1>
            <p className="text-xs leading-relaxed text-muted-foreground">
              {VENUE.venue} — {VENUE.eventLabel} · {headline}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <div className="flex min-h-11 w-full items-center gap-2 rounded-lg border border-[var(--np-hairline)] bg-[var(--np-surface-strong)] px-3 sm:w-auto sm:px-2">
            <CalendarDays className="h-4 w-4 shrink-0 text-muted-foreground" />
            <Select value={date} onValueChange={onDateChange}>
              <SelectTrigger
                className="h-11 w-full border-0 bg-transparent px-0 text-sm shadow-none focus:ring-0 sm:h-9 sm:w-[190px]"
                aria-label="Select event date"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {DATE_OPTIONS.map((d) => (
                  <SelectItem key={d} value={d}>
                    {d}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[var(--np-hairline)] bg-[var(--np-emerald-soft)] px-3 py-1.5 text-xs font-medium text-[var(--np-emerald)]">
            <span className="np-live-dot h-1.5 w-1.5 rounded-full bg-[var(--np-emerald)]" />
            {VENUE.status}
          </span>

          <Button variant="outline" onClick={onAskAgent} className="w-full gap-2 sm:w-auto">
            <Bot className="h-4 w-4" />
            Ask AI Agent
          </Button>

          <Button
            onClick={onGenerateDeck}
            className="np-glow-violet w-full gap-2 bg-[var(--np-violet)] text-white hover:bg-[var(--np-violet)]/90 sm:w-auto"
          >
            ⚡ Generate Slide Deck
          </Button>
        </div>
      </div>
    </header>
  );
}
