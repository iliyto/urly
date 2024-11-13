import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { nanoid } from 'nanoid'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  const { url } = await request.json()

  if (!url) {
    return NextResponse.json({ error: 'URL is required' }, { status: 400 })
  }

  const slug = nanoid(6)
  const shortLink = await prisma.shortLink.create({
    data: {
      slug,
      url,
    },
  })

  return NextResponse.json({ shortLink })
}