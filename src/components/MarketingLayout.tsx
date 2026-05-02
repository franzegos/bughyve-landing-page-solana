import type { ReactNode } from "react";
import { BackgroundTexture } from "@/components/BackgroundTexture";
import { cn } from "@/lib/utils/cn";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

const BUGHYVE_LOGO_SRC = "/bughyve-logo-transparent.svg";
const BUGHYVE_WORDMARK_SRC = "/bughyve-wordmark.jpeg";

type MarketingLayoutProps = {
  children: ReactNode;
  /** Additional classes on the `<main>` element */
  mainClassName?: string;
};

export function MarketingLayout({
  children,
  mainClassName,
}: MarketingLayoutProps) {
  return (
    <div
      className={cn(
        "relative isolate min-h-screen overflow-x-hidden",
        "bg-background font-sans text-base leading-relaxed text-foreground antialiased",
      )}
    >
      <BackgroundTexture />
      <div className="relative z-2 grid min-h-screen grid-rows-[auto_1fr_auto]">
        <header className="flex items-center justify-between border-b border-border px-6 py-4 sm:px-12 sm:py-2">
          <div className="flex items-center gap-2">
            <Link
              className="inline-flex shrink-0 items-center no-underline"
              to="/"
            >
              <img
                src={BUGHYVE_LOGO_SRC}
                alt="BugHyve"
                className="h-10 w-auto sm:h-14"
                decoding="async"
              />
              <img
                src={BUGHYVE_WORDMARK_SRC}
                alt="BugHyve"
                className="ml-2 h-3.5 w-auto"
                decoding="async"
              />
            </Link>
          </div>
          <a
            href="https://x.com/bughyve"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground transition-opacity hover:opacity-70"
            aria-label="BugHyve on X"
          >
            <FaXTwitter className="size-6" strokeWidth={2} aria-hidden />
          </a>
        </header>

        <main className={cn(mainClassName)}>{children}</main>

        <footer className="border-t border-border px-6 py-5 sm:px-12 sm:py-6">
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-6">
            <p className="m-0 text-center text-xs text-muted-foreground">
              © 2026 BugHyve. All Rights Reserved.
            </p>
            <nav
              className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs"
              aria-label="Legal"
            >
              <Link
                className="text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
                to="/privacy-policy"
              >
                Privacy Policy
              </Link>
              <Link
                className="text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
                to="/terms-of-service"
              >
                Terms of Service
              </Link>
            </nav>
          </div>
        </footer>
      </div>
    </div>
  );
}
