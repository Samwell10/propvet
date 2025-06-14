'use client'

import { SharedNav } from "@/components/shared-nav"
import { SharedFooter } from "@/components/shared-footer"
import { Calendar, ChevronRight, User } from "lucide-react"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { blogPosts } from "@/lib/blog-data"

export default function Blog() {
  const featuredPost = blogPosts[0]
  const recentPosts = blogPosts.slice(1)

  return (
    <div className="min-h-screen flex flex-col">
      <SharedNav />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-b from-green-50 to-white dark:from-green-950 dark:to-gray-900">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold mb-6">Propvet Blog</h1>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Insights on property verification and real estate in Abuja
              </p>
            </div>
          </div>
        </section>

        {/* Featured Post */}
        <section className="container mx-auto px-4 py-12">
          <Card className="relative overflow-hidden transform hover:scale-[1.01] transition-transform duration-300">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-8">
                <div className="mb-4">
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                    Featured
                  </span>
                </div>
                <h2 className="text-3xl font-bold mb-4">
                  {featuredPost.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-500">{featuredPost.author}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-500">{featuredPost.date}</span>
                  </div>
                </div>
                <Link
                  href={`/blog/${featuredPost.slug}`}
                  className="inline-flex items-center text-green-600 hover:text-green-700 font-medium group"
                >
                  Read More <ChevronRight className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              <div className="relative h-64 md:h-auto">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>
          </Card>
        </section>

        {/* Recent Posts */}
        <section className="container mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold mb-8">Recent Articles</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center text-green-600 hover:text-green-700 font-medium mt-4 group"
                  >
                    Read More <ChevronRight className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <SharedFooter />
    </div>
  )
}