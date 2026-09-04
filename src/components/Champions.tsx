import Image from "next/image";
import ScrollReveal from "./ScrollReveal";
import styles from "./Champions.module.css";

const CHAMPIONS = [
  {
    name: "Ghanshyam Katriya",
    role: "Technical Lead @ Cyara",
    tier: "patron" as const,
    initials: "GK",
    image: "/diamondtickets/ghansyam.jpg",
  },
  {
    name: "Hiren Samtani",
    role: "Founder & Additional Director, AlmanacInc Private Limited",
    tier: "diamond" as const,
    initials: "HS",
    image: "/diamondtickets/hiren.jpeg",
  },
];

const TIER_LABEL = {
  diamond: "Diamond",
  patron: "Patron",
};

export default function Champions() {
  return (
    <section id="champions" className={styles.section}>
      <div className="container">
        <ScrollReveal className={styles.headerBlock}>
          <span className="section-label">Community Champions</span>
          <h2 className="section-title">Powered by Our Champions</h2>
          <p className="section-subtitle">
            Diamond and Patron ticket holders who went above and beyond to
            support AWS Community Day Surat 2026.
          </p>
        </ScrollReveal>

        <div className={styles.grid}>
          {CHAMPIONS.map((person, i) => (
            <ScrollReveal key={i} delay={1} className={styles.cardWrapper}>
              <div className={`${styles.card} ${styles[person.tier]}`}>
                <div className={styles.avatarWrapper}>
                  <div className={styles.avatarFallback}>
                    <span>{person.initials}</span>
                  </div>
                  <div className={styles.avatarImageWrapper}>
                    <Image
                      src={person.image}
                      alt={person.name}
                      fill
                      quality={80}
                      className={styles.avatarImage}
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 200px"
                    />
                  </div>
                </div>

                <span className={styles.badge}>{TIER_LABEL[person.tier]}</span>

                <div className={styles.info}>
                  <h3 className={styles.name}>{person.name}</h3>
                  <p className={styles.role}>{person.role}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* CTA */}
        <ScrollReveal className={styles.ctaWrapper}>
          <p className={styles.ctaText}>
            Want to be featured here and support the community?
          </p>
          <a href="#tickets" className={styles.ctaButton}>
            GET A DIAMOND OR PATRON TICKET
            <span className={styles.ctaChevron}>&gt;</span>
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
