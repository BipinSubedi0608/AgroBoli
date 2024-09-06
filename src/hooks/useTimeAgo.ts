import { useEffect, useState } from "react";
import { formatTimeAgo } from "../utils/timeConverter";

export function useTimeAgo(pastUnixTime: number) {
  const [timeAgoString, setTimeAgoString] = useState("");
  const intervalTimeInMs = 60 * 1000;

  useEffect(() => {
    if (!pastUnixTime) return;

    setTimeAgoString(formatTimeAgo(pastUnixTime));
    const timer = setInterval(() => {}, intervalTimeInMs);

    return () => clearInterval(timer);
  }, []);

  return timeAgoString;
}
