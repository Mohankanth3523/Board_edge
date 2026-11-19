import { Info } from "lucide-react";
import { Reveal } from "~/components/motion/Reveal";
import { ButtonLink } from "~/components/ui/Button";
import { FeatureChip } from "~/components/ui/Cards";
import { Container, Section, SectionHeading } from "~/components/ui/Section";
import { students } from "~/content/home";

export function StudentProjects() {
  return (
    <Section id="students" tone="surface" labelledBy="stu-title">
      <Container className="grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="min-w-0 lg:col-span-6">
          <SectionHeading
            id="stu-title"
            index="03"
            accent="blue"
            eyebrow={students.eyebrow}
            title={students.headline}
            lead={students.body}
            titleClassName="max-w-[18ch]"
          />
          <p className="mt-10 eyebrow text-muted">Project categories</p>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {students.categories.map((c, i) => (
              <Reveal as="li" key={c.label} delay={i * 0.04} className="list-none">
                <FeatureChip as="div" icon={c.icon} label={c.label} />
              </Reveal>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <ButtonLink to={students.cta.href} size="lg" variant="navy" arrow>
              {students.cta.label}
            </ButtonLink>
            <ButtonLink to="/students/hardware-project-support" variant="ghost">
              Hardware project support
            </ButtonLink>
          </div>
        </div>

        <Reveal className="min-w-0 lg:col-span-6">
          <div className="rounded-sm border border-line bg-white p-7 shadow-[var(--shadow-panel)] sm:p-11">
            <p className="eyebrow text-blue-700">How it works</p>
            <ol className="mt-8">
              {students.steps.map((s, i) => {
                const last = i === students.steps.length - 1;
                return (
                  <li key={s.title} className="relative flex gap-5 pb-9 last:pb-0">
                    {!last && <span aria-hidden="true" className="absolute top-10 bottom-1 left-[1.1875rem] w-px bg-blue-600/25" />}
                    <span className="nums-tabular flex size-10 shrink-0 items-center justify-center rounded-full border border-blue-600/30 bg-blue-50 text-[0.875rem] font-semibold text-blue-700">
                      {i + 1}
                    </span>
                    <div className="pt-1.5">
                      <h3 className="text-[1.0625rem] font-semibold text-navy-700">{s.title}</h3>
                      <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-muted">{s.text}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
            <p className="mt-10 flex gap-3 border-t border-line pt-6 text-[0.875rem] leading-relaxed text-muted">
              <Info aria-hidden="true" size={16} className="mt-0.5 shrink-0 text-blue-600" />
              {students.note}
            </p>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
