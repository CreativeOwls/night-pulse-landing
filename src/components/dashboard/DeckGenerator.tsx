import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ClipboardCopy,
  Download,
  ExternalLink,
  FileText,
  Loader2,
  Presentation,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { deckToBrief, deckToMarkdown, type Deck } from "@/lib/deck";
import { exportToGoogleSlides } from "@/lib/google-slides.functions";

type Props = { open: boolean; onOpenChange: (open: boolean) => void; deck: Deck };

function download(filename: string, content: string, type: string) {
  const url = URL.createObjectURL(new Blob([content], { type }));
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

export function DeckGenerator({ open, onOpenChange, deck }: Props) {
  const [index, setIndex] = useState(0);
  const [exporting, setExporting] = useState(false);
  const slides = deck.slides;
  const slide = slides[index]!;

  const handleGoogleSlides = async () => {
    setExporting(true);
    try {
      const result = await exportToGoogleSlides({ data: deck });
      window.open(result.url, "_blank", "noopener,noreferrer");
      toast.success("Deck created in Google Slides", {
        action: { label: "Open", onClick: () => window.open(result.url, "_blank") },
      });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Google Slides export failed");
    } finally {
      setExporting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] max-w-4xl overflow-y-auto border-[var(--np-hairline)] bg-[var(--np-surface-strong)] backdrop-blur-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Presentation className="h-5 w-5 text-[var(--np-violet)]" />
            Executive Slide Deck
          </DialogTitle>
          <DialogDescription>{deck.subtitle}</DialogDescription>
        </DialogHeader>

        <div className="np-glass np-noise relative overflow-hidden rounded-2xl p-6 sm:p-8">
          <p className="text-xs font-semibold tracking-[0.18em] text-[var(--np-violet)] uppercase">
            {slide.kicker}
          </p>
          <h3 className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {slide.title}
          </h3>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{slide.summary}</p>

          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {slide.metrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-xl border border-[var(--np-hairline)] bg-[oklch(1_0_0/0.04)] p-3"
              >
                <p className="text-[11px] text-muted-foreground">{metric.label}</p>
                <p className="mt-1 text-base font-semibold text-[var(--np-emerald)]">
                  {metric.value}
                </p>
              </div>
            ))}
          </div>

          <ul className="mt-5 space-y-2.5">
            {slide.bullets.map((bullet) => (
              <li key={bullet} className="flex gap-3 text-sm text-foreground">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--np-violet)]" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>

          <p className="mt-6 text-xs text-muted-foreground">{slide.footnote}</p>
        </div>

        <div className="flex items-center justify-between gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIndex((i) => Math.max(0, i - 1))}
            disabled={index === 0}
          >
            <ChevronLeft className="h-4 w-4" /> Previous
          </Button>
          <div className="flex items-center gap-2">
            {slides.map((s, i) => (
              <button
                key={s.title}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === index}
                onClick={() => setIndex(i)}
                className={
                  i === index
                    ? "h-2 w-6 rounded-full bg-[var(--np-violet)]"
                    : "h-2 w-2 rounded-full bg-[oklch(1_0_0/0.2)]"
                }
              />
            ))}
            <span className="ml-2 text-xs text-muted-foreground">
              {index + 1} / {slides.length}
            </span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIndex((i) => Math.min(slides.length - 1, i + 1))}
            disabled={index === slides.length - 1}
          >
            Next <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex flex-wrap gap-2 border-t border-[var(--np-hairline)] pt-4">
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={() => {
              download(
                "nightpulse-deck.json",
                JSON.stringify(deck, null, 2),
                "application/json",
              );
              toast.success("Deck JSON downloaded");
            }}
          >
            <Download className="h-4 w-4" /> Export JSON
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={() => {
              download(
                "nightpulse-deck.md",
                deckToMarkdown(deck),
                "text/markdown;charset=utf-8",
              );
              toast.success("Deck Markdown downloaded");
            }}
          >
            <FileText className="h-4 w-4" /> Export Markdown
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(deckToBrief(deck));
                toast.success("Executive brief copied to clipboard");
              } catch {
                toast.error("Clipboard permission denied");
              }
            }}
          >
            <ClipboardCopy className="h-4 w-4" /> Copy Brief
          </Button>
          <Button
            size="sm"
            className="np-glow-violet ml-auto gap-2 bg-[var(--np-violet)] text-white hover:bg-[var(--np-violet)]/90"
            onClick={() => void handleGoogleSlides()}
            disabled={exporting}
          >
            {exporting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Creating deck…
              </>
            ) : (
              <>
                <ExternalLink className="h-4 w-4" /> Export to Google Slides
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
