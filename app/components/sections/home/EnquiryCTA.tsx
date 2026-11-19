import { Factory, GraduationCap } from "lucide-react";
import { Reveal } from "~/components/motion/Reveal";
import { ButtonLink } from "~/components/ui/Button";
import { Container } from "~/components/ui/Section";
import { closing } from "~/content/home";

/** Final CTA: business and student enquiries with equal weight. */
export function EnquiryCTA() {
  return (
    <section aria-labelledby="cta-title" className="bg-white py-[clamp(4rem,3rem+4vw,7rem)]">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-sm bg-navy-950 px-6 py-12 text-white sm:px-12 sm:py-16 lg:px-16 lg:py-20">
            <div aria-hidden="true" className="absolute inset-0 bg-drawing-grid" />
            <div className="relative grid gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-5">
                <p className="eyebrow text-green-400">Get in touch</p>
                <h2 id="cta-title" className="mt-5 text-h2 text-white">
                  {closing.headline}
                </h2>
                <p className="mt-5 max-w-md text-lead text-mist">{closing.text}</p>
              </div>
              <div className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
                <CtaCard
                  icon={<Factory aria-hidden="true" size={20} strokeWidth={1.75} />}
                  accent="text-green-400"
                  {...closing.business}
                  button={
                    <ButtonLink to={closing.business.cta.href} size="lg" arrow className="w-full">
                      {closing.business.cta.label}
                    </ButtonLink>
                  }
                />
                <CtaCard
                  icon={<GraduationCap aria-hidden="true" size={20} strokeWidth={1.75} />}
                  accent="text-blue-300"
                  {...closing.student}
                  button={
                    <ButtonLink to={closing.student.cta.href} size="lg" variant="light" arrow className="w-full">
                      {closing.student.cta.label}
                    </ButtonLink>
                  }
                />
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

function CtaCard({
  icon,
  accent,
  eyebrow,
  title,
  text,
  button,
}: {
  icon: React.ReactNode;
  accent: string;
  eyebrow: string;
  title: string;
  text: string;
  button: React.ReactNode;
}) {
  return (
    <div className="flex flex-col rounded-sm border border-white/10 bg-white/[0.03] p-7">
      <p className={`eyebrow flex items-center gap-2.5 ${accent}`}>
        {icon}
        {eyebrow}
      </p>
      <h3 className="mt-6 text-[1.375rem] leading-tight font-semibold text-white">{title}</h3>
      <p className="mt-3 text-[0.9375rem] leading-relaxed text-mist">{text}</p>
      <div className="mt-auto pt-8">{button}</div>
    </div>
  );
}
