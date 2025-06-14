'use client'

import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Lock } from "lucide-react"

export default function Settings() {
  const router = useRouter()
  const { user, isAuthenticated, logout } = useAuth()

  // Redirect to login if not authenticated or not an individual
  if (!isAuthenticated || user?.role !== 'individual') {
    router.push('/login')
    return null
  }

  // Placeholder function for deleting account
  const handleDeleteAccount = () => {
    // TODO: Integrate backend call to actually delete user account
    logout()
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Dashboard sidebar */}
      <DashboardSidebar />
      
      <div className="lg:pl-64">
        {/* Page header */}
        <div className="flex h-14 items-center border-b bg-white dark:bg-gray-800 px-6">
          <h1 className="text-lg font-semibold">Account Settings</h1>
        </div>

        <main className="p-6">
          <Card className="max-w-2xl mx-auto p-6">
            <div className="space-y-8">
              
              {/* Change Password Section */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Change Password</h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input id="currentPassword" type="password" />
                  </div>
                  <div>
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input id="newPassword" type="password" />
                  </div>
                  <div>
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input id="confirmPassword" type="password" />
                  </div>
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    Update Password
                  </Button>
                </div>
              </div>

              {/* Delete Account Section */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Delete Account</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  Once you delete your account, there is no going back. Please be certain.
                </p>
                
                {/* Confirmation dialog before account deletion */}
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" className="w-full">
                      <Lock className="h-4 w-4 mr-2" />
                      Delete Account
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove all your data from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleDeleteAccount}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        Delete Account
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </Card>
        </main>
      </div>
    </div>
  )
}