import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

import { supabase } from "@/integrations/supabase/client";

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
  const navigate = useNavigate();

  useEffect(() => {
    let active = true;

    supabase.auth.getSession().then(({ data }) => {
      if (active && data.session) navigate({ to: "/dashboard", replace: true });
    });

    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) navigate({ to: "/dashboard", replace: true });
    });

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
        <GoogleSignInButton />
      </div>
    </main>
  );
}
