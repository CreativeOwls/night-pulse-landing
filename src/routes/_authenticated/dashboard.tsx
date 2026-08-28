import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DeckGenerator } from "@/components/dashboard/DeckGenerator";
import { DrinksChart } from "@/components/dashboard/DrinksChart";
import { KpiGrid } from "@/components/dashboard/KpiGrid";
import { OperationalRead } from "@/components/dashboard/OperationalRead";
import { PulseAssistant } from "@/components/dashboard/PulseAssistant";
import { RevenueDonut } from "@/components/dashboard/RevenueDonut";
import { TrafficChart } from "@/components/dashboard/TrafficChart";
import { supabase } from "@/integrations/supabase/client";
import { VENUE } from "@/lib/nightpulse-data";

const title = "NightPulse AI — LIV Miami Friday Night Recap";
const description =
  "Nightclub operations and revenue intelligence dashboard: door flow, bottle service, VIP spend and AI recommendations for LIV Miami.";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const { user } = Route.useRouteContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [date, setDate] = useState(VENUE.date);
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [deckOpen, setDeckOpen] = useState(false);

  const handleSignOut = async () => {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/", replace: true });
  };

  return (
    <div className="np-app-bg min-h-screen w-full">
      <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-5 p-4 sm:p-6">
        <DashboardHeader
          date={date}
          onDateChange={setDate}
          onAskAgent={() => setAssistantOpen(true)}
          onGenerateDeck={() => setDeckOpen(true)}
        />

        <main className="flex flex-col gap-5">
          <KpiGrid />

          <section
            aria-label="Analytics"
            className="grid grid-cols-1 gap-5 xl:grid-cols-4 [&>*:first-child]:xl:col-span-2"
          >
            <TrafficChart />
            <DrinksChart />
            <RevenueDonut />
          </section>

          <OperationalRead />
        </main>

        <footer className="flex flex-wrap items-center justify-between gap-3 pb-4 text-xs text-muted-foreground">
          <span>
            Signed in as {user.email ?? user.id} · {date}
          </span>
          <Button variant="ghost" size="sm" className="gap-2" onClick={() => void handleSignOut()}>
            <LogOut className="h-4 w-4" /> Sign out
          </Button>
        </footer>
      </div>

      <PulseAssistant
        open={assistantOpen}
        onOpenChange={setAssistantOpen}
        onOpenDeck={() => setDeckOpen(true)}
      />
      <DeckGenerator open={deckOpen} onOpenChange={setDeckOpen} />
    </div>
  );
}
