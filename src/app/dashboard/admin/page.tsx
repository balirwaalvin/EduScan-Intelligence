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
  XCircle,
  AlertCircle,
  QrCode,
  Radio,
  Scan as ScanIcon,
  ArrowUp,
  ArrowDown,
} from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'

export default function AdminDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
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

        // Mock data for demonstration
        // In production, fetch from API
        setStats({
          totalUsers: 1250,
          totalSessions: 456,
          activeSessionsToday: 12,
          averageAttendance: 87.5,
          totalStudents: 1050,
          totalTeachers: 180,
          totalClassReps: 20,
          attendanceToday: 892,
        })
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

  const weeklyData = [
    { day: 'Mon', attendance: 850 },
    { day: 'Tue', attendance: 920 },
    { day: 'Wed', attendance: 880 },
    { day: 'Thu', attendance: 950 },
    { day: 'Fri', attendance: 892 },
    { day: 'Sat', attendance: 300 },
    { day: 'Sun', attendance: 150 },
  ]

  const methodData = [
    { method: 'QR Code', count: 450 },
    { method: 'RFID', count: 320 },
    { method: 'Face ID', count: 122 },
  ]

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

  const recentSessions = [
    {
      id: 1,
      course: 'Computer Science 101',
      teacher: 'Dr. Smith',
      time: '09:00 AM',
      attendance: 45,
      total: 50,
      method: 'QR Code',
    },
    {
      id: 2,
      course: 'Mathematics 201',
      teacher: 'Prof. Johnson',
      time: '10:30 AM',
      attendance: 38,
      total: 40,
      method: 'RFID',
    },
    {
      id: 3,
      course: 'Physics 301',
      teacher: 'Dr. Williams',
      time: '02:00 PM',
      attendance: 52,
      total: 55,
      method: 'Face ID',
    },
  ]

  return (
    <DashboardLayout role="ADMIN" user={user}>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-primary-600 to-accent-600 rounded-2xl p-8 text-white">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {user?.firstName}! 👋
          </h1>
          <p className="text-white/90">
            Here's what's happening with your organization today.
          </p>
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
              <button className="w-full bg-gradient-to-r from-primary-600 to-accent-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition">
                Create New User
              </button>
            </div>
          </div>

          {/* Recent Sessions */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Sessions</h2>
            <div className="space-y-4">
              {recentSessions.map((session) => (
                <div
                  key={session.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-primary-300 transition"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{session.course}</h3>
                    <p className="text-sm text-gray-600">
                      {session.teacher} • {session.time}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-900">
                        {session.attendance}/{session.total}
                      </p>
                      <p className="text-xs text-gray-600">
                        {Math.round((session.attendance / session.total) * 100)}%
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {session.method === 'QR Code' && (
                        <QrCode className="w-5 h-5 text-blue-500" />
                      )}
                      {session.method === 'RFID' && (
                        <Radio className="w-5 h-5 text-purple-500" />
                      )}
                      {session.method === 'Face ID' && (
                        <ScanIcon className="w-5 h-5 text-pink-500" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <button className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition">
                View All Sessions
              </button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition">
              <Users className="w-6 h-6 text-primary-600" />
              <span className="font-semibold text-gray-900">Create User</span>
            </button>
            <button className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition">
              <Calendar className="w-6 h-6 text-primary-600" />
              <span className="font-semibold text-gray-900">New Session</span>
            </button>
            <button className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition">
              <TrendingUp className="w-6 h-6 text-primary-600" />
              <span className="font-semibold text-gray-900">View Reports</span>
            </button>
            <button className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition">
              <Clock className="w-6 h-6 text-primary-600" />
              <span className="font-semibold text-gray-900">Export Data</span>
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
