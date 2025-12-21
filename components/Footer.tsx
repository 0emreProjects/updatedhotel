'use client'

import { HiLocationMarker, HiPhone, HiMail } from 'react-icons/hi'
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa'
import Link from 'next/link'

export default function Footer() {
  const handleGetDirections = () => {
    window.open('https://www.google.com/maps/place/Lakeside+Inn/@42.5153709,-71.0874478,16z/data=!3m1!4b1!4m9!3m8!1s0x89e30cb1d1aa9995:0x145ec39090a25018!5m2!4m1!1i2!8m2!3d42.515367!4d-71.0848729!16s%2Fg%2F11c3ss305m?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D', '_blank')
  }

  return (
    <footer id="contact" className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <HiLocationMarker size={20} className="text-blue-400" />
                <span>595 North Avenue, Wakefield, MA 01880</span>
              </div>
              <div className="flex items-center space-x-3">
                <HiPhone size={20} className="text-blue-400" />
                <a href="tel:+17812456100" className="hover:text-blue-400 transition-colors">
                  1.781.245.6100
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <HiMail size={20} className="text-blue-400" />
                <a href="mailto:frontdeskmanager@thelakesidepark.com" className="hover:text-blue-400 transition-colors">
                  frontdeskmanager@thelakesidepark.com
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-blue-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/#rooms" className="hover:text-blue-400 transition-colors">
                  Rooms
                </Link>
              </li>
              <li>
                <Link href="/#events" className="hover:text-blue-400 transition-colors">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/#bar" className="hover:text-blue-400 transition-colors">
                  Bar
                </Link>
              </li>
              <li>
                <Link href="/#about" className="hover:text-blue-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-blue-400 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/LakesideInnWakefieldMa/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 rounded-full hover:bg-blue-600 transition-colors"
                aria-label="Facebook"
              >
                <FaFacebook size={20} />
              </a>
              <a
                href="https://www.instagram.com/lakesideinnwakefield/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 rounded-full hover:bg-blue-600 transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href="https://www.youtube.com/watch?v=cs5-i8nziQE"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 rounded-full hover:bg-blue-600 transition-colors"
                aria-label="YouTube"
              >
                <FaYoutube size={20} />
              </a>
            </div>
            <button
              onClick={handleGetDirections}
              className="mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg font-semibold transition-colors flex items-center space-x-2"
            >
              <HiLocationMarker size={20} />
              <span>Get Directions</span>
            </button>
          </div>
        </div>

        {/* Map */}
        <div className="mb-8 rounded-lg overflow-hidden shadow-xl">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2947.5!2d-71.0849326!3d42.5153391!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e30cb1d1aa9995%3A0x145ec39090a25018!2sLakeside%20Inn!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Lakeside Inn Location - 595 North Avenue, Wakefield, MA 01880"
          />
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} The Lakeside Inn. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
