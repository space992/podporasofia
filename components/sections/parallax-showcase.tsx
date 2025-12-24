"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"

gsap.registerPlugin(ScrollTrigger)

const showcaseItems = [
  {
    title: "Konzultace",
    subtitle: "1–2 hodiny měsíčně",
    description:
      "Hluboká analýza, marketingová strategie a prodejní plán. Společně nastavíme směr pro úspěch tvého e-shopu.",
    image: "/woman-entrepreneur-working-laptop-natural-light-co.jpg",
    value: "8 000–15 000 Kč/měsíc",
  },
  {
    title: "Focení",
    subtitle: "5–10 produktů měsíčně",
    description:
      "Profesionální produktové focení v ateliéru i lifestyle setup. Včetně pokročilé retuše pro dokonalý vzhled.",
    image: "/business-growth-chart-success-flowers-botanical-na.jpg",
    value: "15 000–25 000 Kč/měsíc",
  },
  {
    title: "Web & E-shop",
    subtitle: "5–6 hodin měsíčně",
    description:
      "Designové vylepšení, SEO optimalizace, nový obsah a technická údržba. Tvůj e-shop bude vždy na špičce.",
    image: "/hands-caring-for-plants-growth-nurturing-botanical.jpg",
    value: "12 000–20 000 Kč/měsíc",
  },
]

export default function ParallaxShowcase() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = sectionRef.current?.querySelectorAll(".showcase-item")

      items?.forEach((item, index) => {
        const image = item.querySelector(".showcase-image")
        const title = item.querySelector(".showcase-title")
        const desc = item.querySelector(".showcase-desc")
        const overlay = item.querySelector(".showcase-overlay")

        ScrollTrigger.create({
          trigger: item,
          start: "top top",
          end: "+=100%",
          pin: true,
          pinSpacing: index === items.length - 1,
        })

        gsap.fromTo(
          image,
          { scale: 1.2, y: 100 },
          {
            scale: 1,
            y: -100,
            ease: "none",
            scrollTrigger: {
              trigger: item,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          },
        )

        gsap.fromTo(
          overlay,
          { scaleX: 1 },
          {
            scaleX: 0,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: item,
              start: "top 80%",
              end: "top 20%",
              scrub: 1,
            },
          },
        )

        gsap.fromTo(
          title,
          { x: -100, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            scrollTrigger: {
              trigger: item,
              start: "top 60%",
              end: "top 30%",
              scrub: 1,
            },
          },
        )

        gsap.fromTo(
          desc,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            scrollTrigger: {
              trigger: item,
              start: "top 50%",
              end: "top 20%",
              scrub: 1,
            },
          },
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="sluzby">
      {showcaseItems.map((item, index) => (
        <div key={index} className="showcase-item relative h-screen w-full overflow-hidden">
          <div className="showcase-image absolute inset-0">
            <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
          </div>

          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-transparent" />

          <div className="showcase-overlay absolute inset-0 z-10 bg-background" style={{ transformOrigin: "right" }} />

          <div className="showcase-content relative z-20 flex h-full flex-col justify-center px-8 md:px-16 lg:px-24">
            <span className="text-sm uppercase tracking-[0.3em] text-accent">
              {String(index + 1).padStart(2, "0")} / {String(showcaseItems.length).padStart(2, "0")}
            </span>
            <h2 className="showcase-title mt-4 font-serif text-6xl font-light tracking-tight md:text-8xl lg:text-9xl">
              {item.title}
            </h2>
            <p className="mt-2 text-lg font-medium text-accent">{item.subtitle}</p>
            <p className="showcase-desc mt-6 max-w-md text-lg text-muted-foreground">{item.description}</p>

            <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-accent/30 bg-accent/10 px-6 py-3">
              <span className="text-sm text-muted-foreground">Agenturní hodnota:</span>
              <span className="font-medium text-accent">{item.value}</span>
            </div>
          </div>

          <div className="absolute bottom-8 right-8 hidden text-right md:block">
            <div className="font-serif text-[10rem] font-light leading-none text-foreground/5">
              {String(index + 1).padStart(2, "0")}
            </div>
          </div>
        </div>
      ))}
    </section>
  )
}
