import Image from "next/image";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section id="hero" className={styles.hero}>
      {/* Full background image with custom blend overlay */}
      <div className={styles.imageWrapper}>
        <Image
          src="/hero-image.png"
          alt="AWS Community Day Surat 2026 conference"
          fill
          priority
          quality={95}
          className={styles.bgImage}
          sizes="100vw"
        />
        <div className={styles.overlay} />
      </div>

      {/* Main Hero Content - Elevated Layout */}
      <div className={`container ${styles.container}`}>
        <div className={styles.mainContent}>
          <h1 className={styles.title}>
            A one-day conference for the next generation of cloud innovators
          </h1>
          
          <p className={styles.subtitle}>
            Learn from AWS Heroes, Community Builders, industry experts, and fellow developers through technical talks, hands-on workshops, and networking designed to help you build what&apos;s next.
          </p>
        </div>

        {/* Bottom Info & Action Bar (matching screenshot layout) */}
        <div className={styles.bottomBar}>
          <div className={styles.metaInfo}>
            <span className={styles.metaItem}>SURAT, INDIA</span>
            <span className={styles.metaItem}>OCTOBER 3, 2026</span>
          </div>
          
          <div className={styles.actionCol}>
            <a
              href="#"
              className={`btn ${styles.heroCta}`}
            >
              GET TICKETS
              <span className={styles.chevron}>&gt;</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
