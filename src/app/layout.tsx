import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ScrollToTop from "@/components/ScrollToTop";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AWS Community Day Surat 2026",
  description:
    "Join developers and builders for a day of technical talks, hands-on learning, and connections. Learn from AWS experts and peers shaping the future of cloud, AI, and DevOps.",
  keywords: [
    "AWS",
    "Community Day",
    "Surat",
    "Cloud Computing",
    "DevOps",
    "AI",
    "Conference",
    "2026",
  ],
  authors: [{ name: "AWS User Group Surat" }],
  metadataBase: new URL("https://acd26.awsugsurat.com"),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "AWS Community Day Surat 2026",
    description:
      "Join developers and builders for a day of technical talks, hands-on learning, and connections. Learn from AWS experts and peers shaping the future of cloud, AI, and DevOps.",
    url: "https://acd26.awsugsurat.com",
    siteName: "AWS Community Day Surat 2026",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/hero-image.png",
        width: 1200,
        height: 630,
        alt: "AWS Community Day Surat 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AWS Community Day Surat 2026",
    description:
      "Join developers and builders for a day of technical talks, hands-on learning, and connections.",
    images: ["/hero-image.png"],
  },
};

const jsonLdEvent = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "AWS Community Day Surat 2026",
  description:
    "Join developers and builders for a day of technical talks, hands-on learning, and connections. Learn from AWS experts and peers shaping the future of cloud, AI, and DevOps.",
  startDate: "2026-09-12",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  eventStatus: "https://schema.org/EventScheduled",
  location: {
    "@type": "Place",
    name: "Surat, Gujarat, India",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Surat",
      addressRegion: "Gujarat",
      addressCountry: "India",
    },
  },
  organizer: {
    "@type": "Organization",
    name: "AWS User Group Surat",
    url: "https://www.meetup.com/aws-user-group-surat",
  },
};

const jsonLdFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is AWS Community Day?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "AWS Community Day is a community-led conference where developers, architects, students, cloud professionals, and builders come together to learn, share ideas, and explore AWS through technical sessions, workshops, and conversations.",
      },
    },
    {
      "@type": "Question",
      name: "Who should attend?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Anyone interested in cloud, AWS, DevOps, AI, architecture, or modern infrastructure. Whether you're a student, developer, engineer, founder, architect, or experienced practitioner, there's something for every stage of your learning journey.",
      },
    },
    {
      "@type": "Question",
      name: "Is this event beginner-friendly?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Sessions typically range from beginner-friendly introductions to advanced technical deep-dives, allowing attendees to explore topics at their own pace.",
      },
    },
    {
      "@type": "Question",
      name: "How can I register?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can register directly through the event website. Seats may be limited, so early registration is recommended.",
      },
    },
    {
      "@type": "Question",
      name: "Can I apply as a speaker?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We welcome community members, practitioners, and industry professionals to share their knowledge and experiences.",
      },
    },
    {
      "@type": "Question",
      name: "Will food and refreshments be provided?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Refreshments and meals (if applicable) will be communicated closer to the event date.",
      },
    },
    {
      "@type": "Question",
      name: "Where will the event take place?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "AWS Community Day Surat 2026 will be hosted in Surat. Venue details and directions will be shared with registered attendees.",
      },
    },
    {
      "@type": "Question",
      name: "How can I stay updated?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Follow our community channels and social platforms for speaker announcements, agenda updates, and important event information.",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdEvent) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
        />
      </head>
      <body><ScrollToTop />{children}</body>
    </html>
  );
}
