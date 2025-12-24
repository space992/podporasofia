"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    title: "E-shop správa",
    category: "Měsíčně",
    year: "32 000 Kč",
    image: "/ecommerce-website-dashboard-clean-modern-minimal-s.jpg",
    size: "large",
  },
  {
    title: "SEO optimalizace",
    category: "Průběžně",
    year: "15 000 Kč",
    image: "/search-engine-optimization-growth-chart-botanical-.jpg",
    size: "small",
  },
  {
    title: "Marketing",
    category: "Kampaně",
    year: "20 000 Kč",
    image: "/social-media-marketing-feminine-aesthetic-soft-col.jpg",
    size: "small",
  },
  {
    title: "Grafický design",
    category: "Kreativa",
    year: "18 000 Kč",
    image: "/graphic-design-branding-feminine-botanical-elegant.jpg",
    size: "large",
  },
  {
    title: "Technická podpora",
    category: "24/7",
    year: "25 000 Kč",
    image: "/tech-support-customer-service-friendly-feminine-wo.jpg",
    size: "tall",
  },
  {
    title: "Konzultace",
    category: "Strategie",
    year: "12 000 Kč",
    image: "/business-consultation-meeting-feminine-workspace-n.jpg",
    size: "large",
  },
]

export default function ProjectsGrid() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current?.querySelectorAll(".animate-char") || [],
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.02,
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%",
            end: "top 50%",
            scrub: 1,
          },
        },
      )

      const gridItems = sectionRef.current?.querySelectorAll(".project-card")
      gridItems?.forEach((item) => {
        gsap.fromTo(
          item,
          { y: 100, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        )

        const img = item.querySelector(".project-image")
        gsap.set(img, { scale: 1.1 })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const titleText = "Co získáš"
  const chars = titleText.split("")

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-background px-4 py-32 md:px-8 lg:px-16">
      <div ref={headerRef} className="mb-24 overflow-hidden">
        <h2 className="font-serif text-6xl font-light tracking-tight md:text-8xl lg:text-9xl">
          {chars.map((char, i) => (
            <span key={i} className="animate-char inline-block">
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h2>
        <p className="mt-4 max-w-lg text-muted-foreground">
          Kompletní balíček služeb pro rozvoj tvého podnikání. Vše, co potřebuješ pro úspěch Sofiamydla.cz
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <div
            key={index}
            className={`project-card group relative cursor-pointer overflow-hidden rounded-2xl ${
              project.size === "large" ? "md:col-span-2" : project.size === "tall" ? "md:row-span-2" : ""
            }`}
          >
            <div
              className={`relative overflow-hidden ${
                project.size === "large" ? "aspect-video" : project.size === "tall" ? "aspect-[3/4]" : "aspect-square"
              }`}
            >
              <Image
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                fill
                className="project-image object-cover transition-transform duration-700 group-hover:scale-100"
              />
              <div className="absolute inset-0 bg-background/0 transition-colors duration-500 group-hover:bg-background/30" />
            </div>

            <div className="absolute inset-0 flex flex-col justify-end p-6">
              <div className="translate-y-8 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <span className="text-xs uppercase tracking-widest text-accent">{project.category}</span>
                <h3 className="mt-2 font-serif text-2xl font-light md:text-3xl">{project.title}</h3>
                <span className="mt-1 block text-sm font-medium text-accent">{project.year}/měsíc</span>
              </div>
            </div>

            <div className="absolute right-0 top-0 h-0 w-0 border-l-[50px] border-t-[50px] border-l-transparent border-t-accent/0 transition-colors duration-500 group-hover:border-t-accent" />
          </div>
        ))}
      </div>

      <div className="mt-16 flex flex-col items-center justify-center rounded-2xl border border-accent/20 bg-muted/50 p-8 text-center md:p-12">
        <span className="text-sm uppercase tracking-widest text-muted-foreground">Celková hodnota ročně</span>
        <span className="mt-4 font-serif text-5xl font-light text-accent md:text-7xl">380 000+ Kč</span>
        <span className="mt-4 rounded-full bg-accent/10 px-6 py-2 text-sm font-medium text-accent">
          ZDARMA pro tebe
        </span>
      </div>
    </section>
  )
}
