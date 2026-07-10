"use client";

import { useState } from "react";
import ScrollReveal from "./ScrollReveal";
import styles from "./FAQ.module.css";

const FAQS = [
  {
    q: "What is AWS Community Day?",
    a: "AWS Community Day is a community-led conference where developers, architects, students, cloud professionals, and builders come together to learn, share ideas, and explore AWS through technical sessions, workshops, and conversations.",
  },
  {
    q: "Who should attend?",
    a: "Anyone interested in cloud, AWS, DevOps, AI, architecture, or modern infrastructure. Whether you're a student, developer, engineer, founder, architect, or experienced practitioner, there's something for every stage of your learning journey.",
  },
  {
    q: "Is this event beginner-friendly?",
    a: "Yes. Sessions typically range from beginner-friendly introductions to advanced technical deep-dives, allowing attendees to explore topics at their own pace.",
  },
  {
    q: "How can I register?",
    a: "You can register directly through the event website. Seats may be limited, so early registration is recommended.",
  },
  {
    q: "Can I apply as a speaker?",
    a: "Yes. We welcome community members, practitioners, and industry professionals to share their knowledge and experiences.",
  },
  {
    q: "Will food and refreshments be provided?",
    a: "Yes. Refreshments and meals (if applicable) will be communicated closer to the event date.",
  },
  {
    q: "Where will the event take place?",
    a: "AWS Community Day Surat 2026 will be hosted in Surat. Venue details and directions will be shared with registered attendees.",
  },
  {
    q: "How can I stay updated?",
    a: "Follow our community channels and social platforms for speaker announcements, agenda updates, and important event information.",
  },
];

function FAQItem({ faq, index }: { faq: (typeof FAQS)[0]; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.item}>
      <button
        className={styles.question}
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        id={`faq-q-${index}`}
        aria-controls={`faq-a-${index}`}
      >
        <span className={styles.qText}>{faq.q}</span>
        <svg
          width="24"
          height="24"
          viewBox="0 0 256 256"
          fill="currentColor"
          className={`${styles.icon} ${open ? styles.iconOpen : ""}`}
        >
          <path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z" />
        </svg>
      </button>
      <div
        className={`${styles.answer} ${open ? styles.answerOpen : ""}`}
        id={`faq-a-${index}`}
        role="region"
        aria-labelledby={`faq-q-${index}`}
      >
        <p className={styles.answerText}>{faq.a}</p>
      </div>
    </div>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className={`section ${styles.faq}`}>
      <div className="container">
        <div className={styles.grid}>
          {/* Left Column: Title */}
          <ScrollReveal className={styles.titleCol}>
            <h2 className="section-title" style={{ fontSize: "clamp(2rem, 1.8rem + 2vw, 3.25rem)" }}>
              FAQ&apos;s
            </h2>
          </ScrollReveal>

          {/* Right Column: Accordion list */}
          <div className={styles.listCol}>
            <div className={styles.accordion}>
              {FAQS.map((faq, i) => (
                <FAQItem key={i} faq={faq} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
