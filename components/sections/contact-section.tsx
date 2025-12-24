"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Heart } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            toggleActions: "play none none reverse",
          },
        },
      )

      const links = sectionRef.current?.querySelectorAll(".contact-link")
      gsap.fromTo(
        links || [],
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 50%",
            toggleActions: "play none none reverse",
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="kontakt"
      className="relative flex min-h-screen flex-col items-center justify-center bg-background px-4 py-32"
    >
      <h2 ref={titleRef} className="text-center font-serif text-5xl font-light leading-tight md:text-7xl lg:text-8xl">
        Připravena
        <br />
        <span className="text-accent">začít?</span>
      </h2>

      <p className="contact-link mt-8 max-w-md text-center text-lg text-muted-foreground">
        Stačí se ozvat Studio Vision a oni se o všechno postarají. Tvůj e-shop bude v těch nejlepších rukou.
      </p>

      <a
        href="mailto:info@studiovision.cz"
        className="contact-link group mt-12 flex items-center gap-4 rounded-full border border-accent bg-accent px-8 py-4 text-lg text-accent-foreground transition-all hover:bg-accent/90"
      >
        <span className="font-medium">Kontaktovat Studio Vision</span>
        <svg
          className="h-5 w-5 transition-transform group-hover:translate-x-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </a>

      <div className="contact-link mt-16 text-center">
        <span className="text-sm uppercase tracking-widest text-muted-foreground">Poskytovatel služeb</span>
        <p className="mt-2 font-serif text-2xl">Studio Vision</p>
        <a href="mailto:info@studiovision.cz" className="mt-1 block text-muted-foreground hover:text-accent">
          info@studiovision.cz
        </a>
      </div>

      <div className="contact-link mt-16 max-w-lg rounded-2xl border border-accent/20 bg-accent/5 p-8 text-center">
        <Heart className="mx-auto mb-4 h-8 w-8 text-accent" />
        <p className="font-serif text-lg italic text-muted-foreground">
          „Mami, tohle je pro tebe. Chci, abys viděla, jak moc si vážím všeho, co děláš. Tvoje mýdla si zaslouží být na
          špičce — a já ti s tím pomůžu."
        </p>
        <p className="mt-4 text-sm text-accent">— Tvůj syn</p>
      </div>

      <footer className="absolute bottom-8 left-0 right-0 flex items-center justify-center px-8 text-xs text-muted-foreground">
        <span>S láskou pro Sofiamydla.cz</span>
      </footer>

      {/* Decorative elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-1/4 top-1/2 h-[800px] w-[800px] -translate-y-1/2 rounded-full border border-accent/10" />
        <div className="absolute -right-1/4 top-1/2 h-[600px] w-[600px] -translate-y-1/2 rounded-full border border-accent/5" />
        <div className="absolute -left-1/4 bottom-1/4 h-[400px] w-[400px] rounded-full border border-accent/10" />
      </div>
    </section>
  )
}
