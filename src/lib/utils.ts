import { clsx, type ClassValue } from 'clsx';
import { format, formatDistanceToNow } from 'date-fns';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getReadableTime(time: Date) {
  const now = new Date();
  const msPerDay = 1000 * 60 * 60 * 24;
  const daysDiff = Math.floor((now.getTime() - time.getTime()) / msPerDay);

  if (time.toDateString() === now.toDateString()) {
    return `Today, ${format(time, 'hh:mm a')}`;
  }

  if (daysDiff > 7) {
    return format(time, 'MMM d, yyyy');
  }

  return formatDistanceToNow(time, { addSuffix: true });
}

export const shortifyText = (text: string, max_length = 28): string => {
  if (text.length > max_length) return text.slice(0, 25) + '...';
  return text;
};
