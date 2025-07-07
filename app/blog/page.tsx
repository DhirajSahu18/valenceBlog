import { Suspense } from 'react';
import { getBlogPosts, getCategories } from '@/lib/blog';
import { BlogList } from '@/components/blog/blog-list';
import { BlogHeader } from '@/components/blog/blog-header';
import { BlogSidebar } from '@/components/blog/blog-sidebar';
import { BlogListSkeleton } from '@/components/blog/blog-list-skeleton';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Latest articles and insights from the ValenceAI team',
  openGraph: {
    title: 'ValenceAI Blog',
    description: 'Latest articles and insights from the ValenceAI team',
    url: '/blog',
    type: 'website',
  },
};

interface BlogPageProps {
  searchParams: {
    page?: string;
    category?: string;
    tag?: string;
    search?: string;
  };
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const page = parseInt(searchParams.page || '1');
  const category = searchParams.category;
  const tag = searchParams.tag;
  const search = searchParams.search;

  const [{ posts, totalCount }, categories] = await Promise.all([
    getBlogPosts(page, 12, category, tag, search),
    getCategories(),
  ]);

  const totalPages = Math.ceil(totalCount / 12);

  return (
    <div className="min-h-screen bg-gray-50">
      <BlogHeader />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Suspense fallback={<BlogListSkeleton />}>
              <BlogList
                posts={posts}
                currentPage={page}
                totalPages={totalPages}
                category={category}
                tag={tag}
                search={search}
              />
            </Suspense>
          </div>
          
          <div className="lg:col-span-1">
            <BlogSidebar categories={categories} />
          </div>
        </div>
      </main>
    </div>
  );
}