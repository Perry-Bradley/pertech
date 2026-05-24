import { Footer } from "./footer";
import { getServices, getSiteSettings } from "@/lib/data";

export async function ServerFooter() {
  try {
    const [services, settings] = await Promise.all([
      getServices(),
      getSiteSettings(),
    ]);
    return (
      <Footer
        services={services.map((s) => ({ slug: s.slug, name: s.name }))}
        social={settings.social}
        availability={settings.availability}
        contactEmail={settings.contactEmail}
      />
    );
  } catch {
    // If Payload isn't ready yet (e.g. first boot), fall back to defaults.
    return <Footer />;
  }
}
