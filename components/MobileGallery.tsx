"use client"

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'
import preloadAndDecode from './imagePreloader'

interface Props {
  images: string[]
  initialIndex?: number
  onIndexChange?: (idx: number) => void
}

export default function MobileGallery({ images, initialIndex = 0, onIndexChange }: Props) {
  const [index, setIndex] = useState(initialIndex)
  const [isMobile, setIsMobile] = useState(false)

  // Limit image set and adjust behavior on mobile for performance
  const effectiveImages = isMobile ? images.slice(0, 5) : images

  useEffect(() => {
    setIndex(initialIndex)
  }, [initialIndex])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    if (onIndexChange) onIndexChange(index)
  }, [index, onIndexChange])

  // Preload neighbors for snappy next/prev
  useEffect(() => {
    try {
      const nextIdx = (index + 1) % effectiveImages.length
      const prevIdx = (index - 1 + effectiveImages.length) % effectiveImages.length
      // Preload neighbors so next/prev swaps are instant on both mobile and desktop
      preloadAndDecode(effectiveImages[nextIdx]).catch(() => {})
      preloadAndDecode(effectiveImages[prevIdx]).catch(() => {})
    } catch (e) {}
  }, [index, images])

  const next = () => setIndex((i) => (i + 1) % images.length)
  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length)

  return (
    <div className="w-full">
      <div className="relative w-full h-[220px] sm:h-[320px] bg-gray-100 overflow-hidden rounded-lg">
        <Image
          src={effectiveImages[index]}
          alt={`Photo ${index + 1}`}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, 50vw"
          priority={!isMobile}
          loading={isMobile ? 'lazy' : 'eager'}
          quality={isMobile ? 45 : 60}
        />

        {/* Touch-friendly arrow areas */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            prev()
          }}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/60 text-white p-2 rounded-full shadow-md z-20"
          aria-label="Previous image"
        >
          <HiChevronLeft size={20} />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation()
            next()
          }}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/60 text-white p-2 rounded-full shadow-md z-20"
          aria-label="Next image"
        >
          <HiChevronRight size={20} />
        </button>

        {/* dots */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all ${i === index ? 'bg-white w-6' : 'bg-white/60 w-2'}`}
              aria-label={`Go to image ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Horizontal thumbnails - low quality for mobile and lazy loaded */}
      <div className="mt-3 px-1 overflow-x-auto">
        <div className="flex items-center gap-2">
          {effectiveImages.map((img, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`flex-shrink-0 rounded-md overflow-hidden w-20 h-14 ${i === index ? 'ring-2 ring-blue-500' : ''}`}
            >
              <Image src={img} alt={`thumb-${i}`} width={80} height={56} className="object-cover" sizes="80px" loading={i <= index + 1 ? 'eager' : 'lazy'} quality={30} />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

