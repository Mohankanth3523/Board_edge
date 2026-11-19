import type { Route } from "./+types/design-system";
import { SiteLayout } from "~/components/layout/SiteLayout";
import { Alert, CheckboxField, SelectField, TextareaField, TextField } from "~/components/ui/Field";
import { Breadcrumbs } from "~/components/ui/Breadcrumbs";
import { Button, ButtonLink } from "~/components/ui/Button";
import { CapabilityCard, FeatureChip, ServiceSpecCard } from "~/components/ui/Cards";
import { Container, Eyebrow, Section, SectionHeading } from "~/components/ui/Section";
import { assembly, hardwareRD } from "~/content/services";
import { site } from "~/config/site";

/** Internal reference page for the design system. Not indexed. */
export function meta(_: Route.MetaArgs) {
  return [{ title: `Design system | ${site.name}` }, { name: "robots", content: "noindex, nofollow" }];
}

const colors: { group: string; swatches: { name: string; hex: string; cls: string; dark?: boolean }[] }[] = [
  {
    group: "Navy",
    swatches: [
      { name: "navy-950", hex: "#0B1F33", cls: "bg-navy-950", dark: true },
      { name: "navy-900", hex: "#102A43", cls: "bg-navy-900", dark: true },
      { name: "navy-800", hex: "#163756", cls: "bg-navy-800", dark: true },
      { name: "navy-700 · logo", hex: "#0B2A5C", cls: "bg-navy-700", dark: true },
      { name: "navy-600", hex: "#1A4A80", cls: "bg-navy-600", dark: true },
      { name: "navy-100", hex: "#DCE6F0", cls: "bg-navy-100" },
    ],
  },
  {
    group: "Technical green",
    swatches: [
      { name: "green-400", hex: "#45C47A", cls: "bg-green-400" },
      { name: "green-500", hex: "#17A655", cls: "bg-green-500" },
      { name: "green-600", hex: "#0E9550", cls: "bg-green-600", dark: true },
      { name: "green-700", hex: "#0A7A41", cls: "bg-green-700", dark: true },
      { name: "green-50", hex: "#E7F5EC", cls: "bg-green-50" },
    ],
  },
  {
    group: "Accent blue · neutrals",
    swatches: [
      { name: "blue-600", hex: "#1685B8", cls: "bg-blue-600", dark: true },
      { name: "blue-700", hex: "#0F6C98", cls: "bg-blue-700", dark: true },
      { name: "ink", hex: "#172B3A", cls: "bg-ink", dark: true },
      { name: "muted", hex: "#4F6475", cls: "bg-muted", dark: true },
      { name: "surface", hex: "#F3F7FA", cls: "bg-surface" },
      { name: "line", hex: "#DCE4EB", cls: "bg-line" },
    ],
  },
];

const type = [
  { label: "Display · Inter Display 700", cls: "text-display", sample: "Engineering Ideas." },
  { label: "H1 page heading", cls: "text-h1", sample: "PCB Design and Development" },
  { label: "H2 section heading", cls: "text-h2", sample: "Complete assembly solutions." },
  { label: "H3", cls: "text-h3", sample: "Wire Harness Assembly" },
  { label: "Statement", cls: "text-statement font-semibold", sample: "Dependable, quality-focused support." },
];

export default function DesignSystem() {
  return (
    <SiteLayout>
      <section className="border-b border-line bg-surface py-14">
        <Container>
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Design system" }]} />
          <h1 className="mt-6 text-h1">Design system</h1>
          <p className="mt-4 max-w-2xl text-lead text-muted">
            Tokens and components for the Board Edge Technologies website. Internal reference — not linked from the site.
          </p>
        </Container>
      </section>

      <Section>
        <Container className="space-y-24">
          {/* Colour */}
          <div>
            <SectionHeading index="A" eyebrow="Colour" title="Navy carries the brand. Green is the signal." />
            <div className="mt-10 space-y-10">
              {colors.map((g) => (
                <div key={g.group}>
                  <p className="eyebrow text-muted">{g.group}</p>
                  <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
                    {g.swatches.map((s) => (
                      <li key={s.name} className="overflow-hidden rounded-sm border border-line">
                        <div className={`h-20 ${s.cls}`} />
                        <div className="p-3 text-[0.8125rem]">
                          <p className="font-semibold text-navy-700">{s.name}</p>
                          <p className="nums-tabular text-muted">{s.hex}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Type */}
          <div>
            <SectionHeading index="B" eyebrow="Typography" title="Inter Display for headings, Inter for reading." />
            <div className="mt-10 divide-y divide-line border-y border-line">
              {type.map((t) => (
                <div key={t.label} className="grid gap-3 py-7 md:grid-cols-[14rem_1fr] md:items-baseline">
                  <p className="eyebrow text-muted">{t.label}</p>
                  <p className={`${t.cls} font-display font-bold text-navy-700`}>{t.sample}</p>
                </div>
              ))}
              <div className="grid gap-3 py-7 md:grid-cols-[14rem_1fr]">
                <p className="eyebrow text-muted">Lead · Body · Label</p>
                <div className="space-y-4">
                  <p className="text-lead text-muted">Lead — practical assembly and support services designed around your project requirements.</p>
                  <p>Body — SMT and through-hole assembly, prototype builds, component soldering and PCB modifications.</p>
                  <Eyebrow index="02">Section label</Eyebrow>
                </div>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div>
            <SectionHeading index="C" eyebrow="Buttons" title="One primary action per view." />
            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              <div className="flex flex-wrap items-center gap-4 rounded-sm border border-line p-8">
                <ButtonLink to="/" arrow>
                  Primary
                </ButtonLink>
                <ButtonLink to="/" variant="secondary">
                  Secondary
                </ButtonLink>
                <ButtonLink to="/" variant="navy">
                  Navy
                </ButtonLink>
                <ButtonLink to="/" variant="ghost">
                  Text link
                </ButtonLink>
                <Button disabled>Disabled</Button>
              </div>
              <div className="flex flex-wrap items-center gap-4 rounded-sm bg-navy-950 p-8">
                <ButtonLink to="/" arrow>
                  Primary
                </ButtonLink>
                <ButtonLink to="/" variant="secondary-dark">
                  Secondary
                </ButtonLink>
                <ButtonLink to="/" variant="light">
                  Light
                </ButtonLink>
                <ButtonLink to="/" variant="ghost-dark">
                  Text link
                </ButtonLink>
              </div>
            </div>
          </div>

          {/* Cards */}
          <div>
            <SectionHeading index="D" eyebrow="Cards" title="Spec grid, spec sheet, feature chip." />
            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              <div className="border border-line">
                <CapabilityCard service={hardwareRD[1]!} index={2} />
              </div>
              <ServiceSpecCard service={assembly[3]!} index={4} />
              <ul className="space-y-3">
                <FeatureChip icon="cpu" label="Embedded systems" />
                <FeatureChip icon="radio-tower" label="IoT development" />
                <FeatureChip icon="code" label="Firmware" accent="green" />
              </ul>
            </div>
          </div>

          {/* Forms */}
          <div>
            <SectionHeading
              index="E"
              eyebrow="Form fields"
              title="Clear labels, honest states."
              lead="Validation and submission are wired in Phase 6. These show the visual states."
            />
            <div className="mt-10 grid gap-10 lg:grid-cols-2">
              <div className="grid gap-6 rounded-sm border border-line p-8 sm:grid-cols-2">
                <TextField label="Name" required autoComplete="name" />
                <TextField label="Company" required autoComplete="organization" />
                <TextField label="Email" type="email" required error="Enter a valid email address" defaultValue="name@" />
                <TextField label="Phone" type="tel" required hint="Include country code if outside India" />
                <SelectField
                  className="sm:col-span-2"
                  label="Required service"
                  required
                  options={[...hardwareRD, ...assembly].map((s) => ({ value: s.slug, label: s.title }))}
                />
                <TextareaField className="sm:col-span-2" label="Project description" required rows={4} />
                <div className="sm:col-span-2">
                  <CheckboxField label="I agree to be contacted about this enquiry." />
                </div>
              </div>
              <div className="space-y-4">
                <Alert tone="success" title="Thanks, your enquiry has been received.">
                  Shown only after the server confirms the submission.
                </Alert>
                <Alert tone="error" title="We couldn't send your enquiry.">
                  Please try again. Your details have been kept.
                </Alert>
                <Alert tone="warning" title="Online enquiries are being set up.">
                  Shown when no form backend is configured — the form never pretends to succeed.
                </Alert>
                <Alert tone="info" title="Information">
                  Neutral notices and hints.
                </Alert>
              </div>
            </div>
          </div>

          {/* Breadcrumbs */}
          <div>
            <SectionHeading index="F" eyebrow="Breadcrumbs" title="Orientation on every inner page." />
            <div className="mt-10 space-y-4">
              <div className="rounded-sm border border-line p-6">
                <Breadcrumbs
                  items={[
                    { label: "Home", href: "/" },
                    { label: "Capabilities", href: "/capabilities" },
                    { label: "Hardware R&D", href: "/capabilities#hardware-rd" },
                    { label: "PCB Design and Development" },
                  ]}
                />
              </div>
              <div className="rounded-sm bg-navy-950 p-6">
                <Breadcrumbs
                  dark
                  items={[
                    { label: "Home", href: "/" },
                    { label: "Assembly", href: "/capabilities#assembly" },
                    { label: "Wire Harness Assembly" },
                  ]}
                />
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </SiteLayout>
  );
}
