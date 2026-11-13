import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Join as a Professional — Jokkoo",
  description:
    "Build your professional profile on Jokkoo in about five minutes. Connect directly with customers across The Gambia on WhatsApp.",
};

export default function JoinLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
