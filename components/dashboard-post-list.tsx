import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { Edit, MoreHorizontal, Trash } from "lucide-react"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Post } from "@/lib/types"
import { deletePost } from "@/lib/actions"

interface DashboardPostListProps {
  posts: Post[]
}

export function DashboardPostList({ posts }: DashboardPostListProps) {
  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-muted-foreground mb-4">No posts found</p>
        <Button asChild>
          <Link href="/dashboard/new">Create your first post</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div key={post.id} className="flex items-center justify-between p-4 border rounded-lg">
          <div className="grid gap-1">
            <Link href={`/dashboard/edit/${post.id}`} className="font-medium hover:underline">
              {post.title}
            </Link>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{formatDistanceToNow(new Date(post.updatedAt), { addSuffix: true })}</span>
              <span>•</span>
              <Badge variant={post.status === "published" ? "default" : "outline"} className="text-xs">
                {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
              </Badge>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
              <Link href={`/dashboard/edit/${post.id}`}>
                <Edit className="h-4 w-4" />
                <span className="sr-only">Edit</span>
              </Link>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">More</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href={`/post/${post.slug}`}>View Post</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={`/dashboard/edit/${post.id}`}>Edit</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-destructive focus:text-destructive" asChild>
                  <button className="w-full text-left cursor-pointer" onClick={() => deletePost(post.id)}>
                    <Trash className="mr-2 h-4 w-4" />
                    Delete
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      ))}
    </div>
  )
}

