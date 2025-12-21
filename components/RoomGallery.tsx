'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import CrossfadeImage from './CrossfadeImage'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'
import { HiHome, HiUsers } from 'react-icons/hi'
import RoomModal from './RoomModal'
import preloadAndDecode from './imagePreloader'

interface Room {
  id: number
  title: string
  subtitle: string
  description: string
  size: string
  sleeps: number
  bedType: string
  highlights: string[]
  images: string[]
  isLakeside: boolean
}

const rooms: Room[] = [
  {
    id: 1,
    title: 'Full Lakeside',
    subtitle: 'Full Lakeside',
    description: 'Individually furnished room with stunning lake views',
    size: '200 sq ft',
    sleeps: 3,
    bedType: '1 Double Bed',
    highlights: [
      'Individually furnished',
      'Air conditioning',
      'Connecting rooms available',
      'Free cribs/infant beds',
      'TV',
      'Fan',
      'Blackout drapes/curtains',
      'Shower/tub combination',
    ],
    images: [
      '/photos/rooms/full5.avif',
      '/photos/rooms/full4.avif',
      '/photos/rooms/full3.avif',
      '/photos/rooms/full2.avif',
      '/photos/rooms/full1.avif',
    ],
    isLakeside: true,
  },
  {
    id: 2,
    title: 'Standard Queen',
    subtitle: 'Queen Non-Lakeside',
    description: 'Comfortable queen room with modern amenities',
    size: '200 sq ft',
    sleeps: 3,
    bedType: '1 Queen Bed',
    highlights: [
      'Individually furnished',
      'Air conditioning',
      'Connecting rooms available',
      'Free cribs/infant beds',
      'TV',
      'Fan',
      'Blackout drapes/curtains',
      'Shower/tub combination',
    ],
    images: [
      '/photos/rooms/queenStandard1.avif',
      '/photos/rooms/queenStandard2.avif',
      '/photos/rooms/queenStandard3.avif',
      '/photos/rooms/queenStandard4.avif',
      '/photos/rooms/queenStandard5.avif',
      '/photos/rooms/queenStandard6.avif',
    ],
    isLakeside: false,
  },
  {
    id: 3,
    title: 'Queen Lake View',
    subtitle: 'Queen Lakeside',
    description: 'Beautiful queen room with panoramic lake views',
    size: '200 sq ft',
    sleeps: 3,
    bedType: '1 Queen Bed',
    highlights: [
      'Individually furnished',
      'Air conditioning',
      'Connecting rooms available',
      'Free cribs/infant beds',
      'TV',
      'Fan',
      'Blackout drapes/curtains',
      'Shower/tub combination',
    ],
    images: [
      '/photos/rooms/lakeview.avif',
      '/photos/rooms/queenStandard2.avif',
      '/photos/rooms/queenStandard3.avif',
      '/photos/rooms/queenStandard4.avif',
      '/photos/rooms/queenStandard5.avif',
      '/photos/rooms/queenStandard6.avif',
      '/photos/rooms/queenStandard1.avif',
    ],
    isLakeside: true,
  },
  {
    id: 4,
    title: 'King Standard',
    subtitle: 'King Non-Lakeside',
    description: 'Spacious king room with premium amenities',
    size: '200 sq ft',
    sleeps: 3,
    bedType: '1 King Bed',
    highlights: [
      'Individually furnished',
      'Air conditioning',
      'Connecting rooms available',
      'Free cribs/infant beds',
      'TV',
      'Fan',
      'Blackout drapes/curtains',
      'Shower/tub combination',
    ],
    images: [
      '/photos/rooms/king1.avif',
      '/photos/rooms/king2.avif',
      '/photos/rooms/king3.avif',
      '/photos/rooms/king4.avif',
      '/photos/rooms/king5.avif',
      '/photos/rooms/king6.avif',
    ],
    isLakeside: false,
  },
  {
    id: 5,
    title: 'King Lakeside',
    subtitle: 'King Lakeside',
    description: 'Luxurious king room with stunning lake views',
    size: '200 sq ft',
    sleeps: 3,
    bedType: '1 King Bed',
    highlights: [
      'Individually furnished',
      'Air conditioning',
      'Connecting rooms available',
      'Free cribs/infant beds',
      'TV',
      'Fan',
      'Blackout drapes/curtains',
      'Shower/tub combination',
    ],
    images: [
      '/photos/rooms/kingL1.avif',
      '/photos/rooms/lakeview.avif',
      '/photos/rooms/lakeview2.avif',
      '/photos/rooms/king2.avif',
      '/photos/rooms/king3.avif',
      '/photos/rooms/king4.avif',
      '/photos/rooms/king5.avif',
      '/photos/rooms/king6.avif',
    ],
    isLakeside: true,
  },
  {
    id: 6,
    title: 'Standard Double Double',
    subtitle: '2 Full Beds Non-Lakeside',
    description: 'Spacious room with two double beds, perfect for families',
    size: '200 sq ft',
    sleeps: 4,
    bedType: '2 Double Beds',
    highlights: [
      'Individually furnished',
      'Air conditioning',
      'Connecting rooms available',
      'Free cribs/infant beds',
      'TV',
      'Fan',
      'Blackout drapes/curtains',
      'Shower/tub combination',
    ],
    images: [
      '/photos/rooms/fb1.avif',
      '/photos/rooms/fb2.avif',
      '/photos/rooms/fb3.avif',
      '/photos/rooms/fb4.avif',
    ],
    isLakeside: false,
  },
  {
    id: 7,
    title: 'Standard Double Double',
    subtitle: '2 Full Beds Lakeside',
    description: 'Family-friendly room with two double beds and lake views',
    size: '200 sq ft',
    sleeps: 4,
    bedType: '2 Double Beds',
    highlights: [
      'Individually furnished',
      'Air conditioning',
      'Connecting rooms available',
      'Free cribs/infant beds',
      'TV',
      'Fan',
      'Blackout drapes/curtains',
      'Shower/tub combination',
    ],
    images: [
      '/photos/rooms/lakeview.avif',
      '/photos/rooms/lakeview2.avif',
      '/photos/rooms/fb1.avif',
      '/photos/rooms/fb2.avif',
      '/photos/rooms/fb3.avif',
      '/photos/rooms/fb4.avif',
    ],
    isLakeside: true,
  },
  {
    id: 8,
    title: 'Standard Queen Queen Lake View',
    subtitle: '2 Queen Lakeside',
    description: 'Spacious room with two queen beds and beautiful lake views',
    size: '200 sq ft',
    sleeps: 4,
    bedType: '2 Queen Beds',
    highlights: [
      'Individually furnished',
      'Air conditioning',
      'Connecting rooms available',
      'Free cribs/infant beds',
      'TV',
      'Fan',
      'Blackout drapes/curtains',
      'Shower/tub combination',
    ],
    images: [
      '/photos/rooms/lakeview.avif',
      '/photos/rooms/lakeview2.avif',
      '/photos/rooms/dq1.avif',
      '/photos/rooms/dq2.avif',
      '/photos/rooms/dq3.avif',
      '/photos/rooms/dq4.avif',
      '/photos/rooms/dq5.avif',
    ],
    isLakeside: true,
  },
]

function RoomCard({ room, index, onOpenModal }: { room: Room; index: number; onOpenModal: (room: Room) => void }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)

  const nextImage = () => {
    setCurrentImageIndex((prev) => {
      const next = (prev + 1) % room.images.length
      // Only preload on desktop, mobile will load on demand
      if (typeof window !== 'undefined' && window.innerWidth >= 768) {
        try {
          preloadAndDecode(room.images[(next + 1) % room.images.length]).catch(() => {})
        } catch (e) {}
      }
      return next
    })
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => {
      const next = (prev - 1 + room.images.length) % room.images.length
      // Only preload on desktop, mobile will load on demand
      if (typeof window !== 'undefined' && window.innerWidth >= 768) {
        try {
          preloadAndDecode(room.images[(next - 1 + room.images.length) % room.images.length]).catch(() => {})
        } catch (e) {}
      }
      return next
    })
  }

  // Preload all room images on hover (desktop only)
  const handlePreloadAll = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) return // Skip on mobile
    try {
      room.images.forEach((src) => {
        preloadAndDecode(src).catch(() => {})
      })
    } catch (e) {}
  }

  // Swipe handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    // Don't preload all on mobile - just preload next/prev
    if (typeof window !== 'undefined' && window.innerWidth >= 768) {
      handlePreloadAll()
    }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return

    const distance = touchStartX.current - touchEndX.current
    const minSwipeDistance = 50

    if (Math.abs(distance) > minSwipeDistance) {
      if (distance > 0) {
        nextImage()
      } else {
        prevImage()
      }
    }

    touchStartX.current = null
    touchEndX.current = null
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.1, delay: index * 0.01, ease: [0.4, 0, 0.2, 1] }}
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow"
    >
      <div
        className="relative h-64 w-full group"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseEnter={handlePreloadAll}
        onFocus={handlePreloadAll}
      >
        <div className="absolute inset-0 w-full h-full">
          <CrossfadeImage
            src={room.images[currentImageIndex]}
            alt={room.title}
            className="w-full h-full"
            transitionDuration={typeof window !== 'undefined' && window.innerWidth < 768 ? 80 : 150}
            loading={typeof window !== 'undefined' && window.innerWidth < 768 ? 'lazy' : 'eager'}
            decoding="async"
          />
        </div>
        {room.images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation()
                prevImage()
              }}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-1 md:p-2 rounded-full transition-colors shadow-sm"
              aria-label="Previous image"
            >
              <HiChevronLeft size={18} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                nextImage()
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-1 md:p-2 rounded-full transition-colors shadow-sm"
              aria-label="Next image"
            >
              <HiChevronRight size={18} />
            </button>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1">
              {room.images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation()
                    setCurrentImageIndex(idx)
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === currentImageIndex ? 'bg-white w-6' : 'bg-white/50'
                  }`}
                  aria-label={`Go to image ${idx + 1}`}
                />
              ))}
            </div>
          </>
        )}
        {room.isLakeside && (
          <div className="absolute top-2 right-2 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
            Lakeside
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="text-xl font-bold text-gray-800">{room.title}</h3>
            {room.subtitle && (
              <p className="text-sm text-gray-500 mt-1">{room.subtitle}</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
          <div className="flex items-center gap-1">
            <HiHome size={16} />
            <span>{room.bedType}</span>
          </div>
          <div className="flex items-center gap-1">
            <HiUsers size={16} />
            <span>Sleeps {room.sleeps}</span>
          </div>
        </div>
        <p className="text-gray-600 text-sm mb-4">{room.description}</p>
        <button
          onClick={() => onOpenModal(room)}
          className="w-full text-blue-600 font-semibold hover:text-blue-700 transition-colors text-sm py-2 border border-blue-200 rounded-lg hover:bg-blue-50"
        >
          View Details & Photos →
        </button>
      </div>
    </motion.div>
  )
}

export default function RoomGallery() {
  // Preload and decode room images on mount - but skip on mobile for performance
  useEffect(() => {
    if (typeof window === 'undefined') return
    const isMobile = window.innerWidth < 768
    // Don't preload all images on mobile - too slow
    if (isMobile) return
    
    try {
      // Only preload first image of each room on mobile, all on desktop
      rooms.forEach((room) => {
        if (isMobile) {
          // Just preload first image
          preloadAndDecode(room.images[0]).catch(() => {})
        } else {
          // Preload all on desktop
          room.images.forEach((src) => {
            preloadAndDecode(src).catch(() => {})
          })
        }
      })
    } catch (e) {}
  }, [])

  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpenModal = (room: Room) => {
    setSelectedRoom(room)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedRoom(null), 300)
  }

  return (
    <>
      <section id="rooms" className="py-20 relative">
        {/* Background with tint */}
        <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-white/85 via-white/80 to-white/85 z-10 backdrop-blur-sm" />
            <Image
              src="/photos/hotel/hotel5.JPG"
              alt="Lakeside Inn"
              fill
              className="object-cover object-center"
              sizes="100vw"
              decoding="async"
              loading="eager"
              priority
              quality={92}
            />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Our Rooms</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience comfort and luxury in our beautifully designed accommodations
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.map((room, index) => (
              <RoomCard key={room.id} room={room} index={index} onOpenModal={handleOpenModal} />
            ))}
          </div>
        </div>
      </section>
      <RoomModal room={selectedRoom} isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  )
}
