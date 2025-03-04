import { createYoga } from "graphql-yoga"
import { schema } from "@/lib/schema"
import { NextResponse } from "next/server"

const { handleRequest } = createYoga({
  schema,
  graphqlEndpoint: "/api/graphql",
  fetchAPI: { Response: NextResponse },
})

export { handleRequest as GET, handleRequest as POST }

// This is a mock GraphQL API for demonstration purposes
// In a real app, you would use a proper GraphQL server like Apollo Server

// Mock data
const users = [
  {
    id: "user-1",
    name: "John Doe",
    username: "johndoe",
    email: "john@example.com",
    image: "/placeholder-user.jpg",
    bio: "Content creator and tech enthusiast",
  },
]

const posts = [
  {
    id: "post-1",
    title: "Getting Started with Next.js",
    slug: "getting-started-with-nextjs",
    content:
      "# Getting Started with Next.js\n\nNext.js is a React framework that enables server-side rendering and static site generation...",
    contentHtml:
      "<h1>Getting Started with Next.js</h1><p>Next.js is a React framework that enables server-side rendering and static site generation...</p>",
    excerpt: "Learn how to build modern web applications with Next.js",
    coverImage: "/placeholder.svg?height=600&width=1200",
    categories: ["Web Development", "React", "Next.js"],
    status: "published",
    publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    readingTime: 5,
    authorId: "user-1",
    views: 1250,
  },
  {
    id: "post-2",
    title: "Building a GraphQL API",
    slug: "building-a-graphql-api",
    content: "# Building a GraphQL API\n\nGraphQL is a query language for your API...",
    contentHtml: "<h1>Building a GraphQL API</h1><p>GraphQL is a query language for your API...</p>",
    excerpt: "Learn how to create efficient APIs with GraphQL",
    coverImage: "/placeholder.svg?height=600&width=1200",
    categories: ["API", "GraphQL", "Backend"],
    status: "published",
    publishedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
    readingTime: 8,
    authorId: "user-1",
    views: 980,
  },
  {
    id: "post-3",
    title: "PostgreSQL for Beginners",
    slug: "postgresql-for-beginners",
    content: "# PostgreSQL for Beginners\n\nPostgreSQL is a powerful, open-source object-relational database system...",
    contentHtml:
      "<h1>PostgreSQL for Beginners</h1><p>PostgreSQL is a powerful, open-source object-relational database system...</p>",
    excerpt: "A comprehensive guide to getting started with PostgreSQL",
    coverImage: "/placeholder.svg?height=600&width=1200",
    categories: ["Database", "PostgreSQL", "Backend"],
    status: "published",
    publishedAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString(),
    readingTime: 10,
    authorId: "user-1",
    views: 1560,
  },
]

const comments = [
  {
    id: "comment-1",
    content: "Great article! This helped me a lot with my project.",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    postId: "post-1",
    authorId: "user-1",
  },
  {
    id: "comment-2",
    content: "I've been looking for a clear explanation like this. Thanks!",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    postId: "post-2",
    authorId: "user-1",
  },
]

// export async function POST(request: NextRequest) {
//   const { query, variables } = await request.json()

//   // Simple GraphQL resolver
//   const resolvers: Record<string, Function> = {
//     featuredPosts: () => {
//       const featuredPosts = posts
//         .filter((post) => post.status === "published")
//         .sort((a, b) => new Date(b.publishedAt!).getTime() - new Date(a.publishedAt!).getTime())
//         .slice(0, 6)
//         .map((post) => ({
//           ...post,
//           author: users.find((user) => user.id === post.authorId),
//         }))

//       return featuredPosts
//     },

//     postBySlug: ({ slug }: { slug: string }) => {
//       const post = posts.find((p) => p.slug === slug && p.status === "published")

//       if (!post) return null

//       return {
//         ...post,
//         author: users.find((user) => user.id === post.authorId),
//         comments: comments
//           .filter((comment) => comment.postId === post.id)
//           .map((comment) => ({
//             ...comment,
//             author: users.find((user) => user.id === comment.authorId),
//           }))
//           .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
//       }
//     },

//     userPosts: ({ authorId }: { authorId: string }) => {
//       return posts
//         .filter((post) => post.authorId === authorId)
//         .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
//     },

//     userStats: ({ userId }: { userId: string }) => {
//       const userPosts = posts.filter((post) => post.authorId === userId)
//       const totalPosts = userPosts.length

//       const now = new Date()
//       const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate())

//       const postsThisMonth = userPosts.filter((post) => new Date(post.createdAt) > oneMonthAgo).length

//       const totalViews = userPosts.reduce((sum, post) => sum + (post.views || 0), 0)

//       const userComments = comments.filter((comment) => userPosts.some((post) => post.id === comment.postId))

//       const totalComments = userComments.length
//       const commentsThisMonth = userComments.filter((comment) => new Date(comment.createdAt) > oneMonthAgo).length

//       // Calculate engagement rate (comments per view)
//       const engagementRate = totalViews > 0 ? Math.round((totalComments / totalViews) * 100 * 10) / 10 : 0

//       return {
//         totalPosts,
//         postsThisMonth,
//         totalViews,
//         viewsThisMonth: Math.round(totalViews * 0.3), // Mock data
//         totalComments,
//         commentsThisMonth,
//         engagementRate,
//         engagementDelta: 0.5, // Mock data
//       }
//     },

//     createPost: ({ input }: { input: any }) => {
//       const newPost = {
//         id: `post-${posts.length + 1}`,
//         slug: input.title
//           .toLowerCase()
//           .replace(/[^\w\s]/gi, "")
//           .replace(/\s+/g, "-"),
//         ...input,
//         createdAt: new Date().toISOString(),
//         updatedAt: new Date().toISOString(),
//         views: 0,
//       }

//       posts.push(newPost)

//       return newPost
//     },

//     updatePost: ({ id, input }: { id: string; input: any }) => {
//       const postIndex = posts.findIndex((p) => p.id === id)

//       if (postIndex === -1) {
//         throw new Error("Post not found")
//       }

//       posts[postIndex] = {
//         ...posts[postIndex],
//         ...input,
//         updatedAt: new Date().toISOString(),
//       }

//       return posts[postIndex]
//     },

//     deletePost: ({ id }: { id: string }) => {
//       const postIndex = posts.findIndex((p) => p.id === id)

//       if (postIndex === -1) {
//         throw new Error("Post not found")
//       }

//       posts.splice(postIndex, 1)

//       return true
//     },

//     addComment: ({ input }: { input: any }) => {
//       const newComment = {
//         id: `comment-${comments.length + 1}`,
//         ...input,
//         createdAt: new Date().toISOString(),
//       }

//       comments.push(newComment)

//       return {
//         ...newComment,
//         author: users.find((user) => user.id === newComment.authorId),
//       }
//     },

//     incrementPostView: ({ postId }: { postId: string }) => {
//       const post = posts.find((p) => p.id === postId)

//       if (post) {
//         post.views = (post.views || 0) + 1
//       }

//       return true
//     },
//   }

//   // Extract operation name from query
//   const operationMatch = query.match(/(?:query|mutation)\s+(\w+)|{\s*(\w+)/)
//   let operationName = operationMatch ? operationMatch[1] || operationMatch[2] : Object.keys(variables || {})[0]

//   // Handle unnamed queries
//   if (!operationName) {
//     const firstFieldMatch = query.match(/{[\s\n]*(\w+)/)
//     operationName = firstFieldMatch ? firstFieldMatch[1] : null
//   }

//   if (!operationName || !resolvers[operationName]) {
//     return NextResponse.json(
//       {
//         errors: [{ message: `Operation "${operationName}" not supported` }],
//       },
//       { status: 400 },
//     )
//   }

//   try {
//     const result = resolvers[operationName](variables || {})
//     return NextResponse.json({ data: { [operationName]: result } })
//   } catch (error) {
//     return NextResponse.json(
//       {
//         errors: [{ message: error instanceof Error ? error.message : "Unknown error" }],
//       },
//       { status: 500 },
//     )
//   }
// }

