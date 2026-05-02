import type { ReactNode } from "react";
import { MarketingLayout } from "@/components/MarketingLayout";
import { cn } from "@/lib/utils/cn";

function Section({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="space-y-2">
      <h2 className="font-serif text-lg font-semibold text-foreground">
        {title}
      </h2>
      <div className="space-y-2 text-sm leading-relaxed text-muted-foreground [&_strong]:font-semibold [&_strong]:text-foreground">
        {children}
      </div>
    </section>
  );
}

export function TermsOfServicePage() {
  return (
    <MarketingLayout
      mainClassName={cn(
        "mx-auto w-full max-w-2xl px-6 py-10 sm:px-8 sm:py-14",
      )}
    >
      <article className="space-y-8">
        <header className="space-y-2 border-b border-border pb-6">
          <h1 className="font-serif text-3xl font-normal tracking-tight text-foreground sm:text-4xl">
            Terms of Service
          </h1>
          <p className="text-sm text-muted-foreground">
            Last updated: May 3, 2026
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            These Terms govern your access to and use of the BugHyve marketing
            website (this site). Separate terms apply if you later use the BugHyve
            platform, wallets, blockchain features, or other products we offer.
          </p>
        </header>

        <div className="space-y-8">
          <Section title="Agreement">
            <p>
              By accessing this site or submitting information (including the
              waitlist form), you agree to these Terms. If you disagree, please do
              not use this site.
            </p>
          </Section>

          <Section title="What this site provides">
            <p>
              This website provides general information about BugHyve and a way to
              join a waitlist. Nothing on this site is a binding offer, guarantee
              of availability, or promise of rewards. Early access timelines and
              features may change without notice.
            </p>
          </Section>

          <Section title="Blockchain and Solana">
            <p>
              BugHyve&apos;s roadmap may involve Solana-based payments or escrows.
              <strong> Using digital assets carries risk.</strong> You are solely
              responsible for your wallets, seed phrases, and transactions. Past
              performance or descriptions on this marketing site do not predict
              future results. BugHyve is not responsible for losses due to wallet
              errors, smart contract exploits, validator issues, congestion, fees,
              or third-party wallets and tools.
            </p>
          </Section>

          <Section title="No professional advice">
            <p>
              Content here is informational, not legal, tax, or investment advice.
              Consult professionals before making financial or compliance decisions.
            </p>
          </Section>

          <Section title="Acceptable use">
            <ul className="list-disc space-y-1 ps-5">
              <li>Do not interfere with or probe the security of our systems</li>
              <li>Do not scrape, overload, or automate access in abusive ways</li>
              <li>Do not use the site for unlawful purposes or to harass others</li>
              <li>Do not impersonate BugHyve, our partners, or other users</li>
            </ul>
          </Section>

          <Section title="User content">
            <p>
              If you submit an email address or other content, you confirm you have
              the right to provide it and that it is accurate to the best of your
              knowledge.
            </p>
          </Section>

          <Section title="Third-party links">
            <p>
              This site may link to third parties (such as social networks). Their
              terms and privacy policies govern your use of their services.
            </p>
          </Section>

          <Section title="Disclaimer of warranties">
            <p>
              This site and its content are provided{" "}
              <strong>&quot;as is&quot;</strong> and{" "}
              <strong>&quot;as available&quot;</strong>. To the fullest extent
              permitted by law, BugHyve disclaims all warranties, whether express
              or implied, including merchantability, fitness for a particular
              purpose, and non-infringement.
            </p>
          </Section>

          <Section title="Limitation of liability">
            <p>
              To the fullest extent permitted by law, BugHyve and its affiliates,
              officers, and team will not be liable for indirect, incidental,
              special, consequential, or punitive damages, or for loss of profits,
              data, or goodwill arising from your use of this site. Our total
              liability for claims relating to this site is limited to the greater
              of (a) amounts you paid us for this site-specific access (if any) or
              (b) one hundred United States dollars.
            </p>
          </Section>

          <Section title="Indemnity">
            <p>
              You agree to defend and indemnify BugHyve against claims arising from
              your misuse of the site or violation of these Terms, to the extent
              permitted by law.
            </p>
          </Section>

          <Section title="Governing law">
            <p>
              These Terms are governed by the laws applicable in your primary place
              of contracting with BugHyve, excluding conflict-of-law rules. Courts in
              that jurisdiction generally have exclusive venue, unless applicable
              law requires otherwise for consumers.
            </p>
          </Section>

          <Section title="Changes">
            <p>
              We may revise these Terms. The updated version will be posted on this
              page with an updated effective date. Continued use after changes means
              you accept the revised Terms.
            </p>
          </Section>

          <Section title="Contact">
            <p>
              For questions about these Terms, contact BugHyve through{" "}
              <a
                href="https://x.com/bughyve"
                className="text-primary underline-offset-4 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                our official X (Twitter) account
              </a>
              .
            </p>
          </Section>
        </div>
      </article>
    </MarketingLayout>
  );
}
