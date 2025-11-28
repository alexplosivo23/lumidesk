import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Merge Tailwind classes & conditional classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Utilidad opcional para delays
 */
export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
