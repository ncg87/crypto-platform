export interface CryptoAsset {
  id: string
  name: string
  symbol: string
  current_price: number
  market_cap: number
  price_change_percentage_24h: number
}

export interface MarketData {
  total_market_cap: number
  total_volume: number
}