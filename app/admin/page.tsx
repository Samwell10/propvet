'use client'

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth"
import { AdminDashboardSidebar } from "@/components/dashboard/admin-sidebar"
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
  ClipboardList,
  CheckCircle,
  Clock,
  AlertCircle,
  XCircle,
  User,
  Settings,
  LogOut,
  Bell,
  TrendingUp,
  Users,
  FileCheck2
} from "lucide-react"
import { cn } from "@/lib/utils"

// Mock data for admin dashboard
const mockStats = {
  totalRequests: 45,
  pendingRequests: 12,
  verifiedToday: 8,
  needsClarification: 5,
  rejectedToday: 2,
  avgProcessingTime: "4.2 hours"
}

const mockRecentRequests = [
  {
    id: "REQ001",
    propertyName: "3 Bedroom Apartment, Lokogoma",
    submittedBy: "John Doe",
    type: "Apartment",
    status: "pending",
    submittedAt: "2024-03-20 14:30",
    priority: "normal"
  },
  {
    id: "REQ002", 
    propertyName: "Commercial Land, Jabi",
    submittedBy: "Real Estate Corp",
    type: "Land",
    status: "pending",
    submittedAt: "2024-03-20 13:15",
    priority: "high"
  },
  {
    id: "REQ003",
    propertyName: "2 Bedroom Duplex, Gwarinpa",
    submittedBy: "Jane Smith",
    type: "House",
    status: "pending",
    submittedAt: "2024-03-20 12:45",
    priority: "normal"
  }
]

export default function AdminDashboard() {
  const router = useRouter()
  const { user, isAuthenticated, logout } = useAuth()

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'admin') {
      router.push('/login')
    }
  }, [isAuthenticated, user, router])

  if (!isAuthenticated || user?.role !== 'admin') {
    return null
  }

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
        return 'text-green-600'
      case 'pending':
        return 'text-orange-600'
      case 'needs_clarification':
        return 'text-amber-600'
      case 'rejected':
        return 'text-red-600'
      default:
        return 'text-gray-600'
    }
  }

  const getPriorityBadge = (priority: string) => {
    return (
      <span className={cn(
        "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium",
        priority === "high"
          ? "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-300"
          : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
      )}>
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </span>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <AdminDashboardSidebar />
      
      <div className="lg:pl-64">
        <div className="flex h-14 items-center justify-between border-b bg-white dark:bg-gray-800 px-6">
          <h1 className="text-lg font-semibold">Admin Dashboard</h1>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => {/* Handle notifications */}}
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-600 rounded-full" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative h-8 w-8 rounded-full"
                >
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Admin Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
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
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold">Welcome back, {user.name}!</h2>
              <p className="text-gray-600 dark:text-gray-400">Here's what's happening with Propvet verifications today.</p>
            </div>
            <Button 
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => router.push('/admin/requests')}
            >
              <ClipboardList className="h-4 w-4 mr-2" />
              View All Requests
            </Button>
          </div>

          {/* Stats Overview */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <Card className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-100 rounded-full dark:bg-blue-900/20">
                  <ClipboardList className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Total Requests</p>
                  <h3 className="text-2xl font-bold">{mockStats.totalRequests}</h3>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-orange-100 rounded-full dark:bg-orange-900/20">
                  <Clock className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Pending Review</p>
                  <h3 className="text-2xl font-bold">{mockStats.pendingRequests}</h3>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-green-100 rounded-full dark:bg-green-900/20">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Verified Today</p>
                  <h3 className="text-2xl font-bold">{mockStats.verifiedToday}</h3>
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

          {/* The rest remains unchanged */}
        </main>
      </div>
    </div>
  )
}