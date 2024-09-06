import { useEffect, useState } from "react";
import { calculateTimeLeft } from "../utils/timeConverter";

export default function useCountdown(futureUnixTimestamp?: number) {
  const [timeLeft, setTimeLeft] = useState<string>("00:00:00");

  useEffect(() => {
    if (!futureUnixTimestamp) return;

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(futureUnixTimestamp));
    }, 1000);

    return () => clearInterval(timer);
  }, [futureUnixTimestamp]);

  return timeLeft;
}
