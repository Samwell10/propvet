'use client'

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useToast } from "@/hooks/use-toast"
import { mockUsers, useAuth } from "@/lib/auth"

// Validation schema using Zod
const formSchema = z.object({
  role: z.enum(["individual", "company", "admin", "super_admin"], {
    required_error: "Please select your account type",
  }),
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().optional(),
})

type UserRole = "individual" | "company" | "admin" | "super_admin"

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [role, setRole] = useState<UserRole>("individual")
  const router = useRouter()
  const { toast } = useToast()
  const { login } = useAuth()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      role: "individual",
      email: "",
      password: "",
      rememberMe: false,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const user = mockUsers.find(
        (u) => u.email === values.email && u.password === values.password && u.role === values.role
      )

      if (user) {
        login({
          id: user.id,
          email: user.email,
          role: user.role,
          name: user.name,
        })

        toast({
          title: "Login successful",
          description: `Welcome back, ${user.name}!`,
        })

        switch (user.role) {
          case 'individual':
            router.push('/dashboard/individual')
            break
          case 'company':
            router.push('/dashboard/company')
            break
          case 'admin':
            router.push('/admin')
            break
          case 'super_admin':
            router.push('/superadmin')
            break
          default:
            router.push('/')
        }
      } else {
        toast({
          variant: "destructive",
          title: "Login failed",
          description: "Invalid email or password. Please try again.",
        })
      }
    } catch (error) {
      console.error(error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "An error occurred. Please try again.",
      })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Updated logo placeholder */}
         <div className="flex justify-center">
          <Link href="/" className="flex items-center space-x-2">
              <img
                src="/propvetlogo.png"
                alt="Logo"
                width={175}
                height={60.97}
                className="rounded"
              />
          </Link>
        </div> 

        <h2 className="text-center text-3xl font-bold tracking-tight">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          Don't have an account?{" "}
          <Link href="/register" className="font-medium text-green-600 hover:text-green-500">
            Sign up
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="mb-6">
                <FormLabel className="text-base">Select Account Type</FormLabel>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {(["individual", "company", "admin", "super_admin"] as UserRole[]).map((r) => (
                    <Button
                      key={r}
                      type="button"
                      variant={role === r ? "default" : "outline"}
                      className={
                        role === r
                          ? r === "admin"
                            ? "bg-blue-600 hover:bg-blue-700"
                            : r === "super_admin"
                            ? "bg-purple-600 hover:bg-purple-700"
                            : "bg-green-600 hover:bg-green-700"
                          : ""
                      }
                      onClick={() => {
                        setRole(r)
                        form.setValue("role", r)
                      }}
                    >
                      {r === "individual" ? "Individual User" :
                        r === "company" ? "Real Estate Company" :
                        r === "admin" ? "Admin" : "Super Admin"}
                    </Button>
                  ))}
                </div>
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="you@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center justify-between">
                <FormField
                  control={form.control}
                  name="rememberMe"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-2">
                      <FormControl>
                        <Input
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                          checked={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="text-sm">Remember me</FormLabel>
                    </FormItem>
                  )}
                />
                <Link
                  href="/forgot-password"
                  className="text-sm font-medium text-green-600 hover:text-green-500"
                >
                  Forgot your password?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700"
              >
                Sign In
              </Button>
            </form>
          </Form>

          <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            <p>Demo Accounts:</p>
            <p>Individual: individual@example.com / password123</p>
            <p>Company: company@example.com / password123</p>
            <p>Admin: admin@example.com / password123</p>
            <p>Super Admin: superadmin@example.com / password123</p>
          </div>
        </Card>
      </div>
    </div>
  )
}