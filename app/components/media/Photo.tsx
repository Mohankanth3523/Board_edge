import { photoSrcSet, photoUrl, type Photo as PhotoData } from "~/content/images";
import { cn } from "~/lib/cn";

/**
 * Responsive <img> with srcset, explicit dimensions (no layout shift),
 * lazy loading by default and object-cover cropping.
 */
export function Photo({
  photo,
  sizes = "100vw",
  priority = false,
  className,
}: {
  photo: PhotoData;
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <img
      src={photoUrl(photo, 1080)}
      srcSet={photoSrcSet(photo)}
      sizes={sizes}
      alt={photo.alt}
      width={photo.width}
      height={photo.height}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding={priority ? "sync" : "async"}
      style={photo.position ? { objectPosition: photo.position } : undefined}
      className={cn("size-full object-cover", className)}
    />
  );
}
