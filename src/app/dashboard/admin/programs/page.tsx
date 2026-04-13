'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import DashboardLayout from '@/components/DashboardLayout'
import {
  BookOpen,
  Plus,
  Search,
  Trash2,
  Building2,
  Users,
  X,
  Check,
  AlertCircle,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ProgramsPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [programs, setPrograms] = useState<any[]>([])
  const [filteredPrograms, setFilteredPrograms] = useState<any[]>([])
  const [departments, setDepartments] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    departmentId: '',
    duration: '',
    status: 'active',
  })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const fetchPrograms = async (organizationId: string) => {
    try {
      const response = await fetch(`/api/programs?organizationId=${organizationId}`)
      if (response.ok) {
        const data = await response.json()
        const items = data.programs || []
        setPrograms(items)
        setFilteredPrograms(items)
      } else {
        setError('Failed to load programs')
      }
    } catch (err) {
      console.error('Error fetching programs:', err)
      setError('Error connecting to server')
    }
  }

  const fetchDepartments = async (organizationId: string) => {
    try {
      const response = await fetch(`/api/departments?organizationId=${organizationId}`)
      if (response.ok) {
        const data = await response.json()
        setDepartments(data.departments || [])
      }
    } catch (err) {
      console.error('Error fetching departments:', err)
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

        await Promise.all([
          fetchPrograms(currentUser.$id),
          fetchDepartments(currentUser.$id),
        ])
      } catch (err) {
        console.error('Authentication check failed:', err)
        router.push('/login')
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [router])

  useEffect(() => {
    if (searchQuery) {
      const lower = searchQuery.toLowerCase()
      const filtered = programs.filter(
        (p) =>
          p.name?.toLowerCase().includes(lower) ||
          p.code?.toLowerCase().includes(lower) ||
          p.duration?.toLowerCase().includes(lower)
      )
      setFilteredPrograms(filtered)
    } else {
      setFilteredPrograms(programs)
    }
  }, [programs, searchQuery])

  const handleCreateProgram = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    setSuccess('')

    try {
      const response = await fetch('/api/programs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          organizationId: user.id,
        }),
      })

      if (response.ok) {
        setSuccess('Program created successfully!')
        setShowCreateModal(false)
        setFormData({
          name: '',
          code: '',
          departmentId: '',
          duration: '',
          status: 'active',
        })
        await fetchPrograms(user.id)
      } else {
        const data = await response.json()
        setError(data.error || 'Failed to create program')
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  const handleDeleteProgram = async (programId: string) => {
    if (!confirm('Are you sure you want to delete this program?')) return

    try {
      const response = await fetch(`/api/programs?programId=${programId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setSuccess('Program deleted successfully!')
        await fetchPrograms(user.id)
      } else {
        const data = await response.json()
        setError(data.error || 'Failed to delete program')
      }
    } catch (err: any) {
      setError(err.message)
    }
  }

  const getDepartmentName = (departmentId: string) => {
    const department = departments.find((d) => d.$id === departmentId)
    return department?.name || 'No Department'
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
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Programs</h1>
              <p className="text-gray-600 mt-1">Manage academic programs and duration setup</p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-primary-50 text-primary-600 border border-primary-100 px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Add Program</span>
            </button>
          </div>
        </div>

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

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search programs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <p className="text-sm text-gray-600 mt-4">
            Showing <span className="font-semibold">{filteredPrograms.length}</span> of{' '}
            <span className="font-semibold">{programs.length}</span> programs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrograms.map((program) => (
            <div
              key={program.$id}
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="bg-primary-50 text-primary-600 border border-primary-100 p-3 rounded-xl">
                  <BookOpen className="w-6 h-6" />
                </div>
                <button
                  onClick={() => handleDeleteProgram(program.$id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                  title="Delete Program"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-1">{program.name}</h3>
              <p className="text-sm text-gray-600 mb-2">Code: {program.code}</p>

              <div className="space-y-2 mb-4 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <Building2 className="w-4 h-4" />
                  <span>{getDepartmentName(program.departmentId)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4" />
                  <span>{program.duration || 'Duration not set'}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    program.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {String(program.status || 'active').charAt(0).toUpperCase() +
                    String(program.status || 'active').slice(1)}
                </span>
              </div>
            </div>
          ))}
        </div>

        {filteredPrograms.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No programs found</p>
            <p className="text-gray-400 mt-2">Create your first program to get started</p>
          </div>
        )}

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
                className="bg-white rounded-2xl p-8 max-w-md w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Create Program</h2>
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleCreateProgram} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Program Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="e.g. Bachelor of Computer Science"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Program Code</label>
                    <input
                      type="text"
                      value={formData.code}
                      onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="e.g. BCS"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                    <select
                      value={formData.departmentId}
                      onChange={(e) => setFormData({ ...formData, departmentId: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value="">No Department</option>
                      {departments.map((department) => (
                        <option key={department.$id} value={department.$id}>
                          {department.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                    <input
                      type="text"
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="e.g. 4 Years"
                    />
                  </div>

                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowCreateModal(false)}
                      className="px-6 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition disabled:opacity-50"
                    >
                      {submitting ? 'Creating...' : 'Create Program'}
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
