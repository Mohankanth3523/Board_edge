/**
 * Site map (from WEBSITE_STRATEGY.md §2). Used for routing, breadcrumbs and,
 * in Phase 7, the sitemap. Pages marked `ready: false` render a temporary
 * "being prepared" page (noindex) so every link on the homepage works.
 *
 * Keep this file free of `~/` imports: routes.ts reads it at build time.
 */
export interface PageEntry {
  path: string;
  title: string;
  /** Breadcrumb parent label + href. */
  parent?: { label: string; href: string };
  group: "main" | "hardware-rd" | "assembly" | "students" | "projects" | "contact";
  ready: boolean;
}

const rd = { label: "Hardware R&D", href: "/capabilities#hardware-rd" };
const asm = { label: "Assembly Services", href: "/capabilities#assembly" };
const stu = { label: "Students", href: "/students/final-year-projects" };
const con = { label: "Contact", href: "/contact" };

export const pages: PageEntry[] = [
  { path: "/about", title: "About Us", group: "main", ready: false },
  { path: "/capabilities", title: "Our Capabilities", group: "main", ready: false },
  { path: "/why-choose-us", title: "Why Choose Us", group: "main", ready: false },

  { path: "/hardware-rd/prototype-development", title: "Hardware Prototype Development", parent: rd, group: "hardware-rd", ready: false },
  { path: "/hardware-rd/pcb-design", title: "PCB Design and Development", parent: rd, group: "hardware-rd", ready: false },
  { path: "/hardware-rd/embedded-systems", title: "Embedded Systems Development", parent: rd, group: "hardware-rd", ready: false },
  { path: "/hardware-rd/iot-product-development", title: "IoT Product Development", parent: rd, group: "hardware-rd", ready: false },
  { path: "/hardware-rd/firmware-development", title: "Firmware Development", parent: rd, group: "hardware-rd", ready: false },
  { path: "/hardware-rd/circuit-design", title: "Electronic Circuit Design", parent: rd, group: "hardware-rd", ready: false },
  { path: "/hardware-rd/testing-validation", title: "Testing and Validation", parent: rd, group: "hardware-rd", ready: false },

  { path: "/assembly/pcb-assembly", title: "PCB Assembly", parent: asm, group: "assembly", ready: false },
  { path: "/assembly/pcb-rework-repair", title: "PCB Rework and Repair", parent: asm, group: "assembly", ready: false },
  { path: "/assembly/pcb-testing", title: "PCB Testing", parent: asm, group: "assembly", ready: false },
  { path: "/assembly/wire-harness", title: "Wire Harness Assembly", parent: asm, group: "assembly", ready: false },
  { path: "/assembly/electrical-panel", title: "Electrical Panel Assembly", parent: asm, group: "assembly", ready: false },
  { path: "/assembly/prototype-support", title: "Prototype Support", parent: asm, group: "assembly", ready: false },

  { path: "/students/final-year-projects", title: "Final-Year Projects", parent: stu, group: "students", ready: false },
  { path: "/students/hardware-project-support", title: "Hardware Project Support", parent: stu, group: "students", ready: false },

  { path: "/projects", title: "Project Gallery", group: "projects", ready: false },

  { path: "/contact", title: "Contact Us", group: "contact", ready: false },
  { path: "/contact/business-enquiry", title: "Business Enquiry", parent: con, group: "contact", ready: false },
  { path: "/contact/student-enquiry", title: "Student Enquiry", parent: con, group: "contact", ready: false },
];

export function findPage(pathname: string) {
  const clean = pathname.replace(/\/+$/, "") || "/";
  return pages.find((p) => p.path === clean);
}
