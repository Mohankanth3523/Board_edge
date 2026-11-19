import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { Reveal } from "~/components/motion/Reveal";
import { ButtonLink } from "~/components/ui/Button";
import { CapabilityCard } from "~/components/ui/Cards";
import { Container, Section, SectionHeading } from "~/components/ui/Section";
import { hardwareRdIntro } from "~/content/home";
import { hardwareRD } from "~/content/services";

export function HardwareRD() {
  return (
    <Section id="hardware-rd" labelledBy="rd-title">
      <Container>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <SectionHeading
            id="rd-title"
            className="lg:col-span-8"
            index="01"
            eyebrow={hardwareRdIntro.eyebrow}
            title={hardwareRdIntro.headline}
            lead={hardwareRdIntro.lead}
            titleClassName="max-w-[20ch]"
          />
          <div className="lg:col-span-4 lg:justify-self-end">
            <ButtonLink to="/contact/business-enquiry" variant="secondary" arrow>
              Discuss an R&D project
            </ButtonLink>
          </div>
        </div>

        {/* Hairline spec grid: cells share borders */}
        <ul className="mt-14 grid border-t border-l border-line sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {hardwareRD.map((s, i) => (
            <Reveal as="li" key={s.slug} delay={(i % 4) * 0.05} className="border-r border-b border-line">
              <CapabilityCard service={s} index={i + 1} />
            </Reveal>
          ))}
          <Reveal as="li" delay={0.15} className="border-r border-b border-line">
            <Link
              to="/capabilities#hardware-rd"
              className="group/all flex h-full min-h-64 flex-col justify-between bg-navy-950 bg-drawing-grid p-7 text-white sm:p-8"
            >
              <p className="eyebrow text-green-400">All capabilities</p>
              <div>
                <p className="font-display text-[1.375rem] leading-tight font-semibold tracking-[-0.015em]">
                  See how R&D, assembly and testing work together.
                </p>
                <span className="mt-6 flex items-center gap-2 text-[0.75rem] font-semibold tracking-[0.08em] uppercase group-hover/all:text-green-400">
                  Our capabilities
                  <ArrowRight aria-hidden="true" size={16} className="transition-transform group-hover/all:translate-x-1" />
                </span>
              </div>
            </Link>
          </Reveal>
        </ul>
      </Container>
    </Section>
  );
}
