"use client"

import { useEffect, useState } from "react"

export default function ScrollIndicator() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = (scrollTop / docHeight) * 100
      setProgress(scrollPercent)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="fixed left-0 top-0 z-50 h-1 w-full bg-muted">
      <div className="h-full bg-accent transition-all duration-150 ease-out" style={{ width: `${progress}%` }} />
    </div>
  )
}
