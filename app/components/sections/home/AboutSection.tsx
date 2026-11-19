import { BoardRender } from "~/components/brand/BoardRender";
import { Reveal } from "~/components/motion/Reveal";
import { ButtonLink } from "~/components/ui/Button";
import { Container, Section, SectionHeading } from "~/components/ui/Section";
import { about } from "~/content/home";

/**
 * About Board Edge: brochure positioning + six focus areas, beside the
 * engineering-drawing illustration (the brand's signature graphic).
 */
export function AboutSection() {
  return (
    <Section tone="surface" labelledBy="about-title">
      <Container className="grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <SectionHeading id="about-title" eyebrow={about.eyebrow} title={about.headline} lead={about.lead} />
          <p className="mt-5 max-w-[36rem] text-muted">{about.body}</p>
          <ButtonLink to="/about" variant="ghost" className="mt-8">
            About Board Edge Technologies
          </ButtonLink>
        </div>

        <Reveal className="lg:col-span-6">
          <figure className="relative rounded-sm bg-navy-950 p-5 sm:p-8">
            <BoardRender className="block h-auto w-full" title="Illustrative PCB layout drawing" />
            <figcaption className="mt-4 flex items-center justify-between border-t border-white/10 pt-4 text-[0.6875rem] tracking-[0.14em] text-subtle uppercase">
              <span>Illustrative PCB layout</span>
              <span className="text-green-400">{about.motto}</span>
            </figcaption>
          </figure>
        </Reveal>

        <ol className="grid gap-x-8 sm:grid-cols-2 lg:col-span-12 lg:grid-cols-3">
          {about.focus.map((f, i) => (
            <Reveal as="li" key={f.title} delay={(i % 3) * 0.05} className="flex gap-5 border-t border-line-strong/70 py-7">
              <span className="eyebrow nums-tabular pt-1 text-green-700">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="text-[1.125rem] font-semibold text-navy-700">{f.title}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{f.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
