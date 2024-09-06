import moment from "moment";

export function calculateTimeLeft(futureUnixTimestamp: number) {
  const now = Math.floor(Date.now() / 1000);
  const difference = futureUnixTimestamp - now;

  if (difference <= 0) {
    return "00:00:00";
  }

  const hours = Math.floor(difference / 3600);
  const minutes = Math.floor((difference % 3600) / 60);
  const seconds = difference % 60;

  const format = (num: number): string => (num < 10 ? `0${num}` : `${num}`);

  return `${format(hours)}:${format(minutes)}:${format(seconds)}`;
}

export function formatTimeAgo(unixTime: number) {
  const now = moment();
  const time = moment.unix(unixTime);

  const duration = moment.duration(now.diff(time));

  const days = Math.floor(duration.asDays());
  const hours = Math.floor(duration.asHours());
  const minutes = Math.floor(duration.asMinutes());

  return days >= 1
    ? `${days} day${days > 1 ? "s" : ""} ago`
    : hours >= 1
    ? `${hours} hour${hours > 1 ? "s" : ""} ago`
    : minutes >= 1
    ? `${minutes} minute${minutes > 1 ? "s" : ""} ago`
    : "Just now";
}
