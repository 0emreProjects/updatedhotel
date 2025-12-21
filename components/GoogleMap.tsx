'use client'

export default function GoogleMap() {
  // Using Google Maps Embed API without API key (public embed)
  const address = encodeURIComponent('Lakeside Inn, 595 North Avenue, Wakefield, MA 01880')
  
  return (
    <div className="w-full h-64 md:h-96 rounded-lg overflow-hidden shadow-lg">
      <iframe
        width="100%"
        height="100%"
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2948.5!2d-71.073!3d42.506!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDLCsDMwJzIxLjYiTiA3McKwMDQnMjIuOCJX!5e0!3m2!1sen!2sus!4v1234567890!5m2!1sen!2sus&q=${address}`}
      />
    </div>
  )
}

