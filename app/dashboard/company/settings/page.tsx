'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth"
import { CompanyDashboardSidebar } from "@/components/dashboard/company-sidebar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { 
  Lock, 
  Bell, 
  Shield, 
  Trash2, 
  Eye, 
  EyeOff,
  Download,
  CreditCard,
  Users,
  Mail
} from "lucide-react"

export default function CompanySettings() {
  const router = useRouter()
  const { user, isAuthenticated, logout } = useAuth()
  const { toast } = useToast()
  
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Password form state
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  })

  // Notification preferences
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
    propertyUpdates: true,
    marketingEmails: false,
    securityAlerts: true,
    weeklyReports: true
  })

  // Privacy settings
  const [privacy, setPrivacy] = useState({
    profileVisibility: "public",
    showContactInfo: true,
    allowDirectMessages: true,
    dataSharing: false
  })

  if (!isAuthenticated || user?.role !== 'company') {
    router.push('/login')
    return null
  }

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "New passwords do not match.",
      })
      return
    }

    if (passwordData.newPassword.length < 8) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Password must be at least 8 characters long.",
      })
      return
    }

    setIsLoading(true)

    try {
      // TODO: Implement API call to change password
      console.log('Changing password...')
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast({
        title: "Password updated",
        description: "Your password has been successfully changed.",
      })
      
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      })
    } catch (error) {
      console.error('Error changing password:', error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to change password. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleNotificationUpdate = async (key: string, value: boolean) => {
    setNotifications(prev => ({
      ...prev,
      [key]: value
    }))

    try {
      // TODO: Implement API call to update notification preferences
      console.log('Updating notification preferences:', { [key]: value })
      
      toast({
        title: "Preferences updated",
        description: "Your notification preferences have been saved.",
      })
    } catch (error) {
      console.error('Error updating preferences:', error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update preferences.",
      })
    }
  }

  const handlePrivacyUpdate = async (key: string, value: string | boolean) => {
    setPrivacy(prev => ({
      ...prev,
      [key]: value
    }))

    try {
      // TODO: Implement API call to update privacy settings
      console.log('Updating privacy settings:', { [key]: value })
      
      toast({
        title: "Privacy settings updated",
        description: "Your privacy settings have been saved.",
      })
    } catch (error) {
      console.error('Error updating privacy settings:', error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update privacy settings.",
      })
    }
  }

  const handleDeleteAccount = async () => {
    try {
      // TODO: Implement API call to delete account
      console.log('Deleting account...')
      
      toast({
        title: "Account deleted",
        description: "Your account has been permanently deleted.",
      })
      
      logout()
      router.push('/')
    } catch (error) {
      console.error('Error deleting account:', error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete account. Please try again.",
      })
    }
  }

  const handleExportData = async () => {
    try {
      // TODO: Implement API call to export data
      console.log('Exporting data...')
      
      toast({
        title: "Data export started",
        description: "You will receive an email with your data export shortly.",
      })
    } catch (error) {
      console.error('Error exporting data:', error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to export data. Please try again.",
      })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <CompanyDashboardSidebar />
      
      <div className="lg:pl-64">
        <div className="flex h-14 items-center border-b bg-white dark:bg-gray-800 px-6">
          <h1 className="text-lg font-semibold">Account Settings</h1>
        </div>

        <main className="p-6">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Security Settings */}
            <Card className="p-8">
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <Shield className="h-6 w-6 text-green-600" />
                  <h2 className="text-2xl font-semibold">Security Settings</h2>
                </div>
                
                <Separator />

                {/* Change Password */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Change Password</h3>
                  <form onSubmit={handlePasswordChange} className="space-y-4">
                    <div>
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <div className="relative">
                        <Input
                          id="currentPassword"
                          type={showCurrentPassword ? "text" : "password"}
                          value={passwordData.currentPassword}
                          onChange={(e) => setPasswordData(prev => ({
                            ...prev,
                            currentPassword: e.target.value
                          }))}
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        >
                          {showCurrentPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="newPassword">New Password</Label>
                      <div className="relative">
                        <Input
                          id="newPassword"
                          type={showNewPassword ? "text" : "password"}
                          value={passwordData.newPassword}
                          onChange={(e) => setPasswordData(prev => ({
                            ...prev,
                            newPassword: e.target.value
                          }))}
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                          {showNewPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <div className="relative">
                        <Input
                          id="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          value={passwordData.confirmPassword}
                          onChange={(e) => setPasswordData(prev => ({
                            ...prev,
                            confirmPassword: e.target.value
                          }))}
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="bg-green-600 hover:bg-green-700"
                      disabled={isLoading}
                    >
                      <Lock className="h-4 w-4 mr-2" />
                      {isLoading ? "Updating..." : "Update Password"}
                    </Button>
                  </form>
                </div>
              </div>
            </Card>

            {/* Notification Preferences */}
            <Card className="p-8">
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <Bell className="h-6 w-6 text-green-600" />
                  <h2 className="text-2xl font-semibold">Notification Preferences</h2>
                </div>
                
                <Separator />

                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-gray-500" />
                        <Label htmlFor="emailNotifications">Email Notifications</Label>
                      </div>
                      <p className="text-sm text-gray-500">Receive notifications via email</p>
                    </div>
                    <Switch
                      id="emailNotifications"
                      checked={notifications.emailNotifications}
                      onCheckedChange={(checked) => handleNotificationUpdate('emailNotifications', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label htmlFor="smsNotifications">SMS Notifications</Label>
                      <p className="text-sm text-gray-500">Receive notifications via SMS</p>
                    </div>
                    <Switch
                      id="smsNotifications"
                      checked={notifications.smsNotifications}
                      onCheckedChange={(checked) => handleNotificationUpdate('smsNotifications', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label htmlFor="propertyUpdates">Property Updates</Label>
                      <p className="text-sm text-gray-500">Get notified about property verification status</p>
                    </div>
                    <Switch
                      id="propertyUpdates"
                      checked={notifications.propertyUpdates}
                      onCheckedChange={(checked) => handleNotificationUpdate('propertyUpdates', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label htmlFor="securityAlerts">Security Alerts</Label>
                      <p className="text-sm text-gray-500">Important security notifications</p>
                    </div>
                    <Switch
                      id="securityAlerts"
                      checked={notifications.securityAlerts}
                      onCheckedChange={(checked) => handleNotificationUpdate('securityAlerts', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label htmlFor="weeklyReports">Weekly Reports</Label>
                      <p className="text-sm text-gray-500">Receive weekly performance reports</p>
                    </div>
                    <Switch
                      id="weeklyReports"
                      checked={notifications.weeklyReports}
                      onCheckedChange={(checked) => handleNotificationUpdate('weeklyReports', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label htmlFor="marketingEmails">Marketing Emails</Label>
                      <p className="text-sm text-gray-500">Receive promotional content and updates</p>
                    </div>
                    <Switch
                      id="marketingEmails"
                      checked={notifications.marketingEmails}
                      onCheckedChange={(checked) => handleNotificationUpdate('marketingEmails', checked)}
                    />
                  </div>
                </div>
              </div>
            </Card>

            {/* Privacy Settings */}
            <Card className="p-8">
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <Users className="h-6 w-6 text-green-600" />
                  <h2 className="text-2xl font-semibold">Privacy Settings</h2>
                </div>
                
                <Separator />

                <div className="space-y-6">
                  <div>
                    <Label htmlFor="profileVisibility">Profile Visibility</Label>
                    <Select
                      value={privacy.profileVisibility}
                      onValueChange={(value) => handlePrivacyUpdate('profileVisibility', value)}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">Public - Visible to everyone</SelectItem>
                        <SelectItem value="verified">Verified Users Only</SelectItem>
                        <SelectItem value="private">Private - Hidden from search</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label htmlFor="showContactInfo">Show Contact Information</Label>
                      <p className="text-sm text-gray-500">Display phone and email on public profile</p>
                    </div>
                    <Switch
                      id="showContactInfo"
                      checked={privacy.showContactInfo}
                      onCheckedChange={(checked) => handlePrivacyUpdate('showContactInfo', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label htmlFor="allowDirectMessages">Allow Direct Messages</Label>
                      <p className="text-sm text-gray-500">Let other users send you messages</p>
                    </div>
                    <Switch
                      id="allowDirectMessages"
                      checked={privacy.allowDirectMessages}
                      onCheckedChange={(checked) => handlePrivacyUpdate('allowDirectMessages', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label htmlFor="dataSharing">Data Sharing for Analytics</Label>
                      <p className="text-sm text-gray-500">Help improve our services with anonymous data</p>
                    </div>
                    <Switch
                      id="dataSharing"
                      checked={privacy.dataSharing}
                      onCheckedChange={(checked) => handlePrivacyUpdate('dataSharing', checked)}
                    />
                  </div>
                </div>
              </div>
            </Card>

            {/* Data Management */}
            <Card className="p-8">
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <Download className="h-6 w-6 text-green-600" />
                  <h2 className="text-2xl font-semibold">Data Management</h2>
                </div>
                
                <Separator />

                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Export Your Data</h3>
                    <p className="text-sm text-gray-500 mb-4">
                      Download a copy of all your data including properties, documents, and account information.
                    </p>
                    <Button
                      onClick={handleExportData}
                      variant="outline"
                      className="w-full sm:w-auto"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Export Data
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            {/* Danger Zone */}
            <Card className="p-8 border-red-200 dark:border-red-800">
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <Trash2 className="h-6 w-6 text-red-600" />
                  <h2 className="text-2xl font-semibold text-red-600">Danger Zone</h2>
                </div>
                
                <Separator className="bg-red-200 dark:bg-red-800" />

                <div>
                  <h3 className="text-lg font-medium mb-2">Delete Account</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Once you delete your account, there is no going back. Please be certain.
                    All your properties, documents, and data will be permanently removed.
                  </p>
                  
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" className="w-full sm:w-auto">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Account
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete your company account
                          and remove all your data from our servers, including:
                          <ul className="list-disc list-inside mt-2 space-y-1">
                            <li>All property listings and documents</li>
                            <li>Verification history and reports</li>
                            <li>Company profile and settings</li>
                            <li>Subscription and billing information</li>
                          </ul>
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={handleDeleteAccount}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          Yes, Delete Account
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}