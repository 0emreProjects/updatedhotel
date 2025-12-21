# Premium Interactive Hotel Website

A high-end, responsive hotel website built with Next.js, TypeScript, Tailwind CSS, and Framer Motion. The site features interactive video transitions, a persistent booking interface, and a modern, bright design optimized for both desktop and mobile experiences.

## 🎨 Features

- **Sticky Header**: Logo on the left (clickable to go home), hamburger menu on the right
- **Three-Pillar Hero Section**: Interactive zones (Hotel Rooms, Function Events, The Bar) with smooth video/photo transitions
- **Persistent Booking Bar**: Fixed bottom "Book Now" button that stays visible during scrolling
- **Full-Screen Navigation**: Overlay menu with nav links, social media, phone number, and "Get Directions" button
- **Room Gallery**: Responsive grid showcasing 8 different room types with detailed modals
- **About Section**: Hotel history and story of Lake Quannapowitt
- **Amenities**: Feature list with icons (10 amenities)
- **Events Section**: Photo slider with upcoming events calendar
- **Bar & Entertainment**: Event slider with live music schedule
- **Social Proof**: Customer reviews and ratings
- **Contact Form**: Comprehensive form with email integration
- **Footer**: Contact information and embedded Google Maps

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: React Icons (Heroicons & Font Awesome)

## 📁 Project Structure

```
NewHotel/
├── app/
│   ├── globals.css          # Global styles and Tailwind imports
│   ├── layout.tsx           # Root layout component
│   ├── page.tsx             # Main homepage
│   ├── rooms/
│   │   └── page.tsx         # Rooms listing page
│   ├── events/
│   │   └── page.tsx         # Events and function page
│   ├── bar/
│   │   └── page.tsx         # Bar and restaurant page
│   ├── about/
│   │   └── page.tsx         # About us page
│   └── contact/
│       └── page.tsx         # Contact form page
├── components/
│   ├── Header.tsx           # Sticky header with logo and menu button
│   ├── MenuOverlay.tsx      # Full-screen navigation overlay
│   ├── BookNowBar.tsx       # Persistent bottom booking bar
│   ├── Hero.tsx             # Three-pillar hero with video transition logic
│   ├── RoomsSection.tsx     # Room types grid display
│   ├── RoomModal.tsx       # Room detail modal with photo gallery
│   ├── HistorySection.tsx   # Hotel history section
│   ├── AmenitiesSection.tsx # Amenities list with icons
│   ├── ReviewsSection.tsx   # Reviews and testimonials
│   ├── Footer.tsx           # Footer with contact info and map
│   └── GoogleMap.tsx        # Google Maps embed component
├── hooks/
│   └── useMediaQuery.ts     # Custom hook for responsive breakpoints
├── public/
│   ├── photos/              # All image assets
│   └── videos/              # Video assets
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── README.md
```

## 🔑 Key Components Explained

### Background Video Logic (`components/Hero.tsx`)

The Hero component manages the video/photo transitions for the three-pillar hero section:

- **State Management**: Uses `useState` to track the active section (rooms, events, or bar)
- **Media Sources**: Defined in the `sections` object with desktop videos/images and mobile fallback images
- **Transition Logic**: When a user clicks or swipes on a section, the `setActiveSection` function triggers a smooth cross-fade transition using Framer Motion's `AnimatePresence`
- **Mobile Optimization**: On mobile, uses fixed background image instead of videos for better performance
- **Touch Support**: Handles swipe gestures for mobile navigation

**Key Code:**
```typescript
const [activeSection, setActiveSection] = useState<'rooms' | 'events' | 'bar'>('rooms')

const handleTouchEnd = () => {
  if (!touchStart || !touchEnd) return
  const distance = touchStart - touchEnd
  const isLeftSwipe = distance > 50
  const isRightSwipe = distance < -50
  
  if (isLeftSwipe) {
    if (activeSection === 'rooms') setActiveSection('events')
    else if (activeSection === 'events') setActiveSection('bar')
  }
  // ... swipe logic
}
```

### Navigation State (`components/MenuOverlay.tsx`)

The full-screen navigation overlay is controlled by:

- **Open/Close State**: Managed in `Header.tsx` and passed as props to `MenuOverlay`
- **Animation**: Uses Framer Motion's slide-in animation from the right
- **Menu Items**: Navigation links (Home, Rooms, Events, Bar, About Us, Contact Us)
- **Contact Info**: Phone number, email, and social media icons
- **Google Maps Integration**: "Get Directions" button opens Google Maps in a new tab

**Key Code:**
```typescript
const [menuOpen, setMenuOpen] = useState(false)

// In MenuOverlay.tsx
<motion.div
  initial={{ x: '100%' }}
  animate={{ x: 0 }}
  exit={{ x: '100%' }}
  transition={{ type: 'spring', damping: 25, stiffness: 200 }}
  className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white z-50"
>
```

### Room Modal (`components/RoomModal.tsx`)

The room detail modal features an interactive photo gallery:

- **State Management**: Tracks current image index with `useState`
- **Navigation**: Previous/next buttons and dot indicators
- **Animation**: Smooth slide transitions using Framer Motion's `AnimatePresence`
- **Touch Support**: Swipe gestures for mobile photo navigation

**Key Code:**
```typescript
const [currentImageIndex, setCurrentImageIndex] = useState(0)

const nextImage = () => {
  setCurrentImageIndex((prev) => (prev + 1) % room.images.length)
}
```

### Event Slider (`app/events/page.tsx` & `app/bar/page.tsx`)

Both Events and Bar pages feature interactive photo sliders:

- **State Management**: Tracks current image index with `useState`
- **Navigation**: Previous/next buttons and dot indicators
- **Touch Support**: Swipe left/right to navigate photos on mobile
- **Fast Transitions**: 0.3s transitions for responsive feel
- **Calendar Integration**: Upcoming events displayed below slider

**Key Code:**
```typescript
const [currentImageIndex, setCurrentImageIndex] = useState(0)

const handleTouchEnd = () => {
  if (!touchStart || !touchEnd) return
  const distance = touchStart - touchEnd
  const isLeftSwipe = distance > 50
  const isRightSwipe = distance < -50

  if (isLeftSwipe) nextImage()
  if (isRightSwipe) prevImage()
}
```

## 🚀 Getting Started

### Installation

1. Install dependencies:
```bash
npm install
```

2. Place your assets in the correct directories:
- Images: `/public/photos/`
- Videos: `/public/videos/`

3. Convert `.MOV` files to `.mp4` format for better compatibility:
```bash
# Use ffmpeg or similar tool to convert videos
ffmpeg -i videoLakesideRoom.MOV -c:v libx264 -c:a aac videoLakesideRoom.mp4
ffmpeg -i barVideo.MOV -c:v libx264 -c:a aac barVideo.mp4
```

4. Set up email functionality (optional for development):
   - See `EMAIL_SETUP.md` for detailed instructions
   - Create a `.env.local` file with your Resend API key:
     ```env
     RESEND_API_KEY=re_your_api_key_here
     RESEND_FROM_EMAIL=Lakeside Inn <onboarding@resend.dev>
     ```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm start
```

## 🎨 Customization

### Replacing Assets

- **Logo**: Replace `/public/photos/hotel/mainHotel.avif` with your logo
- **Images**: Update image paths in component files with your own images
- **Videos**: Update video sources in `components/Hero.tsx` with your own video URLs
- **Content**: Edit text content directly in component files

### Styling

The site uses Tailwind CSS for styling. To customize:

- **Colors**: Modify `tailwind.config.ts` to change the color scheme
- **Fonts**: Update font families in `tailwind.config.ts` and `app/globals.css`
- **Spacing**: Adjust padding/margin classes directly in components

### Bright Design

The site features a bright, modern design with:

- White and light gray backgrounds
- Dark blue accent color (#1e3a5f - lakeside-blue)
- High contrast text
- Clean, spacious layouts
- Smooth lake-themed overlay patterns

## 📱 Responsive Design

The website is fully responsive:

- **Mobile** (< 768px): 
  - Three-pillar hero stacks vertically
  - Fixed background image instead of videos
  - Touch swipe navigation
  - Smaller, compact buttons
  - Clear/transparent backgrounds for better visibility
  
- **Tablet** (768px - 1024px): 
  - Optimized layouts for medium screens
  - 2-column grids for rooms
  
- **Desktop** (> 1024px): 
  - Full-width layouts with optimal spacing
  - Video backgrounds
  - 3-column grids for rooms

## 🔗 External Integrations

- **Google Maps**: Embedded map in footer, "Get Directions" opens Google Maps with hotel location
- **Social Media**: Links to Facebook, Instagram, Twitter (update with your actual links)
- **Phone/Email**: Clickable contact information
- **Email Form**: Contact form sends emails to `frontdeskmanager@thelakesidepark.com` using Resend email service

## 📂 Asset Organization

```
public/
├── photos/
│   ├── hotel/
│   │   ├── mainHotel.avif          # Logo (used in header)
│   │   ├── mainMenu.png            # Mobile hero background
│   │   ├── menuRoom1.jpeg          # Desktop rooms hero
│   │   ├── hotel1.JPG - hotel5.JPG # History photos
│   │   └── IMG_2819.JPG            # Pool photo
│   ├── rooms/
│   │   ├── full1.avif - full5.avif
│   │   ├── queenStandard1.avif - queenStandard6.avif
│   │   ├── lakeview.avif, lakeview2.avif
│   │   ├── king1.avif - king6.avif
│   │   ├── kingL1.avif
│   │   ├── fb1.avif - fb4.avif
│   │   └── dq1.avif - dq5.avif
│   ├── bar/
│   │   ├── IMG_4988.JPG
│   │   ├── IMG_5334.JPG
│   │   └── IMG_5694.JPG
│   └── events/
│       ├── 004.jpg, 008.jpg, 012.jpg, 016.jpg, 056.jpg, 072.jpg
│       └── IMG_*.JPG, IMG_*.JPEG
└── videos/
    ├── videoLakesideRoom.mp4       # Events hero video
    └── barVideo.mp4                # Bar hero video
```

## 🐛 Troubleshooting

### Google Maps Not Loading
- The map uses a public embed URL. If it doesn't load, you may need to:
  1. Get a Google Maps API key
  2. Update `components/GoogleMap.tsx` with your API key
  3. Or use a static map image as fallback

### Videos Not Playing
- Ensure videos are in `.mp4` format
- Check file paths in `components/Hero.tsx`
- Verify video files exist in `/public/videos/`

### Images Not Displaying
- Check file paths match exactly (case-sensitive)
- Ensure images are in `/public/photos/` directory
- Verify file extensions match (`.avif`, `.jpg`, `.jpeg`, `.png`)

### Icons Not Showing
- Ensure `react-icons` package is installed
- Check icon imports are from correct package (`react-icons/hi` or `react-icons/fa`)

## 📝 Notes

- All transitions are optimized for speed (0.2-0.3s)
- Mobile version uses fixed background image for better performance
- Touch swipe gestures work on mobile for photo navigation
- Email form uses Resend API for sending emails (see `EMAIL_SETUP.md` for configuration)
- Google Maps embed may require API key for production use
- Header shows only logo (no text) for a clean, minimal look

## 🎯 Performance Optimizations

- Next.js Image component for optimized image loading
- Lazy loading for images and maps
- Fast transition durations (0.2s)
- Mobile-specific optimizations (fixed images instead of videos)
- Efficient state management with React hooks
- Touch-optimized interactions for mobile devices

## 📄 License

This project is proprietary and confidential.

---

**Built with ❤️ for Lakeside Inn**
