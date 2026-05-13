import type { Metadata } from "next";
import { Caprasimo, Plus_Jakarta_Sans, Caveat } from "next/font/google";
import "./globals.css";

const caprasimo = Caprasimo({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const caveat = Caveat({
  weight: ["500", "600"],
  subsets: ["latin"],
  variable: "--font-hand",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tahrin Jahan Ayat — Child Artist Portfolio",
  description:
    "A bright, expressive young performer bringing Bengali poetry, traditional fables, and joyful dance to every stage.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${caprasimo.variable} ${plusJakartaSans.variable} ${caveat.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
