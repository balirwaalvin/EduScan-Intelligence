'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import DashboardLayout from '@/components/DashboardLayout'
import QRCodeGenerator from '@/components/QRCodeGenerator'
import LiveAttendanceDashboard from '@/components/LiveAttendanceDashboard'
import {
  Calendar,
  Plus,
  Clock,
  Users,
  QrCode,
  Trash2,
  X,
  Check,
  AlertCircle,
  Eye,
  BarChart3,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function SessionsPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [sessions, setSessions] = useState<any[]>([])
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedSession, setSelectedSession] = useState<any>(null)
  const [showLiveDashboard, setShowLiveDashboard] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    startTime: '',
    endTime: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // Helper function to get current datetime in datetime-local format
  const getCurrentDateTime = () => {
    const now = new Date()
    // Format: YYYY-MM-DDTHH:MM
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const day = String(now.getDate()).padStart(2, '0')
    const hours = String(now.getHours()).padStart(2, '0')
    const minutes = String(now.getMinutes()).padStart(2, '0')
    return `${year}-${month}-${day}T${hours}:${minutes}`
  }

  // Helper to get datetime 1 hour from now
  const getOneHourLater = () => {
    const later = new Date()
    later.setHours(later.getHours() + 1)
    const year = later.getFullYear()
    const month = String(later.getMonth() + 1).padStart(2, '0')
    const day = String(later.getDate()).padStart(2, '0')
    const hours = String(later.getHours()).padStart(2, '0')
    const minutes = String(later.getMinutes()).padStart(2, '0')
    return `${year}-${month}-${day}T${hours}:${minutes}`
  }

  const fetchSessions = async (organizationId: string) => {
    try {
      const response = await fetch(`/api/sessions?organizationId=${organizationId}`)
      if (response.ok) {
        const data = await response.json()
        setSessions(data.sessions)
      }
    } catch (error) {
      console.error('Error fetching sessions:', error)
    }
  }

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/me')
        if (!response.ok) throw new Error('Not authenticated')

        const data = await response.json()
        const currentUser = data.user

        setUser({
          id: currentUser.$id,
          name: currentUser.name,
          email: currentUser.email,
        })

        await fetchSessions(currentUser.$id)
      } catch (error) {
        console.error('Authentication check failed:', error)
        router.push('/login')
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [router])

  const handleCreateSession = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    setSuccess('')

    try {
      // Convert datetime-local to ISO string properly
      // datetime-local gives us "YYYY-MM-DDTHH:MM" in local timezone
      // We need to convert it to ISO format for Appwrite
      const startTimeISO = new Date(formData.startTime).toISOString()
      const endTimeISO = new Date(formData.endTime).toISOString()

      const response = await fetch('/api/sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          startTime: startTimeISO,
          endTime: endTimeISO,
          organizationId: user.id,
        }),
      })

      if (response.ok) {
        setSuccess('Session created successfully!')
        setShowCreateModal(false)
        setFormData({ name: '', startTime: '', endTime: '' })
        await fetchSessions(user.id)
      } else {
        const data = await response.json()
        setError(data.error || 'Failed to create session')
      }
    } catch (error: any) {
      setError(error.message)
    } finally {
      setSubmitting(false)
    }
  }

  const handleDeleteSession = async (sessionId: string) => {
    if (!confirm('Are you sure you want to delete this session?')) return

    try {
      const response = await fetch(`/api/sessions?sessionId=${sessionId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setSuccess('Session deleted successfully!')
        await fetchSessions(user.id)
      }
    } catch (error: any) {
      setError(error.message)
    }
  }

  const getSessionStatus = (session: any) => {
    const now = new Date()
    const start = new Date(session.startTime)
    const end = new Date(session.endTime)

    if (now < start) return { label: 'Upcoming', color: 'bg-blue-100 text-blue-700 border-blue-200' }
    if (now >= start && now <= end) return { label: 'Active', color: 'bg-green-100 text-green-700 border-green-200' }
    return { label: 'Ended', color: 'bg-gray-100 text-gray-700 border-gray-200' }
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

  return (
    <DashboardLayout role="ADMIN" user={user}>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-600 to-accent-600 rounded-2xl p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Sessions Management</h1>
              <p className="text-white/90">Create sessions and track attendance with QR codes</p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>New Session</span>
            </button>
          </div>
        </div>

        {/* Success/Error Messages */}
        <AnimatePresence>
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-3"
            >
              <Check className="w-5 h-5 text-green-600" />
              <p className="text-green-800">{success}</p>
            </motion.div>
          )}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-3"
            >
              <AlertCircle className="w-5 h-5 text-red-600" />
              <p className="text-red-800">{error}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sessions Grid */}
        {sessions.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No sessions found</p>
            <p className="text-gray-400 mt-2">Create your first session to get started</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {sessions.map((session) => {
              const status = getSessionStatus(session)
              return (
                <motion.div
                  key={session.$id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 mb-2">{session.name}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>
                              {new Date(session.startTime).toLocaleString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </span>
                          </div>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${status.color}`}>
                        {status.label}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      {/* QR Code */}
                      <div>
                        <p className="text-xs font-medium text-gray-500 mb-2">QR Code</p>
                        <QRCodeGenerator
                          sessionId={session.$id}
                          organizationId={session.organizationId}
                          sessionName={session.name}
                          size={120}
                        />
                      </div>

                      {/* Quick Stats */}
                      <div className="space-y-2">
                        <div className="bg-gray-50 rounded-lg p-3">
                          <div className="flex items-center space-x-2">
                            <Users className="w-4 h-4 text-gray-500" />
                            <div>
                              <p className="text-xs text-gray-500">Attendees</p>
                              <p className="text-lg font-bold text-gray-900">-</p>
                            </div>
                          </div>
                        </div>
                        <div className="bg-primary-50 rounded-lg p-3">
                          <div className="flex items-center space-x-2">
                            <QrCode className="w-4 h-4 text-primary-600" />
                            <div>
                              <p className="text-xs text-primary-600">Status</p>
                              <p className="text-sm font-semibold text-primary-700">{session.status}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-2 pt-4 border-t">
                      <button
                        onClick={() => {
                          setSelectedSession(session)
                          setShowLiveDashboard(true)
                        }}
                        className="flex-1 px-4 py-2 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-lg hover:shadow-lg transition flex items-center justify-center space-x-2"
                      >
                        <BarChart3 className="w-4 h-4" />
                        <span>Live Dashboard</span>
                      </button>
                      <button
                        onClick={() => handleDeleteSession(session.$id)}
                        className="px-4 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition flex items-center justify-center"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        )}

        {/* Create Session Modal */}
        <AnimatePresence>
          {showCreateModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
              onClick={() => setShowCreateModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-white rounded-2xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Create New Session</h2>
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleCreateSession} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Session Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g., Computer Science 101 - Lecture 5"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Start Time
                      </label>
                      <input
                        type="datetime-local"
                        required
                        value={formData.startTime}
                        onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                        min={getCurrentDateTime()}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                      <p className="text-xs text-gray-500 mt-1">Select the session start date and time</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        End Time
                      </label>
                      <input
                        type="datetime-local"
                        required
                        value={formData.endTime}
                        onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                        min={formData.startTime || getCurrentDateTime()}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                      <p className="text-xs text-gray-500 mt-1">Must be after start time</p>
                    </div>
                  </div>

                  <div className="flex space-x-4 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowCreateModal(false)}
                      className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="flex-1 px-4 py-3 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-lg font-semibold hover:shadow-lg transition disabled:opacity-50"
                    >
                      {submitting ? 'Creating...' : 'Create Session'}
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Live Dashboard Modal */}
        {showLiveDashboard && selectedSession && (
          <LiveAttendanceDashboard
            sessionId={selectedSession.$id}
            sessionName={selectedSession.name}
            onClose={() => {
              setShowLiveDashboard(false)
              setSelectedSession(null)
            }}
          />
        )}
      </div>
    </DashboardLayout>
  )
}
