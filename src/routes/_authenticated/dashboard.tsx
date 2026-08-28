import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

const title = "Dashboard — Night Pulse";
const description = "Your signed-in Night Pulse workspace, ready for the hackathon build.";

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

  const handleSignOut = async () => {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/", replace: true });
  };

  return (
    <main className="relative flex min-h-screen w-full items-center justify-center bg-background px-4">
      <div className="bg-center-glow pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="bg-vignette pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="relative z-10 flex w-full max-w-xl flex-col items-center gap-6 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">You're signed in</h1>
        <p className="text-sm text-muted-foreground">
          Signed in as {user.email ?? user.id}. This is the scaffold workspace — the hackathon
          feature gets built here.
        </p>
        <Button variant="outline" onClick={handleSignOut}>
          Sign out
        </Button>
      </div>
    </main>
  );
}
