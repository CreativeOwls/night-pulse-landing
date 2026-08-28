// Layout / request-building logic for the Google Slides export.
// Pure functions only — no network calls, no env access.

import type { Deck, DeckSlide } from "./deck";

const PAGE_W = 9144000;
const MARGIN = 685800;
const CONTENT_W = PAGE_W - MARGIN * 2;

const BG = { red: 0.043, green: 0.047, blue: 0.063 };
const WHITE = { red: 1, green: 1, blue: 1 };
const VIOLET = { red: 0.65, green: 0.45, blue: 0.98 };
const EMERALD = { red: 0.32, green: 0.85, blue: 0.62 };
const MUTED = { red: 0.66, green: 0.68, blue: 0.75 };

type Rgb = { red: number; green: number; blue: number };

function textBox(
  slideId: string,
  objectId: string,
  text: string,
  box: { x: number; y: number; w: number; h: number },
  style: { size: number; bold?: boolean; color: Rgb; spacing?: number },
) {
  return [
    {
      createShape: {
        objectId,
        shapeType: "TEXT_BOX",
        elementProperties: {
          pageObjectId: slideId,
          size: {
            width: { magnitude: box.w, unit: "EMU" },
            height: { magnitude: box.h, unit: "EMU" },
          },
          transform: {
            scaleX: 1,
            scaleY: 1,
            translateX: box.x,
            translateY: box.y,
            unit: "EMU",
          },
        },
      },
    },
    { insertText: { objectId, text } },
    {
      updateTextStyle: {
        objectId,
        style: {
          bold: style.bold ?? false,
          fontFamily: "Arial",
          fontSize: { magnitude: style.size, unit: "PT" },
          foregroundColor: { opaqueColor: { rgbColor: style.color } },
          ...(style.spacing ? { weightedFontFamily: undefined } : {}),
        },
        textRange: { type: "ALL" },
        fields: "bold,fontFamily,fontSize,foregroundColor",
      },
    },
  ];
}

function darkSlide(slideId: string) {
  return [
    {
      createSlide: {
        objectId: slideId,
        slideLayoutReference: { predefinedLayout: "BLANK" },
      },
    },
    {
      updatePageProperties: {
        objectId: slideId,
        pageProperties: {
          pageBackgroundFill: { solidFill: { color: { rgbColor: BG } } },
        },
        fields: "pageBackgroundFill.solidFill.color",
      },
    },
  ];
}

function accentBar(slideId: string, objectId: string, color: Rgb) {
  return [
    {
      createShape: {
        objectId,
        shapeType: "RECTANGLE",
        elementProperties: {
          pageObjectId: slideId,
          size: {
            width: { magnitude: 1371600, unit: "EMU" },
            height: { magnitude: 45720, unit: "EMU" },
          },
          transform: { scaleX: 1, scaleY: 1, translateX: MARGIN, translateY: 1005840, unit: "EMU" },
        },
      },
    },
    {
      updateShapeProperties: {
        objectId,
        shapeProperties: {
          shapeBackgroundFill: { solidFill: { color: { rgbColor: color } } },
          outline: { propertyState: "NOT_RENDERED" },
        },
        fields: "shapeBackgroundFill.solidFill.color,outline",
      },
    },
  ];
}

function titleSlideRequests(deck: Deck) {
  const id = "np_title";
  return [
    ...darkSlide(id),
    ...textBox(
      id,
      `${id}_kicker`,
      "NIGHTPULSE AI · OPERATIONS INTELLIGENCE",
      { x: MARGIN, y: 1600200, w: CONTENT_W, h: 400000 },
      { size: 14, bold: true, color: VIOLET },
    ),
    ...textBox(
      id,
      `${id}_title`,
      deck.title,
      { x: MARGIN, y: 2057400, w: CONTENT_W, h: 1200000 },
      { size: 34, bold: true, color: WHITE },
    ),
    ...textBox(
      id,
      `${id}_sub`,
      deck.subtitle,
      { x: MARGIN, y: 3200400, w: CONTENT_W, h: 500000 },
      { size: 15, color: EMERALD },
    ),
  ];
}

function contentSlideRequests(slide: DeckSlide, index: number) {
  const id = `np_slide_${index + 1}`;
  const metricsLine = slide.metrics.map((m) => `${m.label}: ${m.value}`).join("     ");
  const bullets = slide.bullets.map((b) => `•  ${b}`).join("\n\n");
  return [
    ...darkSlide(id),
    ...textBox(
      id,
      `${id}_kicker`,
      slide.kicker.toUpperCase(),
      { x: MARGIN, y: 548640, w: CONTENT_W, h: 350000 },
      { size: 12, bold: true, color: VIOLET },
    ),
    ...textBox(
      id,
      `${id}_title`,
      slide.title,
      { x: MARGIN, y: 800100, w: CONTENT_W, h: 700000 },
      { size: 26, bold: true, color: WHITE },
    ),
    ...accentBar(id, `${id}_bar`, index % 2 === 0 ? VIOLET : EMERALD),
    ...textBox(
      id,
      `${id}_summary`,
      slide.summary,
      { x: MARGIN, y: 1188720, w: CONTENT_W, h: 500000 },
      { size: 14, color: MUTED },
    ),
    ...textBox(
      id,
      `${id}_metrics`,
      metricsLine,
      { x: MARGIN, y: 1783080, w: CONTENT_W, h: 450000 },
      { size: 13, bold: true, color: EMERALD },
    ),
    ...textBox(
      id,
      `${id}_bullets`,
      bullets,
      { x: MARGIN, y: 2286000, w: CONTENT_W, h: 1900000 },
      { size: 13, color: WHITE },
    ),
    ...textBox(
      id,
      `${id}_footnote`,
      slide.footnote,
      { x: MARGIN, y: 4389120, w: CONTENT_W, h: 350000 },
      { size: 10, color: MUTED },
    ),
  ];
}

/** Full batchUpdate request list: 5 slides + removal of Google's placeholder. */
export function buildDeckRequests(deck: Deck, placeholderSlideId?: string) {
  const requests: Record<string, unknown>[] = [
    ...titleSlideRequests(deck),
    ...deck.slides.flatMap((slide, i) => contentSlideRequests(slide, i)),
  ];
  if (placeholderSlideId) {
    requests.push({ deleteObject: { objectId: placeholderSlideId } });
  }
  return requests;
}
