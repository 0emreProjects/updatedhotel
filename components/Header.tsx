'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface HeaderProps {
  onMenuOpen?: () => void;
}

export default function Header({ onMenuOpen }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  
  const isContactPage = pathname === '/contact'

  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const offset = window.scrollY > 50
          if (isScrolled !== offset) setIsScrolled(offset)
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isScrolled])

  const showTint = isScrolled || isContactPage

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 py-4 md:px-12 transition-all duration-500 pointer-events-none">
      
      {/* LOGO SECTION */}
      <Link 
        href="/"
        onClick={(e) => {
          // On mobile, ensure we go to top of homepage
          if (pathname === '/') {
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }
        }}
        className="relative group pointer-events-auto"
      >
        {/* The Tinted Rectangle Backdrop */}
        <div className={`absolute -inset-x-4 -inset-y-2 rounded-lg transition-all duration-500 ease-out ${
          showTint 
            ? "bg-blue-600 opacity-100 shadow-lg translate-y-0" 
            : "bg-transparent opacity-0 -translate-y-2"
        }`} />

        {/* The Logo Image */}
        <div className="relative h-16 w-48 md:h-20 md:w-56 transition-transform duration-300 group-hover:scale-105">
          <Image
            src="/photos/mainHotel.avif" 
            alt="Lakeside Inn Logo"
            fill
            className="object-contain brightness-0 invert transition-all duration-500"
            priority
            quality={90}
            sizes="(max-width: 768px) 192px, 224px"
            unoptimized={false}
          />
        </div>
      </Link>

      {/* MENU BUTTON */}
      <button 
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          if (onMenuOpen) onMenuOpen();
        }}
        className={`relative z-50 pointer-events-auto group flex flex-col items-center justify-center space-y-1.5 p-4 rounded-full border transition-all duration-500 ${
          showTint 
            ? "bg-blue-600 border-blue-500 shadow-lg" 
            : "bg-black/40 backdrop-blur-md border-white/10"
        }`}
      >
        <div className="h-0.5 w-8 bg-white transition-all duration-300" />
        <div className="h-0.5 w-8 bg-white transition-all duration-300" />
        <div className="h-0.5 w-5 bg-white self-end transition-all duration-300 group-hover:w-8" />
      </button>
    </header>
  )
}
