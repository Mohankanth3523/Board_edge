/**
 * Photography registry.
 *
 * All current images are REFERENCE PHOTOGRAPHY from Unsplash (Unsplash
 * License: free for commercial use, no attribution required — credited here
 * and in gallery captions anyway). They are NOT Board Edge Technologies'
 * premises, staff or completed projects and must never be labelled as such.
 *
 * Replace with the company's own photography as it becomes available:
 * set `source: "company"` and point `src` at a file in /public/images/.
 *
 * Before launch: download the chosen Unsplash files and self-host them
 * (better performance, no third-party dependency).
 */
export interface Photo {
  /** Unsplash photo id (photo-…) or a local path starting with "/". */
  src: string;
  alt: string;
  source: "reference" | "company";
  /** Intrinsic aspect used for width/height attributes (prevents layout shift). */
  width: number;
  height: number;
  /** CSS object-position for cropping. */
  position?: string;
  credit?: { name: string; page: string };
}

export const photos = {
  hero: {
    src: "photo-1524234107056-1c1f48f64ab8",
    alt: "Microcontroller board and OLED display wired on a breadboard under blue light",
    source: "reference",
    width: 1600,
    height: 1200,
    position: "50% 50%",
    credit: { name: "Tim Käbel", page: "https://unsplash.com/photos/closeup-photo-of-circuit-board-FCrYdP8gohg" },
  },
  assembly: {
    src: "photo-1684430598409-750ae3284704",
    alt: "Through-hole components and a wound toroidal inductor on a circuit board",
    source: "reference",
    width: 1600,
    height: 1200,
    credit: { name: "Ludovico Ceroseis", page: "https://unsplash.com/photos/a-close-up-of-a-circuit-board-with-many-electronic-components-8hcIIZ8SoyU" },
  },
  pcbDesign: {
    src: "photo-1651340765216-ba02df201308",
    alt: "Surface-mount inductors and ICs on a blue printed circuit board",
    source: "reference",
    width: 1600,
    height: 1067,
    credit: { name: "Anne Nygård", page: "https://unsplash.com/photos/a-close-up-of-a-circuit-board-cA8VTQeHU0c" },
  },
  prototype: {
    src: "photo-1649959265040-2b87be9074e4",
    alt: "Breadboard prototype with components connected to a microcontroller board",
    source: "reference",
    width: 1600,
    height: 1200,
    credit: { name: "Vishnu Mohanan", page: "https://unsplash.com/photos/a-soldering-soldering-tool-is-attached-to-a-bread-board-O68LT-zCYFg" },
  },
  embedded: {
    src: "photo-1603732551658-5fabbafa84eb",
    alt: "Microcontroller development board and electronic parts on a blue surface",
    source: "reference",
    width: 1600,
    height: 1067,
    credit: { name: "Sahand Babali", page: "https://unsplash.com/photos/blue-and-black-circuit-board-gavODTHG36Y" },
  },
  pcbAssembly: {
    src: "photo-1560846389-8c7e1d88eca8",
    alt: "Hands soldering components on an electronics workbench",
    source: "reference",
    width: 1600,
    height: 1067,
    credit: { name: "Blaz Erzetic", page: "https://unsplash.com/photos/man-fixing-the-device-using-soldering-iron-uM9Fz2eVhIM" },
  },
  wireHarness: {
    src: "photo-1761507320645-b11a00bfcc34",
    alt: "Colour-coded insulated wires fanned out on a light background",
    source: "reference",
    width: 1600,
    height: 2134,
    credit: { name: "Kier in Sight Archives", page: "https://unsplash.com/photos/a-colorful-bundle-of-electrical-wires-on-a-light-background-Sbxf5Dbyerk" },
  },
  panel: {
    src: "photo-1744113439895-14529bb2f6e6",
    alt: "Labelled electrical power board with breaker and fuse modules",
    source: "reference",
    width: 1600,
    height: 2560,
    position: "50% 22%",
    credit: { name: "Gez Xavier Mansfield", page: "https://unsplash.com/photos/control-panel-with-electrical-components-is-shown-mSkj6UKt33Y" },
  },
} satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof photos;

const WIDTHS = [480, 768, 1080, 1440, 1920];

/** Build a URL for a photo at a given width (Unsplash CDN or local file). */
export function photoUrl(p: Photo, w: number) {
  if (p.src.startsWith("/")) return p.src;
  return `https://images.unsplash.com/${p.src}?auto=format&fit=crop&w=${w}&q=72`;
}

export function photoSrcSet(p: Photo) {
  if (p.src.startsWith("/")) return undefined;
  return WIDTHS.map((w) => `${photoUrl(p, w)} ${w}w`).join(", ");
}
