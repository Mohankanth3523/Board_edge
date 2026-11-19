import { Image as ImageIcon } from "lucide-react";
import { site } from "~/config/site";
import type { Photo as PhotoData } from "~/content/images";
import { cn } from "~/lib/cn";
import { Photo } from "./Photo";

const aspects = {
  "4/3": "aspect-[4/3]",
  "3/2": "aspect-[3/2]",
  "16/10": "aspect-[16/10]",
  "1/1": "aspect-square",
  "4/5": "aspect-[4/5]",
} as const;

/**
 * Fixed-ratio image slot with a gentle zoom when inside a `group/media`
 * parent. Reference (stock) photography always carries a visible
 * "Reference image" label so it can never be mistaken for company work.
 * With no photo: a labelled placeholder in design previews, nothing in production.
 */
export function MediaFrame({
  photo,
  placeholder,
  ratio = "4/3",
  sizes,
  dark = false,
  label = true,
  className,
}: {
  photo?: PhotoData | null;
  placeholder?: string;
  ratio?: keyof typeof aspects;
  sizes?: string;
  dark?: boolean;
  /** Show the "Reference image" tag on stock photography. */
  label?: boolean;
  className?: string;
}) {
  if (photo) {
    return (
      <div className={cn("relative overflow-hidden rounded-sm bg-navy-800", aspects[ratio], className)}>
        <Photo
          photo={photo}
          sizes={sizes}
          className="transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover/media:scale-[1.03]"
        />
        {label && photo.source === "reference" && (
          <span className="eyebrow absolute top-3 left-3 rounded-xs bg-navy-950/80 px-2 py-1 text-[0.625rem] text-white">Reference image</span>
        )}
      </div>
    );
  }

  if (!site.preview.showImagePlaceholders || !placeholder) return null;

  return (
    <div
      role="img"
      aria-label={`Image placeholder: ${placeholder}`}
      className={cn(
        "relative flex flex-col justify-end overflow-hidden rounded-sm p-5",
        dark ? "bg-navy-800 bg-drawing-grid" : "bg-surface-2 bg-drawing-grid-light",
        aspects[ratio],
        className,
      )}
    >
      <div className={cn("flex items-start gap-2.5", dark ? "text-mist" : "text-muted")}>
        <ImageIcon aria-hidden="true" size={16} className="mt-0.5 shrink-0" />
        <div>
          <p className="eyebrow">Photography slot</p>
          <p className="mt-1 text-[0.8125rem] leading-snug">{placeholder}</p>
        </div>
      </div>
    </div>
  );
}
