import { createFileRoute } from "@tanstack/react-router";

import { ConstellationBackdrop } from "@/components/ConstellationBackdrop";
import { GoogleSignInButton } from "@/components/GoogleSignInButton";
import { Wordmark } from "@/components/Wordmark";

const title = "Night Pulse";
const description =
  "Night Pulse — a dark, living constellation landing page. Sign in with Google to get started.";

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
  return (
    <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-background px-4">
      <ConstellationBackdrop />
      <div className="bg-center-glow pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="bg-vignette pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="relative z-10 flex w-full max-w-[92rem] flex-col items-center gap-10">
        <Wordmark />
        <GoogleSignInButton />
      </div>
    </main>
  );
}
