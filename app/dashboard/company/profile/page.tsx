'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth"
import { CompanyDashboardSidebar } from "@/components/dashboard/company-sidebar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { 
  Building2, 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Users, 
  Calendar,
  Camera
} from "lucide-react"

// Only Abuja (FCT) is supported at this stage
const nigerianStates = ["FCT"]

export default function CompanyProfile() {
  const router = useRouter()
  const { user, isAuthenticated } = useAuth()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  // Company form data state
  const [companyData, setCompanyData] = useState({
    companyName: user?.name || "Propvet Partner",
    email: user?.email || "contact@propvet.ng",
    phone: "+234 801 234 5678",
    website: "https://propvet.ng",
    address: "Plot 123, Gwarinpa, Abuja",
    state: "fct",
    lga: "Gwarinpa",
    description: "Propvet partner specializing in verified Abuja property listings.",
    foundedYear: "2021",
    employeeCount: "11-50",
    licenseNumber: "PROP-FCT/2021/001",
    logo: null as File | null
  })

  // Redirect unauthorized users
  if (!isAuthenticated || user?.role !== 'company') {
    router.push('/login')
    return null
  }

  // Handle input changes
  const handleInputChange = (field: string, value: string) => {
    setCompanyData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  // Handle company logo upload
  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setCompanyData(prev => ({
        ...prev,
        logo: file
      }))
    }
  }

  // Handle profile form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Placeholder for future API integration
      console.log('Updating company profile:', companyData)

      await new Promise(resolve => setTimeout(resolve, 1000))

      toast({
        title: "Profile updated",
        description: "Your Propvet company profile has been successfully saved.",
      })
    } catch (error) {
      console.error('Error:', error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update your profile. Try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <CompanyDashboardSidebar />

      <div className="lg:pl-64">
        <div className="flex h-14 items-center border-b bg-white dark:bg-gray-800 px-6">
          <h1 className="text-lg font-semibold">Company Profile</h1>
        </div>

        <main className="p-6">
          <div className="max-w-4xl mx-auto">
            <Card className="p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                
                {/* Upload Company Logo */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Company Logo</h2>
                  <div className="flex items-center space-x-6">
                    <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                      {companyData.logo ? (
                        <img
                          src={URL.createObjectURL(companyData.logo)}
                          alt="Company logo"
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <Building2 className="h-8 w-8 text-gray-400" />
                      )}
                    </div>
                    <div>
                      <input
                        type="file"
                        id="logo"
                        className="hidden"
                        accept="image/*"
                        onChange={handleLogoUpload}
                      />
                      <label
                        htmlFor="logo"
                        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
                      >
                        <Camera className="h-4 w-4 mr-2" />
                        Upload Logo
                      </label>
                      <p className="text-sm text-gray-500 mt-1">
                        PNG or JPG — 200x200px recommended
                      </p>
                    </div>
                  </div>
                </div>

                {/* Basic Info */}
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">Basic Information</h2>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="companyName">Company Name *</Label>
                      <Input
                        id="companyName"
                        className="pl-10"
                        value={companyData.companyName}
                        onChange={(e) => handleInputChange('companyName', e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        className="pl-10"
                        value={companyData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        className="pl-10"
                        value={companyData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        type="url"
                        className="pl-10"
                        value={companyData.website}
                        onChange={(e) => handleInputChange('website', e.target.value)}
                        placeholder="https://propvet.ng"
                      />
                    </div>

                    <div>
                      <Label htmlFor="licenseNumber">License Number</Label>
                      <Input
                        id="licenseNumber"
                        value={companyData.licenseNumber}
                        onChange={(e) => handleInputChange('licenseNumber', e.target.value)}
                        placeholder="e.g., PROP-FCT/2021/001"
                      />
                    </div>

                    <div>
                      <Label htmlFor="foundedYear">Founded Year</Label>
                      <Input
                        id="foundedYear"
                        className="pl-10"
                        value={companyData.foundedYear}
                        onChange={(e) => handleInputChange('foundedYear', e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="employeeCount">Number of Employees</Label>
                    <Select
                      value={companyData.employeeCount}
                      onValueChange={(value) => handleInputChange('employeeCount', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select employee count" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-10">1-10 employees</SelectItem>
                        <SelectItem value="11-50">11-50 employees</SelectItem>
                        <SelectItem value="51-100">51-100 employees</SelectItem>
                        <SelectItem value="101-500">101-500 employees</SelectItem>
                        <SelectItem value="500+">500+ employees</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Abuja-Only Location Info */}
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">Location Information</h2>

                  <div>
                    <Label htmlFor="address">Office Address *</Label>
                    <Textarea
                      id="address"
                      className="pl-10 min-h-[80px]"
                      value={companyData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      placeholder="e.g., Plot 456, Wuse II, Abuja"
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="state">State *</Label>
                      <Select
                        value={companyData.state}
                        onValueChange={(value) => handleInputChange('state', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                          {nigerianStates.map((state) => (
                            <SelectItem key={state} value={state.toLowerCase()}>
                              {state}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="lga">Local Government Area *</Label>
                      <Input
                        id="lga"
                        value={companyData.lga}
                        onChange={(e) => handleInputChange('lga', e.target.value)}
                        placeholder="e.g., Gwarinpa, Wuse, Garki"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* About Company */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Company Description</h2>
                  <Textarea
                    id="description"
                    className="min-h-[120px]"
                    value={companyData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Briefly describe what your company does and why people should trust your listings"
                  />
                  <p className="text-sm text-gray-500">
                    This will be displayed on your public Propvet profile.
                  </p>
                </div>

                {/* Form Buttons */}
                <div className="flex justify-end space-x-4 pt-6 border-t">
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
                    disabled={isLoading}
                  >
                    {isLoading ? "Saving..." : "Save Changes"}
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