import { notFound } from 'next/navigation';
import { getBlogPost, getRelatedPosts } from '@/lib/blog';
import { BlogPost } from '@/components/blog/blog-post';
import { RelatedPosts } from '@/components/blog/related-posts';
import { BlogHeader } from '@/components/blog/blog-header';
import { Metadata } from 'next';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getBlogPost(params.slug);
  console.log('post', post);
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.seo?.title || post.title,
    description: post.seo?.description || post.excerpt,
    keywords: post.seo?.keywords,
    authors: [{ name: post.author.name || 'ValenceAI Team' }],
    openGraph: {
      title: post.seo?.title || post.title,
      description: post.seo?.description || post.excerpt,
      url: `/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.publishedAt?.toISOString(),
      modifiedTime: post.updatedAt.toISOString(),
      authors: [post.author.name || 'ValenceAI Team'],
      images: [
        {
          url: post.seo?.ogImage || post.coverImage || '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.seo?.title || post.title,
      description: post.seo?.description || post.excerpt,
      images: [post.seo?.ogImage || post.coverImage || '/og-image.jpg'],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getBlogPost(params.slug);
  
  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(post.id);

  return (
    <div className="min-h-screen bg-gray-50">
      <BlogHeader />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <BlogPost post={post} />
          
          {relatedPosts.length > 0 && (
            <div className="mt-16">
              <RelatedPosts posts={relatedPosts} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}