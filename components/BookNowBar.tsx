'use client'

import Link from 'next/link'

export default function BookNowBar() {
  return (
    <Link
      href="/contact"
      className="fixed bottom-0 left-0 right-0 z-40 bg-lakeside-blue text-white py-3 px-6 text-center font-semibold hover:bg-blue-700 transition-fast shadow-lg"
    >
      Book Now
    </Link>
  )
}

