import { Suspense } from 'react'
import { Metadata } from 'next'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { MarketOverview } from '@/components/crypto/market-overview'
import { PriceCard } from '@/components/crypto/price-card'
import { LoadingSpinner } from '@/components/shared/loading-spinner'

export const metadata: Metadata = {
  title: 'Dashboard | Crypto Platform',
  description: 'Cryptocurrency market overview and price tracking',
}

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="watchlist">Watchlist</TabsTrigger>
          <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <Suspense fallback={<LoadingSpinner />}>
            <MarketOverview />
          </Suspense>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Suspense fallback={<LoadingSpinner />}>
              <PriceCard />
            </Suspense>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}