import type { Metadata } from "next";
import { ONBOARDING_LIVE } from "@/lib/onboarding";

export const metadata: Metadata = {
  title: "Sign in — Jokkoo",
  description: "Sign in to your Jokkoo account.",
  robots: ONBOARDING_LIVE ? undefined : { index: false, follow: false },
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
