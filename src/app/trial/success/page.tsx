'use client'

import { Suspense } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, Mail, ArrowRight, Sparkles, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

function TrialSuccessContent() {
  const searchParams = useSearchParams()
  const email = searchParams.get('email')

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-2xl p-12 text-center"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full mb-6"
          >
            <CheckCircle2 className="w-12 h-12 text-white" />
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            Welcome to EduScan!
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-600 mb-8"
          >
            Your 24-day free trial has been activated successfully.
          </motion.p>

          {/* Email notification */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-primary-50 border border-primary-200 rounded-xl p-6 mb-8"
          >
            <Mail className="w-8 h-8 text-primary-600 mx-auto mb-3" />
            <p className="text-gray-700 mb-2">
              We've sent your login credentials to:
            </p>
            <p className="text-lg font-semibold text-primary-600">{email}</p>
            <p className="text-sm text-gray-600 mt-2">
              Please check your inbox and spam folder
            </p>
          </motion.div>

          {/* What's next */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 mb-8 text-left"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-accent-600" />
              <span>What's Next?</span>
            </h2>
            <ul className="space-y-3">
              {[
                'Check your email for login credentials',
                'Log in to your admin dashboard',
                'Set up departments and courses',
                'Create user accounts for teachers and students',
                'Start your first attendance session',
              ].map((step, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-sm font-semibold">
                    {index + 1}
                  </div>
                  <span className="text-gray-700">{step}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/login"
              className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-primary-600 to-accent-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transition transform hover:scale-105"
            >
              <span>Go to Login</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center bg-white text-gray-700 px-8 py-4 rounded-full text-lg font-semibold border-2 border-gray-300 hover:border-primary-600 hover:text-primary-600 transition"
            >
              Back to Home
            </Link>
          </motion.div>

          {/* Support */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-sm text-gray-500 mt-8"
          >
            Need help? Contact us at{' '}
            <a href="mailto:support@eduscan.com" className="text-primary-600 hover:underline">
              support@eduscan.com
            </a>
          </motion.p>
        </motion.div>
      </div>
    </div>
  )
}

export default function TrialSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-10 h-10 text-primary-600 animate-spin" />
      </div>
    }>
      <TrialSuccessContent />
    </Suspense>
  )
}
