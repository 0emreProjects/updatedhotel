'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'
import { FaMusic } from 'react-icons/fa'
import { HiCalendar } from 'react-icons/hi'
import { FaFacebook } from 'react-icons/fa'
import Image from 'next/image'
import preloadAndDecode from './imagePreloader'

const barImages = [
  '/photos/bar/IMG_4988.JPG',
  '/photos/bar/IMG_5334.JPG',
  '/photos/bar/IMG_5694.JPG',
]

const events = [
  {
    id: 1,
    title: 'Live Music Night',
    date: 'Every Friday',
    time: '8:00 PM',
    description: 'Enjoy live performances by local artists',
    image: '/photos/events/IMG_6482.JPG',
  },
  {
    id: 2,
    title: 'Weekend Entertainment',
    date: 'Every Saturday',
    time: '7:00 PM',
    description: 'Join us for drinks, food, and great company',
    image: '/photos/events/IMG_0199.JPEG',
  },
]

export default function BarSection() {
  const [currentEventIndex, setCurrentEventIndex] = useState(0)
  const [currentBarImageIndex, setCurrentBarImageIndex] = useState(0)
  const barTouchStartX = useRef<number | null>(null)
  const barTouchEndX = useRef<number | null>(null)
  const eventTouchStartX = useRef<number | null>(null)
  const eventTouchEndX = useRef<number | null>(null)

  const nextEvent = () => {
    setCurrentEventIndex((prev) => (prev + 1) % events.length)
  }

  const prevEvent = () => {
    setCurrentEventIndex((prev) => (prev - 1 + events.length) % events.length)
  }

  const nextBarImage = () => {
    setCurrentBarImageIndex((prev) => {
      const next = (prev + 1) % barImages.length
      try {
        preloadAndDecode(barImages[(next + 1) % barImages.length])
      } catch (e) {}
      return next
    })
  }

  const prevBarImage = () => {
    setCurrentBarImageIndex((prev) => {
      const next = (prev - 1 + barImages.length) % barImages.length
      try {
        preloadAndDecode(barImages[(next - 1 + barImages.length) % barImages.length])
      } catch (e) {}
      return next
    })
  }

  // Swipe handlers for bar images
  const handleBarTouchStart = (e: React.TouchEvent) => {
    barTouchStartX.current = e.touches[0].clientX
  }

  const handleBarTouchMove = (e: React.TouchEvent) => {
    barTouchEndX.current = e.touches[0].clientX
  }

  const handleBarTouchEnd = () => {
    if (!barTouchStartX.current || !barTouchEndX.current) return
    const distance = barTouchStartX.current - barTouchEndX.current
    if (Math.abs(distance) > 50) {
      if (distance > 0) nextBarImage()
      else prevBarImage()
    }
    barTouchStartX.current = null
    barTouchEndX.current = null
  }

  // Swipe handlers for events
  const handleEventTouchStart = (e: React.TouchEvent) => {
    eventTouchStartX.current = e.touches[0].clientX
  }

  const handleEventTouchMove = (e: React.TouchEvent) => {
    eventTouchEndX.current = e.touches[0].clientX
  }

  const handleEventTouchEnd = () => {
    if (!eventTouchStartX.current || !eventTouchEndX.current) return
    const distance = eventTouchStartX.current - eventTouchEndX.current
    if (Math.abs(distance) > 50) {
      if (distance > 0) nextEvent()
      else prevEvent()
    }
    eventTouchStartX.current = null
    eventTouchEndX.current = null
  }

  // Preload bar + event images on mount - skip on mobile for performance
  useEffect(() => {
    if (typeof window === 'undefined') return
    const isMobile = window.innerWidth < 768
    // Don't preload all images on mobile - too slow
    if (isMobile) return
    
    try {
      barImages.forEach((s) => { preloadAndDecode(s).catch(() => {}) })
      events.forEach((ev) => { preloadAndDecode(ev.image).catch(() => {}) })
    } catch (e) {}
  }, [])

  // Preload neighbors for bar images - skip on mobile
  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) return
    try {
      const nextIdx = (currentBarImageIndex + 1) % barImages.length
      const prevIdx = (currentBarImageIndex - 1 + barImages.length) % barImages.length
      preloadAndDecode(barImages[nextIdx]).catch(() => {})
      preloadAndDecode(barImages[prevIdx]).catch(() => {})
    } catch (e) {}
  }, [currentBarImageIndex])

  // Preload neighbors for events slider - skip on mobile
  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) return
    try {
      const nextIdx = (currentEventIndex + 1) % events.length
      const prevIdx = (currentEventIndex - 1 + events.length) % events.length
      preloadAndDecode(events[nextIdx].image).catch(() => {})
      preloadAndDecode(events[prevIdx].image).catch(() => {})
    } catch (e) {}
  }, [currentEventIndex])

  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    if (typeof window === 'undefined') return
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <section id="bar" className="py-20 relative">
      {/* Background with tint - REMOVED ON MOBILE for performance */}
      {!isMobile && (
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-white/85 via-white/80 to-white/85 z-10 backdrop-blur-sm" />
          <Image
            src="/photos/hotel/IMG_0562.JPEG"
            alt="Bar"
            fill
            className="object-cover object-center"
            sizes="100vw"
            loading="lazy"
            quality={90}
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
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Waves Restaurant & Bar</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-4">
            Sip, eat, and enjoy world-class entertainment at our bar
          </p>
          <a
            href="https://www.facebook.com/wavesrestaurantnbar/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            <FaFacebook size={20} />
            <span>Follow us on Facebook</span>
          </a>
        </motion.div>

        {/* Bar Gallery */}
        <div className="mb-16">
          <div
            className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-2xl bg-white"
            onTouchStart={handleBarTouchStart}
            onTouchMove={handleBarTouchMove}
            onTouchEnd={handleBarTouchEnd}
          >
            <Image
              src={barImages[currentBarImageIndex]}
              alt="Bar interior"
              fill
              className="object-cover transition-opacity duration-120"
              sizes="100vw"
              loading="lazy"
              decoding="async"
            />
            {barImages.length > 1 && (
              <>
                <button
                  onClick={prevBarImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/10 hover:bg-black/20 text-black p-3 rounded-full transition-colors shadow-sm"
                  aria-label="Previous image"
                >
                  <HiChevronLeft size={24} className="text-black" />
                </button>
                <button
                  onClick={nextBarImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/10 hover:bg-black/20 text-black p-3 rounded-full transition-colors shadow-sm"
                  aria-label="Next image"
                >
                  <HiChevronRight size={24} className="text-black" />
                </button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                  {barImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentBarImageIndex(index)}
                      className={`h-2 rounded-full transition-all ${
                          index === currentBarImageIndex ? 'bg-black w-8' : 'bg-black/40 w-2'
                        }`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Event Slider */}
        <div className="relative mb-16">
          <div
            className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-2xl"
            onTouchStart={handleEventTouchStart}
            onTouchMove={handleEventTouchMove}
            onTouchEnd={handleEventTouchEnd}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentEventIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.12, ease: [0.4, 0, 0.2, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={events[currentEventIndex].image}
                  alt={events[currentEventIndex].title}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white px-4 max-w-3xl">
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      className="flex items-center justify-center mb-4"
                    >
                      <FaMusic size={32} className="mr-2" />
                      <span className="text-lg font-semibold">Upcoming Event</span>
                    </motion.div>
                    <h3 className="text-4xl md:text-6xl font-bold mb-4">
                      {events[currentEventIndex].title}
                    </h3>
                    <div className="flex items-center justify-center space-x-4 mb-4">
                      <div className="flex items-center">
                        <HiCalendar size={20} className="mr-2" />
                        <span>{events[currentEventIndex].date}</span>
                      </div>
                      <span>•</span>
                      <span>{events[currentEventIndex].time}</span>
                    </div>
                    <p className="text-xl text-white/90">{events[currentEventIndex].description}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <button
              onClick={prevEvent}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/10 hover:bg-black/20 text-black p-3 rounded-full transition-colors shadow-sm"
              aria-label="Previous event"
            >
              <HiChevronLeft size={24} className="text-black" />
            </button>
            <button
              onClick={nextEvent}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/10 hover:bg-black/20 text-black p-3 rounded-full transition-colors shadow-sm"
              aria-label="Next event"
            >
              <HiChevronRight size={24} className="text-black" />
            </button>

            {/* Dots Indicator */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
              {events.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentEventIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentEventIndex ? 'bg-white w-8' : 'bg-white/50'
                  }`}
                  aria-label={`Go to event ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Calendar View */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
          className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-8"
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <HiCalendar className="mr-2 text-blue-600" size={28} />
            Upcoming Events Calendar
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {events.map((event) => (
              <div
                key={event.id}
                className="border-l-4 border-blue-600 pl-4 py-2 hover:bg-blue-50 transition-colors rounded"
              >
                <div className="font-bold text-gray-800">{event.title}</div>
                <div className="text-sm text-gray-600">
                  {event.date} • {event.time}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
