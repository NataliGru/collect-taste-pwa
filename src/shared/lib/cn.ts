import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// cn = helper for conditional Tailwind classes
// Combines clsx + tailwind-merge

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};
