"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { CalendarIcon, Save } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RichTextEditor } from "@/components/rich-text-editor"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Switch } from "@/components/ui/switch"
import { createPost, updatePost } from "@/lib/actions"
import type { Post } from "@/lib/types"

interface PostEditorProps {
  post?: Post
}

export function PostEditor({ post }: PostEditorProps) {
  const router = useRouter()
  const [title, setTitle] = useState(post?.title || "")
  const [content, setContent] = useState(post?.content || "")
  const [excerpt, setExcerpt] = useState(post?.excerpt || "")
  const [coverImage, setCoverImage] = useState(post?.coverImage || "")
  const [categories, setCategories] = useState<string[]>(post?.categories || [])
  const [categoryInput, setCategoryInput] = useState("")
  const [publishDate, setPublishDate] = useState<Date | undefined>(
    post?.publishedAt ? new Date(post.publishedAt) : undefined,
  )
  const [isScheduled, setIsScheduled] = useState(!!post?.publishedAt && new Date(post.publishedAt) > new Date())
  const [isSaving, setIsSaving] = useState(false)

  const handleAddCategory = () => {
    if (categoryInput && !categories.includes(categoryInput)) {
      setCategories([...categories, categoryInput])
      setCategoryInput("")
    }
  }

  const handleRemoveCategory = (category: string) => {
    setCategories(categories.filter((c) => c !== category))
  }

  const handleSave = async (status: "draft" | "published" | "scheduled") => {
    setIsSaving(true)
    try {
      const postData = {
        title,
        content,
        excerpt,
        coverImage,
        categories,
        status,
        publishedAt: status === "scheduled" ? publishDate : status === "published" ? new Date() : null,
      }

      if (post) {
        await updatePost(post.id, postData)
      } else {
        await createPost(postData)
      }

      router.push("/dashboard")
      router.refresh()
    } catch (error) {
      console.error("Failed to save post:", error)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          placeholder="Enter post title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-lg"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="excerpt">Excerpt</Label>
        <Textarea
          id="excerpt"
          placeholder="Brief summary of your post"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          className="min-h-[80px]"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="coverImage">Cover Image URL</Label>
        <Input
          id="coverImage"
          placeholder="https://example.com/image.jpg"
          value={coverImage}
          onChange={(e) => setCoverImage(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label>Categories</Label>
        <div className="flex flex-wrap gap-2 mb-2">
          {categories.map((category) => (
            <Badge key={category} variant="secondary" className="px-3 py-1">
              {category}
              <button
                type="button"
                className="ml-2 text-muted-foreground hover:text-foreground"
                onClick={() => handleRemoveCategory(category)}
              >
                ×
              </button>
            </Badge>
          ))}
        </div>
        <div className="flex gap-2">
          <Input
            placeholder="Add a category"
            value={categoryInput}
            onChange={(e) => setCategoryInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddCategory())}
          />
          <Button type="button" variant="outline" onClick={handleAddCategory}>
            Add
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Content</Label>
        <RichTextEditor value={content} onChange={setContent} />
      </div>

      <div className="flex items-center space-x-2">
        <Switch id="scheduled" checked={isScheduled} onCheckedChange={setIsScheduled} />
        <Label htmlFor="scheduled">Schedule for later</Label>

        {isScheduled && (
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="ml-4">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {publishDate ? format(publishDate, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={publishDate} onSelect={setPublishDate} initialFocus />
            </PopoverContent>
          </Popover>
        )}
      </div>

      <div className="flex justify-end gap-4">
        <Button variant="outline" onClick={() => handleSave("draft")} disabled={isSaving}>
          Save as Draft
        </Button>
        <Button
          onClick={() => handleSave(isScheduled ? "scheduled" : "published")}
          disabled={isSaving || (isScheduled && !publishDate)}
        >
          <Save className="mr-2 h-4 w-4" />
          {isScheduled ? "Schedule" : "Publish"} Post
        </Button>
      </div>
    </div>
  )
}

