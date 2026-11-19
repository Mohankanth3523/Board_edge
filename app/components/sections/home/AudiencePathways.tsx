import { Factory, GraduationCap } from "lucide-react";
import { Reveal } from "~/components/motion/Reveal";
import { ButtonLink } from "~/components/ui/Button";
import { Container } from "~/components/ui/Section";
import { pathways } from "~/content/home";
import { cn } from "~/lib/cn";

/**
 * The site's main fork: two equal-weight panels with identical structure.
 * Industrial = navy + green; Student = light blue-grey + accent blue.
 */
export function AudiencePathways() {
  const { business, student } = pathways;
  return (
    <section aria-label="Choose your path" className="bg-white py-[clamp(3rem,2rem+4vw,6rem)]">
      <Container className="grid gap-5 lg:grid-cols-2 lg:gap-6">
        <Reveal className="min-w-0">
          <Panel
            tone="dark"
            id="path-business"
            icon={<Factory aria-hidden="true" size={20} strokeWidth={1.75} />}
            eyebrow={business.eyebrow}
            headline={business.headline}
            highlight={business.highlight}
            items={business.items}
          >
            <ButtonLink to={business.cta.href} size="lg" arrow>
              {business.cta.label}
            </ButtonLink>
            <ButtonLink to={business.secondary.href} variant="ghost-dark">
              {business.secondary.label}
            </ButtonLink>
          </Panel>
        </Reveal>
        <Reveal delay={0.08} className="min-w-0">
          <Panel
            tone="light"
            id="path-student"
            icon={<GraduationCap aria-hidden="true" size={20} strokeWidth={1.75} />}
            eyebrow={student.eyebrow}
            headline={student.headline}
            highlight={student.highlight}
            items={student.items}
          >
            <ButtonLink to={student.cta.href} size="lg" variant="navy" arrow>
              {student.cta.label}
            </ButtonLink>
            <ButtonLink to={student.secondary.href} variant="ghost">
              {student.secondary.label}
            </ButtonLink>
          </Panel>
        </Reveal>
      </Container>
    </section>
  );
}

function Panel({
  tone,
  id,
  icon,
  eyebrow,
  headline,
  highlight,
  items,
  children,
}: {
  tone: "dark" | "light";
  id: string;
  icon: React.ReactNode;
  eyebrow: string;
  headline: string;
  highlight: string;
  items: string[];
  children: React.ReactNode;
}) {
  const dark = tone === "dark";
  return (
    <article
      aria-labelledby={id}
      className={cn(
        "relative flex h-full flex-col overflow-hidden rounded-sm p-7 sm:p-11 lg:p-14",
        dark ? "bg-navy-950 bg-drawing-grid text-white" : "border border-line bg-surface",
      )}
    >
      <p className={cn("eyebrow flex items-center gap-3", dark ? "text-green-400" : "text-blue-700")}>
        <span className={cn("flex size-9 items-center justify-center rounded-sm", dark ? "bg-white/5" : "bg-white text-blue-600")}>{icon}</span>
        For {eyebrow}
      </p>
      <h2 id={id} className={cn("mt-8 max-w-[20ch] text-h2", dark ? "text-white" : "text-navy-700")}>
        {headline}
      </h2>
      <p className={cn("mt-5 max-w-[34rem] text-lead", dark ? "text-mist" : "text-muted")}>{highlight}</p>

      <ul className={cn("mt-10 grid border-t sm:grid-cols-2 sm:gap-x-8", dark ? "border-white/10" : "border-line-strong/60")}>
        {items.map((item, i) => (
          <li
            key={item}
            className={cn("flex items-baseline gap-4 border-b py-3.5 text-[0.9875rem]", dark ? "border-white/10 text-white/90" : "border-line-strong/60 text-ink")}
          >
            <span className={cn("eyebrow nums-tabular", dark ? "text-green-400" : "text-blue-700")}>{String(i + 1).padStart(2, "0")}</span>
            {item}
          </li>
        ))}
      </ul>

      <div className="mt-auto flex flex-wrap items-center gap-x-8 gap-y-4 pt-11">{children}</div>
    </article>
  );
}
