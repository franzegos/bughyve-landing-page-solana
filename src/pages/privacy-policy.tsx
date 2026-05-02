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

export function PrivacyPolicyPage() {
  return (
    <MarketingLayout
      mainClassName={cn(
        "mx-auto w-full max-w-2xl px-6 py-10 sm:px-8 sm:py-14",
      )}
    >
      <article className="space-y-8">
        <header className="space-y-2 border-b border-border pb-6">
          <h1 className="font-serif text-3xl font-normal tracking-tight text-foreground sm:text-4xl">
            Privacy Policy
          </h1>
          <p className="text-sm text-muted-foreground">
            Last updated: May 3, 2026
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            This policy describes how BugHyve collects and uses personal
            information when you visit this website or join our waitlist. If you
            use our products or services elsewhere, additional notices may apply.
          </p>
        </header>

        <div className="space-y-8">
          <Section title="Information we collect">
            <p>
              <strong>Waitlist:</strong> If you submit your email address, we store
              it to contact you about early access and product updates. You may
              also tell us whether you are interested as a client or tester so we
              can tailor outreach.
            </p>
            <p>
              <strong>Automatically collected:</strong> Like most sites, our
              hosting and analytics tools may collect technical information such
              as approximate location (derived from IP), device and browser type,
              and pages viewed. We use this to operate and improve the website.
            </p>
          </Section>

          <Section title="How we use information">
            <ul className="list-disc space-y-1 ps-5">
              <li>To operate the waitlist and respond to you</li>
              <li>To send service-related emails (you can unsubscribe where applicable)</li>
              <li>To measure site performance and fix issues</li>
              <li>To comply with law and protect our rights and users</li>
            </ul>
          </Section>

          <Section title="Analytics">
            <p>
              We may use privacy-friendly analytics (for example{" "}
              <a
                href="https://vercel.com/docs/analytics/privacy-policy"
                className="text-primary underline-offset-4 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Vercel Analytics
              </a>
              ) to understand aggregated traffic patterns. Analytics data is not
              used to sell advertising profiles from this landing page alone.
            </p>
          </Section>

          <Section title="Sharing">
            <p>
              We use service providers (such as hosting, email delivery, and
              analytics vendors) who process data on our instructions. We do not
              sell your personal information. We may share information if required
              by law or to protect BugHyve and our users.
            </p>
          </Section>

          <Section title="Retention">
            <p>
              We retain waitlist emails until you unsubscribe or ask us to delete
              them, or as needed for legitimate business purposes. Technical logs
              may be retained for a limited period for security and reliability.
            </p>
          </Section>

          <Section title="Your choices">
            <p>
              Depending on where you live, you may have rights to access, correct,
              or delete certain personal information, or to object to some
              processing. Contact us to make a request. We will respond consistent
              with applicable law.
            </p>
          </Section>

          <Section title="Security">
            <p>
              We use reasonable administrative and technical measures to protect
              information. No method of transmission over the internet is perfectly
              secure.
            </p>
          </Section>

          <Section title="Children">
            <p>
              This site is not directed to children under 13, and we do not knowingly
              collect personal information from children under 13.
            </p>
          </Section>

          <Section title="Changes">
            <p>
              We may update this policy from time to time. When we do, we will post
              the revised policy on this page and update the “Last updated” date.
            </p>
          </Section>

          <Section title="Contact">
            <p>
              Questions about privacy? Reach us via the BugHyve team through the
              contact channels linked from{" "}
              <a
                href="https://x.com/bughyve"
                className="text-primary underline-offset-4 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                our official X (Twitter) account
              </a>
              {" "}
              or the email address displayed in our app or onboarding materials once
              available.
            </p>
          </Section>
        </div>
      </article>
    </MarketingLayout>
  );
}
