'use client'

import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Menu, X, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth"
import { useState, useEffect } from "react"
import { useTheme } from "next-themes"

export function SharedNav() {
  const { user, isAuthenticated, logout } = useAuth()
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  // Updated navLinkClass with enhanced hover effects
  const navLinkClass =
    "relative text-sm font-medium transition-all duration-300 ease-in-out hover:text-green-600 " +
    "hover:scale-105 hover:underline hover:underline-offset-4 " +
    "after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] " +
    "after:bg-green-600 after:transition-all after:duration-300 after:ease-in-out " +
    "hover:after:w-full"

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex items-center justify-between px-4 lg:px-6 py-1">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/propvetlogo.png"
            alt="Logo"
            width={175}
            height={60.97}
            className="rounded"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-6">
          <Link href="/" className={navLinkClass}>Home</Link>
          <Link href="/about" className={navLinkClass}>About</Link>
          <Link href="/blog" className={navLinkClass}>Blog</Link>
          <Link href="/contact" className={navLinkClass}>Contact</Link>
          {isAuthenticated && (
            <Link href={`/dashboard/${user?.role}`} className={navLinkClass}>
              Dashboard
            </Link>
          )}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center space-x-4">
          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              <span className="sr-only">Toggle theme</span>
            </Button>
          )}
          {isAuthenticated ? (
            <>
              <span className="text-sm">Hi, {user?.name}</span>
              <Button onClick={handleLogout} variant="ghost">Logout</Button>
            </>
          ) : (
            <>
              <Button asChild variant="ghost"><Link href="/login">Login</Link></Button>
              <Button asChild className="bg-green-600 hover:bg-green-700">
                <Link href="/register">Sign Up</Link>
              </Button>
            </>
          )}
        </div>

        {/* Hamburger Toggle */}
        <button
          className="lg:hidden p-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              <Link href="/" onClick={() => setMobileMenuOpen(false)} className={navLinkClass}>Home</Link>
              <Link href="/about" onClick={() => setMobileMenuOpen(false)} className={navLinkClass}>About</Link>
              <Link href="/blog" onClick={() => setMobileMenuOpen(false)} className={navLinkClass}>Blog</Link>
              <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className={navLinkClass}>Contact</Link>
              {isAuthenticated && (
                <Link
                  href={`/dashboard/${user?.role}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className={navLinkClass}
                >
                  Dashboard
                </Link>
              )}
              {mounted && (
                <Button variant="ghost" size="icon" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
                  {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </Button>
              )}
              <div className="pt-4 border-t space-y-2">
                {isAuthenticated ? (
                  <>
                    <span className="text-sm">Hi, {user?.name}</span>
                    <Button onClick={handleLogout}>Logout</Button>
                  </>
                ) : (
                  <>
                    <Button asChild variant="ghost"><Link href="/login">Login</Link></Button>
                    <Button asChild className="bg-green-600 hover:bg-green-700">
                      <Link href="/register">Sign Up</Link>
                    </Button>
                  </>
                )}
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}