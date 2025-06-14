'use client'

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth"
import { CompanyDashboardSidebar } from "@/components/dashboard/company-sidebar"
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
  Building2,
  FileCheck2,
  Clock,
  XCircle,
  Plus,
  CreditCard,
  Bell,
  MapPin,
  User,
  Settings,
  LogOut,
  AlertCircle
} from "lucide-react"
import { cn } from "@/lib/utils"

// Mock stats to simulate backend summary data
const mockStats = {
  totalProperties: 15,
  verifiedProperties: 10,
  pendingProperties: 2,
  needsClarification: 2,
  rejectedProperties: 1,
  subscriptionStatus: "active",
  plan: "Gold",
  nextBilling: "2024-04-20"
}

// Mock recent properties - now updated to Abuja locations
const mockRecentProperties = [
  {
    id: "1",
    title: "3 Bedroom Apartment, Gwarinpa",
    status: "verified",
    date: "2024-03-20",
    location: "Abuja"
  },
  {
    id: "2",
    title: "Commercial Plot, Jabi",
    status: "needs_clarification",
    date: "2024-03-19",
    location: "Abuja",
    clarificationMessage: "The Certificate of Occupancy document appears to be incomplete. Please provide the complete document with all pages clearly visible."
  },
  {
    id: "3",
    title: "2 Bedroom Duplex, Asokoro",
    status: "pending",
    date: "2024-03-18",
    location: "Abuja"
  }
]

export default function CompanyDashboard() {
  const router = useRouter()
  const { user, isAuthenticated, logout } = useAuth()

  // Redirect if not logged in or not subscribed
  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'company') {
      router.push('/login')
      return
    }

    if (!user.hasSubscribed) {
      router.push('/dashboard/company/subscribe')
    }
  }, [isAuthenticated, user, router])

  // Hide dashboard during redirect
  if (!isAuthenticated || user?.role !== 'company' || !user.hasSubscribed) {
    return null
  }

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  // Get color class for status label
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

  // Display-friendly status name
  const getStatusText = (status: string) => {
    switch (status) {
      case 'verified':
        return 'Verified'
      case 'pending':
        return 'Pending'
      case 'needs_clarification':
        return 'Needs Clarification'
      case 'rejected':
        return 'Rejected'
      default:
        return 'Unknown'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <CompanyDashboardSidebar />
      
      <div className="lg:pl-64">
        {/* Top bar with profile menu and add button */}
        <div className="flex h-14 items-center justify-between border-b bg-white dark:bg-gray-800 px-6">
          <h1 className="text-lg font-semibold">Company Dashboard</h1>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-600 rounded-full" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push('/dashboard/company/profile')}>
                  <User className="mr-2 h-4 w-4" /> Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push('/dashboard/company/settings')}>
                  <Settings className="mr-2 h-4 w-4" /> Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" /> Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              onClick={() => router.push('/dashboard/company/properties/new')}
              className="bg-green-600 hover:bg-green-700"
            >
              <Plus className="h-4 w-4 md:mr-2" />
              <span className="hidden md:inline">Add New Property</span>
            </Button>
          </div>
        </div>

        <main className="p-6">
          {/* Stats Section */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5 mb-8">
            {/* Repeatable card blocks */}
            {[
              { label: 'Total Properties', value: mockStats.totalProperties, icon: Building2, bg: 'bg-blue-100', color: 'text-blue-600' },
              { label: 'Verified', value: mockStats.verifiedProperties, icon: FileCheck2, bg: 'bg-green-100', color: 'text-green-600' },
              { label: 'Pending', value: mockStats.pendingProperties, icon: Clock, bg: 'bg-orange-100', color: 'text-orange-600' },
              { label: 'Needs Clarification', value: mockStats.needsClarification, icon: AlertCircle, bg: 'bg-amber-100', color: 'text-amber-600' },
              { label: 'Rejected', value: mockStats.rejectedProperties, icon: XCircle, bg: 'bg-red-100', color: 'text-red-600' }
            ].map((item, i) => (
              <Card key={i} className="p-6">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-full dark:bg-opacity-20 ${item.bg}`}>
                    <item.icon className={`h-6 w-6 ${item.color}`} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{item.label}</p>
                    <h3 className="text-2xl font-bold">{item.value}</h3>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Grid: Recent Properties + Subscription */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Recent Properties List */}
            <Card>
              <div className="p-6 border-b flex items-center justify-between">
                <h2 className="text-lg font-semibold">Recent Properties</h2>
                <Button variant="outline" size="sm" onClick={() => router.push('/dashboard/company/properties')}>
                  View All
                </Button>
              </div>
              <div className="divide-y">
                {mockRecentProperties.map((property) => (
                  <div
                    key={property.id}
                    className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer"
                    onClick={() => router.push(`/dashboard/company/properties/${property.id}`)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium mb-1">{property.title}</h3>
                        <div className="flex items-center text-sm text-gray-500">
                          <MapPin className="h-4 w-4 mr-1" />
                          {property.location}
                        </div>
                      </div>
                      <span className={cn(
                        "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium",
                        property.status === "verified"
                          ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300"
                          : property.status === "pending"
                          ? "bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300"
                          : property.status === "needs_clarification"
                          ? "bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-300"
                          : "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-300"
                      )}>
                        {getStatusText(property.status)}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      Added on {property.date}
                    </div>

                    {/* Show clarification message */}
                    {property.status === 'needs_clarification' && property.clarificationMessage && (
                      <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-md dark:bg-amber-900/20 dark:border-amber-800">
                        <div className="flex items-start space-x-2">
                          <AlertCircle className="h-4 w-4 text-amber-600 mt-0.5" />
                          <p className="text-sm text-amber-700 dark:text-amber-300">
                            {property.clarificationMessage}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Card>

            {/* Subscription Summary */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-purple-100 rounded-full dark:bg-purple-900/20">
                    <CreditCard className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold">Subscription Status</h2>
                    <p className="text-sm text-gray-500">Current Plan: {mockStats.plan}</p>
                  </div>
                </div>
                <Button variant="outline" onClick={() => router.push('/dashboard/company/subscribe')}>
                  Manage
                </Button>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Status</span>
                  <span className="font-medium text-green-600">Active</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Next Billing</span>
                  <span>{mockStats.nextBilling}</span>
                </div>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}