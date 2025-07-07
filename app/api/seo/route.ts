import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { handleError } from '@/lib/api-utils';

export async function GET() {
  try {
    const seoEntries = await prisma.postSeo.findMany({ include: { post: true } });
    return NextResponse.json(seoEntries);
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const seo = await prisma.postSeo.create({ data: body });
    return NextResponse.json(seo, { status: 201 });
  } catch (error) {
    return handleError(error);
  }
}
