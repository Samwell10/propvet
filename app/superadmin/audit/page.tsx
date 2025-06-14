'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth"
import { SuperAdminDashboardSidebar } from "@/components/dashboard/superadmin-sidebar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  FileText, 
  Search, 
  Download, 
  Filter,
  Activity,
  Shield,
  Users,
  CreditCard,
  Settings,
  Database,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Info
} from "lucide-react"
import { cn } from "@/lib/utils"

// Mock audit logs data
const mockAuditLogs = [
  {
    id: "1",
    timestamp: "2024-03-20 18:00:15",
    user: "Super Admin",
    userId: "4",
    action: "user_role_changed",
    category: "user_management",
    severity: "warning",
    description: "Changed user role from 'individual' to 'admin' for John Smith",
    ipAddress: "192.168.1.100",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    details: {
      targetUser: "John Smith",
      oldRole: "individual",
      newRole: "admin"
    }
  },
  {
    id: "2",
    timestamp: "2024-03-20 17:45:32",
    user: "Admin User",
    userId: "3",
    action: "verification_approved",
    category: "verification",
    severity: "info",
    description: "Approved property verification for REQ001",
    ipAddress: "192.168.1.101",
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
    details: {
      requestId: "REQ001",
      propertyName: "3 Bedroom Apartment, Lekki Phase 1"
    }
  },
  {
    id: "3",
    timestamp: "2024-03-20 16:30:45",
    user: "System",
    userId: "system",
    action: "payment_received",
    category: "payment",
    severity: "success",
    description: "Subscription payment received: ₦200,000 (Gold Plan)",
    ipAddress: "N/A",
    userAgent: "System Process",
    details: {
      amount: "₦200,000",
      plan: "Gold Plan",
      company: "Real Estate Corp"
    }
  },
  {
    id: "4",
    timestamp: "2024-03-20 15:20:18",
    user: "Super Admin",
    userId: "4",
    action: "plan_created",
    category: "subscription",
    severity: "info",
    description: "Created new subscription plan: Enterprise",
    ipAddress: "192.168.1.100",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    details: {
      planName: "Enterprise",
      price: "₦500,000",
      features: ["Unlimited verifications", "Priority support", "API access"]
    }
  },
  {
    id: "5",
    timestamp: "2024-03-20 14:15:22",
    user: "Admin User",
    userId: "3",
    action: "verification_rejected",
    category: "verification",
    severity: "warning",
    description: "Rejected property verification for REQ005 - Invalid documents",
    ipAddress: "192.168.1.101",
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
    details: {
      requestId: "REQ005",
      reason: "Invalid documents provided"
    }
  },
  {
    id: "6",
    timestamp: "2024-03-20 13:45:10",
    user: "System",
    userId: "system",
    action: "backup_completed",
    category: "system",
    severity: "success",
    description: "Daily database backup completed successfully",
    ipAddress: "N/A",
    userAgent: "System Process",
    details: {
      backupSize: "2.4 GB",
      duration: "15 minutes"
    }
  },
  {
    id: "7",
    timestamp: "2024-03-20 12:30:55",
    user: "Real Estate Corp",
    userId: "2",
    action: "user_login",
    category: "authentication",
    severity: "info",
    description: "User logged in successfully",
    ipAddress: "203.123.45.67",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    details: {
      loginMethod: "email_password"
    }
  },
  {
    id: "8",
    timestamp: "2024-03-20 11:15:33",
    user: "Super Admin",
    userId: "4",
    action: "settings_updated",
    category: "system",
    severity: "warning",
    description: "Updated platform settings - Email notifications disabled",
    ipAddress: "192.168.1.100",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    details: {
      setting: "email_notifications",
      oldValue: true,
      newValue: false
    }
  }
]

export default function AuditLogs() {
  const router = useRouter()
  const { user, isAuthenticated } = useAuth()
  const [logs, setLogs] = useState(mockAuditLogs)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [severityFilter, setSeverityFilter] = useState("all")
  const [userFilter, setUserFilter] = useState("all")

  if (!isAuthenticated || user?.role !== 'super_admin') {
    router.push('/login')
    return null
  }

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.action.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || log.category === categoryFilter
    const matchesSeverity = severityFilter === "all" || log.severity === severityFilter
    const matchesUser = userFilter === "all" || log.user === userFilter

    return matchesSearch && matchesCategory && matchesSeverity && matchesUser
  })

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'user_management':
        return <Users className="h-4 w-4" />
      case 'verification':
        return <Shield className="h-4 w-4" />
      case 'payment':
        return <CreditCard className="h-4 w-4" />
      case 'subscription':
        return <CreditCard className="h-4 w-4" />
      case 'system':
        return <Database className="h-4 w-4" />
      case 'authentication':
        return <Shield className="h-4 w-4" />
      default:
        return <Activity className="h-4 w-4" />
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'success':
        return <CheckCircle className="h-4 w-4" />
      case 'warning':
        return <AlertTriangle className="h-4 w-4" />
      case 'error':
        return <XCircle className="h-4 w-4" />
      default:
        return <Info className="h-4 w-4" />
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'success':
        return 'text-green-600 bg-green-100 dark:bg-green-900/20'
      case 'warning':
        return 'text-amber-600 bg-amber-100 dark:bg-amber-900/20'
      case 'error':
        return 'text-red-600 bg-red-100 dark:bg-red-900/20'
      default:
        return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'user_management':
        return 'text-purple-600 bg-purple-100 dark:bg-purple-900/20'
      case 'verification':
        return 'text-green-600 bg-green-100 dark:bg-green-900/20'
      case 'payment':
        return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20'
      case 'subscription':
        return 'text-indigo-600 bg-indigo-100 dark:bg-indigo-900/20'
      case 'system':
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20'
      case 'authentication':
        return 'text-orange-600 bg-orange-100 dark:bg-orange-900/20'
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20'
    }
  }

  const handleExportLogs = () => {
    // TODO: Implement log export functionality
    console.log('Exporting audit logs...')
    // This would typically generate a CSV or JSON file with the filtered logs
  }

  const uniqueUsers = [...new Set(logs.map(log => log.user))]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <SuperAdminDashboardSidebar />
      
      <div className="lg:pl-64">
        <div className="flex h-14 items-center justify-between border-b bg-white dark:bg-gray-800 px-6">
          <h1 className="text-lg font-semibold">Audit Logs</h1>
          <Button
            onClick={handleExportLogs}
            className="bg-purple-600 hover:bg-purple-700"
          >
            <Download className="h-4 w-4 mr-2" />
            Export Logs
          </Button>
        </div>

        <main className="p-6">
          {/* Filters */}
          <Card className="p-6 mb-6">
            <div className="grid gap-4 md:grid-cols-5">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  className="pl-10"
                  placeholder="Search logs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="user_management">User Management</SelectItem>
                  <SelectItem value="verification">Verification</SelectItem>
                  <SelectItem value="payment">Payment</SelectItem>
                  <SelectItem value="subscription">Subscription</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                  <SelectItem value="authentication">Authentication</SelectItem>
                </SelectContent>
              </Select>

              <Select value={severityFilter} onValueChange={setSeverityFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Severity</SelectItem>
                  <SelectItem value="info">Info</SelectItem>
                  <SelectItem value="success">Success</SelectItem>
                  <SelectItem value="warning">Warning</SelectItem>
                  <SelectItem value="error">Error</SelectItem>
                </SelectContent>
              </Select>

              <Select value={userFilter} onValueChange={setUserFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="User" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Users</SelectItem>
                  {uniqueUsers.map(user => (
                    <SelectItem key={user} value={user}>{user}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("")
                  setCategoryFilter("all")
                  setSeverityFilter("all")
                  setUserFilter("all")
                }}
              >
                <Filter className="h-4 w-4 mr-2" />
                Clear
              </Button>
            </div>
          </Card>

          {/* Logs List */}
          <div className="space-y-4">
            {filteredLogs.map((log) => (
              <Card key={log.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-4">
                      <div className="flex items-center space-x-2">
                        <Badge className={cn("flex items-center space-x-1", getSeverityColor(log.severity))}>
                          {getSeverityIcon(log.severity)}
                          <span>{log.severity.toUpperCase()}</span>
                        </Badge>
                        <Badge className={cn("flex items-center space-x-1", getCategoryColor(log.category))}>
                          {getCategoryIcon(log.category)}
                          <span>{log.category.replace('_', ' ').toUpperCase()}</span>
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right text-sm text-gray-500">
                      <p>{log.timestamp}</p>
                      <p>ID: {log.id}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">{log.description}</h3>
                    <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <div>
                        <span className="font-medium">User:</span>
                        <p>{log.user}</p>
                      </div>
                      <div>
                        <span className="font-medium">Action:</span>
                        <p>{log.action.replace('_', ' ')}</p>
                      </div>
                      <div>
                        <span className="font-medium">IP Address:</span>
                        <p>{log.ipAddress}</p>
                      </div>
                    </div>
                  </div>

                  {log.details && Object.keys(log.details).length > 0 && (
                    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                      <h4 className="font-medium mb-2">Additional Details:</h4>
                      <div className="grid md:grid-cols-2 gap-2 text-sm">
                        {Object.entries(log.details).map(([key, value]) => (
                          <div key={key} className="flex justify-between">
                            <span className="text-gray-500 capitalize">{key.replace('_', ' ')}:</span>
                            <span className="font-medium">
                              {Array.isArray(value) ? value.join(', ') : String(value)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>

          {filteredLogs.length === 0 && (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500 dark:text-gray-400">No audit logs found matching your criteria.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}