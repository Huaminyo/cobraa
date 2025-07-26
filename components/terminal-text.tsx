"use client"

import { useState, useEffect } from "react"

interface TerminalTextProps {
  text: string
  delay?: number
  speed?: number
  onComplete?: () => void
}

export function TerminalText({ text, delay = 0, speed = 50, onComplete }: TerminalTextProps) {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setTimeout(
      () => {
        if (currentIndex < text.length) {
          setDisplayText((prev) => prev + text[currentIndex])
          setCurrentIndex((prev) => prev + 1)
        } else if (onComplete) {
          onComplete()
        }
      },
      currentIndex === 0 ? delay : speed,
    )

    return () => clearTimeout(timer)
  }, [currentIndex, text, delay, speed, onComplete])

  return (
    <span className="font-mono text-blue-400">
      {displayText}
      <span className="animate-pulse">_</span>
    </span>
  )
}
