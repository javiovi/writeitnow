"use client"

import { useState } from "react"
import { formatDistanceToNow } from "date-fns"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import type { Comment } from "@/lib/types"
import { addComment } from "@/lib/actions"

interface CommentSectionProps {
  postId: string
  comments: Comment[]
}

export function CommentSection({ postId, comments: initialComments }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments)
  const [newComment, setNewComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmitComment = async () => {
    if (!newComment.trim()) return

    setIsSubmitting(true)
    try {
      const comment = await addComment(postId, newComment)
      setComments([comment, ...comments])
      setNewComment("")
    } catch (error) {
      console.error("Failed to add comment:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight">Comments ({comments.length})</h2>

      <div className="space-y-4">
        <Textarea
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="min-h-[100px]"
        />
        <div className="flex justify-end">
          <Button onClick={handleSubmitComment} disabled={isSubmitting || !newComment.trim()}>
            {isSubmitting ? "Posting..." : "Post Comment"}
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        {comments.length === 0 ? (
          <p className="text-center text-muted-foreground py-6">No comments yet. Be the first to comment!</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="flex gap-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src={comment.author.image} alt={comment.author.name} />
                <AvatarFallback>{comment.author.name.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{comment.author.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                  </span>
                </div>
                <p className="text-sm">{comment.content}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

