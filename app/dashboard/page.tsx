import Link from "next/link"
import { PlusCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardPostList } from "@/components/dashboard-post-list"
import { DashboardStats } from "@/components/dashboard-stats"
import { getUserPosts, getUserStats } from "@/lib/api"
import { requireAuth } from "@/lib/auth"

export default async function DashboardPage() {
  await requireAuth()
  const posts = await getUserPosts()
  const stats = await getUserStats()

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      <main className="flex-1 py-8">
        <div className="container px-4 md:px-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <Button asChild>
              <Link href="/dashboard/new">
                <PlusCircle className="mr-2 h-4 w-4" />
                New Post
              </Link>
            </Button>
          </div>
          <div className="grid gap-6">
            <DashboardStats stats={stats} />
            <Tabs defaultValue="published" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-4">
                <TabsTrigger value="published">Published</TabsTrigger>
                <TabsTrigger value="drafts">Drafts</TabsTrigger>
                <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
              </TabsList>
              <TabsContent value="published">
                <Card>
                  <CardHeader>
                    <CardTitle>Published Posts</CardTitle>
                    <CardDescription>Manage your published content</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <DashboardPostList posts={posts.filter((post) => post.status === "published")} />
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="drafts">
                <Card>
                  <CardHeader>
                    <CardTitle>Draft Posts</CardTitle>
                    <CardDescription>Continue working on your drafts</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <DashboardPostList posts={posts.filter((post) => post.status === "draft")} />
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="scheduled">
                <Card>
                  <CardHeader>
                    <CardTitle>Scheduled Posts</CardTitle>
                    <CardDescription>Posts scheduled for future publication</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <DashboardPostList posts={posts.filter((post) => post.status === "scheduled")} />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}

