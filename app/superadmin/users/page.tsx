'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth"
import { SuperAdminDashboardSidebar } from "@/components/dashboard/superadmin-sidebar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { 
  Users, 
  Search, 
  Shield, 
  Building2, 
  User, 
  Crown,
  MoreHorizontal,
  UserCheck,
  UserX,
  Edit
} from "lucide-react"
import { cn } from "@/lib/utils"

// Mock users data
const mockUsers = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    role: "individual",
    status: "active",
    joinDate: "2024-01-15",
    lastLogin: "2024-03-20 14:30",
    verifications: 12,
    subscription: null
  },
  {
    id: "2",
    name: "Real Estate Corp",
    email: "company@realestatecompany.com",
    role: "company",
    status: "active",
    joinDate: "2024-02-01",
    lastLogin: "2024-03-20 16:45",
    verifications: 45,
    subscription: "Gold Plan"
  },
  {
    id: "3",
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
    status: "active",
    joinDate: "2024-01-01",
    lastLogin: "2024-03-20 17:20",
    verifications: 0,
    subscription: null
  },
  {
    id: "4",
    name: "Super Admin",
    email: "superadmin@example.com",
    role: "super_admin",
    status: "active",
    joinDate: "2024-01-01",
    lastLogin: "2024-03-20 18:00",
    verifications: 0,
    subscription: null
  },
  {
    id: "5",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "individual",
    status: "suspended",
    joinDate: "2024-02-15",
    lastLogin: "2024-03-18 10:30",
    verifications: 3,
    subscription: null
  },
  {
    id: "6",
    name: "Prime Properties Ltd",
    email: "info@primeproperties.ng",
    role: "company",
    status: "active",
    joinDate: "2024-01-20",
    lastLogin: "2024-03-20 15:15",
    verifications: 78,
    subscription: "Silver Plan"
  }
]

export default function UserManagement() {
  const router = useRouter()
  const { user, isAuthenticated } = useAuth()
  const { toast } = useToast()
  const [users, setUsers] = useState(mockUsers)
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [actionDialog, setActionDialog] = useState<{
    open: boolean
    type: 'promote' | 'suspend' | 'activate' | 'delete' | null
    user: any
  }>({
    open: false,
    type: null,
    user: null
  })

  if (!isAuthenticated || user?.role !== 'super_admin') {
    router.push('/login')
    return null
  }

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === "all" || user.role === roleFilter
    const matchesStatus = statusFilter === "all" || user.status === statusFilter

    return matchesSearch && matchesRole && matchesStatus
  })

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'individual':
        return <User className="h-4 w-4" />
      case 'company':
        return <Building2 className="h-4 w-4" />
      case 'admin':
        return <Shield className="h-4 w-4" />
      case 'super_admin':
        return <Crown className="h-4 w-4" />
      default:
        return <User className="h-4 w-4" />
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'individual':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300'
      case 'company':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
      case 'admin':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300'
      case 'super_admin':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
      case 'suspended':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300'
      case 'pending':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300'
    }
  }

  const handleUserAction = (type: 'promote' | 'suspend' | 'activate' | 'delete', user: any) => {
    setActionDialog({
      open: true,
      type,
      user
    })
  }

  const executeUserAction = async () => {
    const { type, user: targetUser } = actionDialog
    
    try {
      switch (type) {
        case 'promote':
          // TODO: Implement promote to admin logic
          setUsers(prev => prev.map(u => 
            u.id === targetUser.id 
              ? { ...u, role: 'admin' }
              : u
          ))
          toast({
            title: "User promoted",
            description: `${targetUser.name} has been promoted to admin.`,
          })
          break

        case 'suspend':
          // TODO: Implement suspend user logic
          setUsers(prev => prev.map(u => 
            u.id === targetUser.id 
              ? { ...u, status: 'suspended' }
              : u
          ))
          toast({
            title: "User suspended",
            description: `${targetUser.name} has been suspended.`,
          })
          break

        case 'activate':
          // TODO: Implement activate user logic
          setUsers(prev => prev.map(u => 
            u.id === targetUser.id 
              ? { ...u, status: 'active' }
              : u
          ))
          toast({
            title: "User activated",
            description: `${targetUser.name} has been activated.`,
          })
          break

        case 'delete':
          // TODO: Implement delete user logic
          setUsers(prev => prev.filter(u => u.id !== targetUser.id))
          toast({
            title: "User deleted",
            description: `${targetUser.name} has been deleted.`,
          })
          break
      }

      console.log(`${type} user:`, targetUser.id)
    } catch (error) {
      console.error(`Error ${type} user:`, error)
      toast({
        variant: "destructive",
        title: "Error",
        description: `Failed to ${type} user. Please try again.`,
      })
    }

    setActionDialog({ open: false, type: null, user: null })
  }

  const getActionDialogContent = () => {
    const { type, user } = actionDialog
    if (!type || !user) return { title: "", description: "", action: "" }

    switch (type) {
      case 'promote':
        return {
          title: "Promote to Admin",
          description: `Are you sure you want to promote ${user.name} to admin? They will gain access to the admin dashboard and verification tools.`,
          action: "Promote"
        }
      case 'suspend':
        return {
          title: "Suspend User",
          description: `Are you sure you want to suspend ${user.name}? They will lose access to the platform until reactivated.`,
          action: "Suspend"
        }
      case 'activate':
        return {
          title: "Activate User",
          description: `Are you sure you want to activate ${user.name}? They will regain access to the platform.`,
          action: "Activate"
        }
      case 'delete':
        return {
          title: "Delete User",
          description: `Are you sure you want to permanently delete ${user.name}? This action cannot be undone and will remove all their data.`,
          action: "Delete"
        }
      default:
        return { title: "", description: "", action: "" }
    }
  }

  const dialogContent = getActionDialogContent()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <SuperAdminDashboardSidebar />
      
      <div className="lg:pl-64">
        <div className="flex h-14 items-center border-b bg-white dark:bg-gray-800 px-6">
          <h1 className="text-lg font-semibold">User Management</h1>
        </div>

        <main className="p-6">
          {/* Filters */}
          <Card className="p-6 mb-6">
            <div className="grid gap-4 md:grid-cols-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  className="pl-10"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="individual">Individual</SelectItem>
                  <SelectItem value="company">Company</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="super_admin">Super Admin</SelectItem>
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("")
                  setRoleFilter("all")
                  setStatusFilter("all")
                }}
              >
                Clear Filters
              </Button>
            </div>
          </Card>

          {/* Users List */}
          <div className="grid gap-4">
            {filteredUsers.map((user) => (
              <Card key={user.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center dark:bg-gray-800">
                        {getRoleIcon(user.role)}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">{user.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{user.email}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="flex items-center space-x-2 mb-1">
                          <Badge className={cn("flex items-center space-x-1", getRoleColor(user.role))}>
                            {getRoleIcon(user.role)}
                            <span>{user.role.replace('_', ' ').toUpperCase()}</span>
                          </Badge>
                          <Badge className={getStatusColor(user.status)}>
                            {user.status.toUpperCase()}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-500">
                          Last login: {user.lastLogin}
                        </p>
                      </div>

                      <div className="flex items-center space-x-2">
                        {user.role === 'individual' && user.status === 'active' && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleUserAction('promote', user)}
                          >
                            <UserCheck className="h-4 w-4 mr-1" />
                            Promote
                          </Button>
                        )}
                        
                        {user.status === 'active' && user.role !== 'super_admin' && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:text-red-700"
                            onClick={() => handleUserAction('suspend', user)}
                          >
                            <UserX className="h-4 w-4 mr-1" />
                            Suspend
                          </Button>
                        )}

                        {user.status === 'suspended' && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-green-600 hover:text-green-700"
                            onClick={() => handleUserAction('activate', user)}
                          >
                            <UserCheck className="h-4 w-4 mr-1" />
                            Activate
                          </Button>
                        )}

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedUser(user)}
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-4 gap-4 mt-4 text-sm text-gray-600 dark:text-gray-400">
                    <div>
                      <span className="font-medium">Joined:</span>
                      <p>{user.joinDate}</p>
                    </div>
                    <div>
                      <span className="font-medium">Verifications:</span>
                      <p>{user.verifications}</p>
                    </div>
                    <div>
                      <span className="font-medium">Subscription:</span>
                      <p>{user.subscription || "None"}</p>
                    </div>
                    <div>
                      <span className="font-medium">Status:</span>
                      <p className="capitalize">{user.status}</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">No users found matching your criteria.</p>
            </div>
          )}

          {/* Action Confirmation Dialog */}
          <Dialog open={actionDialog.open} onOpenChange={(open) => setActionDialog(prev => ({ ...prev, open }))}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{dialogContent.title}</DialogTitle>
                <DialogDescription>
                  {dialogContent.description}
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setActionDialog({ open: false, type: null, user: null })}
                >
                  Cancel
                </Button>
                <Button
                  variant={actionDialog.type === 'delete' || actionDialog.type === 'suspend' ? 'destructive' : 'default'}
                  onClick={executeUserAction}
                  className={actionDialog.type === 'promote' || actionDialog.type === 'activate' ? 'bg-purple-600 hover:bg-purple-700' : ''}
                >
                  {dialogContent.action}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </main>
      </div>
    </div>
  )
}