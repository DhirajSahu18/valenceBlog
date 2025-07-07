import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { handleError } from '@/lib/api-utils';

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await prisma.user.findUnique({ where: { id: params.id } });
    if (!user) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(user);
  } catch (error) {
    return handleError(error);
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const updated = await prisma.user.update({ where: { id: params.id }, data: body });
    return NextResponse.json(updated);
  } catch (error) {
    return handleError(error);
  }
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.user.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return handleError(error);
  }
}
