import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Basic user interface
interface User {
  id: string
  email: string
  role: 'individual' | 'company' | 'admin' | 'super_admin'
  name: string
  hasSubscribed?: boolean
}

interface MockUser extends User {
  password: string
}

// Zustand store state and actions
interface AuthState {
  user: User | null
  isAuthenticated: boolean
  login: (user: User) => void
  logout: () => void
  updateSubscriptionStatus: (status: boolean) => void
  canPromoteToAdmin: (from: User) => boolean
  canPromoteToSuperAdmin: (from: User) => boolean
}

// 🔐 Mock users for demo purposes
export const mockUsers: MockUser[] = [
  {
    id: '1',
    email: 'individual@example.com',
    password: 'password123',
    role: 'individual',
    name: 'John Doe',
  },
  {
    id: '2',
    email: 'company@example.com',
    password: 'password123',
    role: 'company',
    name: 'Real Estate Corp',
    hasSubscribed: false,
  },
  {
    id: '3',
    email: 'admin@example.com',
    password: 'password123',
    role: 'admin',
    name: 'Admin User',
  },
  {
    id: '4',
    email: 'superadmin@example.com',
    password: 'password123',
    role: 'super_admin',
    name: 'Super Admin',
  },
]

// 🧠 Zustand Auth Store
export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,

      // Log in and store user state
      login: (user) => set({ user, isAuthenticated: true }),

      // Log out and clear user state
      logout: () => set({ user: null, isAuthenticated: false }),

      // Update subscription flag
      updateSubscriptionStatus: (status: boolean) =>
        set((state) => ({
          user: state.user ? { ...state.user, hasSubscribed: status } : null,
        })),

      // Utility: only admins can be promoted to super admins
      canPromoteToSuperAdmin: (from: User) => from.role === 'admin',

      // Utility: prevent individual accounts from becoming admins
      canPromoteToAdmin: (from: User) =>
        from.role !== 'individual' && from.role !== 'company',
    }),
    {
      name: 'auth-storage',
    }
  )
)