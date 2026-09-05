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
    name: "Shubham Purwar",
    role: "Analytics & AI Specialist Solution Architect @ AWS",
    initials: "SP",
    image: "/speakers/shubham.jpeg",
    linkedin: "https://www.linkedin.com/in/shubham-purwar/",
  },
  {
    name: "Dhaval Nagar",
    role: "Founder @ Appgambit, AWS Serverless Hero",
    initials: "DN",
    image: "/speakers/dhaval.jpeg",
    linkedin: "https://www.linkedin.com/in/dhavaln/",
  },
  {
    name: "Aman Gupta",
    role: "Sr. Cloud Engineer (AI/ML) @ AWS",
    initials: "AG",
    image: "/speakers/aman.jpeg",
    linkedin: "https://www.linkedin.com/in/amangupta53/",
  },
  {
    name: "Udit Parikh",
    role: "Sr. Cloud Engineer @ AWS",
    initials: "UP",
    image: "/speakers/udit.png",
    linkedin: "https://www.linkedin.com/in/parikhudit/",
  },
  {
    name: "Krutarth Rindani",
    role: "Sr DevOps Engineer @ McAfee - 6x Certified",
    initials: "KR",
    image: "/speakers/krutarth.jpeg",
    linkedin: "https://in.linkedin.com/in/krutarth-rindani-106167104",
  },
  {
    name: "Ashish Gajjar",
    role: "MTS - eInfochips, an Arrow company",
    initials: "AG",
    image: "/speakers/ashish.jpeg",
    linkedin: "https://www.linkedin.com/in/gajjarashish/",
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
          <a
            href={KEYNOTE_SPEAKER.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.keynoteCard}
            aria-label={`View ${KEYNOTE_SPEAKER.name}'s LinkedIn profile`}
          >
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
            </div>
          </a>
        </ScrollReveal>

        <div className={styles.grid}>
          {SPEAKERS.map((speaker, i) => (
            <ScrollReveal key={i} delay={1} className={styles.cardWrapper}>
              <a
                href={speaker.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.card}
                aria-label={`View ${speaker.name}'s LinkedIn profile`}
              >
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
              </a>
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
