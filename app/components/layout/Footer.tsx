import { Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router";
import { Logo } from "~/components/brand/Logo";
import { ButtonLink } from "~/components/ui/Button";
import { footerColumns } from "~/content/navigation";
import { site } from "~/config/site";

/**
 * Contact rows show real values from site.ts. While a value is unconfirmed
 * and `preview.showContactPlaceholders` is on, a muted "to be confirmed"
 * placeholder is shown; with it off (production) the row is hidden.
 */
function ContactRow({ icon, label, value, href }: { icon: React.ReactNode; label: string; value: string | null; href?: string }) {
  if (!value && !site.preview.showContactPlaceholders) return null;
  return (
    <p className="flex items-start gap-3">
      <span className="mt-0.5 shrink-0 text-green-400">{icon}</span>
      <span>
        <span className="sr-only">{label}: </span>
        {value ? (
          href ? (
            <a href={href} className="hover:text-white">
              {value}
            </a>
          ) : (
            value
          )
        ) : (
          <span className="text-subtle italic">
            {label} — to be confirmed
          </span>
        )}
      </span>
    </p>
  );
}

export function Footer() {
  const { contact } = site;
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden bg-navy-950 text-mist">
      <div className="container-site pt-20 pb-10 lg:pt-24">
        <div className="grid gap-14 lg:grid-cols-12">
          {/* Brand block */}
          <div className="lg:col-span-4">
            {/* White tile until a reversed (white) logo is supplied */}
            <div className="inline-block rounded-sm bg-white px-5 py-4">
              <Logo variant="full" className="h-14" />
            </div>
            <p className="mt-7 max-w-sm text-[0.9375rem] leading-relaxed">
              Electronics engineering, hardware R&D and electronics &amp; electrical assembly for businesses and engineering students
              across {site.serviceAreas.join(" and ")}.
            </p>

            <address className="mt-7 space-y-2.5 text-[0.9375rem] not-italic">
              <ContactRow
                icon={<MapPin aria-hidden="true" size={17} />}
                label="Location"
                value={contact.address ?? `${site.baseLocation.city}, ${site.baseLocation.region}, ${site.baseLocation.country}`}
              />
              <ContactRow
                icon={<Phone aria-hidden="true" size={17} />}
                label="Phone"
                value={contact.phone}
                href={contact.phone ? `tel:${contact.phone.replace(/\s/g, "")}` : undefined}
              />
              <ContactRow
                icon={<Mail aria-hidden="true" size={17} />}
                label="Email"
                value={contact.email.business}
                href={contact.email.business ? `mailto:${contact.email.business}` : undefined}
              />
            </address>

            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink to="/contact/business-enquiry">Business enquiry</ButtonLink>
              <ButtonLink to="/contact/student-enquiry" variant="secondary-dark">
                Student enquiry
              </ButtonLink>
            </div>
          </div>

          {/* Link columns */}
          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-4 lg:col-span-8">
            {footerColumns.map((col) => (
              <div key={col.heading}>
                <p className="eyebrow text-white">{col.heading}</p>
                <ul className="mt-5 space-y-1">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link to={l.href} className="inline-flex min-h-9 items-center text-[0.9375rem] leading-snug transition-colors hover:text-white">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* Service coverage strip */}
        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="eyebrow text-subtle">Service coverage</p>
          <ul className="flex flex-wrap gap-x-8 gap-y-2 text-[0.9375rem] text-white">
            {site.serviceAreas.map((a) => (
              <li key={a} className="flex items-center gap-2.5">
                <span aria-hidden="true" className="size-1.5 rounded-full bg-green-400" />
                {a}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-8 text-[0.8125rem] text-subtle sm:flex-row sm:justify-between">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <p className="font-medium text-mist">{site.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
