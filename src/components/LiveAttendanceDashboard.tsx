'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Users, Clock, TrendingUp, CheckCircle, AlertCircle, X, RefreshCw, Timer, Download } from 'lucide-react'
import * as XLSX from 'xlsx'

interface LiveAttendanceDashboardProps {
  sessionId: string
  sessionName: string
  onClose: () => void
  onSessionUpdated?: () => Promise<void> | void
}

export default function LiveAttendanceDashboard({ sessionId, sessionName, onClose, onSessionUpdated }: LiveAttendanceDashboardProps) {
  const [attendance, setAttendance] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [autoRefresh, setAutoRefresh] = useState(true)
  const [sessionDetails, setSessionDetails] = useState<any>(null)
  const [timeLeft, setTimeLeft] = useState<string>('')
  const [endingSession, setEndingSession] = useState(false)
  const [removingAttendanceIds, setRemovingAttendanceIds] = useState<string[]>([])
  const [actionError, setActionError] = useState('')
  const [actionSuccess, setActionSuccess] = useState('')

  useEffect(() => {
    fetchSessionDetails()
    fetchAttendance()

    if (autoRefresh) {
      const interval = setInterval(fetchAttendance, 5000) // Refresh every 5 seconds
      return () => clearInterval(interval)
    }
  }, [sessionId, autoRefresh])

  useEffect(() => {
    if (sessionDetails) {
      const timer = setInterval(() => {
        updateTimer()
      }, 1000)
      updateTimer() // Initial call
      return () => clearInterval(timer)
    }
  }, [sessionDetails])

  const fetchSessionDetails = async () => {
    try {
      const response = await fetch(`/api/sessions?sessionId=${sessionId}`)
      if (response.ok) {
        const data = await response.json()
        setSessionDetails(data.session)
      }
    } catch (error) {
      console.error('Error fetching session details:', error)
    }
  }

  const handleEndSession = async () => {
    if (!confirm('End this session now? Students will no longer be able to mark attendance.')) {
      return
    }

    setEndingSession(true)
    setActionError('')
    setActionSuccess('')

    try {
      const response = await fetch('/api/sessions', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, action: 'end' }),
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || 'Failed to end session')
      }

      setSessionDetails(data.session)
      setActionSuccess('Session ended successfully.')
      await fetchAttendance()
      if (onSessionUpdated) {
        await onSessionUpdated()
      }
    } catch (error: any) {
      setActionError(error.message || 'Failed to end session')
    } finally {
      setEndingSession(false)
    }
  }

  const handleUncheckAttendance = async (record: any, checked: boolean) => {
    if (checked) return

    if (!confirm(`Remove attendance for ${record.userName || 'this student'}?`)) {
      return
    }

    const enteredReason = window.prompt(
      `Reason for removing ${record.userName || 'this student'}'s attendance:`,
      'Counterfeit/proxy scan suspected'
    )

    if (enteredReason === null) {
      return
    }

    const removalReason = enteredReason.trim() || 'Counterfeit/proxy scan suspected'

    setActionError('')
    setActionSuccess('')
    setRemovingAttendanceIds((prev) => [...prev, record.$id])

    try {
      const response = await fetch('/api/attendance', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ attendanceId: record.$id, sessionId, reason: removalReason }),
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || 'Failed to remove attendance')
      }

      setAttendance((prev) => prev.filter((item) => item.$id !== record.$id))
      setActionSuccess(`Attendance removed for ${record.userName || 'student'}.`)
      if (onSessionUpdated) {
        await onSessionUpdated()
      }
    } catch (error: any) {
      setActionError(error.message || 'Failed to remove attendance')
    } finally {
      setRemovingAttendanceIds((prev) => prev.filter((id) => id !== record.$id))
    }
  }

  const updateTimer = () => {
    if (!sessionDetails) return

    const now = new Date().getTime()
    const start = new Date(sessionDetails.startTime).getTime()
    const end = new Date(sessionDetails.endTime).getTime()

    if (now < start) {
      const diff = start - now
      setTimeLeft(`Starts in ${formatDuration(diff)}`)
    } else if (now >= start && now <= end) {
      const diff = end - now
      setTimeLeft(`${formatDuration(diff)} remaining`)
    } else {
      setTimeLeft('Session Ended')
    }
  }

  const formatDuration = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000)
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  const fetchAttendance = async () => {
    try {
      const response = await fetch(`/api/attendance?sessionId=${sessionId}`)
      if (response.ok) {
        const data = await response.json()
        setAttendance(data.attendance || [])
      }
    } catch (error) {
      console.error('Error fetching attendance:', error)
    } finally {
      setLoading(false)
    }
  }

  const stats = {
    total: attendance.length,
    present: attendance.filter(a => a.status === 'PRESENT').length,
    late: attendance.filter(a => a.status === 'LATE').length,
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PRESENT': return 'bg-green-100 text-green-700 border-green-200'
      case 'LATE': return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      default: return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
  }

  const handleExportExcel = () => {
    if (attendance.length === 0) {
      alert('No attendance data to export.')
      return
    }

    const exportData = attendance.map(record => ({
      'Student Name': record.userName || 'Unknown User',
      'Email Address': record.userEmail || 'No Email',
      'Student ID': record.studentId || 'N/A',
      'Department': record.department || 'N/A',
      'Status': record.status,
      'Time Marked': formatTime(record.checkInTime || record.markedAt)
    }))

    const worksheet = XLSX.utils.json_to_sheet(exportData)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Attendance')

    const dateStr = new Date().toISOString().split('T')[0]
    const safeSessionName = sessionName.replace(/[^a-z0-9]/gi, '_').toLowerCase()
    
    XLSX.writeFile(workbook, `${safeSessionName}_attendance_${dateStr}.xlsx`)
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-600 to-accent-600 p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold mb-1">Live Attendance Dashboard</h2>
              <p className="text-white/90">{sessionName}</p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={handleEndSession}
                disabled={endingSession || timeLeft === 'Session Ended'}
                className="px-4 py-2 rounded-lg border border-white/30 bg-white/15 hover:bg-white/25 transition disabled:opacity-50 disabled:cursor-not-allowed"
                title="End this session now"
              >
                {endingSession ? 'Ending...' : timeLeft === 'Session Ended' ? 'Session Ended' : 'End Session'}
              </button>

              {/* Timer Display */}
              <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-lg flex items-center space-x-2 border border-white/10">
                <Timer className="w-5 h-5 animate-pulse" />
                <span className="font-mono font-bold text-lg">{timeLeft || '--:--:--'}</span>
              </div>
              
              <div className="h-8 w-px bg-white/20 mx-2"></div>

              <button
                onClick={handleExportExcel}
                className="px-4 py-2 rounded-lg border border-white/30 bg-white/15 hover:bg-white/25 transition flex items-center space-x-2"
                title="Export Attendance to Excel"
              >
                <Download className="w-5 h-5" />
                <span className="hidden sm:inline">Export</span>
              </button>

              <button
                onClick={() => setAutoRefresh(!autoRefresh)}
                className={`p-2 rounded-lg transition ${
                  autoRefresh ? 'bg-white/20' : 'bg-white/10'
                }`}
                title={autoRefresh ? 'Auto-refresh enabled' : 'Auto-refresh disabled'}
              >
                <RefreshCw className={`w-5 h-5 ${autoRefresh ? 'animate-spin' : ''}`} />
              </button>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-lg transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="bg-white/20 p-3 rounded-lg">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-white/80 text-sm">Total Attendees</p>
                  <p className="text-3xl font-bold">{stats.total}</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="bg-green-500/30 p-3 rounded-lg">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-white/80 text-sm">On Time</p>
                  <p className="text-3xl font-bold">{stats.present}</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="bg-yellow-500/30 p-3 rounded-lg">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-white/80 text-sm">Late</p>
                  <p className="text-3xl font-bold">{stats.late}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Attendance List */}
        <div className="flex-1 overflow-y-auto p-6">
          {(actionError || actionSuccess) && (
            <div className="mb-4 space-y-2">
              {actionError && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">
                  {actionError}
                </div>
              )}
              {actionSuccess && (
                <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-2 text-sm text-green-700">
                  {actionSuccess}
                </div>
              )}
            </div>
          )}

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
          ) : attendance.length === 0 ? (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No attendance marked yet</p>
              <p className="text-gray-400 text-sm mt-2">Waiting for attendees to scan QR code...</p>
            </div>
          ) : (
            <div className="space-y-3">
              <AnimatePresence>
                {attendance.map((record, index) => (
                  <motion.div
                    key={record.$id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{record.userName || 'Unknown User'}</h3>
                        <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                          <span>{record.userEmail || 'No Email'}</span>
                          {record.studentId && (
                            <span className="text-primary-600">ID: {record.studentId}</span>
                          )}
                          {record.department && (
                            <span className="bg-gray-100 px-2 py-0.5 rounded text-xs">{record.department}</span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <label className="flex items-center space-x-2 text-sm text-gray-600">
                          <input
                            type="checkbox"
                            checked
                            onChange={(e) => handleUncheckAttendance(record, e.target.checked)}
                            disabled={removingAttendanceIds.includes(record.$id)}
                            className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 disabled:opacity-50"
                            title="Uncheck to remove this attendance"
                          />
                          <span>{removingAttendanceIds.includes(record.$id) ? 'Removing...' : 'Present'}</span>
                        </label>

                        <div className="text-right text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{formatTime(record.checkInTime || record.markedAt)}</span>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(record.status)}`}>
                          {record.status}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t bg-gray-50 p-4 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <div className={`w-2 h-2 rounded-full ${autoRefresh ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
            <span>{autoRefresh ? 'Live updates enabled' : 'Live updates paused'}</span>
          </div>
          <button
            onClick={fetchAttendance}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition flex items-center space-x-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Refresh Now</span>
          </button>
        </div>
      </motion.div>
    </div>
  )
}
