'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Link from 'next/link'
import RoomModal from './RoomModal'

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

const rooms: Room[] = [
  {
    id: 1,
    title: 'Full Lakeside',
    subtitle: 'Full Lakeside',
    description: 'Individually furnished room with stunning lake views',
    images: [
      '/photos/rooms/full1.avif',
      '/photos/rooms/full2.avif',
      '/photos/rooms/full3.avif',
      '/photos/rooms/full4.avif',
      '/photos/rooms/full5.avif',
    ],
    highlights: [
      'Individually furnished',
      'Air conditioning',
      'Connecting rooms available',
      'Free cribs/infant beds',
      'TV',
      'Fan',
      'Blackout drapes/curtains',
      'Shower/tub combination',
    ],
    size: '200 sq ft',
    sleeps: 3,
    bedType: '1 Double Bed',
    isLakeside: true,
  },
  {
    id: 2,
    title: 'Standard Queen',
    subtitle: 'Queen Non-Lakeside',
    description: 'Comfortable queen room with modern amenities',
    images: [
      '/photos/rooms/queenStandard1.avif',
      '/photos/rooms/queenStandard2.avif',
      '/photos/rooms/queenStandard3.avif',
      '/photos/rooms/queenStandard4.avif',
      '/photos/rooms/queenStandard5.avif',
      '/photos/rooms/queenStandard6.avif',
    ],
    highlights: [
      'Individually furnished',
      'Air conditioning',
      'Connecting rooms available',
      'Free cribs/infant beds',
      'TV',
      'Fan',
      'Blackout drapes/curtains',
      'Shower/tub combination',
    ],
    size: '200 sq ft',
    sleeps: 3,
    bedType: '1 Queen Bed',
    isLakeside: false,
  },
  {
    id: 3,
    title: 'Queen Lake View',
    subtitle: 'Queen Lakeside',
    description: 'Beautiful queen room with panoramic lake views',
    images: [
      '/photos/rooms/lakeview.avif',
      '/photos/rooms/queenStandard2.avif',
      '/photos/rooms/queenStandard3.avif',
      '/photos/rooms/queenStandard4.avif',
      '/photos/rooms/queenStandard5.avif',
      '/photos/rooms/queenStandard6.avif',
    ],
    highlights: [
      'Individually furnished',
      'Air conditioning',
      'Connecting rooms available',
      'Free cribs/infant beds',
      'TV',
      'Fan',
      'Blackout drapes/curtains',
      'Shower/tub combination',
    ],
    size: '200 sq ft',
    sleeps: 3,
    bedType: '1 Queen Bed',
    isLakeside: true,
  },
  {
    id: 4,
    title: 'King Standard',
    subtitle: 'King Non-Lakeside',
    description: 'Spacious king room with premium amenities',
    images: [
      '/photos/rooms/king1.avif',
      '/photos/rooms/king2.avif',
      '/photos/rooms/king3.avif',
      '/photos/rooms/king4.avif',
      '/photos/rooms/king5.avif',
      '/photos/rooms/king6.avif',
    ],
    highlights: [
      'Individually furnished',
      'Air conditioning',
      'Connecting rooms available',
      'Free cribs/infant beds',
      'TV',
      'Fan',
      'Blackout drapes/curtains',
      'Shower/tub combination',
    ],
    size: '200 sq ft',
    sleeps: 3,
    bedType: '1 King Bed',
    isLakeside: false,
  },
  {
    id: 5,
    title: 'King Lakeside',
    subtitle: 'King Lakeside',
    description: 'Luxurious king room with stunning lake views',
    images: [
      '/photos/rooms/kingL1.avif',
      '/photos/rooms/lakeview.avif',
      '/photos/rooms/lakeview2.avif',
      '/photos/rooms/king2.avif',
      '/photos/rooms/king3.avif',
      '/photos/rooms/king4.avif',
      '/photos/rooms/king5.avif',
      '/photos/rooms/king6.avif',
    ],
    highlights: [
      'Individually furnished',
      'Air conditioning',
      'Connecting rooms available',
      'Free cribs/infant beds',
      'TV',
      'Fan',
      'Blackout drapes/curtains',
      'Shower/tub combination',
    ],
    size: '200 sq ft',
    sleeps: 3,
    bedType: '1 King Bed',
    isLakeside: true,
  },
  {
    id: 6,
    title: 'Standard Double Double',
    subtitle: '2 Full Beds Non-Lakeside',
    description: 'Spacious room with two double beds, perfect for families',
    images: [
      '/photos/rooms/fb1.avif',
      '/photos/rooms/fb2.avif',
      '/photos/rooms/fb3.avif',
      '/photos/rooms/fb4.avif',
    ],
    highlights: [
      'Individually furnished',
      'Air conditioning',
      'Connecting rooms available',
      'Free cribs/infant beds',
      'TV',
      'Fan',
      'Blackout drapes/curtains',
      'Shower/tub combination',
    ],
    size: '200 sq ft',
    sleeps: 4,
    bedType: '2 Double Beds',
    isLakeside: false,
  },
  {
    id: 7,
    title: 'Standard Double Double',
    subtitle: '2 Full Beds Lakeside',
    description: 'Family-friendly room with two double beds and lake views',
    images: [
      '/photos/rooms/lakeview.avif',
      '/photos/rooms/lakeview2.avif',
      '/photos/rooms/fb1.avif',
      '/photos/rooms/fb2.avif',
      '/photos/rooms/fb3.avif',
      '/photos/rooms/fb4.avif',
    ],
    highlights: [
      'Individually furnished',
      'Air conditioning',
      'Connecting rooms available',
      'Free cribs/infant beds',
      'TV',
      'Fan',
      'Blackout drapes/curtains',
      'Shower/tub combination',
    ],
    size: '200 sq ft',
    sleeps: 4,
    bedType: '2 Double Beds',
    isLakeside: true,
  },
  {
    id: 8,
    title: 'Standard Queen Queen Lake View',
    subtitle: '2 Queen Lakeside',
    description: 'Spacious room with two queen beds and beautiful lake views',
    images: [
      '/photos/rooms/lakeview.avif',
      '/photos/rooms/lakeview2.avif',
      '/photos/rooms/dq1.avif',
      '/photos/rooms/dq2.avif',
      '/photos/rooms/dq3.avif',
      '/photos/rooms/dq4.avif',
      '/photos/rooms/dq5.avif',
    ],
    highlights: [
      'Individually furnished',
      'Air conditioning',
      'Connecting rooms available',
      'Free cribs/infant beds',
      'TV',
      'Fan',
      'Blackout drapes/curtains',
      'Shower/tub combination',
    ],
    size: '200 sq ft',
    sleeps: 4,
    bedType: '2 Queen Beds',
    isLakeside: true,
  },
]

export default function RoomsSection() {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <section id="rooms" className="py-20 bg-white scroll-mt-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-elegant font-bold text-lakeside-blue mb-4">
            Our Hotel Rooms
          </h2>
          <p className="text-gray-600 text-lg">Comfortable accommodations for every guest</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room, index) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-smooth cursor-pointer"
              onClick={() => {
                setSelectedRoom(room)
                setIsModalOpen(true)
              }}
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={room.images[0]}
                  alt={room.title}
                  fill
                  className="object-cover hover:scale-110 transition-smooth"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-elegant font-semibold text-lakeside-blue mb-2">
                  {room.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {room.size} • Sleeps {room.sleeps} • {room.bedType}
                </p>
                <button className="w-full bg-lakeside-blue text-white py-2 rounded-lg hover:bg-blue-700 transition-fast">
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/rooms"
            className="inline-block bg-lakeside-blue text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-fast font-semibold"
          >
            View All Rooms
          </Link>
        </div>
      </div>

      {selectedRoom && (
        <RoomModal 
          room={selectedRoom} 
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false)
            setTimeout(() => setSelectedRoom(null), 300)
          }} 
        />
      )}
    </section>
  )
}

