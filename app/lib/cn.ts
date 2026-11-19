import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge must know our custom design tokens; otherwise it treats e.g.
 * `text-h2` as a colour (and drops it next to `text-white`) or treats
 * `bg-drawing-grid` as a background colour (and drops `bg-navy-950`).
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: ["display", "h1", "h2", "h3", "statement", "lead", "label"] }],
      "bg-image": [{ bg: ["drawing-grid", "drawing-grid-light"] }],
    },
  },
});

/** Merge class names; later Tailwind utilities override earlier ones. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
