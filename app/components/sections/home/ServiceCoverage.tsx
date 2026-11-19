import { MapPin } from "lucide-react";
import { Reveal } from "~/components/motion/Reveal";
import { Container, Section, SectionHeading } from "~/components/ui/Section";
import { coverage } from "~/content/home";

/**
 * Coverage shown as a "connection" between the two service markets rather
 * than a drawn map (an inaccurate state map would undermine credibility).
 * No branch addresses are implied.
 */
export function ServiceCoverage() {
  const [a, b] = coverage.regions;
  return (
    <Section tone="surface" labelledBy="cov-title">
      <Container className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
        <SectionHeading
          id="cov-title"
          className="lg:col-span-6"
          index="07"
          eyebrow={coverage.eyebrow}
          title={coverage.headline}
          lead={coverage.lead}
        />
        <Reveal className="lg:col-span-6">
          <div className="grid items-stretch sm:grid-cols-[1fr_auto_1fr]">
            {a && <Region {...a} />}
            <Connector />
            {b && <Region {...b} />}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

function Region({ name, detail, note }: { name: string; detail: string; note: string }) {
  return (
    <div className="rounded-sm border border-line bg-white p-7 sm:p-8">
      <p className="eyebrow flex items-center gap-2 text-green-700">
        <MapPin aria-hidden="true" size={14} />
        {note}
      </p>
      <p className="mt-6 font-display text-[clamp(1.75rem,1.4rem+1.2vw,2.25rem)] leading-none font-bold tracking-[-0.03em] text-navy-700">{name}</p>
      <p className="mt-2 text-muted">{detail}</p>
    </div>
  );
}

function Connector() {
  return (
    <div aria-hidden="true" className="flex items-center justify-center py-3 sm:px-2 sm:py-0">
      <svg viewBox="0 0 72 24" className="hidden h-6 w-18 sm:block" fill="none">
        <path d="M2 12 H70" stroke="#c3cfda" strokeWidth="1.5" />
        <path d="M2 12 H70" stroke="#17a655" strokeWidth="2" pathLength={1} className="be-draw" />
        <circle cx="4" cy="12" r="4" fill="#fff" stroke="#17a655" strokeWidth="2" />
        <circle cx="68" cy="12" r="4" fill="#fff" stroke="#17a655" strokeWidth="2" />
      </svg>
      <svg viewBox="0 0 24 48" className="h-12 w-6 sm:hidden" fill="none">
        <path d="M12 2 V46" stroke="#17a655" strokeWidth="2" />
        <circle cx="12" cy="4" r="3.5" fill="#fff" stroke="#17a655" strokeWidth="2" />
        <circle cx="12" cy="44" r="3.5" fill="#fff" stroke="#17a655" strokeWidth="2" />
      </svg>
    </div>
  );
}
