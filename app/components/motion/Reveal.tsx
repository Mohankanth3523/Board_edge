import { m } from "motion/react";

/**
 * Scroll reveal: a short fade-and-rise, played once. Disabled automatically
 * under prefers-reduced-motion (MotionConfig reducedMotion="user" in root).
 * Only opacity and transform are animated, so it stays on the compositor.
 *
 * `data-reveal` opts the element into the CSS safety net in app.css: if the
 * page has not hydrated within ~2.5s (slow or failed JavaScript), the content
 * is revealed anyway, and with JavaScript disabled it is never hidden.
 */
const EASE = [0.22, 1, 0.36, 1] as const;

export function Reveal({
  children,
  delay = 0,
  y = 14,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "li" | "article";
}) {
  const Cmp = as === "li" ? m.li : as === "article" ? m.article : m.div;
  return (
    <Cmp
      data-reveal=""
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: EASE }}
    >
      {children}
    </Cmp>
  );
}

/** Horizontal line that draws in from the left (process timeline, rules). */
export function DrawLine({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <m.span
      data-reveal=""
      aria-hidden="true"
      className={className}
      style={{ transformOrigin: "left center" }}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 1.1, delay, ease: EASE }}
    />
  );
}
