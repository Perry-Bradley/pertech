import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/page-header";
import { ContactForm } from "@/components/sections/contact-form";
import { FadeIn } from "@/components/animations/fade-in";
import {
  buildMetadata,
  getContactPageContent,
  getPageSeo,
  getSiteSettings,
} from "@/lib/data";

export async function generateMetadata(): Promise<Metadata> {
  const pageSeo = await getPageSeo("contact").catch(() => ({}));
  return buildMetadata({
    pageSeo,
    fallbackTitle: "Contact",
    fallbackDescription: "Start a project with Pertech. We reply within one business day.",
  });
}

export default async function ContactPage() {
  const [content, settings] = await Promise.all([
    getContactPageContent().catch(() => null),
    getSiteSettings().catch(() => ({
      contactEmail: "hello@pertech.studio",
      availability: "Available · Q3 2026",
    })),
  ]);

  const c = content ?? {
    eyebrow: "Contact",
    title: "Let's talk.",
    description: "A real human reads every inquiry. Tell us about your project — we'll come back within one business day.",
    newBusinessEmail: "new@pertech.studio",
    studioBlurb: "Remote-first.\nHubs in Lisbon, New York, Singapore.",
    pressEmail: "press@pertech.studio",
    services: [],
    budgets: [],
    submitLabel: "Send inquiry",
    footerNote: "We reply within one business day.",
  };

  return (
    <>
      <PageHeader eyebrow={c.eyebrow} title={c.title} description={c.description} />

      <section className="bg-background py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 md:grid-cols-12">
          <FadeIn className="md:col-span-7">
            <ContactForm
              serviceOptions={c.services}
              budgetOptions={c.budgets}
              submitLabel={c.submitLabel}
              footerNote={c.footerNote}
            />
          </FadeIn>

          <FadeIn delay={0.15} className="md:col-span-4 md:col-start-9 space-y-12">
            <div>
              <h4 className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-3">
                Email
              </h4>
              <a
                href={`mailto:${settings.contactEmail}`}
                className="font-display text-2xl md:text-3xl underline-offset-4 hover:underline"
              >
                {settings.contactEmail}
              </a>
            </div>

            {c.newBusinessEmail && (
              <div>
                <h4 className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-3">
                  New business
                </h4>
                <a
                  href={`mailto:${c.newBusinessEmail}`}
                  className="font-display text-2xl md:text-3xl underline-offset-4 hover:underline"
                >
                  {c.newBusinessEmail}
                </a>
              </div>
            )}

            {c.studioBlurb && (
              <div>
                <h4 className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-3">
                  Studio
                </h4>
                <p className="text-base whitespace-pre-line">{c.studioBlurb}</p>
              </div>
            )}

            <div>
              <h4 className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-3">
                Availability
              </h4>
              <p className="inline-flex items-center gap-2 text-base">
                <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                {settings.availability}
              </p>
            </div>

            {c.pressEmail && (
              <div>
                <h4 className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-3">
                  Press
                </h4>
                <a
                  href={`mailto:${c.pressEmail}`}
                  className="text-base underline-offset-4 hover:underline"
                >
                  {c.pressEmail}
                </a>
              </div>
            )}
          </FadeIn>
        </div>
      </section>
    </>
  );
}
