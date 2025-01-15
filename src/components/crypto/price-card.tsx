'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Star } from 'lucide-react'
import { useCryptoData } from '@/hooks/use-crypto-data'
import { formatCurrency, formatPercentage } from '@/lib/utils'

export function PriceCard() {
  const { data: assets, isLoading } = useCryptoData()

  if (isLoading) {
    return <div className="animate-pulse">Loading...</div>
  }

  return (
    <>
      {assets?.map((asset) => (
        <Card key={asset.id}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {asset.name}
            </CardTitle>
            <Button variant="ghost" size="icon">
              <Star className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(asset.current_price)}
            </div>
            <p className={`text-xs ${(asset.price_change_percentage_24h ?? 0) > 0 ? 'text-green-500' : 'text-red-500'}`}>
              {formatPercentage(asset.price_change_percentage_24h)}
            </p>
          </CardContent>
        </Card>
      ))}
    </>
  )
}