import ScrollReveal from "./ScrollReveal";
import styles from "./Speakers.module.css";

const SPEAKERS = [
  { name: "Speaker 1", role: "Title / Company", topic: "Talk Topic TBA", initials: "S1" },
  { name: "Speaker 2", role: "Title / Company", topic: "Talk Topic TBA", initials: "S2" },
  { name: "Speaker 3", role: "Title / Company", topic: "Talk Topic TBA", initials: "S3" },
  { name: "Speaker 4", role: "Title / Company", topic: "Talk Topic TBA", initials: "S4" },
  { name: "Speaker 5", role: "Title / Company", topic: "Talk Topic TBA", initials: "S5" },
  { name: "Speaker 6", role: "Title / Company", topic: "Talk Topic TBA", initials: "S6" },
];

export default function Speakers() {
  return (
    <section id="speakers" className={styles.section}>
      <div className="container">
        <ScrollReveal className={styles.headerBlock}>
          <span className="section-label">Speakers</span>
          <h2 className={styles.title}>Meet Our Speakers</h2>
          <p className={styles.subtitle}>
            Learn from AWS Heroes, Community Builders, industry practitioners, and
            cloud professionals sharing real-world insights and technical expertise.
          </p>
        </ScrollReveal>

        <div className={styles.grid}>
          {SPEAKERS.map((speaker, i) => (
            <ScrollReveal key={i} delay={1} className={styles.cardWrapper}>
              <div className={styles.card}>
                {/* Avatar */}
                <div className={styles.avatarWrapper}>
                  <div className={styles.avatarFallback}>
                    <span>{speaker.initials}</span>
                  </div>
                  <div className={styles.avatarGlow} />
                </div>

                {/* Info */}
                <div className={styles.info}>
                  <h3 className={styles.name}>{speaker.name}</h3>
                  <p className={styles.role}>{speaker.role}</p>
                  <div className={styles.topicTag}>
                    <span className={styles.topicIcon}>💬</span>
                    <span className={styles.topicText}>{speaker.topic}</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* CTA */}
        <ScrollReveal className={styles.ctaWrapper}>
          <p className={styles.ctaText}>
            Want to share your knowledge with the community?
          </p>
          <a href="#" className={styles.ctaButton}>
            APPLY AS SPEAKER
            <span className={styles.ctaChevron}>&gt;</span>
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
