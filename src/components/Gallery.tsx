import Image from "next/image";
import ScrollReveal from "./ScrollReveal";
import styles from "./Gallery.module.css";

const IMAGES = [
  { src: "/gallery-1.png", alt: "AWS User Group Surat Meetup #1 - Cloud Innovators", span: "wide" },
  { src: "/gallery-2.png", alt: "Serverless & Containers Hands-on Workshop", span: "normal" },
  { src: "/gallery-3.png", alt: "Surat Developers Technical Roundtable", span: "normal" },
  { src: "/gallery-4.png", alt: "Community Mentorship & Networking Session", span: "normal" },
  { src: "/gallery-5.png", alt: "Cloud Builders Technical Deep-Dive Workshop", span: "wide" },
];

export default function Gallery() {
  return (
    <section id="gallery" className={styles.gallery}>
      {/* Decorative Blueprint Lines in Background */}
      <div className={styles.linesOverlay}>
        <svg width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.05 }}>
          <path d="M0 100h2000M0 300h2000M0 500h2000M300 0v2000M800 0v2000" stroke="#FAFAFA" strokeWidth="1" />
        </svg>
      </div>

      <div className="container">
        <ScrollReveal className={styles.headerBlock}>
          <span className={styles.sectionLabel}>COMMUNITY IN ACTION</span>
          <h2 className={styles.title}>
            Connecting Surat&apos;s builders through hands-on meetups, technical discussions, and collaborative learning.
          </h2>
        </ScrollReveal>

        <div className={styles.grid}>
          {IMAGES.map((img, i) => (
            <ScrollReveal
              key={img.src}
              delay={Math.min(i + 1, 4)}
              className={`${styles.imageWrapper} ${
                img.span === "wide" ? styles.wide : ""
              }`}
            >
              <div className={styles.imageCard}>
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
                  className={styles.image}
                  quality={80}
                />
                <div className={styles.imageOverlay}>
                  <p className={styles.imageCaption}>{img.alt}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
