/**
 * Homepage copy. Sources noted per block:
 *  [brief]    = client brief (homepage development brief, 19 Nov 2026)
 *  [brochure] = company brochure
 *  [proposed] = explanatory copy written for the site — no factual claims
 */
import type { IconKey } from "./services";

export const hero = {
  // [brief]
  eyebrow: "Electronics Engineering · Hardware R&D · Assembly",
  headline: ["Engineering Ideas.", "Building Reliable Electronics."],
  description:
    "From electronic circuit design and hardware development to PCB assembly, repair, testing and electrical integration, Board Edge Technologies supports innovation at every stage.",
  primaryCta: { label: "Explore our capabilities", href: "/capabilities" },
  secondaryCta: { label: "Discuss your project", href: "/contact/business-enquiry" },
  studentCta: { label: "Final year project support", href: "/students/final-year-projects" },
  // Service pillars (navigation, not statistics)
  pillars: [
    { label: "Hardware R&D", href: "/capabilities#hardware-rd" },
    { label: "PCB Design", href: "/hardware-rd/pcb-design" },
    { label: "Assembly & Rework", href: "/capabilities#assembly" },
    { label: "Testing & Validation", href: "/hardware-rd/testing-validation" },
  ],
};

export const pathways = {
  business: {
    // [brief]
    eyebrow: "Industries & Businesses",
    headline: "Engineering Support for Your Next Product.",
    highlight: "Professional electronics engineering and assembly support for business and industrial requirements.",
    items: [
      "Hardware R&D",
      "PCB design",
      "Prototype development",
      "PCB assembly",
      "PCB rework and repair",
      "PCB testing",
      "Wire harness assembly",
      "Electrical panel assembly",
    ],
    cta: { label: "Explore industrial solutions", href: "/capabilities" },
    secondary: { label: "Request a business quote", href: "/contact/business-enquiry" },
  },
  student: {
    // [brief]
    eyebrow: "Students & Fresh Engineers",
    headline: "Bring Your Final‑Year Engineering Project to Life.",
    highlight: "Final-year project development and hardware support for engineering students.",
    items: [
      "Electronics circuit development",
      "PCB design",
      "Embedded systems",
      "IoT development",
      "Firmware",
      "Hardware prototypes",
    ],
    cta: { label: "Explore student projects", href: "/students/final-year-projects" },
    secondary: { label: "Student enquiry", href: "/contact/student-enquiry" },
  },
};

export const about = {
  eyebrow: "About Board Edge",
  headline: "Engineering Precision at Every Stage.", // [brief]
  // [brochure] "Who we are", extended with the R&D scope confirmed in the brief
  lead: "Board Edge Technologies provides dependable, quality-focused support for electronic and electrical engineering — from the first circuit to tested, assembled hardware.",
  body: "From prototype builds and repair work to wiring and panel assembly, we help customers turn designs into reliable products. Our hardware R&D work adds circuit design, PCB design, embedded systems, IoT and firmware development to that foundation.",
  // [brief] focus areas · [proposed] one-line explanations
  focus: [
    { title: "Electronics engineering", text: "Circuit architecture, component selection and schematic design." },
    { title: "Hardware innovation", text: "Embedded, IoT and firmware development for new hardware ideas." },
    { title: "PCB development", text: "Manufacturable board layouts developed from your requirements." },
    { title: "Electronics assembly", text: "SMT and through-hole assembly, wire harness and panel assembly." },
    { title: "Reliable testing", text: "Continuity, short-circuit and functional checks with visual inspection." },
    { title: "Prototype support", text: "Samples, engineering changes and low-volume builds." },
  ],
  motto: "From prototype to production.", // [brochure]
};

export const hardwareRdIntro = {
  eyebrow: "Hardware R&D",
  headline: "From Electronic Concepts to Working Prototypes.", // [brief]
  lead: "Electronic circuit design, PCB design, embedded systems, IoT and firmware development — with testing and validation at every step.", // [proposed]
};

export const assemblyIntro = {
  eyebrow: "Electronics & Electrical Assembly",
  headline: "Complete Electronics & Electrical Assembly Solutions.", // [brief] = [brochure]
  lead: "Your partner for reliable, quality-focused assembly, repair and testing support.", // [brochure]
};

export const students = {
  eyebrow: "Student Project Development",
  headline: "Your Engineering Idea Deserves to Become Reality.", // [brief]
  // [proposed] — scope wording pending client confirmation (strategy §6.3)
  body: "Work with engineers who build electronics every day. We support final-year students with project development and practical hardware help — planning, building and testing, so you understand what you have built and can present it with confidence.",
  categories: [
    { label: "Embedded systems", icon: "cpu" },
    { label: "IoT projects", icon: "radio-tower" },
    { label: "PCB development", icon: "circuit-board" },
    { label: "Electronic circuits", icon: "waypoints" },
    { label: "Firmware", icon: "code" },
    { label: "Hardware prototypes", icon: "flask" },
  ] satisfies { label: string; icon: IconKey }[],
  // [proposed] engagement steps
  steps: [
    { title: "Share your idea", text: "Tell us your project idea, department and requirements." },
    { title: "Plan the scope", text: "Agree what will be built, the approach and the components." },
    { title: "Build and test", text: "Develop the hardware and firmware and test it on the bench." },
    { title: "Review together", text: "Walk through how it works before your evaluation." },
  ],
  note: "Support is scoped to each project. Outcomes depend on the project and on the student's own work; we do not offer guarantees of grades or placement.",
  cta: { label: "Discuss your final-year project", href: "/contact/student-enquiry" },
};

// [brief] stage names · [proposed] descriptions. A proposed methodology, adapted per project.
export const workflow = {
  eyebrow: "Engineering workflow",
  headline: "A clear, adaptable way of working.",
  lead: "Our proposed working methodology. Stages are adapted to each project's scope — some engagements cover the full sequence, others a single stage.",
  steps: [
    { title: "Understand Requirements", text: "Review your drawings, specifications or idea and clarify the scope." },
    { title: "Technical Planning", text: "Agree the approach, components, deliverables and checkpoints." },
    { title: "Design & Development", text: "Circuit, PCB and firmware work — or a review of the files you provide." },
    { title: "Prototype & Assembly", text: "Build prototypes or assemblies to your documentation." },
    { title: "Testing & Validation", text: "Continuity, short-circuit and functional checks with visual inspection." },
    { title: "Project Handover", text: "Hand over the tested build and the agreed documentation." },
  ],
};

// [brochure] "Why work with us?" — descriptions verbatim
export const whyChooseUs = {
  eyebrow: "Why Board Edge Technologies",
  headline: "Why work with us.",
  lead: "Practical engineering and assembly support designed around your drawings, specifications and project requirements.",
  items: [
    { title: "Quality Focus", text: "Attention to workmanship, inspection and dependable results." },
    { title: "Flexible Support", text: "Support for prototypes, samples, rework and production requirements." },
    { title: "Customer-Oriented Solutions", text: "Solutions aligned to your drawings, specifications and project needs." },
    { title: "Responsive Service", text: "Clear communication and a practical approach to delivery commitments." },
  ],
};

export const gallery = {
  eyebrow: "Project gallery",
  headline: "The work we support, in pictures.",
  note: "Reference photography illustrating our capability areas. These are not Board Edge Technologies projects; company project photographs will replace them as they become available.",
};

export const coverage = {
  eyebrow: "Service coverage",
  headline: "Supporting Engineering Requirements Across Bengaluru and Tamil Nadu.", // [brief]
  lead: "Serving businesses, engineering teams and students in both markets.",
  regions: [
    { name: "Bengaluru", detail: "Karnataka", note: "Service market" },
    { name: "Tamil Nadu", detail: "Service region", note: "Service market" },
  ],
};

export const closing = {
  headline: "Let's Build Something Reliable.", // [brochure]
  text: "Have an electronics engineering requirement or a final-year project idea? Connect with Board Edge Technologies.", // [brief]
  business: {
    eyebrow: "Industries & Businesses",
    title: "Electronics engineering requirement",
    text: "R&D, PCB design, assembly, rework, testing, wire harness or panel work.",
    cta: { label: "Business enquiry", href: "/contact/business-enquiry" },
  },
  student: {
    eyebrow: "Students & Engineers",
    title: "Final-year project idea",
    text: "Tell us your project idea, department and academic year.",
    cta: { label: "Student enquiry", href: "/contact/student-enquiry" },
  },
};
