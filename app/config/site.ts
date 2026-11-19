/**
 * Business details — the single place to update company information.
 *
 * RULE: never put an unconfirmed value here. Leave it `null` and the UI that
 * depends on it hides itself automatically (phone links, email, address,
 * structured data, WhatsApp button…).
 */
export const site = {
  name: "Board Edge Technologies",
  shortName: "Board Edge",
  tagline: "Precision in Every Connection.",
  positioning: "Electronics Engineering, Hardware R&D and Electronics & Electrical Assembly",

  /** ❓ Domain not yet confirmed. Used for canonical URLs and the sitemap. */
  url: "https://www.example.com",

  contact: {
    phone: null as string | null, // ❓ e.g. "+91 98XXX XXXXX"
    whatsapp: null as string | null, // ❓ digits only, e.g. "9198XXXXXXXX"
    email: {
      business: null as string | null, // ❓
      students: null as string | null, // ❓
    },
    address: null as string | null, // ❓ full postal address
    hours: null as string | null, // ❓
  },

  /** Brochure: "Location: Bengaluru, Karnataka, India". */
  baseLocation: { city: "Bengaluru", region: "Karnataka", country: "India" },

  /** Client brief: operating markets. Specific Tamil Nadu cities not yet confirmed. */
  serviceAreas: ["Bengaluru", "Tamil Nadu"],

  social: {
    linkedin: null as string | null,
    instagram: null as string | null,
    youtube: null as string | null,
  },

  /**
   * Preview switches — set both to false before launch.
   *  showImagePlaceholders: labelled frames where a photo is still missing
   *  showContactPlaceholders: "Phone — to be confirmed" rows in the footer
   */
  preview: {
    showImagePlaceholders: true,
    showContactPlaceholders: true,
  },
} as const;

export type Site = typeof site;
