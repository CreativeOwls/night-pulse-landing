import { Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";

export function EnterButton() {
  return (
    <Button
      asChild
      variant="google"
      size="pill"
      className="w-full max-w-xs sm:w-auto sm:max-w-none"
    >
      <Link to="/dashboard">Enter</Link>
    </Button>
  );
}
