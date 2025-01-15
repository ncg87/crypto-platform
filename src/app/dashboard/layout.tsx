// src/app/dashboard/layout.tsx
import { Suspense } from 'react'
import { MainNav } from '@/components/layout/main-nav'
import { UserNav } from '@/components/layout/user-nav'
import { SidebarNav } from '@/components/layout/sidebar-nav'
import QueryProvider from '@/providers/query-provider'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <QueryProvider>
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-14 items-center">
            <MainNav />
            <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
              <div className="w-full flex-1 md:w-auto md:flex-none">
                {/* Add search here if needed */}
              </div>
              <UserNav />
            </div>
          </div>
        </header>
        <div className="flex-1 flex">
          <aside className="hidden w-[200px] flex-col md:flex border-r">
            <SidebarNav />
          </aside>
          <main className="flex-1">
            <Suspense fallback={<div>Loading...</div>}>
              {children}
            </Suspense>
          </main>
        </div>
      </div>
    </QueryProvider>
  )
}