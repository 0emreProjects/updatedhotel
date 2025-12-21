'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { HiWifi, HiClock } from 'react-icons/hi'
import { FaSwimmingPool, FaUtensils, FaGlassCheers, FaDumbbell, FaParking, FaSun, FaBuilding, FaMapMarkerAlt } from 'react-icons/fa'
import Image from 'next/image'

const amenities = [
  { icon: HiWifi, title: 'Free Internet', description: 'High-speed Wi-Fi throughout' },
  { icon: FaSwimmingPool, title: 'Outdoor Pool', description: 'Swimming pool with lake views' },
  { icon: FaUtensils, title: 'Restaurant', description: 'Fine dining on-site' },
  { icon: FaGlassCheers, title: 'Bar', description: 'Full-service bar and lounge' },
  { icon: FaDumbbell, title: 'Fitness Center', description: '24/7 gym access' },
  { icon: FaParking, title: 'Free Self Parking', description: 'On-site parking available' },
  { icon: FaSun, title: 'Breakfast Buffet', description: 'Included with your stay' },
  { icon: FaBuilding, title: 'Terrace', description: 'Outdoor seating area' },
  { icon: FaMapMarkerAlt, title: 'Lakeside', description: 'Beautiful lake views' },
  { icon: HiClock, title: '24/7 Front Desk', description: 'Round-the-clock service' },
]

export default function Amenities() {
  const [useMotion, setUseMotion] = useState(true)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const mq = window.matchMedia('(max-width: 768px)')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setUseMotion(!(mq.matches || reduce))
    const onChange = () => setUseMotion(!(mq.matches || reduce))
    try {
      mq.addEventListener('change', onChange)
    } catch (e) {
      mq.addListener(onChange as any)
    }
    return () => {
      try { mq.removeEventListener('change', onChange) } catch (e) { mq.removeListener(onChange as any) }
    }
  }, [])

  return (
    <section className="py-20 relative">
      {/* Background with tint */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/95 via-white/90 to-gray-50/95 z-10" />
        <Image
          src="/photos/hotel/IMG_2819.JPG"
          alt="Outdoor Pool"
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {useMotion ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Your Amenities</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need for a comfortable and enjoyable stay
            </p>
          </motion.div>
        ) : (
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Your Amenities</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need for a comfortable and enjoyable stay
            </p>
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {amenities.map((amenity, index) => {
            const Icon = amenity.icon
            return useMotion ? (
              <motion.div
                key={amenity.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.15, delay: index * 0.01, ease: [0.4, 0, 0.2, 1] }}
                whileHover={{ scale: 1.08, y: -5 }}
                className="bg-white/95 backdrop-blur-sm p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow text-center"
              >
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-blue-100 rounded-full">
                    <Icon size={32} className="text-blue-600" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{amenity.title}</h3>
                <p className="text-sm text-gray-600">{amenity.description}</p>
              </motion.div>
            ) : (
              <div
                key={amenity.title}
                className="bg-white/95 backdrop-blur-sm p-6 rounded-xl shadow-md text-center"
              >
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-blue-100 rounded-full">
                    <Icon size={32} className="text-blue-600" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{amenity.title}</h3>
                <p className="text-sm text-gray-600">{amenity.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
