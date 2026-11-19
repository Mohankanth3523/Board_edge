import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  // Pre-bundle up front so the dev server doesn't re-optimise mid-load
  // (which caused "504 Outdated Optimize Dep" on first start).
  optimizeDeps: {
    include: ["react", "react-dom", "react-dom/client", "react-router", "motion/react", "lucide-react", "clsx", "tailwind-merge"],
  },
});
