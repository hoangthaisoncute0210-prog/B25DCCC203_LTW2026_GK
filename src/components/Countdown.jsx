import React, { useState, useEffect } from "react";

const Countdown = ({ date }) => {
  const calculateRemaining = () => {
    const target = new Date(`${date}T00:00:00`).getTime();
    const now = new Date().getTime();
    const diff = target - now;

    if (diff <= 0) {
      return "Sự kiện đã diễn ra";
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return `Còn ${days} ngày ${hours} giờ ${minutes} phút ${seconds} giây`;
  };

  const [timeLeft, setTimeLeft] = useState(calculateRemaining);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateRemaining());
    }, 1000);

    return () => clearInterval(timer);
  }, [date]);

  return <p>{timeLeft}</p>;
};

export default Countdown;