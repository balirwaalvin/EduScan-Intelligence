'use client'

import { ReactNode, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { account } from '@/lib/appwrite'
import {
  LayoutDashboard,
  Users,
  Calendar,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  Building2,
  BookOpen,
} from 'lucide-react'

interface DashboardLayoutProps {
  children: ReactNode
  role: 'ADMIN' | 'TEACHER' | 'CLASS_REP'
  user?: {
    name?: string
    firstName?: string
    lastName?: string
    email: string
    organization?: {
      name: string
    }
  }
}

export default function DashboardLayout({ children, role, user }: DashboardLayoutProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = async () => {
    try {
      // Delete current session with Appwrite
      await account.deleteSession('current')
      console.log('Logged out successfully')
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      // Redirect to login page regardless
      router.push('/login')
    }
  }

  const getNavItems = () => {
    const baseItems = [
      {
        name: 'Dashboard',
        href: `/dashboard/${role.toLowerCase().replace('_', '-')}`,
        icon: LayoutDashboard,
      },
    ]

    if (role === 'ADMIN') {
      return [
        ...baseItems,
        { name: 'Users', href: '/dashboard/admin/users', icon: Users },
        { name: 'Departments', href: '/dashboard/admin/departments', icon: Building2 },
        { name: 'Courses', href: '/dashboard/admin/courses', icon: BookOpen },
        { name: 'Sessions', href: '/dashboard/admin/sessions', icon: Calendar },
        { name: 'Analytics', href: '/dashboard/admin/analytics', icon: BarChart3 },
        { name: 'Settings', href: '/dashboard/admin/settings', icon: Settings },
      ]
    }

    if (role === 'TEACHER') {
      return [
        ...baseItems,
        { name: 'My Sessions', href: '/dashboard/teacher/sessions', icon: Calendar },
        { name: 'Students', href: '/dashboard/teacher/students', icon: Users },
        { name: 'Analytics', href: '/dashboard/teacher/analytics', icon: BarChart3 },
        { name: 'Settings', href: '/dashboard/teacher/settings', icon: Settings },
      ]
    }

    return [
      ...baseItems,
      { name: 'Sessions', href: '/dashboard/class-rep/sessions', icon: Calendar },
      { name: 'Students', href: '/dashboard/class-rep/students', icon: Users },
      { name: 'Analytics', href: '/dashboard/class-rep/analytics', icon: BarChart3 },
    ]
  }

  const navItems = getNavItems()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar for desktop */}
      <aside className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
        <div className="flex flex-col flex-grow bg-white border-r border-gray-200 pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4 mb-8">
            <div className="bg-gradient-to-br from-primary-600 to-accent-600 p-2 rounded-lg">
              <Scan className="w-6 h-6 text-white" />
            </div>
            <span className="ml-2 text-2xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
              EduScan
            </span>
          </div>

          <nav className="mt-5 flex-1 flex flex-col px-2 space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-3 py-3 text-sm font-medium rounded-lg transition ${
                    isActive
                      ? 'bg-gradient-to-r from-primary-600 to-accent-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <item.icon
                    className={`mr-3 flex-shrink-0 h-5 w-5 ${
                      isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-500'
                    }`}
                  />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
            <div className="flex-shrink-0 w-full group block">
              <div className="flex items-center justify-between">
                <div className="flex items-center min-w-0">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-600 to-accent-600 flex items-center justify-center text-white font-semibold">
                      {user?.name ? user.name.charAt(0).toUpperCase() :
                       user?.firstName ? `${user.firstName[0]}${user.lastName?.[0] || ''}` : 'U'}
                    </div>
                  </div>
                  <div className="ml-3 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {user?.name || `${user?.firstName || ''} ${user?.lastName || ''}`.trim() || 'User'}
                    </p>
                    <p className="text-xs text-gray-500 truncate">{role.replace('_', ' ')}</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="ml-2 p-2 text-gray-400 hover:text-red-600 transition"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-40 flex">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />

          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="h-6 w-6 text-white" />
              </button>
            </div>

            <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4 mb-8">
                <img
                  src="/eduscan-logo.png"
                  alt="EduScan Logo"
                  className="h-10 w-auto"
                />
              </div>

              <nav className="mt-5 px-2 space-y-1">
                {navItems.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={`group flex items-center px-3 py-3 text-sm font-medium rounded-lg transition ${
                        isActive
                          ? 'bg-gradient-to-r from-primary-600 to-accent-600 text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <item.icon className="mr-3 flex-shrink-0 h-5 w-5" />
                      {item.name}
                    </Link>
                  )
                })}
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="md:pl-64 flex flex-col flex-1">
        {/* Top bar */}
        <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow-sm">
          <button
            type="button"
            className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 md:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>

          <div className="flex-1 px-4 flex justify-between items-center">
            <div className="flex-1">
              <h1 className="text-xl font-semibold text-gray-900">
                {user?.organization?.name}
              </h1>
            </div>

            <div className="ml-4 flex items-center md:ml-6">
              <button className="p-2 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100 transition">
                <Bell className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
