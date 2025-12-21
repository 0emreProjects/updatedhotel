'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { HiStar } from 'react-icons/hi'
import Image from 'next/image'

const reviews = [
  {
    id: 1,
    name: 'Jennifer M.',
    rating: 5,
    text: 'Great location right on the lake! The staff was very friendly and helpful. The rooms were clean and comfortable. We enjoyed the restaurant and bar. Will definitely stay here again.',
    source: 'Google',
  },
  {
    id: 2,
    name: 'Michael R.',
    rating: 5,
    text: 'Perfect location for exploring the area. The lake views are beautiful, especially in the morning. The breakfast buffet was excellent. Staff went above and beyond to make our stay enjoyable.',
    source: 'Google',
  },
  {
    id: 3,
    name: 'Sarah L.',
    rating: 5,
    text: 'We had a wonderful stay! The room was spacious with a great view of the lake. The pool area is nice and the restaurant food was delicious. Very convenient location near Boston and Salem.',
    source: 'Google',
  },
  {
    id: 4,
    name: 'David K.',
    rating: 5,
    text: 'Excellent hotel with beautiful lake views. The staff was professional and accommodating. The rooms are well-maintained and the amenities are great. Highly recommend for both business and leisure.',
    source: 'Google',
  },
  {
    id: 5,
    name: 'Emily T.',
    rating: 5,
    text: 'Loved our stay! The location on Lake Quannapowitt is perfect. We enjoyed walking around the lake and the hotel facilities. The breakfast was good and the staff was very helpful with local recommendations.',
    source: 'Google',
  },
  {
    id: 6,
    name: 'Robert P.',
    rating: 5,
    text: 'Great value for the location. The hotel has character and the lake setting is beautiful. Rooms are clean and comfortable. The restaurant and bar are convenient. Would stay here again.',
    source: 'Google',
  },
]

export default function SocialProof() {
  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    if (typeof window === 'undefined') return
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <section className="py-20 relative">
      {/* Background with tint - REMOVED ON MOBILE for performance */}
      {!isMobile && (
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/85 to-white/90 z-10" />
          <Image
            src="/photos/hotel/hotel4.JPEG"
            alt="Lakeside Inn"
            fill
            className="object-cover"
            sizes="100vw"
            loading="lazy"
            quality={75}
          />
        </div>
      )}
      {isMobile && (
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-gray-50 to-white" />
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(isMobile ? reviews.slice(0, 3) : reviews).map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.15, delay: index * 0.02, ease: [0.4, 0, 0.2, 1] }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white/95 backdrop-blur-sm p-6 rounded-xl shadow-lg"
            >
              <div className="flex items-center mb-4">
                <div className="flex">
                  {[...Array(review.rating)].map((_, i) => (
                    <HiStar key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600">{review.source}</span>
              </div>
              <p className="text-gray-700 mb-4 leading-relaxed">{review.text}</p>
              <p className="font-semibold text-gray-800">— {review.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
