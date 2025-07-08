"use client";

import React from "react";
import Link from "next/link"; // ← Add this import
import { Post } from "./admin-dashboard";
import { format } from "date-fns";
import { formatReadingTime } from "@/lib/utils/reading-time";
import { Clock, Eye, Calendar } from "lucide-react";

interface AdminDashboardPostsProps {
  posts: Post[];
}

const AdminDashboardPosts = ({ posts }: AdminDashboardPostsProps) => {
  return (
    <div>
      {posts.map((post) => (
        <Link href={`/blog/${post.slug}`} key={post.id}>
          <div className="border-b p-4 bg-[#1b1e22] rounded-sm cursor-pointer relative hover:bg-[#2a2f36] transition-colors">
            <div className="text-lg font-semibold">{post.title}</div>

            <p className="absolute top-4 right-4 text-sm text-muted-foreground">
              {post.publishedAt &&
                format(new Date(post.publishedAt), "MMMM d, yyyy")}
            </p>

            <p className="text-sm text-muted-foreground mt-1">
              {post.content.slice(0, 100)}
              {post.content.length > 100 ? "..." : ""}
            </p>

            <p className="text-sm text-muted-foreground mt-2">
              {post.author?.name || "Unknown Author"}
            </p>
            <div className="flex justify-end gap-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {formatReadingTime(post.readingTime || 5)}
              </div>
              <div className="flex items-center gap-1">
                <Eye className="h-3 w-4" />
                {post.views} views
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default AdminDashboardPosts;
