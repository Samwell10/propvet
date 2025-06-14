// Clarification API Service
export interface ClarificationRequest {
  id: string
  propertyName?: string
  title?: string
  location: string
  status: string
  type: string
  date: string
  clarificationMessage: string
  requestedDocuments: string[]
  originalSubmissionDate: string
  price?: string
}

export interface ClarificationSubmission {
  requestId: string
  files: { [key: string]: File | null }
  notes: string
}

// Mock data - replace with actual API calls
const mockIndividualClarifications: { [key: string]: ClarificationRequest } = {
  "REQ002": {
    id: "REQ002",
    propertyName: "3 Bedroom Duplex, Ikeja GRA",
    location: "Lagos",
    status: "Needs Clarification",
    type: "House",
    date: "2024-03-19",
    clarificationMessage: "The survey plan document is unclear. Please provide a clearer scan or photo of the survey plan showing all boundaries and measurements. Additionally, the Certificate of Occupancy appears to be missing page 2. Please upload the complete document.",
    requestedDocuments: [
      "Survey Plan (clearer version)",
      "Certificate of Occupancy (complete document)"
    ],
    originalSubmissionDate: "2024-03-15"
  },
  "REQ005": {
    id: "REQ005",
    propertyName: "2 Bedroom Apartment, Victoria Island",
    location: "Lagos",
    status: "Needs Clarification",
    type: "Apartment",
    date: "2024-03-20",
    clarificationMessage: "The deed of assignment document quality is poor and some text is illegible. Please provide a high-resolution scan or clear photo of the document.",
    requestedDocuments: [
      "Deed of Assignment (high-resolution scan)"
    ],
    originalSubmissionDate: "2024-03-16"
  }
}

const mockCompanyClarifications: { [key: string]: ClarificationRequest } = {
  "2": {
    id: "2",
    title: "Commercial Land",
    location: "Ibeju-Lekki, Lagos",
    price: "₦120,000,000",
    status: "needs_clarification",
    type: "Land",
    date: "2024-03-14",
    clarificationMessage: "The Certificate of Occupancy document appears to be incomplete. Please provide the complete document with all pages clearly visible. Additionally, the survey plan needs to show clearer boundary markings.",
    requestedDocuments: [
      "Certificate of Occupancy (complete document)",
      "Survey Plan (with clear boundary markings)"
    ],
    originalSubmissionDate: "2024-03-10"
  },
  "4": {
    id: "4",
    title: "Office Complex, Ikeja",
    location: "Ikeja, Lagos",
    price: "₦300,000,000",
    status: "needs_clarification",
    type: "Commercial",
    date: "2024-03-21",
    clarificationMessage: "The building plan approval document is missing the architect's stamp and signature. Please provide the properly endorsed building plan approval.",
    requestedDocuments: [
      "Building Plan Approval (with architect's endorsement)"
    ],
    originalSubmissionDate: "2024-03-17"
  }
}

// API Service Functions
export const clarificationService = {
  // Get all individual clarification requests (for generateStaticParams)
  async getAllIndividualClarificationIds(): Promise<string[]> {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/clarifications/individual')
      // const data = await response.json()
      // return data.map((item: any) => item.id)
      
      return Object.keys(mockIndividualClarifications)
    } catch (error) {
      console.error('Error fetching individual clarification IDs:', error)
      return []
    }
  },

  // Get all company clarification requests (for generateStaticParams)
  async getAllCompanyClarificationIds(): Promise<string[]> {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/clarifications/company')
      // const data = await response.json()
      // return data.map((item: any) => item.id)
      
      return Object.keys(mockCompanyClarifications)
    } catch (error) {
      console.error('Error fetching company clarification IDs:', error)
      return []
    }
  },

  // Get individual clarification request by ID
  async getIndividualClarification(id: string): Promise<ClarificationRequest | null> {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`/api/clarifications/individual/${id}`)
      // if (!response.ok) return null
      // return await response.json()
      
      return mockIndividualClarifications[id] || null
    } catch (error) {
      console.error('Error fetching individual clarification:', error)
      return null
    }
  },

  // Get company clarification request by ID
  async getCompanyClarification(id: string): Promise<ClarificationRequest | null> {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`/api/clarifications/company/${id}`)
      // if (!response.ok) return null
      // return await response.json()
      
      return mockCompanyClarifications[id] || null
    } catch (error) {
      console.error('Error fetching company clarification:', error)
      return null
    }
  },

  // Submit individual clarification
  async submitIndividualClarification(data: ClarificationSubmission): Promise<void> {
    try {
      // TODO: Replace with actual API call
      // const formData = new FormData()
      // formData.append('requestId', data.requestId)
      // formData.append('notes', data.notes)
      // 
      // Object.entries(data.files).forEach(([key, file]) => {
      //   if (file) {
      //     formData.append(key, file)
      //   }
      // })
      // 
      // const response = await fetch('/api/clarifications/individual/submit', {
      //   method: 'POST',
      //   body: formData
      // })
      // 
      // if (!response.ok) {
      //   throw new Error('Failed to submit clarification')
      // }
      
      console.log('Individual clarification submitted:', data)
    } catch (error) {
      console.error('Error submitting individual clarification:', error)
      throw error
    }
  },

  // Submit company clarification
  async submitCompanyClarification(data: ClarificationSubmission): Promise<void> {
    try {
      // TODO: Replace with actual API call
      // const formData = new FormData()
      // formData.append('propertyId', data.requestId)
      // formData.append('notes', data.notes)
      // 
      // Object.entries(data.files).forEach(([key, file]) => {
      //   if (file) {
      //     formData.append(key, file)
      //   }
      // })
      // 
      // const response = await fetch('/api/clarifications/company/submit', {
      //   method: 'POST',
      //   body: formData
      // })
      // 
      // if (!response.ok) {
      //   throw new Error('Failed to submit clarification')
      // }
      
      console.log('Company clarification submitted:', data)
    } catch (error) {
      console.error('Error submitting company clarification:', error)
      throw error
    }
  }
}

// Database/API Integration Examples
export const databaseExamples = {
  // Example with Supabase
  async getSupabaseClarifications() {
    // const { createClient } = require('@supabase/supabase-js')
    // const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY)
    // 
    // const { data, error } = await supabase
    //   .from('clarification_requests')
    //   .select('id')
    //   .eq('status', 'needs_clarification')
    // 
    // if (error) throw error
    // return data.map(item => item.id)
  },

  // Example with REST API
  async getRestApiClarifications() {
    // const response = await fetch(`${process.env.API_BASE_URL}/clarifications`, {
    //   headers: {
    //     'Authorization': `Bearer ${process.env.API_TOKEN}`,
    //     'Content-Type': 'application/json'
    //   }
    // })
    // 
    // if (!response.ok) throw new Error('Failed to fetch clarifications')
    // const data = await response.json()
    // return data.map((item: any) => item.id)
  },

  // Example with GraphQL
  async getGraphQLClarifications() {
    // const query = `
    //   query GetClarifications {
    //     clarificationRequests(where: { status: "needs_clarification" }) {
    //       id
    //     }
    //   }
    // `
    // 
    // const response = await fetch(process.env.GRAPHQL_ENDPOINT, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${process.env.GRAPHQL_TOKEN}`
    //   },
    //   body: JSON.stringify({ query })
    // })
    // 
    // const { data } = await response.json()
    // return data.clarificationRequests.map((item: any) => item.id)
  }
}