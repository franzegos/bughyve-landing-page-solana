import { useCallback, useEffect, useState } from "react";
import { BackgroundTexture } from "@/components/BackgroundTexture";
import { getWaitlistUrl } from "@/lib/waitlistApi";
import { cn } from "@/lib/utils/cn";
import { Users } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import { toast } from "sonner";

const BUGHYVE_LOGO_SRC = "/bughyve-logo-transparent.svg";
const BUGHYVE_WORDMARK_SRC = "/bughyve-wordmark.jpeg";

type Role = "client" | "tester";

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function successCopy(role: Role) {
  return role === "client"
    ? "We'll reach out when early access opens for clients."
    : "We'll reach out when the first tester campaigns go live.";
}

function WaitlistCountBanner({
  client,
  tester,
}: {
  client: number;
  tester: number;
}) {
  const total = client + tester;
  return (
    <div
      className={cn(
        "mt-6 w-full max-w-2xl flex items-center justify-center gap-2.5 leading-snug text-muted-foreground sm:text-sm",
      )}
      aria-live="polite"
    >
      <Users
        className="size-4 shrink-0 text-primary/75 sm:size-[18px]"
        strokeWidth={2}
        aria-hidden
      />
      {total === 0 ? (
        <span>Be among the first on the waitlist.</span>
      ) : (
        <span>
          <span className="font-semibold tabular-nums text-foreground">
            {total.toLocaleString()}
          </span>{" "}
          {total === 1 ? "person has" : "people have"} joined the waitlist.
        </span>
      )}
    </div>
  );
}

export function WaitlistPage() {
  const [role, setRole] = useState<Role>("client");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [alreadyWhitelisted, setAlreadyWhitelisted] = useState(false);
  const [waitlistCounts, setWaitlistCounts] = useState<{
    client: number;
    tester: number;
  } | null>(null);

  const fetchWaitlistCounts = useCallback(async () => {
    const url = getWaitlistUrl();
    if (!url) return;
    try {
      const res = await fetch(url);
      const json = (await res.json()) as {
        success?: boolean;
        data?: { client?: unknown; tester?: unknown };
      };
      if (!res.ok || json.success !== true || !json.data) return;
      const client = Number(json.data.client);
      const tester = Number(json.data.tester);
      if (Number.isFinite(client) && Number.isFinite(tester)) {
        setWaitlistCounts({ client, tester });
      }
    } catch {
      /* ignore — social proof is optional */
    }
  }, []);

  useEffect(() => {
    void fetchWaitlistCounts();
  }, [fetchWaitlistCounts]);

  const submit = useCallback(async () => {
    const trimmed = email.trim();
    if (!validateEmail(trimmed)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    const waitlistUrl = getWaitlistUrl();
    if (!waitlistUrl) {
      toast.error(
        "Waitlist is not configured. Set VITE_API_URL for production.",
      );
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(waitlistUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed, role }),
      });

      const json = (await res.json().catch(() => ({}))) as {
        success?: boolean;
        message?: string;
        data?: { alreadyWhitelisted?: boolean };
      };

      if (!res.ok || json.success !== true) {
        const detail =
          typeof json.message === "string"
            ? json.message
            : "Something went wrong.";
        throw new Error(detail);
      }

      setAlreadyWhitelisted(Boolean(json.data?.alreadyWhitelisted));
      setSuccess(true);
      void fetchWaitlistCounts();
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }, [email, role, fetchWaitlistCounts]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Enter" || success || loading) return;
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "TEXTAREA" || t.isContentEditable)) return;
      void submit();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [submit, success, loading]);

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
            <a
              className="inline-flex shrink-0 items-center no-underline"
              href="/"
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
                className="w-auto h-3.5 ml-2"
                decoding="async"
              />
            </a>
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

        <main className="flex flex-col items-center justify-center px-6 py-16 text-center sm:py-20">
          <div
            className={cn(
              "mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-primary",
              "opacity-0 motion-reduce:opacity-100",
              "motion-safe:animate-[wl-fade-up_0.6s_ease_0.1s_forwards]",
            )}
          >
            <span className="h-px w-6 bg-primary" aria-hidden />
            Early Access
            <span className="h-px w-6 bg-primary" aria-hidden />
          </div>

          <h1
            className={cn(
              "mb-3 max-w-3xl font-serif text-4xl font-normal leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl",
              "opacity-0 motion-reduce:opacity-100",
              "motion-safe:animate-[wl-fade-up_0.7s_ease_0.2s_forwards]",
            )}
          >
            AI helps you ship faster.
            <br />
            <em className="italic">
              Don&apos;t ship <span className="text-primary">broken</span>.
            </em>
          </h1>

          <p
            className={cn(
              "mx-auto mb-8 max-w-lg text-sm font-normal text-muted-foreground sm:text-lg",
              "opacity-0 motion-reduce:opacity-100",
              "motion-safe:animate-[wl-fade-up_0.7s_ease_0.35s_forwards]",
            )}
          >
            Run a campaign. Get real people testing your product. Pay only for
            valid findings — settled instantly on Solana.
          </p>

          <div
            className={cn(
              "w-full max-w-2xl border border-border p-5 sm:p-10",
              "opacity-0 motion-reduce:opacity-100",
              "motion-safe:animate-[wl-fade-up_0.7s_ease_0.42s_forwards]",
            )}
          >
            {!success ? (
              <div>
                <p className="mb-4 text-left text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  I want to join as a
                </p>

                <div
                  className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-2"
                  role="group"
                  aria-label="Join as"
                >
                  <button
                    type="button"
                    className={cn(
                      "hover:cursor-pointer relative flex min-h-0 flex-col items-start justify-start gap-1 self-stretch border p-4 pr-10 text-left font-[inherit] transition-colors",
                      role === "client"
                        ? "border-primary/35 bg-primary/[0.07] shadow-sm"
                        : "border-border bg-transparent hover:border-muted-foreground/40",
                    )}
                    onClick={() => setRole("client")}
                    aria-pressed={role === "client"}
                  >
                    <span className="block text-sm font-bold tracking-wide text-foreground">
                      Client
                    </span>
                    <span className="block text-xs leading-snug text-muted-foreground">
                      Keep improving your product by collecting bugs and
                      feedback from real users.
                    </span>
                    <span
                      className={cn(
                        "absolute right-3 top-3 flex size-5 items-center justify-center rounded-full border-2 transition-colors",
                        role === "client"
                          ? "border-primary bg-background"
                          : "border-border bg-transparent",
                      )}
                      aria-hidden
                    >
                      <span
                        className={cn(
                          "size-1.5 rounded-full bg-primary transition-opacity",
                          role === "client" ? "opacity-100" : "opacity-0",
                        )}
                      />
                    </span>
                  </button>

                  <button
                    type="button"
                    className={cn(
                      "hover:cursor-pointer relative flex min-h-0 flex-col items-start justify-start gap-1 self-stretch border p-4 pr-10 text-left font-[inherit] transition-colors",
                      role === "tester"
                        ? "border-primary/35 bg-primary/[0.07] shadow-sm"
                        : "border-border bg-transparent hover:border-muted-foreground/40",
                    )}
                    onClick={() => setRole("tester")}
                    aria-pressed={role === "tester"}
                  >
                    <span className="block text-sm font-bold tracking-wide text-foreground">
                      Tester
                    </span>
                    <span className="block text-xs leading-snug text-muted-foreground">
                      Help teams improve their products and earn for your
                      contributions.
                    </span>
                    <span
                      className={cn(
                        "absolute right-3 top-3 flex size-5 items-center justify-center rounded-full border-2 transition-colors",
                        role === "tester"
                          ? "border-primary bg-background"
                          : "border-border bg-transparent",
                      )}
                      aria-hidden
                    >
                      <span
                        className={cn(
                          "size-1.5 rounded-full bg-primary transition-opacity",
                          role === "tester" ? "opacity-100" : "opacity-0",
                        )}
                      />
                    </span>
                  </button>
                </div>

                <div className="relative mb-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    autoComplete="email"
                    inputMode="email"
                    className={cn(
                      "w-full border border-border bg-muted px-4 py-3.5 font-sans text-sm text-foreground",
                      "placeholder:text-muted-foreground/70 focus:border-border focus:outline-none focus-visible:outline-none",
                    )}
                  />
                </div>

                <button
                  type="button"
                  disabled={loading}
                  onClick={() => void submit()}
                  className={cn(
                    "relative w-full cursor-pointer overflow-hidden border-none py-3.5",
                    "bg-primary/88 font-sans text-sm font-bold tracking-wide text-primary-foreground",
                    "transition-[background-color,transform] hover:bg-primary active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 disabled:active:scale-100",
                  )}
                >
                  <span
                    className={cn("transition-opacity", loading && "opacity-0")}
                  >
                    Join the Waitlist
                  </span>
                  <span
                    className={cn(
                      "pointer-events-none absolute inset-0 flex items-center justify-center transition-opacity",
                      loading ? "opacity-100" : "opacity-0",
                    )}
                    aria-hidden
                  >
                    <span className="size-5 shrink-0 animate-spin rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground" />
                  </span>
                </button>

                <p className="mt-4 text-sm leading-snug text-muted-foreground">
                  No spam. You&apos;ll hear from us when early access opens.
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3 py-2">
                <div className="flex size-12 items-center justify-center rounded-full border border-green-300 bg-green-50 motion-safe:animate-[wl-pop-in_0.4s_cubic-bezier(0.34,1.56,0.64,1)_forwards]">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-green-600"
                    aria-hidden
                  >
                    <polyline points="4 10 8 14 16 6" />
                  </svg>
                </div>
                <p className="m-0 font-serif text-2xl text-foreground">
                  {alreadyWhitelisted
                    ? "You're already whitelisted."
                    : "You're on the list."}
                </p>
                <p className="m-0 text-center text-sm leading-relaxed text-muted-foreground">
                  {alreadyWhitelisted
                    ? "This email is already on the waitlist. No need to sign up again."
                    : successCopy(role)}
                </p>
              </div>
            )}
          </div>
          {waitlistCounts !== null ? (
            <WaitlistCountBanner
              client={waitlistCounts.client}
              tester={waitlistCounts.tester}
            />
          ) : null}
        </main>

        <footer className="border-t border-border px-6 py-5 text-center sm:px-12 sm:py-6">
          <p className="text-xs text-muted-foreground">
            © 2026 BugHyve. All Rights Reserved.
          </p>
        </footer>
      </div>
    </div>
  );
}
