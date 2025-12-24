"use client"

import { useEffect, useState } from "react"
import { gsap } from "gsap"

export default function FloatingNav() {
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  useEffect(() => {
    gsap.to(".floating-nav", {
      y: isVisible ? 0 : -100,
      opacity: isVisible ? 1 : 0,
      duration: 0.4,
      ease: "power2.out",
    })
  }, [isVisible])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <nav className="floating-nav fixed left-1/2 top-8 z-50 -translate-x-1/2">
      <div className="flex items-center gap-2 rounded-full border border-accent/30 bg-background/90 px-6 py-3 shadow-lg shadow-accent/5 backdrop-blur-md">
        <a href="#" className="font-serif text-lg tracking-wider text-accent">
          SV
        </a>

        <div className="mx-4 h-4 w-px bg-border" />

        <div className="flex items-center gap-6 text-xs uppercase tracking-widest text-muted-foreground">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="transition-colors hover:text-accent"
          >
            Dárek
          </button>
          <button onClick={() => scrollToSection("sluzby")} className="transition-colors hover:text-accent">
            Služby
          </button>
          <button onClick={() => scrollToSection("plan")} className="transition-colors hover:text-accent">
            Plán
          </button>
          <button onClick={() => scrollToSection("kontakt")} className="transition-colors hover:text-accent">
            Kontakt
          </button>
        </div>
      </div>
    </nav>
  )
}
