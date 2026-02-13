import { cacheLife, cacheTag } from 'next/cache'

export type Product = {
  id: string
  slug: string
  name: string
  description: string
  price: number
  image: string
  category: string
  updatedAt: string
}

export async function getProducts(): Promise<Product[]> {
  'use cache'
  cacheTag('products')
  cacheLife('days')
  const response = await fetch('https://next-recipe-api.vercel.dev/products')

  return response.json()
}

export async function getProduct(slug: string): Promise<Product> {
  'use cache'
  cacheTag(`product-${slug}`)
  cacheLife('days')
  const response = await fetch(
    `https://next-recipe-api.vercel.dev/products/${slug}`
  )

  return response.json()
}

export type Activity = { id: string; sold: number; wishlisted: number; viewed: number; inDemand: boolean }
export async function getActivity(slug: string): Promise<Activity> {
  const response = await fetch(
    `https://next-recipe-api.vercel.dev/products/${slug}/activity`
  )

  return response.json()
}

export type Promotion = { message: string }
export async function getPromotion(): Promise<Promotion | null> {
  // Artificial delay to make the demo more obvious
  await new Promise((resolve) => setTimeout(resolve, 200))

  const response = await fetch('https://next-recipe-api.vercel.dev/promotion')

  return response.json()
}
