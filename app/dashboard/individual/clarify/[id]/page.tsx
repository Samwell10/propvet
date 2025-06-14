import { notFound } from 'next/navigation'
import { ClarifyPropertyClient } from './clarify-property-client'
import { clarificationService } from '@/lib/api/clarification'

// Generate static params for all clarification requests
export async function generateStaticParams() {
  try {
    // Fetch all clarification request IDs from your database/API
    const clarificationIds = await clarificationService.getAllIndividualClarificationIds()
    
    return clarificationIds.map((id) => ({
      id: id,
    }))
  } catch (error) {
    console.error('Error generating static params for clarifications:', error)
    // Fallback to empty array if API fails
    return []
  }
}

interface ClarifyPropertyPageProps {
  params: {
    id: string
  }
}

export default async function ClarifyPropertyPage({ params }: ClarifyPropertyPageProps) {
  // Fetch clarification data from your database/API
  const clarificationData = await clarificationService.getIndividualClarification(params.id)

  if (!clarificationData) {
    notFound()
  }

  return <ClarifyPropertyClient clarificationData={clarificationData} />
}