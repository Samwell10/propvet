'use client'

import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth"
import { CompanyDashboardSidebar } from "@/components/dashboard/company-sidebar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, Shield, Award, Crown, Zap } from "lucide-react"

const plans = [
  {
    name: "Free",
    price: "₦0",
    period: "base plan",
    description: "Perfect for getting started",
    features: [
      "Pay ₦5,000 per property verification",
      "Standard verification (48 hours)",
      "Basic analytics dashboard",
      "Email support",
      "No monthly commitment"
    ],
    icon: Shield
  },
  {
    name: "Bronze",
    price: "₦50,000",
    period: "per month",
    description: "Great for small agencies",
    features: [
      "10 property verifications included",
      "Additional verifications at ₦4,000 each",
      "Priority verification (24 hours)",
      "Advanced analytics",
      "Priority email support"
    ],
    icon: Award
  },
  {
    name: "Silver",
    price: "₦100,000",
    period: "per month",
    description: "For growing companies",
    features: [
      "25 property verifications included",
      "Additional verifications at ₦3,000 each",
      "Express verification (12 hours)",
      "Advanced analytics",
      "Phone & email support",
      "Featured listings"
    ],
    icon: Crown
  },
  {
    name: "Gold",
    price: "₦200,000",
    period: "per month",
    description: "For large agencies",
    features: [
      "Unlimited property verifications",
      "Express verification (6 hours)",
      "Premium analytics",
      "24/7 priority support",
      "Featured listings",
      "API access"
    ],
    icon: Zap,
    popular: true
  }
]

export default function Subscribe() {
  const router = useRouter()
  const { user, isAuthenticated, updateSubscriptionStatus } = useAuth()

  if (!isAuthenticated || user?.role !== 'company') {
    router.push('/login')
    return null
  }

  const handleSubscribe = (plan: string) => {
    // TODO: Implement Stripe/Paystack integration
    console.log(`Subscribing to ${plan} plan`)
    
    // Update subscription status and redirect to dashboard
    updateSubscriptionStatus(true)
    router.push('/dashboard/company')
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <CompanyDashboardSidebar />
      
      <div className="lg:pl-64">
        <div className="flex h-14 items-center border-b bg-white dark:bg-gray-800 px-6">
          <h1 className="text-lg font-semibold">Subscription Plans</h1>
        </div>

        <main className="p-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Choose Your Plan</h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Start with our free plan and pay per listing, or choose a subscription for reduced per-verification costs and additional benefits
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {plans.map((plan) => (
                <Card
                  key={plan.name}
                  className={`relative p-8 ${
                    plan.popular
                      ? "border-2 border-green-500 shadow-lg transform hover:-translate-y-1 transition-all duration-300"
                      : "hover:shadow-md transition-all duration-300"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
                      <span className="inline-block bg-gradient-to-r from-green-500 to-green-600 text-white text-sm font-bold px-6 py-2 rounded-full shadow-lg">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className="flex justify-center mb-6">
                    <div className={`p-3 rounded-full ${
                      plan.popular
                        ? "bg-green-100 text-green-600 dark:bg-green-900/20"
                        : "bg-gray-100 text-gray-600 dark:bg-gray-800"
                    }`}>
                      <plan.icon className="h-6 w-6" />
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-center mb-2">{plan.name}</h3>
                  <div className="text-center mb-6">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-gray-500 dark:text-gray-400"> {plan.period}</span>
                  </div>

                  <p className="text-gray-600 dark:text-gray-400 text-center mb-6">
                    {plan.description}
                  </p>

                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <Check className={`h-5 w-5 mr-3 flex-shrink-0 ${
                          plan.popular ? 'text-green-500' : 'text-gray-500'
                        }`} />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full ${
                      plan.popular
                        ? "bg-green-600 hover:bg-green-700 shadow-md"
                        : ""
                    }`}
                    variant={plan.popular ? "default" : "outline"}
                    onClick={() => handleSubscribe(plan.name)}
                  >
                    {plan.name === "Free" ? "Get Started" : `Subscribe to ${plan.name}`}
                  </Button>
                </Card>
              ))}
            </div>

            <div className="max-w-2xl mx-auto mt-12 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                All plans include access to our property verification platform, secure document storage,
                and basic customer support. Prices are in Nigerian Naira (NGN).
                By subscribing, you agree to our terms of service and privacy policy.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}