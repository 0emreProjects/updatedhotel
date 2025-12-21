'use client'

import { motion } from 'framer-motion'
import { HiStar } from 'react-icons/hi'

const reviews = [
  {
    name: 'Sarah M.',
    rating: 5,
    text: 'Beautiful location right on the lake! The staff was incredibly friendly and helpful. The rooms were clean and comfortable with amazing views.',
  },
  {
    name: 'John D.',
    rating: 5,
    text: 'Perfect family-friendly hotel. The pool area is great and the breakfast buffet was excellent. We will definitely be back!',
  },
  {
    name: 'Emily R.',
    rating: 5,
    text: 'The Lakeside Inn exceeded our expectations. The lake views from our room were breathtaking, and the proximity to Boston and Salem made it perfect for exploring.',
  },
  {
    name: 'Michael T.',
    rating: 5,
    text: 'Great value for the location. The restaurant and bar are wonderful, and the staff went above and beyond to make our stay comfortable.',
  },
  {
    name: 'Lisa K.',
    rating: 5,
    text: 'We loved our stay here! The hotel has so much character and history. The walking path around the lake is beautiful, and the amenities are top-notch.',
  },
  {
    name: 'David P.',
    rating: 5,
    text: 'Excellent service and beautiful setting. The rooms are well-maintained, and the lake activities available nearby made our trip memorable.',
  },
]

export default function ReviewsSection() {
  return (
    <section id="reviews" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-elegant font-bold text-lakeside-blue mb-4">
            Guest Reviews
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-lg"
            >
              <div className="flex gap-1 mb-3">
                {[...Array(review.rating)].map((_, i) => (
                  <HiStar key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">"{review.text}"</p>
              <p className="text-lakeside-blue font-semibold">— {review.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

