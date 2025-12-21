'use client'

import { motion } from 'framer-motion'
import { 
  HiWifi, 
  HiHome,
  HiOutlineLocationMarker,
  HiClock,
  HiOutlineHeart
} from 'react-icons/hi'
import {
  FaSwimmingPool,
  FaUtensils,
  FaGlassCheers,
  FaDumbbell,
  FaParking,
  FaSun,
  FaBuilding,
  FaMapMarkerAlt
} from 'react-icons/fa'

const amenities = [
  { icon: HiWifi, name: 'Free Internet' },
  { icon: FaSwimmingPool, name: 'Outdoor Pool' },
  { icon: FaUtensils, name: 'Restaurant' },
  { icon: FaGlassCheers, name: 'Bar' },
  { icon: FaDumbbell, name: 'Fitness Center' },
  { icon: FaParking, name: 'On Site Free Self Parking' },
  { icon: FaSun, name: 'Breakfast Buffet Included' },
  { icon: FaBuilding, name: 'Terrace' },
  { icon: FaMapMarkerAlt, name: 'Lakeside' },
  { icon: HiClock, name: '24/7 Front Desk' },
]

export default function AmenitiesSection() {
  return (
    <section id="amenities" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-elegant font-bold text-lakeside-blue mb-4">
            Amenities
          </h2>
          <p className="text-gray-600 text-lg">Everything you need for a comfortable stay</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {amenities.map((amenity, index) => (
            <motion.div
              key={amenity.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex flex-col items-center p-6 bg-gray-50 rounded-lg hover:bg-lakeside-blue hover:text-white transition-smooth group"
            >
              <amenity.icon className="w-12 h-12 mb-3 text-lakeside-blue group-hover:text-white transition-fast" />
              <p className="text-center font-semibold text-sm">{amenity.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

