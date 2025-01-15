'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useCryptoData } from '@/hooks/use-crypto-data'
import { formatCurrency, formatPercentage } from '@/lib/utils'

export function MarketOverview() {
  const { data: assets, isLoading } = useCryptoData()

  if (isLoading) return <div className="animate-pulse">Loading...</div>

  // Calculate total market cap
  const totalMarketCap = assets?.reduce((sum, asset) => sum + (asset.market_cap || 0), 0)
  const marketCapChange = assets?.[0]?.price_change_percentage_24h || 0

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Market Cap</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatCurrency(totalMarketCap)}
          </div>
          <p className="text-xs text-muted-foreground">
            {formatPercentage(marketCapChange)}
          </p>
        </CardContent>
      </Card>
      {/* Add more market overview cards */}
    </div>
  )
}