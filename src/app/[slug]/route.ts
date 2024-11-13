import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const slug = params.slug

  try {
    const shortLink = await prisma.shortLink.findUnique({
      where: {
        slug,
      },
    })

    if (!shortLink) {
      return NextResponse.redirect(new URL('/404', request.url))
    }

    return NextResponse.redirect(new URL(shortLink.url))
  } catch (error) {
    console.error('Error fetching short link:', error)
    return NextResponse.redirect(new URL('/500', request.url))
  }
}