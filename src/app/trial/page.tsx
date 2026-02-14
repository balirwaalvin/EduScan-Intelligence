"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Building2,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  ArrowLeft,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function TrialPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    organizationName: "",
    organizationType: "EDUCATIONAL",
    email: "",
    phone: "",
    address: "",
    adminFirstName: "",
    adminLastName: "",
    adminEmail: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/trial/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Registration failed");
      }

      // Redirect to success page
      router.push(
        `/trial/success?email=${encodeURIComponent(formData.adminEmail)}`,
      );
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>

          {/* Logo with Glow Effect */}
          <motion.div
            className="flex justify-center items-center mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative">
              {/* Glow effect layers */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500 via-purple-500 to-accent-500 rounded-2xl blur-2xl opacity-30 animate-pulse"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-accent-400 rounded-2xl blur-xl opacity-20"></div>

              {/* Logo */}
              <img
                src="/eduscan-logo.png"
                alt="EduScan Logo"
                className="relative h-24 w-auto drop-shadow-2xl"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center space-x-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full mb-6"
          >
            <Sparkles className="w-5 h-5" />
            <span className="text-sm font-semibold">
              24-Day Free Trial • No Credit Card Required
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Start Your{" "}
            <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
              Free Trial
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 mb-8"
          >
            Get full access to EduScan for 24 days. No credit card required.
          </motion.p>
        </div>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              "Full access to all features",
              "No credit card required",
              "Cancel anytime",
            ].map((benefit) => (
              <div key={benefit} className="flex items-center space-x-2">
                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-700">{benefit}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Organization Details */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                <Building2 className="w-6 h-6 text-primary-600" />
                <span>Organization Details</span>
              </h2>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="organizationName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Organization Name *
                  </label>
                  <input
                    type="text"
                    id="organizationName"
                    name="organizationName"
                    required
                    value={formData.organizationName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="EduScan University"
                  />
                </div>

                <div>
                  <label
                    htmlFor="organizationType"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Organization Type *
                  </label>
                  <select
                    id="organizationType"
                    name="organizationType"
                    required
                    value={formData.organizationType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="EDUCATIONAL">Educational Institution</option>
                    <option value="ENTERPRISE">Enterprise Organization</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Organization Email *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="contact@organization.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="+256 (720) 000-000"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Address
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                    <textarea
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      rows={2}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="123 Main St, City, State, ZIP"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Admin Details */}
            <div className="pt-6 border-t">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Admin Account Details
              </h2>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="adminFirstName"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="adminFirstName"
                      name="adminFirstName"
                      required
                      value={formData.adminFirstName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Nakiiri"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="adminLastName"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="adminLastName"
                      name="adminLastName"
                      required
                      value={formData.adminLastName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Ashley"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="adminEmail"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Admin Email *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      id="adminEmail"
                      name="adminEmail"
                      required
                      value={formData.adminEmail}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="admin@organization.com"
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    You'll receive login credentials at this email address
                  </p>
                </div>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-primary-600 to-accent-600 text-white py-4 rounded-full text-lg font-semibold hover:shadow-xl transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading
                ? "Setting up your account..."
                : "Start Your 24-Day Free Trial"}
            </button>

            <p className="text-center text-sm text-gray-500">
              By signing up, you agree to our{" "}
              <Link
                href="/terms-of-service"
                className="text-primary-600 hover:underline"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy-policy"
                className="text-primary-600 hover:underline"
              >
                Privacy Policy
              </Link>
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
