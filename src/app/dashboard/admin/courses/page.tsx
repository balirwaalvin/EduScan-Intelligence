'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import DashboardLayout from '@/components/DashboardLayout'
import {
  BookOpen,
  Plus,
  Search,
  Edit2,
  Trash2,
  Building2,
  Users,
  X,
  Check,
  AlertCircle,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function CoursesPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [courses, setCourses] = useState<any[]>([])
  const [filteredCourses, setFilteredCourses] = useState<any[]>([])
  const [departments, setDepartments] = useState<any[]>([])
  const [programs, setPrograms] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState<any>(null)
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    description: '',
    departmentId: '',
    programId: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [schemaInitializing, setSchemaInitializing] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const fetchCourses = async (organizationId: string) => {
    try {
      const response = await fetch(`/api/courses?organizationId=${organizationId}`)
      if (response.ok) {
        const data = await response.json()
        const items = data.courses || []
        setCourses(items)
        setFilteredCourses(items)
      } else {
        setError('Failed to load courses')
      }
    } catch (error) {
      console.error('Error fetching courses:', error)
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
    } catch (error) {
      console.error('Error fetching departments:', error)
    }
  }

  const fetchPrograms = async (organizationId: string) => {
    try {
      const response = await fetch(`/api/programs?organizationId=${organizationId}`)
      if (response.ok) {
        const data = await response.json()
        setPrograms(data.programs || [])
      }
    } catch (error) {
      console.error('Error fetching programs:', error)
    }
  }

  const getDepartmentName = (departmentId: string) => {
    return departments.find((department) => department.$id === departmentId)?.name || 'No Department'
  }

  const getProgramName = (programId: string) => {
    return programs.find((program) => program.$id === programId)?.name || 'No Program'
  }

  const availablePrograms = programs.filter(
    (program) => !formData.departmentId || program.departmentId === formData.departmentId
  )

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
          fetchCourses(currentUser.$id),
          fetchDepartments(currentUser.$id),
          fetchPrograms(currentUser.$id),
        ])
      } catch (error) {
        router.push('/login')
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [router])

  useEffect(() => {
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase()
      const filtered = courses.filter(
        (course) =>
          course.name?.toLowerCase().includes(lowerQuery) ||
          course.code?.toLowerCase().includes(lowerQuery) ||
          getDepartmentName(course.departmentId).toLowerCase().includes(lowerQuery) ||
          getProgramName(course.programId).toLowerCase().includes(lowerQuery)
      )
      setFilteredCourses(filtered)
    } else {
      setFilteredCourses(courses)
    }
  }, [courses, searchQuery, departments, programs])

  const handleDepartmentChange = (departmentId: string) => {
    setFormData({
      ...formData,
      departmentId,
      programId: '',
    })
  }

  const handleProgramChange = (programId: string) => {
    const selectedProgram = programs.find((program) => program.$id === programId)

    setFormData({
      ...formData,
      programId,
      departmentId: selectedProgram?.departmentId || formData.departmentId,
    })
  }

  const buildPayload = () => {
    const selectedProgram = programs.find((program) => program.$id === formData.programId)
    const resolvedDepartmentId = formData.departmentId || selectedProgram?.departmentId || ''

    return {
      name: formData.name,
      code: formData.code,
      description: formData.description,
      departmentId: resolvedDepartmentId,
      programId: formData.programId,
      organizationId: user.id,
    }
  }

  const handleCreateCourse = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    setSuccess('')

    try {
      const response = await fetch('/api/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(buildPayload()),
      })

      if (response.ok) {
        setSuccess('Course created successfully!')
        setShowCreateModal(false)
        setFormData({ name: '', code: '', description: '', departmentId: '', programId: '' })
        await fetchCourses(user.id)
      } else {
        const data = await response.json()
        setError(data.error || 'Failed to create course')
      }
    } catch (error: any) {
      setError(error.message)
    } finally {
      setSubmitting(false)
    }
  }

  const handleEditCourse = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    setSuccess('')

    try {
      const response = await fetch('/api/courses', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          courseId: selectedCourse.$id,
          ...buildPayload(),
        }),
      })

      if (response.ok) {
        setSuccess('Course updated successfully!')
        setShowEditModal(false)
        setSelectedCourse(null)
        await fetchCourses(user.id)
      } else {
        const data = await response.json()
        setError(data.error || 'Failed to update course')
      }
    } catch (error: any) {
      setError(error.message)
    } finally {
      setSubmitting(false)
    }
  }

  const handleDeleteCourse = async (courseId: string) => {
    if (!confirm('Are you sure you want to delete this course?')) return

    try {
      const response = await fetch(`/api/courses?courseId=${courseId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setSuccess('Course deleted successfully!')
        await fetchCourses(user.id)
      } else {
        setError('Failed to delete course')
      }
    } catch (error: any) {
      setError(error.message)
    }
  }

  const openCreateModal = () => {
    setSelectedCourse(null)
    setFormData({ name: '', code: '', description: '', departmentId: '', programId: '' })
    setShowCreateModal(true)
  }

  const openEditModal = (course: any) => {
    setSelectedCourse(course)
    setFormData({
      name: course.name,
      code: course.code,
      description: course.description || '',
      departmentId: course.departmentId || '',
      programId: course.programId || '',
    })
    setShowEditModal(true)
  }

  const handleInitializeCourseSchema = async () => {
    setSchemaInitializing(true)
    setError('')
    setSuccess('')

    try {
      const response = await fetch('/api/setup/create-course-attribute', {
        method: 'POST',
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess(data.message || 'Course schema initialized successfully!')
        await fetchCourses(user.id)
      } else {
        setError(data.error || 'Failed to initialize course schema')
      }
    } catch (error: any) {
      setError(error.message)
    } finally {
      setSchemaInitializing(false)
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

  return (
    <DashboardLayout role="ADMIN" user={user}>
      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Courses</h1>
              <p className="text-gray-600 mt-1">Manage academic courses, departments, and programs</p>
            </div>
            <button
              onClick={openCreateModal}
              className="bg-primary-50 text-primary-600 border border-primary-100 px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Add Course</span>
            </button>
          </div>
          <div className="mt-4 flex items-center justify-between gap-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
            <p className="text-sm text-amber-900">
              If the Courses collection is missing <span className="font-semibold">programId</span>, initialize it here.
            </p>
            <button
              type="button"
              onClick={handleInitializeCourseSchema}
              disabled={schemaInitializing}
              className="shrink-0 rounded-lg bg-amber-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-amber-700 disabled:opacity-50"
            >
              {schemaInitializing ? 'Initializing...' : 'Initialize Schema'}
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
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <p className="text-sm text-gray-600 mt-4">
            Showing <span className="font-semibold">{filteredCourses.length}</span> of{' '}
            <span className="font-semibold">{courses.length}</span> courses
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div
              key={course.$id}
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="bg-primary-50 text-primary-600 border border-primary-100 p-3 rounded-xl">
                  <BookOpen className="w-6 h-6 text-primary-600" />
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => openEditModal(course)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteCourse(course.$id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-1">{course.name}</h3>
              <p className="text-sm text-gray-600 mb-2">Code: {course.code}</p>
              {course.description && (
                <p className="text-sm text-gray-500 mb-4 line-clamp-2">{course.description}</p>
              )}

              <div className="space-y-2 pt-4 border-t text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Building2 className="w-4 h-4" />
                  <span>{getDepartmentName(course.departmentId)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <BookOpen className="w-4 h-4" />
                  <span>{getProgramName(course.programId)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>0 Students</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No courses found</p>
            <p className="text-gray-400 mt-2">Create your first course to get started</p>
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
                className="bg-white rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Create Course</h2>
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleCreateCourse} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Course Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g., Introduction to Computer Science"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Course Code</label>
                    <input
                      type="text"
                      required
                      value={formData.code}
                      onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                      placeholder="e.g., CS101"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                    <select
                      required
                      value={formData.departmentId}
                      onChange={(e) => handleDepartmentChange(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value="">Select department</option>
                      {departments.map((department) => (
                        <option key={department.$id} value={department.$id}>
                          {department.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Program Offered</label>
                    <select
                      required
                      value={formData.programId}
                      onChange={(e) => handleProgramChange(e.target.value)}
                      disabled={!formData.departmentId}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-100"
                    >
                      <option value="">
                        {formData.departmentId ? 'Select program' : 'Select a department first'}
                      </option>
                      {availablePrograms.map((program) => (
                        <option key={program.$id} value={program.$id}>
                          {program.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description (Optional)
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Brief course description..."
                      rows={3}
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

        <AnimatePresence>
          {showEditModal && selectedCourse && (
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
                className="bg-white rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Edit Course</h2>
                  <button
                    onClick={() => setShowEditModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleEditCourse} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Course Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Course Code</label>
                    <input
                      type="text"
                      required
                      value={formData.code}
                      onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                    <select
                      required
                      value={formData.departmentId}
                      onChange={(e) => handleDepartmentChange(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value="">Select department</option>
                      {departments.map((department) => (
                        <option key={department.$id} value={department.$id}>
                          {department.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Program Offered</label>
                    <select
                      required
                      value={formData.programId}
                      onChange={(e) => handleProgramChange(e.target.value)}
                      disabled={!formData.departmentId}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-100"
                    >
                      <option value="">
                        {formData.departmentId ? 'Select program' : 'Select a department first'}
                      </option>
                      {availablePrograms.map((program) => (
                        <option key={program.$id} value={program.$id}>
                          {program.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description (Optional)
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={3}
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
