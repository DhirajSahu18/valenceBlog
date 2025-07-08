"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PlusCircle, FileText, Users, BarChart3, Settings } from "lucide-react";
import AdminDashboardPosts from "./admin-dashboard-posts";
import AdminDashboardUsers from "./admin-dashboard-users";
import { NewPostModal } from "@/components/ui/newPostModal";

export interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage: string;
  published: boolean;
  publishedAt: string; // could be Date if parsed
  readingTime: number;
  views: number;
  authorId: string;
  createdAt: string;
  updatedAt: string;
  author: {
    id: string;
    name: string;
    email: string;
    emailVerified: string | null;
    image: string | null;
    role: "USER" | "ADMIN"; // adjust if more roles exist
    createdAt: string;
    updatedAt: string;
  };
  categories: {
    id: string;
    name: string;
    slug: string;
    description: string;
    color: string;
    createdAt: string;
    updatedAt: string;
  }[];
  tags: {
    id: string;
    name: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
  }[];
  seo: {
    id: string;
    title: string;
    description: string;
    keywords: string;
    ogImage: string;
    postId: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage: string;
  published: boolean;
  publishedAt: string;
  readingTime: number;
  views: number;
  authorId: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: string | null;
  image: string | null;
  role: "USER" | "ADMIN"; // Add more roles if needed
  createdAt: string;
  updatedAt: string;
  posts: Post[];
}

export function AdminDashboard() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]); // Adjust type as needed
  const totalViews = posts.reduce((acc, post) => acc + post?.views, 0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const averageReadingTime = (() => {
    const allPosts = users.flatMap((user) => user.posts);
    if (!allPosts) return 0;
    const totalReadingTime = allPosts.reduce((acc, post) => {
      return acc + post.readingTime;
    }, 0);
    return Math.round((totalReadingTime / allPosts.length) * 10) / 10;
  })();

  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/posts");
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    if (!posts.length) {
      fetchPosts();
    }
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/users");
        if (!res.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await res.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    if (!users.length) {
      fetchUsers();
    }
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your blog content and settings</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <PlusCircle className="h-4 w-4 mr-2" />
          New Post
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Posts
                </CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{posts.length}</div>
                <p className="text-xs text-muted-foreground">
                  +2 from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Views
                </CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalViews}</div>
                <p className="text-xs text-muted-foreground">
                  +180 from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Users
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{users.length}</div>
                <p className="text-xs text-muted-foreground">
                  +1 from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Avg. Reading Time
                </CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {averageReadingTime ? averageReadingTime : "No Views"}
                </div>
                <p className="text-xs text-muted-foreground">
                  +0.3 from last month
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="posts">
          <Card>
            <CardHeader>
              <CardTitle>Recent Posts</CardTitle>
              <CardDescription>Manage your blog posts</CardDescription>
            </CardHeader>
            <CardContent>
              {posts.length === 0 ? (
                <div className="space-y-4">
                  <p className="text-center text-gray-500 py-8">
                    No posts yet. Create your first post to get started!
                  </p>
                </div>
              ) : (
                <AdminDashboardPosts posts={posts} />
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>
                Manage user accounts and permissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              {users.length === 0 ? (
                <div className="space-y-4">
                  <p className="text-center text-gray-500 py-8">
                    No users found. Invite users to manage your blog.
                  </p>
                </div>
              ) : (
                <AdminDashboardUsers users={users} />
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
              <CardDescription>Configure your blog settings</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-gray-500 py-8">
                Settings panel coming soon!
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <NewPostModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Post"
      >
        <form>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Post Title"
              className="w-full p-2 rounded bg-gray-100 dark:bg-[#2a2f36] text-black dark:text-white"
            />
            <textarea
              placeholder="Write your post content here..."
              className="w-full p-2 rounded bg-gray-100 dark:bg-[#2a2f36] text-black dark:text-white"
              rows={6}
            />
            <Button type="submit" className="w-full">
              Publish
            </Button>
          </div>
        </form>
      </NewPostModal>
    </div>
  );
}
