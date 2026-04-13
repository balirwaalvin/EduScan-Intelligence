"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import LiquidCursor from "@/components/LiquidCursor";
import BackgroundGradient from "@/components/BackgroundGradient";
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
  Menu,
  X,
  Mic,
  Fingerprint,
} from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-50 via-sky-50 to-primary-50">
      <LiquidCursor />
      <BackgroundGradient />

      {/* Enhanced Animated Bubbles Background */}
      {/* Large animated bubbles */}
      <motion.div
        className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full opacity-30 blur-3xl"
        animate={{
          y: [0, -40, 0],
          x: [0, 30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-40 right-20 w-40 h-40 bg-gradient-to-br from-primary-400 to-accent-400 rounded-full opacity-25 blur-3xl"
        animate={{
          y: [0, 50, 0],
          x: [0, -40, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
      <motion.div
        className="absolute bottom-20 left-1/4 w-36 h-36 bg-gradient-to-br from-sky-400 to-blue-500 rounded-full opacity-30 blur-3xl"
        animate={{
          y: [0, -30, 0],
          x: [0, 40, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />
      <motion.div
        className="absolute top-1/3 left-1/2 w-28 h-28 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-full opacity-20 blur-3xl"
        animate={{
          y: [0, 35, 0],
          x: [0, -25, 0],
          scale: [1, 1.25, 1],
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
      {/* Small floating bubbles */}
      <motion.div
        className="absolute top-1/4 right-1/3 w-20 h-20 bg-gradient-to-br from-primary-300 to-accent-300 rounded-full opacity-40 blur-2xl"
        animate={{
          y: [0, -60, 0],
          x: [0, 20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5,
        }}
      />
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-gradient-to-br from-blue-300 to-sky-400 rounded-full opacity-35 blur-2xl"
        animate={{
          y: [0, 45, 0],
          x: [0, -35, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.8,
        }}
      />
      <motion.div
        className="absolute top-2/3 left-20 w-16 h-16 bg-gradient-to-br from-cyan-300 to-blue-300 rounded-full opacity-45 blur-xl"
        animate={{
          y: [0, -25, 0],
          x: [0, 30, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 6.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2.5,
        }}
      />
      <motion.div
        className="absolute bottom-1/4 left-1/3 w-32 h-32 bg-gradient-to-br from-accent-300 to-primary-400 rounded-full opacity-25 blur-3xl"
        animate={{
          y: [0, 40, 0],
          x: [0, -30, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 10.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.2,
        }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/70 backdrop-blur-xl z-50 border-b border-white/20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <img
                src="/eduscan-logo.png"
                alt="EduScan Logo"
                className="h-10 w-auto"
              />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className="text-gray-700 hover:text-primary-600 transition"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="text-gray-700 hover:text-primary-600 transition"
              >
                How It Works
              </a>
              <a
                href="#pricing"
                className="text-gray-700 hover:text-primary-600 transition"
              >
                Pricing
              </a>
              <a
                href="#testimonials"
                className="text-gray-700 hover:text-primary-600 transition"
              >
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
                className="bg-primary-50 text-primary-600 border border-primary-100 px-6 py-2 rounded-full hover:shadow-lg transition transform hover:scale-105"
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
              <a
                href="#features"
                className="block text-gray-700 hover:text-primary-600"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="block text-gray-700 hover:text-primary-600"
              >
                How It Works
              </a>
              <a
                href="#pricing"
                className="block text-gray-700 hover:text-primary-600"
              >
                Pricing
              </a>
              <a
                href="#testimonials"
                className="block text-gray-700 hover:text-primary-600"
              >
                Testimonials
              </a>
              <Link
                href="/login"
                className="block text-gray-700 hover:text-primary-600"
              >
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
      <section className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden flex flex-col justify-center min-h-[90vh]">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            {/* Left Content Column */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="relative z-10"
            >
              {/* Badge */}
              <div className="inline-flex items-center space-x-2 bg-white/50 backdrop-blur-md px-4 py-2 rounded-full border border-primary-200 shadow-sm mb-6">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
                </span>
                <span className="text-sm font-medium text-primary-800">EduScan Intelligence 2.0 is Live</span>
              </div>
              
              {/* Headline */}
              <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-gray-900 mb-6 leading-[1.1]">
                <span className="block mb-2">The Future of</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 via-sky-600 to-accent-600">
                  Smart Attendance.
                </span>
              </h1>

              {/* Subheadline */}
              <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed max-w-lg">
                Empowering institutions with <strong className="text-gray-900">AI-driven facial recognition</strong>, dynamic QR codes, RFID, and biometric tracking. Fast, secure, and effortlessly accurate.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <Link href="/trial" className="group inline-flex justify-center items-center px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-primary-600 to-accent-600 rounded-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  Start Your Free Trial <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <a href="#how-it-works" className="inline-flex justify-center items-center px-8 py-4 text-base font-semibold text-gray-700 bg-white border-2 border-gray-200 rounded-full hover:border-primary-600 hover:text-primary-600 transition-all duration-300">
                  <Scan className="ml-2 w-5 h-5 mr-2" /> See How It Works
                </a>
              </div>

              {/* Mini Social Proof */}
              <div className="flex items-center gap-4 text-sm text-gray-600 font-medium">
                <div className="flex -space-x-3">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gradient-to-br from-sky-100 to-primary-100 flex items-center justify-center overflow-hidden">
                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 'edu'}`} alt="avatar" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1 text-yellow-500 mb-1">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                  </div>
                  Trusted by 10,000+ Educators
                </div>
              </div>
            </motion.div>

            {/* Right Visual Column */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, rotateY: 10 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 1, type: "spring", delay: 0.2 }}
              className="relative lg:h-[600px] flex items-center justify-center perspective-[1000px] mt-10 lg:mt-0"
            >
              {/* Decorative backgrounds */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary-400/20 to-accent-400/20 rounded-[3rem] blur-3xl transform rotate-3" />
              <div className="absolute inset-0 bg-gradient-to-bl from-blue-300/20 to-primary-300/20 rounded-[3rem] blur-2xl transform -rotate-6" />
              
              {/* Main Scanner Card */}
              <div className="relative w-full max-w-md bg-white/70 backdrop-blur-xl border border-white/50 p-6 rounded-3xl shadow-2xl transform-gpu transition-transform duration-700 z-10 xl:rotate-y-[-10deg] xl:rotate-x-[5deg] xl:hover:rotate-0">
                {/* App Header overlay */}
                <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
                   <div className="flex items-center gap-2">
                     <Shield className="w-5 h-5 text-primary-500" />
                     <span className="font-semibold text-gray-800">Live Verification</span>
                   </div>
                   <div className="flex items-center gap-2">
                     <span className="text-xs text-gray-500 font-medium">System Active</span>
                     <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                   </div>
                </div>

                {/* Profile Scanner Graphic */}
                <div className="relative bg-gray-50 rounded-2xl p-8 flex flex-col items-center justify-center overflow-hidden border border-gray-100 shadow-inner group">
                  {/* Scanning Laser Line */}
                  <motion.div 
                    animate={{ top: ["0%", "100%", "0%"] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                    className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary-500 to-transparent z-20 shadow-[0_0_15px_rgba(59,130,246,0.6)]"
                  />
                  
                  {/* Grid background for technical feel */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:20px_20px]" />
                  
                  {/* Profile Placeholder */}
                  <div className="w-32 h-32 rounded-full bg-white mb-4 relative z-10 overflow-hidden border-4 border-white shadow-lg">
                     <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=student1" alt="student" className="w-full h-full object-cover opacity-90" />
                  </div>
                  
                  {/* Mock Loading Bars */}
                  <div className="h-4 w-32 bg-gray-200 rounded-full mb-3 relative z-10 overflow-hidden">
                    <motion.div 
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent" 
                    />
                  </div>
                  <div className="h-3 w-20 bg-primary-100 rounded-full relative z-10" />
                </div>

                {/* Status Items below */}
                <div className="mt-6 flex justify-between gap-3">
                  <div className="flex bg-green-50 text-green-700 rounded-xl p-3 flex-1 items-center justify-center gap-2 font-medium text-sm border border-green-100">
                    <CheckCircle2 className="w-4 h-4" /> Match Found
                  </div>
                  <div className="flex bg-blue-50 text-blue-700 rounded-xl p-3 flex-1 items-center justify-center gap-2 font-medium text-sm border border-blue-100">
                    <Clock className="w-4 h-4" /> 0.2s Verify
                  </div>
                </div>
              </div>

              {/* Floating Badge: Biometric */}
              <motion.div 
                 animate={{ y: [0, -15, 0] }}
                 transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                 className="absolute -right-4 md:-right-8 top-1/4 bg-white/90 p-4 rounded-2xl shadow-xl border border-white/50 flex items-center gap-3 backdrop-blur-md z-20"
              >
                  <div className="bg-primary-50 text-primary-600 border border-primary-100 p-2.5 rounded-xl  shadow-inner">
                    <Fingerprint className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Biometrics</p>
                    <p className="text-sm font-bold text-gray-900">Supported</p>
                  </div>
              </motion.div>

              {/* Floating Badge: RFID */}
              <motion.div 
                 animate={{ y: [0, 20, 0] }}
                 transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                 className="absolute -left-4 md:-left-8 bottom-1/4 bg-white/90 p-4 rounded-2xl shadow-xl border border-white/50 flex items-center gap-3 backdrop-blur-md z-20"
              >
                  <div className="bg-blue-50 text-blue-600 border border-blue-100 p-2.5 rounded-xl  shadow-inner">
                    <Radio className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">RFID Scan</p>
                    <p className="text-sm font-bold text-gray-900">Active</p>
                  </div>
              </motion.div>

              {/* Floating Badge: AI Engine */}
              <motion.div 
                 animate={{ y: [0, -10, 0], x: [0, 10, 0] }}
                 transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                 className="absolute -bottom-8 right-10 bg-white/90 p-4 rounded-2xl shadow-xl border border-white/50 flex items-center gap-3 backdrop-blur-md z-20 hidden md:flex"
              >
                  <div className="bg-orange-50 text-orange-600 border border-orange-100 p-2.5 rounded-xl  shadow-inner">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">AI Engine</p>
                    <p className="text-sm font-bold text-green-600">99.9% Accuracy</p>
                  </div>
              </motion.div>

            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "99.9%", label: "Accuracy Rate" },
              { number: "<2s", label: "Check-in Time" },
              { number: "500+", label: "Institutions" },
              { number: "100K+", label: "Active Users" },
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
              Powerful Features That{" "}
              <span className="gradient-text">Stand Out</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-600 max-w-2xl mx-auto"
            >
              Everything you need to manage attendance efficiently and
              effectively
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: "Triple Technology",
                description:
                  "Choose from QR Code, RFID, or Facial Recognition for maximum flexibility",
                color: "from-yellow-500 to-orange-500",
              },
              {
                icon: BarChart3,
                title: "Real-time Analytics",
                description:
                  "Comprehensive dashboards with insights and attendance trends",
                color: "from-blue-500 to-cyan-500",
              },
              {
                icon: Users,
                title: "Role-Based Access",
                description:
                  "Separate dashboards for Admin, Teachers, and Class Representatives",
                color: "from-primary-500 to-accent-500",
              },
              {
                icon: Shield,
                title: "Enterprise Security",
                description: "Bank-level encryption and secure data handling",
                color: "from-green-500 to-emerald-500",
              },
              {
                icon: Smartphone,
                title: "Mobile Ready",
                description:
                  "Access from any device - desktop, tablet, or smartphone",
                color: "from-sky-500 to-blue-500",
              },
              {
                icon: Clock,
                title: "Automated Reports",
                description:
                  "Generate and schedule attendance reports automatically",
                color: "from-red-500 to-accent-500",
              },
              {
                icon: Globe,
                title: "Multi-Institution",
                description:
                  "Perfect for educational and enterprise organizations",
                color: "from-teal-500 to-cyan-500",
              },
              {
                icon: Lock,
                title: "Admin Control",
                description:
                  "Complete system control with admin-only user creation",
                color: "from-gray-700 to-gray-900",
              },
              {
                icon: TrendingUp,
                title: "Performance Tracking",
                description: "Track attendance patterns and identify trends",
                color: "from-accent-600 to-primary-500",
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
                <div
                  className={`bg-gradient-to-br ${feature.color} p-4 rounded-xl w-fit mb-6 shadow-md group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        id="how-it-works"
        className="py-20 bg-white px-4 sm:px-6 lg:px-8 relative z-10"
      >
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
                step: "01",
                title: "Start Free Trial",
                description:
                  "Sign up for 24 days of full access. No credit card required.",
              },
              {
                step: "02",
                title: "Admin Setup",
                description:
                  "Admin creates user accounts and configures the system.",
              },
              {
                step: "03",
                title: "Create Sessions",
                description:
                  "Teachers and reps create attendance sessions with preferred methods.",
              },
              {
                step: "04",
                title: "Track & Analyze",
                description:
                  "Monitor attendance in real-time with powerful analytics.",
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
                <div className="text-6xl font-bold text-primary-100 mb-4 group-hover:text-primary-200 transition-colors duration-300">
                  {step.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {step.title}
                </h3>
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
      <section
        id="pricing"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50/50 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-100/30 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-primary-100/30 rounded-full blur-3xl -z-10"></div>
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
                name: "Genesis",
                price: "UGX 500,000",
                period: "/term",
                description: "Perfect for small institutions",
                features: [
                  "Up to 100 users",
                  "QR Code attendance",
                  "RFID attendance",
                  "Basic analytics",
                  "Email support",
                  "24-day free trial",
                ],
                popular: false,
              },
              {
                name: "Genesis+",
                price: "UGX 1,500,000",
                period: "/term",
                description: "For growing organizations",
                features: [
                  "Everything in Genesis, plus:",
                  "Up to 500 users",
                  "Face Recognition",
                  "Biometric attendance",
                  "Advanced analytics",
                  "Priority support",
                  "Custom reports",
                ],
                popular: true,
              },
              {
                name: "Genesis Pro+",
                price: "Custom",
                period: "",
                description: "For large institutions",
                features: [
                  "Everything in Genesis+, plus:",
                  "Unlimited users",
                  "Voice Over attendance",
                  "Premium analytics",
                  "24/7 support",
                  "White labeling",
                  "Dedicated account manager",
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
                  plan.popular
                    ? "ring-4 ring-primary-500 scale-105 shadow-2xl"
                    : "hover:shadow-2xl"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary-50 text-primary-600 border border-primary-100 px-4 py-1 rounded-full text-sm font-semibold shadow-md">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  <div className="flex items-baseline justify-center">
                    <span className="text-5xl font-bold text-gray-900 tracking-tight">
                      {plan.price}
                    </span>
                    <span className="text-gray-600 ml-2 font-medium">
                      {plan.period}
                    </span>
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
                      ? "bg-gradient-to-r from-primary-600 to-accent-600 text-white hover:shadow-lg"
                      : "bg-gray-100 text-gray-900 hover:bg-gray-200 hover:text-primary-600"
                  }`}
                >
                  {plan.price === "Custom"
                    ? "Contact Sales"
                    : "Start Free Trial"}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        id="testimonials"
        className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      >
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
              Trusted by{" "}
              <span className="gradient-text">Institutions Countrywide</span>
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Mr. Balirwa Moses",
                role: "Assistant Dean FST, Cavendish University Uganda",
                content:
                  "EduScan transformed our attendance tracking. The facial recognition is incredibly accurate and saves us hours every week.",
                rating: 5,
              },
              {
                name: "Md. Barbara Ofwono",
                role: "Principal, Victorious Education Services",
                content:
                  "The best attendance system we've used. The admin dashboard is intuitive and the 24-day trial convinced us immediately.",
                rating: 5,
              },
              {
                name: "Miiro Joseph Luutu",
                role: "Lecturer, Uganda Christian University",
                content:
                  "Multiple tracking methods give us flexibility. Students love the QR code system, and we appreciate the detailed analytics.",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{
                  y: -5,
                  boxShadow:
                    "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                }}
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
                <p className="text-gray-700 mb-6 italic leading-relaxed">
                  &ldquo;{testimonial.content}&rdquo;
                </p>
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-accent-400 text-white flex items-center justify-center font-bold text-lg shadow-md">
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {testimonial.role}
                    </div>
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
            className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white border border-primary-500/40 rounded-3xl p-12 text-center shadow-2xl relative overflow-hidden"
          >
            {/* Decorative circles */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-white/15 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-black/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

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
                <img
                  src="/eduscan-logo.png"
                  alt="EduScan Logo"
                  className="h-10 w-auto"
                />
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
                  <a
                    href="#testimonials"
                    className="hover:text-white transition"
                  >
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
                  <Link
                    href="/privacy-policy"
                    className="hover:text-white transition"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms-of-service"
                    className="hover:text-white transition"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="/cookie-policy"
                    className="hover:text-white transition"
                  >
                    Cookie Policy
                  </Link>
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
  );
}
