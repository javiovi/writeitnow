import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { BlogPostCard } from "@/components/blog-post-card"
import { getFeaturedPosts } from "@/lib/api"




// Datos mock para ejemplo
const mockPosts = [
  {
    slug: "getting-started-with-write-it-now",
    title: "Getting Started with Write It Now!",
    excerpt: "Learn how to use our powerful blogging platform.",
    coverImage: "/placeholder.svg?height=400&width=600",
    categories: ["Tutorial", "Blogging"],
    publishedAt: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000 * 2).toISOString(), // 2 years ago
    author: {
      name: "John Doe",
      image: "/avatars/john-doe.png"
    }
  },
  {
    slug: "top-10-writing-tips",
    title: "Top 10 Writing Tips",
    excerpt: "Improve your writing skills with these expert tips.",
    coverImage: "/placeholder.svg?height=400&width=600",
    categories: ["Writing", "Advice"],
    publishedAt: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString(), // 1 year ago
    author: {
      name: "Jane Smith",
      image: "/avatars/jane-smith.png"
    }
  }
]



export default async function Home() {
  const posts = (await getFeaturedPosts()) || []

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Share your ideas with the world
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  A high-performance blogging platform with a beautiful interface and powerful content management.
                </p>
              </div>
              <div className="space-x-4">
                <Button asChild>
                  <Link href="/dashboard/new">
                    Start Writing <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/explore">Explore Posts</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Featured Posts</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Discover the most engaging content from our community
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 mt-8">
              {mockPosts.map((post) => (
                <BlogPostCard key={post.slug} post={post} />
              ))}
            </div>
            <div className="flex justify-center mt-8">
              <Button variant="outline" asChild>
                <Link href="/explore">View All Posts</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

