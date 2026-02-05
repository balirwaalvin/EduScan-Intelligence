'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import DashboardLayout from '@/components/DashboardLayout'
import {
  Calendar,
  Plus,
  Search,
  Filter,
  Clock,
  MapPin,
  Users,
  QrCode,
  Radio,
  Scan as ScanIcon,
  Play,
  Square,
  Trash2,
  X,
  Check,
  AlertCircle,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function SessionsPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [sessions, setSessions] = useState<any[]>([])
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    courseId: '',
    startTime: '',
    endTime: '',
    location: '',
    allowedMethods: ['QR_CODE'],
    lateThreshold: 15,
  })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

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
        // Check if user is authenticated via our API
        const response = await fetch('/api/auth/me')

        if (!response.ok) {
          throw new Error('Not authenticated')
        }

        const data = await response.json()
        const currentUser = data.user

        console.log('Authenticated user:', currentUser.email)

        setUser({
          id: currentUser.$id,
          name: currentUser.name,
          email: currentUser.email,
        })

        // Fetch sessions for this organization
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
      const response = await fetch('/api/sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          organizationId: user.id,
          creatorId: user.id,
        }),
      })

      if (response.ok) {
        setSuccess('Session created successfully!')
        setShowCreateModal(false)
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

  const toggleMethod = (method: string) => {
    setFormData((prev) => ({
      ...prev,
      allowedMethods: prev.allowedMethods.includes(method)
        ? prev.allowedMethods.filter((m) => m !== method)
        : [...prev.allowedMethods, method],
    }))
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
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Sessions Management</h1>
              <p className="text-gray-600 mt-1">Create and manage attendance sessions</p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-gradient-to-r from-primary-600 to-accent-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition flex items-center space-x-2"
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sessions.map((session) => (
            <div
              key={session.$id}
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{session.name}</h3>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
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
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    session.isActive
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {session.isActive ? 'Active' : 'Ended'}
                </span>
              </div>

              {session.location && (
                <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
                  <MapPin className="w-4 h-4" />
                  <span>{session.location}</span>
                </div>
              )}

              <div className="flex items-center space-x-2 mb-4">
                {session.allowedMethods?.includes('QR_CODE') && (
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <QrCode className="w-4 h-4 text-blue-600" />
                  </div>
                )}
                {session.allowedMethods?.includes('RFID') && (
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <Radio className="w-4 h-4 text-purple-600" />
                  </div>
                )}
                {session.allowedMethods?.includes('FACIAL_RECOGNITION') && (
                  <div className="bg-pink-100 p-2 rounded-lg">
                    <ScanIcon className="w-4 h-4 text-pink-600" />
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-2 pt-4 border-t">
                <button
                  onClick={() => handleDeleteSession(session.$id)}
                  className="flex-1 px-4 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition flex items-center justify-center space-x-2"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {sessions.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No sessions found</p>
            <p className="text-gray-400 mt-2">Create your first session to get started</p>
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
                        onChange={(e) =>
                          setFormData({ ...formData, startTime: e.target.value })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        End Time
                      </label>
                      <input
                        type="datetime-local"
                        required
                        value={formData.endTime}
                        onChange={(e) =>
                          setFormData({ ...formData, endTime: e.target.value })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="e.g., Room 101, Building A"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Attendance Methods
                    </label>
                    <div className="space-y-2">
                      {[
                        { value: 'QR_CODE', label: 'QR Code', icon: QrCode },
                        { value: 'RFID', label: 'RFID Card', icon: Radio },
                        { value: 'FACIAL_RECOGNITION', label: 'Face Recognition', icon: ScanIcon },
                      ].map((method) => (
                        <label
                          key={method.value}
                          className="flex items-center space-x-3 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition"
                        >
                          <input
                            type="checkbox"
                            checked={formData.allowedMethods.includes(method.value)}
                            onChange={() => toggleMethod(method.value)}
                            className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                          />
                          <method.icon className="w-5 h-5 text-gray-600" />
                          <span className="text-sm font-medium text-gray-700">
                            {method.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Late Threshold (minutes)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={formData.lateThreshold}
                      onChange={(e) =>
                        setFormData({ ...formData, lateThreshold: parseInt(e.target.value) })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
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
      </div>
    </DashboardLayout>
  )
}
