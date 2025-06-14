import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

// Fallback page when a clarification request is not found
export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <Card className="p-8 text-center max-w-md">
        {/* Page title */}
        <h2 className="text-2xl font-bold mb-4">Request Not Found</h2>

        {/* Message explaining the issue */}
        <p className="text-gray-500 mb-6">
          The clarification request you're looking for doesn't exist.
        </p>

        {/* Navigation button back to user's request history */}
        <Button asChild>
          <Link href="/dashboard/individual/history">
            Back to History
          </Link>
        </Button>
      </Card>
    </div>
  )
}