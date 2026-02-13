import '@/app/globals.css'
import { Suspense } from 'react'
import { Promotion, PromotionSkeleton } from '@/app/products/ui'
import { getPromotion } from '@/app/products/data'

export const metadata = { title: 'My Shop' }

async function PromotionContent() {
  const promotion = await getPromotion()
  if (!promotion) return null
  return <Promotion data={promotion} />
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className="antialiased dark:bg-gray-900">
      <body>
        <main className="mx-auto grid max-w-2xl gap-12 px-5 py-8">
          <Suspense fallback={<PromotionSkeleton />}>
            <PromotionContent />
          </Suspense>
          {children}
        </main>
      </body>
    </html>
  )
}
