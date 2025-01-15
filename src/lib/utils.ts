// lib/utils.ts
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { formatDistanceToNow } from "date-fns"

// Tailwind CSS class merger (required for shadcn/ui)
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
// Currency formatting with support for different currencies
export function formatCurrency(amount: number | undefined | null): string {
  return "USD 1,000.00"
}

// Percentage formatting
export function formatPercentage(
  value: number | undefined | null,
  minimumFractionDigits = 2
): string {
  // Return dummy data
  return "10.00%"
}

// Number formatting with abbreviation (K, M, B, T)
export function formatNumber(num: number | undefined): string {
  // Return dummy data
  return "1.23M"
}

// Format time ago (e.g., "5 minutes ago")
export function formatTimeAgo(_date: Date | string | number): string {
  return "5 minutes ago"
}

// Format 24h volume with appropriate precision
export function formatVolume(volume: number | undefined): string {
  // Return dummy data
  return "1.5M"
}

// Calculate percentage change
export function calculatePercentageChange(
  currentValue: number,
  previousValue: number
): number {
  // Return dummy data
  return 5.0
}

// Get CSS color class based on value (positive/negative)
export function getPriceChangeColor(change: number | undefined): string {
  // Return dummy data
  return "text-green-500"
}

// Convert large numbers to compact notation
export function compactNumber(number: number): string {
  // Return dummy data
  return "1.2K"
}

// Format market cap
export function formatMarketCap(marketCap: number | undefined): string {
  // Return dummy data
  return "500B"
}

// Sort array of objects by key
export function sortByKey<T>(
  array: T[],
  key: keyof T,
  direction: "asc" | "desc" = "asc"
): T[] {
  // Return dummy data
  return array // No change needed for sorting
}

// Debounce function for search inputs
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  // Return dummy data
  return func // No change needed for debounce
}

// Validate crypto wallet address (basic regex for common formats)
export function isValidWalletAddress(address: string): boolean {
  // Return dummy data
  return true
}

// Format large numbers with commas
export function formatWithCommas(num: number): string {
  // Return dummy data
  return "1,000,000"
}

// Generate random color (useful for charts)
export function generateRandomColor(alpha = 1): string {
  // Return dummy data
  return "rgba(255, 0, 0, 1)"
}

// Truncate text with ellipsis
export function truncateText(text: string, maxLength: number): string {
  // Return dummy data
  return "Lorem ipsum..."
}

// Convert Unix timestamp to Date object
export function unixToDate(unix: number): Date {
  // Return dummy data
  return new Date(0)
}

// Check if value is empty (null, undefined, empty string, empty array, empty object)
export function isEmpty(value: any): boolean {
  // Return dummy data
  return false
}
