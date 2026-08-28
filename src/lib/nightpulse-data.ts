// Seeded demo data for the NightPulse AI operations dashboard.
// Three distinct Friday night datasets — the header date selector switches
// every chart, KPI, panel and the generated executive deck.

export const VENUE = {
  brand: "NightPulse",
  venue: "LIV Miami",
  eventLabel: "Friday Night Recap",
  status: "Venue Closed — Audit Mode",
};

export type Kpi = {
  id: string;
  label: string;
  value: string;
  delta: string;
  deltaTone: "positive" | "neutral";
  detail: string;
};

export type TrafficPoint = { time: string; entries: number; occupancy: number };

export type Drink = {
  rank: number;
  name: string;
  revenue: number;
  units: number;
  margin: number;
  flag?: string;
};

export type RevenueSlice = { name: string; share: number; value: number; token: string };

export type OperationalItem = { label: string; value: string; hint: string };

export type DeckNarrative = {
  financial: { summary: string; bullets: string[] };
  beverage: { summary: string; bullets: string[] };
  door: { summary: string; bullets: string[] };
  actions: { summary: string; metrics: { label: string; value: string }[]; bullets: string[] };
};

export type NightDataset = {
  date: string;
  headline: string;
  totalRevenue: number;
  totalRevenueLabel: string;
  peakWindow: string;
  peakWindowStart: string;
  peakWindowEnd: string;
  kpis: Kpi[];
  footTraffic: TrafficPoint[];
  drinks: Drink[];
  revenueSplit: RevenueSlice[];
  operationalRead: OperationalItem[];
  deck: DeckNarrative;
};

const VIOLET = "var(--np-violet)";
const EMERALD = "var(--np-emerald)";
const CYAN = "var(--np-cyan)";

const AUG_21: NightDataset = {
  date: "Friday, August 21",
  headline: "Resident DJ · full VIP floor",
  totalRevenue: 68450,
  totalRevenueLabel: "$68,450",
  peakWindow: "11:30 PM – 1:00 AM",
  peakWindowStart: "11:30 PM",
  peakWindowEnd: "1:00 AM",
  kpis: [
    {
      id: "revenue",
      label: "Total Gross Revenue",
      value: "$68,450",
      delta: "+18% vs target",
      deltaTone: "positive",
      detail: "Bottle service led the night",
    },
    {
      id: "attendance",
      label: "Total Attendance",
      value: "1,240 guests",
      delta: "Peak 12:45 AM",
      deltaTone: "neutral",
      detail: "Occupancy peak held ~40 min",
    },
    {
      id: "vip",
      label: "VIP Tables",
      value: "22 / 24",
      delta: "$38,500 VIP spend",
      deltaTone: "positive",
      detail: "92% table utilisation",
    },
    {
      id: "door",
      label: "Door Gender Balance",
      value: "49% M / 51% F",
      delta: "Target balanced",
      deltaTone: "neutral",
      detail: "Door policy on target all night",
    },
  ],
  footTraffic: [
    { time: "10:00 PM", entries: 42, occupancy: 42 },
    { time: "10:30 PM", entries: 78, occupancy: 118 },
    { time: "11:00 PM", entries: 143, occupancy: 255 },
    { time: "11:30 PM", entries: 226, occupancy: 470 },
    { time: "12:00 AM", entries: 248, occupancy: 705 },
    { time: "12:30 AM", entries: 214, occupancy: 892 },
    { time: "12:45 AM", entries: 96, occupancy: 968 },
    { time: "1:00 AM", entries: 118, occupancy: 940 },
    { time: "1:30 AM", entries: 45, occupancy: 861 },
    { time: "2:00 AM", entries: 21, occupancy: 742 },
    { time: "2:30 AM", entries: 9, occupancy: 604 },
    { time: "3:00 AM", entries: 0, occupancy: 388 },
    { time: "3:30 AM", entries: 0, occupancy: 176 },
    { time: "4:00 AM", entries: 0, occupancy: 0 },
  ],
  drinks: [
    { rank: 1, name: "Don Julio 1942", revenue: 18400, units: 46, margin: 71 },
    { rank: 2, name: "Clase Azul Reposado", revenue: 8400, units: 21, margin: 68 },
    { rank: 3, name: "Veuve Clicquot", revenue: 6650, units: 38, margin: 62 },
    {
      rank: 4,
      name: "Espresso Martini",
      revenue: 4708,
      units: 214,
      margin: 78,
      flag: "Highest margin, lowest promotion",
    },
    { rank: 5, name: "Casamigos Blanco", revenue: 3960, units: 22, margin: 66 },
  ],
  revenueSplit: [
    { name: "VIP Bottle Service", share: 56, value: 38332, token: VIOLET },
    { name: "General Admission", share: 24, value: 16428, token: EMERALD },
    { name: "Main Bar", share: 20, value: 13690, token: CYAN },
  ],
  operationalRead: [
    { label: "Peak Arrival Window", value: "11:30 PM – 1:00 AM", hint: "68% of entries" },
    { label: "Occupancy Peak", value: "12:45 AM", hint: "968 guests inside" },
    { label: "Door Deployment", value: "6 scanners · 4 ID · 2 hosts", hint: "12 door staff" },
    { label: "Peak Queue Wait", value: "22 min", hint: "11:40 PM – 12:20 AM" },
    { label: "VIP Average Check", value: "$1,750", hint: "22 tables sold" },
    { label: "Highest Table", value: "$6,200", hint: "Table 12" },
  ],
  deck: {
    financial: {
      summary:
        "Gross revenue closed at $68,450, 18% ahead of target, carried by a 92% VIP table sell-through.",
      bullets: [
        "VIP bottle service delivered 56% of revenue ($38,332) from 22 of 24 tables.",
        "General admission contributed $16,428 (24%); main bar $13,690 (20%).",
        "Highest single table: $6,200 (Table 12) — repeat host relationship.",
        "Pacing held above target from 11:30 PM onward; no late-night revenue drop-off.",
      ],
    },
    beverage: {
      summary:
        "Premium tequila drove the bar; the highest-margin cocktail is also the least promoted.",
      bullets: [
        "Don Julio 1942: 46 units, 71% margin — anchor of the bottle menu.",
        "Clase Azul Reposado: 21 units at 68% margin; strong second tier.",
        "Veuve Clicquot: 38 units, 62% margin — highest volume, lowest margin of the top 3.",
        "Espresso Martini at 78% margin is the biggest upside: promote at the door and on table menus.",
      ],
    },
    door: {
      summary:
        "Arrivals concentrated between 11:30 PM and 1:00 AM, pushing peak queue wait to 22 minutes.",
      bullets: [
        "68% of all entries landed inside the 90-minute peak arrival window.",
        "Door deployment: 6 scanners, 4 ID checkers, 2 list hosts (12 staff).",
        "Queue wait exceeded 20 minutes from 11:40 PM to 12:20 AM.",
        "Gender balance stayed on target all night without door intervention.",
      ],
    },
    actions: {
      summary: "Four operational moves projected to lift revenue and cut peak friction.",
      metrics: [
        { label: "Door Staff", value: "+2 scanners" },
        { label: "Margin Push", value: "Espresso Martini" },
        { label: "VIP Target", value: "24 / 24" },
        { label: "Focus Window", value: "11:30 PM – 1 AM" },
      ],
      bullets: [
        "Shift 2 scanners from the 2 AM block to 11:15 PM to cut peak wait below 12 minutes.",
        "Promote the Espresso Martini (78% margin) as the featured cocktail on table and bar menus.",
        "Pre-sell the two unsold VIP tables with a $1,750 minimum to close the 22/24 gap.",
        "Hold current door policy — gender balance and pacing both met target unassisted.",
      ],
    },
  },
};

const AUG_14: NightDataset = {
  date: "Friday, August 14",
  headline: "Rain night · softer walk-up",
  totalRevenue: 61280,
  totalRevenueLabel: "$61,280",
  peakWindow: "11:30 PM – 12:45 AM",
  peakWindowStart: "11:30 PM",
  peakWindowEnd: "12:45 AM",
  kpis: [
    {
      id: "revenue",
      label: "Total Gross Revenue",
      value: "$61,280",
      delta: "+6% vs target",
      deltaTone: "positive",
      detail: "Rain suppressed walk-up spend",
    },
    {
      id: "attendance",
      label: "Total Attendance",
      value: "1,110 guests",
      delta: "Peak 12:45 AM",
      deltaTone: "neutral",
      detail: "Occupancy peak held ~25 min",
    },
    {
      id: "vip",
      label: "VIP Tables",
      value: "19 / 24",
      delta: "$33,090 VIP spend",
      deltaTone: "positive",
      detail: "79% table utilisation",
    },
    {
      id: "door",
      label: "Door Gender Balance",
      value: "52% M / 48% F",
      delta: "Slightly male-skewed",
      deltaTone: "neutral",
      detail: "Skew appeared after 1:00 AM",
    },
  ],
  footTraffic: [
    { time: "10:00 PM", entries: 38, occupancy: 38 },
    { time: "10:30 PM", entries: 70, occupancy: 105 },
    { time: "11:00 PM", entries: 128, occupancy: 225 },
    { time: "11:30 PM", entries: 196, occupancy: 412 },
    { time: "12:00 AM", entries: 222, occupancy: 620 },
    { time: "12:30 AM", entries: 196, occupancy: 790 },
    { time: "12:45 AM", entries: 88, occupancy: 860 },
    { time: "1:00 AM", entries: 104, occupancy: 835 },
    { time: "1:30 AM", entries: 40, occupancy: 760 },
    { time: "2:00 AM", entries: 18, occupancy: 650 },
    { time: "2:30 AM", entries: 7, occupancy: 520 },
    { time: "3:00 AM", entries: 3, occupancy: 330 },
    { time: "3:30 AM", entries: 0, occupancy: 150 },
    { time: "4:00 AM", entries: 0, occupancy: 0 },
  ],
  drinks: [
    { rank: 1, name: "Don Julio 1942", revenue: 14800, units: 37, margin: 71 },
    { rank: 2, name: "Veuve Clicquot", revenue: 7000, units: 40, margin: 62 },
    { rank: 3, name: "Clase Azul Reposado", revenue: 6000, units: 15, margin: 68 },
    {
      rank: 4,
      name: "Espresso Martini",
      revenue: 3982,
      units: 181,
      margin: 78,
      flag: "Highest margin, no menu feature",
    },
    { rank: 5, name: "Casamigos Blanco", revenue: 3240, units: 18, margin: 66 },
  ],
  revenueSplit: [
    { name: "VIP Bottle Service", share: 54, value: 33091, token: VIOLET },
    { name: "General Admission", share: 25, value: 15320, token: EMERALD },
    { name: "Main Bar", share: 21, value: 12869, token: CYAN },
  ],
  operationalRead: [
    { label: "Peak Arrival Window", value: "11:30 PM – 12:45 AM", hint: "63% of entries" },
    { label: "Occupancy Peak", value: "12:45 AM", hint: "860 guests inside" },
    { label: "Door Deployment", value: "5 scanners · 3 ID · 2 hosts", hint: "10 door staff" },
    { label: "Peak Queue Wait", value: "16 min", hint: "11:50 PM – 12:25 AM" },
    { label: "VIP Average Check", value: "$1,742", hint: "19 tables sold" },
    { label: "Highest Table", value: "$5,400", hint: "Table 7" },
  ],
  deck: {
    financial: {
      summary:
        "Rain trimmed walk-up volume: $61,280 gross, 6% ahead of target on a 79% VIP sell-through.",
      bullets: [
        "VIP bottle service delivered 54% of revenue ($33,091) from 19 of 24 tables.",
        "General admission softened to $15,320 (25%); main bar $12,869 (21%).",
        "Highest single table: $5,400 (Table 7).",
        "Five unsold VIP tables account for roughly $8,700 of missed revenue.",
      ],
    },
    beverage: {
      summary: "Champagne over-indexed while premium tequila volume dipped with the smaller crowd.",
      bullets: [
        "Don Julio 1942: 37 units, 71% margin — down 9 units week over week.",
        "Veuve Clicquot moved to #2 on 40 units at 62% margin.",
        "Clase Azul Reposado: 15 units at 68% margin.",
        "Espresso Martini held 78% margin on 181 units with no menu feature.",
      ],
    },
    door: {
      summary: "Arrivals were flatter and later; queue pressure stayed manageable at 16 minutes.",
      bullets: [
        "63% of entries landed between 11:30 PM and 12:45 AM.",
        "Door deployment: 5 scanners, 3 ID checkers, 2 list hosts (10 staff).",
        "Peak wait topped out at 16 minutes between 11:50 PM and 12:25 AM.",
        "Gender mix drifted to 52% M / 48% F after 1:00 AM.",
      ],
    },
    actions: {
      summary: "Recover the VIP gap and protect balance on soft-weather nights.",
      metrics: [
        { label: "VIP Gap", value: "5 tables" },
        { label: "Margin Push", value: "Espresso Martini" },
        { label: "Door Staff", value: "Hold at 10" },
        { label: "Focus Window", value: "11:30 PM – 12:45 AM" },
      ],
      bullets: [
        "Trigger a same-day VIP release when forecast rain exceeds 60%.",
        "Feature the Espresso Martini on bar menus to lift high-margin mix.",
        "Keep door at 10 staff — wait times never breached the 20-minute threshold.",
        "Add a list-host push after 1:00 AM to correct the late gender skew.",
      ],
    },
  },
};

const AUG_7: NightDataset = {
  date: "Friday, August 7",
  headline: "Guest DJ · sold-out VIP floor",
  totalRevenue: 74920,
  totalRevenueLabel: "$74,920",
  peakWindow: "11:30 PM – 1:00 AM",
  peakWindowStart: "11:30 PM",
  peakWindowEnd: "1:00 AM",
  kpis: [
    {
      id: "revenue",
      label: "Total Gross Revenue",
      value: "$74,920",
      delta: "+29% vs target",
      deltaTone: "positive",
      detail: "Guest DJ drove record VIP spend",
    },
    {
      id: "attendance",
      label: "Total Attendance",
      value: "1,405 guests",
      delta: "Peak 12:45 AM",
      deltaTone: "neutral",
      detail: "Occupancy peak held ~55 min",
    },
    {
      id: "vip",
      label: "VIP Tables",
      value: "24 / 24",
      delta: "$43,450 VIP spend",
      deltaTone: "positive",
      detail: "100% table utilisation",
    },
    {
      id: "door",
      label: "Door Gender Balance",
      value: "47% M / 53% F",
      delta: "Target balanced",
      deltaTone: "neutral",
      detail: "Balance held through peak",
    },
  ],
  footTraffic: [
    { time: "10:00 PM", entries: 55, occupancy: 55 },
    { time: "10:30 PM", entries: 96, occupancy: 145 },
    { time: "11:00 PM", entries: 168, occupancy: 300 },
    { time: "11:30 PM", entries: 262, occupancy: 545 },
    { time: "12:00 AM", entries: 281, occupancy: 800 },
    { time: "12:30 AM", entries: 238, occupancy: 1010 },
    { time: "12:45 AM", entries: 110, occupancy: 1096 },
    { time: "1:00 AM", entries: 121, occupancy: 1070 },
    { time: "1:30 AM", entries: 48, occupancy: 980 },
    { time: "2:00 AM", entries: 18, occupancy: 845 },
    { time: "2:30 AM", entries: 8, occupancy: 690 },
    { time: "3:00 AM", entries: 0, occupancy: 440 },
    { time: "3:30 AM", entries: 0, occupancy: 200 },
    { time: "4:00 AM", entries: 0, occupancy: 0 },
  ],
  drinks: [
    { rank: 1, name: "Don Julio 1942", revenue: 21600, units: 54, margin: 71 },
    { rank: 2, name: "Clase Azul Reposado", revenue: 10400, units: 26, margin: 68 },
    { rank: 3, name: "Dom Pérignon", revenue: 9200, units: 23, margin: 58 },
    { rank: 4, name: "Veuve Clicquot", revenue: 7175, units: 41, margin: 62 },
    {
      rank: 5,
      name: "Espresso Martini",
      revenue: 5214,
      units: 237,
      margin: 78,
      flag: "Highest margin, sold out at 2 AM",
    },
  ],
  revenueSplit: [
    { name: "VIP Bottle Service", share: 58, value: 43454, token: VIOLET },
    { name: "General Admission", share: 22, value: 16482, token: EMERALD },
    { name: "Main Bar", share: 20, value: 14984, token: CYAN },
  ],
  operationalRead: [
    { label: "Peak Arrival Window", value: "11:30 PM – 1:00 AM", hint: "72% of entries" },
    { label: "Occupancy Peak", value: "12:45 AM", hint: "1,096 guests inside" },
    { label: "Door Deployment", value: "7 scanners · 4 ID · 3 hosts", hint: "14 door staff" },
    { label: "Peak Queue Wait", value: "31 min", hint: "11:35 PM – 12:40 AM" },
    { label: "VIP Average Check", value: "$1,810", hint: "24 tables sold" },
    { label: "Highest Table", value: "$7,400", hint: "Table 12" },
  ],
  deck: {
    financial: {
      summary:
        "Guest-DJ night set the month's high: $74,920 gross, 29% over target on a sold-out VIP floor.",
      bullets: [
        "VIP bottle service delivered 58% of revenue ($43,454) across all 24 tables.",
        "General admission contributed $16,482 (22%); main bar $14,984 (20%).",
        "Highest single table: $7,400 (Table 12).",
        "VIP average check reached $1,810 — the highest of the three Fridays.",
      ],
    },
    beverage: {
      summary: "Bottle mix traded up: Dom Pérignon entered the top three alongside premium tequila.",
      bullets: [
        "Don Julio 1942: 54 units, 71% margin — record volume.",
        "Clase Azul Reposado: 26 units at 68% margin.",
        "Dom Pérignon added $9,200 on 23 units, but at the lowest margin (58%).",
        "Espresso Martini sold out at 2 AM after 237 units at 78% margin.",
      ],
    },
    door: {
      summary: "Volume overwhelmed the door: 72% of entries in 90 minutes drove a 31-minute wait.",
      bullets: [
        "1,405 guests entered, with occupancy peaking at 1,096 at 12:45 AM.",
        "Door deployment: 7 scanners, 4 ID checkers, 3 list hosts (14 staff).",
        "Queue wait exceeded 30 minutes between 11:35 PM and 12:40 AM.",
        "Gender balance held at 47% M / 53% F through the peak.",
      ],
    },
    actions: {
      summary: "Protect the upside by removing door friction on high-demand bookings.",
      metrics: [
        { label: "Door Staff", value: "+3 scanners" },
        { label: "Stock Risk", value: "Espresso Martini" },
        { label: "VIP Target", value: "Raise minimums" },
        { label: "Focus Window", value: "11:30 PM – 1 AM" },
      ],
      bullets: [
        "Add 3 scanners for guest-DJ nights to bring the 31-minute wait under 15 minutes.",
        "Double espresso-martini prep par — the top-margin drink sold out two hours early.",
        "Raise VIP minimums on sold-out bookings; demand exceeded the 24-table floor.",
        "Open a second ID lane at 11:15 PM instead of 11:45 PM.",
      ],
    },
  },
};

export const DATASETS: NightDataset[] = [AUG_21, AUG_14, AUG_7];

export const DATE_OPTIONS = DATASETS.map((d) => d.date);

export const DEFAULT_DATE = AUG_21.date;

export function getDataset(date: string): NightDataset {
  return DATASETS.find((d) => d.date === date) ?? AUG_21;
}
