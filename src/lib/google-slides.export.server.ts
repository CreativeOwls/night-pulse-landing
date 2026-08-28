import { z } from "zod";

import type { Deck } from "./deck";
import { buildDeckRequests } from "./google-slides.server";

const GATEWAY_URL = "https://connector-gateway.lovable.dev/google_slides/v1";

const deckSchema = z.object({
  title: z.string().min(1),
  subtitle: z.string().min(1),
  slides: z
    .array(
      z.object({
        kicker: z.string(),
        title: z.string(),
        summary: z.string(),
        metrics: z.array(z.object({ label: z.string(), value: z.string() })),
        bullets: z.array(z.string()),
        footnote: z.string(),
      }),
    )
    .min(1),
});

export function parseDeckInput(data: unknown): Deck {
  return deckSchema.parse(data);
}

function gatewayHeaders() {
  const lovableApiKey = process.env["LOVABLE_API_KEY"];
  const connectionKey = process.env["GOOGLE_SLIDES_API_KEY"];
  if (!lovableApiKey || !connectionKey) {
    throw new Error("Google Slides connector is not configured for this project.");
  }
  return {
    Authorization: `Bearer ${lovableApiKey}`,
    "X-Connection-Api-Key": connectionKey,
    "Content-Type": "application/json",
  };
}

async function gatewayFetch(path: string, body: unknown) {
  const response = await fetch(`${GATEWAY_URL}${path}`, {
    method: "POST",
    headers: gatewayHeaders(),
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    const errorBody = await response.text();
    console.error(`Google Slides gateway failed [${response.status}]: ${errorBody}`);
    throw new Error(`Google Slides request failed [${response.status}]: ${errorBody}`);
  }
  return (await response.json()) as Record<string, any>;
}

export async function exportDeckToGoogleSlides(deck: Deck) {
  const presentation = await gatewayFetch("/presentations", { title: deck.title });
  const presentationId = presentation["presentationId"] as string | undefined;
  if (!presentationId) {
    throw new Error("Google Slides did not return a presentation id.");
  }

  const placeholderSlideId = presentation["slides"]?.[0]?.objectId as string | undefined;

  await gatewayFetch(`/presentations/${presentationId}:batchUpdate`, {
    requests: buildDeckRequests(deck, placeholderSlideId),
  });

  return {
    presentationId,
    url: `https://docs.google.com/presentation/d/${presentationId}/edit`,
  };
}
