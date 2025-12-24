"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"

gsap.registerPlugin(ScrollTrigger)

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const messageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline()

      tl.fromTo(
        overlayRef.current,
        { scaleY: 1 },
        { scaleY: 0, duration: 1.5, ease: "power4.inOut", transformOrigin: "top" },
      )
        .fromTo(
          imageRef.current,
          { scale: 1.3, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1.8, ease: "power3.out" },
          "-=1",
        )
        .fromTo(
          titleRef.current?.querySelectorAll(".char") || [],
          { y: 100, opacity: 0, rotateX: -90 },
          { y: 0, opacity: 1, rotateX: 0, duration: 1, stagger: 0.03, ease: "power3.out" },
          "-=1.2",
        )
        .fromTo(
          subtitleRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
          "-=0.5",
        )
        .fromTo(
          messageRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
          "-=0.3",
        )

      gsap.to(imageRef.current, {
        yPercent: 30,
        scale: 1.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      })

      gsap.to(titleRef.current, {
        y: -100,
        opacity: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "center center",
          end: "bottom top",
          scrub: 1,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const titleText = "PRO TEBE, MAMI"
  const chars = titleText.split("")

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden">
      <div ref={overlayRef} className="absolute inset-0 z-30 bg-background" style={{ transformOrigin: "top" }} />

      <div ref={imageRef} className="absolute inset-0 z-0">
        <Image src="/luxury-natural-handmade-soap-bars-with-dried-flowe.jpg" alt="Luxusní přírodní mýdla" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/10 to-background/60" />
      </div>

      <div className="relative z-20 flex h-full flex-col items-center justify-center px-4">
        <div
          ref={messageRef}
          className="mb-8 rounded-full border border-accent/30 bg-background/60 px-6 py-2 backdrop-blur-sm"
        >
          <span className="text-sm tracking-widest text-accent">Exkluzivní dárek od Studio Vision</span>
        </div>

        <h1
          ref={titleRef}
          className="font-serif text-5xl font-light tracking-[0.2em] text-foreground md:text-7xl lg:text-8xl"
          style={{ perspective: "1000px" }}
        >
          {chars.map((char, i) => (
            <span key={i} className="char inline-block" style={{ transformStyle: "preserve-3d" }}>
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>
        <p ref={subtitleRef} className="mt-8 max-w-md text-center text-base text-muted-foreground md:text-lg">
          Roční profesionální podpora v hodnotě přes 380 000 Kč
        </p>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
          <div className="flex flex-col items-center gap-4">
            <span className="text-xs uppercase tracking-widest text-muted-foreground">Scrolluj a objevuj</span>
            <div className="h-16 w-px bg-gradient-to-b from-accent to-transparent" />
          </div>
        </div>
      </div>
    </section>
  )
}
