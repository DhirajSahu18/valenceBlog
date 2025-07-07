'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Twitter, Linkedin, Link, Share2 } from 'lucide-react';

interface ShareButtonsProps {
  title: string;
  url: string;
}

export function ShareButtons({ title, url }: ShareButtonsProps) {
  const [isSharing, setIsSharing] = useState(false);

  const fullUrl = typeof window !== 'undefined' ? window.location.origin + url : url;

  const shareOnTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(fullUrl)}`;
    window.open(twitterUrl, '_blank');
  };

  const shareOnLinkedIn = () => {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(fullUrl)}`;
    window.open(linkedInUrl, '_blank');
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      toast.success('Link copied to clipboard!');
    } catch (err) {
      toast.error('Failed to copy link');
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        setIsSharing(true);
        await navigator.share({
          title,
          url: fullUrl,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      } finally {
        setIsSharing(false);
      }
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={shareOnTwitter}
        className="flex items-center gap-2"
      >
        <Twitter className="h-4 w-4" />
        Twitter
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        onClick={shareOnLinkedIn}
        className="flex items-center gap-2"
      >
        <Linkedin className="h-4 w-4" />
        LinkedIn
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        onClick={copyLink}
        className="flex items-center gap-2"
      >
        <Link className="h-4 w-4" />
        Copy
      </Button>

      {typeof navigator !== 'undefined' && navigator.share && (
        <Button
          variant="outline"
          size="sm"
          onClick={handleNativeShare}
          disabled={isSharing}
          className="flex items-center gap-2"
        >
          <Share2 className="h-4 w-4" />
          Share
        </Button>
      )}
    </div>
  );
}