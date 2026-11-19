import { ArrowUpRight, Check } from "lucide-react";
import { Link } from "react-router";
import type { ServiceSummary } from "~/content/services";
import { cn } from "~/lib/cn";
import { ServiceIcon } from "./Icon";

/**
 * R&D capability cell. Designed to sit in a hairline grid (cells share
 * borders) rather than as floating rounded cards. The green trace on the left
 * edge "routes in" on hover.
 */
export function CapabilityCard({ service, index }: { service: ServiceSummary; index: number }) {
  return (
    <Link
      to={service.href}
      className="group/cap relative flex h-full flex-col bg-white p-7 transition-colors duration-300 hover:bg-surface sm:p-8"
    >
      <span
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-[2px] origin-top scale-y-0 bg-green-500 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/cap:scale-y-100"
      />
      <div className="flex items-start justify-between">
        <span className="flex size-11 items-center justify-center rounded-sm border border-line bg-white text-navy-700 transition-colors duration-300 group-hover/cap:border-green-500/40 group-hover/cap:text-green-700">
          <ServiceIcon name={service.icon} />
        </span>
        <span className="eyebrow nums-tabular text-subtle">{String(index).padStart(2, "0")}</span>
      </div>
      <h3 className="mt-8 text-[1.1875rem] leading-snug font-semibold tracking-[-0.01em] text-navy-700">{service.title}</h3>
      <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">{service.summary}</p>
      <span className="mt-auto flex items-center gap-1.5 pt-8 text-[0.75rem] font-semibold tracking-[0.08em] text-navy-600 uppercase">
        Explore capability<span className="sr-only">: {service.title}</span>
        <ArrowUpRight
          aria-hidden="true"
          size={15}
          className="transition-transform duration-300 group-hover/cap:translate-x-0.5 group-hover/cap:-translate-y-0.5"
        />
      </span>
    </Link>
  );
}

/** Spec-sheet style service panel: scope list from the brochure. */
export function ServiceSpecCard({
  service,
  index,
  dark = false,
  className,
}: {
  service: ServiceSummary;
  index?: number;
  dark?: boolean;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "flex h-full flex-col rounded-sm border p-7 sm:p-9",
        dark ? "border-white/10 bg-navy-900" : "border-line bg-white",
        className,
      )}
    >
      <div className="flex items-center gap-4">
        <span
          className={cn(
            "flex size-12 items-center justify-center rounded-sm",
            dark ? "bg-white/5 text-green-400" : "bg-green-50 text-green-700",
          )}
        >
          <ServiceIcon name={service.icon} size={24} />
        </span>
        {index !== undefined && (
          <span className={cn("eyebrow nums-tabular", dark ? "text-mist" : "text-subtle")}>
            Service {String(index).padStart(2, "0")}
          </span>
        )}
      </div>
      <h3 className={cn("mt-7 text-h3", dark ? "text-white" : "text-navy-700")}>{service.title}</h3>
      <p className={cn("mt-3 text-[0.9875rem] leading-relaxed", dark ? "text-mist" : "text-muted")}>{service.summary}</p>
      <dl className={cn("mt-7 border-t", dark ? "border-white/10" : "border-line")}>
        <dt className="sr-only">Scope</dt>
        {service.scope.map((item) => (
          <dd
            key={item}
            className={cn(
              "flex items-start gap-3 border-b py-3 text-[0.9375rem]",
              dark ? "border-white/10 text-white/90" : "border-line text-ink",
            )}
          >
            <Check
              aria-hidden="true"
              size={16}
              strokeWidth={2.25}
              className={cn("mt-1 shrink-0", dark ? "text-green-400" : "text-green-600")}
            />
            {item}
          </dd>
        ))}
      </dl>
      <Link
        to={service.href}
        className={cn(
          "group/lnk mt-auto inline-flex items-center gap-2 pt-8 text-[0.75rem] font-semibold tracking-[0.08em] uppercase",
          dark ? "text-white hover:text-green-400" : "text-navy-700 hover:text-green-700",
        )}
      >
        {service.title} details
        <ArrowUpRight aria-hidden="true" size={15} className="transition-transform group-hover/lnk:translate-x-0.5 group-hover/lnk:-translate-y-0.5" />
      </Link>
    </article>
  );
}

/** Compact feature row with icon (student focus areas, lists). */
/**
 * Renders an <li> by default (for direct use inside a <ul>). Pass as="div" when
 * a wrapper (e.g. <Reveal as="li">) already provides the list item.
 */
export function FeatureChip({
  icon,
  label,
  accent = "blue",
  as: Tag = "li",
}: {
  icon: ServiceSummary["icon"];
  label: string;
  accent?: "blue" | "green";
  as?: "li" | "div";
}) {
  return (
    <Tag className="flex items-center gap-3 rounded-sm border border-line bg-white px-4 py-3.5">
      <span className={cn("shrink-0", accent === "blue" ? "text-blue-600" : "text-green-600")}>
        <ServiceIcon name={icon} size={20} />
      </span>
      <span className="text-[0.9375rem] font-medium text-ink">{label}</span>
    </Tag>
  );
}
