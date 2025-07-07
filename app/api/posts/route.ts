import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const posts = await prisma.post.findMany({
    include: { author: true, categories: true, tags: true, seo: true },
  });
  return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const post = await prisma.post.create({
    data: {
      title: body.title,
      slug: body.slug,
      content: body.content,
      excerpt: body.excerpt,
      coverImage: body.coverImage,
      published: body.published,
      publishedAt: body.publishedAt,
      readingTime: body.readingTime,
      authorId: body.authorId,
      categories: { connect: body.categoryIds?.map((id: string) => ({ id })) },
      tags: { connect: body.tagIds?.map((id: string) => ({ id })) },
    },
  });
  return NextResponse.json(post, { status: 201 });
}
