import { Bot, CalendarDays, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { VENUE } from "@/lib/nightpulse-data";

type Props = {
  date: string;
  onDateChange: (value: string) => void;
  onAskAgent: () => void;
  onGenerateDeck: () => void;
};

const DATES = ["Friday, August 21", "Saturday, August 22", "Friday, August 14"];

export function DashboardHeader({ date, onDateChange, onAskAgent, onGenerateDeck }: Props) {
  return (
    <header className="np-glass sticky top-0 z-30 rounded-2xl px-4 py-4 sm:px-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3">
          <div className="np-glow-violet flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--np-violet-soft)]">
            <Sparkles className="h-5 w-5 text-[var(--np-violet)]" />
          </div>
          <div>
            <h1 className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
              NightPulse AI
            </h1>
            <p className="text-xs text-muted-foreground">
              {VENUE.venue} — {VENUE.eventLabel}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-2 rounded-lg border border-[var(--np-hairline)] bg-[var(--np-surface-strong)] px-2">
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
            <Select value={date} onValueChange={onDateChange}>
              <SelectTrigger
                className="h-9 w-[190px] border-0 bg-transparent px-0 text-sm shadow-none focus:ring-0"
                aria-label="Select event date"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {DATES.map((d) => (
                  <SelectItem key={d} value={d}>
                    {d}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <span className="flex items-center gap-2 rounded-full border border-[var(--np-hairline)] bg-[var(--np-emerald-soft)] px-3 py-1.5 text-xs font-medium text-[var(--np-emerald)]">
            <span className="np-live-dot h-1.5 w-1.5 rounded-full bg-[var(--np-emerald)]" />
            {VENUE.status}
          </span>

          <Button variant="outline" onClick={onAskAgent} className="gap-2">
            <Bot className="h-4 w-4" />
            Ask AI Agent
          </Button>

          <Button
            onClick={onGenerateDeck}
            className="np-glow-violet gap-2 bg-[var(--np-violet)] text-white hover:bg-[var(--np-violet)]/90"
          >
            ⚡ Generate Slide Deck
          </Button>
        </div>
      </div>
    </header>
  );
}
