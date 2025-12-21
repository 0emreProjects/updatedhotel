'use client'

import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { HiCalendar } from 'react-icons/hi'
import { useRouter } from 'next/navigation'

export default function BookingBar() {
  const router = useRouter()
  const [portalEl, setPortalEl] = useState<HTMLElement | null>(null)

  useEffect(() => {
    const el = document.createElement('div')
    el.className = 'booking-bar-portal'
    document.body.appendChild(el)
    setPortalEl(el)
    return () => {
      try { document.body.removeChild(el) } catch (e) {}
    }
  }, [])

  const handleBookNow = (e: React.MouseEvent) => {
    e.preventDefault()
    router.push('/contact')
    return
  }

  const content = (
    <div
      className="fixed bottom-0 left-0 right-0 pointer-events-auto bg-gradient-to-r from-blue-700 to-blue-600 shadow-xl"
      style={{ zIndex: 2147483647 }}
      role="dialog"
      aria-label="Booking bar"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
        <button
          onClick={handleBookNow}
          className="w-full flex items-center justify-center space-x-3 text-white font-semibold py-3 px-6 rounded-md md:rounded-xl transition-opacity active:opacity-90"
          aria-label="Book Now"
        >
          <HiCalendar size={18} />
          <span>Book Now</span>
        </button>
      </div>
    </div>
  )

  if (!portalEl) return null
  return createPortal(content, portalEl)
}
