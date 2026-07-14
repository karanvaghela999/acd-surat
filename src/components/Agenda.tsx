"use client";

import { useEffect, useRef, useState } from "react";
import ScrollReveal from "./ScrollReveal";
import styles from "./Agenda.module.css";

const AGENDA_ITEMS = [
  { time: "8:00 AM", end: "9:00 AM", title: "Registration, Breakfast & Networking", type: "break" as const },
  { time: "9:00 AM", end: "9:20 AM", title: "Welcome Note & Opening Ceremony", type: "main" as const },
  { time: "9:20 AM", end: "10:00 AM", title: "Opening Keynote", type: "keynote" as const },
  { time: "10:00 AM", end: "10:45 AM", title: "Technical Session 1", type: "session" as const },
  { time: "10:45 AM", end: "11:00 AM", title: "Networking Break", type: "break" as const },
  { time: "11:00 AM", end: "11:45 AM", title: "Technical Session 2", type: "session" as const },
  { time: "11:45 AM", end: "12:30 PM", title: "Technical Session 3", type: "session" as const },
  { time: "12:30 PM", end: "1:30 PM", title: "Lunch, Sponsor Booths & Community Networking", type: "break" as const },
  { time: "1:30 PM", end: "2:15 PM", title: "Technical Session 4", type: "session" as const },
  { time: "2:15 PM", end: "3:00 PM", title: "Technical Session 5", type: "session" as const },
  { time: "3:00 PM", end: "3:15 PM", title: "Tea Break", type: "break" as const },
  { time: "3:15 PM", end: "4:00 PM", title: "Technical Session 6", type: "session" as const },
  { time: "4:00 PM", end: "4:30 PM", title: "Community Quiz & Closing Activities", type: "main" as const },
  { time: "4:30 PM", end: "5:00 PM", title: "Closing Remarks, Community Recognition & Group Photo", type: "main" as const },
];

const TYPE_CONFIG = {
  keynote: { label: "KEYNOTE", color: "#FF9900" },
  session: { label: "SESSION", color: "#0EA5E9" },
  break: { label: "BREAK", color: "#64748B" },
  main: { label: "CEREMONY", color: "#A78BFA" },
};

function AgendaRow({ item, index }: { item: (typeof AGENDA_ITEMS)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const config = TYPE_CONFIG[item.type];

  return (
    <div
      ref={ref}
      className={`${styles.row} ${visible ? styles.rowVisible : ""}`}
      style={
        {
          transitionDelay: `${index * 50}ms`,
          "--row-accent": config.color,
        } as React.CSSProperties
      }
    >
      {/* Left: Time block */}
      <div className={styles.timeBlock}>
        <span className={styles.timeStart}>{item.time}</span>
        <span className={styles.timeSep}>–</span>
        <span className={styles.timeEnd}>{item.end}</span>
      </div>

      {/* Center: Timeline dot + line */}
      <div className={styles.rail}>
        <div className={styles.railDot} />
      </div>

      {/* Right: Content card */}
      <div className={styles.content}>
        <div className={styles.contentInner}>
          <span className={styles.badge} style={{ color: config.color, borderColor: `${config.color}33`, backgroundColor: `${config.color}14` }}>
            {config.label}
          </span>
          <h3 className={styles.itemTitle}>{item.title}</h3>
        </div>
      </div>
    </div>
  );
}

export default function Agenda() {
  return (
    <section id="agenda" className={styles.section}>
      <div className="container">
        <ScrollReveal className={styles.headerBlock}>
          <span className="section-label">Schedule</span>
          <h2 className={styles.title}>Tentative Agenda</h2>
          <p className={styles.subtitle}>
            3rd October 2026 &bull; A full day of learning and networking
          </p>
        </ScrollReveal>

        <div className={styles.timeline}>
          {AGENDA_ITEMS.map((item, i) => (
            <AgendaRow key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
