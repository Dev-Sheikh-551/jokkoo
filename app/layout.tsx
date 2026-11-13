import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Newsreader } from "next/font/google";
import MotionProvider from "@/components/providers/MotionProvider";
import { MockDataPill } from "@/components/common/MockDataPill";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: "variable",
  style: ["normal", "italic"],
  display: "swap",
  axes: ["opsz"],
});

export const metadata: Metadata = {
  title: "Jokkoo — Skilled Professionals & Services in The Gambia",
  description:
    "Connect with independent artisans and established service businesses across The Gambia. Direct contact and transparent profiles.",
};

export const viewport: Viewport = {
  themeColor: "#FBF9F5",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${newsreader.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-warm-bone text-deep-slate font-sans selection:bg-laterite-light selection:text-laterite">
        <MotionProvider>
          {children}
          <MockDataPill />
        </MotionProvider>
      </body>
    </html>
  );
}
