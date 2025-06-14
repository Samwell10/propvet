'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth"
import { SuperAdminDashboardSidebar } from "@/components/dashboard/superadmin-sidebar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { 
  CreditCard, 
  Plus, 
  Edit, 
  Trash2, 
  Save,
  DollarSign,
  Users,
  Check
} from "lucide-react"

// Mock subscription plans data
const mockPlans = [
  {
    id: "1",
    name: "Free",
    price: 0,
    currency: "NGN",
    interval: "month",
    description: "Perfect for getting started",
    features: [
      "Pay ₦5,000 per property verification",
      "Standard verification (48 hours)",
      "Basic analytics dashboard",
      "Email support",
      "No monthly commitment"
    ],
    verificationLimit: 0,
    pricePerVerification: 5000,
    isActive: true,
    subscribers: 2847
  },
  {
    id: "2",
    name: "Bronze",
    price: 50000,
    currency: "NGN",
    interval: "month",
    description: "Great for small agencies",
    features: [
      "10 property verifications included",
      "Additional verifications at ₦4,000 each",
      "Priority verification (24 hours)",
      "Advanced analytics",
      "Priority email support"
    ],
    verificationLimit: 10,
    pricePerVerification: 4000,
    isActive: true,
    subscribers: 156
  },
  {
    id: "3",
    name: "Silver",
    price: 100000,
    currency: "NGN",
    interval: "month",
    description: "For growing companies",
    features: [
      "25 property verifications included",
      "Additional verifications at ₦3,000 each",
      "Express verification (12 hours)",
      "Advanced analytics",
      "Phone & email support",
      "Featured listings"
    ],
    verificationLimit: 25,
    pricePerVerification: 3000,
    isActive: true,
    subscribers: 89
  },
  {
    id: "4",
    name: "Gold",
    price: 200000,
    currency: "NGN",
    interval: "month",
    description: "For large agencies",
    features: [
      "Unlimited property verifications",
      "Express verification (6 hours)",
      "Premium analytics",
      "24/7 priority support",
      "Featured listings",
      "API access"
    ],
    verificationLimit: -1, // -1 means unlimited
    pricePerVerification: 0,
    isActive: true,
    subscribers: 45
  }
]

export default function SubscriptionPlans() {
  const router = useRouter()
  const { user, isAuthenticated } = useAuth()
  const { toast } = useToast()
  const [plans, setPlans] = useState(mockPlans)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingPlan, setEditingPlan] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Form state for creating/editing plans
  const [planForm, setPlanForm] = useState({
    name: "",
    price: "",
    currency: "NGN",
    interval: "month",
    description: "",
    features: [""],
    verificationLimit: "",
    pricePerVerification: "",
    isActive: true
  })

  if (!isAuthenticated || user?.role !== 'super_admin') {
    router.push('/login')
    return null
  }

  const resetForm = () => {
    setPlanForm({
      name: "",
      price: "",
      currency: "NGN",
      interval: "month",
      description: "",
      features: [""],
      verificationLimit: "",
      pricePerVerification: "",
      isActive: true
    })
    setEditingPlan(null)
  }

  const handleCreatePlan = () => {
    resetForm()
    setIsDialogOpen(true)
  }

  const handleEditPlan = (plan: any) => {
    setPlanForm({
      name: plan.name,
      price: plan.price.toString(),
      currency: plan.currency,
      interval: plan.interval,
      description: plan.description,
      features: plan.features,
      verificationLimit: plan.verificationLimit.toString(),
      pricePerVerification: plan.pricePerVerification.toString(),
      isActive: plan.isActive
    })
    setEditingPlan(plan)
    setIsDialogOpen(true)
  }

  const handleSavePlan = async () => {
    setIsLoading(true)
    try {
      // TODO: Implement API call to save plan
      const planData = {
        ...planForm,
        price: parseInt(planForm.price),
        verificationLimit: parseInt(planForm.verificationLimit),
        pricePerVerification: parseInt(planForm.pricePerVerification)
      }

      if (editingPlan) {
        // Update existing plan
        setPlans(prev => prev.map(p => 
          p.id === editingPlan.id 
            ? { ...p, ...planData }
            : p
        ))
        console.log('Updating plan:', editingPlan.id, planData)
      } else {
        // Create new plan
        const newPlan = {
          id: Date.now().toString(),
          ...planData,
          subscribers: 0
        }
        setPlans(prev => [...prev, newPlan])
        console.log('Creating plan:', newPlan)
      }

      toast({
        title: editingPlan ? "Plan updated" : "Plan created",
        description: `The subscription plan has been ${editingPlan ? 'updated' : 'created'} successfully.`,
      })

      setIsDialogOpen(false)
      resetForm()
    } catch (error) {
      console.error('Error saving plan:', error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save plan. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeletePlan = async (planId: string) => {
    try {
      // TODO: Implement API call to delete plan
      setPlans(prev => prev.filter(p => p.id !== planId))
      console.log('Deleting plan:', planId)
      
      toast({
        title: "Plan deleted",
        description: "The subscription plan has been deleted successfully.",
      })
    } catch (error) {
      console.error('Error deleting plan:', error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete plan. Please try again.",
      })
    }
  }

  const handleTogglePlanStatus = async (planId: string, isActive: boolean) => {
    try {
      // TODO: Implement API call to toggle plan status
      setPlans(prev => prev.map(p => 
        p.id === planId 
          ? { ...p, isActive }
          : p
      ))
      console.log('Toggling plan status:', planId, isActive)
      
      toast({
        title: `Plan ${isActive ? 'activated' : 'deactivated'}`,
        description: `The subscription plan has been ${isActive ? 'activated' : 'deactivated'}.`,
      })
    } catch (error) {
      console.error('Error toggling plan status:', error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update plan status. Please try again.",
      })
    }
  }

  const addFeature = () => {
    setPlanForm(prev => ({
      ...prev,
      features: [...prev.features, ""]
    }))
  }

  const updateFeature = (index: number, value: string) => {
    setPlanForm(prev => ({
      ...prev,
      features: prev.features.map((feature, i) => i === index ? value : feature)
    }))
  }

  const removeFeature = (index: number) => {
    setPlanForm(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <SuperAdminDashboardSidebar />
      
      <div className="lg:pl-64">
        <div className="flex h-14 items-center justify-between border-b bg-white dark:bg-gray-800 px-6">
          <h1 className="text-lg font-semibold">Subscription Plans</h1>
          <Button
            onClick={handleCreatePlan}
            className="bg-purple-600 hover:bg-purple-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Plan
          </Button>
        </div>

        <main className="p-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {plans.map((plan) => (
              <Card key={plan.id} className="relative overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold">{plan.name}</h3>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={plan.isActive}
                        onCheckedChange={(checked) => handleTogglePlanStatus(plan.id, checked)}
                      />
                      <Badge variant={plan.isActive ? "default" : "secondary"}>
                        {plan.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-baseline">
                      <span className="text-3xl font-bold">
                        {plan.currency === "NGN" ? "₦" : "$"}{plan.price.toLocaleString()}
                      </span>
                      <span className="text-gray-500 ml-1">/{plan.interval}</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {plan.description}
                    </p>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-gray-500">Subscribers</span>
                      <span className="font-medium">{plan.subscribers}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Verifications</span>
                      <span className="font-medium">
                        {plan.verificationLimit === -1 ? "Unlimited" : plan.verificationLimit}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 mb-6">
                    {plan.features.slice(0, 3).map((feature, index) => (
                      <div key={index} className="flex items-center text-sm">
                        <Check className="h-4 w-4 text-green-600 mr-2 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                    {plan.features.length > 3 && (
                      <p className="text-sm text-gray-500">
                        +{plan.features.length - 3} more features
                      </p>
                    )}
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleEditPlan(plan)}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:text-red-700"
                      onClick={() => handleDeletePlan(plan.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Create/Edit Plan Dialog */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingPlan ? "Edit Plan" : "Create New Plan"}
                </DialogTitle>
                <DialogDescription>
                  {editingPlan 
                    ? "Update the subscription plan details below."
                    : "Create a new subscription plan for your platform."
                  }
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="planName">Plan Name</Label>
                    <Input
                      id="planName"
                      value={planForm.name}
                      onChange={(e) => setPlanForm(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="e.g., Premium"
                    />
                  </div>

                  <div>
                    <Label htmlFor="planPrice">Price</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="planPrice"
                        type="number"
                        className="pl-10"
                        value={planForm.price}
                        onChange={(e) => setPlanForm(prev => ({ ...prev, price: e.target.value }))}
                        placeholder="0"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="verificationLimit">Verification Limit</Label>
                    <Input
                      id="verificationLimit"
                      type="number"
                      value={planForm.verificationLimit}
                      onChange={(e) => setPlanForm(prev => ({ ...prev, verificationLimit: e.target.value }))}
                      placeholder="Enter -1 for unlimited"
                    />
                  </div>

                  <div>
                    <Label htmlFor="pricePerVerification">Price per Additional Verification</Label>
                    <Input
                      id="pricePerVerification"
                      type="number"
                      value={planForm.pricePerVerification}
                      onChange={(e) => setPlanForm(prev => ({ ...prev, pricePerVerification: e.target.value }))}
                      placeholder="0"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="planDescription">Description</Label>
                  <Textarea
                    id="planDescription"
                    value={planForm.description}
                    onChange={(e) => setPlanForm(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Brief description of the plan"
                  />
                </div>

                <div>
                  <Label>Features</Label>
                  <div className="space-y-2">
                    {planForm.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Input
                          value={feature}
                          onChange={(e) => updateFeature(index, e.target.value)}
                          placeholder="Enter feature description"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeFeature(index)}
                          disabled={planForm.features.length === 1}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addFeature}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Feature
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Plan Status</Label>
                    <p className="text-sm text-gray-500">Enable or disable this plan</p>
                  </div>
                  <Switch
                    checked={planForm.isActive}
                    onCheckedChange={(checked) => setPlanForm(prev => ({ ...prev, isActive: checked }))}
                  />
                </div>
              </div>

              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSavePlan}
                  disabled={isLoading}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {isLoading ? "Saving..." : editingPlan ? "Update Plan" : "Create Plan"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </main>
      </div>
    </div>
  )
}