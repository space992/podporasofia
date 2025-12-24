"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"

gsap.registerPlugin(ScrollTrigger)

const galleryImages = [
  {
    src: "/luxury-lavender-soap-bar-with-dried-flowers-soft-p.jpg",
    title: "Levandule",
    category: "Uklidňující",
  },
  {
    src: "/honey-oat-natural-soap-handmade-golden-warm-tones-.jpg",
    title: "Med & Oves",
    category: "Vyživující",
  },
  {
    src: "/rose-petal-soap-pink-romantic-handmade-luxury-femi.jpg",
    title: "Růžové lístky",
    category: "Romantické",
  },
  {
    src: "/eucalyptus-mint-green-soap-natural-fresh-botanical.jpg",
    title: "Eukalyptus",
    category: "Osvěžující",
  },
  {
    src: "/chamomile-calendula-soap-yellow-orange-natural-flo.jpg",
    title: "Heřmánek",
    category: "Jemné",
  },
]

export default function HorizontalGallery() {
  const sectionRef = useRef<HTMLElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const container = containerRef.current
      const scrollWidth = container ? container.scrollWidth - window.innerWidth : 0

      gsap.to(container, {
        x: -scrollWidth,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${scrollWidth}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      })

      gsap.fromTo(
        titleRef.current,
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "top 50%",
            scrub: 1,
          },
        },
      )

      const images = container?.querySelectorAll(".gallery-image")
      images?.forEach((img, i) => {
        gsap.fromTo(
          img,
          { scale: 0.8, opacity: 0.5 },
          {
            scale: 1,
            opacity: 1,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: () => `top+=${i * 300} top`,
              end: () => `top+=${(i + 1) * 300} top`,
              scrub: 1,
            },
          },
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden bg-muted">
      <h2
        ref={titleRef}
        className="absolute left-8 top-1/2 z-10 -translate-y-1/2 font-serif text-7xl font-light tracking-tight text-foreground/10 md:text-[10rem]"
        style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
      >
        Kolekce
      </h2>

      <div ref={containerRef} className="flex h-full items-center gap-8 pl-32 pr-[50vw]">
        {galleryImages.map((image, index) => (
          <div
            key={index}
            className="gallery-image group relative h-[70vh] w-[45vw] flex-shrink-0 overflow-hidden rounded-2xl md:w-[35vw]"
          >
            <div className="relative h-full w-full overflow-hidden rounded-2xl">
              <Image
                src={image.src || "/placeholder.svg"}
                alt={image.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </div>

            <div className="absolute bottom-0 left-0 right-0 translate-y-full p-6 transition-transform duration-500 group-hover:translate-y-0">
              <span className="text-xs uppercase tracking-widest text-accent">{image.category}</span>
              <h3 className="mt-2 font-serif text-3xl font-light">{image.title}</h3>
            </div>

            <span className="absolute right-6 top-6 font-serif text-6xl font-light text-foreground/20">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
        ))}
      </div>

      <div className="absolute bottom-8 left-8 right-8">
        <div className="h-px w-full bg-border">
          <div className="h-full w-0 bg-accent transition-all duration-300" style={{ width: "0%" }} />
        </div>
      </div>
    </section>
  )
}
