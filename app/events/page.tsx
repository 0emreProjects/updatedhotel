'use client'

import Header from '@/components/Header'
import BookNowBar from '@/components/BookNowBar'
import Footer from '@/components/Footer'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'

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

const upcomingEvents = [
  { date: '2024-12-15', title: 'Holiday Party', time: '7:00 PM' },
  { date: '2024-12-20', title: 'Live Music Night', time: '8:00 PM' },
  { date: '2024-12-25', title: 'Christmas Celebration', time: '6:00 PM' },
  { date: '2024-12-31', title: 'New Year\'s Eve Gala', time: '9:00 PM' },
]

export default function EventsPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % eventImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + eventImages.length) % eventImages.length)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) nextImage()
    if (isRightSwipe) prevImage()
  }

  return (
    <main className="relative min-h-screen">
      <Header />
      <div className="pt-20 pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-elegant font-bold text-lakeside-blue mb-4">
              Function Events
            </h1>
            <p className="text-gray-600 text-lg">Perfect venue for your special occasions</p>
          </motion.div>

          {/* Image Slider */}
          <div className="mb-12">
            <div
              className="relative h-96 md:h-[500px] rounded-lg overflow-hidden shadow-lg"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <motion.div
                key={currentImageIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0"
              >
                <Image
                  src={eventImages[currentImageIndex]}
                  alt={`Event ${currentImageIndex + 1}`}
                  fill
                  className="object-cover"
                />
              </motion.div>

              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 rounded-full p-2 hover:bg-white transition-fast z-10"
              >
                <HiChevronLeft className="w-6 h-6 text-gray-800" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 rounded-full p-2 hover:bg-white transition-fast z-10"
              >
                <HiChevronRight className="w-6 h-6 text-gray-800" />
              </button>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {eventImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-fast ${
                      index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Upcoming Events Calendar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-lakeside-blue text-white p-8 rounded-lg"
          >
            <h2 className="text-3xl font-elegant font-bold mb-6">Upcoming Events</h2>
            <div className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-white/10 rounded-lg">
                  <div>
                    <p className="font-semibold text-lg">{event.title}</p>
                    <p className="text-white/80">{new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  </div>
                  <p className="text-white/80">{event.time}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
      <BookNowBar />
    </main>
  )
}

