'use client'

import { SharedNav } from "@/components/shared-nav"
import { SharedFooter } from "@/components/shared-footer"
import { CheckCircle, Users, Globe, Award, Briefcase } from "lucide-react"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import Head from "next/head"

const teamMembers = [
  {
    name: "Olajengbesi Pelumi ESQ",
    role: "Founder & CEO",
    image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    bio: "With over 15 years of experience in real estate and technology"
  },
  {
    name: "Mr Ronald David",
    role: "Head of Operations",
    image: "https://images.pexels.com/photos/3796217/pexels-photo-3796217.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    bio: "Expert in property law and verification processes"
  },
  {
    name: "Mr Odukoya Oluwatimileyin",
    role: "Technical Director",
    image: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    bio: "Leading our technological innovations and digital solutions"
  }
]

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>About Us | Propvet</title>
        <meta name="description" content="Learn more about Propvet's mission, leadership, and values. Now serving Abuja." />
      </Head>

      <SharedNav />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden bg-gradient-to-b from-green-50 to-white dark:from-green-950 dark:to-gray-900">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold mb-6">About Propvet</h1>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Setting the standard for secure property verification — starting in Abuja
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  At Propvet, we're committed to making property transactions safer and more transparent — starting with Abuja. Our platform uses advanced technology to verify property documents quickly, securely, and reliably.
                </p>
                <div className="space-y-4">
                  {[
                    "Ensuring secure property transactions",
                    "Preventing property fraud",
                    "Simplifying verification processes",
                    "Supporting real estate growth in Abuja"
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600" aria-hidden="true" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative h-80 md:h-96 rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Team members in a discussion"
                  fill
                  style={{ objectFit: "cover" }}
                  className="transform rotate-3 hover:rotate-0 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-green-600/10 rounded-lg transform -rotate-3" />
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { icon: Users, stat: "1,000+", label: "Verified Users (Abuja)" },
                { icon: Globe, stat: "FCT", label: "Current Coverage" },
                { icon: Award, stat: "99.9%", label: "Accuracy Rate" },
                { icon: Briefcase, stat: "2,500+", label: "Verifications Done" }
              ].map((item, index) => (
                <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-full">
                      <item.icon className="h-8 w-8 text-green-600" aria-hidden="true" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold mb-2">{item.stat}</div>
                  <div className="text-gray-600 dark:text-gray-400">{item.label}</div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Our Leadership Team</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <Card key={index} className="overflow-hidden group">
                  <div className="relative h-64">
                    <Image
                      src={member.image}
                      alt={`Photo of ${member.name} - ${member.role}`}
                      fill
                      style={{ objectFit: "cover" }}
                      className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-6 bg-white dark:bg-gray-800">
                    <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                    <p className="text-green-600 mb-3">{member.role}</p>
                    <p className="text-gray-600 dark:text-gray-400">{member.bio}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Integrity",
                  description: "We maintain the highest standards of honesty and transparency in all our operations."
                },
                {
                  title: "Innovation",
                  description: "We continuously improve our technology to provide better services to our users."
                },
                {
                  title: "Excellence",
                  description: "We strive for excellence in every aspect of our service delivery."
                }
              ].map((value, index) => (
                <Card key={index} className="p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="h-12 w-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-6">
                    <span className="text-2xl font-bold text-green-600">{index + 1}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{value.description}</p>
                </Card>
              ))}
            </div>

            {/* CTA */}
            <div className="text-center mt-16">
              <a href="/verify" className="inline-block px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                Start a Verification in Abuja →
              </a>
            </div>
          </div>
        </section>
      </main>

      <SharedFooter />
    </div>
  )
}