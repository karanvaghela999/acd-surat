import ScrollReveal from "./ScrollReveal";
import styles from "./Agenda.module.css";

const AGENDA_ITEMS = [
  { time: "8:00 AM – 9:00 AM", title: "Registration, Breakfast & Networking", type: "break" },
  { time: "9:00 AM – 9:20 AM", title: "Welcome Note & Opening Ceremony", type: "main" },
  { time: "9:20 AM – 10:00 AM", title: "Opening Keynote", type: "keynote" },
  { time: "10:00 AM – 10:45 AM", title: "Technical Session 1", type: "session" },
  { time: "10:45 AM – 11:00 AM", title: "Networking Break", type: "break" },
  { time: "11:00 AM – 11:45 AM", title: "Technical Session 2", type: "session" },
  { time: "11:45 AM – 12:30 PM", title: "Technical Session 3", type: "session" },
  { time: "12:30 PM – 1:30 PM", title: "Lunch, Sponsor Booths & Community Networking", type: "break" },
  { time: "1:30 PM – 2:15 PM", title: "Technical Session 4", type: "session" },
  { time: "2:15 PM – 3:00 PM", title: "Technical Session 5", type: "session" },
  { time: "3:00 PM – 3:15 PM", title: "Tea Break", type: "break" },
  { time: "3:15 PM – 4:00 PM", title: "Technical Session 6", type: "session" },
  { time: "4:00 PM – 4:30 PM", title: "Community Quiz & Closing Activities", type: "main" },
  { time: "4:30 PM – 5:00 PM", title: "Closing Remarks, Community Recognition & Group Photo", type: "main" },
];

export default function Agenda() {
  return (
    <section id="agenda" className={styles.section}>
      <div className="container">
        <ScrollReveal className={styles.headerBlock}>
          <span className="section-label">Schedule</span>
          <h2 className={styles.title}>Tentative Agenda</h2>
          <p className={styles.subtitle}>3rd October 2026 &bull; A full day of learning and networking</p>
        </ScrollReveal>

        <div className={styles.timeline}>
          {AGENDA_ITEMS.map((item, index) => (
            <ScrollReveal 
              key={index} 
              delay={1}
              className={`${styles.timelineItem} ${index % 2 === 0 ? styles.left : styles.right} ${styles[item.type]}`}
            >
              <div className={styles.timelineContent}>
                <div className={styles.timeTag}>{item.time}</div>
                <h3 className={styles.itemTitle}>{item.title}</h3>
              </div>
              <div className={styles.timelineDot}></div>
            </ScrollReveal>
          ))}
          <div className={styles.timelineLine}></div>
        </div>
      </div>
    </section>
  );
}
