import ScrollReveal from "./ScrollReveal";
import styles from "./Agenda.module.css";

const TYPE_CONFIG = {
  keynote: { label: "KEYNOTE", color: "#FF9900" },
  session: { label: "SESSION", color: "#0EA5E9" },
  sponsor: { label: "SPONSOR", color: "#EAB308" },
  quiz: { label: "COMMUNITY QUIZ", color: "#22C55E" },
  lightning: { label: "LIGHTNING TALK", color: "#EC4899" },
  break: { label: "BREAK", color: "#64748B" },
  main: { label: "CEREMONY", color: "#A78BFA" },
};

const AGENDA_PERIODS = [
  {
    key: "morning",
    label: "Morning",
    items: [
      { time: "8:00 AM", end: "9:15 AM", title: "Registration, Breakfast & Networking", type: "break" as const },
      { time: "9:15 AM", end: "9:30 AM", title: "Welcome Note & Opening Ceremony", type: "main" as const },
      { time: "9:32 AM", end: "10:00 AM", title: "Opening Keynote: The AI Builder Journey", speaker: "Ridhima Kapoor", type: "keynote" as const },
      { time: "10:00 AM", end: "10:28 AM", title: "Three Layers of Defence: Securing AI Agents on AWS", speaker: "Udit Parikh", type: "session" as const },
      { time: "10:30 AM", end: "11:00 AM", title: "Breaking Down Data Silos: Interoperability with Iceberg", speaker: "Shubham Purwar", type: "session" as const },
      { time: "11:00 AM", end: "11:13 AM", title: "Diamond Sponsor Session", type: "sponsor" as const },
      { time: "11:15 AM", end: "11:45 AM", title: "Building Real-Time Voice Applications with Amazon Nova 2 Sonic", speaker: "Aman Gupta", type: "session" as const },
      { time: "11:45 AM", end: "12:00 PM", title: "Community Quiz – Round 1", type: "quiz" as const },
    ],
  },
  {
    key: "midday",
    label: "Midday",
    items: [
      { time: "12:00 PM", end: "1:30 PM", title: "Lunch, Sponsor Booths & Community Networking", type: "break" as const },
      { time: "1:30 PM", end: "1:45 PM", title: "Community Quiz – Round 2", type: "quiz" as const },
    ],
  },
  {
    key: "afternoon",
    label: "Afternoon",
    items: [
      { time: "1:45 PM", end: "2:15 PM", title: "AWS Serverless Beyond Lambda: How Production Systems Fit Together", speaker: "Dhaval Nagar", type: "session" as const },
      { time: "2:15 PM", end: "2:30 PM", title: "Diamond Sponsor Session", type: "sponsor" as const },
      { time: "2:30 PM", end: "2:58 PM", title: "Your Next DevOps Engineer Is an AI Agent: Autonomous EKS Troubleshooting", speaker: "Krutarth Rindani & Ashish Gajjar", type: "session" as const },
      { time: "3:00 PM", end: "3:13 PM", title: "Lightning Talk", speaker: "Nirav Pancholi", type: "lightning" as const },
      { time: "3:15 PM", end: "3:45 PM", title: "Tea Break, Sponsor Booth Visits & Networking", type: "break" as const },
      { time: "3:45 PM", end: "4:15 PM", title: "Main Community Quiz", type: "quiz" as const },
      { time: "4:15 PM", end: "5:00 PM", title: "Closing Remarks, Community Recognition & Group Photo", type: "main" as const },
    ],
  },
];

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

        <div className={styles.schedule}>
          {AGENDA_PERIODS.map((period) => (
            <ScrollReveal key={period.key} className={styles.periodBlock}>
              <div className={styles.periodHeader}>
                <span className={styles.periodLabel}>{period.label}</span>
                <span className={styles.periodRule} />
              </div>

              <div className={styles.rows}>
                {period.items.map((item, i) => {
                  const config = TYPE_CONFIG[item.type];
                  return (
                    <div
                      key={i}
                      className={styles.row}
                      style={{ "--row-accent": config.color } as React.CSSProperties}
                    >
                      <div className={styles.time}>
                        <span>{item.time}</span>
                        <span className={styles.timeEnd}>{item.end}</span>
                      </div>
                      <div className={styles.sessionInfo}>
                        <span className={styles.rowTitle}>{item.title}</span>
                        {"speaker" in item && <span className={styles.speaker}>{item.speaker}</span>}
                      </div>
                      <span
                        className={styles.badge}
                        style={{
                          color: config.color,
                          borderColor: `${config.color}33`,
                          backgroundColor: `${config.color}14`,
                        }}
                      >
                        {config.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
