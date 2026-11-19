import type { Config } from "@react-router/dev/config";

/**
 * Static pre-rendering: every route is rendered to its own HTML file at build
 * time (real titles, meta and content for search engines and link previews),
 * then hydrates into the React app. Output is plain static files for
 * Cloudflare Pages — no server required.
 */
export default {
  ssr: false,
  prerender: true,
} satisfies Config;
