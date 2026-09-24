import Image from "next/image";
import ScrollReveal from "./ScrollReveal";
import styles from "./Champions.module.css";

const CHAMPIONS = [
  {
    name: "Harshil Soni",
    role: "Module Lead @ HGS",
    tier: "patron" as const,
    initials: "HS",
    image: "/diamondtickets/harshil.png",
    linkedin: "https://www.linkedin.com/in/harshil-soni-413775119/",
  },
  {
    name: "Ghanshyam Katriya",
    role: "Technical Lead @ Cyara",
    tier: "patron" as const,
    initials: "GK",
    image: "/diamondtickets/ghansyam.jpg",
  },
  {
    name: "Gani Padela",
    role: "Backend TechLead @ LOGICWIND",
    tier: "patron" as const,
    initials: "GP",
    image: "/diamondtickets/gani_padela.jpg",
    linkedin: "https://www.linkedin.com/in/ganipadela/",
  },
  {
    name: "Hiren Samtani",
    role: "Founder & Additional Director, AlmanacInc Private Limited",
    tier: "diamond" as const,
    initials: "HS",
    image: "/diamondtickets/hiren-updated.png",
  },
  {
    name: "Paras Chodavadiya",
    role: "CTO @ Sarvadhi Solutions Pvt. Ltd",
    tier: "diamond" as const,
    initials: "PC",
    image: "/diamondtickets/paras_chodavadiya.jpg",
    linkedin: "https://www.linkedin.com/in/paras-chodavadiya/",
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
          {CHAMPIONS.map((person, i) => {
            const CardTag = person.linkedin ? "a" : "div";
            return (
              <ScrollReveal key={i} delay={1} className={styles.cardWrapper}>
                <CardTag
                  className={`${styles.card} ${styles[person.tier]}`}
                  {...(person.linkedin
                    ? {
                        href: person.linkedin,
                        target: "_blank",
                        rel: "noopener noreferrer",
                        "aria-label": `View ${person.name}'s LinkedIn profile`,
                      }
                    : {})}
                >
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
                </CardTag>
              </ScrollReveal>
            );
          })}
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
