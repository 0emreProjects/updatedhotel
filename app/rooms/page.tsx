'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import BookNowBar from '@/components/BookNowBar'
import Footer from '@/components/Footer'
import RoomModal from '@/components/RoomModal'
import Image from 'next/image'
import { motion } from 'framer-motion'

const rooms = [
  {
    id: 'full-lakeside',
    title: 'Full Lakeside',
    image: '/photos/rooms/full1.avif',
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
    bed: '1 Double Bed',
  },
  {
    id: 'queen-standard',
    title: 'Standard Queen',
    image: '/photos/rooms/queenStandard1.avif',
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
    bed: '1 Queen Bed',
  },
  {
    id: 'queen-lakeview',
    title: 'Queen Lake View',
    image: '/photos/rooms/lakeview.avif',
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
    bed: '1 Queen Bed',
  },
  {
    id: 'king-standard',
    title: 'King Standard',
    image: '/photos/rooms/king1.avif',
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
    bed: '1 King Bed',
  },
  {
    id: 'king-lakeview',
    title: 'King Lake View',
    image: '/photos/rooms/kingL1.avif',
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
    bed: '1 King Bed',
  },
  {
    id: 'double-double',
    title: 'Standard Double Double',
    image: '/photos/rooms/fb1.avif',
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
    bed: '2 Double Beds',
  },
  {
    id: 'double-double-lakeview',
    title: 'Double Double Lake View',
    image: '/photos/rooms/lakeview.avif',
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
    bed: '2 Double Beds',
  },
  {
    id: 'queen-queen-lakeview',
    title: 'Standard Queen Queen Lake View',
    image: '/photos/rooms/lakeview.avif',
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
    bed: '2 Queen Beds',
  },
]

export default function RoomsPage() {
  const [selectedRoom, setSelectedRoom] = useState<typeof rooms[0] | null>(null)

  return (
    <main className="relative min-h-screen">
      <Header />
      <div className="pt-20 pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-elegant font-bold text-lakeside-blue mb-4">
              Our Rooms
            </h1>
            <p className="text-gray-600 text-lg">Comfortable accommodations for every guest</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.map((room, index) => (
              <motion.div
                key={room.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-smooth cursor-pointer"
                onClick={() => setSelectedRoom(room)}
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={room.image}
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
                    {room.size} • Sleeps {room.sleeps} • {room.bed}
                  </p>
                  <button className="w-full bg-lakeside-blue text-white py-2 rounded-lg hover:bg-blue-700 transition-fast">
                    View Details
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
      <BookNowBar />

      {selectedRoom && (
        <RoomModal room={selectedRoom} onClose={() => setSelectedRoom(null)} />
      )}
    </main>
  )
}

