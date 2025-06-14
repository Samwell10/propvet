// Property details page (mock) for displaying property info by ID

import { notFound } from 'next/navigation'
import { PropertyDetailsClient } from './property-details-client'

// Mock data for property details in Abuja (Propvet starts in Abuja only)
const mockPropertyDetails = {
  "1": {
    id: "1",
    title: "Modern 3 Bedroom Apartment",
    location: "Gwarinpa, Abuja",
    fullAddress: "Plot 23, 6th Avenue, Gwarinpa, Abuja",
    price: "₦75,000,000",
    type: "Apartment",
    listingType: "for_sale",
    bedrooms: 3,
    bathrooms: 3,
    size: "150 sqm",
    furnished: "Fully Furnished",
    parking: "2 Car Spaces",
    images: [
      "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg",
      "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
      "https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg",
      "https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg"
    ],
    description:
      "Experience modern living in this elegant 3-bedroom apartment located in Gwarinpa. Spacious interiors, high-quality finishes, and serene environment make it perfect for families.",
    features: [
      "24/7 Security",
      "Borehole Water Supply",
      "Dedicated Parking",
      "Backup Power",
      "Children's Playground",
      "Gated Estate",
      "Modern Kitchen Appliances",
      "CCTV Surveillance"
    ],
    company: {
      id: "abuja1",
      name: "Abuja Homes Ltd",
      logo: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2",
      phone: "+234 901 234 5678",
      email: "info@abujahomes.ng",
      address: "Suite 5, Central Area, Abuja",
      verified: true,
      rating: 4.7,
      totalListings: 42
    },
    verificationStatus: "verified",
    dateAdded: "April 22, 2024",
    propertyId: "AH-GW-001"
  },
  "2": {
    id: "2",
    title: "Luxury 5 Bedroom Duplex with BQ",
    location: "Maitama, Abuja",
    fullAddress: "No. 12, Ibrahim Way, Maitama, Abuja",
    price: "₦300,000,000",
    type: "Duplex",
    listingType: "for_sale",
    bedrooms: 5,
    bathrooms: 6,
    size: "500 sqm",
    furnished: "Fully Furnished",
    parking: "4 Car Spaces",
    images: [
      "https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg",
      "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg",
      "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
      "https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg"
    ],
    description:
      "A state-of-the-art luxury duplex in Maitama, perfect for top-tier executives. Includes boys' quarters, smart home systems, and a private garden.",
    features: [
      "Smart Home Tech",
      "Boys' Quarters",
      "Private Garden",
      "Swimming Pool",
      "Gym",
      "Central Cooling",
      "Solar Backup",
      "24/7 Security"
    ],
    company: {
      id: "abuja2",
      name: "Capital Realty",
      logo: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2",
      phone: "+234 902 345 6789",
      email: "sales@capitalrealty.ng",
      address: "Plot 8, Wuse 2, Abuja",
      verified: true,
      rating: 4.9,
      totalListings: 63
    },
    verificationStatus: "verified",
    dateAdded: "April 25, 2024",
    propertyId: "CR-MT-002"
  }
}

// Generate static params from available property IDs
export async function generateStaticParams() {
  return Object.keys(mockPropertyDetails).map((id) => ({
    id: id,
  }))
}

interface PropertyDetailsPageProps {
  params: {
    id: string
  }
}

// Render the property details page using client component
export default function PropertyDetailsPage({ params }: PropertyDetailsPageProps) {
  const property = mockPropertyDetails[params.id as keyof typeof mockPropertyDetails]

  if (!property) {
    notFound()
  }

  return <PropertyDetailsClient property={property} />
}