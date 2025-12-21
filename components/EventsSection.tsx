'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'
import { HiCalendar, HiUsers } from 'react-icons/hi'
import { FaUtensils } from 'react-icons/fa'
import Image from 'next/image'
import CrossfadeImage from './CrossfadeImage'
import preloadAndDecode from './imagePreloader'
import Link from 'next/link'

const eventImages = [
  '/photos/events/004.jpg',
  '/photos/events/008.jpg',
  '/photos/events/012.jpg',
  '/photos/events/016.jpg',
  '/photos/events/056.jpg',
  '/photos/events/072.jpg',
  '/photos/events/IMG_0199.JPEG',
  '/photos/events/IMG_0209.JPEG',
  '/photos/events/IMG_3628.JPG',
  '/photos/events/IMG_3630.JPG',
  '/photos/events/IMG_3631.JPG',
  '/photos/events/IMG_3680.JPG',
  '/photos/events/IMG_4145.JPG',
  '/photos/events/IMG_5094.JPG',
  '/photos/events/IMG_6626.JPG',
  '/photos/events/IMG_6823.JPG',
  '/photos/events/IMG_7917.JPG',
]

const eventTypes = [
  {
    id: 1,
    title: 'Corporate Events',
    description: 'Professional spaces for meetings, conferences, and corporate gatherings',
    icon: HiUsers,
    image: '/photos/events/IMG_0199.JPEG',
  },
  {
    id: 2,
    title: 'Social Events',
    description: 'Celebrate special occasions in our elegant event spaces',
    icon: FaUtensils,
    image: '/photos/events/IMG_0209.JPEG',
  },
  {
    id: 3,
    title: 'Weddings',
    description: 'Make your special day unforgettable with our wedding packages',
    icon: HiCalendar,
    image: '/photos/events/IMG_3628.JPG',
  },
]

export default function EventsSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)

  const nextImage = () => {
    setCurrentImageIndex((prev) => {
      const next = (prev + 1) % eventImages.length
      try {
        preloadAndDecode(eventImages[(next + 1) % eventImages.length]).catch(() => {})
      } catch (e) {}
      return next
    })
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => {
      const next = (prev - 1 + eventImages.length) % eventImages.length
      try {
        preloadAndDecode(eventImages[(next - 1 + eventImages.length) % eventImages.length]).catch(() => {})
      } catch (e) {}
      return next
    })
  }

  // Swipe handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    try {
      const nextIdx = (currentImageIndex + 1) % eventImages.length
      const prevIdx = (currentImageIndex - 1 + eventImages.length) % eventImages.length
      preloadAndDecode(eventImages[nextIdx]).catch(() => {})
      preloadAndDecode(eventImages[prevIdx]).catch(() => {})
    } catch (e) {}
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    if (touchStartX.current == null || touchEndX.current == null) {
      touchStartX.current = null
      touchEndX.current = null
      return
    }
    const distance = touchStartX.current - touchEndX.current
    if (Math.abs(distance) > 50) {
      if (distance > 0) nextImage()
      else prevImage()
    }
    touchStartX.current = null
    touchEndX.current = null
  }

  // Preload event images on mount - skip on mobile for performance
  useEffect(() => {
    if (typeof window === 'undefined') return
    const isMobile = window.innerWidth < 768
    // Don't preload all images on mobile - too slow
    if (isMobile) return
    
    try {
      eventImages.forEach((src) => preloadAndDecode(src).catch(() => {}))
      eventTypes.forEach((t) => preloadAndDecode(t.image).catch(() => {}))
    } catch (e) {}
  }, [])

  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    if (typeof window === 'undefined') return
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <section id="events" className="py-20 relative">
      {/* Background with tint - REMOVED ON MOBILE for performance */}
      {!isMobile && (
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-white/85 via-white/80 to-white/85 z-10 backdrop-blur-sm" />
          <Image
            src="/photos/hotel/hotel3.JPG"
            alt="Events"
            fill
            className="object-cover object-center"
            sizes="100vw"
            loading="lazy"
            quality={92}
          />
        </div>
      )}
      {isMobile && (
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-gray-50 to-white" />
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Events & Functions</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Celebrate and make memories in our versatile event spaces
          </p>
        </motion.div>

        {/* Event Gallery */}
        <div className="mb-16">
          <div
            className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-2xl bg-white"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="absolute inset-0 w-full h-full">
              <CrossfadeImage
                src={eventImages[currentImageIndex]}
                alt="Event"
                className="w-full h-full"
                transitionDuration={typeof window !== 'undefined' && window.innerWidth < 768 ? 50 : 150}
                loading={typeof window !== 'undefined' && window.innerWidth < 768 ? 'lazy' : 'eager'}
                decoding="async"
              />
            </div>
            {eventImages.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/10 hover:bg-black/20 text-black p-3 rounded-full transition-colors shadow-sm"
                  aria-label="Previous image"
                >
                  <HiChevronLeft size={24} className="text-black" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/10 hover:bg-black/20 text-black p-3 rounded-full transition-colors shadow-sm"
                  aria-label="Next image"
                >
                  <HiChevronRight size={24} className="text-black" />
                </button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 max-w-full overflow-x-auto px-4">
                  {eventImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`h-2 rounded-full transition-all flex-shrink-0 ${
                        index === currentImageIndex ? 'bg-black w-8' : 'bg-black/40 w-2'
                      }`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {eventTypes.map((event, index) => {
            const Icon = event.icon
            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.2, delay: index * 0.03, ease: [0.4, 0, 0.2, 1] }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow"
              >
                <div className="relative h-64 w-full">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-blue-100 rounded-full mr-4">
                      <Icon size={24} className="text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">{event.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-4">{event.description}</p>
                  <Link href={`/contact?topic=${encodeURIComponent(event.title)}`} className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">
                    Learn More →
                  </Link>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
