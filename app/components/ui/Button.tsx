import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { cn } from "~/lib/cn";

type Variant = "primary" | "secondary" | "secondary-dark" | "navy" | "light" | "ghost" | "ghost-dark";
type Size = "md" | "lg";

const base =
  "group/btn relative inline-flex max-w-full items-center justify-center gap-2.5 rounded-sm text-center sm:whitespace-nowrap font-semibold uppercase tracking-[0.08em] transition-[background-color,color,border-color,box-shadow,transform] duration-200 ease-[var(--ease-standard)] focus-visible:outline-2 focus-visible:outline-offset-2 active:translate-y-px disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  /** Signal green — the one primary action per view. */
  primary: "bg-green-500 text-navy-950 hover:bg-green-400 focus-visible:outline-green-500",
  /** Outline on light backgrounds. */
  secondary: "border border-navy-700/25 bg-white text-navy-700 hover:border-navy-700 hover:bg-navy-50",
  /** Outline on navy backgrounds. */
  "secondary-dark": "border border-white/25 text-white hover:border-white hover:bg-white/5",
  /** Solid navy — strong action on light surfaces. */
  navy: "bg-navy-900 text-white hover:bg-navy-700",
  /** Solid white — equal-weight second action on navy. */
  light: "bg-white text-navy-950 hover:bg-navy-50",
  /** Text-style link with arrow. */
  ghost: "px-0 text-navy-700 hover:text-green-700",
  "ghost-dark": "px-0 text-white hover:text-green-400",
};

const sizes: Record<Size, string> = {
  md: "min-h-11 px-5 py-2.5 text-[0.75rem] leading-tight",
  lg: "min-h-13 px-6 py-3 text-[0.8125rem] leading-tight sm:px-7",
};

interface ButtonProps {
  to: string;
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  className?: string;
}

/** Link styled as a button. All site CTAs are navigations, so this renders <a>. */
export function ButtonLink({ to, children, variant = "primary", size = "md", arrow = false, className }: ButtonProps) {
  const isGhost = variant === "ghost" || variant === "ghost-dark";
  return (
    <Link to={to} className={cn(base, variants[variant], !isGhost && sizes[size], isGhost && "min-h-11 text-[0.75rem]", className)}>
      <span>{children}</span>
      {(arrow || isGhost) && (
        <ArrowRight
          aria-hidden="true"
          size={16}
          strokeWidth={2}
          className="shrink-0 transition-transform duration-200 ease-[var(--ease-standard)] group-hover/btn:translate-x-1"
        />
      )}
    </Link>
  );
}

/** Native button with the same visual language (forms, toggles). */
export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  ...rest
}: Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className"> & {
  variant?: Variant;
  size?: Size;
  className?: string;
}) {
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      {children}
    </button>
  );
}
