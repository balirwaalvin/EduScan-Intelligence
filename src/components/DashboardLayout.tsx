'use client'

import { ReactNode, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
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
  ChevronLeft,
  ChevronRight,
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
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const handleLogout = async () => {
    try {
      // Call logout API to clear cookies
      await fetch('/api/auth/logout', { method: 'POST' })
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
      <aside className={`hidden md:fixed md:inset-y-0 md:flex md:flex-col transition-all duration-300 ${
        sidebarCollapsed ? 'md:w-20' : 'md:w-64'
      }`}>
        <div className="flex flex-col flex-grow bg-white border-r border-gray-200 pt-5 pb-4 overflow-y-auto">
          {/* Logo section - always visible */}
          <div className="flex items-center justify-center flex-shrink-0 px-4 mb-8 relative">
            <img
              src="/eduscan-logo.png"
              alt="EduScan Logo"
              className={`transition-all duration-300 ${
                sidebarCollapsed ? 'h-10 w-10' : 'h-16 w-auto'
              }`}
            />

            {/* Collapse/Expand button */}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="absolute -right-3 top-1/2 -translate-y-1/2 bg-white border-2 border-gray-200 rounded-full p-1 hover:bg-gray-50 transition-colors shadow-sm"
              title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {sidebarCollapsed ? (
                <ChevronRight className="w-4 h-4 text-gray-600" />
              ) : (
                <ChevronLeft className="w-4 h-4 text-gray-600" />
              )}
            </button>
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
                  } ${sidebarCollapsed ? 'justify-center' : ''}`}
                  title={sidebarCollapsed ? item.name : ''}
                >
                  <item.icon
                    className={`flex-shrink-0 h-5 w-5 ${
                      isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-500'
                    } ${sidebarCollapsed ? '' : 'mr-3'}`}
                  />
                  {!sidebarCollapsed && item.name}
                </Link>
              )
            })}
          </nav>

          <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
            <div className="flex-shrink-0 w-full group block">
              <div className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'justify-between'}`}>
                <div className={`flex items-center min-w-0 ${sidebarCollapsed ? 'justify-center' : ''}`}>
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-600 to-accent-600 flex items-center justify-center text-white font-semibold">
                      {user?.name ? user.name.charAt(0).toUpperCase() :
                       user?.firstName ? `${user.firstName[0]}${user.lastName?.[0] || ''}` : 'U'}
                    </div>
                  </div>
                  {!sidebarCollapsed && (
                    <div className="ml-3 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {user?.name || `${user?.firstName || ''} ${user?.lastName || ''}`.trim() || 'User'}
                      </p>
                      <p className="text-xs text-gray-500 truncate">{role.replace('_', ' ')}</p>
                    </div>
                  )}
                </div>
                {!sidebarCollapsed && (
                  <button
                    onClick={handleLogout}
                    className="ml-2 p-2 text-gray-400 hover:text-red-600 transition"
                    title="Logout"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                )}
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
              <div className="flex items-center justify-center flex-shrink-0 px-4 mb-8">
                <img
                  src="/eduscan-logo.png"
                  alt="EduScan Logo"
                  className="h-16 w-auto"
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
      <div className={`flex flex-col flex-1 transition-all duration-300 ${
        sidebarCollapsed ? 'md:pl-20' : 'md:pl-64'
      }`}>
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
            {/* Animated Dashboard Title */}
            <div className="flex-1 group">
              <div className="relative inline-block">
                <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary-600 via-accent-600 to-primary-600 bg-clip-text text-transparent animate-gradient-x bg-[length:200%_auto] transition-all duration-300 hover:scale-105 cursor-default">
                  {user?.organization?.name || 'EduScan Dashboard'}
                </h1>
                {/* Animated underline */}
                <div className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-primary-600 to-accent-600 transition-all duration-500 group-hover:w-full"></div>
                {/* Sparkle effect */}
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-accent-500 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping"></div>
              </div>
            </div>

            {/* Animated Notification Bell */}
            <div className="ml-4 flex items-center md:ml-6 space-x-3">
              <div className="relative group">
                <button className="relative p-2.5 rounded-full text-gray-400 hover:text-primary-600 hover:bg-gradient-to-br hover:from-primary-50 hover:to-accent-50 transition-all duration-300 transform hover:scale-110 hover:rotate-12 active:scale-95">
                  <Bell className="h-6 w-6 transition-transform duration-300 group-hover:animate-swing" />
                  {/* Notification badge */}
                  <span className="absolute top-1 right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-accent-500"></span>
                  </span>
                  {/* Glow effect on hover */}
                  <span className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-400 to-accent-400 opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-300"></span>
                </button>
                {/* Tooltip */}
                <div className="absolute top-full right-0 mt-2 px-3 py-1.5 bg-gray-900 text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap shadow-lg">
                  3 new notifications
                  <div className="absolute -top-1 right-4 w-2 h-2 bg-gray-900 transform rotate-45"></div>
                </div>
              </div>
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
