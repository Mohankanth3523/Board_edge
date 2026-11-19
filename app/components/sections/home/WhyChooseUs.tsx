import { Reveal } from "~/components/motion/Reveal";
import { ButtonLink } from "~/components/ui/Button";
import { Container, Section, SectionHeading } from "~/components/ui/Section";
import { whyChooseUs } from "~/content/home";

export function WhyChooseUs() {
  return (
    <Section labelledBy="why-title">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <SectionHeading id="why-title" index="05" eyebrow={whyChooseUs.eyebrow} title={whyChooseUs.headline} lead={whyChooseUs.lead} />
            <ButtonLink to="/why-choose-us" variant="ghost" className="mt-8">
              Why choose us
            </ButtonLink>
          </div>
        </div>
        <ol className="grid gap-x-12 sm:grid-cols-2 lg:col-span-8">
          {whyChooseUs.items.map((w, i) => (
            <Reveal as="li" key={w.title} delay={(i % 2) * 0.06} className="border-t border-line py-9 sm:py-11">
              <span className="nums-tabular font-display text-[3.5rem] leading-none font-semibold tracking-[-0.04em] text-navy-100" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-6 text-h3">{w.title}</h3>
              <p className="mt-3 max-w-[32ch] text-muted">{w.text}</p>
            </Reveal>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
