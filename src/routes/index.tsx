import { createFileRoute } from "@tanstack/react-router";

import { ConstellationBackdrop } from "@/components/ConstellationBackdrop";
import { EnterButton } from "@/components/EnterButton";
import { Wordmark } from "@/components/Wordmark";

const title = "Night Pulse";
const description =
  "Night Pulse — a dark, living constellation landing page. Enter to open the NightPulse AI dashboard.";

export const Route = createFileRoute("/")({
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
  component: Index,
});

function Index() {
  return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, [navigate]);

  return (
    <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-background px-4 py-10 sm:px-6 lg:px-8">
      <ConstellationBackdrop />
      <div className="bg-center-glow pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="bg-vignette pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="relative z-10 flex w-full max-w-[92rem] flex-col items-center gap-8 sm:gap-10">
        <Wordmark />
        <EnterButton />
      </div>
    </main>
  );
}
