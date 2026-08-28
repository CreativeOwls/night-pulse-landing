import { cn } from "@/lib/utils";

const WORD = "NIGHT PULSE";

const HOVER_ACCENTS = [
  "hover:text-accent-blue",
  "hover:text-accent-red",
  "hover:text-accent-yellow",
  "hover:text-accent-green",
];

/**
 * Giant system-font wordmark. Letters take an accent color on hover; only the
 * final character auto-cycles through the accent palette.
 */
export function Wordmark() {
  const lastIndex = WORD.length - 1;
  const characters = WORD.split("");

  return (
    <h1
      aria-label={WORD}
      className="font-system select-none text-center text-[clamp(2.75rem,13.5vw,15rem)] font-bold leading-[0.85] tracking-[-0.06em] text-foreground"
    >
      {characters.map((char, index) => {
        if (char === " ") {
          return (
            <span key={index} aria-hidden="true" className="inline-block w-[0.22em]" />
          );
        }

        return (
          <span
            key={index}
            aria-hidden="true"
            className={cn(
              "inline-block transition-colors duration-200",
              index === lastIndex ? "animate-pulse-hue" : HOVER_ACCENTS[index % HOVER_ACCENTS.length],
            )}
          >
            {char}
          </span>
        );
      })}
    </h1>
  );
}
