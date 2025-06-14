import { User } from '@/lib/auth'

// Types
export interface Property {
  id: string
  title: string
  type: 'land' | 'residential' | 'commercial'
  price: string
  size: string
  sizeUnit: 'sqm' | 'hectares' | 'acres'
  location: {
    state: string
    lga: string
    address: string
  }
  description: string
  status?: 'pending' | 'verified' | 'rejected'
  documents?: {
    deed?: File
    survey?: File
    photos?: File[]
    title?: File
  }
}

export interface VerificationRequest {
  id: string
  propertyName: string
  status: 'Verified' | 'Pending'
  date: string
  type: string
  location: string
  reportUrl?: string
}

export interface BlogPost {
  title: string
  excerpt: string
  author: string
  date: string
  category: string
  image: string
}

export interface ContactForm {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

export interface SupportTicket {
  subject: string
  category: string
  priority: 'low' | 'medium' | 'high' | 'urgent'
  message: string
  attachments?: File[]
}

// Auth Service
export const authService = {
  async login(email: string, password: string, role: 'individual' | 'company'): Promise<User> {
    // TODO: Replace with actual API call
    console.log('Login attempt:', { email, role })
    throw new Error('Not implemented')
  },

  async register(data: {
    fullName: string
    email: string
    password: string
    phone: string
    role: 'individual' | 'company'
    companyName?: string
  }): Promise<User> {
    // TODO: Replace with actual API call
    console.log('Register attempt:', data)
    throw new Error('Not implemented')
  },

  async logout(): Promise<void> {
    // TODO: Replace with actual API call
    console.log('Logout')
  },

  async resetPassword(email: string): Promise<void> {
    // TODO: Replace with actual API call
    console.log('Reset password for:', email)
    throw new Error('Not implemented')
  }
}

// Property Service
export const propertyService = {
  async listProperties(filters?: {
    search?: string
    type?: string
    status?: string
    sort?: string
  }): Promise<Property[]> {
    // TODO: Replace with actual API call
    console.log('List properties with filters:', filters)
    throw new Error('Not implemented')
  },

  async getProperty(id: string): Promise<Property> {
    // TODO: Replace with actual API call
    console.log('Get property:', id)
    throw new Error('Not implemented')
  },

  async createProperty(data: Property): Promise<Property> {
    // TODO: Replace with actual API call
    console.log('Create property:', data)
    throw new Error('Not implemented')
  },

  async updateProperty(id: string, data: Partial<Property>): Promise<Property> {
    // TODO: Replace with actual API call
    console.log('Update property:', { id, data })
    throw new Error('Not implemented')
  },

  async deleteProperty(id: string): Promise<void> {
    // TODO: Replace with actual API call
    console.log('Delete property:', id)
    throw new Error('Not implemented')
  },

  async verifyProperty(data: {
    propertyType: string
    location: string
    description: string
    documents: Record<string, File>
  }): Promise<void> {
    // TODO: Replace with actual API call
    console.log('Verify property:', data)
    throw new Error('Not implemented')
  }
}

// Verification Service
export const verificationService = {
  async getVerificationHistory(): Promise<VerificationRequest[]> {
    // TODO: Replace with actual API call
    console.log('Get verification history')
    throw new Error('Not implemented')
  },

  async getVerificationReport(id: string): Promise<Blob> {
    // TODO: Replace with actual API call
    console.log('Get verification report:', id)
    throw new Error('Not implemented')
  }
}

// Blog Service
export const blogService = {
  async listPosts(): Promise<BlogPost[]> {
    // TODO: Replace with actual API call
    console.log('List blog posts')
    throw new Error('Not implemented')
  },

  async getPost(slug: string): Promise<BlogPost> {
    // TODO: Replace with actual API call
    console.log('Get blog post:', slug)
    throw new Error('Not implemented')
  }
}

// Contact Service
export const contactService = {
  async submitContactForm(data: ContactForm): Promise<void> {
    // TODO: Replace with actual API call
    console.log('Submit contact form:', data)
    throw new Error('Not implemented')
  }
}

// Support Service
export const supportService = {
  async createTicket(data: SupportTicket): Promise<void> {
    // TODO: Replace with actual API call
    console.log('Create support ticket:', data)
    throw new Error('Not implemented')
  },

  async listTickets(): Promise<any[]> {
    // TODO: Replace with actual API call
    console.log('List support tickets')
    throw new Error('Not implemented')
  }
}

// Subscription Service
export const subscriptionService = {
  async subscribe(plan: string): Promise<void> {
    // TODO: Replace with actual API call
    console.log('Subscribe to plan:', plan)
    throw new Error('Not implemented')
  },

  async getSubscriptionStatus(): Promise<{
    status: 'active' | 'inactive'
    plan: string
    nextBilling: string
  }> {
    // TODO: Replace with actual API call
    console.log('Get subscription status')
    throw new Error('Not implemented')
  }
}