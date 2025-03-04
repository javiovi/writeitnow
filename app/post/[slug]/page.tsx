import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { formatDistanceToNow } from "date-fns"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { CommentSection } from "@/components/comment-section"
import { getPostBySlug, incrementPostView } from "@/lib/api"

interface PostPageProps {
  params: {
    slug: string
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  // Increment view count
  await incrementPostView(post.id)

  return (
    <div className="container py-8 px-4 md:px-6">
      <article className="mx-auto max-w-3xl">
        <div className="space-y-2 mb-8">
          <div className="flex flex-wrap gap-2">
            {post.categories.map((category) => (
              <Badge key={category} variant="secondary">
                {category}
              </Badge>
            ))}
          </div>
          <h1 className="text-4xl font-bold tracking-tight">{post.title}</h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={post.author.image} alt={post.author.name} />
                <AvatarFallback>{post.author.name.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <span>{post.author.name}</span>
            </div>
            <Separator orientation="vertical" className="h-4" />
            <span>{formatDistanceToNow(new Date(post.publishedAt), { addSuffix: true })}</span>
            <Separator orientation="vertical" className="h-4" />
            <span>{post.readingTime} min read</span>
          </div>
        </div>

        {post.coverImage && (
          <div className="mb-8 aspect-video relative overflow-hidden rounded-lg">
            <Image
              src={post.coverImage || "/placeholder.svg"}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <div
          className="prose prose-gray dark:prose-invert max-w-none mb-12"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />

        <Separator className="my-8" />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-10 w-10">
              <AvatarImage src={post.author.image} alt={post.author.name} />
              <AvatarFallback>{post.author.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{post.author.name}</p>
              <p className="text-sm text-muted-foreground">{post.author.bio}</p>
            </div>
          </div>
          <Button variant="outline" asChild>
            <Link href={`/author/${post.author.username}`}>View Profile</Link>
          </Button>
        </div>

        <Separator className="my-8" />

        <CommentSection postId={post.id} comments={post.comments} />
      </article>
    </div>
  )
}

