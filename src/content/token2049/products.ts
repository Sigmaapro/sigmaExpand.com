/**
 * Exhibition slots. The client has not delivered product content.
 * Add a record when a real product exists. A room with no name stays a
 * numbered plinth and does not open.
 */

export type ExhibitTreatment = "plinth" | "bay" | "instrument" | "folio";

export type ExhibitMedia =
  | { kind: "image"; src: string; alt: string }
  | { kind: "video"; src: string; poster?: string }
  | { kind: "model"; src: string };

export type PlateToken = "ocean" | "green" | "orchid" | "coral";

export type ShowcaseProduct = {
  id: string;
  index: string;
  name?: string;
  category?: string;
  summary?: string;
  details?: string;
  features?: string[];
  relation?: string;
  treatment?: ExhibitTreatment;
  media?: ExhibitMedia;
  href?: string;
};

const PLATES: PlateToken[] = ["ocean", "green", "orchid", "coral"];

export const PLATE_COLOR: Record<PlateToken, string> = {
  ocean: "#1976d2",
  green: "#55b98a",
  orchid: "#d86fa5",
  coral: "#f28b70",
};

export const SHOWCASE_PRODUCTS: ShowcaseProduct[] = [];

export function getShowcaseProduct(id: string): ShowcaseProduct | undefined {
  return SHOWCASE_PRODUCTS.find((product) => product.id === id);
}

export function canOpenProduct(product: ShowcaseProduct): boolean {
  return Boolean(product.name?.trim());
}

export function plateForIndex(index: number): PlateToken {
  return PLATES[index % PLATES.length];
}
