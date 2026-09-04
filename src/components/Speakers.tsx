import Image from "next/image";
import ScrollReveal from "./ScrollReveal";
import styles from "./Speakers.module.css";

const KEYNOTE_SPEAKER = {
  name: "Ridhima Kapoor",
  role: "Sr. Developer Community Manager @ AWS",
  talkTitle: "The AI Builder Journey: Learn. Build. Share. Repeat.",
  initials: "RK",
  image: "/speakers/ridhima.jpeg",
  linkedin: "https://www.linkedin.com/in/kapoor-ridhima/",
};

const SPEAKERS = [
  {
    name: "Shubham Purvwar",
    role: "Analytics & AI Specialist Solution Architect @ AWS",
    initials: "SP",
    image: "/speakers/shubham.jpeg",
  },
  {
    name: "Dhaval Nagar",
    role: "Founder @ Appgambit, AWS Serverless Hero",
    initials: "DN",
    image: "/speakers/dhaval.jpeg",
  },
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

        {/* Opening Keynote — Featured */}
        <ScrollReveal className={styles.keynoteWrapper}>
          <div className={styles.keynoteCard}>
            <div className={styles.keynoteShimmer} />

            <div className={styles.keynoteAvatarWrapper}>
              <div className={styles.keynoteAvatarRing} />
              <div className={styles.avatarFallback}>
                <span>{KEYNOTE_SPEAKER.initials}</span>
              </div>
              <div className={styles.keynoteAvatarImageWrapper}>
                <Image
                  src={KEYNOTE_SPEAKER.image}
                  alt={KEYNOTE_SPEAKER.name}
                  fill
                  quality={85}
                  className={styles.avatarImage}
                  sizes="(max-width: 768px) 40vw, 200px"
                />
              </div>
            </div>

            <div className={styles.keynoteContent}>
              <span className={styles.keynoteEyebrow}>Opening Keynote</span>
              <h3 className={styles.keynoteTalkTitle}>
                &ldquo;{KEYNOTE_SPEAKER.talkTitle}&rdquo;
              </h3>
              <div className={styles.keynoteMeta}>
                <span className={styles.keynoteName}>{KEYNOTE_SPEAKER.name}</span>
                <span className={styles.keynoteRole}>{KEYNOTE_SPEAKER.role}</span>
              </div>
              <a
                href={KEYNOTE_SPEAKER.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.keynoteLinkedin}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
                </svg>
                Connect on LinkedIn
              </a>
            </div>
          </div>
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
                  {"image" in speaker && speaker.image && (
                    <div className={styles.avatarImageWrapper}>
                      <Image
                        src={speaker.image}
                        alt={speaker.name}
                        fill
                        quality={80}
                        className={styles.avatarImage}
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 200px"
                      />
                    </div>
                  )}
                  <div className={styles.avatarGlow} />
                </div>

                {/* Info */}
                <div className={styles.info}>
                  <h3 className={styles.name}>{speaker.name}</h3>
                  <p className={styles.role}>{speaker.role}</p>
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
          <a
            href="https://sessionize.com/aws-community-day-surat-2026"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ctaButton}
          >
            APPLY AS SPEAKER
            <span className={styles.ctaChevron}>&gt;</span>
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
