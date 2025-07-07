'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Category } from '@prisma/client';
import { Hash, X } from 'lucide-react';

interface BlogSidebarProps {
  categories: Category[];
}

export function BlogSidebar({ categories }: BlogSidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    setSelectedCategory(searchParams.get('category'));
  }, [searchParams]);

  const handleCategoryClick = (categorySlug: string) => {
    const params = new URLSearchParams(searchParams);
    if (selectedCategory === categorySlug) {
      params.delete('category');
    } else {
      params.set('category', categorySlug);
    }
    params.delete('page');
    router.push(`/blog?${params.toString()}`);
  };

  const clearFilters = () => {
    router.push('/blog');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Hash className="h-5 w-5" />
            Categories
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.slug ? 'default' : 'ghost'}
                className="w-full justify-start"
                onClick={() => handleCategoryClick(category.slug)}
              >
                <div
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: category.color }}
                />
                {category.name}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {(selectedCategory || searchParams.get('search')) && (
        <Card>
          <CardHeader>
            <CardTitle>Active Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {selectedCategory && (
                <Badge variant="secondary" className="flex items-center gap-2">
                  Category: {categories.find(c => c.slug === selectedCategory)?.name}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => handleCategoryClick(selectedCategory)} />
                </Badge>
              )}
              {searchParams.get('search') && (
                <Badge variant="secondary" className="flex items-center gap-2">
                  Search: {searchParams.get('search')}
                </Badge>
              )}
              <Button variant="outline" size="sm" onClick={clearFilters} className="w-full">
                Clear All Filters
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}