import { BarChart, BookOpen, Eye, MessageSquare } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { UserStats } from "@/lib/types"

interface DashboardStatsProps {
  stats: UserStats
}

export function DashboardStats({ stats }: DashboardStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
          <BookOpen className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalPosts}</div>
          <p className="text-xs text-muted-foreground">
            {stats.postsThisMonth > 0 ? `+${stats.postsThisMonth} this month` : "No new posts this month"}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Views</CardTitle>
          <Eye className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalViews.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">
            {stats.viewsThisMonth > 0 ? `+${stats.viewsThisMonth.toLocaleString()} this month` : "No views this month"}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Comments</CardTitle>
          <MessageSquare className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalComments}</div>
          <p className="text-xs text-muted-foreground">
            {stats.commentsThisMonth > 0 ? `+${stats.commentsThisMonth} this month` : "No new comments this month"}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
          <BarChart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.engagementRate}%</div>
          <p className="text-xs text-muted-foreground">
            {stats.engagementDelta > 0
              ? `+${stats.engagementDelta}% from last month`
              : stats.engagementDelta < 0
                ? `${stats.engagementDelta}% from last month`
                : "Same as last month"}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

