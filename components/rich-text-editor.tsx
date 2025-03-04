"use client"

import { useState, useRef } from "react"
import { Bold, Italic, Link, List, ListOrdered, Image, Heading1, Heading2, Heading3, Quote } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  className?: string
}

export function RichTextEditor({ value, onChange, className }: RichTextEditorProps) {
  const [mode, setMode] = useState<"visual" | "markdown">("visual")
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const insertMarkdown = (prefix: string, suffix = "") => {
    if (!textareaRef.current) return

    const textarea = textareaRef.current
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = value.substring(start, end)

    const beforeText = value.substring(0, start)
    const afterText = value.substring(end)

    const newValue = beforeText + prefix + selectedText + suffix + afterText
    onChange(newValue)

    // Set cursor position after the operation
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + prefix.length, end + prefix.length)
    }, 0)
  }

  const handleToolbarAction = (action: string) => {
    switch (action) {
      case "bold":
        insertMarkdown("**", "**")
        break
      case "italic":
        insertMarkdown("*", "*")
        break
      case "link":
        insertMarkdown("[", "](url)")
        break
      case "list":
        insertMarkdown("- ")
        break
      case "ordered-list":
        insertMarkdown("1. ")
        break
      case "image":
        insertMarkdown("![alt text](", ")")
        break
      case "h1":
        insertMarkdown("# ")
        break
      case "h2":
        insertMarkdown("## ")
        break
      case "h3":
        insertMarkdown("### ")
        break
      case "quote":
        insertMarkdown("> ")
        break
      default:
        break
    }
  }

  // Simple markdown preview renderer
  const renderMarkdown = (markdown: string) => {
    // This is a very basic implementation
    // In a real app, you'd use a proper markdown parser
    let html = markdown
      .replace(/^# (.*$)/gm, "<h1>$1</h1>")
      .replace(/^## (.*$)/gm, "<h2>$1</h2>")
      .replace(/^### (.*$)/gm, "<h3>$1</h3>")
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/\[(.*?)\]$$(.*?)$$/g, '<a href="$2">$1</a>')
      .replace(/!\[(.*?)\]$$(.*?)$$/g, '<img alt="$1" src="$2" />')
      .replace(/^- (.*$)/gm, "<li>$1</li>")
      .replace(/^> (.*$)/gm, "<blockquote>$1</blockquote>")

    // Split by newlines and wrap paragraphs
    html = html
      .split("\n\n")
      .map((para) => {
        if (
          !para.startsWith("<h1>") &&
          !para.startsWith("<h2>") &&
          !para.startsWith("<h3>") &&
          !para.startsWith("<li>") &&
          !para.startsWith("<blockquote>")
        ) {
          return `<p>${para}</p>`
        }
        return para
      })
      .join("")

    return html
  }

  return (
    <div className={cn("border rounded-md", className)}>
      <div className="flex items-center gap-1 p-1 border-b bg-muted/50">
        <Button variant="ghost" size="icon" onClick={() => handleToolbarAction("bold")} title="Bold">
          <Bold className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => handleToolbarAction("italic")} title="Italic">
          <Italic className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => handleToolbarAction("link")} title="Link">
          <Link className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => handleToolbarAction("list")} title="Bullet List">
          <List className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => handleToolbarAction("ordered-list")} title="Numbered List">
          <ListOrdered className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => handleToolbarAction("image")} title="Image">
          <Image className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => handleToolbarAction("h1")} title="Heading 1">
          <Heading1 className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => handleToolbarAction("h2")} title="Heading 2">
          <Heading2 className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => handleToolbarAction("h3")} title="Heading 3">
          <Heading3 className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => handleToolbarAction("quote")} title="Quote">
          <Quote className="h-4 w-4" />
        </Button>
      </div>

      <Tabs defaultValue="visual" onValueChange={(v) => setMode(v as "visual" | "markdown")}>
        <TabsList className="ml-2 mt-2">
          <TabsTrigger value="visual">Visual</TabsTrigger>
          <TabsTrigger value="markdown">Markdown</TabsTrigger>
        </TabsList>
        <TabsContent value="visual" className="p-4">
          <Textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Write your content here..."
            className="min-h-[300px] resize-y border-0 focus-visible:ring-0 p-0"
          />
        </TabsContent>
        <TabsContent value="markdown" className="p-4">
          <div
            className="min-h-[300px] prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(value) }}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}

