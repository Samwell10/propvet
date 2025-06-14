import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { SharedNav } from "@/components/shared-nav"
import { SharedFooter } from "@/components/shared-footer"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <SharedNav />
      
      <main className="flex-1 flex items-center justify-center py-20">
        <Card className="p-8 text-center max-w-md">
          <h2 className="text-2xl font-bold mb-4">Blog Post Not Found</h2>
          <p className="text-gray-500 mb-6">
            The blog post you're looking for doesn't exist or has been moved.
          </p>
          <Button asChild>
            <Link href="/blog">
              Back to Blog
            </Link>
          </Button>
        </Card>
      </main>

      <SharedFooter />
    </div>
  )
}