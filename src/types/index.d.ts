export interface CryptoAsset {
  id: string
  name: string
  symbol: string
  current_price: number  // Changed from 'price' to match API convention
  market_cap?: number
  price_change_percentage_24h?: number
}

export interface MarketData {
  total_market_cap: number  // Changed from camelCase to snake_case
  total_volume: number
} 