import { prisma } from './prisma'
import { calculateReadingTime } from './utils/reading-time'
import { Post, Category, Tag, User } from '@prisma/client'

export type BlogPost = Post & {
  author: User
  categories: Category[]
  tags: Tag[]
  _count: {
    categories: number
    tags: number
  }
}

export async function getBlogPosts(
  page: number = 1,
  limit: number = 12,
  category?: string,
  tag?: string,
  search?: string
): Promise<{ posts: BlogPost[]; totalCount: number }> {
  const skip = (page - 1) * limit

  const where = {
    published: true,
    ...(category && {
      categories: {
        some: {
          slug: category
        }
      }
    }),
    ...(tag && {
      tags: {
        some: {
          slug: tag
        }
      }
    }),
    ...(search && {
      OR: [
        { title: { contains: search, mode: 'insensitive' } },
        { content: { contains: search, mode: 'insensitive' } },
        { excerpt: { contains: search, mode: 'insensitive' } }
      ]
    })
  }

  const [posts, totalCount] = await Promise.all([
    prisma.post.findMany({
      where,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true
          }
        },
        categories: true,
        tags: true,
        _count: {
          select: {
            categories: true,
            tags: true
          }
        }
      },
      orderBy: { publishedAt: 'desc' },
      skip,
      take: limit
    }),
    prisma.post.count({ where })
  ])

  return { posts: posts as BlogPost[], totalCount }
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const post = await prisma.post.findUnique({
    where: { slug, published: true },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true
        }
      },
      categories: true,
      tags: true,
      seo: true,
      _count: {
        select: {
          categories: true,
          tags: true
        }
      }
    }
  })

  if (post) {
    // Increment view count
    await prisma.post.update({
      where: { id: post.id },
      data: { views: { increment: 1 } }
    })
  }

  return post as BlogPost | null
}

export async function getRelatedPosts(postId: string, limit: number = 3): Promise<BlogPost[]> {
  const post = await prisma.post.findUnique({
    where: { id: postId },
    include: { categories: true, tags: true }
  })

  if (!post) return []

  const categoryIds = post.categories.map(c => c.id)
  const tagIds = post.tags.map(t => t.id)

  const relatedPosts = await prisma.post.findMany({
    where: {
      published: true,
      id: { not: postId },
      OR: [
        { categories: { some: { id: { in: categoryIds } } } },
        { tags: { some: { id: { in: tagIds } } } }
      ]
    },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true
        }
      },
      categories: true,
      tags: true,
      _count: {
        select: {
          categories: true,
          tags: true
        }
      }
    },
    orderBy: { publishedAt: 'desc' },
    take: limit
  })

  return relatedPosts as BlogPost[]
}

export async function getCategories() {
  return await prisma.category.findMany({
    orderBy: { name: 'asc' }
  })
}

export async function getTags() {
  return await prisma.tag.findMany({
    orderBy: { name: 'asc' }
  })
}