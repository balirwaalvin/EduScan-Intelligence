"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TermsOfServicePage() {
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
            Terms of Service
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
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing or using the EduScan Intelligence platform
              (&quot;Service&quot;), you agree to be bound by these Terms of
              Service. If you do not agree to these terms, please do not use the
              Service. These terms apply to all users, including administrators,
              teachers, class representatives, and students.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              2. Description of Service
            </h2>
            <p>
              EduScan provides an automated attendance tracking platform that
              utilizes multiple technologies including QR codes, RFID, facial
              recognition, voice-over, and biometric verification. The Service
              includes:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Attendance session creation and management</li>
              <li>Multi-method attendance capture and verification</li>
              <li>Real-time analytics and reporting dashboards</li>
              <li>
                Role-based access control for administrators, teachers, and
                students
              </li>
              <li>Data export and institutional reporting tools</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              3. User Accounts
            </h2>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              3.1 Account Creation
            </h3>
            <p>
              User accounts are created by institutional administrators. You are
              responsible for maintaining the confidentiality of your login
              credentials and for all activities that occur under your account.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">
              3.2 Account Responsibilities
            </h3>
            <p>You agree to:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Provide accurate and complete information</li>
              <li>Keep your login credentials secure and confidential</li>
              <li>
                Notify your administrator immediately of any unauthorized access
              </li>
              <li>
                Not share your account with others or allow unauthorized access
              </li>
              <li>
                Use the Service only for its intended purpose of attendance
                tracking
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              4. Subscription Plans and Billing
            </h2>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              4.1 Free Trial
            </h3>
            <p>
              New institutions may access a 24-day free trial with full platform
              features. No credit card is required for the trial period.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">
              4.2 Paid Plans
            </h3>
            <p>
              After the trial period, institutions may choose from the following
              plans:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>
                <strong>Starter (UGX 500,000/term):</strong> QR Code and RFID
                attendance, up to 100 users
              </li>
              <li>
                <strong>Professional (UGX 1,500,000/term):</strong> All Starter
                features plus Face Recognition and Biometric attendance, up to
                500 users
              </li>
              <li>
                <strong>Enterprise (Custom pricing):</strong> All Professional
                features plus Voice Over attendance, unlimited users
              </li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">
              4.3 Payment Terms
            </h3>
            <p>
              Payment is due at the beginning of each term. Failure to make
              timely payment may result in suspension of access to the Service.
              All fees are non-refundable unless otherwise agreed in writing.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              5. Acceptable Use
            </h2>
            <p>You agree not to:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Use the Service for any unlawful purpose</li>
              <li>
                Attempt to gain unauthorized access to the system or other
                users&apos; accounts
              </li>
              <li>
                Modify, reverse engineer, or attempt to extract the source code
              </li>
              <li>Submit false attendance records or manipulate data</li>
              <li>Use automated tools or bots to interact with the Service</li>
              <li>Interfere with or disrupt the integrity of the Service</li>
              <li>
                Upload malicious content or attempt to compromise system
                security
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              6. Intellectual Property
            </h2>
            <p>
              The Service, including its design, features, code, and branding,
              is the property of EduScan Intelligence and is protected by
              intellectual property laws. You are granted a limited,
              non-exclusive, non-transferable license to use the Service for its
              intended purpose during your subscription period.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              7. Data Ownership
            </h2>
            <p>
              Attendance data entered into the platform remains the property of
              the subscribing institution. EduScan acts as a data processor on
              behalf of the institution. Institutions may request export or
              deletion of their data at any time.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              8. Service Availability
            </h2>
            <p>
              We strive to maintain 99.9% uptime for the Service. However, we do
              not guarantee uninterrupted access. Scheduled maintenance will be
              communicated in advance. We are not liable for any downtime or
              service interruptions caused by circumstances beyond our
              reasonable control.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              9. Limitation of Liability
            </h2>
            <p>
              To the maximum extent permitted by law, EduScan Intelligence shall
              not be liable for any indirect, incidental, special,
              consequential, or punitive damages arising from your use of the
              Service. Our total liability shall not exceed the fees paid by
              your institution in the 12 months preceding the claim.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              10. Termination
            </h2>
            <p>
              We may terminate or suspend access to the Service immediately,
              without prior notice, for conduct that we believe violates these
              Terms or is harmful to other users or the Service. Upon
              termination, your right to use the Service will immediately cease.
              Data export may be requested within 30 days of termination.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              11. Governing Law
            </h2>
            <p>
              These Terms shall be governed by and construed in accordance with
              the laws of the Republic of Uganda. Any disputes arising from
              these Terms shall be subject to the exclusive jurisdiction of the
              courts of Uganda.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              12. Changes to Terms
            </h2>
            <p>
              We reserve the right to modify these Terms at any time. We will
              notify institutional administrators of any material changes at
              least 30 days before they take effect. Continued use of the
              Service after changes constitutes acceptance of the updated Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              13. Contact Us
            </h2>
            <p>
              For questions about these Terms of Service, please contact us at:
            </p>
            <div className="bg-gray-50 rounded-xl p-6 mt-4 border border-gray-200">
              <p className="font-semibold text-gray-900">
                EduScan Intelligence
              </p>
              <p>Email: legal@eduscan.io</p>
              <p>Phone: +256 700 000 000</p>
              <p>Address: Kampala, Uganda</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
