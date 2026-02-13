import { revalidateTag } from 'next/cache'
import type { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  const { tag } = await request.json()
  revalidateTag(tag, 'days')
  return Response.json({ revalidated: true, tag })
}
