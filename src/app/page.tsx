'use client'

import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import LiquidCursor from '@/components/LiquidCursor'
import BackgroundGradient from '@/components/BackgroundGradient'
import {
  QrCode,
  Radio,
  Scan,
  Shield,
  BarChart3,
  Users,
  Zap,
  CheckCircle2,
  ArrowRight,
  Star,
  Clock,
  Globe,
  Smartphone,
  Lock,
  TrendingUp,
  Award,
  Menu,
  X,
} from 'lucide-react'
import Link from 'next/link'

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95])

  // Variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 50, damping: 20 },
    },
  }

  const floatVariants = {
    hidden: { y: 0 },
    visible: {
      y: [0, -15, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-50">
      <LiquidCursor />
      <BackgroundGradient />

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/70 backdrop-blur-xl z-50 border-b border-white/20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-br from-primary-600 to-accent-600 p-2 rounded-lg">
                <Scan className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold gradient-text">EduScan</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-700 hover:text-primary-600 transition">
                Features
              </a>
              <a href="#how-it-works" className="text-gray-700 hover:text-primary-600 transition">
                How It Works
              </a>
              <a href="#pricing" className="text-gray-700 hover:text-primary-600 transition">
                Pricing
              </a>
              <a href="#testimonials" className="text-gray-700 hover:text-primary-600 transition">
                Testimonials
              </a>
              <Link
                href="/login"
                className="text-gray-700 hover:text-primary-600 transition"
              >
                Login
              </Link>
              <Link
                href="/trial"
                className="bg-gradient-to-r from-primary-600 to-accent-600 text-white px-6 py-2 rounded-full hover:shadow-lg transition transform hover:scale-105"
              >
                Start Free Trial
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-white border-t"
          >
            <div className="px-4 py-4 space-y-4">
              <a href="#features" className="block text-gray-700 hover:text-primary-600">
                Features
              </a>
              <a href="#how-it-works" className="block text-gray-700 hover:text-primary-600">
                How It Works
              </a>
              <a href="#pricing" className="block text-gray-700 hover:text-primary-600">
                Pricing
              </a>
              <a href="#testimonials" className="block text-gray-700 hover:text-primary-600">
                Testimonials
              </a>
              <Link href="/login" className="block text-gray-700 hover:text-primary-600">
                Login
              </Link>
              <Link
                href="/trial"
                className="block bg-gradient-to-r from-primary-600 to-accent-600 text-white px-6 py-2 rounded-full text-center"
              >
                Start Free Trial
              </Link>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            style={{ opacity, scale }}
            className="text-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full mb-6"
            >
              <Award className="w-5 h-5" />
              <span className="text-sm font-semibold">24-Day Free Trial • No Credit Card Required</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight relative"
            >
              {/* Text Motion Bubbles */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  x: [0, 20, -20, 0],
                  y: [0, -30, 20, 0],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-0 right-1/4 w-32 h-32 bg-primary-200/30 rounded-full blur-2xl -z-10"
              />
              <motion.div
                animate={{
                  scale: [1, 1.3, 1],
                  x: [0, -30, 30, 0],
                  y: [0, 20, -40, 0],
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-0 left-1/4 w-40 h-40 bg-accent-200/30 rounded-full blur-3xl -z-10"
              />

              <motion.span
                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-600 to-gray-900 bg-[length:200%_auto]"
              >
                Revolutionize Attendance
              </motion.span>
              <br />
              <motion.span
                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="gradient-text bg-[length:200%_auto]"
              >
                Tracking With EduScan
              </motion.span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
               {/* Description Bubble */}
               <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-purple-100/20 rounded-full blur-xl -z-10"
              />

              <motion.p
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed"
              >
                Experience the future of attendance management with triple-technology integration:
                QR Code, RFID, and Facial Recognition. Perfect for educational institutions and enterprises.
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                href="/trial"
                className="group bg-gradient-to-r from-primary-600 to-accent-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transition transform hover:scale-105 flex items-center space-x-2"
              >
                <span>Start Your 24-Day Free Trial</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
              </Link>
              <a
                href="#demo"
                className="bg-white text-gray-700 px-8 py-4 rounded-full text-lg font-semibold border-2 border-gray-300 hover:border-primary-600 hover:text-primary-600 transition"
              >
                Watch Demo
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-12 flex items-center justify-center space-x-8 text-sm text-gray-500"
            >
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span>No Credit Card Required</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span>24-Day Full Access</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span>Cancel Anytime</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Hero Image/Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-20 relative"
          >
            <div className="bg-gradient-to-br from-primary-600 to-accent-600 rounded-2xl shadow-2xl p-2">
              <div className="bg-white rounded-xl p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { icon: QrCode, title: 'QR Code', color: 'from-blue-500 to-cyan-500' },
                    { icon: Radio, title: 'RFID', color: 'from-purple-500 to-pink-500' },
                    { icon: Scan, title: 'Face Recognition', color: 'from-orange-500 to-red-500' },
                  ].map((tech, index) => (
                    <motion.div
                      key={tech.title}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                      className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition"
                    >
                      <div className={`bg-gradient-to-br ${tech.color} p-3 rounded-lg w-fit mb-4`}>
                        <tech.icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{tech.title}</h3>
                      <p className="text-sm text-gray-600">Fast, secure, and reliable attendance tracking</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '99.9%', label: 'Accuracy Rate' },
              { number: '<2s', label: 'Check-in Time' },
              { number: '500+', label: 'Institutions' },
              { number: '100K+', label: 'Active Users' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            >
              Powerful Features That <span className="gradient-text">Stand Out</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-600 max-w-2xl mx-auto"
            >
              Everything you need to manage attendance efficiently and effectively
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: 'Triple Technology',
                description: 'Choose from QR Code, RFID, or Facial Recognition for maximum flexibility',
                color: 'from-yellow-500 to-orange-500',
              },
              {
                icon: BarChart3,
                title: 'Real-time Analytics',
                description: 'Comprehensive dashboards with insights and attendance trends',
                color: 'from-blue-500 to-cyan-500',
              },
              {
                icon: Users,
                title: 'Role-Based Access',
                description: 'Separate dashboards for Admin, Teachers, and Class Representatives',
                color: 'from-purple-500 to-pink-500',
              },
              {
                icon: Shield,
                title: 'Enterprise Security',
                description: 'Bank-level encryption and secure data handling',
                color: 'from-green-500 to-emerald-500',
              },
              {
                icon: Smartphone,
                title: 'Mobile Ready',
                description: 'Access from any device - desktop, tablet, or smartphone',
                color: 'from-indigo-500 to-blue-500',
              },
              {
                icon: Clock,
                title: 'Automated Reports',
                description: 'Generate and schedule attendance reports automatically',
                color: 'from-red-500 to-pink-500',
              },
              {
                icon: Globe,
                title: 'Multi-Institution',
                description: 'Perfect for educational and enterprise organizations',
                color: 'from-teal-500 to-cyan-500',
              },
              {
                icon: Lock,
                title: 'Admin Control',
                description: 'Complete system control with admin-only user creation',
                color: 'from-gray-700 to-gray-900',
              },
              {
                icon: TrendingUp,
                title: 'Performance Tracking',
                description: 'Track attendance patterns and identify trends',
                color: 'from-violet-500 to-purple-500',
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{ y: -10 }}
                className="bg-white/60 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-white/50 hover:shadow-xl hover:bg-white transition-all duration-300 group"
              >
                <div className={`bg-gradient-to-br ${feature.color} p-4 rounded-xl w-fit mb-6 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-white px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            >
              How <span className="gradient-text">EduScan Works</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-600"
            >
              Get started in minutes, not hours
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Start Free Trial',
                description: 'Sign up for 24 days of full access. No credit card required.',
              },
              {
                step: '02',
                title: 'Admin Setup',
                description: 'Admin creates user accounts and configures the system.',
              },
              {
                step: '03',
                title: 'Create Sessions',
                description: 'Teachers and reps create attendance sessions with preferred methods.',
              },
              {
                step: '04',
                title: 'Track & Analyze',
                description: 'Monitor attendance in real-time with powerful analytics.',
              },
            ].map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="relative group"
              >
                <div className="text-6xl font-bold text-primary-100 mb-4 group-hover:text-primary-200 transition-colors duration-300">{step.step}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
                {index < 3 && (
                  <div className="hidden md:block absolute top-8 -right-4 text-primary-300 group-hover:translate-x-2 transition-transform duration-300">
                    <ArrowRight className="w-8 h-8" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50/50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-100/30 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-purple-100/30 rounded-full blur-3xl -z-10"></div>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            >
              Simple, <span className="gradient-text">Transparent Pricing</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-600"
            >
              Start with 24 days free, then choose a plan that fits your needs
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Starter',
                price: '$49',
                period: '/month',
                description: 'Perfect for small institutions',
                features: [
                  'Up to 100 users',
                  'QR Code attendance',
                  'Basic analytics',
                  'Email support',
                  '24-day free trial',
                ],
                popular: false,
              },
              {
                name: 'Professional',
                price: '$149',
                period: '/month',
                description: 'For growing organizations',
                features: [
                  'Up to 500 users',
                  'QR Code + RFID',
                  'Advanced analytics',
                  'Priority support',
                  'Custom reports',
                  '24-day free trial',
                ],
                popular: true,
              },
              {
                name: 'Enterprise',
                price: 'Custom',
                period: '',
                description: 'For large institutions',
                features: [
                  'Unlimited users',
                  'All tracking methods',
                  'Premium analytics',
                  '24/7 support',
                  'White labeling',
                  'Dedicated account manager',
                ],
                popular: false,
              },
            ].map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className={`relative bg-white rounded-2xl shadow-xl p-8 transition-all duration-300 ${
                  plan.popular ? 'ring-4 ring-primary-500 scale-105 shadow-2xl' : 'hover:shadow-2xl'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-primary-600 to-accent-600 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-md">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  <div className="flex items-baseline justify-center">
                    <span className="text-5xl font-bold text-gray-900 tracking-tight">{plan.price}</span>
                    <span className="text-gray-600 ml-2 font-medium">{plan.period}</span>
                  </div>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start space-x-3">
                      <div className="p-0.5 bg-green-100 rounded-full mt-0.5">
                        <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/trial"
                  className={`block w-full text-center py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-primary-600 to-accent-600 text-white hover:shadow-lg'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200 hover:text-primary-600'
                  }`}
                >
                  {plan.price === 'Custom' ? 'Contact Sales' : 'Start Free Trial'}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
       <div className="absolute inset-0 bg-slate-50/50 -z-20"></div>
       <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary-100/40 rounded-full blur-3xl -z-10 animate-blob"></div>
       <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-accent-100/40 rounded-full blur-3xl -z-10 animate-blob animation-delay-2000"></div>

        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            >
              Trusted by <span className="gradient-text">Institutions Worldwide</span>
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Dr. Sarah Johnson',
                role: 'Dean, Springfield University',
                content:
                  'EduScan transformed our attendance tracking. The facial recognition is incredibly accurate and saves us hours every week.',
                rating: 5,
              },
              {
                name: 'Michael Chen',
                role: 'IT Director, TechCorp Inc.',
                content:
                  'The best attendance system we\'ve used. The admin dashboard is intuitive and the 24-day trial convinced us immediately.',
                rating: 5,
              },
              {
                name: 'Prof. Emily Rodriguez',
                role: 'Head of Department, Metro College',
                content:
                  'Multiple tracking methods give us flexibility. Students love the QR code system, and we appreciate the detailed analytics.',
                rating: 5,
              },
            ].map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                className="bg-white/70 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-white/50"
              >
                <div className="flex space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                    >
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    </motion.div>
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic leading-relaxed">&ldquo;{testimonial.content}&rdquo;</p>
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-accent-400 text-white flex items-center justify-center font-bold text-lg shadow-md">
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-r from-primary-600 to-accent-600 rounded-3xl p-12 text-center text-white shadow-2xl relative overflow-hidden"
          >
            {/* Decorative circles */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-black/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

            <h2 className="text-4xl md:text-5xl font-bold mb-6 relative z-10">
              Ready to Transform Your Attendance?
            </h2>
            <p className="text-xl mb-8 text-white/90 relative z-10">
              Start your 24-day free trial today. No credit card required.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
              <Link
                href="/trial"
                className="bg-white text-primary-600 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transition transform hover:scale-105 flex items-center space-x-2"
              >
                <span>Start Your Free Trial</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="#pricing"
                className="text-white border-2 border-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-primary-600 transition"
              >
                View Pricing
              </a>
            </div>
            <p className="mt-6 text-white/80 relative z-10 font-medium">
              Join 500+ institutions already using EduScan
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-gradient-to-br from-primary-600 to-accent-600 p-2 rounded-lg">
                  <Scan className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold">EduScan</span>
              </div>
              <p className="text-gray-400">
                Revolutionary attendance tracking for the modern age.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#features" className="hover:text-white transition">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="hover:text-white transition">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#testimonials" className="hover:text-white transition">
                    Testimonials
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Careers
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2026 EduScan. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
