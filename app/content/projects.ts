/**
 * Project gallery items.
 *
 * Only add REAL work by Board Edge Technologies, with permission from the
 * customer where their product is identifiable. Never use stock photography
 * here. While this list is empty the gallery section is hidden in production
 * (see site.preview.showImagePlaceholders for design previews).
 */
export type ProjectCategory = "Hardware R&D" | "PCB Assembly" | "Rework & Repair" | "Wire Harness" | "Panel Assembly" | "Student";

export interface Project {
  slug: string;
  title: string;
  category: ProjectCategory;
  summary: string;
  image: { src: string; alt: string; width: number; height: number };
}

export const projects: Project[] = [];

/** Categories shown as filters in the gallery. */
export const projectCategories: ProjectCategory[] = [
  "Hardware R&D",
  "PCB Assembly",
  "Rework & Repair",
  "Wire Harness",
  "Panel Assembly",
  "Student",
];
