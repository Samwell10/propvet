'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { AlertTriangle } from 'lucide-react'
import Head from 'next/head'

export default function NotFound() {
  return (
    <>
      <Head>
        <title>Request Not Found | Propvet Admin</title>
      </Head>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <Card className="p-8 text-center max-w-md">
          <div className="flex justify-center mb-4">
            <AlertTriangle className="h-10 w-10 text-yellow-500" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Request Not Found</h2>
          <p className="text-gray-500 mb-6">
            The verification request you're looking for doesn't exist or may have been removed.
          </p>
          <Button asChild>
            <Link href="/admin/requests">Back to Requests</Link>
          </Button>
        </Card>
      </div>
    </>
  )
}