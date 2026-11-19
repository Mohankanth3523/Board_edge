import { useId } from "react";
import { ChevronDown, CircleAlert, CircleCheck, Info, TriangleAlert } from "lucide-react";
import { cn } from "~/lib/cn";

/*
 * Form primitives (visual layer). Validation with React Hook Form + Zod is
 * wired in Phase 6; these components already accept `error` and `hint` and
 * link them to the control with aria-describedby.
 */

const control =
  "block w-full rounded-sm border bg-white px-4 text-[1rem] text-ink placeholder:text-subtle transition-[border-color,box-shadow] duration-150 focus:outline-none focus:ring-4 disabled:cursor-not-allowed disabled:bg-surface";
const okState = "border-line-strong hover:border-navy-600/50 focus:border-navy-600 focus:ring-navy-600/12";
const errState = "border-red-600 focus:border-red-600 focus:ring-red-600/12";

interface FieldShellProps {
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  className?: string;
  children: (ids: { id: string; describedBy?: string; invalid: boolean }) => React.ReactNode;
}

export function FieldShell({ label, required, hint, error, className, children }: FieldShellProps) {
  const id = useId();
  const hintId = hint ? `${id}-hint` : undefined;
  const errId = error ? `${id}-err` : undefined;
  const describedBy = [hintId, errId].filter(Boolean).join(" ") || undefined;
  return (
    <div className={className}>
      <label htmlFor={id} className="flex items-baseline gap-1 text-[0.875rem] font-semibold text-navy-700">
        {label}
        {required ? (
          <span aria-hidden="true" className="text-green-700">
            *
          </span>
        ) : (
          <span className="ml-1 text-[0.8125rem] font-normal text-muted">(optional)</span>
        )}
      </label>
      {hint && (
        <p id={hintId} className="mt-1 text-[0.8125rem] text-muted">
          {hint}
        </p>
      )}
      <div className="mt-2">{children({ id, describedBy, invalid: Boolean(error) })}</div>
      {error && (
        <p id={errId} className="mt-2 flex items-center gap-1.5 text-[0.8125rem] font-medium text-red-700">
          <CircleAlert aria-hidden="true" size={14} />
          {error}
        </p>
      )}
    </div>
  );
}

type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "className"> & {
  label: string;
  hint?: string;
  error?: string;
  className?: string;
};

export function TextField({ label, hint, error, required, className, ...rest }: InputProps) {
  return (
    <FieldShell label={label} hint={hint} error={error} required={required} className={className}>
      {({ id, describedBy, invalid }) => (
        <input
          id={id}
          required={required}
          aria-invalid={invalid || undefined}
          aria-describedby={describedBy}
          className={cn(control, "h-12", invalid ? errState : okState)}
          {...rest}
        />
      )}
    </FieldShell>
  );
}

type SelectProps = Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "className"> & {
  label: string;
  hint?: string;
  error?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
  className?: string;
};

export function SelectField({ label, hint, error, required, options, placeholder = "Select…", className, ...rest }: SelectProps) {
  return (
    <FieldShell label={label} hint={hint} error={error} required={required} className={className}>
      {({ id, describedBy, invalid }) => (
        <div className="relative">
          <select
            id={id}
            required={required}
            aria-invalid={invalid || undefined}
            aria-describedby={describedBy}
            defaultValue=""
            className={cn(control, "h-12 appearance-none pr-11", invalid ? errState : okState)}
            {...rest}
          >
            <option value="" disabled>
              {placeholder}
            </option>
            {options.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <ChevronDown aria-hidden="true" size={18} className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-muted" />
        </div>
      )}
    </FieldShell>
  );
}

type TextareaProps = Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "className"> & {
  label: string;
  hint?: string;
  error?: string;
  className?: string;
};

export function TextareaField({ label, hint, error, required, className, rows = 5, ...rest }: TextareaProps) {
  return (
    <FieldShell label={label} hint={hint} error={error} required={required} className={className}>
      {({ id, describedBy, invalid }) => (
        <textarea
          id={id}
          rows={rows}
          required={required}
          aria-invalid={invalid || undefined}
          aria-describedby={describedBy}
          className={cn(control, "resize-y py-3 leading-relaxed", invalid ? errState : okState)}
          {...rest}
        />
      )}
    </FieldShell>
  );
}

export function CheckboxField({ label, error, ...rest }: Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> & { label: React.ReactNode; error?: string }) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="flex cursor-pointer items-start gap-3 text-[0.9375rem] text-ink">
        <input
          id={id}
          type="checkbox"
          aria-invalid={error ? true : undefined}
          className="mt-0.5 size-5 shrink-0 cursor-pointer rounded-xs border-line-strong accent-green-600"
          {...rest}
        />
        <span>{label}</span>
      </label>
      {error && <p className="mt-2 ml-8 text-[0.8125rem] font-medium text-red-700">{error}</p>}
    </div>
  );
}

type AlertTone = "info" | "success" | "warning" | "error";
const alertTones: Record<AlertTone, { cls: string; Icon: typeof Info }> = {
  info: { cls: "border-blue-600/30 bg-blue-50 text-navy-700", Icon: Info },
  success: { cls: "border-green-600/30 bg-green-50 text-navy-700", Icon: CircleCheck },
  warning: { cls: "border-amber-500/40 bg-amber-50 text-navy-700", Icon: TriangleAlert },
  error: { cls: "border-red-600/30 bg-red-50 text-navy-700", Icon: CircleAlert },
};

/** Form status / notice. role="status" (polite) or "alert" for errors. */
export function Alert({ tone = "info", title, children }: { tone?: AlertTone; title: string; children?: React.ReactNode }) {
  const { cls, Icon } = alertTones[tone];
  return (
    <div role={tone === "error" ? "alert" : "status"} className={cn("flex gap-3 rounded-sm border p-4", cls)}>
      <Icon aria-hidden="true" size={20} className="mt-0.5 shrink-0" />
      <div>
        <p className="font-semibold">{title}</p>
        {children && <div className="mt-1 text-[0.9375rem] text-muted">{children}</div>}
      </div>
    </div>
  );
}
