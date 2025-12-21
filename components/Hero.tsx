'use client'

import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { HiHome, HiUsers } from 'react-icons/hi'
import { FaWineGlass } from 'react-icons/fa'
import Image from 'next/image'

type HeroTheme = 'rooms' | 'events' | 'bar'

interface VideoSource {
  rooms: string
  events: string
  bar: string
}

export default function Hero() {
  const [activeTheme, setActiveTheme] = useState<HeroTheme>('rooms')
  // Start with a consistent server-friendly default to avoid hydration mismatches.
  // The actual viewport size is applied on mount in an effect below.
  const [isMobile, setIsMobile] = useState<boolean>(false)
  const containerRef = useRef(null)
  
  const { scrollY } = useScroll()
  // Disable parallax on mobile for better performance
  const y1 = useTransform(scrollY, [0, 500], [0, isMobile ? 0 : 200])

  const videoSources: VideoSource = {
    // rooms: desktop should show the static room image (not a video)
    rooms: '/photos/menuRoom1.jpeg',
    // functions/events background video (desktop only)
    events: '/videos/videoLakesideRoom.MOV',
    // waves restaurant & bar background video (desktop only)
    bar: '/videos/barVideo.MOV',
  }

  const imageSources: VideoSource = {
    // use the specified mobile image for the main hero on small viewports
    rooms: '/photos/mobileMenu1.jpeg',
    events: '/photos/mobileMenu1.jpeg', 
    bar: '/photos/mobileMenu1.jpeg', 
  }

  // Show video only after mount to avoid blocking initial LCP paint.
  const [showVideo, setShowVideo] = useState(false)
  const [videoSupport, setVideoSupport] = useState<{ mp4: boolean; quicktime: boolean } | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const setFromWindow = () => setIsMobile(window.innerWidth < 768)
    // set initial value on mount to avoid mismatched server/client markup
    setFromWindow()
    window.addEventListener('resize', setFromWindow)
    // detect browser video support (run on client)
    try {
      const v = document.createElement('video')
      const mp4 = !!v.canPlayType && v.canPlayType('video/mp4') !== ''
      const quicktime = !!v.canPlayType && v.canPlayType('video/quicktime') !== ''
      setVideoSupport({ mp4, quicktime })
    } catch (e) {
      setVideoSupport({ mp4: false, quicktime: false })
    }

    // enable the video layer quickly on desktop so videos appear again
    // (short delay still lets LCP image paint first). Mobile remains unchanged.
    const t = setTimeout(() => setShowVideo(true), 150)
    return () => {
      window.removeEventListener('resize', setFromWindow)
      clearTimeout(t)
    }
  }, [])

  // Highlight current section as user scrolls
  useEffect(() => {
    const sectionIds: HeroTheme[] = ['rooms', 'events', 'bar']
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id as HeroTheme
            if (id && id !== activeTheme) setActiveTheme(id)
          }
        })
      },
      { threshold: 0.55 }
    )

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [activeTheme])

  const handleThemeChange = useCallback((theme: HeroTheme) => {
    if (theme !== activeTheme) {
      // Use requestAnimationFrame for smoother state updates
      requestAnimationFrame(() => {
        // Preload the next theme's media before switching using native browser APIs
        if (typeof window !== 'undefined' && !isMobile) {
          if (theme === 'rooms' && videoSources.rooms) {
            const img = new window.Image()
            img.src = videoSources.rooms
          } else if (theme === 'events' && videoSources.events) {
            const video = document.createElement('video')
            video.src = videoSources.events.replace(/\.MOV$/i, '.mp4')
            video.preload = 'auto'
            video.muted = true
          } else if (theme === 'bar' && videoSources.bar) {
            const video = document.createElement('video')
            video.src = videoSources.bar.replace(/\.MOV$/i, '.mp4')
            video.preload = 'auto'
            video.muted = true
          }
        }
        setActiveTheme(theme)
      })
    }
  }, [activeTheme, isMobile])

  const navigateToSection = (theme: HeroTheme) => {
    const sectionMap: Record<HeroTheme, string> = {
      rooms: '#rooms',
      events: '#events',
      bar: '#bar',
    }
    const element = document.querySelector(sectionMap[theme])
    if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  // UPDATED PILLARS TO MATCH MENU
  const pillars = [
    { 
      id: 'rooms' as HeroTheme, 
      title: 'Hotel Rooms', 
      icon: HiHome, 
      description: 'Refined Comfort' 
    },
    { 
      id: 'events' as HeroTheme, 
      title: 'Functions & Events', 
      icon: HiUsers, 
      description: 'Curated Gatherings' 
    },
    { 
      id: 'bar' as HeroTheme, 
      title: 'Waves Restaurant & Bar', 
      icon: FaWineGlass, 
      description: 'Artisanal Dining' 
    },
  ]

  const contentTransitionDuration = useMemo(() => isMobile ? 0.15 : 0.5, [isMobile])

  return (
    <section ref={containerRef} className="relative h-[100vh] w-full overflow-hidden bg-[#0a0a0a]">


      {/* 2. BACKGROUND LAYER */}
      <motion.div 
        style={{ 
          y: isMobile ? 0 : y1,
          willChange: isMobile ? 'auto' : 'transform',
          transform: 'translateZ(0)'
        }} 
        className="absolute inset-0 z-0"
      >
        <div className={`absolute inset-0 z-10 hero-mobile-overlay ${isMobile ? 'bg-gradient-to-b from-black/50 via-black/10 to-black/60' : 'bg-gradient-to-b from-black/60 via-black/20 to-black/70'}`} />
        
        <AnimatePresence mode="sync">
          <motion.div
            key={activeTheme}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: isMobile ? 0.12 : 0.2, 
              ease: [0.4, 0, 0.2, 1]
            }}
            className="absolute inset-0 h-full w-full"
            style={{ 
              willChange: 'opacity',
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden'
            }}
          >
            {/* Mobile: Use static image */}
            {isMobile ? (
              <Image
                src={imageSources.rooms}
                alt="Lakeside Inn"
                fill
                className="object-cover object-center"
                priority
                loading="eager"
                quality={60}
                sizes="100vw"
              />
            ) : (
              // Desktop: Use videos for events & bar, and an image for rooms
              (['rooms', 'events', 'bar'] as HeroTheme[]).map((theme) => {
                if (theme === 'rooms') {
                  return (
                    <motion.div
                      key={theme}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: activeTheme === theme ? 1 : 0 }}
                      transition={{ 
                        duration: isMobile ? 0.15 : 0.2, 
                        ease: [0.4, 0, 0.2, 1]
                      }}
                      className="absolute inset-0 w-full h-full"
                      style={{ 
                        opacity: activeTheme === theme ? 1 : 0, 
                        pointerEvents: activeTheme === theme ? 'auto' : 'none',
                        willChange: 'opacity',
                        transform: 'translateZ(0)',
                        backfaceVisibility: 'hidden'
                      }}
                    >
                      <Image
                        src={videoSources.rooms}
                        alt="Rooms"
                        fill
                        className="object-cover object-center"
                        quality={isMobile ? 75 : 90}
                        loading={isMobile ? 'lazy' : 'eager'}
                      />
                    </motion.div>
                  )
                }

                // events and bar -> conditionally render video backgrounds
                const src = videoSources[theme]

                // Determine whether we should attempt to show a video.
                const canPlayVideo = showVideo && (videoSupport ? (videoSupport.mp4 || videoSupport.quicktime) : true)

                if (!canPlayVideo) {
                  // Render the fallback image (same behavior as rooms image)
                  return (
                    <motion.div
                      key={theme}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: activeTheme === theme ? 1 : 0 }}
                      transition={{ 
                        duration: isMobile ? 0.15 : 0.2, 
                        ease: [0.4, 0, 0.2, 1]
                      }}
                      className="absolute inset-0 w-full h-full"
                      style={{ 
                        opacity: activeTheme === theme ? 1 : 0, 
                        pointerEvents: activeTheme === theme ? 'auto' : 'none',
                        willChange: 'opacity',
                        transform: 'translateZ(0)',
                        backfaceVisibility: 'hidden'
                      }}
                    >
                      <Image
                        src={theme === 'events' ? '/photos/events/IMG_6482.JPG' : theme === 'bar' ? '/photos/bar/IMG_4988.JPG' : imageSources[theme]}
                        alt={theme}
                        fill
                        className="object-cover object-center"
                        quality={isMobile ? 75 : 90}
                        loading={isMobile ? 'lazy' : 'eager'}
                      />
                    </motion.div>
                  )
                }

                // Build source list based on detected support. If detection hasn't run
                // yet (videoSupport === null) include both sources so the browser can decide.
                const sources: { src: string; type: string }[] = []
                if (videoSupport === null || videoSupport.mp4) {
                  sources.push({ src: src.replace(/\.MOV$/i, '.mp4'), type: 'video/mp4' })
                }
                if (videoSupport === null || videoSupport.quicktime) {
                  sources.push({ src, type: 'video/quicktime' })
                }

                return (
                  <motion.video
                    key={theme}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: activeTheme === theme ? 1 : 0 }}
                    transition={{ 
                      duration: isMobile ? 0.15 : 0.2, 
                      ease: [0.4, 0, 0.2, 1]
                    }}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload={isMobile ? 'metadata' : 'auto'}
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ 
                      opacity: activeTheme === theme ? 1 : 0, 
                      pointerEvents: activeTheme === theme ? 'auto' : 'none',
                      willChange: activeTheme === theme ? 'opacity' : 'auto',
                      transform: 'translateZ(0)',
                      backfaceVisibility: 'hidden'
                    }}
                    onError={(e) => {
                      const target = e.target as HTMLVideoElement
                      target.style.display = 'none'
                      const img = document.createElement('img')
                      img.src = theme === 'events' ? '/photos/events/IMG_6482.JPG' : theme === 'bar' ? '/photos/bar/IMG_4988.JPG' : imageSources[theme]
                      img.className = 'absolute inset-0 w-full h-full object-cover'
                      target.parentElement?.appendChild(img)
                    }}
                  >
                    {sources.map((s, i) => (
                      <source key={i} src={s.src} type={s.type} />
                    ))}
                  </motion.video>
                )
              })
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* 3. CENTER CONTENT */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center px-4">
        {!isMobile ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: contentTransitionDuration, ease: "easeOut" }}
            className="text-center"
          >
            <h1 className="text-6xl md:text-9xl font-serif italic text-white mb-2 drop-shadow-2xl">
              Lakeside Inn
            </h1>
            
            <p className="text-white/90 font-serif italic text-2xl md:text-4xl tracking-wide mb-8">
              Your home away from home
            </p>

            <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-white/40 to-transparent mx-auto mb-8" />
            
            <p className="text-white font-sans uppercase tracking-[0.4em] text-[10px] md:text-xs opacity-70">
              Family friendly Lakeside Hotel
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
            className="text-center"
          >
            <h1 className="text-4xl font-serif italic text-white mb-2 drop-shadow-2xl">
              Lakeside Inn
            </h1>
            
            <p className="text-white/95 font-serif italic text-lg tracking-wide mb-4">
              Your home away from home
            </p>

            <div className="h-[1px] w-16 bg-gradient-to-r from-transparent via-white/50 to-transparent mx-auto mb-4" />
            
            <p className="text-white font-sans uppercase tracking-[0.3em] text-[9px] opacity-80">
              Family friendly Lakeside Hotel
            </p>
          </motion.div>
        )}

        {/* DESKTOP PILLARS */}
        {!isMobile && (
          <div className="absolute bottom-20 grid grid-cols-3 gap-8 w-full max-w-6xl px-12">
            {pillars.map((pillar) => (
              <button
                key={pillar.id}
                onMouseEnter={() => handleThemeChange(pillar.id)}
                onClick={() => navigateToSection(pillar.id)}
                className="group relative text-left"
              >
                <div className="h-[2px] w-full bg-white/10 mb-4 overflow-hidden">
                  <motion.div 
                    initial={{ x: '-100%' }}
                    animate={{ x: activeTheme === pillar.id ? '0%' : '-100%' }}
                    transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                    className="h-full bg-white" 
                  />
                </div>
                <div className="flex items-start gap-4 transition-transform duration-200 group-hover:translate-x-2">
                  <span className="text-[10px] text-white/40 font-sans mt-1">0{pillars.indexOf(pillar) + 1}</span>
                  <div>
                    <h3 className="text-white font-serif text-2xl italic mb-1 transition-colors">{pillar.title}</h3>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 4. MOBILE UI */}
      {isMobile && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.12, ease: [0.4, 0, 0.2, 1] }}
          className="absolute bottom-20 left-0 right-0 z-30 px-4 sm:px-6 flex flex-col items-center gap-4"
        >
          <div className="flex items-center justify-between w-full max-w-xs bg-black/70 backdrop-blur-xl border border-white/30 rounded-[1.5rem] p-1.5 shadow-2xl">
            {pillars.map((pillar) => (
              <button
                key={pillar.id}
                onClick={() => navigateToSection(pillar.id)}
                className={`flex-1 flex flex-col items-center py-2.5 rounded-[1rem] transition-all duration-100 bg-black/30 hover:bg-black/50 active:bg-black/60 text-white touch-manipulation border border-white/20`}
                aria-label={pillar.title}
              >
                <pillar.icon size={16} className="mb-0.5 text-white" />
                <span className="text-[9px] font-semibold uppercase tracking-tight leading-tight text-white">
                  {pillar.id === 'bar' ? 'Waves' : pillar.id === 'events' ? 'Events' : 'Rooms'}
                </span>
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </section>
  )
}
