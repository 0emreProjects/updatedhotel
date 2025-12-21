'use client'

import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

// Eager components
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import BookingBar from '@/components/BookingBar'
import Hero from '@/components/Hero'
import Footer from '@/components/Footer'

// Lazy / dynamically loaded components to reduce initial bundle on mobile
// Load only when in viewport for mobile performance
const RoomGallery = dynamic(() => import('@/components/RoomGallery'), { 
  ssr: false,
  loading: () => <div className="h-96 bg-gray-50" />
})
const AboutSection = dynamic(() => import('@/components/AboutSection'), { 
  ssr: false,
  loading: () => <div className="h-96 bg-gray-50" />
})
const Amenities = dynamic(() => import('@/components/Amenities'), { 
  ssr: false,
  loading: () => <div className="h-96 bg-gray-50" />
})
const EventsSection = dynamic(() => import('@/components/EventsSection'), { 
  ssr: false,
  loading: () => <div className="h-96 bg-gray-50" />
})
const BarSection = dynamic(() => import('@/components/BarSection'), { 
  ssr: false,
  loading: () => <div className="h-96 bg-gray-50" />
})
const SocialProof = dynamic(() => import('@/components/SocialProof'), { 
  ssr: false,
  loading: () => <div className="h-96 bg-gray-50" />
})

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Manage body scroll
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  return (
    <main className="min-h-screen bg-white relative">
      {/* 1. HEADER */}
      <Header onMenuOpen={() => setIsMenuOpen(true)} />

      {/* 2. SIDEBAR */}
      <Sidebar isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      {/* 3. PAGE CONTENT */}
      <div className="relative z-10">
        <Hero />
        <RoomGallery />
        <AboutSection />
        <Amenities />
        <EventsSection />
        <BarSection />
        <SocialProof />
        <Footer />
        <BookingBar />
      </div>
    </main>
  )
}
