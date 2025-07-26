"use client"

import type { ReactNode } from "react"

interface TerminalSectionProps {
  title: string
  children: ReactNode
  className?: string
}

export function TerminalSection({ title, children, className = "" }: TerminalSectionProps) {
  return (
    <div className={`border border-terminal-blue/30 bg-black/50 backdrop-blur-sm ${className}`}>
      <div className="border-b border-terminal-blue/30 px-4 py-2 bg-terminal-blue/10">
        <h3 className="text-terminal-blue font-mono text-sm">{title}</h3>
      </div>
      <div className="p-4">{children}</div>
    </div>
  )
}
