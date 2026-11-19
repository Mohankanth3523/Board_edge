import { DrawLine, Reveal } from "~/components/motion/Reveal";
import { Container, Section, SectionHeading } from "~/components/ui/Section";
import { workflow } from "~/content/home";

/**
 * Proposed working methodology drawn as a routed signal path: nodes are
 * vias, the rail draws in once. Horizontal (3×2 on tablet, 6 across on
 * desktop), vertical on mobile.
 */
export function EngineeringWorkflow() {
  return (
    <Section tone="navy" labelledBy="flow-title" className="overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 bg-drawing-grid" />
      <Container className="relative">
        <SectionHeading id="flow-title" dark index="04" eyebrow={workflow.eyebrow} title={workflow.headline} lead={workflow.lead} />

        <ol className="relative mt-16 grid lg:mt-20 lg:grid-cols-6 lg:gap-6">
          <DrawLine className="absolute top-[0.4375rem] right-0 left-0 hidden h-px bg-linear-to-r from-green-400/70 via-green-400/40 to-white/15 lg:block" />
          {workflow.steps.map((step, i) => (
            <Reveal as="li" key={step.title} delay={0.1 + i * 0.08} className="relative flex gap-6 pb-10 last:pb-0 lg:block lg:pb-0">
              {i < workflow.steps.length - 1 && (
                <span aria-hidden="true" className="absolute top-4 bottom-0 left-[0.4375rem] w-px bg-white/15 lg:hidden" />
              )}
              <span
                aria-hidden="true"
                className="relative z-10 mt-0.5 flex size-3.5 shrink-0 items-center justify-center rounded-full bg-navy-900 ring-2 ring-green-400 lg:mt-0"
              >
                <span className="size-1.5 rounded-full bg-green-400" />
              </span>
              <div className="lg:mt-8">
                <p className="eyebrow nums-tabular text-green-400">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-3 text-[1.1875rem] leading-snug font-semibold text-white">{step.title}</h3>
                <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-mist">{step.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
