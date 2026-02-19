'use client'

import { useEffect, useRef, useState } from 'react'
import QRCodeLib from 'qrcode'
import { Download, Maximize2 } from 'lucide-react'

interface QRCodeProps {
  sessionId: string
  organizationId: string
  sessionName: string
  size?: number
}

export default function QRCodeGenerator({ sessionId, organizationId, sessionName, size = 256 }: QRCodeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    generateQRCode()
  }, [sessionId, organizationId])

  const generateQRCode = async () => {
    if (!canvasRef.current) return

    const attendanceUrl = `${window.location.origin}/attendance?sessionId=${sessionId}&organizationId=${organizationId}`

    try {
      await QRCodeLib.toCanvas(canvasRef.current, attendanceUrl, {
        width: size,
        margin: 2,
        color: {
          dark: '#0284c7',
          light: '#ffffff',
        },
      })
    } catch (error) {
      console.error('Error generating QR code:', error)
    }
  }

  const downloadQRCode = () => {
    if (!canvasRef.current) return

    const url = canvasRef.current.toDataURL('image/png')
    const link = document.createElement('a')
    link.download = `${sessionName.replace(/\s+/g, '_')}_QR.png`
    link.href = url
    link.click()
  }

  return (
    <>
      <div className="relative group">
        <canvas ref={canvasRef} className="rounded-lg border-2 border-gray-200" />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center space-x-2">
          <button
            onClick={downloadQRCode}
            className="p-3 bg-white rounded-full hover:bg-gray-100 transition"
            title="Download QR Code"
          >
            <Download className="w-5 h-5 text-gray-700" />
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="p-3 bg-white rounded-full hover:bg-gray-100 transition"
            title="View Fullscreen"
          >
            <Maximize2 className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </div>

      {/* Fullscreen Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setShowModal(false)}
        >
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full" onClick={(e) => e.stopPropagation()}>
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{sessionName}</h2>
              <p className="text-gray-600">Scan this QR code to mark attendance</p>
            </div>

            <div className="flex justify-center mb-6">
              <canvas
                ref={(canvas) => {
                  if (canvas) {
                    const attendanceUrl = `${window.location.origin}/attendance?sessionId=${sessionId}&organizationId=${organizationId}`
                    QRCodeLib.toCanvas(canvas, attendanceUrl, {
                      width: 512,
                      margin: 2,
                      color: {
                        dark: '#0284c7',
                        light: '#ffffff',
                      },
                    })
                  }
                }}
                className="rounded-lg shadow-lg"
              />
            </div>

            <div className="flex space-x-3">
              <button
                onClick={downloadQRCode}
                className="flex-1 bg-gradient-to-r from-primary-600 to-accent-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition flex items-center justify-center space-x-2"
              >
                <Download className="w-5 h-5" />
                <span>Download</span>
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
