export interface Post {
  slug: string
  title: string
  excerpt: string
  coverImage: string
  categories: string[]
  publishedAt: string
  author: {
    name: string
    image: string
  }
}


export interface Author {
  id: string
  name: string
  username: string
  image: string
  bio: string
}

export interface Comment {
  id: string
  content: string
  createdAt: string
  author: Author
}

export interface UserStats {
  totalPosts: number
  postsThisMonth: number
  totalViews: number
  viewsThisMonth: number
  totalComments: number
  commentsThisMonth: number
  engagementRate: number
  engagementDelta: number
}

