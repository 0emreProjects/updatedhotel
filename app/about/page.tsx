'use client'

import Header from '@/components/Header'
import BookNowBar from '@/components/BookNowBar'
import Footer from '@/components/Footer'
import HistorySection from '@/components/HistorySection'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function AboutPage() {
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
              About Us
            </h1>
            <p className="text-gray-600 text-lg">Discover the history and charm of Lakeside Inn</p>
          </motion.div>
        </div>
      </div>
      <HistorySection />
      <Footer />
      <BookNowBar />
    </main>
  )
}

