'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  BarChart3,
  ClipboardList,
  TrendingUp,
  Menu,
  X
} from "lucide-react"
import { useState } from "react"

// Sidebar navigation links for admin users
const sidebarLinks = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: BarChart3
  },
  {
    title: "Verification Requests",
    href: "/admin/requests",
    icon: ClipboardList
  },
  {
    title: "Statistics",
    href: "/admin/stats",
    icon: TrendingUp
  }
]

export function AdminDashboardSidebar() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <>
      {/* Mobile top bar with toggle button */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-white dark:bg-gray-800 border-b z-50 flex items-center px-4">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
        <span className="ml-4 font-semibold">Admin Panel</span>
      </div>

      {/* Sidebar menu */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-200 ease-in-out bg-white dark:bg-gray-800 border-r",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          "lg:top-0 top-14"
        )}
      >
        {/* Sidebar header (empty, no logo) */}
        <div className="hidden lg:flex h-14 items-center border-b px-6">
          <span className="font-semibold">Admin Panel</span>
        </div>

        {/* Navigation links */}
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
                    ? "bg-blue-100 text-blue-900 dark:bg-blue-800 dark:text-blue-50"
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

      {/* Overlay when mobile sidebar is open */}
      {isMobileMenuOpen && (
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Push content down on mobile view */}
      <div className="h-14 lg:hidden" />
    </>
  )
}