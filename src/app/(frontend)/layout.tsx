import type { Metadata } from "next";
import { Inter, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "../globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navigation/navbar";
import { ServerFooter } from "@/components/sections/server-footer";
import { SmoothCursor } from "@/components/animations/smooth-cursor";
import { ScrollProgress } from "@/components/animations/scroll-progress";
import { getSiteSettings } from "@/lib/data";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const serif = Instrument_Serif({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  try {
    const settings = await getSiteSettings();
    return {
      title: {
        default: settings.defaultTitle,
        template: settings.titleTemplate,
      },
      description: settings.defaultDescription,
      keywords: settings.defaultKeywords
        ? settings.defaultKeywords.split(",").map((k) => k.trim())
        : undefined,
      metadataBase: new URL(settings.siteUrl),
      openGraph: {
        title: settings.defaultTitle,
        description: settings.defaultDescription,
        type: "website",
        images: settings.defaultOgImage ? [{ url: settings.defaultOgImage }] : undefined,
      },
      twitter: {
        card: "summary_large_image",
        title: settings.defaultTitle,
        description: settings.defaultDescription,
      },
    };
  } catch {
    return {
      title: "Pertech",
      description: "Digital Studio for Ambitious Brands",
    };
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${serif.variable} ${mono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ScrollProgress />
          <SmoothCursor />
          <div className="relative flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <ServerFooter />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
