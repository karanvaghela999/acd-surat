import Image from "next/image";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section id="hero" className={styles.hero}>
      {/* Full background image with overlay */}
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

      {/* Main Hero Content */}
      <div className={`container ${styles.container}`}>
        {/* Logo */}
        <div className={styles.logoWrapper}>
          <Image
            src="/AWS_UG _Suart.png"
            alt="AWS User Groups Surat"
            width={280}
            height={140}
            priority
            className={styles.logo}
          />
        </div>

        {/* Event Title */}
        <h1 className={styles.title}>
          <span className={styles.titleLine}>AWS Community Day</span>
          <span className={styles.titleAccent}>Surat 2026</span>
        </h1>

        {/* Date & Location — Prominent */}
        <div className={styles.eventMeta}>
          <div className={styles.metaBlock}>
            <span className={styles.metaLabel}>Date</span>
            <span className={styles.metaValue}>October 3, 2026</span>
          </div>
          <div className={styles.metaDivider} />
          <div className={styles.metaBlock}>
            <span className={styles.metaLabel}>Location</span>
            <span className={styles.metaValue}>Surat, India</span>
          </div>
        </div>

        {/* Tagline */}
        <p className={styles.tagline}>
          A one-day conference for the next generation of cloud innovators.
          Learn from AWS Heroes, Community Builders &amp; industry experts.
        </p>

      </div>
    </section>
  );
}
