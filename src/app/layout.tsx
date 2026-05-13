import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tahrin Jahan Ayat — Child Artist Portfolio",
  description:
    "A bright, expressive young performer bringing Bengali poetry, traditional fables, and joyful dance to every stage.",
  icons: {
    icon: "/images/hero.png",
    apple: "/images/hero.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Caprasimo&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Caveat:wght@500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
