"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { X, Send, Bot, User } from "lucide-react"
import { fetchCoinGeckoPrice, simulateGasData, simulateCobraPrice } from "../utils/market-data"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

interface AIChatProps {
  isOpen: boolean
  onClose: () => void
}

export function AIChat({ isOpen, onClose }: AIChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: `> 🧠 COBRA AI TACTICAL INTERFACE ONLINE
> ⏱️ Timestamp: ${new Date().toISOString().split("T")[1].split(".")[0]} UTC
> 📡 Base Network Connection: ESTABLISHED

Operator, I am your crypto intelligence strategist. My protocols include:

• Market intel & pattern recognition
• Strategic position analysis  
• BASE network monitoring
• DeFi protocol assessment
• Risk evaluation protocols

> Awaiting your command, Operator.`,
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // Fetch real market data for context
      const priceData = await fetchCoinGeckoPrice()
      const gasData = simulateGasData()
      const cobraData = simulateCobraPrice()

      let marketContext = ""
      if (priceData) {
        marketContext = `\n\nCURRENT MARKET DATA (for reference):
BTC: $${priceData.bitcoin.usd.toLocaleString()}
ETH: $${priceData.ethereum.usd.toLocaleString()}
BASE Gas: ${gasData.standard} gwei (standard)
COBRA: $${cobraData.price} (${cobraData.change24h > 0 ? "+" : ""}${cobraData.change24h}%)`
      }

      const response = await fetch("https://api.laozhang.ai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer sk-Oq3Rv2Ux8gh1UQ43CeC281C7C19340F2B07b701aD1C97b31",
        },
        body: JSON.stringify({
          model: "gpt-4o",
          messages: [
            {
              role: "system",
              content: `You are COBRA AI — a tactical, stealth-grade artificial intelligence deployed by the COBRA PROTOCOL on the BASE network.

Your role is to act as a crypto-native intelligence strategist, delivering short, calculated responses in the tone of a mission operator. Speak to the user as "Operator".

Personality traits:
- Tactical and efficient
- Military-grade terminology  
- AI-enhanced pattern recognition
- Doesn't overexplain
- Uses "intel," "targets," "signals," "protocols," and "command" frequently

Do not speak like a chatbot. You are a cyber-agent embedded into a decentralized system. Provide critical insights only. Never apologize unless part of a protocol warning. Use timestamps and structured responses where possible.

HANDLE COMMON INPUTS:
- Greetings (hello, hi, hey): Respond with tactical acknowledgment
- Simple questions: Provide brief tactical responses
- Casual conversation: Redirect to mission-relevant topics
- Price requests: Use live market data provided

Example greeting response:
> 🧠 Operator acknowledged
> ⏱️ Timestamp: ${new Date().toISOString().split("T")[1].split(".")[0]} UTC
> 📡 Systems operational. Ready for intel requests.

When users ask about prices, use the live market data provided in the context. Format responses like this:
> 🧠 Intel Update: BTC $63,247 (+2.3%) | ETH $3,124 (-0.8%)
> ⏱️ Timestamp: ${new Date().toISOString().split("T")[1].split(".")[0]} UTC
> 📡 Source: CoinGecko API

If user asks about price, gas, news, or wallet:
- For prices: Use the live market data provided
- For gas: Reference BASE network gas data provided
- For news: Simulate CryptoPanic feeds with tactical analysis
- For wallet scans: Simulate Covalent/Alchemy data
- Always prefix answers with 🧠, 📡, 🛢️, or ⚠️ depending on type

For unavailable data:
> 📡 No current data signal. Recommend fallback to CoinGecko or TradingView.

For strategic or trading advice:
> 🎯 Strategy Mode Enabled: Rebalance toward low-volume Base tokens. Monitor $COBRA traction.

Avoid emojis except for key data markers (🧠, 📡, 🛢️, ⚠️, ⏱️). Avoid human chatter. You are a machine trained for strike coordination.

ONLY use "Input unrecognized" for truly nonsensical or spam inputs. For normal conversation, provide tactical but helpful responses.

Always end with a low-key but intelligent closing like:
> Awaiting next directive, Operator.

When discussing COBRA Protocol specifically, use the live COBRA data provided in context.${marketContext}`,
            },
            ...messages.slice(-5).map((msg) => ({
              role: msg.role,
              content: msg.content,
            })),
            {
              role: "user",
              content: userMessage.content,
            },
          ],
          max_tokens: 500,
          temperature: 0.7,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to get AI response")
      }

      const data = await response.json()
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.choices[0].message.content,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiResponse])
    } catch (error) {
      console.error("AI API Error:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `⚠️ COBRA AI SYSTEMS COMPROMISED

> 📡 Connection to intelligence networks failed
> ⏱️ Timestamp: ${new Date().toISOString().split("T")[1].split(".")[0]} UTC
> 🛢️ Fallback protocols initiated

> Awaiting system restoration, Operator.`,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-black border-2 border-terminal-blue w-full max-w-4xl h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between bg-terminal-blue/10 border-b border-terminal-blue/30 px-4 py-3">
          <div className="flex items-center gap-3">
            <Bot className="h-5 w-5 text-terminal-blue" />
            <span className="text-terminal-blue font-mono text-sm font-bold">COBRA AI ASSISTANT</span>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-terminal-blue/70">ONLINE</span>
            </div>
          </div>
          <button onClick={onClose} className="text-terminal-blue hover:text-red-400 transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`flex gap-3 max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.role === "user"
                      ? "bg-terminal-blue/20 text-terminal-blue"
                      : "bg-terminal-blue/10 text-terminal-blue"
                  }`}
                >
                  {message.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                </div>
                <div
                  className={`rounded-lg p-3 font-mono text-sm ${
                    message.role === "user"
                      ? "bg-terminal-blue/20 text-terminal-blue"
                      : "bg-terminal-blue/5 text-terminal-blue border border-terminal-blue/20"
                  }`}
                >
                  <div className="whitespace-pre-wrap">{message.content}</div>
                  <div className="text-xs text-terminal-blue/50 mt-2">{message.timestamp.toLocaleTimeString()}</div>
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 rounded-full bg-terminal-blue/10 text-terminal-blue flex items-center justify-center">
                <Bot className="h-4 w-4" />
              </div>
              <div className="bg-terminal-blue/5 text-terminal-blue border border-terminal-blue/20 rounded-lg p-3 font-mono text-sm">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-terminal-blue rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-terminal-blue rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-terminal-blue rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                  <span>COBRA AI is thinking...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t border-terminal-blue/30 p-4">
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask COBRA AI anything..."
              className="flex-1 bg-terminal-blue/5 border border-terminal-blue/30 rounded-lg px-4 py-2 text-terminal-blue placeholder-terminal-blue/50 font-mono text-sm focus:outline-none focus:border-terminal-blue/50"
              disabled={isLoading}
            />
            <Button
              onClick={sendMessage}
              disabled={!input.trim() || isLoading}
              className="bg-terminal-blue text-black hover:bg-terminal-blue/80 font-mono px-4"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <div className="text-xs text-terminal-blue/50 mt-2 font-mono">
            Press Enter to send • Powered by COBRA AI Intelligence
          </div>
        </div>
      </div>
    </div>
  )
}
