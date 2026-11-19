import { ArrowUpRight, GraduationCap } from "lucide-react";
import { Link } from "react-router";
import { Photo } from "~/components/media/Photo";
import { ButtonLink } from "~/components/ui/Button";
import { Eyebrow } from "~/components/ui/Section";
import { hero } from "~/content/home";
import { photos } from "~/content/images";

/**
 * Split hero: copy on navy, photograph bleeding to the right edge.
 * The headline is never animated (LCP). The photo and pillar strip use
 * CSS-only fades, so they never wait for JavaScript. React 19 preloads the
 * eager, high-priority hero image automatically.
 */
export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-navy-950 text-white">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-drawing-grid"
        style={{ maskImage: "linear-gradient(to right, #000 0%, #000 45%, transparent 75%)" }}
      />

      <div className="relative lg:min-h-[40rem] xl:min-h-[44rem]">
        <div className="container-site grid lg:grid-cols-12">
          <div className="pt-14 pb-12 sm:pt-20 lg:col-span-6 lg:py-24 lg:pr-10 xl:py-28">
            <Eyebrow dark>{hero.eyebrow}</Eyebrow>
            <h1 id="hero-title" className="mt-7 text-display text-white">
              {hero.headline.map((line) => (
                <span key={line} className="block">
                  {line.replace(/\.$/, "")}
                  <span className="text-green-400">.</span>
                </span>
              ))}
            </h1>
            <p className="mt-7 max-w-[34rem] text-lead text-mist">{hero.description}</p>

            <div className="mt-10 flex flex-col gap-3 xs:flex-row xs:flex-wrap">
              <ButtonLink to={hero.primaryCta.href} size="lg" arrow>
                {hero.primaryCta.label}
              </ButtonLink>
              <ButtonLink to={hero.secondaryCta.href} size="lg" variant="secondary-dark">
                {hero.secondaryCta.label}
              </ButtonLink>
            </div>

            <Link
              to={hero.studentCta.href}
              className="group/stu mt-9 flex items-center gap-3 border-t border-white/10 pt-6 text-[0.875rem] text-mist transition-colors hover:text-white"
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-sm bg-white/5 text-blue-300">
                <GraduationCap aria-hidden="true" size={18} strokeWidth={1.75} />
              </span>
              <span>
                Final-year engineering student?{" "}
                <span className="font-semibold tracking-[0.06em] whitespace-nowrap text-white uppercase">{hero.studentCta.label}</span>
              </span>
              <ArrowUpRight
                aria-hidden="true"
                size={16}
                className="shrink-0 transition-transform group-hover/stu:translate-x-0.5 group-hover/stu:-translate-y-0.5"
              />
            </Link>
          </div>
        </div>

        {/* Photograph: full-bleed under the copy on mobile, right half on desktop */}
        <figure className="be-fade-in relative aspect-[4/3] sm:aspect-[16/9] lg:absolute lg:inset-y-0 lg:right-0 lg:aspect-auto lg:w-[47%]">
          <Photo photo={photos.hero} priority sizes="(min-width: 1024px) 47vw, 100vw" />
          {/* Blend into the navy: fade on the inner edge only */}
          <div aria-hidden="true" className="absolute inset-0 bg-navy-950/15" />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-24 bg-linear-to-b from-navy-950 to-transparent lg:inset-y-0 lg:right-auto lg:left-0 lg:h-auto lg:w-40 lg:bg-linear-to-r"
          />
          {/* Drawing marks */}
          {["top-6 right-6 border-t border-r", "right-6 bottom-6 border-r border-b"].map((p) => (
            <span key={p} aria-hidden="true" className={`absolute hidden size-5 border-white/50 lg:block ${p}`} />
          ))}
          <figcaption className="absolute bottom-4 left-5 text-[0.6875rem] tracking-[0.14em] text-white/70 uppercase lg:bottom-6 lg:left-auto lg:right-14">
            Reference image
          </figcaption>
        </figure>
      </div>

      {/* Service pillars (navigation, not statistics) */}
      <div className="relative border-t border-white/10 bg-navy-950">
        <ul className="be-fade-in container-site grid grid-cols-2 [animation-delay:0.3s] lg:grid-cols-4">
          {hero.pillars.map((p, i) => (
            <li
              key={p.label}
              className="border-white/10 odd:border-r [&:nth-child(n+3)]:border-t lg:border-r lg:first:border-l lg:[&:nth-child(n+3)]:border-t-0"
            >
              <Link
                to={p.href}
                className="group/pl flex h-full min-h-16 items-center justify-between gap-3 px-4 py-5 text-[0.9375rem] font-medium text-white transition-colors hover:bg-white/[0.03] lg:px-6 lg:py-6"
              >
                <span className="flex items-baseline gap-3">
                  <span className="eyebrow nums-tabular text-green-400">{String(i + 1).padStart(2, "0")}</span>
                  {p.label}
                </span>
                <ArrowUpRight
                  aria-hidden="true"
                  size={16}
                  className="shrink-0 text-subtle transition-[color,transform] group-hover/pl:translate-x-0.5 group-hover/pl:-translate-y-0.5 group-hover/pl:text-green-400"
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
