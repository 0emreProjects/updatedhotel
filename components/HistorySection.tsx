'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const historyImages = [
  '/photos/hotel/hotel1.JPG',
  '/photos/hotel/hotel2.JPEG',
  '/photos/hotel/hotel3.JPEG',
  '/photos/hotel/hotel4.JPEG',
  '/photos/hotel/hotel5.JPG',
]

export default function HistorySection() {
  return (
    <section id="history" className="relative py-20 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/photos/hotel/hotel1.JPG"
          alt="Lakeside Inn History"
          fill
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
            Our Story
          </h2>
        </motion.div>

        {/* Horizontal Layout with Images */}
        <div className="grid md:grid-cols-3 gap-8 items-center mb-12">
          {/* Left Column - Images */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            {historyImages.slice(0, 3).map((img, index) => (
              <div key={index} className="relative h-48 rounded-lg overflow-hidden shadow-lg">
                <Image
                  src={img}
                  alt={`Hotel history ${index + 1}`}
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
            ))}
          </motion.div>

          {/* Center Column - Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4 text-gray-700"
          >
            <h3 className="text-2xl font-serif font-semibold text-gray-900">
              The Lake's Story
            </h3>
            <p>
              Lake Quannapowitt's story in Wakefield, MA, spans Indigenous roots, colonial settlement, 
              an ice-harvesting boom, and modern recreation, named for Pawtucket Indian James Quonopohit 
              who signed a land deed in 1686.
            </p>
            <p>
              The lake was crucial for early fishing, then became an ice-export hub with the railroad, 
              featuring boathouses and dances, evolving today into a beloved spot for walks and events.
            </p>
            <h4 className="text-xl font-serif font-semibold text-gray-900 mt-6">
              Indigenous History & Naming
            </h4>
            <p>
              The area around the lake was home to Native Americans for millennia, with early inhabitants 
              following caribou, and later, the lake serving as important fishing grounds. It's named after 
              Quonopohit, a Pawtucket (Nipmuc) man who signed the 1686 deed selling the land to colonists.
            </p>
          </motion.div>

          {/* Right Column - More Images */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            {historyImages.slice(3, 5).map((img, index) => (
              <div key={index} className="relative h-48 rounded-lg overflow-hidden shadow-lg">
                <Image
                  src={img}
                  alt={`Hotel history ${index + 4}`}
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
            ))}
          </motion.div>
        </div>

        {/* The Lakeside Inn Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-blue-600 text-white p-8 rounded-lg"
        >
          <h3 className="text-2xl font-serif font-semibold mb-4">
            The Lakeside Inn
          </h3>
          <p className="mb-4">
            On May 31, 1961, J. George Tucker of the Chamber of Commerce, opened the Lord Wakefield Hotel 
            on the shores of Lake Quannapowitt (now known as The Lakeside Inn). The hotel originally featured 
            60 guest rooms, two restaurants, several conference rooms, an outdoor pool and beautiful waterfront views.
          </p>
          <p>
            The office buildings standing between the hotel and North Avenue were completed in 1964.
          </p>
          <p className="mt-4">
            Today, The Lakeside Inn sits on Lake Quannapowitt, offering views and access to lake activities 
            (kayaking, fishing) and a walking trail, serving as a convenient, historic base near Boston & Salem 
            with amenities like a restaurant, bar, pool, and fitness center.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
