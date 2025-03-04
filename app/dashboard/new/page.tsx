import { PostEditor } from "@/components/post-editor"
import { requireAuth } from "@/lib/auth"

export default async function NewPostPage() {
  await requireAuth()

  return (
    <div className="container py-8 px-4 md:px-6">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Create New Post</h1>
      <PostEditor />
    </div>
  )
}

