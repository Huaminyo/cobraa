"use client"

import { useState, useEffect } from "react"

export function GlitchLogo() {
  const [glitch, setGlitch] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true)
      setTimeout(() => setGlitch(false), 200)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative">
      <div
        className={`text-4xl sm:text-6xl font-bold text-terminal-blue transition-all duration-200 ${
          glitch ? "animate-pulse filter blur-sm" : ""
        }`}
      >
        🐍 COBRA
      </div>
      {glitch && (
        <>
          <div className="absolute top-0 left-0 text-4xl sm:text-6xl font-bold text-red-500 opacity-70 transform translate-x-1">
            🐍 COBRA
          </div>
          <div className="absolute top-0 left-0 text-4xl sm:text-6xl font-bold text-blue-500 opacity-70 transform -translate-x-1">
            🐍 COBRA
          </div>
        </>
      )}
      <div className="text-xs sm:text-sm text-terminal-blue/70 mt-2 flex items-center justify-center gap-2">
        PROTOCOL
        <span className="bg-terminal-blue text-black px-2 py-1 text-xs rounded">APE STORE</span>
      </div>
    </div>
  )
}
