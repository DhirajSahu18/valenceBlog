import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { handleError } from '@/lib/api-utils';

export async function GET() {
  try {
    const categories = await prisma.category.findMany({ include: { posts: true } });
    return NextResponse.json(categories);
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const category = await prisma.category.create({ data: body });
    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    return handleError(error);
  }
}
