'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth"
import { SuperAdminDashboardSidebar } from "@/components/dashboard/superadmin-sidebar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Settings,
  Save,
  Shield,
  Mail,
  Globe,
  Database,
  Bell,
  Lock,
  Zap
} from "lucide-react"

export default function PlatformSettings() {
  const router = useRouter()
  const { user, isAuthenticated } = useAuth()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  // Abuja-focused platform settings
  const [settings, setSettings] = useState({
    platformName: "Prop-Vet Platform",
    platformDescription: "Secure property verification platform focused on Abuja real estate.",
    supportEmail: "support@platform.com",
    adminEmail: "admin@platform.com",

    requireEmailVerification: true,
    enableTwoFactorAuth: false,
    sessionTimeout: "24",
    maxLoginAttempts: "5",

    autoAssignRequests: true,
    maxRequestsPerAdmin: "10",
    verificationTimeout: "48",
    requireDocumentUpload: true,

    emailNotifications: true,
    smsNotifications: false,
    adminAlerts: true,
    systemAlerts: true,

    defaultCurrency: "NGN",
    paymentGateway: "paystack",
    enableSubscriptions: true,
    enablePayPerVerification: true,

    maintenanceMode: false,
    debugMode: false,
    logLevel: "info",
    backupFrequency: "daily"
  })

  if (!isAuthenticated || user?.role !== 'super_admin') {
    router.push('/login')
    return null
  }

  const handleSettingChange = (key: string, value: string | boolean) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const handleSaveSettings = async () => {
    setIsLoading(true)
    try {
      console.log('Saving platform settings:', settings)
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast({
        title: "Settings saved",
        description: "Platform settings have been updated successfully.",
      })
    } catch (error) {
      console.error('Error saving settings:', error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save settings. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <SuperAdminDashboardSidebar />

      <div className="lg:pl-64">
        <div className="flex h-14 items-center border-b bg-white dark:bg-gray-800 px-6">
          <h1 className="text-lg font-semibold">Platform Settings</h1>
        </div>

        <main className="p-6">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* General Settings */}
            <Card className="p-8">
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <Globe className="h-6 w-6 text-purple-600" />
                  <h2 className="text-2xl font-semibold">General Settings</h2>
                </div>
                <Separator />

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="platformName">Platform Name</Label>
                    <Input
                      id="platformName"
                      value={settings.platformName}
                      onChange={(e) => handleSettingChange('platformName', e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="supportEmail">Support Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="supportEmail"
                        type="email"
                        className="pl-10"
                        value={settings.supportEmail}
                        onChange={(e) => handleSettingChange('supportEmail', e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="adminEmail">Admin Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="adminEmail"
                        type="email"
                        className="pl-10"
                        value={settings.adminEmail}
                        onChange={(e) => handleSettingChange('adminEmail', e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="defaultCurrency">Default Currency</Label>
                    <Select
                      value={settings.defaultCurrency}
                      onValueChange={(value) => handleSettingChange('defaultCurrency', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="NGN">Nigerian Naira (NGN)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="platformDescription">Platform Description</Label>
                  <Textarea
                    id="platformDescription"
                    value={settings.platformDescription}
                    onChange={(e) => handleSettingChange('platformDescription', e.target.value)}
                    className="min-h-[80px]"
                  />
                </div>
              </div>
            </Card>

            {/* Additional sections (Security, Verification, Notification, System) unchanged */}
            {/* You already have those sections perfectly laid out. No branding inside them. */}

            {/* Save Button */}
            <div className="flex justify-end">
              <Button
                onClick={handleSaveSettings}
                disabled={isLoading}
                className="bg-purple-600 hover:bg-purple-700"
              >
                <Save className="h-4 w-4 mr-2" />
                {isLoading ? "Saving..." : "Save Settings"}
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}