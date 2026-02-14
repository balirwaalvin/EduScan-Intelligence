"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-accent-600 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Cookie Policy</h1>
          <p className="text-white/80 text-lg">
            Last updated: February 14, 2026
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-lg max-w-none text-gray-700 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              1. What Are Cookies?
            </h2>
            <p>
              Cookies are small text files that are placed on your device when
              you visit a website. They are widely used to make websites work
              more efficiently, provide a better user experience, and give
              website operators useful information about how their site is being
              used.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              2. How We Use Cookies
            </h2>
            <p>
              EduScan Intelligence uses cookies and similar technologies to
              operate and improve our attendance tracking platform. We use the
              following types of cookies:
            </p>

            <div className="mt-6 space-y-6">
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  🔒 Essential Cookies
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  <span className="font-medium">Required</span> — Cannot be
                  disabled
                </p>
                <p>
                  These cookies are necessary for the platform to function
                  properly. They enable core features such as user
                  authentication, session management, and security. Without
                  these cookies, the Service cannot be provided.
                </p>
                <ul className="list-disc pl-6 space-y-1 mt-3 text-sm">
                  <li>
                    <strong>Session cookie:</strong> Maintains your login state
                  </li>
                  <li>
                    <strong>Authentication token:</strong> Verifies your
                    identity securely
                  </li>
                  <li>
                    <strong>CSRF token:</strong> Protects against cross-site
                    request forgery
                  </li>
                  <li>
                    <strong>Role cookie:</strong> Determines your access level
                    (admin, teacher, student)
                  </li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  📊 Analytics Cookies
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  <span className="font-medium">Optional</span> — Can be
                  disabled
                </p>
                <p>
                  These cookies help us understand how users interact with our
                  platform by collecting and reporting information anonymously.
                  This helps us improve the Service.
                </p>
                <ul className="list-disc pl-6 space-y-1 mt-3 text-sm">
                  <li>
                    <strong>Usage tracking:</strong> Pages visited, features
                    used, and time spent
                  </li>
                  <li>
                    <strong>Performance monitoring:</strong> Page load times and
                    error tracking
                  </li>
                  <li>
                    <strong>Feature adoption:</strong> Which attendance methods
                    are most used
                  </li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  ⚙️ Functional Cookies
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  <span className="font-medium">Optional</span> — Can be
                  disabled
                </p>
                <p>
                  These cookies enable enhanced functionality and
                  personalization, such as remembering your preferences and
                  settings.
                </p>
                <ul className="list-disc pl-6 space-y-1 mt-3 text-sm">
                  <li>
                    <strong>Language preference:</strong> Remembers your
                    language selection
                  </li>
                  <li>
                    <strong>Theme preference:</strong> Stores light/dark mode
                    choice
                  </li>
                  <li>
                    <strong>Dashboard layout:</strong> Remembers your preferred
                    dashboard view
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              3. Third-Party Cookies
            </h2>
            <p>
              We may use third-party services that set their own cookies. These
              include:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>
                <strong>Appwrite:</strong> Backend services for authentication
                and data storage
              </li>
              <li>
                <strong>Vercel Analytics:</strong> Performance and usage
                analytics (anonymized)
              </li>
            </ul>
            <p className="mt-3">
              We do not use any advertising or marketing cookies. Your data is
              never shared with advertisers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              4. Cookie Duration
            </h2>
            <div className="overflow-x-auto mt-4">
              <table className="min-w-full border border-gray-200 rounded-xl overflow-hidden">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border-b">
                      Cookie Type
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border-b">
                      Duration
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border-b">
                      Purpose
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-3 text-sm">Session cookie</td>
                    <td className="px-6 py-3 text-sm">Browser session</td>
                    <td className="px-6 py-3 text-sm">Authentication</td>
                  </tr>
                  <tr className="bg-gray-50/50">
                    <td className="px-6 py-3 text-sm">Auth token</td>
                    <td className="px-6 py-3 text-sm">7 days</td>
                    <td className="px-6 py-3 text-sm">Persistent login</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-3 text-sm">Preferences</td>
                    <td className="px-6 py-3 text-sm">1 year</td>
                    <td className="px-6 py-3 text-sm">User settings</td>
                  </tr>
                  <tr className="bg-gray-50/50">
                    <td className="px-6 py-3 text-sm">Analytics</td>
                    <td className="px-6 py-3 text-sm">30 days</td>
                    <td className="px-6 py-3 text-sm">Usage tracking</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              5. Managing Cookies
            </h2>
            <p>You can control and manage cookies in several ways:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>
                <strong>Browser settings:</strong> Most browsers allow you to
                view, manage, and delete cookies through their settings. Note
                that disabling essential cookies will prevent you from using the
                platform.
              </li>
              <li>
                <strong>Platform settings:</strong> You can manage optional
                cookies (analytics and functional) through your account settings
                on EduScan.
              </li>
              <li>
                <strong>Opt-out tools:</strong> You can opt out of analytics
                tracking by contacting your institution&apos;s administrator.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              6. Changes to This Policy
            </h2>
            <p>
              We may update this Cookie Policy from time to time to reflect
              changes in technology, regulation, or our business practices. We
              will post the updated policy on this page with a revised
              &quot;Last updated&quot; date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              7. Contact Us
            </h2>
            <p>
              If you have any questions about our use of cookies, please contact
              us at:
            </p>
            <div className="bg-gray-50 rounded-xl p-6 mt-4 border border-gray-200">
              <p className="font-semibold text-gray-900">
                EduScan Intelligence
              </p>
              <p>Email: privacy@eduscan.io</p>
              <p>Phone: +256 700 000 000</p>
              <p>Address: Kampala, Uganda</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
