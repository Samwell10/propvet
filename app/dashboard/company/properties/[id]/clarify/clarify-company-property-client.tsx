'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth"
import { CompanyDashboardSidebar } from "@/components/dashboard/company-sidebar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { clarificationService, type ClarificationRequest } from "@/lib/api/clarification"
import { ArrowLeft, Upload, X, AlertCircle, FileText } from "lucide-react"

interface ClarifyCompanyPropertyClientProps {
  clarificationData: ClarificationRequest
}

export function ClarifyCompanyPropertyClient({ clarificationData }: ClarifyCompanyPropertyClientProps) {
  const router = useRouter()
  const { user, isAuthenticated } = useAuth()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<{ [key: string]: File | null }>({})
  const [additionalNotes, setAdditionalNotes] = useState("")

  // Restrict access to only logged-in company users
  if (!isAuthenticated || user?.role !== 'company') {
    router.push('/login')
    return null
  }

  // Handle file uploads by mapping them to a dynamic key
  const handleFileUpload = (key: string, file: File) => {
    setUploadedFiles(prev => ({
      ...prev,
      [key]: file
    }))
  }

  // Remove uploaded file from state
  const removeFile = (key: string) => {
    setUploadedFiles(prev => ({
      ...prev,
      [key]: null
    }))
  }

  // Submit clarification with uploaded docs + notes
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await clarificationService.submitCompanyClarification({
        requestId: clarificationData.id,
        files: uploadedFiles,
        notes: additionalNotes
      })

      toast({
        title: "Clarification submitted",
        description: "Your clarification has been submitted successfully. The property status will be marked 'Pending' for re-verification by the Propvet team.",
      })

      router.push('/dashboard/company/properties')
    } catch (error) {
      console.error('Error submitting clarification:', error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <CompanyDashboardSidebar />

      {/* Top nav header */}
      <div className="lg:pl-64">
        <div className="flex h-14 items-center border-b bg-white dark:bg-gray-800 px-6">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-lg font-semibold">Provide Clarification</h1>
        </div>

        <main className="p-6">
          <div className="max-w-4xl mx-auto space-y-6">

            {/* Property Details Card */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Property Information</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-500">Property ID</Label>
                  <p className="font-medium">{clarificationData.id}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Property Title</Label>
                  <p className="font-medium">{clarificationData.title}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Type</Label>
                  <p className="font-medium">{clarificationData.type}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Location</Label>
                  <p className="font-medium">{clarificationData.location}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Price</Label>
                  <p className="font-medium">{clarificationData.price}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Submitted On</Label>
                  <p className="font-medium">{clarificationData.originalSubmissionDate}</p>
                </div>
              </div>
            </Card>

            {/* Clarification Message from Admin */}
            <Card className="p-6">
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-amber-100 rounded-full dark:bg-amber-900/20">
                  <AlertCircle className="h-5 w-5 text-amber-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">Message from the Verification Team</h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {clarificationData.clarificationMessage}
                  </p>

                  {clarificationData.requestedDocuments.length > 0 && (
                    <div className="mt-4">
                      <h4 className="font-medium mb-2">Requested Documents:</h4>
                      <ul className="list-disc list-inside space-y-1">
                        {clarificationData.requestedDocuments.map((doc, index) => (
                          <li key={index} className="text-sm text-gray-600 dark:text-gray-400">
                            {doc}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </Card>

            {/* Upload Clarification Form */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-6">Submit Clarification</h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Upload Field for Each Required Doc */}
                <div className="space-y-4">
                  <Label className="text-base font-medium">Upload Documents</Label>
                  <div className="grid md:grid-cols-2 gap-4">
                    {clarificationData.requestedDocuments.map((docName, index) => {
                      const key = `doc_${index}`
                      return (
                        <div key={key} className="relative">
                          <input
                            type="file"
                            id={key}
                            className="hidden"
                            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                            onChange={(e) => {
                              const file = e.target.files?.[0]
                              if (file) handleFileUpload(key, file)
                            }}
                          />
                          <label
                            htmlFor={key}
                            className={`block p-4 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors ${
                              uploadedFiles[key]
                                ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                                : 'border-gray-300 hover:border-gray-400'
                            }`}
                          >
                            {uploadedFiles[key] ? (
                              <div className="flex items-center justify-center space-x-2">
                                <FileText className="h-5 w-5 text-green-600" />
                                <span className="text-sm font-medium text-green-600">
                                  {uploadedFiles[key]?.name}
                                </span>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.preventDefault()
                                    removeFile(key)
                                  }}
                                  className="p-1 hover:bg-green-100 rounded-full"
                                >
                                  <X className="h-4 w-4 text-green-600" />
                                </button>
                              </div>
                            ) : (
                              <div className="space-y-2">
                                <Upload className="h-8 w-8 mx-auto text-gray-400" />
                                <div>
                                  <p className="text-sm font-medium">{docName}</p>
                                  <p className="text-xs text-gray-500">Accepted: PDF, DOC, JPG, PNG</p>
                                </div>
                              </div>
                            )}
                          </label>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Optional Notes */}
                <div className="space-y-2">
                  <Label htmlFor="additionalNotes">Additional Notes (Optional)</Label>
                  <Textarea
                    id="additionalNotes"
                    placeholder="Any extra explanation or comments for the Propvet verification team..."
                    value={additionalNotes}
                    onChange={(e) => setAdditionalNotes(e.target.value)}
                    className="min-h-[120px]"
                  />
                </div>

                {/* Form Actions */}
                <div className="flex justify-end space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.back()}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Clarification"}
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}