import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'EduScan - Advanced Attendance Tracking System',
  description: 'Revolutionary attendance management using QR Code, RFID, and Facial Recognition technology for educational and enterprise institutions.',
  keywords: 'attendance, tracking, QR code, RFID, facial recognition, education, enterprise',
  icons: {
    icon: '/eduscan-logo.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
