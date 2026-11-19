import { useId, useRef, useState } from "react";
import { m } from "motion/react";
import { Reveal } from "~/components/motion/Reveal";
import { MediaFrame } from "~/components/media/MediaFrame";
import { ServiceSpecCard } from "~/components/ui/Cards";
import { Container, Section, SectionHeading } from "~/components/ui/Section";
import { assemblyIntro } from "~/content/home";
import { photos } from "~/content/images";
import { assembly } from "~/content/services";
import { cn } from "~/lib/cn";

/**
 * Brochure services as an accessible tab set (ARIA tabs, arrow keys).
 * Desktop: vertical tab list + reference photo, spec panel on the right.
 * Mobile/tablet: scrollable tab row above the spec panel.
 */
export function AssemblyServices() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const baseId = useId();
  const current = assembly[active]!;

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const last = assembly.length - 1;
    const map: Record<string, number> = {
      ArrowDown: i === last ? 0 : i + 1,
      ArrowRight: i === last ? 0 : i + 1,
      ArrowUp: i === 0 ? last : i - 1,
      ArrowLeft: i === 0 ? last : i - 1,
      Home: 0,
      End: last,
    };
    const next = map[e.key];
    if (next === undefined) return;
    e.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
    tabRefs.current[next]?.scrollIntoView({ block: "nearest", inline: "nearest" });
  };

  return (
    <Section id="assembly" tone="deep" labelledBy="asm-title" className="overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 bg-drawing-grid opacity-60" />
      <Container className="relative">
        <SectionHeading
          id="asm-title"
          dark
          index="02"
          eyebrow={assemblyIntro.eyebrow}
          title={assemblyIntro.headline}
          lead={assemblyIntro.lead}
          titleClassName="max-w-[22ch]"
        />

        <div className="mt-14 grid gap-8 lg:mt-16 lg:grid-cols-12 lg:gap-12">
          <div className="min-w-0 lg:col-span-5">
            <div
              role="tablist"
              aria-label="Assembly services"
              className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:mx-0 sm:px-0 lg:flex-col lg:gap-0 lg:overflow-visible lg:border-t lg:border-white/10 lg:pb-0"
            >
              {assembly.map((s, i) => {
                const selected = i === active;
                return (
                  <button
                    key={s.slug}
                    ref={(el) => {
                      tabRefs.current[i] = el;
                    }}
                    role="tab"
                    id={`${baseId}-tab-${i}`}
                    aria-selected={selected}
                    aria-controls={`${baseId}-panel`}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setActive(i)}
                    onKeyDown={(e) => onKey(e, i)}
                    className={cn(
                      "group/tab relative flex min-h-12 shrink-0 items-center gap-4 rounded-sm border px-4 py-3 text-left transition-colors duration-200",
                      "lg:rounded-none lg:border-0 lg:border-b lg:border-white/10 lg:px-5 lg:py-5",
                      selected ? "border-green-400/50 bg-white/[0.06] text-white" : "border-white/10 text-mist hover:bg-white/[0.03] hover:text-white",
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute inset-y-0 left-0 hidden w-[2px] origin-top bg-green-400 transition-transform duration-300 lg:block",
                        selected ? "scale-y-100" : "scale-y-0",
                      )}
                    />
                    <span className={cn("eyebrow nums-tabular", selected ? "text-green-400" : "text-subtle")}>{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-[0.9375rem] font-semibold whitespace-nowrap lg:text-[1.0625rem]">{s.title}</span>
                  </button>
                );
              })}
            </div>

            <Reveal className="mt-8 hidden lg:block">
              <MediaFrame photo={photos.assembly} ratio="16/10" sizes="(min-width: 1024px) 40vw, 100vw" />
            </Reveal>
          </div>

          <div id={`${baseId}-panel`} role="tabpanel" aria-labelledby={`${baseId}-tab-${active}`} className="min-w-0 lg:col-span-7">
            <m.div
              key={current.slug}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="h-full"
            >
              <ServiceSpecCard service={current} index={active + 1} dark />
            </m.div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
