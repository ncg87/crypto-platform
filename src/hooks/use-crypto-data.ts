import { useQuery } from '@tanstack/react-query'
import { cryptoApi } from '@/services/api'
import { CryptoAsset } from '@/types'

export function useCryptoData() {
  return useQuery<CryptoAsset[]>({
    queryKey: ['crypto-assets'],
    queryFn: cryptoApi.getAssets,
    refetchInterval: 30000,
  })
}