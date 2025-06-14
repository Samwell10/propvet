'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  BarChart3,
  FileCheck2,
  History,
  Home,
  HelpCircle,
  Building2,
  Menu,
  X
} from "lucide-react"
import { useState } from "react"

// Sidebar links for individual users
const sidebarLinks = [
  {
    title: "Dashboard",
    href: "/dashboard/individual",
    icon: BarChart3
  },
  {
    title: "Verify Property",
    href: "/dashboard/individual/verify",
    icon: FileCheck2
  },
  {
    title: "History",
    href: "/dashboard/individual/history",
    icon: History
  },
  {
    title: "View Listings",
    href: "/dashboard/individual/listings",
    icon: Building2
  },
  {
    title: "Support",
    href: "/dashboard/individual/support",
    icon: HelpCircle
  }
]

export function DashboardSidebar() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <>
      {/* Mobile Topbar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-white dark:bg-gray-800 border-b z-50 flex items-center px-4">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
        <span className="ml-4 font-semibold">Menu</span>
      </div>

      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-200 ease-in-out bg-white dark:bg-gray-800 border-r",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        "lg:top-0 top-14"
      )}>
        <div className="hidden lg:flex h-14 items-center border-b px-6">
          <Link href="/" className="flex items-center space-x-2">
            <Home className="h-6 w-6 text-green-600" />
            <span className="font-semibold">Dashboard</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-6">
          <nav className="grid gap-2 px-4">
            {sidebarLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                  pathname === link.href
                    ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50"
                    : ""
                )}
              >
                <link.icon className="h-4 w-4" />
                {link.title}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Spacer to prevent overlap with topbar on mobile */}
      <div className="h-14 lg:hidden" />
    </>
  )
}