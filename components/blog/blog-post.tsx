'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { format } from 'date-fns';
import { BlogPost as BlogPostType } from '@/lib/blog';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatReadingTime } from '@/lib/utils/reading-time';
import { ShareButtons } from './share-buttons';
import { TableOfContents } from './table-of-contents';
import { Clock, Eye, Calendar } from 'lucide-react';

interface BlogPostProps {
  post: BlogPostType;
}

export function BlogPost({ post }: BlogPostProps) {
  const [readingProgress, setReadingProgress] = useState(0);
  const [headings, setHeadings] = useState<Array<{ id: string; text: string; level: number }>>([]);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('blog-content');
      if (element) {
        const scrollTop = window.scrollY;
        const docHeight = element.offsetHeight;
        const winHeight = window.innerHeight;
        const scrollPercent = scrollTop / (docHeight - winHeight);
        const progress = Math.min(100, Math.max(0, scrollPercent * 100));
        setReadingProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const headingElements = document.querySelectorAll('#blog-content h1, #blog-content h2, #blog-content h3');
    const headingsList = Array.from(headingElements).map((heading) => ({
      id: heading.id,
      text: heading.textContent || '',
      level: parseInt(heading.tagName.charAt(1)),
    }));
    setHeadings(headingsList);
  }, [post.content]);

  return (
    <article className="bg-white rounded-lg shadow-sm border overflow-hidden">
      {/* Reading Progress Bar */}
      <div 
        className="reading-progress"
        style={{ width: `${readingProgress}%` }}
      />

      {/* Cover Image */}
      {post.coverImage && (
        <div className="aspect-video relative">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <div className="p-8">
        {/* Categories */}
        <div className="flex items-center gap-2 mb-4">
          {post.categories.map((category) => (
            <Badge 
              key={category.id} 
              variant="secondary" 
              style={{ backgroundColor: category.color + '20', color: category.color }}
            >
              {category.name}
            </Badge>
          ))}
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
          {post.title}
        </h1>

        {/* Meta Information */}
        <div className="flex items-center justify-between mb-8 pb-6 border-b">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={post.author.image || ''} alt={post.author.name || ''} />
              <AvatarFallback>
                {post.author.name?.charAt(0) || 'U'}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-gray-900">{post.author.name}</p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {post.publishedAt && format(post.publishedAt, 'MMMM d, yyyy')}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {formatReadingTime(post.readingTime || 5)}
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  {post.views} views
                </div>
              </div>
            </div>
          </div>
          
          <ShareButtons 
            title={post.title}
            url={`/blog/${post.slug}`}
          />
        </div>

        {/* Content with Table of Contents */}
        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <div 
              id="blog-content"
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
          
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <TableOfContents headings={headings} />
            </div>
          </div>
        </div>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="mt-8 pt-6 border-t">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag.id} variant="outline">
                  {tag.name}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}