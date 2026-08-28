// Seeded demo data for the NightPulse AI operations dashboard.
// All figures are the supplied source values for "LIV Miami — Friday Night Recap".

export const VENUE = {
  brand: "NightPulse",
  venue: "LIV Miami",
  eventLabel: "Friday Night Recap",
  date: "Friday, August 21",
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

export const KPIS: Kpi[] = [
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
];

export type TrafficPoint = { time: string; entries: number; occupancy: number };

export const FOOT_TRAFFIC: TrafficPoint[] = [
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
];

export type Drink = {
  rank: number;
  name: string;
  revenue: number;
  units: number;
  margin: number;
  flag?: string;
};

export const TOP_DRINKS: Drink[] = [
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
];

export type RevenueSlice = { name: string; share: number; value: number; token: string };

export const REVENUE_SPLIT: RevenueSlice[] = [
  { name: "VIP Bottle Service", share: 56, value: 38332, token: "var(--np-violet)" },
  { name: "General Admission", share: 24, value: 16428, token: "var(--np-emerald)" },
  { name: "Main Bar", share: 20, value: 13690, token: "var(--np-cyan)" },
];

export const OPERATIONAL_READ = [
  { label: "Peak Arrival Window", value: "11:30 PM – 1:00 AM", hint: "68% of entries" },
  { label: "Occupancy Peak", value: "12:45 AM", hint: "968 guests inside" },
  { label: "Door Deployment", value: "6 scanners · 4 ID · 2 hosts", hint: "12 door staff" },
  { label: "Peak Queue Wait", value: "22 min", hint: "11:40 PM – 12:20 AM" },
  { label: "VIP Average Check", value: "$1,750", hint: "22 tables sold" },
  { label: "Highest Table", value: "$6,200", hint: "Table 12" },
];
