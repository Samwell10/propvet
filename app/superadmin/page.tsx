'use client'

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth"
import { SuperAdminDashboardSidebar } from "@/components/dashboard/superadmin-sidebar"
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
  Users,
  CreditCard,
  Settings,
  FileText,
  TrendingUp,
  DollarSign,
  Shield,
  User,
  LogOut,
  Bell,
  Activity,
  Database
} from "lucide-react"

// Abuja-specific mock data
const mockStats = {
  totalUsers: 4580,
  totalCompanies: 320,
  totalAdmins: 6,
  totalRevenue: "₦18,450,000",
  monthlyGrowth: "+10.2%",
  activeSubscriptions: 411,
  totalVerifications: 10745,
  systemUptime: "99.9%"
}

const mockRecentActivity = [
  {
    id: "1",
    type: "user_registration",
    description: "New company registered: Abuja Lands & Homes",
    timestamp: "2025-06-08 10:12",
    severity: "info"
  },
  {
    id: "2", 
    type: "payment",
    description: "Subscription payment received: ₦250,000 (Silver Plan)",
    timestamp: "2025-06-07 18:45",
    severity: "success"
  },
  {
    id: "3",
    type: "admin_action",
    description: "Admin role assigned to Aminu Ibrahim",
    timestamp: "2025-06-07 14:05",
    severity: "warning"
  },
  {
    id: "4",
    type: "system",
    description: "System check completed - Abuja zone cluster",
    timestamp: "2025-06-06 22:00",
    severity: "info"
  }
]

export default function SuperAdminDashboard() {
  const router = useRouter()
  const { user, isAuthenticated, logout } = useAuth()

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'super_admin') {
      router.push('/login')
    }
  }, [isAuthenticated, user, router])

  if (!isAuthenticated || user?.role !== 'super_admin') {
    return null
  }

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'success':
        return 'text-green-600'
      case 'warning':
        return 'text-amber-600'
      case 'error':
        return 'text-red-600'
      default:
        return 'text-blue-600'
    }
  }

  const getSeverityIcon = (type: string) => {
    switch (type) {
      case 'user_registration':
        return <Users className="h-4 w-4" />
      case 'payment':
        return <DollarSign className="h-4 w-4" />
      case 'admin_action':
        return <Shield className="h-4 w-4" />
      case 'system':
        return <Database className="h-4 w-4" />
      default:
        return <Activity className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <SuperAdminDashboardSidebar />
      <div className="lg:pl-64">
        <div className="flex h-14 items-center justify-between border-b bg-white dark:bg-gray-800 px-6">
          <h1 className="text-lg font-semibold">Super Admin Dashboard</h1>
          <div className="flex items-center space-x-2">
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
                <DropdownMenuLabel>Super Admin Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push('/superadmin/settings')}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Platform Settings</span>
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
              <p className="text-gray-600 dark:text-gray-400">Here’s how Abuja is performing this month.</p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => router.push('/superadmin/audit')}>
                <FileText className="h-4 w-4 mr-2" />
                Audit Logs
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700" onClick={() => router.push('/superadmin/settings')}>
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <Card className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-100 rounded-full dark:bg-blue-900/20">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Users</p>
                  <h3 className="text-2xl font-bold">{mockStats.totalUsers.toLocaleString()}</h3>
                  <p className="text-xs text-green-600">{mockStats.monthlyGrowth} this month</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-green-100 rounded-full dark:bg-green-900/20">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Revenue</p>
                  <h3 className="text-2xl font-bold">{mockStats.totalRevenue}</h3>
                  <p className="text-xs text-green-600">From Abuja properties</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-purple-100 rounded-full dark:bg-purple-900/20">
                  <CreditCard className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Subscriptions</p>
                  <h3 className="text-2xl font-bold">{mockStats.activeSubscriptions}</h3>
                  <p className="text-xs text-green-600">Abuja-based companies</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-orange-100 rounded-full dark:bg-orange-900/20">
                  <TrendingUp className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Verifications</p>
                  <h3 className="text-2xl font-bold">{mockStats.totalVerifications.toLocaleString()}</h3>
                  <p className="text-xs text-green-600">Handled in Abuja</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Activities */}
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Card>
                <div className="p-6 border-b flex justify-between items-center">
                  <h2 className="text-lg font-semibold">Recent Activity (Abuja)</h2>
                  <Button variant="outline" size="sm" onClick={() => router.push('/superadmin/audit')}>
                    View Logs
                  </Button>
                </div>
                <div className="divide-y">
                  {mockRecentActivity.map(activity => (
                    <div key={activity.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                      <div className="flex items-start space-x-3">
                        <div className={`p-2 rounded-full ${getSeverityColor(activity.severity)} bg-current/10`}>
                          {getSeverityIcon(activity.type)}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{activity.description}</p>
                          <p className="text-sm text-gray-500">{activity.timestamp}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Button className="w-full justify-start" variant="outline" onClick={() => router.push('/superadmin/users')}>
                    <Users className="h-4 w-4 mr-2" />
                    Manage Users
                  </Button>
                  <Button className="w-full justify-start" variant="outline" onClick={() => router.push('/superadmin/plans')}>
                    <CreditCard className="h-4 w-4 mr-2" />
                    Manage Plans
                  </Button>
                  <Button className="w-full justify-start" variant="outline" onClick={() => router.push('/superadmin/settings')}>
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Button>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">System Status</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Uptime</span>
                    <span className="font-medium text-green-600">{mockStats.systemUptime}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Companies</span>
                    <span className="font-medium">{mockStats.totalCompanies.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Admins</span>
                    <span className="font-medium">{mockStats.totalAdmins}</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}