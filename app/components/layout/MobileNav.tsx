import { useEffect, useRef, useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router";
import { ButtonLink } from "~/components/ui/Button";
import { ServiceIcon } from "~/components/ui/Icon";
import { primaryNav } from "~/content/navigation";
import { site } from "~/config/site";
import { cn } from "~/lib/cn";

/**
 * Full-height mobile/tablet menu under the header (below 1280px).
 * Accordion groups mirror the desktop structure; both enquiry paths stay
 * pinned at the bottom. While open: page scroll is locked, the rest of the
 * page is inert, Esc closes and focus moves into the panel.
 */
export function MobileNav({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [top, setTop] = useState(72);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    // Sit exactly under the header wherever it currently is.
    const header = document.querySelector("header");
    if (header) setTop(Math.max(0, header.getBoundingClientRect().bottom));
    const main = document.getElementById("main");
    const footer = document.querySelector("footer");
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    main?.setAttribute("inert", "");
    footer?.setAttribute("inert", "");
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const t = setTimeout(() => panelRef.current?.querySelector<HTMLElement>("a,button")?.focus(), 60);
    const mq = window.matchMedia("(min-width: 80rem)");
    const onMq = () => mq.matches && onClose();
    mq.addEventListener("change", onMq);
    return () => {
      document.body.style.overflow = prev;
      main?.removeAttribute("inert");
      footer?.removeAttribute("inert");
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
      clearTimeout(t);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <m.div
          id="mobile-nav"
          ref={panelRef}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          style={{ top }}
          className="fixed inset-x-0 bottom-0 z-40 flex flex-col overflow-hidden border-t border-line bg-white xl:hidden"
        >
          <nav aria-label="Mobile" className="flex-1 overflow-y-auto overscroll-contain">
            <ul className="container-site divide-y divide-line">
              {primaryNav.map((item) =>
                item.kind === "link" ? (
                  <li key={item.label}>
                    <Link to={item.href} onClick={onClose} className="flex min-h-14 items-center text-[1.0625rem] font-semibold text-navy-700">
                      {item.label}
                    </Link>
                  </li>
                ) : (
                  <li key={item.label}>
                    <button
                      type="button"
                      aria-expanded={expanded === item.label}
                      onClick={() => setExpanded((v) => (v === item.label ? null : item.label))}
                      className="flex min-h-14 w-full items-center justify-between text-left text-[1.0625rem] font-semibold text-navy-700"
                    >
                      {item.label}
                      <ChevronDown
                        aria-hidden="true"
                        size={18}
                        className={cn("text-muted transition-transform duration-200", expanded === item.label && "rotate-180")}
                      />
                    </button>
                    {expanded === item.label && (
                      <ul className="pb-3">
                        {item.kind === "mega" ? (
                          <>
                            {item.items.map((s) => (
                              <li key={s.slug}>
                                <Link to={s.href} onClick={onClose} className="flex min-h-12 items-center gap-3 text-[0.9875rem] text-ink">
                                  <span className="text-green-600">
                                    <ServiceIcon name={s.icon} size={18} />
                                  </span>
                                  {s.title}
                                </Link>
                              </li>
                            ))}
                            <li>
                              <Link
                                to={item.href}
                                onClick={onClose}
                                className="flex min-h-12 items-center text-[0.8125rem] font-semibold tracking-[0.06em] text-navy-600 uppercase"
                              >
                                View all {item.label}
                              </Link>
                            </li>
                          </>
                        ) : (
                          item.items.map((l) => (
                            <li key={l.href}>
                              <Link to={l.href} onClick={onClose} className="flex min-h-12 items-center text-[0.9875rem] text-ink">
                                {l.label}
                              </Link>
                            </li>
                          ))
                        )}
                      </ul>
                    )}
                  </li>
                ),
              )}
            </ul>
          </nav>
          <div className="border-t border-line bg-surface">
            <div className="container-site grid grid-cols-2 gap-3 py-4">
              <ButtonLink to="/contact/business-enquiry" className="w-full px-3">
                Business enquiry
              </ButtonLink>
              <ButtonLink to="/contact/student-enquiry" variant="navy" className="w-full px-3">
                Student enquiry
              </ButtonLink>
            </div>
            {site.contact.phone && (
              <p className="container-site pb-4 text-center text-[0.875rem] text-muted">
                Or call <a href={`tel:${site.contact.phone.replace(/\s/g, "")}`}>{site.contact.phone}</a>
              </p>
            )}
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
