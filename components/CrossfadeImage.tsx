"use client"

import React, { useEffect, useRef, useState } from 'react'

type Props = React.ImgHTMLAttributes<HTMLImageElement> & {
  src: string
  transitionDuration?: number
}

export default function CrossfadeImage({ src, alt, className = '', transitionDuration = 300, ...rest }: Props) {
  const [current, setCurrent] = useState<string>(src)
  const [next, setNext] = useState<string | null>(null)
  const [showNext, setShowNext] = useState(false)
  const mounted = useRef(false)
  const timeoutRef = useRef<number | null>(null)
  const [effectiveDuration, setEffectiveDuration] = useState<number>(transitionDuration)
  const [isMobile, setIsMobile] = useState<boolean>(false)

  // Reduce the crossfade time on small screens for snappier mobile UX
  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      const mq = window.matchMedia('(max-width: 640px)')
      const adjust = () => {
        const mobile = mq.matches
        setIsMobile(mobile)
        setEffectiveDuration(mobile ? Math.max(80, Math.floor(transitionDuration / 3)) : transitionDuration)
      }
      adjust()
      if (mq.addEventListener) mq.addEventListener('change', adjust)
      else mq.addListener(adjust)
      return () => {
        if (mq.removeEventListener) mq.removeEventListener('change', adjust)
        else mq.removeListener(adjust)
      }
    } catch (e) {}
  }, [transitionDuration])

  useEffect(() => {
    // skip on first render
    if (!mounted.current) {
      mounted.current = true
      setCurrent(src)
      return
    }

    if (src === current) return
    // Simplified: preload and decode the provided src directly (no optimized variants)
    let cancelled = false

    const startTransitionTo = (chosenSrc: string) => {
      if (cancelled) return
      if (isMobile) {
        // On mobile, avoid layered crossfade; swap immediately for snappier UX
        requestAnimationFrame(() => {
          setCurrent(chosenSrc)
          setNext(null)
          setShowNext(false)
        })
        return
      }
      setNext(chosenSrc)
      requestAnimationFrame(() => setShowNext(true))
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current)
      timeoutRef.current = window.setTimeout(() => {
        if (cancelled) return
        setCurrent(chosenSrc)
        setNext(null)
        setShowNext(false)
      }, effectiveDuration)
    }

    ;(async () => {
      try {
        // try to use shared preloader to avoid duplicate decode work
        const { default: preload } = await import('./imagePreloader')
        await preload(src).catch(() => {})
        if (!cancelled) startTransitionTo(src)
      } catch (e) {
        if (!cancelled) startTransitionTo(src)
      }
    })()

    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
      cancelled = true
    }
  }, [src, current, transitionDuration])

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        position: 'relative',
        backgroundImage: `url(${current})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <img
        src={current}
        alt={alt}
        className="object-cover w-full h-full block"
        style={{
          // keep current fully visible until the incoming image finishes fading in
          opacity: 1,
          willChange: 'opacity, transform',
          transform: 'translateZ(0)',
        }}
        {...rest}
      />
      {next && (
        <img
          src={next}
          alt={alt}
          className="absolute inset-0 object-cover w-full h-full block"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            transition: `opacity ${effectiveDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
            opacity: showNext ? 1 : 0,
            willChange: 'opacity',
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
          }}
          {...rest}
        />
      )}
    </div>
  )
}

