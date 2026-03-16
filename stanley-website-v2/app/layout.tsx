import type { Metadata } from "next";
import { Public_Sans } from "next/font/google";

import "./globals.css";

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Stanley Lin",
  description: "Product team lead building medical and software products.",
  manifest: "/site.webmanifest",
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
                const storageKey = "stanley-theme";
                const stored = localStorage.getItem("stanley-theme");
                const theme = stored === "light" || stored === "dark"
                  ? stored
                  : (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
                document.documentElement.setAttribute("data-theme", theme);
              })();
            `,
          }}
        />
        {children}
      </body>
    </html>
  );
}
