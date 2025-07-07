import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { BlogPost } from '@/lib/blog';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatReadingTime } from '@/lib/utils/reading-time';
import { Clock, Eye } from 'lucide-react';

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow duration-200">
      <Link href={`/blog/${post.slug}`}>
        <div className="aspect-video relative overflow-hidden rounded-t-lg">
          <Image
            src={post.coverImage || `https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=800&h=450&dpr=1`}
            alt={post.title}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>
      
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          {post.categories.map((category) => (
            <Badge key={category.id} variant="secondary" style={{ backgroundColor: category.color + '20', color: category.color }}>
              {category.name}
            </Badge>
          ))}
        </div>
        
        <Link href={`/blog/${post.slug}`}>
          <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
            {post.title}
          </h3>
        </Link>
        
        {post.excerpt && (
          <p className="text-gray-600 mb-4 line-clamp-3">
            {post.excerpt}
          </p>
        )}
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={post.author.image || ''} alt={post.author.name || ''} />
              <AvatarFallback>
                {post.author.name?.charAt(0) || 'U'}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium text-gray-900">{post.author.name}</p>
              <p className="text-xs text-gray-500">
                {post.publishedAt && format(post.publishedAt, 'MMM d, yyyy')}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {formatReadingTime(post.readingTime || 5)}
            </div>
            <div className="flex items-center gap-1">
              <Eye className="h-3 w-3" />
              {post.views}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}