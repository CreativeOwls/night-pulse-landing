import { createFileRoute, Outlet } from "@tanstack/react-router";

// Demo mode: the dashboard is open — no sign-in required.
export const Route = createFileRoute("/_authenticated")({
  ssr: false,
  component: () => <Outlet />,
});
