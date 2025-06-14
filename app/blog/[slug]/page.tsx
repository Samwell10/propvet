import { notFound } from 'next/navigation'
import { SharedNav } from "@/components/shared-nav"
import { SharedFooter } from "@/components/shared-footer"
import { Calendar, User, ArrowLeft } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { blogPosts } from "@/lib/blog-data"

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }))
}

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogPosts.find((p) => p.slug === params.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SharedNav />

      <main className="flex-1 py-12 md:py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-8">
            <Button variant="ghost" asChild className="hover:bg-gray-100 dark:hover:bg-gray-800">
              <Link href="/blog" className="flex items-center space-x-2">
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Blog</span>
              </Link>
            </Button>
          </div>

          <Card className="p-6 md:p-8 lg:p-10">
            <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden rounded-lg mb-8">
              <img
                src={post.image}
                alt={post.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>

            <div className="mb-6">
              <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full dark:bg-green-900 dark:text-green-300">
                {post.category}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              {post.title}
            </h1>

            <div className="flex items-center space-x-6 text-gray-600 dark:text-gray-400 mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span className="font-medium">{post.author}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>{post.date}</span>
              </div>
            </div>

            <div
              className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6 text-center">
                <h3 className="text-xl font-semibold mb-3">Ready to Verify a Property in Abuja?</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Start your verification process today with Propvet.
                </p>
                <Button asChild className="bg-green-600 hover:bg-green-700">
                  <Link href="/verify">Start Verification</Link>
                </Button>
              </div>
            </div>
          </Card>

          <div className="mt-12">
            <h3 className="text-2xl font-bold mb-6">Related Articles</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {blogPosts
                .filter((p) => p.slug !== post.slug)
                .slice(0, 2)
                .map((relatedPost, index) => (
                  <Card key={index} className="overflow-hidden group hover:shadow-lg transition-all duration-300">
                    <div className="relative h-48">
                      <img
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6">
                      <div className="mb-3">
                        <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                          {relatedPost.category}
                        </span>
                      </div>
                      <h4 className="text-lg font-bold mb-2 group-hover:text-green-600 transition-colors">
                        {relatedPost.title}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                        {relatedPost.excerpt}
                      </p>
                      <Link
                        href={`/blog/${relatedPost.slug}`}
                        className="text-green-600 hover:text-green-700 font-medium text-sm"
                      >
                        Read More →
                      </Link>
                    </div>
                  </Card>
                ))}
            </div>
          </div>
        </div>
      </main>

      <SharedFooter />
    </div>
  )
}