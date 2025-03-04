import { graphql } from "@/lib/graphql"
import { getCurrentUser } from "@/lib/auth"
import type { Post, UserStats } from "@/lib/types"

export async function getFeaturedPosts(): Promise<Post[]> {
  try {
    const { data } = await graphql(`
      query FeaturedPosts {
        featuredPosts {
          id
          title
          slug
          excerpt
          coverImage
          publishedAt
          categories
          author {
            name
            image
          }
        }
      }
    `)

    return data?.featuredPosts || []
  } catch (error) {
    console.error("Error fetching featured posts:", error)
    return []
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const { data } = await graphql(
    `
    query PostBySlug($slug: String!) {
      postBySlug(slug: $slug) {
        id
        title
        slug
        content
        contentHtml
        excerpt
        coverImage
        categories
        publishedAt
        readingTime
        author {
          id
          name
          username
          image
          bio
        }
        comments {
          id
          content
          createdAt
          author {
            id
            name
            username
            image
          }
        }
      }
    }
  `,
    {
      slug,
    },
  )

  return data.postBySlug
}

export async function getUserPosts(): Promise<Post[]> {
  const user = await getCurrentUser()
  if (!user) {
    return []
  }

  const { data } = await graphql(
    `
    query UserPosts($authorId: ID!) {
      userPosts(authorId: $authorId) {
        id
        title
        slug
        status
        publishedAt
        updatedAt
      }
    }
  `,
    {
      authorId: user.id,
    },
  )

  return data.userPosts
}

export async function getUserStats(): Promise<UserStats> {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error("Unauthorized")
  }

  const { data } = await graphql(
    `
    query UserStats($userId: ID!) {
      userStats(userId: $userId) {
        totalPosts
        postsThisMonth
        totalViews
        viewsThisMonth
        totalComments
        commentsThisMonth
        engagementRate
        engagementDelta
      }
    }
  `,
    {
      userId: user.id,
    },
  )

  return data.userStats
}

export async function incrementPostView(postId: string): Promise<void> {
  await graphql(
    `
    mutation IncrementPostView($postId: ID!) {
      incrementPostView(postId: $postId)
    }
  `,
    {
      postId,
    },
  )
}

