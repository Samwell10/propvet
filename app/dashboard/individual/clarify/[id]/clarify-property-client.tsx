'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { clarificationService, type ClarificationRequest } from "@/lib/api/clarification"
import { ArrowLeft, Upload, X, AlertCircle, FileText } from "lucide-react"

interface ClarifyPropertyClientProps {
  clarificationData: ClarificationRequest
}

export function ClarifyPropertyClient({ clarificationData }: ClarifyPropertyClientProps) {
  const router = useRouter()
  const { user, isAuthenticated } = useAuth()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<{ [key: string]: File | null }>({})
  const [additionalNotes, setAdditionalNotes] = useState("")

  // Redirect to login if not authenticated or wrong role
  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'individual') {
      router.push('/login')
    }
  }, [isAuthenticated, user, router])

  // Show nothing while redirecting
  if (!isAuthenticated || user?.role !== 'individual') return null

  // Handle file upload per document key
  const handleFileUpload = (key: string, file: File) => {
    setUploadedFiles(prev => ({
      ...prev,
      [key]: file
    }))
  }

  // Remove uploaded file
  const removeFile = (key: string) => {
    setUploadedFiles(prev => ({
      ...prev,
      [key]: null
    }))
  }

  // Submit clarification form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Validation: Ensure at least one file uploaded
    const hasAtLeastOneFile = Object.values(uploadedFiles).some(file => file !== null)
    if (!hasAtLeastOneFile) {
      toast({
        variant: "destructive",
        title: "No documents uploaded",
        description: "Please upload at least one document before submitting."
      })
      setIsSubmitting(false)
      return
    }

    try {
      await clarificationService.submitIndividualClarification({
        requestId: clarificationData.id,
        files: uploadedFiles,
        notes: additionalNotes
      })

      toast({
        title: "Clarification submitted",
        description: "We'll review your clarification and respond soon.",
      })

      router.push('/dashboard/individual/history')
    } catch (error) {
      console.error('Error submitting clarification:', error)
      toast({
        variant: "destructive",
        title: "Submission failed",
        description: "Something went wrong. Please try again."
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardSidebar />

      <div className="lg:pl-64">
        {/* Header */}
        <div className="flex h-14 items-center border-b bg-white dark:bg-gray-800 px-6">
          <Button variant="ghost" onClick={() => router.back()} className="mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-lg font-semibold">Provide Clarification</h1>
        </div>

        {/* Main content */}
        <main className="p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Property Info */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Property Information</h2>
              <div className="grid md:grid-cols-2 gap-4">
              <PropertyInfo label="Request ID" value={clarificationData.id} />
              <PropertyInfo label="Property Name" value={clarificationData.propertyName} />
              <PropertyInfo label="Type" value={clarificationData.type} />
              <PropertyInfo label="Location" value={clarificationData.location} />
              <PropertyInfo label="Original Submission" value={clarificationData.originalSubmissionDate} />
              <PropertyInfo label="Clarification Requested" value={clarificationData.date} />
              </div>
            </Card>

            {/* Admin clarification message */}
            <Card className="p-6">
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-amber-100 rounded-full dark:bg-amber-900/20">
                  <AlertCircle className="h-5 w-5 text-amber-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">Admin Message</h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {clarificationData.clarificationMessage}
                  </p>
                  {clarificationData.requestedDocuments.length > 0 && (
                    <div className="mt-4">
                      <h4 className="font-medium mb-2">Requested Documents:</h4>
                      <ul className="list-disc list-inside space-y-1">
                        {clarificationData.requestedDocuments.map((doc, i) => (
                          <li key={i} className="text-sm text-gray-600 dark:text-gray-400">
                            {doc}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </Card>

            {/* Clarification Form */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-6">Submit Clarification</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Upload documents */}
                <div className="space-y-4">
                  <Label className="text-base font-medium">Upload Updated Documents</Label>
                  <div className="grid md:grid-cols-2 gap-4">
                    {clarificationData.requestedDocuments.map((docName, index) => {
                      const key = `doc_${index}_${docName.replace(/\s+/g, '_')}`
                      return (
                        <div key={key} className="relative">
                          <input
                            type="file"
                            id={key}
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0]
                              if (file) handleFileUpload(key, file)
                            }}
                            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
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
                                  <p className="text-xs text-gray-500">
                                    Upload document (PDF, DOC, JPG, PNG)
                                  </p>
                                </div>
                              </div>
                            )}
                          </label>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Additional Notes */}
                <div className="space-y-2">
                  <Label htmlFor="additionalNotes">Additional Notes (Optional)</Label>
                  <Textarea
                    id="additionalNotes"
                    placeholder="Add any helpful information..."
                    value={additionalNotes}
                    onChange={(e) => setAdditionalNotes(e.target.value)}
                    className="min-h-[120px]"
                  />
                </div>

                {/* Actions */}
                <div className="flex justify-end space-x-4">
                  <Button type="button" variant="outline" onClick={() => router.back()}>
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

// Reusable property info display with fallback for undefined values
function PropertyInfo({ label, value }: { label: string; value: string | undefined }) {
  return (
    <div>
      <Label className="text-sm font-medium text-gray-500">{label}</Label>
      <p className="font-medium">{value ?? "N/A"}</p>
    </div>
  )
}