// 'use client'

// import { useEffect } from "react"
// import { useRouter } from "next/navigation"
// import { useAuth } from "@/lib/auth"
// import { AdminDashboardSidebar } from "@/components/dashboard/admin-sidebar"
// import { Card } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"
// import {
//   BarChart3,
//   TrendingUp,
//   Users,
//   FileCheck2,
//   Clock,
//   CheckCircle,
//   XCircle,
//   AlertCircle,
//   Download,
//   Calendar
// } from "lucide-react"

// // Mock statistics data
// const mockStats = {
//   overview: {
//     totalRequests: 1247,
//     verifiedToday: 23,
//     pendingRequests: 45,
//     rejectedToday: 3,
//     avgProcessingTime: "4.2 hours",
//     successRate: "94.2%"
//   },
//   monthly: {
//     totalRequests: [120, 135, 98, 156, 189, 167, 145, 178, 203, 189, 234, 267],
//     verifiedRequests: [112, 128, 89, 147, 178, 156, 134, 167, 189, 178, 221, 251],
//     rejectedRequests: [8, 7, 9, 9, 11, 11, 11, 11, 14, 11, 13, 16]
//   },
//   byType: {
//     land: 45,
//     residential: 35,
//     commercial: 20
//   },
//   byState: [
//     { state: "Lagos", count: 456 },
//     { state: "Abuja", count: 234 },
//     { state: "Rivers", count: 123 },
//     { state: "Ogun", count: 98 },
//     { state: "Kano", count: 87 }
//   ],
//   adminPerformance: [
//     { name: "Admin User", verified: 156, pending: 12, avgTime: "3.8 hours" },
//     { name: "Jane Admin", verified: 134, pending: 8, avgTime: "4.1 hours" },
//     { name: "Mike Admin", verified: 98, pending: 15, avgTime: "4.5 hours" }
//   ]
// }

// export default function AdminStats() {
//   const router = useRouter()
//   const { user, isAuthenticated } = useAuth()

//   useEffect(() => {
//     if (!isAuthenticated || user?.role !== 'admin') {
//       router.push('/login')
//     }
//   }, [isAuthenticated, user, router])

//   if (!isAuthenticated || user?.role !== 'admin') {
//     return null
//   }

//   const handleExportReport = () => {
//     // TODO: Implement report export functionality
//     console.log('Exporting statistics report...')
//   }

//   const months = [
//     "Jan", "Feb", "Mar", "Apr", "May", "Jun",
//     "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
//   ]

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
//       <AdminDashboardSidebar />
      
//       <div className="lg:pl-64">
//         <div className="flex h-14 items-center justify-between border-b bg-white dark:bg-gray-800 px-6">
//           <h1 className="text-lg font-semibold">Statistics & Analytics</h1>
//           <div className="flex items-center space-x-2">
//             <Select defaultValue="last-30-days">
//               <SelectTrigger className="w-40">
//                 <SelectValue />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="last-7-days">Last 7 days</SelectItem>
//                 <SelectItem value="last-30-days">Last 30 days</SelectItem>
//                 <SelectItem value="last-90-days">Last 90 days</SelectItem>
//                 <SelectItem value="last-year">Last year</SelectItem>
//               </SelectContent>
//             </Select>
//             <Button
//               onClick={handleExportReport}
//               className="bg-blue-600 hover:bg-blue-700"
//             >
//               <Download className="h-4 w-4 mr-2" />
//               Export Report
//             </Button>
//           </div>
//         </div>

//         <main className="p-6">
//           {/* Overview Stats */}
//           <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
//             <Card className="p-6">
//               <div className="flex items-center space-x-4">
//                 <div className="p-3 bg-blue-100 rounded-full dark:bg-blue-900/20">
//                   <BarChart3 className="h-6 w-6 text-blue-600" />
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-500 dark:text-gray-400">Total Requests</p>
//                   <h3 className="text-2xl font-bold">{mockStats.overview.totalRequests}</h3>
//                   <p className="text-xs text-green-600">+12% from last month</p>
//                 </div>
//               </div>
//             </Card>

//             <Card className="p-6">
//               <div className="flex items-center space-x-4">
//                 <div className="p-3 bg-green-100 rounded-full dark:bg-green-900/20">
//                   <CheckCircle className="h-6 w-6 text-green-600" />
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-500 dark:text-gray-400">Verified Today</p>
//                   <h3 className="text-2xl font-bold">{mockStats.overview.verifiedToday}</h3>
//                   <p className="text-xs text-green-600">+8% from yesterday</p>
//                 </div>
//               </div>
//             </Card>

//             <Card className="p-6">
//               <div className="flex items-center space-x-4">
//                 <div className="p-3 bg-orange-100 rounded-full dark:bg-orange-900/20">
//                   <Clock className="h-6 w-6 text-orange-600" />
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-500 dark:text-gray-400">Pending Requests</p>
//                   <h3 className="text-2xl font-bold">{mockStats.overview.pendingRequests}</h3>
//                   <p className="text-xs text-orange-600">-5% from yesterday</p>
//                 </div>
//               </div>
//             </Card>

//             <Card className="p-6">
//               <div className="flex items-center space-x-4">
//                 <div className="p-3 bg-purple-100 rounded-full dark:bg-purple-900/20">
//                   <TrendingUp className="h-6 w-6 text-purple-600" />
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-500 dark:text-gray-400">Success Rate</p>
//                   <h3 className="text-2xl font-bold">{mockStats.overview.successRate}</h3>
//                   <p className="text-xs text-green-600">+2.1% from last month</p>
//                 </div>
//               </div>
//             </Card>
//           </div>

//           {/* Charts and Analytics */}
//           <div className="grid gap-6 lg:grid-cols-2 mb-8">
//             {/* Monthly Trends */}
//             <Card className="p-6">
//               <h3 className="text-lg font-semibold mb-4">Monthly Verification Trends</h3>
//               <div className="space-y-4">
//                 <div className="flex items-center justify-between text-sm">
//                   <span className="text-gray-500">Average Processing Time</span>
//                   <span className="font-medium">{mockStats.overview.avgProcessingTime}</span>
//                 </div>
                
//                 {/* Simple bar chart representation */}
//                 <div className="space-y-3">
//                   {months.slice(-6).map((month, index) => {
//                     const total = mockStats.monthly.totalRequests[index + 6]
//                     const verified = mockStats.monthly.verifiedRequests[index + 6]
//                     const percentage = Math.round((verified / total) * 100)
                    
//                     return (
//                       <div key={month} className="space-y-1">
//                         <div className="flex justify-between text-sm">
//                           <span>{month}</span>
//                           <span>{verified}/{total} ({percentage}%)</span>
//                         </div>
//                         <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
//                           <div 
//                             className="bg-green-600 h-2 rounded-full transition-all duration-300"
//                             style={{ width: `${percentage}%` }}
//                           />
//                         </div>
//                       </div>
//                     )
//                   })}
//                 </div>
//               </div>
//             </Card>

//             {/* Property Types Distribution */}
//             <Card className="p-6">
//               <h3 className="text-lg font-semibold mb-4">Verification by Property Type</h3>
//               <div className="space-y-4">
//                 {Object.entries(mockStats.byType).map(([type, percentage]) => (
//                   <div key={type} className="space-y-2">
//                     <div className="flex justify-between text-sm">
//                       <span className="capitalize">{type}</span>
//                       <span>{percentage}%</span>
//                     </div>
//                     <div className="w-full bg-gray-200 rounded-full h-3 dark:bg-gray-700">
//                       <div 
//                         className={`h-3 rounded-full transition-all duration-300 ${
//                           type === 'land' ? 'bg-blue-600' :
//                           type === 'residential' ? 'bg-green-600' : 'bg-purple-600'
//                         }`}
//                         style={{ width: `${percentage}%` }}
//                       />
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </Card>
//           </div>

//           {/* Detailed Analytics */}
//           <div className="grid gap-6 lg:grid-cols-2">
//             {/* Top States */}
//             <Card className="p-6">
//               <h3 className="text-lg font-semibold mb-4">Verifications by State</h3>
//               <div className="space-y-4">
//                 {mockStats.byState.map((item, index) => (
//                   <div key={item.state} className="flex items-center justify-between">
//                     <div className="flex items-center space-x-3">
//                       <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-medium text-blue-600 dark:bg-blue-900/20">
//                         {index + 1}
//                       </div>
//                       <span className="font-medium">{item.state}</span>
//                     </div>
//                     <span className="text-gray-600 dark:text-gray-400">{item.count}</span>
//                   </div>
//                 ))}
//               </div>
//             </Card>

//             {/* Admin Performance */}
//             <Card className="p-6">
//               <h3 className="text-lg font-semibold mb-4">Admin Performance</h3>
//               <div className="space-y-4">
//                 {mockStats.adminPerformance.map((admin, index) => (
//                   <div key={admin.name} className="p-4 bg-gray-50 rounded-lg dark:bg-gray-800/50">
//                     <div className="flex items-center justify-between mb-2">
//                       <span className="font-medium">{admin.name}</span>
//                       <span className="text-sm text-gray-500">{admin.avgTime} avg</span>
//                     </div>
//                     <div className="grid grid-cols-2 gap-4 text-sm">
//                       <div>
//                         <span className="text-gray-500">Verified:</span>
//                         <span className="ml-2 font-medium text-green-600">{admin.verified}</span>
//                       </div>
//                       <div>
//                         <span className="text-gray-500">Pending:</span>
//                         <span className="ml-2 font-medium text-orange-600">{admin.pending}</span>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </Card>
//           </div>

//           {/* Additional Metrics */}
//           <div className="mt-8">
//             <Card className="p-6">
//               <h3 className="text-lg font-semibold mb-4">Key Performance Indicators</h3>
//               <div className="grid md:grid-cols-4 gap-6">
//                 <div className="text-center">
//                   <div className="text-2xl font-bold text-green-600">{mockStats.overview.avgProcessingTime}</div>
//                   <div className="text-sm text-gray-500">Avg Processing Time</div>
//                 </div>
//                 <div className="text-center">
//                   <div className="text-2xl font-bold text-blue-600">{mockStats.overview.successRate}</div>
//                   <div className="text-sm text-gray-500">Success Rate</div>
//                 </div>
//                 <div className="text-center">
//                   <div className="text-2xl font-bold text-purple-600">{mockStats.overview.rejectedToday}</div>
//                   <div className="text-sm text-gray-500">Rejected Today</div>
//                 </div>
//                 <div className="text-center">
//                   <div className="text-2xl font-bold text-orange-600">2.1 hrs</div>
//                   <div className="text-sm text-gray-500">Avg Response Time</div>
//                 </div>
//               </div>
//             </Card>
//           </div>
//         </main>
//       </div>
//     </div>
//   )
// }
'use client'

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth"
import { AdminDashboardSidebar } from "@/components/dashboard/admin-sidebar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  BarChart3,
  TrendingUp,
  Clock,
  CheckCircle,
  Download,
} from "lucide-react"

// Updated mock statistics data (Abuja only)
const mockStats = {
  overview: {
    totalRequests: 234,
    verifiedToday: 23,
    pendingRequests: 45,
    rejectedToday: 3,
    avgProcessingTime: "4.2 hours",
    successRate: "94.2%"
  },
  monthly: {
    totalRequests: [120, 135, 98, 156, 189, 167, 145, 178, 203, 189, 234, 267],
    verifiedRequests: [112, 128, 89, 147, 178, 156, 134, 167, 189, 178, 221, 251],
    rejectedRequests: [8, 7, 9, 9, 11, 11, 11, 11, 14, 11, 13, 16]
  },
  byType: {
    land: 45,
    residential: 35,
    commercial: 20
  },
  byState: [
    { state: "Abuja", count: 234 }
  ],
  adminPerformance: [
    { name: "Admin User", verified: 156, pending: 12, avgTime: "3.8 hours" },
    { name: "Jane Admin", verified: 134, pending: 8, avgTime: "4.1 hours" },
    { name: "Mike Admin", verified: 98, pending: 15, avgTime: "4.5 hours" }
  ]
}

export default function AdminStats() {
  const router = useRouter()
  const { user, isAuthenticated } = useAuth()

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'admin') {
      router.push('/login')
    }
  }, [isAuthenticated, user, router])

  if (!isAuthenticated || user?.role !== 'admin') return null

  const handleExportReport = () => {
    console.log('Exporting statistics report...')
  }

  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <AdminDashboardSidebar />
      <div className="lg:pl-64">
        <div className="flex h-14 items-center justify-between border-b bg-white dark:bg-gray-800 px-6">
          <h1 className="text-lg font-semibold">Statistics & Analytics</h1>
          <div className="flex items-center space-x-2">
            <Select defaultValue="last-30-days">
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="last-7-days">Last 7 days</SelectItem>
                <SelectItem value="last-30-days">Last 30 days</SelectItem>
                <SelectItem value="last-90-days">Last 90 days</SelectItem>
                <SelectItem value="last-year">Last year</SelectItem>
              </SelectContent>
            </Select>
            <Button
              onClick={handleExportReport}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        <main className="p-6">
          {/* Overview Stats */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <Card className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-100 rounded-full dark:bg-blue-900/20">
                  <BarChart3 className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Total Requests</p>
                  <h3 className="text-2xl font-bold">{mockStats.overview.totalRequests}</h3>
                  <p className="text-xs text-green-600">+12% from last month</p>
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
                  <h3 className="text-2xl font-bold">{mockStats.overview.verifiedToday}</h3>
                  <p className="text-xs text-green-600">+8% from yesterday</p>
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
                  <h3 className="text-2xl font-bold">{mockStats.overview.pendingRequests}</h3>
                  <p className="text-xs text-orange-600">-5% from yesterday</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-purple-100 rounded-full dark:bg-purple-900/20">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Success Rate</p>
                  <h3 className="text-2xl font-bold">{mockStats.overview.successRate}</h3>
                  <p className="text-xs text-green-600">+2.1% from last month</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Verification by State (Abuja only) */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Verifications by State</h3>
            <div className="space-y-4">
              {mockStats.byState.map((item, index) => (
                <div key={item.state} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-medium text-blue-600 dark:bg-blue-900/20">
                      {index + 1}
                    </div>
                    <span className="font-medium">{item.state}</span>
                  </div>
                  <span className="text-gray-600 dark:text-gray-400">{item.count}</span>
                </div>
              ))}
            </div>
          </Card>
        </main>
      </div>
    </div>
  )
}