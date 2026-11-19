/**
 * Service catalogue (summary level, used by navigation and the homepage).
 * Full service-page content is added in Phase 5.
 *
 * status:  "brochure" — stated in the company brochure
 *          "brief"    — confirmed in the client brief, not in the brochure
 *          "proposed" — explanatory copy written for the website (no factual claims)
 */
export type ContentStatus = "brochure" | "brief" | "proposed";

export type IconKey =
  | "flask"
  | "circuit-board"
  | "cpu"
  | "radio-tower"
  | "code"
  | "waypoints"
  | "activity"
  | "microchip"
  | "wrench"
  | "scan"
  | "cable"
  | "zap"
  | "layers"
  | "graduation"
  | "cog";

export interface ServiceSummary {
  slug: string;
  href: string;
  title: string;
  shortTitle?: string;
  /** One line used in menus and cards. */
  summary: string;
  icon: IconKey;
  /** Scope bullets. Brochure wording where available. */
  scope: string[];
  status: ContentStatus;
}

export const hardwareRD: ServiceSummary[] = [
  {
    slug: "prototype-development",
    href: "/hardware-rd/prototype-development",
    title: "Hardware Prototype Development",
    shortTitle: "Prototype Development",
    summary: "From requirement to a first working prototype you can evaluate.",
    icon: "flask",
    scope: ["Concept to working prototype", "Design, build and bring-up", "Iteration on test feedback"],
    status: "brief",
  },
  {
    slug: "pcb-design",
    href: "/hardware-rd/pcb-design",
    title: "PCB Design and Development",
    shortTitle: "PCB Design",
    summary: "Manufacturable board layouts developed from your schematic and constraints.",
    icon: "circuit-board",
    scope: ["Board layout from schematic", "Design for manufacture and assembly", "Fabrication and assembly outputs"],
    status: "brief",
  },
  {
    slug: "embedded-systems",
    href: "/hardware-rd/embedded-systems",
    title: "Embedded Systems Development",
    shortTitle: "Embedded Systems",
    summary: "Microcontroller-based hardware and software that work together reliably.",
    icon: "cpu",
    scope: ["Microcontroller-based designs", "Hardware–software integration", "Peripheral and interface bring-up"],
    status: "brief",
  },
  {
    slug: "iot-product-development",
    href: "/hardware-rd/iot-product-development",
    title: "IoT Product Development",
    shortTitle: "IoT Development",
    summary: "Connected devices that sense, communicate and report data.",
    icon: "radio-tower",
    scope: ["Connected device hardware", "Sensor and communication integration", "Prototype to field-trial units"],
    status: "brief",
  },
  {
    slug: "firmware-development",
    href: "/hardware-rd/firmware-development",
    title: "Firmware Development",
    shortTitle: "Firmware",
    summary: "Device firmware written for your hardware and tested on the board.",
    icon: "code",
    scope: ["Device firmware", "Drivers and peripheral control", "On-hardware testing and debugging"],
    status: "brief",
  },
  {
    slug: "circuit-design",
    href: "/hardware-rd/circuit-design",
    title: "Electronic Circuit Design",
    shortTitle: "Circuit Design",
    summary: "Schematic-level design: architecture, components, power and interfaces.",
    icon: "waypoints",
    scope: ["Circuit architecture", "Component selection", "Schematic design and review"],
    status: "brief",
  },
  {
    slug: "testing-validation",
    href: "/hardware-rd/testing-validation",
    title: "Testing and Validation",
    shortTitle: "Testing & Validation",
    summary: "Verifying that a design performs to its requirements before it scales.",
    icon: "activity",
    scope: ["Design verification", "Functional validation", "Test findings and recommendations"],
    status: "brief",
  },
];

export const assembly: ServiceSummary[] = [
  {
    slug: "pcb-assembly",
    href: "/assembly/pcb-assembly",
    title: "PCB Assembly",
    summary: "SMT and through-hole assembly, prototype builds, component soldering and PCB modifications.",
    icon: "microchip",
    scope: [
      "SMT and through-hole assembly",
      "Prototype and small-batch builds",
      "Component soldering and replacement",
      "PCB modification support",
    ],
    status: "brochure",
  },
  {
    slug: "pcb-rework-repair",
    href: "/assembly/pcb-rework-repair",
    title: "PCB Rework & Repair",
    summary: "SMD and BGA rework support, component replacement, track repair and soldering corrections.",
    icon: "wrench",
    scope: ["SMD/BGA rework support", "Component replacement", "Track and pad repair", "Soldering corrections"],
    status: "brochure",
  },
  {
    slug: "pcb-testing",
    href: "/assembly/pcb-testing",
    title: "PCB Testing",
    summary: "Continuity, short-circuit, functional and component-level checks with visual inspection.",
    icon: "scan",
    scope: [
      "Continuity and short-circuit checks",
      "Functional testing",
      "Component-level checks",
      "Visual inspection",
    ],
    status: "brochure",
  },
  {
    slug: "wire-harness",
    href: "/assembly/wire-harness",
    title: "Wire Harness Assembly",
    shortTitle: "Wire Harness",
    summary: "Cable cutting, stripping, crimping, connector fitting, harness assembly and electrical checks.",
    icon: "cable",
    scope: [
      "Wire cutting and stripping",
      "Crimping and connector assembly",
      "Custom cable harness builds",
      "Continuity and electrical checks",
    ],
    status: "brochure",
  },
  {
    slug: "electrical-panel",
    href: "/assembly/electrical-panel",
    title: "Electrical Panel Assembly",
    shortTitle: "Panel Assembly",
    summary: "Control panel mounting, wiring, cable routing, termination and electrical inspection.",
    icon: "zap",
    scope: [
      "Component mounting and installation",
      "Control wiring and cable routing",
      "Terminal connections and dressing",
      "Electrical inspection and verification",
    ],
    status: "brochure",
  },
  {
    slug: "prototype-support",
    href: "/assembly/prototype-support",
    title: "Prototype Support",
    summary: "Flexible support for samples, engineering changes, low-volume builds and production needs.",
    icon: "layers",
    scope: ["Sample builds", "Engineering changes", "Low-volume builds", "Support for production needs"],
    status: "brochure",
  },
];

export const studentServices: ServiceSummary[] = [
  {
    slug: "final-year-projects",
    href: "/students/final-year-projects",
    title: "Final-Year Projects",
    summary: "Practical development support for final-year engineering projects.",
    icon: "graduation",
    scope: [],
    status: "brief",
  },
  {
    slug: "hardware-project-support",
    href: "/students/hardware-project-support",
    title: "Hardware Project Support",
    summary: "Hands-on help with the hardware side of a project you are building.",
    icon: "cog",
    scope: [],
    status: "brief",
  },
];
