'use client'

import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, Mail, Phone } from "lucide-react"

export default function Profile() {
  const router = useRouter()
  const { user, isAuthenticated } = useAuth()

  // Redirect to login if user is not authenticated or not an individual
  if (!isAuthenticated || user?.role !== 'individual') {
    router.push('/login')
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar for dashboard navigation */}
      <DashboardSidebar />
      
      <div className="lg:pl-64">
        {/* Top bar title */}
        <div className="flex h-14 items-center border-b bg-white dark:bg-gray-800 px-6">
          <h1 className="text-lg font-semibold">My Information</h1>
        </div>

        <main className="p-6">
          {/* Profile form card */}
          <Card className="max-w-2xl mx-auto p-6">
            <div className="space-y-6">
              <div className="space-y-4">
                {/* Full Name */}
                <div>
                  <Label htmlFor="fullName">Full Name</Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-4 w-4 text-gray-400" />
                    </div>
                    <Input
                      id="fullName"
                      className="pl-10"
                      defaultValue={user?.name}
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-4 w-4 text-gray-400" />
                    </div>
                    <Input
                      id="email"
                      type="email"
                      className="pl-10"
                      defaultValue={user?.email}
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-4 w-4 text-gray-400" />
                    </div>
                    <Input
                      id="phone"
                      className="pl-10"
                      placeholder="+234 801 234 5678"
                    />
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex justify-end space-x-4">
                <Button variant="outline">Cancel</Button>
                <Button className="bg-green-600 hover:bg-green-700">Save Changes</Button>
              </div>
            </div>
          </Card>
        </main>
      </div>
    </div>
  )
}