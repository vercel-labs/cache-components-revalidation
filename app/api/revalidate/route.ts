import { revalidateTag } from 'next/cache'
import type { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  const header = request.headers.get('authorization')
  if (header !== `Bearer ${process.env.REVALIDATION_SECRET}`) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { tag } = await request.json()
  revalidateTag(tag, 'days')
  return Response.json({ revalidated: true, tag })
}
