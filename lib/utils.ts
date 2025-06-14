// Combines class names using clsx, then merges Tailwind classes smartly with tailwind-merge
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// cn: Useful for conditionally combining class names while resolving Tailwind conflicts
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(...inputs))
}