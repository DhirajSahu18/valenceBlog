import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { handleError } from '@/lib/api-utils';

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    const category = await prisma.category.findUnique({ where: { id: params.id } });
    if (!category) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(category);
  } catch (error) {
    return handleError(error);
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const updated = await prisma.category.update({ where: { id: params.id }, data: body });
    return NextResponse.json(updated);
  } catch (error) {
    return handleError(error);
  }
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.category.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return handleError(error);
  }
}
