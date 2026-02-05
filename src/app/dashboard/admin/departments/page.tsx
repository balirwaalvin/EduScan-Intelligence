'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import DashboardLayout from '@/components/DashboardLayout'
import {
  Building2,
  Plus,
  Search,
  Edit2,
  Trash2,
  Users,
  BookOpen,
  X,
  Check,
  AlertCircle,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function DepartmentsPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [departments, setDepartments] = useState<any[]>([])
  const [filteredDepartments, setFilteredDepartments] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedDepartment, setSelectedDepartment] = useState<any>(null)
  const [formData, setFormData] = useState({
    name: '',
    code: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [fixing, setFixing] = useState(false)

  const handleFixOrganizationIds = async () => {
    if (!confirm('This will update all departments to use your organization ID. Continue?')) return

    setFixing(true)
    setError('')
    setSuccess('')

    try {
      console.log('Fixing department organization IDs for:', user.id)
      const response = await fetch('/api/departments/fix-org-ids', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetOrganizationId: user.id }),
      })

      if (response.ok) {
        const data = await response.json()
        console.log('Fix result:', data)
        setSuccess(`Successfully updated ${data.updated} department(s)!`)
        // Refresh departments list
        await fetchDepartments(user.id)
      } else {
        const data = await response.json()
        setError(data.error || 'Failed to fix organization IDs')
      }
    } catch (error: any) {
      console.error('Error fixing organization IDs:', error)
      setError(error.message)
    } finally {
      setFixing(false)
    }
  }

  const fetchDepartments = async (organizationId: string) => {
    try {
      console.log('Fetching departments for organizationId:', organizationId)
      const response = await fetch(`/api/departments?organizationId=${organizationId}`)
      console.log('Departments API response status:', response.status)

      if (response.ok) {
        const data = await response.json()
        console.log('Departments fetched:', data.departments)
        console.log('Number of departments:', data.departments?.length)
        setDepartments(data.departments || [])
        setFilteredDepartments(data.departments || [])

        // Show helpful message if no departments found
        if (!data.departments || data.departments.length === 0) {
          console.warn('No departments found for this organization')
          console.warn('This might mean:')
          console.warn('1. No departments created yet')
          console.warn('2. Departments exist but with different organizationId')
          console.warn('3. Check Appwrite Console to verify department organizationId matches:', organizationId)
        }
      } else {
        const errorData = await response.json()
        console.error('Failed to fetch departments:', errorData)
        setError('Failed to load departments. Please try again.')
      }
    } catch (error) {
      console.error('Error fetching departments:', error)
      setError('Error connecting to server. Please check your connection.')
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

        // Fetch departments for this organization
        await fetchDepartments(currentUser.$id)

        // DEBUG: Also try fetching without organization filter
        console.log('DEBUG: Attempting to fetch ALL departments...')
        try {
          const allDepsResponse = await fetch('/api/departments')
          if (allDepsResponse.ok) {
            const allDepsData = await allDepsResponse.json()
            console.log('DEBUG: All departments in database:', allDepsData.departments)
            console.log('DEBUG: Total departments count:', allDepsData.departments?.length)

            // Check if any departments have different organizationId
            if (allDepsData.departments?.length > 0) {
              const orgIds = [...new Set(allDepsData.departments.map((d: any) => d.organizationId))]
              console.log('DEBUG: Unique organization IDs in departments:', orgIds)
              console.log('DEBUG: Current user organizationId:', currentUser.$id)
            }
          }
        } catch (debugError) {
          console.error('DEBUG: Error fetching all departments:', debugError)
        }
      } catch (error) {
        console.error('Authentication check failed:', error)
        router.push('/login')
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [router])

  useEffect(() => {
    if (searchQuery) {
      const filtered = departments.filter(
        (d) =>
          d.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          d.code?.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setFilteredDepartments(filtered)
    } else {
      setFilteredDepartments(departments)
    }
  }, [departments, searchQuery])

  const handleCreateDepartment = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    setSuccess('')

    try {
      const response = await fetch('/api/departments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          organizationId: user.id,
        }),
      })

      if (response.ok) {
        setSuccess('Department created successfully!')
        setShowCreateModal(false)
        setFormData({ name: '', code: '' })
        await fetchDepartments(user.id)
      } else {
        const data = await response.json()
        setError(data.error || 'Failed to create department')
      }
    } catch (error: any) {
      setError(error.message)
    } finally {
      setSubmitting(false)
    }
  }

  const handleEditDepartment = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    setSuccess('')

    try {
      const response = await fetch('/api/departments', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          departmentId: selectedDepartment.$id,
          ...formData,
        }),
      })

      if (response.ok) {
        setSuccess('Department updated successfully!')
        setShowEditModal(false)
        setSelectedDepartment(null)
        await fetchDepartments(user.id)
      } else {
        const data = await response.json()
        setError(data.error || 'Failed to update department')
      }
    } catch (error: any) {
      setError(error.message)
    } finally {
      setSubmitting(false)
    }
  }

  const handleDeleteDepartment = async (departmentId: string) => {
    if (!confirm('Are you sure you want to delete this department?')) return

    try {
      const response = await fetch(`/api/departments?departmentId=${departmentId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setSuccess('Department deleted successfully!')
        await fetchDepartments(user.id)
      } else {
        setError('Failed to delete department')
      }
    } catch (error: any) {
      setError(error.message)
    }
  }

  const openEditModal = (department: any) => {
    setSelectedDepartment(department)
    setFormData({
      name: department.name,
      code: department.code,
    })
    setShowEditModal(true)
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
              <h1 className="text-3xl font-bold text-gray-900">Departments</h1>
              <p className="text-gray-600 mt-1">Manage organizational departments</p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-gradient-to-r from-primary-600 to-accent-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Add Department</span>
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

        {/* Search */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search departments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <p className="text-sm text-gray-600 mt-4">
            Showing <span className="font-semibold">{filteredDepartments.length}</span> of{' '}
            <span className="font-semibold">{departments.length}</span> departments
          </p>
        </div>

        {/* Departments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDepartments.map((department) => (
            <div
              key={department.$id}
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="bg-gradient-to-br from-primary-600 to-accent-600 p-3 rounded-lg">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => openEditModal(department)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteDepartment(department.$id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-1">{department.name}</h3>
              <p className="text-sm text-gray-600 mb-4">Code: {department.code}</p>

              <div className="flex items-center justify-between pt-4 border-t text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>0 Staff</span>
                </div>
                <div className="flex items-center space-x-1">
                  <BookOpen className="w-4 h-4" />
                  <span>0 Courses</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredDepartments.length === 0 && !loading && (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg font-semibold">No departments found</p>
            <p className="text-gray-400 mt-2">
              {searchQuery
                ? 'No departments match your search criteria'
                : 'Create your first department to get started'
              }
            </p>

            {!searchQuery && (
              <>
                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg text-left max-w-lg mx-auto">
                  <p className="text-sm text-blue-800 font-semibold mb-2">💡 Troubleshooting Tips:</p>
                  <ul className="text-xs text-blue-700 space-y-1 list-disc list-inside">
                    <li>Check browser console (F12) for detailed logs</li>
                    <li>Verify department exists in Appwrite Console</li>
                    <li>Ensure department's organizationId matches your user ID</li>
                    <li>Try creating a new department using the button above</li>
                  </ul>
                </div>

                {/* Show fix button if console shows departments exist */}
                <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg max-w-lg mx-auto">
                  <p className="text-sm text-yellow-800 font-semibold mb-2">
                    🔧 Department exists but not showing?
                  </p>
                  <p className="text-xs text-yellow-700 mb-3">
                    If the console shows departments exist with a different organization ID, click below to fix it:
                  </p>
                  <button
                    onClick={handleFixOrganizationIds}
                    disabled={fixing}
                    className="w-full px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {fixing ? 'Fixing...' : '🔧 Fix Organization IDs'}
                  </button>
                </div>
              </>
            )}

            <button
              onClick={() => setShowCreateModal(true)}
              className="mt-6 inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-lg font-medium hover:shadow-lg transition"
            >
              <Plus className="w-5 h-5" />
              <span>Create Department</span>
            </button>
          </div>
        )}

        {/* Create Department Modal */}
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
                  <h2 className="text-2xl font-bold text-gray-900">Create Department</h2>
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleCreateDepartment} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Department Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g., Computer Science"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Department Code
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.code}
                      onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                      placeholder="e.g., CS"
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
                      {submitting ? 'Creating...' : 'Create'}
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Edit Department Modal */}
        <AnimatePresence>
          {showEditModal && selectedDepartment && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
              onClick={() => setShowEditModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-white rounded-2xl p-8 max-w-md w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Edit Department</h2>
                  <button
                    onClick={() => setShowEditModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleEditDepartment} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Department Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Department Code
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.code}
                      onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>

                  <div className="flex space-x-4 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowEditModal(false)}
                      className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="flex-1 px-4 py-3 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-lg font-semibold hover:shadow-lg transition disabled:opacity-50"
                    >
                      {submitting ? 'Updating...' : 'Update'}
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
