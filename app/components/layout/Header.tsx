import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router";
import { Logo } from "~/components/brand/Logo";
import { ButtonLink } from "~/components/ui/Button";
import { ServiceIcon } from "~/components/ui/Icon";
import { primaryNav, type DropdownGroup, type MegaGroup } from "~/content/navigation";
import { site } from "~/config/site";
import { cn } from "~/lib/cn";
import { MobileNav } from "./MobileNav";

const EASE = [0.22, 1, 0.36, 1] as const;
const panelMotion = {
  initial: { opacity: 0, y: -6 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -6 },
  transition: { duration: 0.22, ease: EASE },
};

const navText = "text-[0.9375rem] font-medium transition-colors";

/** Thin top bar: positioning + the two audience entry points. Desktop only. */
export function UtilityBar() {
  return (
    <div className="hidden bg-navy-950 text-[0.8125rem] text-mist xl:block">
      <div className="container-site flex h-10 items-center justify-between">
        <p>
          {site.positioning} <span className="mx-2 text-white/25">|</span> {site.serviceAreas.join(" & ")}
        </p>
        <ul className="flex items-center gap-6">
          {site.contact.phone && (
            <li>
              <a href={`tel:${site.contact.phone.replace(/\s/g, "")}`} className="hover:text-white">
                {site.contact.phone}
              </a>
            </li>
          )}
          <li>
            <Link to="/contact/business-enquiry" className="transition-colors hover:text-white">
              Business enquiry
            </Link>
          </li>
          <li>
            <Link to="/contact/student-enquiry" className="transition-colors hover:text-white">
              Student enquiry
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export function Header() {
  const [open, setOpen] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { pathname } = useLocation();

  const close = useCallback(() => setOpen(null), []);
  const closeMobile = useCallback(() => setMobileOpen(false), []);

  // Close menus on route change
  useEffect(() => {
    setOpen(null);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Esc returns focus to the trigger; outside click closes.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      headerRef.current?.querySelector<HTMLButtonElement>(`[data-menu-trigger="${open}"]`)?.focus();
      close();
    };
    const onDown = (e: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) close();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [open, close]);

  // Hover intent for mouse users; click and keyboard always work.
  const hoverOpen = (label: string) => (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => setOpen(label), 90);
  };
  const hoverClose = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => setOpen(null), 160);
  };
  // Keyboard: close when focus leaves the menu item entirely.
  const blurClose = (e: React.FocusEvent<HTMLLIElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setOpen((v) => (v === e.currentTarget.dataset.label ? null : v));
  };

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href.split("#")[0] ?? href));

  return (
    <header
      ref={headerRef}
      // Solid white (no backdrop-filter: it would re-anchor the fixed mobile panel to the header).
      className={cn(
        "sticky top-0 z-50 border-b bg-white transition-shadow duration-300",
        scrolled ? "border-line shadow-[0_8px_24px_-18px_rgb(11_31_51/0.4)]" : "border-line/70",
      )}
    >
      <div className="container-site flex h-[4.5rem] items-center justify-between gap-6 xl:h-20">
        <Logo priority className="h-10 xl:h-11" />

        <nav aria-label="Primary" className="hidden h-full xl:block">
          <ul className="flex h-full items-center">
            {primaryNav.map((item) =>
              item.kind === "link" ? (
                <li key={item.label}>
                  <Link
                    to={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={cn(
                      navText,
                      "relative rounded-sm px-3 py-2",
                      isActive(item.href) ? "text-green-700" : "text-navy-700 hover:text-green-700",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ) : (
                <li
                  key={item.label}
                  data-label={item.label}
                  className={cn("flex h-full items-center", item.kind === "dropdown" && "relative")}
                  onPointerEnter={hoverOpen(item.label)}
                  onPointerLeave={hoverClose}
                  onBlur={blurClose}
                >
                  <button
                    type="button"
                    data-menu-trigger={item.label}
                    aria-expanded={open === item.label}
                    aria-controls={`menu-${item.label.replace(/\W+/g, "-")}`}
                    onClick={() => setOpen((v) => (v === item.label ? null : item.label))}
                    className={cn(
                      navText,
                      "relative flex items-center gap-1.5 rounded-sm px-3 py-2",
                      open === item.label ? "text-green-700" : "text-navy-700 hover:text-green-700",
                    )}
                  >
                    {item.label}
                    <ChevronDown
                      aria-hidden="true"
                      size={15}
                      className={cn("transition-transform duration-200", open === item.label && "rotate-180")}
                    />
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute inset-x-3 -bottom-[1.4375rem] h-[2px] origin-left bg-green-500 transition-transform duration-300",
                        open === item.label ? "scale-x-100" : "scale-x-0",
                      )}
                    />
                  </button>
                  <AnimatePresence>
                    {open === item.label &&
                      (item.kind === "mega" ? (
                        <MegaMenu key="mega" group={item} onNavigate={close} />
                      ) : (
                        <Dropdown key="dd" group={item} onNavigate={close} />
                      ))}
                  </AnimatePresence>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ButtonLink to="/contact/business-enquiry" className="hidden sm:inline-flex">
            Discuss your project
          </ButtonLink>
          <button
            type="button"
            className="-mr-2 flex size-12 items-center justify-center rounded-sm text-navy-700 xl:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
          </button>
        </div>
      </div>

      <MobileNav open={mobileOpen} onClose={closeMobile} />
    </header>
  );
}

function MegaMenu({ group, onNavigate }: { group: MegaGroup; onNavigate: () => void }) {
  return (
    <m.div
      id={`menu-${group.label.replace(/\W+/g, "-")}`}
      {...panelMotion}
      className="absolute inset-x-0 top-full border-t border-line bg-white shadow-[var(--shadow-panel)]"
    >
      <div className="container-site grid grid-cols-12 gap-10 py-10">
        <div className="col-span-8">
          <div className="flex items-center justify-between border-b border-line pb-3">
            <p className="eyebrow text-muted">{group.heading}</p>
            <Link
              to={group.href}
              onClick={onNavigate}
              className="text-[0.75rem] font-semibold tracking-[0.06em] text-navy-600 uppercase hover:text-green-700"
            >
              View all
            </Link>
          </div>
          <ul className="mt-3 grid grid-cols-2 gap-x-8 gap-y-0.5">
            {group.items.map((s) => (
              <li key={s.slug}>
                <Link
                  to={s.href}
                  onClick={onNavigate}
                  className="group/mi -mx-3 flex items-start gap-3.5 rounded-sm px-3 py-3 transition-colors hover:bg-surface focus-visible:bg-surface"
                >
                  <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-sm border border-line text-navy-700 transition-colors group-hover/mi:border-green-500/40 group-hover/mi:text-green-700">
                    <ServiceIcon name={s.icon} size={18} />
                  </span>
                  <span>
                    <span className="block text-[0.9375rem] font-semibold text-navy-700">{s.title}</span>
                    <span className="mt-0.5 block text-[0.8125rem] leading-snug text-muted">{s.summary}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <aside className="col-span-4 flex flex-col rounded-sm bg-navy-950 bg-drawing-grid p-8 text-white">
          <p className="eyebrow text-green-400">{group.aside.eyebrow}</p>
          <p className="mt-4 font-display text-[1.375rem] leading-tight font-semibold tracking-[-0.02em]">{group.aside.title}</p>
          <p className="mt-3 text-[0.9375rem] text-mist">{group.aside.text}</p>
          <div className="mt-auto flex flex-col gap-3 pt-8">
            <ButtonLink to={group.aside.cta.href} arrow className="w-full">
              {group.aside.cta.label}
            </ButtonLink>
            {group.aside.secondary && (
              <Link
                to={group.aside.secondary.href}
                onClick={onNavigate}
                className="group/st flex items-center justify-between rounded-sm border border-white/15 px-4 py-3 text-[0.875rem] text-mist transition-colors hover:border-white/40 hover:text-white"
              >
                {group.aside.secondary.label}
                <ArrowRight aria-hidden="true" size={16} className="transition-transform group-hover/st:translate-x-1" />
              </Link>
            )}
          </div>
        </aside>
      </div>
    </m.div>
  );
}

function Dropdown({ group, onNavigate }: { group: DropdownGroup; onNavigate: () => void }) {
  return (
    <m.div
      id={`menu-${group.label.replace(/\W+/g, "-")}`}
      {...panelMotion}
      className="absolute top-full left-0 w-[21rem] rounded-b-sm border border-line bg-white p-3 shadow-[var(--shadow-panel)]"
    >
      <ul>
        {group.items.map((l) => (
          <li key={l.href}>
            <Link
              to={l.href}
              onClick={onNavigate}
              className="block rounded-sm px-4 py-3 transition-colors hover:bg-surface focus-visible:bg-surface"
            >
              <span className="block text-[0.9375rem] font-semibold text-navy-700">{l.label}</span>
              {l.description && <span className="mt-0.5 block text-[0.8125rem] text-muted">{l.description}</span>}
            </Link>
          </li>
        ))}
      </ul>
    </m.div>
  );
}
