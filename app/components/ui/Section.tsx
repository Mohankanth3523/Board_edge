import { cn } from "~/lib/cn";

type Tone = "white" | "surface" | "navy" | "deep";

const tones: Record<Tone, string> = {
  white: "bg-white",
  surface: "bg-surface",
  navy: "bg-navy-900 text-white",
  deep: "bg-navy-950 text-white",
};

/** Page section with consistent vertical rhythm and tone. */
export function Section({
  id,
  tone = "white",
  className,
  children,
  labelledBy,
  flushTop = false,
}: {
  id?: string;
  tone?: Tone;
  /** Drop top padding when the previous section has the same tone (avoids a double gap). */
  flushTop?: boolean;
  className?: string;
  children: React.ReactNode;
  labelledBy?: string;
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn("relative", flushTop ? "section-y-flush" : "section-y", tones[tone], className)}>
      {children}
    </section>
  );
}

export function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("container-site", className)}>{children}</div>;
}

/**
 * Section index + label, e.g. "01 — Hardware R&D". Continues the numbered
 * style of the company brochure.
 */
export function Eyebrow({
  index,
  children,
  dark = false,
  accent = "green",
  className,
}: {
  index?: string;
  children: React.ReactNode;
  dark?: boolean;
  accent?: "green" | "blue";
  className?: string;
}) {
  const accentText =
    accent === "blue" ? (dark ? "text-blue-300" : "text-blue-700") : dark ? "text-green-400" : "text-green-700";
  return (
    <p className={cn("eyebrow flex items-center gap-3", dark ? "text-mist" : "text-muted", className)}>
      {index && <span className={cn("nums-tabular", accentText)}>{index}</span>}
      {index && <span aria-hidden="true" className={cn("h-px w-8", dark ? "bg-white/25" : "bg-navy-700/25")} />}
      <span>{children}</span>
    </p>
  );
}

/** Standard section heading block. */
export function SectionHeading({
  id,
  index,
  eyebrow,
  title,
  lead,
  dark = false,
  accent,
  className,
  titleClassName,
}: {
  id?: string;
  index?: string;
  eyebrow: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  dark?: boolean;
  accent?: "green" | "blue";
  className?: string;
  titleClassName?: string;
}) {
  return (
    <div className={className}>
      <Eyebrow index={index} dark={dark} accent={accent}>
        {eyebrow}
      </Eyebrow>
      <h2 id={id} className={cn("mt-5 text-h2", dark && "text-white", titleClassName)}>
        {title}
      </h2>
      {lead && <p className={cn("mt-5 max-w-[36rem] text-lead", dark ? "text-mist" : "text-muted")}>{lead}</p>}
    </div>
  );
}
