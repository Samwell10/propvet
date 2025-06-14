import { notFound } from 'next/navigation'
import { ClarifyCompanyPropertyClient } from './clarify-company-property-client'
import { clarificationService } from '@/lib/api/clarification'

// This function generates static paths for all clarification pages (used with `output: export`)
export async function generateStaticParams() {
  try {
    // Fetch all clarification request IDs for company properties
    const clarificationIds = await clarificationService.getAllCompanyClarificationIds()
    
    // Return array of route params
    return clarificationIds.map((id) => ({
      id: id,
    }))
  } catch (error) {
    console.error('Error generating static params for company clarifications:', error)
    // Return empty array if fetching fails
    return []
  }
}

interface ClarifyCompanyPropertyPageProps {
  params: {
    id: string
  }
}

// Server component to load the clarification request page
export default async function ClarifyCompanyPropertyPage({ params }: ClarifyCompanyPropertyPageProps) {
  // Get clarification data using the request ID
  const clarificationData = await clarificationService.getCompanyClarification(params.id)

  // If no data is found, render the 404 page
  if (!clarificationData) {
    notFound()
  }

  // Render the client component with the clarification data
  return <ClarifyCompanyPropertyClient clarificationData={clarificationData} />
}