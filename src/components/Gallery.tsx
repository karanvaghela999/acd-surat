import Image from "next/image";
import ScrollReveal from "./ScrollReveal";
import styles from "./Gallery.module.css";

const IMAGES = [
  { src: "/meetup-img/img1.jpeg", alt: "AWS User Group Surat Meetup", span: "normal" },
  { src: "/meetup-img/img2.avif", alt: "AWS User Group Surat Meetup", span: "normal" },
  { src: "/meetup-img/img3.jpeg", alt: "AWS User Group Surat Meetup", span: "normal" },
  { src: "/meetup-img/img4.jpeg", alt: "AWS User Group Surat Meetup", span: "normal" },
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

        <div className={styles.marqueeWrapper}>
          <div className={styles.marqueeTrack}>
            {[...IMAGES, ...IMAGES].map((img, i) => (
              <div key={`${img.src}-${i}`} className={styles.imageCard}>
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 768px) 300px, 600px"
                  className={styles.image}
                  quality={80}
                />
                <div className={styles.imageOverlay}>
                  <p className={styles.imageCaption}>{img.alt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
