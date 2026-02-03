'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import DashboardLayout from '@/components/DashboardLayout'
import { account } from '@/lib/appwrite'
import {
  Users,
  Calendar,
  TrendingUp,
  Clock,
  CheckCircle2,
  QrCode,
  Radio,
  Scan as ScanIcon,
  ArrowUp,
  ArrowDown,
  Plus,
  FileText,
  Download,
  RefreshCw,
} from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'
import Link from 'next/link'

export default function AdminDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalSessions: 0,
    activeSessionsToday: 0,
    averageAttendance: 0,
    totalStudents: 0,
    totalTeachers: 0,
    totalClassReps: 0,
    attendanceToday: 0,
  })
  const [weeklyData, setWeeklyData] = useState<any[]>([])
  const [methodData, setMethodData] = useState<any[]>([])
  const [recentSessions, setRecentSessions] = useState<any[]>([])

  const fetchDashboardData = async (organizationId: string) => {
    try {
      setRefreshing(true)

      // Fetch analytics summary
      const summaryRes = await fetch(`/api/analytics?organizationId=${organizationId}&action=summary`)
      if (summaryRes.ok) {
        const summary = await summaryRes.json()
        setStats((prev) => ({ ...prev, ...summary }))
      }

      // Fetch user stats
      const userStatsRes = await fetch(`/api/users?organizationId=${organizationId}&action=stats`)
      if (userStatsRes.ok) {
        const userStats = await userStatsRes.json()
        setStats((prev) => ({
          ...prev,
          totalUsers: userStats.total,
          totalStudents: userStats.students,
          totalTeachers: userStats.teachers,
          totalClassReps: userStats.classReps,
        }))
      }

      // Fetch weekly attendance
      const weeklyRes = await fetch(`/api/analytics?organizationId=${organizationId}&action=weekly`)
      if (weeklyRes.ok) {
        const weekly = await weeklyRes.json()
        setWeeklyData(weekly.data)
      }

      // Fetch method distribution
      const methodsRes = await fetch(`/api/analytics?organizationId=${organizationId}&action=methods`)
      if (methodsRes.ok) {
        const methods = await methodsRes.json()
        setMethodData(methods.data)
      }

      // Fetch today's sessions
      const sessionsRes = await fetch(`/api/sessions?organizationId=${organizationId}&action=today`)
      if (sessionsRes.ok) {
        const sessions = await sessionsRes.json()
        setRecentSessions(sessions.sessions.slice(0, 5))
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setRefreshing(false)
    }
  }

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check if user is authenticated with Appwrite
        const currentUser = await account.get()
        console.log('Authenticated user:', currentUser.email)

        setUser({
          id: currentUser.$id,
          name: currentUser.name,
          email: currentUser.email,
          emailVerification: currentUser.emailVerification,
        })

        // Fetch real dashboard data
        await fetchDashboardData(currentUser.$id)
      } catch (error) {
        console.error('Authentication check failed:', error)
        // Not authenticated, redirect to login
        router.push('/login')
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [router])

  const handleRefresh = () => {
    if (user?.id) {
      fetchDashboardData(user.id)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const statCards = [
    {
      title: 'Total Users',
      value: stats.totalUsers.toLocaleString(),
      icon: Users,
      color: 'from-blue-500 to-cyan-500',
      change: '+12%',
      trend: 'up',
    },
    {
      title: 'Active Sessions',
      value: stats.activeSessionsToday.toString(),
      icon: Calendar,
      color: 'from-purple-500 to-pink-500',
      change: '+5%',
      trend: 'up',
    },
    {
      title: 'Attendance Today',
      value: stats.attendanceToday.toLocaleString(),
      icon: CheckCircle2,
      color: 'from-green-500 to-emerald-500',
      change: '-2%',
      trend: 'down',
    },
    {
      title: 'Average Rate',
      value: `${stats.averageAttendance}%`,
      icon: TrendingUp,
      color: 'from-orange-500 to-red-500',
      change: '+3%',
      trend: 'up',
    },
  ]

  const userBreakdown = [
    { label: 'Students', count: stats.totalStudents, color: 'bg-blue-500' },
    { label: 'Teachers', count: stats.totalTeachers, color: 'bg-purple-500' },
    { label: 'Class Reps', count: stats.totalClassReps, color: 'bg-pink-500' },
  ]

  return (
    <DashboardLayout role="ADMIN" user={user}>
      <div className="space-y-6">
        {/* Welcome Section with Refresh */}
        <div className="bg-gradient-to-r from-primary-600 to-accent-600 rounded-2xl p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Welcome back, {user?.name}! 👋
              </h1>
              <p className="text-white/90">
                Here's what's happening with your organization today.
              </p>
            </div>
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="bg-white/20 hover:bg-white/30 p-3 rounded-lg transition disabled:opacity-50"
            >
              <RefreshCw className={`w-6 h-6 ${refreshing ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat) => (
            <div
              key={stat.title}
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`bg-gradient-to-br ${stat.color} p-3 rounded-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div
                  className={`flex items-center space-x-1 text-sm font-semibold ${
                    stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {stat.trend === 'up' ? (
                    <ArrowUp className="w-4 h-4" />
                  ) : (
                    <ArrowDown className="w-4 h-4" />
                  )}
                  <span>{stat.change}</span>
                </div>
              </div>
              <h3 className="text-gray-600 text-sm font-medium mb-1">{stat.title}</h3>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weekly Attendance Chart */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Weekly Attendance</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="attendance"
                  stroke="#0284c7"
                  strokeWidth={2}
                  dot={{ fill: '#0284c7', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Method Distribution Chart */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Attendance Methods</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={methodData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="method" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#8b5cf6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* User Breakdown & Recent Sessions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* User Breakdown */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">User Breakdown</h2>
            <div className="space-y-4">
              {userBreakdown.map((item) => (
                <div key={item.label}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">{item.label}</span>
                    <span className="text-sm font-bold text-gray-900">{item.count}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`${item.color} h-2 rounded-full`}
                      style={{
                        width: `${(item.count / stats.totalUsers) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t">
              <Link href="/dashboard/admin/users">
                <button className="w-full bg-gradient-to-r from-primary-600 to-accent-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition">
                  <Plus className="w-5 h-5 inline mr-2" />
                  Manage Users
                </button>
              </Link>
            </div>
          </div>

          {/* Recent Sessions */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Today's Sessions</h2>
            {recentSessions.length > 0 ? (
              <div className="space-y-4">
                {recentSessions.map((session: any) => (
                  <div
                    key={session.$id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-primary-300 transition"
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{session.name}</h3>
                      <p className="text-sm text-gray-600">
                        {new Date(session.startTime).toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        {session.allowedMethods?.includes('QR_CODE') && (
                          <QrCode className="w-5 h-5 text-blue-500" />
                        )}
                        {session.allowedMethods?.includes('RFID') && (
                          <Radio className="w-5 h-5 text-purple-500" />
                        )}
                        {session.allowedMethods?.includes('FACIAL_RECOGNITION') && (
                          <ScanIcon className="w-5 h-5 text-pink-500" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No sessions scheduled for today</p>
              </div>
            )}

            <div className="mt-6">
              <Link href="/dashboard/admin/sessions">
                <button className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition">
                  View All Sessions
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/dashboard/admin/users">
              <button className="w-full flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition">
                <Users className="w-6 h-6 text-primary-600" />
                <span className="font-semibold text-gray-900">Manage Users</span>
              </button>
            </Link>
            <Link href="/dashboard/admin/sessions">
              <button className="w-full flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition">
                <Calendar className="w-6 h-6 text-primary-600" />
                <span className="font-semibold text-gray-900">Sessions</span>
              </button>
            </Link>
            <Link href="/dashboard/admin/analytics">
              <button className="w-full flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition">
                <TrendingUp className="w-6 h-6 text-primary-600" />
                <span className="font-semibold text-gray-900">Analytics</span>
              </button>
            </Link>
            <button className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition">
              <Download className="w-6 h-6 text-primary-600" />
              <span className="font-semibold text-gray-900">Export Data</span>
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
