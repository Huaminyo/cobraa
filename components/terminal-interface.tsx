"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { X } from "lucide-react"

interface TerminalInterfaceProps {
  isOpen: boolean
  onClose: () => void
}

export function TerminalInterface({ isOpen, onClose }: TerminalInterfaceProps) {
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<string[]>([
    "COBRA PROTOCOL TERMINAL v2.1.0",
    "Type 'help' for available commands",
    "WARNING: Unauthorized access is prohibited",
    "",
  ])
  const [currentPath] = useState("cobra@base:~$")
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  const commands = {
    help: () => [
      "Available commands:",
      "  status    - Show protocol status",
      "  price     - Display $COBRA price",
      "  missions  - List active missions",
      "  apestore  - APE STORE integration info",
      "  social    - Community links",
      "  ai        - COBRA AI assistant info",
      "  strike    - Execute strike simulation",
      "  clear     - Clear terminal",
      "  exit      - Close terminal",
    ],
    status: () => [
      "COBRA PROTOCOL STATUS:",
      "├── Network: BASE ✓",
      "├── APE Store: CONNECTED ✓",
      "├── AI Engine: ACTIVE ✓",
      "├── Strike Mode: READY ✓",
      "└── Holders: 8,432 (+127 today)",
    ],
    price: () => [
      "$COBRA PRICE DATA:",
      "Current: $0.0087 (+127.3%)",
      "24h High: $0.0091",
      "24h Low: $0.0038",
      "Volume: $2.1M",
      "Market Cap: $73.6K",
    ],
    missions: () => [
      "ACTIVE MISSIONS:",
      "[M001] APE STORE LAUNCH - COMPLETE ✓",
      "[M002] BASE NETWORK STRIKES - ACTIVE 🔥",
      "[M003] AUTO-STAKE MISSIONS - ACTIVE 🔥",
      "[M004] x100 STRIKE EXECUTION - LOCKED 🔒",
    ],
    apestore: () => [
      "APE STORE INTEGRATION:",
      "Status: VERIFIED ✓",
      "Deployment: LIVE",
      "Cross-dApp: ENABLED",
      "Auto-updates: ACTIVE",
      "Launch: https://apestore.dev/cobra",
    ],
    social: () => [
      "COBRA PROTOCOL COMMUNITY:",
      "🐦 Twitter: https://twitter.com/CobraProtocol",
      "📱 Telegram: https://t.me/CobraProtocolOfficial",
      "🌐 Website: https://cobraprotocol.xyz",
      "📊 Chart: https://dexscreener.com/base/cobra",
    ],
    ai: () => [
      "COBRA AI ASSISTANT:",
      "Status: ONLINE ✓",
      "Model: GPT-4o via Laozhang API",
      "Capabilities:",
      "  • Market Analysis",
      "  • Trading Strategies",
      "  • DeFi Protocol Insights",
      "  • BASE Network Intelligence",
      "Type 'exit' and click 'COBRA AI' button for full chat interface",
    ],
    strike: () => [
      "INITIATING STRIKE SIMULATION...",
      "Target acquired: 0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
      "Payload: COBRA_STRIKE_v1.0",
      "Execution: SUCCESS ✓",
      "Damage: +1247% portfolio impact",
      "Status: MISSION ACCOMPLISHED 🎯",
    ],
    clear: () => {
      setHistory(["COBRA PROTOCOL TERMINAL v2.1.0", ""])
      return []
    },
    exit: () => {
      onClose()
      return []
    },
  }

  const handleCommand = (cmd: string) => {
    const command = cmd.toLowerCase().trim()
    const output = commands[command as keyof typeof commands]

    if (output) {
      const result = output()
      setHistory((prev) => [...prev, `${currentPath} ${cmd}`, ...result, ""])
    } else if (command === "") {
      setHistory((prev) => [...prev, currentPath, ""])
    } else {
      setHistory((prev) => [
        ...prev,
        `${currentPath} ${cmd}`,
        `Command not found: ${cmd}`,
        "Type 'help' for available commands",
        "",
      ])
    }
    setInput("")
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleCommand(input)
    }
  }

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-black border-2 border-terminal-blue w-full max-w-4xl h-[80vh] flex flex-col">
        {/* Terminal Header */}
        <div className="flex items-center justify-between bg-terminal-blue/10 border-b border-terminal-blue/30 px-4 py-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="ml-4 text-terminal-blue font-mono text-sm">COBRA TERMINAL</span>
          </div>
          <button onClick={onClose} className="text-terminal-blue hover:text-red-400 transition-colors">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Terminal Content */}
        <div ref={terminalRef} className="flex-1 p-4 overflow-y-auto font-mono text-sm text-terminal-blue">
          {history.map((line, index) => (
            <div key={index} className="whitespace-pre-wrap">
              {line}
            </div>
          ))}

          {/* Input Line */}
          <div className="flex items-center">
            <span className="text-terminal-blue mr-2">{currentPath}</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              className="bg-transparent border-none outline-none text-terminal-blue flex-1 font-mono"
              autoComplete="off"
            />
            <span className="animate-pulse">_</span>
          </div>
        </div>
      </div>
    </div>
  )
}
