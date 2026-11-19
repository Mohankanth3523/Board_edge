import { type RouteConfig, index, route } from "@react-router/dev/routes";
import { pages } from "./content/pages";

/**
 * Homepage + design-system reference, plus every planned inner page from the
 * site map. Pages not built yet (Phase 5) share a temporary "being prepared"
 * template so all homepage links resolve instead of returning 404.
 */
export default [
  index("routes/home.tsx"),
  route("design-system", "routes/design-system.tsx"),
  ...pages
    .filter((p) => !p.ready)
    .map((p) => route(p.path.slice(1), "routes/coming-soon.tsx", { id: `pending${p.path.replace(/\//g, "-")}` })),
] satisfies RouteConfig;
