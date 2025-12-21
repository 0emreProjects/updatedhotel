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
const RoomGallery = dynamic(() => import('@/components/RoomGallery'), { ssr: false })
const AboutSection = dynamic(() => import('@/components/AboutSection'), { ssr: false })
const Amenities = dynamic(() => import('@/components/Amenities'), { ssr: false })
const EventsSection = dynamic(() => import('@/components/EventsSection'), { ssr: false })
const BarSection = dynamic(() => import('@/components/BarSection'), { ssr: false })
const SocialProof = dynamic(() => import('@/components/SocialProof'), { ssr: false })

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
