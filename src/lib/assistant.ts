// Pulse Gemini Assistant — client-side demo agent.
// Deterministic, seeded responses. The `askAssistant` signature is async so a
// real AI Gateway call can replace the local resolver later without touching
// the UI layer.

export type ChatRole = "user" | "assistant";

export type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
  bullets?: string[];
  timestamp: string;
  action?: "open-deck";
};

export type SuggestedQuery = {
  id: string;
  label: string;
  prompt: string;
};

export const SUGGESTED_QUERIES: SuggestedQuery[] = [
  {
    id: "door",
    label: "When did guests arrive and how should I staff the door?",
    prompt: "When did guests arrive and how should I staff the door?",
  },
  {
    id: "margin",
    label: "Which high-margin drinks underperformed?",
    prompt: "Which high-margin drinks underperformed?",
  },
  {
    id: "vip",
    label: "How did VIP table spend break down?",
    prompt: "How did VIP table spend break down?",
  },
];

type Answer = { content: string; bullets: string[]; action?: "open-deck" };

const ANSWERS: { match: RegExp; answer: Answer }[] = [
  {
    match: /slide|deck|presentation|export/i,
    answer: {
      content: "Opening the executive deck generator with Friday's audit data.",
      bullets: [
        "4 slides: financial pacing, beverage mix, door flow, recommendations.",
        "Export as JSON, Markdown, executive brief, or straight to Google Slides.",
      ],
      action: "open-deck",
    },
  },
  {
    match: /(arriv|door|staff|queue|wait|scanner)/i,
    answer: {
      content: "Arrival pressure is concentrated in a 90-minute window.",
      bullets: [
        "Peak arrivals 11:30 PM – 1:00 AM — 68% of the 1,240 guests.",
        "Occupancy peaked at 968 guests at 12:45 AM.",
        "Peak queue wait hit 22 min between 11:40 PM and 12:20 AM.",
        "Recommendation: move 2 scanners from the 2 AM block to 11:15 PM — projected wait under 12 min.",
        "Hold current 4 ID checkers / 2 list hosts; gender balance (49/51) needed no intervention.",
      ],
    },
  },
  {
    match: /(margin|drink|cocktail|bar|bottle|underperform)/i,
    answer: {
      content: "One product is carrying margin but getting no promotion.",
      bullets: [
        "Espresso Martini: 78% margin — the highest on the menu — but only $4,708 in revenue.",
        "Don Julio 1942 leads revenue at $18,400 (46 units, 71% margin).",
        "Veuve Clicquot moves volume (38 units) at the weakest top-3 margin of 62%.",
        "Recommendation: feature the Espresso Martini on table menus and door signage next Friday.",
        "Recommendation: bundle Veuve with a tequila pour to protect blended margin.",
      ],
    },
  },
  {
    match: /(vip|table|check|bottle service)/i,
    answer: {
      content: "VIP is the revenue engine and it is close to sold out.",
      bullets: [
        "22 of 24 tables sold — $38,500 VIP spend, 56% of gross revenue.",
        "Average VIP check $1,750; highest table $6,200 (Table 12).",
        "Two unsold tables represent roughly $3,500 of foregone revenue.",
        "Recommendation: pre-sell the remaining two tables midweek at a $1,750 minimum.",
      ],
    },
  },
];

const FALLBACK: Answer = {
  content: "Here is the headline read on Friday night.",
  bullets: [
    "Gross revenue $68,450, 18% ahead of target.",
    "1,240 guests, occupancy peak 968 at 12:45 AM.",
    "VIP drove 56% of revenue from 22 of 24 tables.",
    "Biggest upside: promote the 78%-margin Espresso Martini.",
    "Ask about door staffing, drink margins, VIP spend — or say “Create slides”.",
  ],
};

export function resolveAnswer(prompt: string): Answer {
  return ANSWERS.find((a) => a.match.test(prompt))?.answer ?? FALLBACK;
}

export async function askAssistant(prompt: string): Promise<Answer> {
  // Local demo resolver — no external model call is made.
  await new Promise((r) => setTimeout(r, 550));
  return resolveAnswer(prompt);
}

const time = (h: number, m: number) =>
  `${((h + 11) % 12) + 1}:${String(m).padStart(2, "0")} ${h < 12 ? "AM" : "PM"}`;

export const SEEDED_HISTORY: ChatMessage[] = [
  {
    id: "seed-1",
    role: "assistant",
    content: "Friday's audit is reconciled. Here's the one-line read:",
    bullets: [
      "$68,450 gross (+18% vs target) from 1,240 guests.",
      "VIP carried 56% of revenue; door balance held at 49/51.",
    ],
    timestamp: time(9, 12),
  },
  {
    id: "seed-2",
    role: "user",
    content: "Anything I should fix before next Friday?",
    timestamp: time(9, 14),
  },
  {
    id: "seed-3",
    role: "assistant",
    content: "Two items worth acting on:",
    bullets: [
      "Peak queue wait of 22 min between 11:40 PM and 12:20 AM — under-staffed at the door.",
      "Espresso Martini sits at 78% margin with the lowest promotion of the top 5.",
    ],
    timestamp: time(9, 14),
  },
];
