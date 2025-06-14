'use client'

import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { FileCheck2, Upload } from "lucide-react"

export default function VerifyProperty() {
  const router = useRouter()
  const { user, isAuthenticated } = useAuth()

  // Redirect to login if not an authenticated individual user
  if (!isAuthenticated || user?.role !== 'individual') {
    router.push('/login')
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Dashboard sidebar for navigation */}
      <DashboardSidebar />
      
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="flex h-14 items-center border-b bg-white dark:bg-gray-800 px-6">
          <h1 className="text-lg font-semibold">Verify Property</h1>
        </div>

        <main className="p-6">
          {/* Form card */}
          <Card className="max-w-2xl mx-auto p-6">
            <form className="space-y-6">
              {/* Property Type Dropdown */}
              <div>
                <Label htmlFor="propertyType">Property Type</Label>
                <select
                  id="propertyType"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                >
                  <option value="">Select property type</option>
                  <option value="land">Land</option>
                  <option value="house">House</option>
                  <option value="apartment">Apartment</option>
                </select>
              </div>

              {/* Property Location Dropdown */}
              <div>
                <Label htmlFor="location">Property Location</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fct">FCT (Abuja)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Address Input */}
              <div>
                <Label htmlFor="address">Property Address</Label>
                <Input id="address" placeholder="Enter specific property address in Abuja" />
              </div>

              {/* Property Description */}
              <div>
                <Label htmlFor="description">Property Description</Label>
                <Textarea
                  id="description"
                  placeholder="Provide additional details about the property"
                  className="min-h-[100px]"
                />
              </div>

              {/* Document Upload Placeholders */}
              <div className="space-y-4">
                <Label>Upload Documents</Label>
                <div className="grid gap-4">
                  {['deed', 'survey', 'title'].map((doc) => (
                    <div
                      key={doc}
                      className="border-2 border-dashed rounded-lg p-4 text-center hover:border-green-500 transition-colors"
                    >
                      <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                      <p className="text-sm font-medium capitalize">{doc} Document</p>
                      <p className="text-xs text-gray-500 mt-1">PDF or image files only</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <Button className="w-full bg-green-600 hover:bg-green-700">
                <FileCheck2 className="h-4 w-4 mr-2" />
                Submit for Verification
              </Button>
            </form>
          </Card>
        </main>
      </div>
    </div>
  )
}