import { useEffect, useRef, useState } from "react";
import { Bot, Send, Sparkles, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { askAssistant, SEEDED_HISTORY, SUGGESTED_QUERIES } from "@/lib/assistant";
import type { ChatMessage } from "@/lib/assistant";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onOpenDeck: () => void;
};

const now = () =>
  new Date().toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });

export function PulseAssistant({ open, onOpenChange, onOpenDeck }: Props) {
  const [messages, setMessages] = useState<ChatMessage[]>(SEEDED_HISTORY);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, thinking, open]);

  const send = async (prompt: string) => {
    const trimmed = prompt.trim();
    if (!trimmed || thinking) return;

    setMessages((prev) => [
      ...prev,
      { id: `u-${Date.now()}`, role: "user", content: trimmed, timestamp: now() },
    ]);
    setInput("");
    setThinking(true);

    const answer = await askAssistant(trimmed);

    setMessages((prev) => [
      ...prev,
      {
        id: `a-${Date.now()}`,
        role: "assistant",
        content: answer.content,
        bullets: answer.bullets,
        timestamp: now(),
        action: answer.action,
      },
    ]);
    setThinking(false);
    if (answer.action === "open-deck") onOpenDeck();
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="flex w-full flex-col gap-0 border-l border-[var(--np-hairline)] bg-[var(--np-surface-strong)] p-0 backdrop-blur-xl sm:max-w-md"
      >
        <SheetHeader className="border-b border-[var(--np-hairline)] p-5">
          <SheetTitle className="flex items-center gap-2 text-foreground">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--np-violet-soft)]">
              <Sparkles className="h-4 w-4 text-[var(--np-violet)]" />
            </span>
            Pulse Gemini Assistant
          </SheetTitle>
          <SheetDescription className="text-xs">
            Demo agent running on seeded Friday audit data — no live model calls.
          </SheetDescription>
        </SheetHeader>

        <ScrollArea className="flex-1 px-5">
          <div className="space-y-4 py-5">
            {messages.map((message) => (
              <div
                key={message.id}
                className={
                  message.role === "user"
                    ? "ml-auto max-w-[85%] rounded-2xl rounded-br-sm bg-[var(--np-violet-soft)] p-3"
                    : "mr-auto max-w-[92%] rounded-2xl rounded-bl-sm border border-[var(--np-hairline)] bg-[oklch(1_0_0/0.04)] p-3"
                }
              >
                <div className="mb-1 flex items-center gap-2 text-[11px] text-muted-foreground">
                  {message.role === "user" ? (
                    <User className="h-3 w-3" />
                  ) : (
                    <Bot className="h-3 w-3 text-[var(--np-violet)]" />
                  )}
                  <span>{message.role === "user" ? "You" : "Pulse"}</span>
                  <span>· {message.timestamp}</span>
                </div>
                <p className="text-sm text-foreground">{message.content}</p>
                {message.bullets?.length ? (
                  <ul className="mt-2 space-y-1.5">
                    {message.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-2 text-sm text-muted-foreground">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[var(--np-emerald)]" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ))}

            {thinking ? (
              <div className="mr-auto flex items-center gap-2 rounded-2xl border border-[var(--np-hairline)] bg-[oklch(1_0_0/0.04)] px-3 py-2 text-xs text-muted-foreground">
                <span className="np-live-dot h-1.5 w-1.5 rounded-full bg-[var(--np-violet)]" />
                Pulse is reading the audit data…
              </div>
            ) : null}
            <div ref={endRef} />
          </div>
        </ScrollArea>

        <div className="space-y-3 border-t border-[var(--np-hairline)] p-4">
          <div className="flex flex-wrap gap-2">
            {SUGGESTED_QUERIES.map((query) => (
              <button
                key={query.id}
                type="button"
                onClick={() => void send(query.prompt)}
                className="rounded-full border border-[var(--np-hairline)] px-3 py-1.5 text-left text-xs text-muted-foreground transition-colors hover:border-[var(--np-violet)] hover:text-foreground"
              >
                {query.label}
              </button>
            ))}
          </div>

          <form
            className="flex items-center gap-2"
            onSubmit={(event) => {
              event.preventDefault();
              void send(input);
            }}
          >
            <Input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask about the night… or type “Create slides”"
              aria-label="Message the Pulse assistant"
              className="bg-[oklch(1_0_0/0.04)]"
            />
            <Button
              type="submit"
              size="icon"
              disabled={thinking || !input.trim()}
              className="bg-[var(--np-violet)] text-white hover:bg-[var(--np-violet)]/90"
              aria-label="Send message"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
