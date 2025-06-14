'use client'

import { SharedNav } from "@/components/shared-nav"
import { SharedFooter } from "@/components/shared-footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import {
  BarChart3,
  CheckCircle,
  Clock,
  FileCheck,
  LucideShield,
  MapPin,
  Search,
  Shield,
  Star,
  Calendar,
  User,
  ChevronRight
} from "lucide-react"
import { blogPosts } from "@/lib/blog-data"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <SharedNav />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-28 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-white dark:from-green-950 dark:to-gray-900" />
          <div className="container relative mx-auto px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-[1fr_600px] items-center">
              <div className="flex flex-col justify-center space-y-8">
                <div className="space-y-6">
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Secure Property Verification in Abuja
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                    Protect your investment with Abuja's most trusted property verification platform. Instant checks for land documents and titles.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
                    <Link href="/verify">Verify a Property</Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link href="/about">Learn More</Link>
                  </Button>
                </div>
                <div className="flex items-center space-x-8 pt-4">
                  <div className="flex items-center space-x-2">
                    <Shield className="h-5 w-5 text-green-600" />
                    <span className="text-sm">NDPR Compliant</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="h-5 w-5 text-green-600" />
                    <span className="text-sm">500+ Trusted Users</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-sm">1100+ Docs Verified</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <img
                  alt="Modern property visualization"
                  className="rounded-xl shadow-2xl"
                  height="600"
                  src="https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg"
                  width="600"
                />
                <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                      <Search className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold">Fast Verification</p>
                      <p className="text-sm text-gray-500">Results in hours</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How It Works</h2>
              <p className="max-w-[900px] mx-auto text-gray-500 md:text-xl/relaxed dark:text-gray-400">
                Our 3-step verification process ensures thorough review and transparency.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Upload Documents",
              description:
              "Securely upload scanned copies of your property documents through our encrypted dashboard.",
              icon: FileCheck
            },
            {
              title: "Due Diligence",
              description:
                "Our team conducts verification with Abuja land registry and relevant authorities to confirm authenticity.",
              icon: Search
            },
            {
              title: "Download Report",
              description:
                "Receive a signed and stamped verification report confirming the status of the property.",
              icon: CheckCircle
            }
          ].map((item, index) => (
            <Card key={index} className="relative overflow-hidden p-8">
              <div className="absolute top-0 right-0 w-20 h-20 bg-green-100 rounded-bl-full dark:bg-green-900/20" />
              <div className="relative">
                <div className="mb-6 inline-flex items-center justify-center rounded-lg bg-green-100 p-4 dark:bg-green-900/20">
                  <item.icon className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="mb-3 text-xl font-bold">{item.title}</h3>
                <p className="text-gray-500 dark:text-gray-400">{item.description}</p>
                 </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Section */}
        <section className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex justify-between items-center mb-12">
              <div>
                <h2 className="text-3xl font-bold tracking-tighter">Latest from Our Blog</h2>
                <p className="mt-2 text-gray-500 dark:text-gray-400">Insights on land verification and Abuja real estate</p>
              </div>
              <Button asChild variant="outline">
                <Link href="/blog">View All Posts</Link>
              </Button>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {blogPosts.map((post, index) => (
                <Card key={index} className="overflow-hidden group hover:shadow-lg transition-all duration-300">
                  <div className="relative h-48">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-6">
                    <div className="mb-4">
                      <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                        {post.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-green-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-500">{post.author}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-500">{post.date}</span>
                      </div>
                    </div>
                    <Link
                      href={`/blog/${post.title.toLowerCase().replace(/ /g, '-')}`}
                      className="inline-flex items-center text-green-600 hover:text-green-700 font-medium mt-4 group"
                    >
                      Read More <ChevronRight className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">What Our Clients Say</h2>
              <p className="max-w-[900px] mx-auto text-gray-500 dark:text-gray-400">
                Join thousands of satisfied users who trust our platform
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  quote: "This platform helped me avoid a land scam in Abuja. The process was seamless and results came fast.",
                  author: "Oluwaseun Adebayo",
                  role: "Homebuyer, Abuja"
                },
                {
                  quote: "I recommend this service to all my clients. It gives them peace of mind when buying land.",
                  author: "Chioma Nnamdi",
                  role: "Realtor, Abuja"
                }
              ].map((testimonial, index) => (
                <Card key={index} className="p-8">
                  <div className="space-y-4">
                    <p className="text-lg italic text-gray-600 dark:text-gray-300">"{testimonial.quote}"</p>
                    <div>
                      <p className="font-semibold">{testimonial.author}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-green-50 dark:bg-green-900/10">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-8">
              <div className="space-y-4 max-w-3xl">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Ready to Verify Your Property?</h2>
                <p className="text-gray-500 dark:text-gray-400 md:text-xl">
                  Join thousands of buyers who trust our secure and instant verification system
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
                  <Link href="/verify">Start Verification</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SharedFooter />
    </div>
  )
}