import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Public_Sans } from "next/font/google";

import { getSiteSettings } from "@/lib/cms/queries";
import { getRobotsDirectives, isProductionDeployment } from "@/lib/seo";
import "./globals.css";

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();

  return {
    metadataBase: new URL(settings.siteUrl),
    title: {
      default: settings.name,
      template: `%s | ${settings.name}`,
    },
    description: settings.intro,
    alternates: {
      canonical: "/",
    },
    manifest: "/site.webmanifest",
    openGraph: {
      type: "website",
      url: settings.siteUrl,
      title: settings.name,
      description: settings.intro,
      siteName: settings.name,
      images: [settings.defaultOgImageUrl],
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: settings.name,
      description: settings.intro,
      images: [settings.defaultOgImageUrl],
    },
    robots: getRobotsDirectives(),
    icons: {
      icon: [
        { url: "/favicon.ico" },
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      ],
      shortcut: "/favicon.ico",
      apple: "/apple-touch-icon.png",
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <body className={`${publicSans.variable} antialiased`}>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (() => {
                const stored = localStorage.getItem("stanley-theme");
                const theme = stored === "light" || stored === "dark"
                  ? stored
                  : (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
                document.documentElement.setAttribute("data-theme", theme);
              })();
            `,
          }}
        />
        {isProductionDeployment ? <GoogleAnalytics gaId="G-304QB36Y7B" /> : null}
        {children}
      </body>
    </html>
  );
}
