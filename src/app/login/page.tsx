'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Lock, Scan, ArrowLeft, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Login failed')
      }

      // Appwrite handles sessions via cookies, no need to store token
      // Just redirect to dashboard
      router.push('/dashboard/admin')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Dark Animated Background */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-slate-900 to-black opacity-90" />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-600/20 rounded-full blur-[100px] mix-blend-screen"
        />
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            x: [0, -100, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear", delay: 5 }}
          className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px] mix-blend-screen"
        />

        {/* Neon Snake Glow Effect */}
        <motion.div
          animate={{
            x: [-100, 200, 100, -200, -100],
            y: [-100, 100, 300, 200, -100],
            rotate: [0, 90, 180, 270, 360],
            scale: [1, 1.5, 0.8, 1.2, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 w-32 h-96 bg-gradient-to-t from-cyan-400 to-blue-500 rounded-full blur-[80px] opacity-40 mix-blend-screen pointer-events-none"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full relative z-10"
      >
        {/* Glow Effect Wrapper */}
        <div className="absolute -inset-1 bg-gradient-to-r from-primary-600 to-purple-600 rounded-2xl blur opacity-75 animate-pulse transition duration-1000"></div>

        <div className="relative bg-gray-900/80 backdrop-blur-xl border border-gray-800 rounded-2xl p-8 shadow-2xl ring-1 ring-white/10">
          {/* Header */}
          <div className="text-center mb-8">
            <Link
              href="/"
              className="inline-flex items-center space-x-2 text-gray-400 hover:text-white transition mb-6"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center justify-center space-x-2 mb-6"
            >
              <div className="bg-gradient-to-br from-primary-500 to-purple-600 p-3 rounded-xl shadow-lg shadow-primary-500/20">
                <Scan className="w-8 h-8 text-white" />
              </div>
              <span className="text-3xl font-bold text-white tracking-tight">
                EduScan
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl font-bold text-white mb-2"
            >
              Welcome Back
            </motion.h1>
            <p className="text-gray-400">Sign in to your dashboard</p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center space-x-2 text-red-400"
            >
              <AlertCircle className="w-5 h-5" />
              <span>{error}</span>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary-400 transition-colors" />
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-gray-800/50 border border-gray-700 text-white rounded-lg pl-10 pr-4 py-3 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none placeholder-gray-500"
                  placeholder="name@institution.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary-400 transition-colors" />
                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-gray-800/50 border border-gray-700 text-white rounded-lg pl-10 pr-4 py-3 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none placeholder-gray-500"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center text-gray-400 cursor-pointer">
                <input type="checkbox" className="rounded bg-gray-800 border-gray-700 text-primary-500 focus:ring-primary-500 focus:ring-offset-gray-900" />
                <span className="ml-2">Remember me</span>
              </label>
              <a href="#" className="text-primary-400 hover:text-primary-300 transition">
                Forgot password?
              </a>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-primary-600 to-purple-600 text-white py-3 rounded-lg font-semibold shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Signing in...</span>
                </div>
              ) : (
                'Sign In'
              )}
            </motion.button>
          </form>

          <div className="mt-8 text-center text-sm text-gray-400">
            Don&apos;t have an account?{' '}
            <Link href="/trial" className="text-primary-400 hover:text-primary-300 font-semibold transition">
              Start free trial
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
