import { makeExecutableSchema } from "@graphql-tools/schema"

const typeDefs = `
  type Author {
    id: ID!
    name: String!
    image: String
  }

  type Post {
    id: ID!
    title: String!
    slug: String!
    excerpt: String!
    coverImage: String
    publishedAt: String
    categories: [String!]!
    author: Author!
  }

  type Query {
    featuredPosts: [Post!]!
  }
`

const authors = [
  { id: "1", name: "John Doe", image: "/placeholder-user.jpg" },
  { id: "2", name: "Jane Smith", image: "/placeholder-user.jpg" },
]

const posts = [
  {
    id: "1",
    title: "Getting Started with Write It Now!",
    slug: "getting-started-with-write-it-now",
    excerpt: "Learn how to use our powerful blogging platform.",
    coverImage: "/placeholder.svg?height=600&width=1200",
    publishedAt: "2023-06-01T00:00:00Z",
    categories: ["Tutorial", "Blogging"],
    authorId: "1",
  },
  {
    id: "2",
    title: "Top 10 Writing Tips",
    slug: "top-10-writing-tips",
    excerpt: "Improve your writing skills with these expert tips.",
    coverImage: "/placeholder.svg?height=600&width=1200",
    publishedAt: "2023-06-05T00:00:00Z",
    categories: ["Writing", "Advice"],
    authorId: "2",
  },
]

const resolvers = {
  Query: {
    featuredPosts: () => posts,
  },
  Post: {
    author: (post: any) => authors.find((author) => author.id === post.authorId),
  },
}

export const schema = makeExecutableSchema({ typeDefs, resolvers })

