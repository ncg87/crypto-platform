// lib/utils.ts
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number | undefined | null): string {
  if (!amount && amount !== 0) return "N/A"
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact"
  }).format(amount)
}

export function formatPercentage(value: number | undefined | null): string {
  if (!value && value !== 0) return "N/A"
  return new Intl.NumberFormat("en-US", {
    style: "percent",
    maximumFractionDigits: 2,
    signDisplay: "exceptZero"
  }).format(value / 100)
}
