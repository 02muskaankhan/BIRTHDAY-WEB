import { useEffect, useState } from "react";
import "./Countdown.css";
import Digit from "./Digit";

function Countdown({ onBirthdayReached, birthdayReached }) {
  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [prevTime, setPrevTime] = useState({
    hours: null,
    minutes: null,
    seconds: null,
  });

  useEffect(() => {
    if (birthdayReached) return;

    // 🎂 10 JAN midnight (India time)
    const targetDate = new Date("2026-01-10T00:00:00");

    const updateCountdown = () => {
      const now = new Date();
      const diff = targetDate - now;

      if (diff <= 0) {
        onBirthdayReached();
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setPrevTime(time);
      setTime({ hours, minutes, seconds });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [birthdayReached, onBirthdayReached, time]);

  return (
    <section className="countdown">
      <div className="flip-timer">
        <Digit value={time.hours} label="Hours" prevValue={prevTime.hours} />
        <Digit value={time.minutes} label="Minutes" prevValue={prevTime.minutes} />
        <Digit value={time.seconds} label="Seconds" prevValue={prevTime.seconds} />
      </div>
    </section>
  );
}

export default Countdown;
