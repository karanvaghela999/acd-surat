import type { Metadata } from "next";
import BadgeStudio from "./BadgeStudio";

export const metadata: Metadata = {
  title: "Create your attendee badge | AWS Community Day Surat 2026",
  description: "Put yourself in the picture. Create, download and share your AWS Community Day Surat attendee badge.",
  alternates: { canonical: "/badge" },
  openGraph: { title: "I'm attending AWS Community Day Surat 2026", url: "/badge" },
};

export default function BadgePage() {
  return <BadgeStudio />;
}
