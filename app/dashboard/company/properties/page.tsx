'use client'

import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth"
import { CompanyDashboardSidebar } from "@/components/dashboard/company-sidebar"
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
import { MapPin, Plus, Edit, Trash2, FileCheck2, Clock, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

// Static mock data — will be replaced with API data in production
const mockProperties = [
  {
    id: "1",
    title: "Luxury 3 Bedroom Apartment",
    location: "Gwarinpa, Abuja", // Updated from Lagos to Abuja
    price: "₦75,000,000",
    status: "verified",
    type: "Apartment",
    date: "2024-03-15",
    image: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg"
  },
  {
    id: "2",
    title: "Commercial Land",
    location: "Kuje, Abuja", // Updated from Lagos to Abuja
    price: "₦120,000,000",
    status: "needs_clarification",
    type: "Land",
    date: "2024-03-14",
    image: "https://images.pexels.com/photos/280229/pexels-photo-280229.jpeg",
    clarificationMessage: "The Certificate of Occupancy document appears to be incomplete. Please provide the complete document with all pages clearly visible."
  },
  {
    id: "3",
    title: "Executive Office Complex",
    location: "Central Area, Abuja", // Updated from Lagos to Abuja
    price: "₦500,000,000",
    status: "pending",
    type: "Commercial",
    date: "2024-03-13",
    image: "https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg"
  }
]

export default function Properties() {
  const router = useRouter()
  const { user, isAuthenticated } = useAuth()

  // Redirect unauthenticated users or non-company roles
  if (!isAuthenticated || user?.role !== 'company') {
    router.push('/login')
    return null
  }

  // Return appropriate status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return <FileCheck2 className="h-4 w-4 mr-1" />
      case 'pending':
        return <Clock className="h-4 w-4 mr-1" />
      case 'needs_clarification':
        return <AlertCircle className="h-4 w-4 mr-1" />
      default:
        return <Clock className="h-4 w-4 mr-1" />
    }
  }

  // Return status text
  const getStatusText = (status: string) => {
    switch (status) {
      case 'verified':
        return 'Verified'
      case 'pending':
        return 'Pending Verification'
      case 'needs_clarification':
        return 'Needs Clarification'
      default:
        return 'Unknown'
    }
  }

  // Return text color class based on status
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
        return 'text-green-600'
      case 'pending':
        return 'text-orange-600'
      case 'needs_clarification':
        return 'text-amber-600'
      default:
        return 'text-gray-600'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <CompanyDashboardSidebar />

      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="flex h-14 items-center justify-between border-b bg-white dark:bg-gray-800 px-6">
          <h1 className="text-lg font-semibold">Property Listings</h1>
          <Button
            onClick={() => router.push('/dashboard/company/properties/new')}
            className="bg-green-600 hover:bg-green-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Property
          </Button>
        </div>

        <main className="p-6">
          {/* Filters */}
          <Card className="mb-6 p-4">
            <div className="grid gap-4 md:grid-cols-4">
              <Input placeholder="Search properties..." />
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="verified">Verified</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="needs_clarification">Needs Clarification</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="Property Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="land">Land</SelectItem>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="house">House</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="newest">
                <SelectTrigger>
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </Card>

          {/* Property Cards */}
          <div className="grid gap-6">
            {mockProperties.map((property) => (
              <Card key={property.id} className="overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  {/* Property Image */}
                  <div className="w-full md:w-64 h-48 md:h-auto relative">
                    <img
                      src={property.image}
                      alt={property.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>

                  {/* Property Details */}
                  <div className="flex-1 p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-bold mb-2">{property.title}</h3>
                        <div className="flex items-center text-gray-500 mb-2">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>{property.location}</span>
                        </div>
                      </div>

                      {/* Edit/Delete Buttons */}
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>

                    {/* Price, Type, Status */}
                    <div className="flex items-center space-x-4 mb-4">
                      <span className="font-bold text-lg">{property.price}</span>
                      <span className="text-sm text-gray-500">{property.type}</span>
                      <div className={cn("flex items-center", getStatusColor(property.status))}>
                        {getStatusIcon(property.status)}
                        <span className="text-sm">{getStatusText(property.status)}</span>
                      </div>
                    </div>

                    {/* Clarification Section */}
                    {property.status === 'needs_clarification' && property.clarificationMessage && (
                      <div className="mb-4 p-4 bg-amber-50 border border-amber-200 rounded-lg dark:bg-amber-900/20 dark:border-amber-800">
                        <div className="flex items-start space-x-2">
                          <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="font-medium text-amber-800 dark:text-amber-200 mb-1">
                              Clarification Required
                            </h4>
                            <p className="text-sm text-amber-700 dark:text-amber-300">
                              {property.clarificationMessage}
                            </p>
                            <Button
                              size="sm"
                              className="mt-3 bg-amber-600 hover:bg-amber-700 text-white"
                              onClick={() => router.push(`/dashboard/company/properties/${property.id}/clarify`)}
                            >
                              Provide Clarification
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Date */}
                    <div className="text-sm text-gray-500">
                      Added on {property.date}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}