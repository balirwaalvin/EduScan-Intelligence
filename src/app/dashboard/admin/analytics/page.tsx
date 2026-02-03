'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import DashboardLayout from '@/components/DashboardLayout'
import { account } from '@/lib/appwrite'
import {
  TrendingUp,
  Users,
  Calendar,
  CheckCircle2,
  XCircle,
  Clock,
  Download,
  RefreshCw,
} from 'lucide-react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts'

export default function AnalyticsPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [stats, setStats] = useState({
    total: 0,
    present: 0,
    absent: 0,
    late: 0,
    averageRate: 0,
  })
  const [weeklyData, setWeeklyData] = useState<any[]>([])
  const [methodData, setMethodData] = useState<any[]>([])

  const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899']

  const fetchAnalytics = async (organizationId: string) => {
    try {
      setRefreshing(true)

      // Fetch attendance stats
      const statsRes = await fetch(`/api/analytics?organizationId=${organizationId}&action=stats`)
      if (statsRes.ok) {
        const data = await statsRes.json()
        setStats(data)
      }

      // Fetch weekly data
      const weeklyRes = await fetch(`/api/analytics?organizationId=${organizationId}&action=weekly`)
      if (weeklyRes.ok) {
        const data = await weeklyRes.json()
        setWeeklyData(data.data)
      }

      // Fetch method distribution
      const methodRes = await fetch(
        `/api/analytics?organizationId=${organizationId}&action=methods`
      )
      if (methodRes.ok) {
        const data = await methodRes.json()
        setMethodData(data.data)
      }
    } catch (error) {
      console.error('Error fetching analytics:', error)
    } finally {
      setRefreshing(false)
    }
  }

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = await account.get()
        setUser({
          id: currentUser.$id,
          name: currentUser.name,
          email: currentUser.email,
        })
        await fetchAnalytics(currentUser.$id)
      } catch (error) {
        router.push('/login')
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [router])

  const handleRefresh = () => {
    if (user?.id) {
      fetchAnalytics(user.id)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  const statCards = [
    {
      title: 'Total Records',
      value: stats.total.toLocaleString(),
      icon: Calendar,
      color: 'from-blue-500 to-cyan-500',
      percentage: 100,
    },
    {
      title: 'Present',
      value: stats.present.toLocaleString(),
      icon: CheckCircle2,
      color: 'from-green-500 to-emerald-500',
      percentage: stats.total > 0 ? (stats.present / stats.total) * 100 : 0,
    },
    {
      title: 'Absent',
      value: stats.absent.toLocaleString(),
      icon: XCircle,
      color: 'from-red-500 to-rose-500',
      percentage: stats.total > 0 ? (stats.absent / stats.total) * 100 : 0,
    },
    {
      title: 'Late',
      value: stats.late.toLocaleString(),
      icon: Clock,
      color: 'from-orange-500 to-yellow-500',
      percentage: stats.total > 0 ? (stats.late / stats.total) * 100 : 0,
    },
  ]

  return (
    <DashboardLayout role="ADMIN" user={user}>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-600 to-accent-600 rounded-2xl p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Analytics & Reports</h1>
              <p className="text-white/90">Comprehensive attendance insights and statistics</p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="bg-white/20 hover:bg-white/30 p-3 rounded-lg transition disabled:opacity-50"
              >
                <RefreshCw className={`w-6 h-6 ${refreshing ? 'animate-spin' : ''}`} />
              </button>
              <button className="bg-white/20 hover:bg-white/30 px-4 py-3 rounded-lg transition flex items-center space-x-2">
                <Download className="w-5 h-5" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat) => (
            <div key={stat.title} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`bg-gradient-to-br ${stat.color} p-3 rounded-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-semibold text-gray-600">
                  {stat.percentage.toFixed(1)}%
                </span>
              </div>
              <h3 className="text-gray-600 text-sm font-medium mb-1">{stat.title}</h3>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weekly Attendance Trend */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Weekly Attendance Trend</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="day"
                  stroke="#6b7280"
                  style={{ fontSize: '12px' }}
                />
                <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="attendance"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Method Distribution */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Attendance Methods</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={methodData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {methodData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Attendance Rate Overview */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Attendance Rate Overview</h2>
          <div className="space-y-4">
            {[
              { label: 'Present', count: stats.present, color: 'bg-green-500', total: stats.total },
              { label: 'Late', count: stats.late, color: 'bg-orange-500', total: stats.total },
              { label: 'Absent', count: stats.absent, color: 'bg-red-500', total: stats.total },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">{item.label}</span>
                  <span className="text-sm font-bold text-gray-900">
                    {item.count} ({item.total > 0 ? ((item.count / item.total) * 100).toFixed(1) : 0}%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`${item.color} h-3 rounded-full transition-all duration-500`}
                    style={{
                      width: `${item.total > 0 ? (item.count / item.total) * 100 : 0}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Overall Attendance Rate</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {stats.averageRate.toFixed(1)}%
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Total Records</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {stats.total.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Method Distribution Bar Chart */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Methods Usage Comparison</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={methodData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="method"
                stroke="#6b7280"
                style={{ fontSize: '12px' }}
              />
              <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
              />
              <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                {methodData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </DashboardLayout>
  )
}
