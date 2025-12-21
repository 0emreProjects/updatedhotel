'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function AboutSection() {
  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    if (typeof window === 'undefined') return
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <section id="about" className="py-20 relative">
      {/* Background with tint - REMOVED ON MOBILE for performance */}
      {!isMobile && (
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-white/85 via-white/80 to-white/85 z-10" />
          <Image
            src="/photos/hotel/hotel1.JPG"
            alt="Lakeside Inn"
            fill
            className="object-cover"
            sizes="100vw"
            loading="lazy"
            quality={75}
          />
        </div>
      )}
      {isMobile && (
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-gray-50 to-white" />
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="relative h-96 w-full rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/photos/hotel/hotel2.JPEG"
                alt="Lakeside Inn exterior"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                loading={isMobile ? 'lazy' : 'eager'}
                quality={isMobile ? 60 : 85}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-xl"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              The Lake&apos;s Story
            </h2>

            <div className="space-y-4 text-gray-700 text-base leading-relaxed max-h-[600px] overflow-y-auto">
              <div>
                <h3 className="font-bold text-lg text-gray-800 mb-2">
                  Lake Quannapowitt&apos;s Rich History
                </h3>
                <p>
                  Lake Quannapowitt&apos;s story in Wakefield, MA, spans Indigenous roots,
                  colonial settlement, an ice-harvesting boom, and modern recreation.
                  The lake is named for Pawtucket Indian James Quonopohit who signed a
                  land deed in 1686. The lake was crucial for early fishing, then became
                  an ice-export hub with the railroad, featuring boathouses and dances,
                  evolving today into a beloved spot for walks and events, though its
                  past includes industrial use and pollution concerns, now managed by
                  groups like Friends of Lake Quannapowitt (FOLQ).
                </p>
              </div>

              <div>
                <h3 className="font-bold text-lg text-gray-800 mb-2">
                  Indigenous History & Naming
                </h3>
                <p>
                  <strong>Native Roots:</strong> The area around the lake was home to
                  Native Americans for millennia, with early inhabitants following
                  caribou, and later, the lake serving as important fishing grounds.
                </p>
                <p>
                  <strong>The Name:</strong> It&apos;s named after Quonopohit (also
                  Quonopohit), a Pawtucket (Nipmuc) man who signed the 1686 deed selling
                  the land to colonists, establishing the town of Redding (now Wakefield).
                </p>
              </div>

              <div>
                <h3 className="font-bold text-lg text-gray-800 mb-2">
                  Colonial & Industrial Era
                </h3>
                <p>
                  <strong>Early Settlement:</strong> The first settlement was near the
                  lake, which provided fish like salmon and alewives, though mills later
                  blocked fish passage.
                </p>
                <p>
                  <strong>Ice Harvesting:</strong> The arrival of the Boston & Maine
                  Railroad in 1845 brought an ice boom; huge icehouses lined the shores
                  to export ice globally.
                </p>
                <p>
                  <strong>Boating & Recreation:</strong> The lake became a social hub
                  with boathouses (like Will Wiley&apos;s), dance halls (Hill&apos;s
                  Boathouse), and bathing areas, with the Wakefield Historical Society
                  noting its rich history.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-lg text-gray-800 mb-2">
                  Modern Era & Conservation
                </h3>
                <p>
                  <strong>Water Quality:</strong> The lake faced pollution, including
                  arsenic in the 1960s (leading to closed beaches) and tar from coal gas
                  manufacturing, but Friends of Lake Quannapowitt (FOLQ) works to
                  protect it.
                </p>
                <p>
                  <strong>Current Use:</strong> Today, it&apos;s a focal point for
                  community life, hosting events like fireworks, with walking paths and
                  gardens maintained by groups like FOLQ.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-lg text-gray-800 mb-2">
                  The Lakeside Inn
                </h3>
                <p>
                  The Lakeside Inn in Wakefield, MA, sits on Lake Quannapowitt, offering
                  views and access to lake activities and a walking
                  trail, serving as a convenient, historic base near Boston & Salem with
                  amenities like a restaurant, bar, pool, and fitness center.
                </p>
                <p>
                  On May 31, 1961, J. George Tucker of the Chamber of Commerce opened the
                  Lord Wakefield Hotel on the shores of Lake Quannapowitt (now known as
                  The Lakeside Inn). The hotel originally featured 60 guest rooms, two
                  restaurants, several conference rooms, an outdoor pool, and beautiful
                  waterfront views. The office buildings standing between the hotel and
                  North Avenue were completed in 1964.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
