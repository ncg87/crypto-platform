import { useQuery } from '@tanstack/react-query'

// Mock data
const mockCryptoData = [
  { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC', price: 50000 },
  { id: 'ethereum', name: 'Ethereum', symbol: 'ETH', price: 3000 },
  { id: 'dogecoin', name: 'Dogecoin', symbol: 'DOGE', price: 0.15 },
]

// Mock API function
const getMockAssets = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))
  return mockCryptoData
}

export function useCryptoData() {
  return useQuery({
    queryKey: ['crypto-assets'],
    queryFn: getMockAssets,
    refetchInterval: 30000,
  })
}