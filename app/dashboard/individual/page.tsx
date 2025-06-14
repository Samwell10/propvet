'use client'

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth"
import { cn } from "@/lib/utils"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  BarChart3,
  CheckCircle,
  Clock,
  FileCheck2,
  Plus,
  User,
  Settings,
  LogOut,
  Bell,
  Download,
  AlertCircle
} from "lucide-react"

// Mock stats for Abuja individual user
const mockStats = {
  totalRequests: 9,
  verifiedProperties: 6,
  pendingRequests: 2,
  needsClarification: 1
}

// Abuja-based recent activities
const mockRecentActivity = [
  {
    id: "REQ019",
    propertyName: "Plot 72, Katampe Extension, Abuja",
    status: "Verified",
    date: "2024-05-22",
    reportUrl: "/reports/REQ019_verification_report.pdf"
  },
  {
    id: "REQ020",
    propertyName: "3-Bedroom Bungalow, Gwarinpa",
    status: "Needs Clarification",
    date: "2024-05-20",
    reportUrl: null,
    clarificationMessage: "Please upload a legible copy of the Survey Plan showing coordinates."
  },
  {
    id: "REQ021",
    propertyName: "Empty Plot, Kuje, Abuja",
    status: "Pending",
    date: "2024-05-18",
    reportUrl: null
  }
]

export default function IndividualDashboard() {
  const router = useRouter()
  const { user, isAuthenticated, logout } = useAuth()

  // Redirect unauthenticated users
  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'individual') {
      router.push('/login')
    }
  }, [isAuthenticated, user, router])

  if (!isAuthenticated || user?.role !== 'individual') {
    return null
  }

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  const handleDownload = (reportUrl: string) => {
    // You can replace this with actual download logic
    console.log('Downloading report:', reportUrl)
  }

  const getStatusBadge = (status: string) => {
    return (
      <span className={cn(
        "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium",
        status === "Verified"
          ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300"
          : status === "Pending"
          ? "bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300"
          : status === "Needs Clarification"
          ? "bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-300"
          : "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-300"
      )}>
        {status}
      </span>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardSidebar />

      <div className="lg:pl-64">
        {/* Top Bar with name and avatar */}
        <div className="flex h-14 items-center justify-between border-b bg-white dark:bg-gray-800 px-6">
          <h1 className="text-lg font-semibold">Welcome, {user.name}!</h1>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-600 rounded-full" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative h-8 w-8 rounded-full">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push('/dashboard/individual/profile')}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push('/dashboard/individual/settings')}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <main className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Dashboard Overview</h2>
            <Button className="bg-green-600 hover:bg-green-700" onClick={() => router.push('/dashboard/individual/verify')}>
              <Plus className="h-4 w-4 mr-2" />
              Verify New Property
            </Button>
          </div>

          {/* Stat Cards */}
          <div className="grid gap-6 md:grid-cols-4 mb-8">
            <Card className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-100 rounded-full dark:bg-blue-900/20">
                  <BarChart3 className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Total Requests</p>
                  <h3 className="text-2xl font-bold">{mockStats.totalRequests}</h3>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-green-100 rounded-full dark:bg-green-900/20">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Verified Properties</p>
                  <h3 className="text-2xl font-bold">{mockStats.verifiedProperties}</h3>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-orange-100 rounded-full dark:bg-orange-900/20">
                  <Clock className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Pending Requests</p>
                  <h3 className="text-2xl font-bold">{mockStats.pendingRequests}</h3>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-amber-100 rounded-full dark:bg-amber-900/20">
                  <AlertCircle className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Needs Clarification</p>
                  <h3 className="text-2xl font-bold">{mockStats.needsClarification}</h3>
                </div>
              </div>
            </Card>
          </div>

          {/* Activity Table */}
          <Card className="overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-lg font-semibold">Recent Activity</h3>
              <Button variant="outline" size="sm" onClick={() => router.push('/dashboard/individual/history')}>
                View All
              </Button>
            </div>

            {/* You already have both table and mobile card view for responsiveness */}
            {/* ... no changes needed there unless you want Abuja map links or real URLs */}
          </Card>
        </main>
      </div>
    </div>
  )
}