import type { Metadata } from "next";
import { ONBOARDING_LIVE } from "@/lib/onboarding";

export const metadata: Metadata = {
  title: "Create an account — Jokkoo",
  description: "Create an account on Jokkoo. You can browse and contact professionals without an account.",
  robots: ONBOARDING_LIVE ? undefined : { index: false, follow: false },
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
