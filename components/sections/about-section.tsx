"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"

gsap.registerPlugin(ScrollTrigger)

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        { clipPath: "inset(0 100% 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 1.5,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            toggleActions: "play none none reverse",
          },
        },
      )

      const textLines = textRef.current?.querySelectorAll(".text-line")
      gsap.fromTo(
        textLines || [],
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        },
      )

      gsap.to(imageRef.current?.querySelector("img") || null, {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-muted px-4 py-32 md:px-8 lg:px-16">
      <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-2 lg:gap-24">
        <div ref={imageRef} className="relative aspect-[3/4] overflow-hidden rounded-2xl">
          <Image
            src="/luxury-natural-handmade-soap-bars-with-dried-flowe.jpg"
            alt="Dárek s láskou"
            fill
            className="object-cover"
          />
        </div>

        <div ref={textRef} className="flex flex-col justify-center">
          <span className="text-line text-sm uppercase tracking-[0.3em] text-accent">Od srdce</span>

          <h2 className="text-line mt-4 font-serif text-4xl font-light leading-tight md:text-5xl lg:text-6xl">
            Mami, tohle je pro tebe
          </h2>

          <div className="mt-8 space-y-6 text-lg leading-relaxed text-muted-foreground">
            <p className="text-line">
              Vím, kolik práce a lásky dáváš do svých mýdel. Každý kousek, který vytvoříš, je malé umělecké dílo. Proto
              chci, abys měla tu nejlepší podporu pro svůj e-shop.
            </p>
            <p className="text-line">
              Studio Vision se o všechno postará. Ty se můžeš soustředit na to, co děláš nejlépe - tvořit krásná
              přírodní mýdla, která lidem přináší radost.
            </p>
            <p className="text-line">Tenhle dárek je moje poděkování za všechno, co pro mě děláš. Mám tě rád.</p>
          </div>

          <div className="text-line mt-12 border-t border-border pt-8">
            <p className="font-serif text-2xl italic text-foreground">S láskou, tvůj syn</p>
          </div>
        </div>
      </div>
    </section>
  )
}
