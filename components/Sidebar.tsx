'use client'

import { HiX, HiPhone, HiMail, HiLocationMarker } from 'react-icons/hi'
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa'
import Link from 'next/link'

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  // FIXED: Added "/" before "#" so these links work from any page
  const menuItems = [
    { name: 'Home', href: '/#hero' },
    { name: 'Hotel Rooms', href: '/#rooms' },
    { name: 'Functions & Events', href: '/#events' },
    { name: 'Waves Restaurant & Bar', href: '/#bar' },
    { name: 'About Us', href: '/#about' },
    { name: 'Contact Us', href: '/contact' }
  ]

  return (
    <>
      {/* BACKGROUND OVERLAY */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9998]" 
          onClick={onClose} 
        />
      )}

      {/* SIDEBAR PANEL */}
      {isOpen && (
        <aside
          className="fixed top-0 right-0 h-full w-full max-w-[450px] bg-white text-gray-900 z-[9999] shadow-[-20px_0_50px_rgba(0,0,0,0.1)] p-10 flex flex-col overflow-y-auto"
          style={{ transform: 'translateX(0)' }}
        >
        {/* CLOSE BUTTON */}
        <button 
          onClick={onClose} 
          className="self-end p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-all mb-8"
        >
          <HiX size={32} />
        </button>

        {/* QUICK LINKS */}
        <nav className="flex flex-col gap-6">
          <span className="text-[10px] uppercase tracking-[0.5em] text-blue-600 font-bold mb-2">Explore</span>
          {menuItems.map((item) => (
            <Link 
              key={item.name} 
              href={item.href} 
              onClick={onClose}
              className="text-3xl md:text-4xl font-serif italic text-gray-800 hover:text-blue-600 transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* CONTACT & INFO */}
        <div className="mt-auto pt-10 border-t border-gray-100 space-y-8">
          <div className="space-y-5">
             <span className="text-[10px] uppercase tracking-[0.5em] text-gray-400 block">Concierge</span>
             
             <a href="tel:17812456100" className="flex items-center gap-4 text-sm text-gray-600 hover:text-blue-600 transition-colors group">
               <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                 <HiPhone size={14} />
               </div>
               1.781.245.6100
             </a>
             
             <a href="mailto:frontdeskmanager@thelakesidepark.com" className="flex items-center gap-4 text-sm text-gray-600 hover:text-blue-600 transition-colors group">
               <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                 <HiMail size={14} />
               </div>
               frontdeskmanager@thelakesidepark.com
             </a>
          </div>

          {/* SOCIAL LINKS */}
          <div className="flex gap-4">
            <a href="https://www.instagram.com/lakesideinnwakefield/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center border border-gray-100 text-gray-400 hover:bg-blue-600 hover:text-white hover:border-blue-600 rounded-full transition-all">
              <FaInstagram size={20} />
            </a>
            <a href="https://www.facebook.com/LakesideInnWakefieldMa/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center border border-gray-100 text-gray-400 hover:bg-blue-600 hover:text-white hover:border-blue-600 rounded-full transition-all">
              <FaFacebook size={20} />
            </a>
            <a href="https://www.youtube.com/watch?v=cs5-i8nziQE&embeds_referring_euri=https%3A%2F%2Fwww.thelakesidepark.com%2F&embeds_referring_origin=https%3A%2F%2Fwww.thelakesidepark.com&source_ve_path=MjM4NTE" target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center border border-gray-100 text-gray-400 hover:bg-blue-600 hover:text-white hover:border-blue-600 rounded-full transition-all">
              <FaYoutube size={20} />
            </a>
          </div>

          <a href="https://www.google.com/maps/place/Lakeside+Inn/@42.5153709,-71.0874478,16z/data=!3m1!4b1!4m9!3m8!1s0x89e30cb1d1aa9995:0x145ec39090a25018!5m2!4m1!1i2!8m2!3d42.515367!4d-71.0848729!16s%2Fg%2F11c3ss305m?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer" className="block w-full py-5 bg-blue-600 text-white text-center text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-gray-900 transition-all rounded-sm shadow-lg shadow-blue-100">
            Get Directions
          </a>
        </div>
      </aside>
      )}
    </>
  )
}
