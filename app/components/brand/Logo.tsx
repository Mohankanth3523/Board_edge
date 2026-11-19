import { Link } from "react-router";
import { site } from "~/config/site";
import { cn } from "~/lib/cn";

/**
 * Original Board Edge Technologies logo (from the company brochure), with the
 * white background removed. Two lockups:
 *  - "horizontal": mark + wordmark + TECHNOLOGIES (header)
 *  - "full": adds the "Precision in Every Connection." tagline (footer, about)
 * The logo is not redrawn or recoloured. On navy it sits on a white tile
 * until a reversed vector version is supplied.
 */
export function Logo({
  variant = "horizontal",
  className,
  linked = true,
  priority = false,
}: {
  variant?: "horizontal" | "full";
  className?: string;
  linked?: boolean;
  priority?: boolean;
}) {
  const img =
    variant === "full" ? (
      <img
        src="/images/brand/logo-full.png"
        width={693}
        height={200}
        alt={`${site.name} — ${site.tagline}`}
        className={cn("h-auto w-auto", className)}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
      />
    ) : (
      <img
        src="/images/brand/logo-horizontal.png"
        width={440}
        height={120}
        alt={site.name}
        className={cn("h-auto w-auto", className)}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
      />
    );
  if (!linked) return img;
  return (
    <Link to="/" aria-label={`${site.name} — home`} className="inline-flex shrink-0 items-center">
      {img}
    </Link>
  );
}
