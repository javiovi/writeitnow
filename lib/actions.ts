"use server"

import { revalidatePath } from "next/cache"
import { graphql } from "@/lib/graphql"
import { getCurrentUser } from "@/lib/auth"
import type { Comment } from "@/lib/types"

export async function createPost(postData: any) {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error("Unauthorized")
  }

  const { data, errors } = await graphql(
    `
    mutation CreatePost($input: CreatePostInput!) {
      createPost(input: $input) {
        id
        slug
      }
    }
  `,
    {
      input: {
        ...postData,
        authorId: user.id,
      },
    },
  )

  if (errors) {
    throw new Error(errors[0].message)
  }

  revalidatePath("/dashboard")
  return data.createPost
}

export async function updatePost(id: string, postData: any) {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error("Unauthorized")
  }

  const { data, errors } = await graphql(
    `
    mutation UpdatePost($id: ID!, $input: UpdatePostInput!) {
      updatePost(id: $id, input: $input) {
        id
        slug
      }
    }
  `,
    {
      id,
      input: postData,
    },
  )

  if (errors) {
    throw new Error(errors[0].message)
  }

  revalidatePath("/dashboard")
  revalidatePath(`/post/${data.updatePost.slug}`)
  return data.updatePost
}

export async function deletePost(id: string) {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error("Unauthorized")
  }

  const { errors } = await graphql(
    `
    mutation DeletePost($id: ID!) {
      deletePost(id: $id)
    }
  `,
    {
      id,
    },
  )

  if (errors) {
    throw new Error(errors[0].message)
  }

  revalidatePath("/dashboard")
}

export async function addComment(postId: string, content: string): Promise<Comment> {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error("Unauthorized")
  }

  const { data, errors } = await graphql(
    `
    mutation AddComment($input: AddCommentInput!) {
      addComment(input: $input) {
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
  `,
    {
      input: {
        postId,
        content,
        authorId: user.id,
      },
    },
  )

  if (errors) {
    throw new Error(errors[0].message)
  }

  revalidatePath(`/post/[slug]`)
  return data.addComment
}

