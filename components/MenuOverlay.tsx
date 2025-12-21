'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { HiX, HiPhone, HiMail } from 'react-icons/hi'
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa'

interface MenuOverlayProps {
  isOpen: boolean
  onClose: () => void
}

export default function MenuOverlay({ isOpen, onClose }: MenuOverlayProps) {
  const menuItems = [
    { name: 'Explore', href: '/' },
    { name: 'Home', href: '/' },
    { name: 'Hotel Rooms', href: '/rooms' },
    { name: 'Functions & Events', href: '/events' },
    { name: 'Waves Restaurant & Bar', href: '/bar' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact Us', href: '/contact' },
  ]

  const handleGetDirections = () => {
    window.open('https://www.google.com/maps/dir/?api=1&destination=595+North+Avenue+Wakefield+MA+01880', '_blank')
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white z-50 overflow-y-auto"
          >
            <div className="p-8">
              <button
                onClick={onClose}
                className="absolute top-6 right-6 text-gray-600 hover:text-gray-900"
                aria-label="Close menu"
              >
                <HiX className="w-8 h-8" />
              </button>

              <nav className="mt-16 space-y-6">
                {menuItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={onClose}
                    className="block text-2xl font-elegant text-lakeside-blue hover:text-blue-700 transition-fast"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>

              <div className="mt-12 space-y-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-600 mb-2">Concierge</p>
                    <div className="flex items-center gap-4 text-gray-700">
                      <HiPhone className="w-5 h-5" />
                      <a href="tel:+17812456100" className="hover:text-lakeside-blue">
                        1.781.245.6100
                      </a>
                    </div>
                    <div className="flex items-center gap-4 text-gray-700 mt-2">
                      <HiMail className="w-5 h-5" />
                      <a href="mailto:frontdeskmanager@thelakesidepark.com" className="hover:text-lakeside-blue text-sm">
                        frontdeskmanager@thelakesidepark.com
                      </a>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleGetDirections}
                  className="w-full bg-lakeside-blue text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-fast font-semibold"
                >
                  Get Directions
                </button>

                <div className="flex gap-4 pt-4">
                  <a href="#" className="text-lakeside-blue hover:text-blue-700">
                    <FaFacebook className="w-6 h-6" />
                  </a>
                  <a href="#" className="text-lakeside-blue hover:text-blue-700">
                    <FaInstagram className="w-6 h-6" />
                  </a>
                  <a href="#" className="text-lakeside-blue hover:text-blue-700">
                    <FaTwitter className="w-6 h-6" />
                  </a>
                </div>

                <Link
                  href="/contact"
                  onClick={onClose}
                  className="block w-full bg-lakeside-blue text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-fast text-center font-semibold"
                >
                  Book Now
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

