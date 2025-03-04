import Link from "next/link"
import Image from "next/image"
import { formatDistanceToNow } from "date-fns"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import type { Post } from "@/lib/types"

interface BlogPostCardProps {
  post: Post
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <Link href={`/post/${post.slug}`}>
        <div className="aspect-video relative overflow-hidden">
          <Image
            src={post.coverImage || "/placeholder.svg?height=400&width=600"}
            alt={post.title}
            fill
            className="object-cover transition-transform hover:scale-105"
          />
        </div>
        <CardHeader className="p-4">
          <div className="space-y-2">
            <div className="flex flex-wrap gap-2">
              {post.categories.map((category) => (
                <Badge key={category} variant="secondary" className="px-2 py-0 text-xs">
                  {category}
                </Badge>
              ))}
            </div>
            <h3 className="font-semibold text-xl line-clamp-2">{post.title}</h3>
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex items-center">
          <Avatar className="h-8 w-8 mr-2">
            <AvatarImage src={post.author.image} alt={post.author.name} />
            <AvatarFallback>{post.author.name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium">{post.author.name}</span>
            <span className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(post.publishedAt), { addSuffix: true })}
            </span>
          </div>
        </CardFooter>
      </Link>
    </Card>
  )
}

