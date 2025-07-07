import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { handleError } from '@/lib/api-utils';

export async function GET() {
  try {
    const tags = await prisma.tag.findMany({ include: { posts: true } });
    return NextResponse.json(tags);
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const tag = await prisma.tag.create({ data: body });
    return NextResponse.json(tag, { status: 201 });
  } catch (error) {
    return handleError(error);
  }
}
