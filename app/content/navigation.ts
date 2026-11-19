import { assembly, hardwareRD, studentServices, type ServiceSummary } from "./services";

export interface NavLink {
  label: string;
  href: string;
  description?: string;
}

/** Promo panel shown on the right of a mega menu. */
export interface MenuAside {
  eyebrow: string;
  title: string;
  text: string;
  cta: NavLink;
  secondary?: NavLink;
}

export interface MegaGroup {
  kind: "mega";
  label: string;
  heading: string;
  /** "View all" target. */
  href: string;
  items: ServiceSummary[];
  aside: MenuAside;
}

export interface DropdownGroup {
  kind: "dropdown";
  label: string;
  items: NavLink[];
}

export type NavItem = MegaGroup | DropdownGroup | (NavLink & { kind: "link" });

export const primaryNav: NavItem[] = [
  { kind: "link", label: "Home", href: "/" },
  { kind: "link", label: "About", href: "/about" },
  {
    kind: "mega",
    label: "Hardware R&D",
    heading: "Hardware R&D",
    href: "/capabilities#hardware-rd",
    items: hardwareRD,
    aside: {
      eyebrow: "Have a concept or requirement?",
      title: "Take an idea from first circuit to a validated prototype.",
      text: "Share your requirements, drawings or a rough concept and talk it through with an engineer.",
      cta: { label: "Discuss your project", href: "/contact/business-enquiry" },
      secondary: { label: "Final-year project support", href: "/students/final-year-projects" },
    },
  },
  {
    kind: "mega",
    label: "Assembly Services",
    heading: "Electronics & Electrical Assembly",
    href: "/capabilities#assembly",
    items: assembly,
    aside: {
      eyebrow: "From prototype to production",
      title: "Assembly, rework and testing built around your documentation.",
      text: "Prototype builds, small batches, repair work, wiring and panel assembly.",
      cta: { label: "Request a business quote", href: "/contact/business-enquiry" },
    },
  },
  {
    kind: "dropdown",
    label: "Students",
    items: [
      ...studentServices.map((s) => ({ label: s.title, href: s.href, description: s.summary })),
      { label: "Student Enquiry", href: "/contact/student-enquiry", description: "Tell us about your project idea." },
    ],
  },
  { kind: "link", label: "Projects", href: "/projects" },
  { kind: "link", label: "Contact", href: "/contact" },
];

export const footerColumns: { heading: string; links: NavLink[] }[] = [
  {
    heading: "Company",
    links: [
      { label: "Home", href: "/" },
      { label: "About Us", href: "/about" },
      { label: "Our Capabilities", href: "/capabilities" },
      { label: "Why Choose Us", href: "/why-choose-us" },
      { label: "Project Gallery", href: "/projects" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  {
    heading: "Hardware R&D",
    links: hardwareRD.map((s) => ({ label: s.shortTitle ?? s.title, href: s.href })),
  },
  {
    heading: "Assembly Services",
    links: assembly.map((s) => ({ label: s.shortTitle ?? s.title, href: s.href })),
  },
  {
    heading: "Students",
    links: [
      ...studentServices.map((s) => ({ label: s.title, href: s.href })),
      { label: "Student Enquiry", href: "/contact/student-enquiry" },
      { label: "Business Enquiry", href: "/contact/business-enquiry" },
    ],
  },
];
