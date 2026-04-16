import { cn } from "@/lib/utils/cn";

/**
 * Inline SVG grain (data-URL filters often fail in Safari) plus a faint dot grid
 * so the waitlist background reads less flat.
 */
export function BackgroundTexture() {
  return (
    <div
      className="bh-bg-texture pointer-events-none absolute inset-0 z-1 overflow-hidden"
      aria-hidden
    >
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.11] mix-blend-multiply dark:opacity-[0.2] dark:mix-blend-soft-light"
        preserveAspectRatio="none"
      >
        <defs>
          <filter id="bh-noise-grain" x="0" y="0" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.7"
              numOctaves="3"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
        </defs>
        <rect width="100%" height="100%" filter="url(#bh-noise-grain)" />
      </svg>
      <div
        className={cn(
          "absolute inset-0 bg-size-[22px_22px]",
          "bg-[radial-gradient(circle_at_center,rgb(0_0_0/0.07)_1px,transparent_1px)] mix-blend-multiply",
          "dark:bg-[radial-gradient(circle_at_center,rgb(255_255_255/0.09)_1px,transparent_1px)] dark:mix-blend-soft-light",
        )}
      />
    </div>
  );
}
