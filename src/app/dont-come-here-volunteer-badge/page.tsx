import type { Metadata } from "next";
import VolunteerGate from "./VolunteerGate";

export const metadata: Metadata = {
  title: "Volunteer badge | AWS Community Day Surat 2026",
  description: "Create your AWS Community Day Surat volunteer badge.",
  robots: { index: false, follow: false, noimageindex: true },
  alternates: { canonical: "/dont-come-here-volunteer-badge" },
};

export default function VolunteerBadgePage() {
  return <VolunteerGate />;
}
