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
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({})
  const [autoplayBlocked, setAutoplayBlocked] = useState<{ [key: string]: boolean }>({})
  
  const { scrollY } = useScroll()
  // Disable parallax on mobile for better performance
  const y1 = useTransform(scrollY, [0, 500], [0, isMobile ? 0 : 200])

  const videoSources: VideoSource = {
    // rooms: desktop should show the static room image (not a video)
    rooms: '/photos/menuRoom1.jpeg',
    // functions/events background video (desktop only) - using .mp4 for better Chrome compatibility
    events: '/videos/videoLakesideRoom.mp4',
    // waves restaurant & bar background video (desktop only) - using .mp4 for better Chrome compatibility
    bar: '/videos/barVideo.mp4',
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
  const [mp4Exists, setMp4Exists] = useState<Record<string, boolean>>({})
  const [isChrome, setIsChrome] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const setFromWindow = () => setIsMobile(window.innerWidth < 768)
    // set initial value on mount to avoid mismatched server/client markup
    setFromWindow()
    window.addEventListener('resize', setFromWindow)
    
    // Detect Chrome browser
    const userAgent = window.navigator.userAgent.toLowerCase()
    const isChromeBrowser = /chrome/.test(userAgent) && !/edge|opr/.test(userAgent)
    setIsChrome(isChromeBrowser)
    console.log('Browser detected:', isChromeBrowser ? 'Chrome' : 'Other')
    
    // detect browser video support (run on client)
    try {
      const v = document.createElement('video')
      const mp4 = !!v.canPlayType && v.canPlayType('video/mp4') !== ''
      const quicktime = !!v.canPlayType && v.canPlayType('video/quicktime') !== ''
      setVideoSupport({ mp4, quicktime })
      console.log('Video support:', { mp4, quicktime })
    } catch (e) {
      setVideoSupport({ mp4: false, quicktime: false })
    }

    // No need to check for .mp4 files anymore since we're using them directly

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
            // Preload the .mp4 file
            const video = document.createElement('video')
            video.src = videoSources.events
            video.preload = 'auto'
            video.muted = true
          } else if (theme === 'bar' && videoSources.bar) {
            // Preload the .mp4 file
            const video = document.createElement('video')
            video.src = videoSources.bar
            video.preload = 'auto'
            video.muted = true
          }
        }
        setActiveTheme(theme)
        
        // Force video to play when theme changes (user interaction via hover/click)
        // Chrome requires a more direct user gesture, so we try multiple approaches
        if (!isMobile && (theme === 'events' || theme === 'bar')) {
          // Try immediately and with delays for Chrome compatibility
          const tryPlayVideo = (delay = 0) => {
            setTimeout(() => {
              const video = videoRefs.current[theme]
              if (video) {
                // Reset video to beginning for better Chrome compatibility
                video.currentTime = 0
                video.play().then(() => {
                  // Video started playing successfully
                  setAutoplayBlocked(prev => ({ ...prev, [theme]: false }))
                }).catch((err) => {
                  // Autoplay blocked - mark it so we can show fallback
                  console.log('Autoplay blocked for', theme, err)
                  setAutoplayBlocked(prev => ({ ...prev, [theme]: true }))
                })
              }
            }, delay)
          }
          
          // Try multiple times with different delays for Chrome
          tryPlayVideo(50)
          tryPlayVideo(150)
          tryPlayVideo(300)
        }
      })
    }
  }, [activeTheme, isMobile, videoSources])

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
                // don't force preload on mobile; use lower quality to speed up LCP
                priority={false}
                loading="eager"
                quality={40}
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

                // Build source list - now using .mp4 directly (much better Chrome compatibility)
                const sources: { src: string; type: string }[] = []
                
                // Since we're using .mp4 files directly, just add the mp4 source
                // All modern browsers support .mp4, including Chrome
                sources.push({ src, type: 'video/mp4' })
                
                console.log('Building sources for', theme, {
                  src,
                  type: 'video/mp4',
                  videoSupport,
                  isChrome
                })

                // Check if autoplay is blocked for this theme
                // For Chrome, never show fallback - always show video even if paused
                const isBlocked = false // Always show video, never block it

                // If we have no valid sources for this browser, render the fallback image
                if (sources.length === 0) {
                  return (
                    <motion.div
                      key={theme}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: activeTheme === theme ? 1 : 0 }}
                      transition={{ duration: isMobile ? 0.15 : 0.2, ease: [0.4, 0, 0.2, 1] }}
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

                return (
                  <>
                    <motion.video
                      key={theme}
                      ref={(el) => {
                        if (el) {
                          videoRefs.current[theme] = el
                          // Try to play immediately when ref is set (for Chrome)
                          if (activeTheme === theme && !isMobile) {
                            setTimeout(() => {
                              el.play().catch(() => {})
                            }, 50)
                          }
                        }
                      }}
                      data-theme={theme}
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
                      onClick={(e) => {
                        // Allow clicking on video to play it (Chrome workaround)
                        const video = e.currentTarget as HTMLVideoElement
                        if (video.paused) {
                          video.play().then(() => {
                            setAutoplayBlocked(prev => ({ ...prev, [theme]: false }))
                          }).catch(() => {})
                        }
                      }}
                      style={{ 
                        opacity: activeTheme === theme ? 1 : 0, 
                        pointerEvents: activeTheme === theme ? 'auto' : 'none',
                        willChange: activeTheme === theme ? 'opacity' : 'auto',
                        transform: 'translateZ(0)',
                        backfaceVisibility: 'hidden',
                        zIndex: activeTheme === theme ? 1 : 0
                      }}
                      onCanPlay={(e) => {
                        // Ensure video plays when it can play - Chrome needs multiple attempts
                        const video = e.target as HTMLVideoElement
                        console.log('onCanPlay for', theme, 'video:', {
                          paused: video.paused,
                          readyState: video.readyState,
                          src: video.currentSrc,
                          networkState: video.networkState
                        })
                        if (activeTheme === theme) {
                          const tryPlay = () => {
                            // For Chrome, ensure video is muted and has playsInline
                            if (isChrome) {
                              video.muted = true
                              video.setAttribute('playsinline', 'true')
                              video.setAttribute('webkit-playsinline', 'true')
                            }
                            video.play().then(() => {
                              console.log('✅ Video playing successfully for', theme)
                              setAutoplayBlocked(prev => ({ ...prev, [theme]: false }))
                            }).catch((err) => {
                              // Don't immediately show fallback - Chrome might need more time
                              console.warn('❌ Autoplay blocked on canPlay:', err, 'for theme:', theme)
                              // Only set blocked after multiple failures
                              if (isChrome) {
                                // Give Chrome more chances
                                setTimeout(() => {
                                  video.play().catch(() => {
                                    console.warn('Chrome retry failed for', theme)
                                  })
                                }, 500)
                              } else {
                                setAutoplayBlocked(prev => ({ ...prev, [theme]: true }))
                              }
                            })
                          }
                          tryPlay()
                          // Retry for Chrome compatibility
                          setTimeout(tryPlay, 100)
                          setTimeout(tryPlay, 300)
                          if (isChrome) {
                            setTimeout(tryPlay, 500)
                            setTimeout(tryPlay, 1000)
                          }
                        }
                      }}
                      onLoadedData={(e) => {
                        // Ensure video plays when loaded - Chrome needs multiple attempts
                        const video = e.target as HTMLVideoElement
                        if (activeTheme === theme) {
                          const tryPlay = () => {
                            video.play().then(() => {
                              setAutoplayBlocked(prev => ({ ...prev, [theme]: false }))
                            }).catch((err) => {
                              console.log('Autoplay blocked on loadedData:', err)
                              setAutoplayBlocked(prev => ({ ...prev, [theme]: true }))
                            })
                          }
                          tryPlay()
                          // Retry for Chrome compatibility
                          setTimeout(tryPlay, 100)
                          setTimeout(tryPlay, 300)
                        }
                      }}
                      onLoadedMetadata={(e) => {
                        // Chrome sometimes needs this event to trigger playback
                        const video = e.target as HTMLVideoElement
                        if (activeTheme === theme && video.readyState >= 2) {
                          video.play().then(() => {
                            setAutoplayBlocked(prev => ({ ...prev, [theme]: false }))
                          }).catch(() => {
                            setAutoplayBlocked(prev => ({ ...prev, [theme]: true }))
                          })
                        }
                      }}
                      onPlay={() => {
                        // Video started playing successfully
                        setAutoplayBlocked(prev => ({ ...prev, [theme]: false }))
                      }}
                      onError={(e) => {
                        // Fallback to image if video fails to load
                        const target = e.target as HTMLVideoElement
                        console.error('❌ Video error for', theme, ':', {
                          error: target.error,
                          networkState: target.networkState,
                          src: target.currentSrc
                        })
                        setAutoplayBlocked(prev => ({ ...prev, [theme]: true }))
                        const parent = target.parentElement
                        if (parent && !parent.querySelector('img.fallback-image')) {
                          target.style.display = 'none'
                          const img = document.createElement('img')
                          img.src = theme === 'events' ? '/photos/events/IMG_6482.JPG' : theme === 'bar' ? '/photos/bar/IMG_4988.JPG' : imageSources[theme]
                          img.className = 'absolute inset-0 w-full h-full object-cover fallback-image'
                          img.style.opacity = activeTheme === theme ? '1' : '0'
                          parent.appendChild(img)
                        }
                      }}
                      onStalled={(e) => {
                        console.warn('Video stalled for', theme)
                      }}
                      onWaiting={(e) => {
                        console.warn('Video waiting for', theme)
                      }}
                    >
                      {sources.map((s, i) => (
                        <source key={i} src={s.src} type={s.type} />
                      ))}
                    </motion.video>
                    {/* Fallback image when autoplay is blocked or video fails - only show if not Chrome or after extended failure */}
                    {isBlocked && activeTheme === theme && !isChrome && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                        className="absolute inset-0 w-full h-full"
                        style={{ zIndex: 2 }}
                      >
                        <Image
                          src={theme === 'events' ? '/photos/events/IMG_6482.JPG' : theme === 'bar' ? '/photos/bar/IMG_4988.JPG' : imageSources[theme]}
                          alt={theme}
                          fill
                          className="object-cover object-center"
                          quality={90}
                          priority
                        />
                      </motion.div>
                    )}
                    {/* For Chrome, show a subtle play overlay if video is paused */}
                    {isChrome && activeTheme === theme && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none"
                        style={{ zIndex: 3 }}
                        onClick={(e) => {
                          e.stopPropagation()
                          const video = videoRefs.current[theme]
                          if (video && video.paused) {
                            video.play().catch(() => {})
                          }
                        }}
                      >
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            const video = videoRefs.current[theme]
                            if (video) {
                              video.play().then(() => {
                                setAutoplayBlocked(prev => ({ ...prev, [theme]: false }))
                              }).catch(() => {})
                            }
                          }}
                          className="bg-black/50 hover:bg-black/70 text-white rounded-full p-4 pointer-events-auto transition-all"
                          style={{ display: 'none' }} // Hidden by default, only show if needed
                        >
                          <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </button>
                      </motion.div>
                    )}
                  </>
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
                onClick={(e) => {
                  // Click is a stronger user gesture for Chrome autoplay
                  handleThemeChange(pillar.id)
                  // Also try to play video immediately on click
                  if (pillar.id === 'events' || pillar.id === 'bar') {
                    setTimeout(() => {
                      const video = videoRefs.current[pillar.id]
                      if (video) {
                        video.play().then(() => {
                          setAutoplayBlocked(prev => ({ ...prev, [pillar.id]: false }))
                        }).catch(() => {
                          setAutoplayBlocked(prev => ({ ...prev, [pillar.id]: true }))
                        })
                      }
                    }, 50)
                  }
                  navigateToSection(pillar.id)
                }}
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
