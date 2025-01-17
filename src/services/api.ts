import { CryptoAsset, MarketData } from '@/types'

// Mock data for development
const mockCryptoAssets: CryptoAsset[] = [
  { 
    id: 'bitcoin', 
    name: 'Bitcoin', 
    symbol: 'BTC', 
    current_price: 50000,
    market_cap: 1000000000000,
    price_change_percentage_24h: 2.5
  },
  { 
    id: 'ethereum', 
    name: 'Ethereum', 
    symbol: 'ETH', 
    current_price: 4000,
    market_cap: 500000000000,
    price_change_percentage_24h: -1.2
  },
  // Add more mock assets as needed
]

const mockMarketData: MarketData = {
  total_market_cap: 2000000000,
  total_volume: 100000000,
  // Add more mock market data as needed
}

export const cryptoApi = {
  getAssets: async (): Promise<CryptoAsset[]> => {
    // Return mock data instead of making an API call
    return Promise.resolve(mockCryptoAssets)
  },
  
  getMarketData: async (): Promise<MarketData> => {
    // Return mock data instead of making an API call
    return Promise.resolve(mockMarketData)
  },
}
