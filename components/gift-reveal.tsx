"use client"

import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Gift, Sparkles, Heart, Leaf } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const monthlyPackages = [
  {
    month: "Leden",
    title: "Základy a refresh webu",
    items: ["Hluboká analýza, cíle, konkurence", "Focení bestsellerů", "Homepage redesign, popisy, UX"],
    price: "28 000–38 000 Kč",
  },
  {
    month: "Únor",
    title: "Valentýnská kampaň",
    items: ["Strategie promo", "Romantické sady focení", "Custom banery, landing page"],
    price: "25 000–35 000 Kč",
  },
  {
    month: "Březen",
    title: "Jarní novinky",
    items: ["Sezónní plán", "Bylinkové produkty", "Kategorie, on-page SEO"],
    price: "27 000–37 000 Kč",
  },
  {
    month: "Duben",
    title: "Velikonoce",
    items: ["Tematické promo", "Velikonoční dárky", "Speciální sekce"],
    price: "25 000–35 000 Kč",
  },
  {
    month: "Květen",
    title: "Den matek",
    items: ["Dárkové kampaně", "Balíčky focení", "Personalizovaná sekce"],
    price: "27 000–37 000 Kč",
  },
  {
    month: "Červen",
    title: "Letní start",
    items: ["Letní sortiment", "Osvěžující produkty", "Content marketing"],
    price: "25 000–35 000 Kč",
  },
  {
    month: "Červenec",
    title: "Prázdninový obsah",
    items: ["Sociální sítě setup", "Dovolenkové produkty", "E-mailing integrace"],
    price: "27 000–37 000 Kč",
  },
  {
    month: "Srpen",
    title: "Podzimní příprava",
    items: ["Vánoční roadmap", "Podzimní svíčky", "Technická optimalizace"],
    price: "25 000–35 000 Kč",
  },
  {
    month: "Září",
    title: "Nová sezóna",
    items: ["Letní bilance", "Podzimní novinky", "Blog/content"],
    price: "27 000–37 000 Kč",
  },
  {
    month: "Říjen",
    title: "Podzimní kampaně",
    items: ["Promo strategie", "Sezónní sady", "Předvánoční SEO"],
    price: "25 000–35 000 Kč",
  },
  {
    month: "Listopad",
    title: "Vánoční příprava",
    items: ["Plná vánoční strategie", "Dárkové sady", "Holiday design webu"],
    price: "30 000–40 000 Kč",
  },
  {
    month: "Prosinec",
    title: "Finiš roku",
    items: ["Roční bilance + 2027 plán", "Finální novinky", "Prodejní analýza"],
    price: "28 000–38 000 Kč",
  },
]

export default function GiftReveal() {
  const [isRevealed, setIsRevealed] = useState(false)
  const [showPetals, setShowPetals] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const giftBoxRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const packagesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!heroRef.current) return

    // Initial hero animations
    const tl = gsap.timeline()
    tl.fromTo(".hero-title", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" })
      .fromTo(".hero-subtitle", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, "-=0.6")
      .fromTo(
        ".gift-box-wrapper",
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 1, ease: "elastic.out(1, 0.5)" },
        "-=0.4",
      )
      .fromTo(".reveal-btn", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.3")

    // Floating decorative elements
    gsap.to(".float-leaf", {
      y: -15,
      rotation: 10,
      duration: 3,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      stagger: 0.5,
    })
  }, [])

  useEffect(() => {
    if (!isRevealed || !contentRef.current) return

    setShowPetals(true)

    // Content reveal animations
    const tl = gsap.timeline()

    tl.to(".gift-box-wrapper", {
      scale: 1.1,
      duration: 0.3,
      ease: "power2.in",
    })
      .to(".gift-box-wrapper", {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        ease: "power2.in",
      })
      .fromTo(".reveal-content", { opacity: 0, y: 100 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, "-=0.2")
      .fromTo(
        ".value-badge",
        { opacity: 0, scale: 0.5 },
        { opacity: 1, scale: 1, duration: 0.8, ease: "elastic.out(1, 0.5)" },
        "-=0.5",
      )
      .fromTo(".package-title", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.4")
      .fromTo(".monthly-items", { opacity: 0 }, { opacity: 1, duration: 0.6 }, "-=0.3")

    // Scroll-triggered animations for packages
    setTimeout(() => {
      ScrollTrigger.batch(".package-card", {
        onEnter: (batch) =>
          gsap.fromTo(
            batch,
            { opacity: 0, y: 60, scale: 0.95 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              stagger: 0.15,
              ease: "power3.out",
            },
          ),
        start: "top 85%",
      })
    }, 1000)

    setTimeout(() => setShowPetals(false), 5000)
  }, [isRevealed])

  const handleReveal = () => {
    setIsRevealed(true)
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-background relative">
      {/* Falling petals effect */}
      {showPetals && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-petal text-primary/40"
              style={{
                left: `${Math.random() * 100}%`,
                animationDuration: `${4 + Math.random() * 4}s`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            >
              {i % 2 === 0 ? <Leaf size={20} /> : <Heart size={16} />}
            </div>
          ))}
        </div>
      )}

      {/* Decorative background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-[var(--blush)] rounded-full blur-3xl opacity-40" />

        {/* Floating botanical elements */}
        <Leaf className="float-leaf absolute top-32 right-20 text-primary/20" size={40} />
        <Leaf className="float-leaf absolute top-64 left-16 text-primary/15 rotate-45" size={30} />
        <Leaf className="float-leaf absolute bottom-32 right-32 text-primary/20 -rotate-30" size={35} />
      </div>

      {/* Hero Section */}
      <section ref={heroRef} className="min-h-screen flex flex-col items-center justify-center px-6 relative">
        {/* Logo */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2">
          <h1 className="font-serif text-2xl md:text-3xl tracking-widest text-foreground/80">Studio Vision</h1>
        </div>

        <div className="text-center max-w-4xl mx-auto">
          <p className="hero-subtitle font-serif text-lg md:text-xl text-muted-foreground mb-6 tracking-wide opacity-0">
            Máte exkluzivní dárek od
          </p>
          <h2 className="hero-title font-serif text-4xl md:text-6xl lg:text-7xl text-foreground mb-8 tracking-tight opacity-0 text-balance">
            Studio Vision
          </h2>

          {!isRevealed && (
            <>
              <div className="gift-box-wrapper mb-10 opacity-0">
                <div
                  ref={giftBoxRef}
                  className="relative w-40 h-40 md:w-56 md:h-56 mx-auto cursor-pointer group"
                  onClick={handleReveal}
                >
                  {/* Gift box */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--sage-light)] to-primary/20 rounded-2xl shadow-2xl shadow-primary/10 group-hover:shadow-primary/20 transition-shadow duration-500">
                    {/* Ribbon horizontal */}
                    <div className="absolute top-1/2 left-0 right-0 h-4 md:h-6 bg-accent -translate-y-1/2" />
                    {/* Ribbon vertical */}
                    <div className="absolute top-0 bottom-0 left-1/2 w-4 md:w-6 bg-accent -translate-x-1/2" />
                    {/* Bow */}
                    <div className="absolute -top-4 md:-top-6 left-1/2 -translate-x-1/2 flex gap-1">
                      <div className="w-8 h-8 md:w-12 md:h-12 bg-accent rounded-full transform -rotate-45 origin-bottom-right" />
                      <div className="w-8 h-8 md:w-12 md:h-12 bg-accent rounded-full transform rotate-45 origin-bottom-left" />
                    </div>
                  </div>
                  {/* Sparkle effects */}
                  <Sparkles className="absolute -top-2 -right-2 text-accent animate-pulse" size={24} />
                  <Sparkles className="absolute -bottom-2 -left-2 text-accent animate-pulse delay-300" size={20} />
                </div>
              </div>

              <p className="text-muted-foreground mb-8 font-light text-lg">
                Roční profesionální podpora v hodnotě přes <span className="font-semibold text-accent">380 000 Kč</span>{" "}
                - ZDARMA
              </p>

              <button
                onClick={handleReveal}
                className="reveal-btn opacity-0 inline-flex items-center gap-3 px-10 py-4 bg-primary text-primary-foreground font-serif text-lg tracking-wide rounded-full hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:scale-105"
              >
                <Gift size={22} />
                Odhalit dárek
              </button>
            </>
          )}
        </div>
      </section>

      {/* Revealed Content */}
      {isRevealed && (
        <div ref={contentRef} className="reveal-content opacity-0">
          {/* Main Gift Announcement */}
          <section className="py-20 px-6">
            <div className="max-w-4xl mx-auto text-center">
              <div className="value-badge opacity-0 inline-flex items-center gap-2 px-6 py-3 bg-accent/10 rounded-full mb-8">
                <Sparkles className="text-accent" size={20} />
                <span className="font-serif text-accent text-lg">Reálná hodnota přes 380 000 Kč</span>
                <Sparkles className="text-accent" size={20} />
              </div>

              <h3 className="package-title opacity-0 font-serif text-3xl md:text-5xl text-foreground mb-6 text-balance">
                12 měsíců exkluzivní profesionální podpory
              </h3>
              <p className="package-title opacity-0 text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-4">
                pro <span className="font-semibold text-primary">Sofiamydla.cz</span> od digitální agentury Studio
                Vision
              </p>

              {/* Monthly inclusions */}
              <div className="monthly-items opacity-0 mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                <div className="p-6 bg-card rounded-2xl border border-border/50 shadow-sm">
                  <div className="w-12 h-12 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="font-serif text-primary text-xl">1×</span>
                  </div>
                  <h4 className="font-serif text-lg text-foreground mb-2">Strategická konzultace</h4>
                  <p className="text-sm text-muted-foreground">1–2 hodiny měsíčně</p>
                </div>
                <div className="p-6 bg-card rounded-2xl border border-border/50 shadow-sm">
                  <div className="w-12 h-12 mx-auto mb-4 bg-accent/10 rounded-full flex items-center justify-center">
                    <span className="font-serif text-accent text-xl">1×</span>
                  </div>
                  <h4 className="font-serif text-lg text-foreground mb-2">Produktové focení</h4>
                  <p className="text-sm text-muted-foreground">5–10 produktů s retuší</p>
                </div>
                <div className="p-6 bg-card rounded-2xl border border-border/50 shadow-sm">
                  <div className="w-12 h-12 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="font-serif text-primary text-xl">5–6h</span>
                  </div>
                  <h4 className="font-serif text-lg text-foreground mb-2">Úpravy webu</h4>
                  <p className="text-sm text-muted-foreground">Design, SEO, technika</p>
                </div>
              </div>
            </div>
          </section>

          {/* Monthly Packages Timeline */}
          <section ref={packagesRef} className="py-20 px-6 bg-muted/30">
            <div className="max-w-6xl mx-auto">
              <h4 className="font-serif text-2xl md:text-3xl text-center text-foreground mb-4">
                Rozplánování na 12 měsíců
              </h4>
              <p className="text-center text-muted-foreground mb-16">leden – prosinec 2026</p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {monthlyPackages.map((pkg, index) => (
                  <div
                    key={pkg.month}
                    className="package-card opacity-0 bg-card p-6 rounded-2xl border border-border/50 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300 group"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-serif text-2xl text-primary">{pkg.month}</span>
                      <span className="text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full">
                        {index + 1}/12
                      </span>
                    </div>
                    <h5 className="font-serif text-lg text-foreground mb-3 group-hover:text-primary transition-colors">
                      {pkg.title}
                    </h5>
                    <ul className="space-y-2 mb-4">
                      {pkg.items.map((item, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                          <Leaf className="w-3 h-3 text-primary/60 mt-1.5 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <div className="pt-4 border-t border-border/50">
                      <p className="text-xs text-muted-foreground">Reálná cena v agentuře:</p>
                      <p className="font-serif text-accent">{pkg.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Bonus Section */}
          <section className="py-20 px-6">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full mb-6">
                <Heart className="text-accent" size={16} />
                <span className="text-sm font-medium text-accent">Bonus</span>
              </div>
              <h4 className="font-serif text-2xl md:text-3xl text-foreground mb-4">Neomezené rady a reporting</h4>
              <p className="text-muted-foreground text-lg">
                Kdykoliv se na mě můžete obrátit s dotazy. Pravidelný reporting vám ukáže, jak roste váš byznys.
              </p>
            </div>
          </section>

          {/* Final Message */}
          <section className="py-24 px-6 bg-gradient-to-b from-transparent to-muted/50">
            <div className="max-w-2xl mx-auto text-center">
              <Leaf className="w-12 h-12 mx-auto text-primary/40 mb-8" />
              <p className="font-serif text-xl md:text-2xl text-foreground/80 italic leading-relaxed mb-8">
                „Tento dárek jsem pro tebe připravila, protože chci vidět Sofiamydla.cz na špičce!"
              </p>
              <p className="text-muted-foreground">
                S láskou, <span className="font-serif text-primary">Studio Vision</span>
              </p>
              <Heart className="w-6 h-6 mx-auto text-accent/60 mt-6" />
            </div>
          </section>

          {/* Footer */}
          <footer className="py-8 px-6 border-t border-border/50">
            <div className="max-w-6xl mx-auto text-center">
              <p className="font-serif text-lg text-foreground/60 tracking-widest">Studio Vision</p>
              <p className="text-sm text-muted-foreground mt-2">Digitální agentura s osobním přístupem</p>
            </div>
          </footer>
        </div>
      )}
    </div>
  )
}
