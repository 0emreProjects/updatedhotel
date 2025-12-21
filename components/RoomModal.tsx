'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiX, HiChevronLeft, HiChevronRight } from 'react-icons/hi'
import { HiHome, HiUsers } from 'react-icons/hi'
import Image from 'next/image'
import CrossfadeImage from './CrossfadeImage'
import dynamic from 'next/dynamic'

const MobileGallery = dynamic(() => import('./MobileGallery'), { ssr: false })

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

interface RoomModalProps {
  room: Room | null
  isOpen: boolean
  onClose: () => void
}

export default function RoomModal({ room, isOpen, onClose }: RoomModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0)

  // Close on Escape key
  React.useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, onClose])

  React.useEffect(() => {
    if (room) {
      setCurrentImageIndex(0)
    }
  }, [room])

  // Preload all room images when modal opens
  React.useEffect(() => {
    if (!room) return
    try {
      room.images.forEach((src) => {
        const img = new window.Image()
        img.src = src
      })
    } catch (e) {}
  }, [room])

  if (!room) return null

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % room.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + room.images.length) % room.images.length)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 z-40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 20, stiffness: 260 }}
            className="fixed inset-4 md:inset-8 lg:inset-16 z-50 bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-w-6xl mx-auto"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-60 bg-black/80 hover:bg-black text-white rounded-full p-3 shadow-xl transition-colors flex items-center justify-center"
              aria-label="Close dialog"
            >
              <HiX size={20} />
              <span className="sr-only">Close</span>
            </button>

            <div className="flex-1 overflow-y-auto">
              {/* Image Gallery */}
              <div className="relative h-64 md:h-96 w-full bg-gray-100">
                {/* Render a mobile-optimized gallery client-side for small viewports */}
                <MobileGallery
                  images={room.images}
                  initialIndex={currentImageIndex}
                  onIndexChange={(idx) => setCurrentImageIndex(idx)}
                />
                {room.images.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        prevImage()
                      }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 text-white p-1 md:p-2 rounded-full transition-colors shadow-sm"
                      aria-label="Previous image"
                    >
                      <HiChevronLeft className="h-4 w-4 md:h-6 md:w-6" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        nextImage()
                      }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 text-white p-1 md:p-2 rounded-full transition-colors shadow-sm"
                      aria-label="Next image"
                    >
                      <HiChevronRight className="h-4 w-4 md:h-6 md:w-6" />
                    </button>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                      {room.images.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentImageIndex(idx)}
                          className={`h-2 rounded-full transition-all ${
                            idx === currentImageIndex ? 'bg-white w-8' : 'bg-white/50 w-2'
                          }`}
                          aria-label={`Go to image ${idx + 1}`}
                        />
                      ))}
                    </div>
                  </>
                )}
                {room.isLakeside && (
                  <div className="absolute top-4 left-4 bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Lakeside View
                  </div>
                )}
              </div>

              {/* Thumbnail Gallery */}
              {room.images.length > 1 && (
                <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 overflow-x-auto">
                  <div className="flex space-x-3">
                    {room.images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImageIndex(idx)}
                        className={`relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${
                          idx === currentImageIndex
                            ? 'border-blue-600 scale-105'
                            : 'border-transparent opacity-60 hover:opacity-100'
                        }`}
                      >
                        <Image
                          src={img}
                          alt={`${room.title} ${idx + 1}`}
                          fill
                          className="object-cover"
                            sizes="80px"
                            decoding="async"
                            loading="lazy"
                            quality={60}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Content */}
              <div className="p-6 md:p-8">
                <div className="mb-6">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                    {room.title}
                  </h2>
                  {room.subtitle && (
                    <p className="text-lg text-gray-500">{room.subtitle}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <HiHome size={20} className="text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-600">Bed Type</p>
                      <p className="font-semibold text-gray-800">{room.bedType}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <HiUsers size={20} className="text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-600">Sleeps</p>
                      <p className="font-semibold text-gray-800">{room.sleeps} Guests</p>
                    </div>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-gray-600">Room Size</p>
                    <p className="font-semibold text-gray-800">{room.size}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-gray-700 leading-relaxed">{room.description}</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Room Highlights</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {room.highlights.map((highlight, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg"
                      >
                        <span className="text-blue-600 font-bold">✓</span>
                        <span className="text-gray-700">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
