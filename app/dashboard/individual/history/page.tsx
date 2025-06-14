'use client'

import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Search, Download } from "lucide-react"

// Abuja-based mock data used for demo purposes
const mockHistory = [
  {
    id: "REQ001",
    propertyName: "2 Bedroom Flat, Wuse 2",
    status: "Verified",
    date: "2024-03-20",
    type: "Apartment",
    location: "Abuja",
    reportUrl: "/reports/REQ001_verification_report.pdf"
  },
  {
    id: "REQ002",
    propertyName: "3 Bedroom Duplex, Gwarinpa",
    status: "Needs Clarification",
    date: "2024-03-19",
    type: "House",
    location: "Abuja",
    reportUrl: null,
    clarificationMessage: "The survey plan document is unclear. Please provide a clearer scan or photo of the survey plan showing all boundaries and measurements."
  },
  {
    id: "REQ003",
    propertyName: "Land at Kuje District",
    status: "Verified",
    date: "2024-03-18",
    type: "Land",
    location: "Abuja",
    reportUrl: "/reports/REQ003_verification_report.pdf"
  },
  {
    id: "REQ004",
    propertyName: "Commercial Building, Central Area",
    status: "Pending",
    date: "2024-03-17",
    type: "Commercial",
    location: "Abuja",
    reportUrl: null
  }
]

export default function History() {
  const router = useRouter()
  const { user, isAuthenticated } = useAuth()

  // Redirect unauthenticated or wrong-role users
  if (!isAuthenticated || user?.role !== 'individual') {
    router.push('/login')
    return null
  }

  // Simulate file download
  const handleDownload = (reportUrl: string) => {
    console.log('Downloading report:', reportUrl)
  }

  // Return status badge with color coding
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
        <div className="flex h-14 items-center border-b bg-white dark:bg-gray-800 px-6">
          <h1 className="text-lg font-semibold">Verification History</h1>
        </div>

        <main className="p-6">
          <Card className="overflow-hidden">
            {/* Search input */}
            <div className="p-6 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input className="pl-10" placeholder="Search verifications..." />
              </div>
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-gray-50 dark:bg-gray-800/50">
                    <th className="text-left p-4 font-medium">Request ID</th>
                    <th className="text-left p-4 font-medium">Property Name</th>
                    <th className="text-left p-4 font-medium">Type</th>
                    <th className="text-left p-4 font-medium">Location</th>
                    <th className="text-left p-4 font-medium">Status</th>
                    <th className="text-left p-4 font-medium">Date</th>
                    <th className="text-left p-4 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {mockHistory.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b hover:bg-gray-50 dark:hover:bg-gray-800/50"
                    >
                      <td className="p-4">{item.id}</td>
                      <td
                        className="p-4 cursor-pointer"
                        onClick={() => router.push(`/dashboard/individual/history/${item.id}`)}
                      >
                        {item.propertyName}
                      </td>
                      <td className="p-4">{item.type}</td>
                      <td className="p-4">{item.location}</td>
                      <td className="p-4">{getStatusBadge(item.status)}</td>
                      <td className="p-4">{item.date}</td>
                      <td className="p-4">
                        {item.status === "Verified" && item.reportUrl ? (
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-green-600 hover:text-green-700"
                            onClick={() => handleDownload(item.reportUrl!)}
                          >
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </Button>
                        ) : item.status === "Needs Clarification" ? (
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-amber-600 hover:text-amber-700"
                            onClick={() => router.push(`/dashboard/individual/clarify/${item.id}`)}
                          >
                            Provide Clarification
                          </Button>
                        ) : (
                          <span className="text-sm text-gray-500">Not available</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile View */}
            <div className="md:hidden divide-y">
              {mockHistory.map((item) => (
                <div key={item.id} className="p-4 space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <p
                        className="font-medium cursor-pointer"
                        onClick={() => router.push(`/dashboard/individual/history/${item.id}`)}
                      >
                        {item.propertyName}
                      </p>
                      <p className="text-sm text-gray-500">{item.id}</p>
                    </div>
                    {getStatusBadge(item.status)}
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm text-gray-500">
                    <div>
                      <p className="font-medium text-gray-700 dark:text-gray-300">Type</p>
                      <p>{item.type}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-700 dark:text-gray-300">Location</p>
                      <p>{item.location}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-700 dark:text-gray-300">Date</p>
                      <p>{item.date}</p>
                    </div>
                  </div>
                  {item.status === "Verified" && item.reportUrl ? (
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full text-green-600 hover:text-green-700"
                      onClick={() => handleDownload(item.reportUrl!)}
                    >
                      <Download className="h-4 w-4 mr-1" />
                      Download Report
                    </Button>
                  ) : item.status === "Needs Clarification" ? (
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full text-amber-600 hover:text-amber-700"
                      onClick={() => router.push(`/dashboard/individual/clarify/${item.id}`)}
                    >
                      Provide Clarification
                    </Button>
                  ) : null}
                </div>
              ))}
            </div>
          </Card>
        </main>
      </div>
    </div>
  )
}