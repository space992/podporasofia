"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Camera, Globe, MessageCircle, Sparkles } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const months = [
  {
    month: "Leden",
    title: "Základy a refresh webu",
    consultation: "Hluboká analýza, cíle, konkurence",
    photo: "Bestsellery",
    web: "Homepage redesign, popisy, UX",
    price: "28 000–38 000 Kč",
  },
  {
    month: "Únor",
    title: "Valentýnská kampaň",
    consultation: "Strategie promo",
    photo: "Romantické sady",
    web: "Custom banery, landing page",
    price: "25 000–35 000 Kč",
  },
  {
    month: "Březen",
    title: "Jarní novinky",
    consultation: "Sezónní plán",
    photo: "Bylinkové produkty",
    web: "Kategorie, on-page SEO",
    price: "27 000–37 000 Kč",
  },
  {
    month: "Duben",
    title: "Velikonoce",
    consultation: "Tematické promo",
    photo: "Velikonoční dárky",
    web: "Speciální sekce",
    price: "25 000–35 000 Kč",
  },
  {
    month: "Květen",
    title: "Den matek",
    consultation: "Dárkové kampaně",
    photo: "Balíčky",
    web: "Personalizovaná sekce",
    price: "27 000–37 000 Kč",
  },
  {
    month: "Červen",
    title: "Letní start",
    consultation: "Letní sortiment",
    photo: "Osvěžující produkty",
    web: "Content marketing",
    price: "25 000–35 000 Kč",
  },
  {
    month: "Červenec",
    title: "Prázdninový obsah",
    consultation: "Sociální sítě setup",
    photo: "Dovolenkové produkty",
    web: "E-mailing integrace",
    price: "27 000–37 000 Kč",
  },
  {
    month: "Srpen",
    title: "Podzimní příprava",
    consultation: "Vánoční roadmap",
    photo: "Podzimní svíčky",
    web: "Technická optimalizace",
    price: "25 000–35 000 Kč",
  },
  {
    month: "Září",
    title: "Nová sezóna",
    consultation: "Letní bilance",
    photo: "Podzimní novinky",
    web: "Blog/content",
    price: "27 000–37 000 Kč",
  },
  {
    month: "Říjen",
    title: "Podzimní kampaně",
    consultation: "Promo strategie",
    photo: "Sezónní sady",
    web: "Předvánoční SEO",
    price: "25 000–35 000 Kč",
  },
  {
    month: "Listopad",
    title: "Vánoční příprava",
    consultation: "Plná vánoční strategie",
    photo: "Dárkové sady",
    web: "Holiday design webu",
    price: "30 000–40 000 Kč",
  },
  {
    month: "Prosinec",
    title: "Finiš roku",
    consultation: "Roční bilance + 2027 plán",
    photo: "Finální novinky",
    web: "Prodejní analýza",
    price: "28 000–38 000 Kč",
  },
]

export default function MonthlyPlan() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
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

      // Cards stagger animation
      const cards = cardsRef.current?.querySelectorAll(".month-card")
      cards?.forEach((card) => {
        gsap.fromTo(
          card,
          { y: 80, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          },
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const titleText = "12 měsíců péče"
  const chars = titleText.split("")

  return (
    <section ref={sectionRef} id="plan" className="relative min-h-screen bg-muted/30 px-4 py-32 md:px-8 lg:px-16">
      <div ref={headerRef} className="mb-16 overflow-hidden text-center">
        <span className="mb-4 inline-block text-sm uppercase tracking-[0.3em] text-accent">Rok 2026 — Tvůj rok</span>
        <h2 className="font-serif text-5xl font-light tracking-tight md:text-7xl lg:text-8xl">
          {chars.map((char, i) => (
            <span key={i} className="animate-char inline-block">
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          Každý měsíc přináší nové možnosti. Strategické konzultace, profesionální focení a úpravy webu — vše
          naplánované tak, aby tvůj e-shop rostl.
        </p>
      </div>

      {/* Package summary */}
      <div className="mx-auto mb-20 max-w-4xl rounded-3xl border border-accent/20 bg-background p-8 md:p-12">
        <h3 className="mb-8 text-center font-serif text-2xl font-light md:text-3xl">Co získáš každý měsíc</h3>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
              <MessageCircle className="h-7 w-7 text-accent" />
            </div>
            <h4 className="font-medium">Strategická konzultace</h4>
            <p className="mt-2 text-sm text-muted-foreground">1–2 hodiny měsíčně</p>
            <p className="mt-1 text-xs text-accent">hodnota 8–15 000 Kč</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
              <Camera className="h-7 w-7 text-accent" />
            </div>
            <h4 className="font-medium">Produktové focení</h4>
            <p className="mt-2 text-sm text-muted-foreground">5–10 produktů měsíčně</p>
            <p className="mt-1 text-xs text-accent">hodnota 15–25 000 Kč</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
              <Globe className="h-7 w-7 text-accent" />
            </div>
            <h4 className="font-medium">Úpravy webu</h4>
            <p className="mt-2 text-sm text-muted-foreground">5–6 hodin měsíčně</p>
            <p className="mt-1 text-xs text-accent">hodnota 12–20 000 Kč</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
              <Sparkles className="h-7 w-7 text-accent" />
            </div>
            <h4 className="font-medium">Bonus</h4>
            <p className="mt-2 text-sm text-muted-foreground">Neomezené rady, reporting</p>
            <p className="mt-1 text-xs text-accent">k nezaplacení</p>
          </div>
        </div>
      </div>

      {/* Monthly grid */}
      <div ref={cardsRef} className="mx-auto max-w-7xl">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {months.map((item, index) => (
            <div
              key={index}
              className="month-card group relative overflow-hidden rounded-2xl border border-border/50 bg-background p-6 transition-all duration-500 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/5"
            >
              {/* Month number badge */}
              <div className="absolute -right-2 -top-2 flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 font-serif text-lg text-accent">
                {String(index + 1).padStart(2, "0")}
              </div>

              <span className="text-xs font-medium uppercase tracking-widest text-accent">{item.month}</span>
              <h4 className="mt-2 font-serif text-xl font-light">{item.title}</h4>

              <div className="mt-4 space-y-3">
                <div className="flex items-start gap-2">
                  <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-accent/60" />
                  <span className="text-sm text-muted-foreground">{item.consultation}</span>
                </div>
                <div className="flex items-start gap-2">
                  <Camera className="mt-0.5 h-4 w-4 shrink-0 text-accent/60" />
                  <span className="text-sm text-muted-foreground">{item.photo}</span>
                </div>
                <div className="flex items-start gap-2">
                  <Globe className="mt-0.5 h-4 w-4 shrink-0 text-accent/60" />
                  <span className="text-sm text-muted-foreground">{item.web}</span>
                </div>
              </div>

              <div className="mt-6 border-t border-border/50 pt-4">
                <span className="text-xs text-muted-foreground">Agenturní cena:</span>
                <p className="font-medium text-foreground/80">{item.price}</p>
              </div>

              {/* Hover accent line */}
              <div className="absolute bottom-0 left-0 h-1 w-0 bg-accent transition-all duration-500 group-hover:w-full" />
            </div>
          ))}
        </div>
      </div>

      {/* Total value */}
      <div className="mx-auto mt-20 max-w-3xl text-center">
        <div className="rounded-3xl border border-accent/30 bg-gradient-to-br from-accent/5 to-transparent p-12">
          <span className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Celková hodnota balíčku</span>
          <div className="mt-4 font-serif text-6xl font-light text-accent md:text-8xl">380 000+ Kč</div>
          <p className="mt-4 text-lg text-muted-foreground">Reálná cena u profesionální digitální agentury</p>
          <div className="mt-8 inline-flex items-center gap-3 rounded-full bg-accent px-8 py-4 text-accent-foreground">
            <Sparkles className="h-5 w-5" />
            <span className="text-lg font-medium">Pro tebe ZDARMA</span>
          </div>
          <p className="mt-6 text-sm text-muted-foreground">Protože chci vidět Sofiamydla.cz na špičce!</p>
        </div>
      </div>
    </section>
  )
}
