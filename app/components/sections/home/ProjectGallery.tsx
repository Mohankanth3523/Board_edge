import { Info } from "lucide-react";
import { Reveal } from "~/components/motion/Reveal";
import { MediaFrame } from "~/components/media/MediaFrame";
import { ButtonLink } from "~/components/ui/Button";
import { Container, Section, SectionHeading } from "~/components/ui/Section";
import { gallery } from "~/content/home";
import { photos, type Photo } from "~/content/images";
import { projects } from "~/content/projects";
import { cn } from "~/lib/cn";

interface Tile {
  title: string;
  photo: Photo;
  caption?: string;
  credit?: Photo["credit"];
}

/** Capability areas shown with reference photography until real project photos exist. */
const referenceTiles: Tile[] = [
  { title: "PCB design", photo: photos.pcbDesign },
  { title: "Electronic prototypes", photo: photos.prototype },
  { title: "Embedded systems", photo: photos.embedded },
  { title: "PCB assembly", photo: photos.pcbAssembly },
  { title: "Wire harness", photo: photos.wireHarness },
  { title: "Panel assembly", photo: photos.panel },
];

/**
 * Editorial grid: two feature tiles, then four equal tiles (desktop).
 * Real company projects replace the reference tiles automatically once
 * added to projects.ts.
 */
export function ProjectGallery() {
  const reference = projects.length === 0;
  const tiles: Tile[] = reference
    ? referenceTiles.map((t) => ({ ...t, credit: t.photo.credit }))
    : projects.map((p) => ({ title: p.title, caption: p.summary, photo: { ...p.image, source: "company" } }));

  return (
    <Section labelledBy="gallery-title" flushTop>
      <Container>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <SectionHeading id="gallery-title" className="lg:col-span-7" index="06" eyebrow={gallery.eyebrow} title={gallery.headline} />
          <div className="lg:col-span-5 lg:justify-self-end">
            <ButtonLink to="/projects" variant="secondary" arrow>
              View project gallery
            </ButtonLink>
          </div>
        </div>

        {reference && (
          <p className="mt-6 flex max-w-3xl gap-3 text-[0.9375rem] leading-relaxed text-muted">
            <Info aria-hidden="true" size={17} className="mt-1 shrink-0 text-blue-600" />
            {gallery.note}
          </p>
        )}

        <ul className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-12">
          {tiles.slice(0, 6).map((t, i) => {
            const feature = i < 2;
            return (
              <Reveal as="li" key={t.title} delay={(i % 4) * 0.05} className={cn("group/media", feature ? "lg:col-span-6" : "lg:col-span-3")}>
                <MediaFrame
                  photo={t.photo}
                  ratio={feature ? "16/10" : "4/3"}
                  sizes={feature ? "(min-width: 640px) 50vw, 100vw" : "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"}
                />
                <div className={cn("mt-4 flex gap-x-4 gap-y-1", feature ? "items-baseline justify-between" : "flex-col")}>
                  <h3 className="text-[1.0625rem] font-semibold text-navy-700">{t.title}</h3>
                  {t.credit && (
                    <a
                      href={t.credit.page}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-6 items-center text-[0.75rem] text-muted underline-offset-2 hover:text-navy-700 hover:underline"
                    >
                      Photo: {t.credit.name} / Unsplash
                    </a>
                  )}
                </div>
                {t.caption && <p className="mt-1.5 text-[0.9375rem] text-muted">{t.caption}</p>}
              </Reveal>
            );
          })}
        </ul>

        <div className="mt-12 flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl text-[0.9375rem] text-muted">Have a project you would like to discuss? Share your drawings or requirements with our team.</p>
          <ButtonLink to="/contact/business-enquiry" variant="ghost">
            Start a business enquiry
          </ButtonLink>
        </div>
      </Container>
    </Section>
  );
}
