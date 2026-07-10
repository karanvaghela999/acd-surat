"use client";

import { useEffect, useState } from "react";
import styles from "./Countdown.module.css";

const TARGET_DATE = new Date("2026-10-03T09:00:00+05:30").getTime();

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = Date.now();
      const difference = TARGET_DATE - now;

      if (difference <= 0) {
        setTimeLeft({ days: "00", hours: "00", minutes: "00", seconds: "00" });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({
        days: days.toString().padStart(2, "0"),
        hours: hours.toString().padStart(2, "0"),
        minutes: minutes.toString().padStart(2, "0"),
        seconds: seconds.toString().padStart(2, "0"),
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.timeBlock}>
        <div className={styles.card}>
          <span className={styles.number}>{timeLeft.days}</span>
          <div className={styles.cardLine} />
        </div>
        <span className={styles.label}>Days</span>
      </div>
      
      <div className={styles.colon}>:</div>

      <div className={styles.timeBlock}>
        <div className={styles.card}>
          <span className={styles.number}>{timeLeft.hours}</span>
          <div className={styles.cardLine} />
        </div>
        <span className={styles.label}>Hours</span>
      </div>

      <div className={styles.colon}>:</div>

      <div className={styles.timeBlock}>
        <div className={styles.card}>
          <span className={styles.number}>{timeLeft.minutes}</span>
          <div className={styles.cardLine} />
        </div>
        <span className={styles.label}>Minutes</span>
      </div>

      <div className={styles.colon}>:</div>

      <div className={styles.timeBlock}>
        <div className={styles.card}>
          <span className={styles.number}>{timeLeft.seconds}</span>
          <div className={styles.cardLine} />
        </div>
        <span className={styles.label}>Seconds</span>
      </div>
    </div>
  );
}
