"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPolicyPage() {
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Privacy Policy
          </h1>
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
              1. Introduction
            </h2>
            <p>
              EduScan Intelligence (&quot;we,&quot; &quot;our,&quot; or
              &quot;us&quot;) is committed to protecting your privacy. This
              Privacy Policy explains how we collect, use, disclose, and
              safeguard your information when you use our attendance tracking
              platform and related services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              2. Information We Collect
            </h2>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              2.1 Personal Information
            </h3>
            <p>We may collect the following personal information:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>
                Full name and contact details (email address, phone number)
              </li>
              <li>
                Institutional affiliation and role (student, teacher,
                administrator)
              </li>
              <li>Login credentials and account information</li>
              <li>
                Biometric data (facial recognition templates, fingerprint data)
                where applicable
              </li>
              <li>Attendance records and timestamps</li>
              <li>Device information and IP addresses</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">
              2.2 Automatically Collected Information
            </h3>
            <p>When you use our platform, we automatically collect:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Browser type and version</li>
              <li>Operating system</li>
              <li>Access times and dates</li>
              <li>Pages viewed and features used</li>
              <li>Referring website addresses</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              3. How We Use Your Information
            </h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>
                Provide, maintain, and improve our attendance tracking services
              </li>
              <li>Process and record attendance data accurately</li>
              <li>Authenticate users and ensure platform security</li>
              <li>Generate analytics and reports for institutions</li>
              <li>Communicate with you about service updates and support</li>
              <li>
                Comply with legal obligations and institutional requirements
              </li>
              <li>Detect, prevent, and address technical issues or fraud</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              4. Data Security
            </h2>
            <p>
              We implement industry-standard security measures to protect your
              data, including:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>End-to-end encryption for data in transit and at rest</li>
              <li>
                Secure authentication mechanisms with role-based access control
              </li>
              <li>Regular security audits and vulnerability assessments</li>
              <li>Secure cloud infrastructure with redundant backups</li>
              <li>
                Biometric data is stored as encrypted templates, not raw images
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              5. Data Sharing and Disclosure
            </h2>
            <p>
              We do not sell your personal information. We may share your data
              with:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>
                Your institution&apos;s administrators as part of attendance
                management
              </li>
              <li>
                Service providers who assist in operating our platform (under
                strict confidentiality agreements)
              </li>
              <li>
                Law enforcement when required by law or to protect rights and
                safety
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              6. Data Retention
            </h2>
            <p>
              We retain your personal data for as long as your account is active
              or as needed to provide services. Attendance records are retained
              according to your institution&apos;s policies. You may request
              deletion of your data by contacting your institution&apos;s
              administrator or our support team.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              7. Your Rights
            </h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Access and receive a copy of your personal data</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your personal data</li>
              <li>Object to processing of your data</li>
              <li>Withdraw consent for biometric data collection</li>
              <li>Lodge a complaint with a data protection authority</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              8. Children&apos;s Privacy
            </h2>
            <p>
              Our services are designed for use by educational institutions.
              Where students under 18 use the platform, we require parental or
              guardian consent as facilitated through the institution. We do not
              knowingly collect data from children without appropriate consent.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              9. Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. We will
              notify you of any changes by posting the new policy on this page
              and updating the &quot;Last updated&quot; date. Continued use of
              the platform after changes constitutes acceptance of the updated
              policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              10. Contact Us
            </h2>
            <p>
              If you have any questions about this Privacy Policy, please
              contact us at:
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
