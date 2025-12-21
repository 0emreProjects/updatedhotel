'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { HiPhone, HiMail, HiLocationMarker } from 'react-icons/hi'
import { FaInstagram, FaFacebook, FaArrowRight } from 'react-icons/fa'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import Footer from '@/components/Footer'

export default function ContactPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' })
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    // Clear status message when user starts typing
    if (submitStatus.type) {
      setSubmitStatus({ type: null, message: '' })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: '' })

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
          partyDate: '',
          partyTime: '',
          numGuests: '',
        })
      })

      const data = await response.json()
      
      if (response.ok && data.success) {
        setSubmitStatus({ 
          type: 'success', 
          message: data.message || 'Thank you! Your message has been sent successfully.' 
        })
        // Reset form
        setFormData({ 
          firstName: '', 
          lastName: '', 
          email: '', 
          phone: '', 
          subject: 'General Inquiry', 
          message: '' 
        })
      } else {
        setSubmitStatus({ 
          type: 'error', 
          message: data.message || 'Failed to send message. Please try again.' 
        })
      }
    } catch (error) {
      setSubmitStatus({ 
        type: 'error', 
        message: 'An error occurred. Please try again later or contact us directly at frontdeskmanager@thelakesidepark.com' 
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#F0F7FF] relative font-sans">
      <Header onMenuOpen={() => setIsMenuOpen(true)} />
      <Sidebar isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      {/* 1. BLUE-WASHED HERO SECTION */}
      <section className="relative h-40 md:h-[55vh] w-full flex items-center justify-center">
        {/* Desktop background image for Contact (hidden on small screens) */}
        <div className="absolute inset-0 pointer-events-none md:block hidden -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-white/85 via-white/80 to-white/85 backdrop-blur-sm" />
          <Image
            src="/photos/hotel/IMG_5503.JPG"
            alt="Contact background"
            fill
            className="object-cover object-center"
            priority
            quality={90}
          />
        </div>
        
        {/* DEEPER BLUE HEADER PROTECTION */}
        <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-blue-200/60 via-blue-100/40 to-transparent pointer-events-none z-0" />
        
        <div className="absolute inset-0 overflow-hidden pointer-events-none md:block hidden">
          <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[60%] bg-blue-300/20 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 left-[-5%] w-[30%] h-[40%] bg-white/40 rounded-full blur-[100px]" />
        </div>
        
        <div className="relative z-20 text-center px-4">
          <motion.span 
            initial={{ opacity: 0, letterSpacing: "0.2em" }}
            animate={{ opacity: 1, letterSpacing: "0.5em" }}
            transition={{ duration: 1 }}
            className="text-blue-700 uppercase text-[9px] mb-4 block font-black"
          >
            Wakefield, Massachusetts
          </motion.span>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-2xl md:text-9xl font-serif italic text-gray-900 drop-shadow-sm"
          >
            Contact Us
          </motion.h1>

          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-[2px] w-32 bg-blue-600/30 mx-auto mt-8"
          />
        </div>
      </section>

      {/* 2. SPLIT LAYOUT: INFO & FORM */}
      <section className="py-12 md:py-24 px-4 md:px-6 max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-24">
          
          {/* LEFT SIDE: INFO */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-8 md:space-y-16"
          >
            <div>
              <h2 className="text-2xl md:text-5xl font-serif italic text-gray-900 mb-6 md:mb-8 leading-tight">
                Curating your stay at the lake.
              </h2>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-md">
                Our team is available to assist with room details, event planning, and restaurant reservations.
              </p>
            </div>

            <div className="space-y-10">
              <ContactLink icon={HiPhone} title="Guest Services" detail="1.781.245.6100" href="tel:+17812456100" />
              <ContactLink icon={HiMail} title="General Inquiries" detail="frontdeskmanager@thelakesidepark.com" href="mailto:frontdeskmanager@thelakesidepark.com" />
              <ContactLink icon={HiLocationMarker} title="Visit Us" detail="595 North Avenue, Wakefield, MA 01880" href="https://www.google.com/maps/place/Lakeside+Inn/@42.5153709,-71.0874478,16z/data=!3m1!4b1!4m9!3m8!1s0x89e30cb1d1aa9995:0x145ec39090a25018!5m2!4m1!1i2!8m2!3d42.515367!4d-71.0848729!16s%2Fg%2F11c3ss305m?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D" />
            </div>

            {/* SOCIALS */}
            <div className="pt-8 flex items-center gap-6">
              <span className="text-[10px] uppercase tracking-widest text-blue-800 font-bold">Follow Us</span>
              <div className="h-[1px] w-12 bg-blue-200"></div>
              <a href="https://www.instagram.com/lakesideinnwakefield/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-700 transition-colors"><FaInstagram size={22} /></a>
              <a href="https://www.facebook.com/LakesideInnWakefieldMa/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-700 transition-colors"><FaFacebook size={22} /></a>
            </div>
          </motion.div>

          {/* RIGHT SIDE: FORM */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 bg-white/90 md:bg-white/80 md:backdrop-blur-md p-6 md:p-16 rounded-[1rem] md:rounded-[2.5rem] border border-blue-100 shadow-none md:shadow-2xl md:shadow-blue-900/10"
          >
            <form onSubmit={handleSubmit} className="space-y-10">
              {/* Success/Error Messages */}
              {submitStatus.type && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-lg ${
                    submitStatus.type === 'success'
                      ? 'bg-green-50 text-green-800 border border-green-200'
                      : 'bg-red-50 text-red-800 border border-red-200'
                  }`}
                >
                  <p className="text-sm font-medium">{submitStatus.message}</p>
                </motion.div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <FloatingInput 
                  label="First Name" 
                  name="firstName" 
                  value={formData.firstName}
                  onChange={handleChange} 
                  required 
                />
                <FloatingInput 
                  label="Last Name" 
                  name="lastName" 
                  value={formData.lastName}
                  onChange={handleChange} 
                  required 
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <FloatingInput 
                  label="Email Address" 
                  type="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleChange} 
                  required 
                />
                <FloatingInput 
                  label="Phone Number" 
                  type="tel" 
                  name="phone" 
                  value={formData.phone}
                  onChange={handleChange} 
                />
              </div>

              <div className="space-y-3">
                <label className="text-[10px] uppercase tracking-widest text-blue-400 font-bold ml-1">Inquiry Type</label>
                <select 
                  name="subject" 
                  className="w-full bg-transparent border-b border-blue-100 py-3 outline-none focus:border-blue-600 transition-colors font-serif italic text-base md:text-xl text-gray-700 cursor-pointer"
                  onChange={handleChange}
                  value={formData.subject}
                >
                  <option>General Inquiry</option>
                  <option>Room Reservations</option>
                  <option>Events & Weddings</option>
                  <option>Waves Restaurant</option>
                </select>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] uppercase tracking-widest text-blue-400 font-bold ml-1">Message</label>
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Tell us about your plans..."
                  className="w-full bg-transparent border-b border-blue-100 py-3 outline-none focus:border-blue-600 transition-colors font-serif italic text-base md:text-xl placeholder:text-blue-200 resize-none"
                  onChange={handleChange}
                  value={formData.message}
                  required
                />
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full group flex items-center justify-between bg-blue-600 text-white p-4 md:p-6 rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-md md:shadow-xl md:shadow-blue-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="uppercase tracking-[0.3em] text-xs md:text-sm font-bold">
                  {isSubmitting ? 'Sending...' : 'Send Inquiry'}
                </span>
                {!isSubmitting && (
                  <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

function ContactLink({ icon: Icon, title, detail, href }: any) {
  return (
    <a href={href} className="flex items-start gap-6 group">
      <div className="w-12 h-12 rounded-2xl bg-white shadow-md flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all">
        <Icon size={20} />
      </div>
      <div>
        <p className="text-[10px] uppercase tracking-widest text-blue-400 font-bold mb-1">{title}</p>
        <p className="text-lg font-medium text-gray-900 group-hover:text-blue-600 transition-colors">{detail}</p>
      </div>
    </a>
  )
}

function FloatingInput({ label, value, onChange, ...props }: any) {
  return (
    <div className="relative border-b border-blue-100 focus-within:border-blue-600 transition-colors py-2">
      <label className="text-[10px] uppercase tracking-widest text-blue-400 font-bold block mb-1 ml-1">{label}</label>
      <input
        {...props}
        value={value}
        onChange={onChange}
        className="w-full px-1 py-2 bg-transparent outline-none text-gray-900 placeholder:text-blue-100 font-serif italic text-xl"
      />
    </div>
  )
}
