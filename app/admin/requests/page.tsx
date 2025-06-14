'use client'

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth"
import { AdminDashboardSidebar } from "@/components/dashboard/admin-sidebar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Clock, AlertCircle, CheckCircle, XCircle, Eye } from "lucide-react"
import { cn } from "@/lib/utils"

// Mock verification requests data
const mockRequests = [
  {
    id: "REQ001",
    propertyName: "3 Bedroom Apartment, Lekki Phase 1",
    submittedBy: "John Doe",
    submitterType: "Individual",
    type: "Apartment",
    location: "Lagos",
    status: "pending",
    submittedAt: "2024-03-20 14:30",
    priority: "normal",
    assignedTo: null
  },
  {
    id: "REQ002", 
    propertyName: "Commercial Land, Ibeju-Lekki",
    submittedBy: "Real Estate Corp",
    submitterType: "Company",
    type: "Land",
    location: "Lagos",
    status: "pending",
    submittedAt: "2024-03-20 13:15",
    priority: "high",
    assignedTo: null
  },
  {
    id: "REQ003",
    propertyName: "2 Bedroom Duplex, Ikeja GRA",
    submittedBy: "Jane Smith",
    submitterType: "Individual",
    type: "House",
    location: "Lagos",
    status: "in_review",
    submittedAt: "2024-03-20 12:45",
    priority: "normal",
    assignedTo: "Admin User"
  },
  {
    id: "REQ004",
    propertyName: "Office Complex, Victoria Island",
    submittedBy: "Prime Properties Ltd",
    submitterType: "Company",
    type: "Commercial",
    location: "Lagos",
    status: "needs_clarification",
    submittedAt: "2024-03-19 16:20",
    priority: "normal",
    assignedTo: "Admin User"
  },
  {
    id: "REQ005",
    propertyName: "Residential Land, Abuja",
    submittedBy: "Michael Johnson",
    submitterType: "Individual",
    type: "Land",
    location: "FCT",
    status: "verified",
    submittedAt: "2024-03-19 11:30",
    priority: "normal",
    assignedTo: "Admin User"
  }
]

export default function AdminRequests() {
  const router = useRouter()
  const { user, isAuthenticated } = useAuth()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'admin') {
      router.push('/login')
    }
  }, [isAuthenticated, user, router])
  
  if (!isAuthenticated || user?.role !== 'admin') return null

  const filteredRequests = mockRequests.filter(request => {
    const matchesSearch = request.propertyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.submittedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || request.status === statusFilter
    const matchesPriority = priorityFilter === "all" || request.priority === priorityFilter

    return matchesSearch && matchesStatus && matchesPriority
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4" />
      case 'in_review':
        return <Eye className="h-4 w-4" />
      case 'verified':
        return <CheckCircle className="h-4 w-4" />
      case 'needs_clarification':
        return <AlertCircle className="h-4 w-4" />
      case 'rejected':
        return <XCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'text-orange-600 bg-orange-100 dark:bg-orange-900/20'
      case 'in_review':
        return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20'
      case 'verified':
        return 'text-green-600 bg-green-100 dark:bg-green-900/20'
      case 'needs_clarification':
        return 'text-amber-600 bg-amber-100 dark:bg-amber-900/20'
      case 'rejected':
        return 'text-red-600 bg-red-100 dark:bg-red-900/20'
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Pending'
      case 'in_review':
        return 'In Review'
      case 'verified':
        return 'Verified'
      case 'needs_clarification':
        return 'Needs Clarification'
      case 'rejected':
        return 'Rejected'
      default:
        return 'Unknown'
    }
  }

  const handleTakeRequest = (requestId: string) => {
    // TODO: Implement request assignment logic
    console.log('Taking request:', requestId)
    router.push(`/admin/requests/${requestId}`)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <AdminDashboardSidebar />
      
      <div className="lg:pl-64">
        <div className="flex h-14 items-center border-b bg-white dark:bg-gray-800 px-6">
          <h1 className="text-lg font-semibold">Verification Requests</h1>
        </div>

        <main className="p-6">
          {/* Filters */}
          <Card className="p-6 mb-6">
            <div className="grid gap-4 md:grid-cols-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  className="pl-10"
                  placeholder="Search requests..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in_review">In Review</SelectItem>
                  <SelectItem value="verified">Verified</SelectItem>
                  <SelectItem value="needs_clarification">Needs Clarification</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>

              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priority</SelectItem>
                  <SelectItem value="high">High Priority</SelectItem>
                  <SelectItem value="normal">Normal Priority</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("")
                  setStatusFilter("all")
                  setPriorityFilter("all")
                }}
              >
                Clear Filters
              </Button>
            </div>
          </Card>

          {/* Requests List */}
          <div className="grid gap-4">
            {filteredRequests.map((request) => (
              <Card key={request.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <span className="font-mono text-sm font-medium">{request.id}</span>
                      <Badge variant={request.priority === 'high' ? 'destructive' : 'secondary'}>
                        {request.priority.charAt(0).toUpperCase() + request.priority.slice(1)} Priority
                      </Badge>
                      <Badge className={cn("flex items-center space-x-1", getStatusColor(request.status))}>
                        {getStatusIcon(request.status)}
                        <span>{getStatusText(request.status)}</span>
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => router.push(`/admin/requests/${request.id}`)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Review
                      </Button>
                      {request.status === 'pending' && (
                        <Button
                          size="sm"
                          className="bg-blue-600 hover:bg-blue-700"
                          onClick={() => handleTakeRequest(request.id)}
                        >
                          Take Request
                        </Button>
                      )}
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold mb-2">{request.propertyName}</h3>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <div>
                      <span className="font-medium">Submitted by:</span>
                      <p>{request.submittedBy} ({request.submitterType})</p>
                    </div>
                    <div>
                      <span className="font-medium">Property Type:</span>
                      <p>{request.type}</p>
                    </div>
                    <div>
                      <span className="font-medium">Location:</span>
                      <p>{request.location}</p>
                    </div>
                    <div>
                      <span className="font-medium">Submitted:</span>
                      <p>{request.submittedAt}</p>
                    </div>
                  </div>

                  {request.assignedTo && (
                    <div className="mt-3 text-sm">
                      <span className="font-medium text-gray-600 dark:text-gray-400">Assigned to:</span>
                      <span className="ml-2 text-blue-600">{request.assignedTo}</span>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>

          {filteredRequests.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">No requests found matching your criteria.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}