import { clsx, type ClassValue } from "clsx"
import { format, formatDistanceToNow } from "date-fns";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getReadableTime(time: Date) {
  const now = new Date();
  let readableTime: string;

  // If same day, show exact time, else show relative
  if (
    time.toDateString() === now.toDateString()
  ) {
    readableTime = `Today, ${format(time, "hh:mm a")}`;
  } else {
    readableTime = formatDistanceToNow(time, {
      addSuffix: true,
    });
  }

  return readableTime;
}

export const shortifyText = (text: string, max_length=28):string => {
  if(text.length > max_length) return text.slice(0, 25) + '...';
  return text;
}