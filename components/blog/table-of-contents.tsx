'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface TableOfContentsProps {
  headings: Array<{ id: string; text: string; level: number }>;
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '0% 0% -80% 0%' }
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) {
    return null;
  }

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="toc">
      <h3 className="text-sm font-semibold text-gray-900 mb-3">Table of Contents</h3>
      <ul className="space-y-2">
        {headings.map((heading) => (
          <li key={heading.id} style={{ paddingLeft: `${(heading.level - 1) * 1}rem` }}>
            <button
              onClick={() => scrollToHeading(heading.id)}
              className={cn(
                'text-left hover:text-blue-600 transition-colors',
                activeId === heading.id ? 'active' : ''
              )}
            >
              {heading.text}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}