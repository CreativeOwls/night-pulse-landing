import { createServerFn } from "@tanstack/react-start";

import { exportDeckToGoogleSlides, parseDeckInput } from "./google-slides.export.server";

export const exportToGoogleSlides = createServerFn({ method: "POST" })
  .inputValidator(parseDeckInput)
  .handler(async ({ data }) => exportDeckToGoogleSlides(data));
