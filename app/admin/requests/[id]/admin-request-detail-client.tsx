// 'use client'

// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import { useAuth } from "@/lib/auth"
// import { AdminDashboardSidebar } from "@/components/dashboard/admin-sidebar"
// import { Card } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { Textarea } from "@/components/ui/textarea"
// import { Label } from "@/components/ui/label"
// import { useToast } from "@/hooks/use-toast"
// import {
//   ArrowLeft,
//   CheckCircle,
//   XCircle,
//   AlertCircle,
//   Download,
//   FileText,
//   User,
//   MapPin,
//   Calendar,
//   Building
// } from "lucide-react"
// import { cn } from "@/lib/utils"

// interface RequestData {
//   id: string
//   propertyName: string
//   submittedBy: string
//   submitterEmail: string
//   submitterPhone: string
//   submitterType: string
//   type: string
//   location: string
//   fullAddress: string
//   price: string
//   size: string
//   status: string
//   submittedAt: string
//   priority: string
//   description: string
//   documents: Array<{
//     name: string
//     type: string
//     size: string
//     url: string
//   }>
// }

// interface AdminRequestDetailClientProps {
//   requestData: RequestData
// }

// export function AdminRequestDetailClient({ requestData }: AdminRequestDetailClientProps) {
//   const router = useRouter()
//   const { user, isAuthenticated } = useAuth()
//   const { toast } = useToast()
//   const [isProcessing, setIsProcessing] = useState(false)
//   const [clarificationMessage, setClarificationMessage] = useState("")
//   const [rejectionReason, setRejectionReason] = useState("")

//   if (!isAuthenticated || user?.role !== 'admin') {
//     router.push('/login')
//     return null
//   }

//   const handleApprove = async () => {
//     setIsProcessing(true)
//     try {
//       // TODO: Implement approval logic
//       console.log('Approving request:', requestData.id)
      
//       toast({
//         title: "Request approved",
//         description: "The property verification has been approved successfully.",
//       })
      
//       router.push('/admin/requests')
//     } catch (error) {
//       console.error('Error approving request:', error)
//       toast({
//         variant: "destructive",
//         title: "Error",
//         description: "Failed to approve request. Please try again.",
//       })
//     } finally {
//       setIsProcessing(false)
//     }
//   }

//   const handleReject = async () => {
//     if (!rejectionReason.trim()) {
//       toast({
//         variant: "destructive",
//         title: "Rejection reason required",
//         description: "Please provide a reason for rejecting this request.",
//       })
//       return
//     }

//     setIsProcessing(true)
//     try {
//       // TODO: Implement rejection logic
//       console.log('Rejecting request:', requestData.id, 'Reason:', rejectionReason)
      
//       toast({
//         title: "Request rejected",
//         description: "The property verification has been rejected.",
//       })
      
//       router.push('/admin/requests')
//     } catch (error) {
//       console.error('Error rejecting request:', error)
//       toast({
//         variant: "destructive",
//         title: "Error",
//         description: "Failed to reject request. Please try again.",
//       })
//     } finally {
//       setIsProcessing(false)
//     }
//   }

//   const handleRequestClarification = async () => {
//     if (!clarificationMessage.trim()) {
//       toast({
//         variant: "destructive",
//         title: "Clarification message required",
//         description: "Please provide a message explaining what clarification is needed.",
//       })
//       return
//     }

//     setIsProcessing(true)
//     try {
//       // TODO: Implement clarification request logic
//       console.log('Requesting clarification for:', requestData.id, 'Message:', clarificationMessage)
      
//       toast({
//         title: "Clarification requested",
//         description: "The user has been notified to provide additional information.",
//       })
      
//       router.push('/admin/requests')
//     } catch (error) {
//       console.error('Error requesting clarification:', error)
//       toast({
//         variant: "destructive",
//         title: "Error",
//         description: "Failed to request clarification. Please try again.",
//       })
//     } finally {
//       setIsProcessing(false)
//     }
//   }

//   const handleDownloadDocument = (url: string, name: string) => {
//     // TODO: Implement document download
//     console.log('Downloading document:', name, url)
//     toast({
//       title: "Download started",
//       description: `Downloading ${name}...`,
//     })
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
//       <AdminDashboardSidebar />
      
//       <div className="lg:pl-64">
//         <div className="flex h-14 items-center border-b bg-white dark:bg-gray-800 px-6">
//           <Button
//             variant="ghost"
//             onClick={() => router.back()}
//             className="mr-4"
//           >
//             <ArrowLeft className="h-4 w-4 mr-2" />
//             Back to Requests
//           </Button>
//           <h1 className="text-lg font-semibold">Review Request - {requestData.id}</h1>
//         </div>

//         <main className="p-6">
//           <div className="max-w-6xl mx-auto space-y-6">
//             {/* Request Header */}
//             <Card className="p-6">
//               <div className="flex items-center justify-between mb-4">
//                 <div className="flex items-center space-x-4">
//                   <h1 className="text-2xl font-bold">{requestData.propertyName}</h1>
//                   <Badge variant={requestData.priority === 'high' ? 'destructive' : 'secondary'}>
//                     {requestData.priority.charAt(0).toUpperCase() + requestData.priority.slice(1)} Priority
//                   </Badge>
//                 </div>
//                 <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900/20">
//                   <AlertCircle className="h-4 w-4 mr-1" />
//                   Pending Review
//                 </Badge>
//               </div>

//               <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
//                 <div className="flex items-center space-x-3">
//                   <User className="h-5 w-5 text-gray-400" />
//                   <div>
//                     <p className="text-sm text-gray-500">Submitted by</p>
//                     <p className="font-medium">{requestData.submittedBy}</p>
//                     <p className="text-sm text-gray-500">{requestData.submitterType}</p>
//                   </div>
//                 </div>

//                 <div className="flex items-center space-x-3">
//                   <Building className="h-5 w-5 text-gray-400" />
//                   <div>
//                     <p className="text-sm text-gray-500">Property Type</p>
//                     <p className="font-medium">{requestData.type}</p>
//                     <p className="text-sm text-gray-500">{requestData.size}</p>
//                   </div>
//                 </div>

//                 <div className="flex items-center space-x-3">
//                   <MapPin className="h-5 w-5 text-gray-400" />
//                   <div>
//                     <p className="text-sm text-gray-500">Location</p>
//                     <p className="font-medium">{requestData.location}</p>
//                   </div>
//                 </div>

//                 <div className="flex items-center space-x-3">
//                   <Calendar className="h-5 w-5 text-gray-400" />
//                   <div>
//                     <p className="text-sm text-gray-500">Submitted</p>
//                     <p className="font-medium">{requestData.submittedAt}</p>
//                   </div>
//                 </div>
//               </div>
//             </Card>

//             <div className="grid lg:grid-cols-3 gap-6">
//               {/* Property Details */}
//               <div className="lg:col-span-2 space-y-6">
//                 <Card className="p-6">
//                   <h2 className="text-xl font-semibold mb-4">Property Information</h2>
//                   <div className="space-y-4">
//                     <div>
//                       <Label className="text-sm font-medium text-gray-500">Full Address</Label>
//                       <p className="font-medium">{requestData.fullAddress}</p>
//                     </div>
//                     <div>
//                       <Label className="text-sm font-medium text-gray-500">Price</Label>
//                       <p className="font-medium text-lg text-green-600">{requestData.price}</p>
//                     </div>
//                     <div>
//                       <Label className="text-sm font-medium text-gray-500">Description</Label>
//                       <p className="text-gray-700 dark:text-gray-300">{requestData.description}</p>
//                     </div>
//                   </div>
//                 </Card>

//                 <Card className="p-6">
//                   <h2 className="text-xl font-semibold mb-4">Submitted Documents</h2>
//                   <div className="grid md:grid-cols-2 gap-4">
//                     {requestData.documents.map((doc, index) => (
//                       <div
//                         key={index}
//                         className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50"
//                       >
//                         <div className="flex items-center space-x-3">
//                           <FileText className="h-8 w-8 text-blue-600" />
//                           <div>
//                             <p className="font-medium">{doc.name}</p>
//                             <p className="text-sm text-gray-500">{doc.size}</p>
//                           </div>
//                         </div>
//                         <Button
//                           variant="outline"
//                           size="sm"
//                           onClick={() => handleDownloadDocument(doc.url, doc.name)}
//                         >
//                           <Download className="h-4 w-4 mr-1" />
//                           View
//                         </Button>
//                       </div>
//                     ))}
//                   </div>
//                 </Card>
//               </div>

//               {/* Actions Panel */}
//               <div className="space-y-6">
//                 <Card className="p-6">
//                   <h2 className="text-xl font-semibold mb-4">Submitter Information</h2>
//                   <div className="space-y-3">
//                     <div>
//                       <Label className="text-sm font-medium text-gray-500">Email</Label>
//                       <p className="font-medium">{requestData.submitterEmail}</p>
//                     </div>
//                     <div>
//                       <Label className="text-sm font-medium text-gray-500">Phone</Label>
//                       <p className="font-medium">{requestData.submitterPhone}</p>
//                     </div>
//                     <div>
//                       <Label className="text-sm font-medium text-gray-500">Account Type</Label>
//                       <p className="font-medium">{requestData.submitterType}</p>
//                     </div>
//                   </div>
//                 </Card>

//                 <Card className="p-6">
//                   <h2 className="text-xl font-semibold mb-4">Actions</h2>
//                   <div className="space-y-4">
//                     <Button
//                       className="w-full bg-green-600 hover:bg-green-700"
//                       onClick={handleApprove}
//                       disabled={isProcessing}
//                     >
//                       <CheckCircle className="h-4 w-4 mr-2" />
//                       Approve Verification
//                     </Button>

//                     <div className="space-y-2">
//                       <Label htmlFor="clarification">Request Clarification</Label>
//                       <Textarea
//                         id="clarification"
//                         placeholder="Explain what additional information or documents are needed..."
//                         value={clarificationMessage}
//                         onChange={(e) => setClarificationMessage(e.target.value)}
//                         className="min-h-[100px]"
//                       />
//                       <Button
//                         variant="outline"
//                         className="w-full"
//                         onClick={handleRequestClarification}
//                         disabled={isProcessing}
//                       >
//                         <AlertCircle className="h-4 w-4 mr-2" />
//                         Request Clarification
//                       </Button>
//                     </div>

//                     <div className="space-y-2">
//                       <Label htmlFor="rejection">Rejection Reason</Label>
//                       <Textarea
//                         id="rejection"
//                         placeholder="Provide a detailed reason for rejecting this verification..."
//                         value={rejectionReason}
//                         onChange={(e) => setRejectionReason(e.target.value)}
//                         className="min-h-[100px]"
//                       />
//                       <Button
//                         variant="destructive"
//                         className="w-full"
//                         onClick={handleReject}
//                         disabled={isProcessing}
//                       >
//                         <XCircle className="h-4 w-4 mr-2" />
//                         Reject Verification
//                       </Button>
//                     </div>
//                   </div>
//                 </Card>
//               </div>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   )
// }

'use client'

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth"
import { AdminDashboardSidebar } from "@/components/dashboard/admin-sidebar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import {
  ArrowLeft,
  CheckCircle,
  XCircle,
  AlertCircle,
  Download,
  FileText,
  User,
  MapPin,
  Calendar,
  Building
} from "lucide-react"

interface RequestData {
  id: string
  propertyName: string
  submittedBy: string
  submitterEmail: string
  submitterPhone: string
  submitterType: string
  type: string
  location: string
  fullAddress: string
  price: string
  size: string
  status: string
  submittedAt: string
  priority: string
  description: string
  documents: Array<{
    name: string
    type: string
    size: string
    url: string
  }>
}

interface AdminRequestDetailClientProps {
  requestData: RequestData
}

export function AdminRequestDetailClient({ requestData }: AdminRequestDetailClientProps) {
  const router = useRouter()
  const { user, isAuthenticated } = useAuth()
  const { toast } = useToast()
  const [isProcessing, setIsProcessing] = useState(false)
  const [clarificationMessage, setClarificationMessage] = useState("")
  const [rejectionReason, setRejectionReason] = useState("")

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'admin') {
      router.push('/login')
    }
  }, [isAuthenticated, user, router])

  if (!isAuthenticated || user?.role !== 'admin') return null

  const handleApprove = async () => {
    setIsProcessing(true)
    try {
      console.log('Approving request:', requestData.id)
      toast({
        title: "Request approved",
        description: "The property verification has been approved successfully.",
      })
      router.push('/admin/requests')
    } catch (error) {
      console.error('Error approving request:', error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to approve request. Please try again.",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const handleReject = async () => {
    if (!rejectionReason.trim()) {
      toast({
        variant: "destructive",
        title: "Rejection reason required",
        description: "Please provide a reason for rejecting this request.",
      })
      return
    }

    setIsProcessing(true)
    try {
      console.log('Rejecting request:', requestData.id, 'Reason:', rejectionReason)
      toast({
        title: "Request rejected",
        description: "The property verification has been rejected.",
      })
      router.push('/admin/requests')
    } catch (error) {
      console.error('Error rejecting request:', error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to reject request. Please try again.",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const handleRequestClarification = async () => {
    if (!clarificationMessage.trim()) {
      toast({
        variant: "destructive",
        title: "Clarification message required",
        description: "Please provide a message explaining what clarification is needed.",
      })
      return
    }

    setIsProcessing(true)
    try {
      console.log('Requesting clarification for:', requestData.id, 'Message:', clarificationMessage)
      toast({
        title: "Clarification requested",
        description: "The user has been notified to provide additional information.",
      })
      router.push('/admin/requests')
    } catch (error) {
      console.error('Error requesting clarification:', error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to request clarification. Please try again.",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const handleDownloadDocument = (url: string, name: string) => {
    const link = document.createElement("a")
    link.href = url
    link.download = name
    link.target = "_blank"
    link.rel = "noopener noreferrer"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    toast({
      title: "Download started",
      description: `Downloading ${name}...`,
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <AdminDashboardSidebar />

      <div className="lg:pl-64">
        <div className="flex h-14 items-center border-b bg-white dark:bg-gray-800 px-6">
          <Button variant="ghost" onClick={() => router.back()} className="mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Requests
          </Button>
          <h1 className="text-lg font-semibold">Review Request - {requestData.id}</h1>
        </div>

        <main className="p-6">
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Request Header */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <h1 className="text-2xl font-bold">{requestData.propertyName}</h1>
                  <Badge variant={requestData.priority === 'high' ? 'destructive' : 'secondary'}>
                    {requestData.priority.charAt(0).toUpperCase() + requestData.priority.slice(1)} Priority
                  </Badge>
                </div>
                <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900/20">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {requestData.status || "Pending Review"}
                </Badge>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="flex items-center space-x-3">
                  <User className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Submitted by</p>
                    <p className="font-medium">{requestData.submittedBy}</p>
                    <p className="text-sm text-gray-500">{requestData.submitterType}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Building className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Property Type</p>
                    <p className="font-medium">{requestData.type}</p>
                    <p className="text-sm text-gray-500">{requestData.size}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-medium">{requestData.location}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Submitted</p>
                    <p className="font-medium">{requestData.submittedAt}</p>
                  </div>
                </div>
              </div>
            </Card>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Property Details */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Property Information</h2>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Full Address</Label>
                      <p className="font-medium">{requestData.fullAddress}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Price</Label>
                      <p className="font-medium text-lg text-green-600">{requestData.price}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Description</Label>
                      <p className="text-gray-700 dark:text-gray-300">{requestData.description}</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Submitted Documents</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {requestData.documents.map((doc, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50"
                      >
                        <div className="flex items-center space-x-3">
                          <FileText className="h-8 w-8 text-blue-600" />
                          <div>
                            <p className="font-medium">{doc.name}</p>
                            <p className="text-sm text-gray-500">{doc.size}</p>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDownloadDocument(doc.url, doc.name)}
                        >
                          <Download className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              {/* Actions Panel */}
              <div className="space-y-6">
                <Card className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Submitter Information</h2>
                  <div className="space-y-3">
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Email</Label>
                      <p className="font-medium">{requestData.submitterEmail}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Phone</Label>
                      <p className="font-medium">{requestData.submitterPhone}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Account Type</Label>
                      <p className="font-medium">{requestData.submitterType}</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Actions</h2>
                  <div className="space-y-4">
                    <Button
                      className="w-full bg-green-600 hover:bg-green-700"
                      onClick={handleApprove}
                      disabled={isProcessing}
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Approve Verification
                    </Button>

                    <div className="space-y-2">
                      <Label htmlFor="clarification">Request Clarification</Label>
                      <Textarea
                        id="clarification"
                        placeholder="Explain what additional information or documents are needed..."
                        value={clarificationMessage}
                        onChange={(e) => setClarificationMessage(e.target.value)}
                        className="min-h-[100px]"
                      />
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={handleRequestClarification}
                        disabled={isProcessing || !clarificationMessage.trim()}
                      >
                        <AlertCircle className="h-4 w-4 mr-2" />
                        Request Clarification
                      </Button>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="rejection">Rejection Reason</Label>
                      <Textarea
                        id="rejection"
                        placeholder="Provide a detailed reason for rejecting this verification..."
                        value={rejectionReason}
                        onChange={(e) => setRejectionReason(e.target.value)}
                        className="min-h-[100px]"
                      />
                      <Button
                        variant="destructive"
                        className="w-full"
                        onClick={handleReject}
                        disabled={isProcessing || !rejectionReason.trim()}
                      >
                        <XCircle className="h-4 w-4 mr-2" />
                        Reject Verification
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}