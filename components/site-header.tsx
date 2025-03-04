import Link from "next/link"
import { Search, PenSquare } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "@/components/theme-toggle"
import { UserNav } from "@/components/user-nav"
import { WriteItNowLogo } from "@/components/write-it-now-logo"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center space-x-2">
          <WriteItNowLogo className="h-8 w-8" />
          <span className="font-bold text-xl">Write It Now!</span>
        </Link>
        <div className="hidden md:flex items-center space-x-4 lg:space-x-6 ml-6">
          <Link href="/explore" className="text-sm font-medium transition-colors hover:text-primary">
            Explore
          </Link>
          <Link
            href="/categories"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Categories
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            About
          </Link>
        </div>
        <div className="flex items-center space-x-4 flex-1 justify-end">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search..." className="pl-8 w-full" />
          </div>
        </div>
        <div className="flex items-center space-x-4 ml-4">
          <ThemeToggle />
          <Button variant="ghost" size="icon" asChild>
            <Link href="/dashboard/new">
              <PenSquare className="h-5 w-5" />
              <span className="sr-only">New Post</span>
            </Link>
          </Button>
          <UserNav />
        </div>
      </div>
    </header>
  )
}

