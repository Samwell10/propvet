'use client'

import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  MapPin, 
  Bed, 
  Square, 
  ArrowLeft, 
  Building, 
  Phone, 
  Mail, 
  CheckCircle,
  Shield,
  Camera,
  Share2,
  Heart,
  Bath,
  FileText,
  Ruler,
  Zap,
  TreePine,
  Navigation
} from "lucide-react"
import { cn } from "@/lib/utils"

interface Property {
  id: string
  title: string
  location: string
  fullAddress: string
  price: string
  pricePerSqm?: string
  type: string
  listingType: string
  bedrooms: number
  bathrooms: number
  size: string
  sizeUnit?: string
  totalSqm?: string
  landUse?: string
  zoning?: string
  topography?: string
  soilType?: string
  furnished: string
  parking: string
  images: string[]
  description: string
  features: string[]
  landDetails?: {
    titleDocument: string
    surveyPlan: string
    deedOfAssignment: string
    governmentApproval: string
    accessRoad: string
    utilities: {
      electricity: string
      water: string
      drainage: string
    }
    nearbyLandmarks: string[]
  }
  company: {
    id: string
    name: string
    logo: string
    phone: string
    email: string
    address: string
    verified: boolean
    rating: number
    totalListings: number
  }
  verificationStatus: string
  dateAdded: string
  propertyId: string
}

interface PropertyDetailsClientProps {
  property: Property
}

export function PropertyDetailsClient({ property }: PropertyDetailsClientProps) {
  const router = useRouter()
  const { user, isAuthenticated } = useAuth()

  if (!isAuthenticated || user?.role !== 'individual') {
    router.push('/login')
    return null
  }

  // Define property types that don't have bedrooms/bathrooms
  const landPropertyTypes = ['Land', 'Commercial Land', 'Residential Land', 'Industrial Land', 'Agricultural Land']
  const isLandProperty = landPropertyTypes.includes(property.type)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardSidebar />
      
      <div className="lg:pl-64">
        <div className="flex h-14 items-center border-b bg-white dark:bg-gray-800 px-6">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Listings
          </Button>
          <h1 className="text-lg font-semibold">Property Details</h1>
        </div>

        <main className="p-6">
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Property Images */}
            <Card className="overflow-hidden">
              <div className="grid md:grid-cols-2 gap-4 p-4">
                <div className="relative h-96">
                  <img
                    src={property.images[0]}
                    alt={property.title}
                    className="absolute inset-0 w-full h-full object-cover rounded-lg"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className={cn(
                      "text-white",
                      property.listingType === "for_sale"
                        ? "bg-green-600"
                        : property.listingType === "for_rent"
                        ? "bg-blue-600"
                        : "bg-purple-600"
                    )}>
                      {property.listingType === "for_sale"
                        ? "For Sale"
                        : property.listingType === "for_rent"
                        ? "For Rent"
                        : "Shortlet"}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <Button size="sm" variant="secondary" className="bg-gray-800/80 text-white hover:bg-gray-900/90 border-0">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="secondary" className="bg-gray-800/80 text-white hover:bg-gray-900/90 border-0">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {property.images.slice(1, 4).map((image, index) => (
                    <div key={index} className="relative h-44">
                      <img
                        src={image}
                        alt={`${property.title} ${index + 2}`}
                        className="absolute inset-0 w-full h-full object-cover rounded-lg"
                      />
                    </div>
                  ))}
                  <div className="relative h-44 bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Camera className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                      <p className="text-sm text-gray-500">+{property.images.length - 4} more photos</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Property Information */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
                      <div className="flex items-center text-gray-500 mb-2">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{property.fullAddress}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">ID: {property.propertyId}</Badge>
                        {property.verificationStatus === 'verified' && (
                          <Badge className="bg-green-100 text-green-800">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold text-green-600">{property.price}</p>
                      {property.pricePerSqm && (
                        <p className="text-sm text-gray-500">{property.pricePerSqm} per sqm</p>
                      )}
                      <p className="text-sm text-gray-500">Added {property.dateAdded}</p>
                    </div>
                  </div>

                  {/* Property Stats - Different for Land vs Buildings */}
                  {isLandProperty ? (
                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                      <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl border border-green-200 dark:border-green-800">
                        <Ruler className="h-8 w-8 mx-auto mb-3 text-green-600" />
                        <p className="text-2xl font-bold text-green-900 dark:text-green-100">{property.size}</p>
                        <p className="text-sm font-medium text-green-700 dark:text-green-300">{property.sizeUnit || 'Size'}</p>
                        {property.totalSqm && (
                          <p className="text-xs text-green-600 mt-1">({property.totalSqm})</p>
                        )}
                      </div>
                      <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl border border-blue-200 dark:border-blue-800">
                        <Building className="h-8 w-8 mx-auto mb-3 text-blue-600" />
                        <p className="text-lg font-bold text-blue-900 dark:text-blue-100">{property.landUse || 'Mixed Use'}</p>
                        <p className="text-sm font-medium text-blue-700 dark:text-blue-300">Land Use</p>
                      </div>
                    </div>
                  ) : (
                    <div className="grid md:grid-cols-3 gap-4 mb-6">
                      <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl border border-blue-200 dark:border-blue-800">
                        <Bed className="h-8 w-8 mx-auto mb-3 text-blue-600" />
                        <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">{property.bedrooms}</p>
                        <p className="text-sm font-medium text-blue-700 dark:text-blue-300">Bedrooms</p>
                      </div>
                      <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl border border-green-200 dark:border-green-800">
                        <Bath className="h-8 w-8 mx-auto mb-3 text-green-600" />
                        <p className="text-2xl font-bold text-green-900 dark:text-green-100">{property.bathrooms}</p>
                        <p className="text-sm font-medium text-green-700 dark:text-green-300">Bathrooms</p>
                      </div>
                      <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl border border-purple-200 dark:border-purple-800">
                        <Square className="h-8 w-8 mx-auto mb-3 text-purple-600" />
                        <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">{property.size}</p>
                        <p className="text-sm font-medium text-purple-700 dark:text-purple-300">Size</p>
                      </div>
                    </div>
                  )}

                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Description</h3>
                    <p className="text-gray-600 leading-relaxed">{property.description}</p>
                  </div>
                </Card>

                {/* Land-specific Details */}
                {isLandProperty && property.landDetails && (
                  <Card className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Land Documentation & Details</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center space-x-2 mb-2">
                            <FileText className="h-4 w-4 text-green-600" />
                            <span className="font-medium">Title Document</span>
                          </div>
                          <p className="text-sm text-gray-600">{property.landDetails.titleDocument}</p>
                        </div>
                        <div>
                          <div className="flex items-center space-x-2 mb-2">
                            <Navigation className="h-4 w-4 text-blue-600" />
                            <span className="font-medium">Survey Plan</span>
                          </div>
                          <p className="text-sm text-gray-600">{property.landDetails.surveyPlan}</p>
                        </div>
                        <div>
                          <div className="flex items-center space-x-2 mb-2">
                            <Shield className="h-4 w-4 text-purple-600" />
                            <span className="font-medium">Government Approval</span>
                          </div>
                          <p className="text-sm text-gray-600">{property.landDetails.governmentApproval}</p>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center space-x-2 mb-2">
                            <TreePine className="h-4 w-4 text-green-600" />
                            <span className="font-medium">Topography</span>
                          </div>
                          <p className="text-sm text-gray-600">{property.topography}</p>
                        </div>
                        <div>
                          <div className="flex items-center space-x-2 mb-2">
                            <Square className="h-4 w-4 text-orange-600" />
                            <span className="font-medium">Soil Type</span>
                          </div>
                          <p className="text-sm text-gray-600">{property.soilType}</p>
                        </div>
                        <div>
                          <div className="flex items-center space-x-2 mb-2">
                            <Building className="h-4 w-4 text-blue-600" />
                            <span className="font-medium">Zoning</span>
                          </div>
                          <p className="text-sm text-gray-600">{property.zoning}</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6">
                      <h4 className="font-medium mb-3">Utilities & Infrastructure</h4>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="flex items-center space-x-2">
                          <Zap className="h-4 w-4 text-yellow-600" />
                          <div>
                            <p className="text-sm font-medium">Electricity</p>
                            <p className="text-xs text-gray-600">{property.landDetails.utilities.electricity}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Square className="h-4 w-4 text-blue-600" />
                          <div>
                            <p className="text-sm font-medium">Water</p>
                            <p className="text-xs text-gray-600">{property.landDetails.utilities.water}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Navigation className="h-4 w-4 text-green-600" />
                          <div>
                            <p className="text-sm font-medium">Drainage</p>
                            <p className="text-xs text-gray-600">{property.landDetails.utilities.drainage}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6">
                      <h4 className="font-medium mb-3">Nearby Landmarks</h4>
                      <div className="grid md:grid-cols-2 gap-2">
                        {property.landDetails.nearbyLandmarks.map((landmark, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <MapPin className="h-3 w-3 text-gray-400" />
                            <span className="text-sm text-gray-600">{landmark}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>
                )}

                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Property Features</h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    {property.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Additional Details</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Property Type</p>
                      <p className="font-medium">{property.type}</p>
                    </div>
                    {property.furnished !== "N/A" && (
                      <div>
                        <p className="text-sm text-gray-500">Furnished</p>
                        <p className="font-medium">{property.furnished}</p>
                      </div>
                    )}
                    {property.parking !== "N/A" && (
                      <div>
                        <p className="text-sm text-gray-500">Parking</p>
                        <p className="font-medium">{property.parking}</p>
                      </div>
                    )}
                    {isLandProperty && (
                      <div>
                        <p className="text-sm text-gray-500">Access Road</p>
                        <p className="font-medium">{property.landDetails?.accessRoad || 'Good road access'}</p>
                      </div>
                    )}
                  </div>
                </Card>
              </div>

              {/* Company Information */}
              <div className="space-y-6">
                <Card className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100">
                      <img
                        src={property.company.logo}
                        alt={property.company.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{property.company.name}</h3>
                      <div className="flex items-center space-x-2">
                        {property.company.verified && (
                          <Badge className="bg-green-100 text-green-800">
                            <Shield className="h-3 w-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                        <span className="text-sm text-gray-500">★ {property.company.rating}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">{property.company.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">{property.company.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">{property.company.address}</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button className="w-full bg-green-600 hover:bg-green-700">
                      <Phone className="h-4 w-4 mr-2" />
                      Call Agent
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Mail className="h-4 w-4 mr-2" />
                      Send Message
                    </Button>
                  </div>

                  <div className="mt-4 pt-4 border-t text-center">
                    <p className="text-sm text-gray-500">
                      {property.company.totalListings} active listings
                    </p>
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