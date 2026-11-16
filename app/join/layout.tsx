import type { Metadata } from "next";
import { ONBOARDING_LIVE } from "@/lib/onboarding";

export const metadata: Metadata = {
  title: "Join as a Professional — Jokkoo",
  description:
    "Build your professional profile on Jokkoo in about five minutes. Connect directly with customers across The Gambia on WhatsApp.",
  robots: ONBOARDING_LIVE ? undefined : { index: false, follow: false },
};

export default function JoinLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
