"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import HeroSection from "./sections/hero-section"
import HorizontalGallery from "./sections/horizontal-gallery"
import ParallaxShowcase from "./sections/parallax-showcase"
import MonthlyPlan from "./sections/monthly-plan"
import AboutSection from "./sections/about-section"
import ContactSection from "./sections/contact-section"
import ScrollIndicator from "./ui/scroll-indicator"
import FloatingNav from "./ui/floating-nav"

gsap.registerPlugin(ScrollTrigger)

export default function ImmersivePortfolio() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to("body", {
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="relative">
      <FloatingNav />
      <ScrollIndicator />
      <HeroSection />
      <HorizontalGallery />
      <ParallaxShowcase />
      <MonthlyPlan />
      <AboutSection />
      <ContactSection />
    </div>
  )
}
