import { ChevronRight } from "lucide-react";
import { Link } from "react-router";
import { cn } from "~/lib/cn";

export interface Crumb {
  label: string;
  href?: string;
}

/**
 * Visible breadcrumb trail. The matching BreadcrumbList JSON-LD is emitted by
 * the SEO component (Phase 7) from the same `items` array.
 */
export function Breadcrumbs({ items, dark = false, className }: { items: Crumb[]; dark?: boolean; className?: string }) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.8125rem]">
        {items.map((c, i) => {
          const last = i === items.length - 1;
          return (
            <li key={`${c.label}-${i}`} className="flex items-center gap-2">
              {c.href && !last ? (
                <Link
                  to={c.href}
                  className={cn(
                    "underline-offset-4 transition-colors hover:underline",
                    dark ? "text-mist hover:text-white" : "text-muted hover:text-navy-700",
                  )}
                >
                  {c.label}
                </Link>
              ) : (
                <span aria-current={last ? "page" : undefined} className={cn("font-medium", dark ? "text-white" : "text-navy-700")}>
                  {c.label}
                </span>
              )}
              {!last && <ChevronRight aria-hidden="true" size={14} className={dark ? "text-white/30" : "text-line-strong"} />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
