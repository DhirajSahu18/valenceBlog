'use client';

import { useState, useEffect } from 'react';
import { BlogCard } from './blog-card';
import { BlogPagination } from './blog-pagination';
import { BlogPost } from '@/lib/blog';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

interface BlogListProps {
  posts: BlogPost[];
  currentPage: number;
  totalPages: number;
  category?: string;
  tag?: string;
  search?: string;
}

export function BlogList({ 
  posts, 
  currentPage, 
  totalPages, 
  category, 
  tag, 
  search 
}: BlogListProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="bg-white rounded-lg shadow-sm border h-96 animate-pulse">
          <div className="h-48 bg-gray-200 rounded-t-lg"></div>
          <div className="p-6 space-y-3">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </div>
      ))}
    </div>;
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No articles found</h3>
        <p className="text-gray-600 mb-4">
          {search ? `No articles found for "${search}"` : 'No articles match your current filters.'}
        </p>
        <Button variant="outline" onClick={() => window.location.href = '/blog'}>
          <RefreshCw className="h-4 w-4 mr-2" />
          View All Articles
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
      
      {totalPages > 1 && (
        <BlogPagination
          currentPage={currentPage}
          totalPages={totalPages}
          category={category}
          tag={tag}
          search={search}
        />
      )}
    </div>
  );
}