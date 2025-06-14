import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

// This is the fallback page shown when a specific property isn't found
export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      {/* Display error card in center of screen */}
      <Card className="p-8 text-center max-w-md">
        {/* Title */}
        <h2 className="text-2xl font-bold mb-4">Property Not Found</h2>

        {/* Message to the user */}
        <p className="text-gray-500 mb-6">
          The property you're looking for doesn't exist or doesn't require clarification.
        </p>

        {/* Button to return to the company properties page */}
        <Button asChild>
          <Link href="/dashboard/company/properties">
            Back to Properties
          </Link>
        </Button>
      </Card>
    </div>
  )
}