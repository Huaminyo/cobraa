"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { TerminalText } from "./components/terminal-text"
import { GlitchLogo } from "./components/glitch-logo"
import { TerminalSection } from "./components/terminal-section"
import { MissionLog } from "./components/mission-log"
import { ExternalLink, Shield, Zap, Brain, Target, DollarSign, Bot } from "lucide-react"
import { TerminalInterface } from "./components/terminal-interface"
import { AIChat } from "./components/ai-chat"

export default function CobraProtocol() {
  const [bootComplete, setBootComplete] = useState(false)
  const [currentBootStep, setCurrentBootStep] = useState(0)
  const [soundEnabled, setSoundEnabled] = useState(false)
  const [showTerminal, setShowTerminal] = useState(false)
  const [showAIChat, setShowAIChat] = useState(false)

  const bootSequence = [
    "> INITIATING COBRA PROTOCOL...",
    "> CONNECTING TO BASE...",
    "> LOADING APE STORE NODE...",
    "> AI ENGAGED",
    "> x100 STRIKE READY",
  ]

  useEffect(() => {
    const timer = setTimeout(() => {
      setBootComplete(true)
    }, 8000)

    return () => clearTimeout(timer)
  }, [])

  const handleBootStepComplete = () => {
    if (currentBootStep < bootSequence.length - 1) {
      setCurrentBootStep((prev) => prev + 1)
    }
  }

  return (
    <div className="min-h-screen bg-black text-terminal-blue font-mono overflow-x-hidden">
      {/* Scanlines Effect */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-terminal-blue/5 to-transparent animate-pulse"></div>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 191, 255, 0.03) 2px, rgba(0, 191, 255, 0.03) 4px)",
          }}
        ></div>
      </div>

      {/* Hero Section - Terminal Boot */}
      <section className="min-h-screen flex items-center justify-center relative px-4">
        <div className="text-center space-y-4 sm:space-y-8 z-10 w-full max-w-4xl">
          {!bootComplete ? (
            <div className="space-y-2 sm:space-y-4">
              {bootSequence.slice(0, currentBootStep + 1).map((step, index) => (
                <div key={index} className="text-terminal-blue text-sm sm:text-xl">
                  {index === currentBootStep ? (
                    <TerminalText text={step} speed={100} onComplete={handleBootStepComplete} />
                  ) : (
                    <span>{step}</span>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4 sm:space-y-8 animate-fade-in">
              <GlitchLogo />

              <div className="text-lg sm:text-2xl text-terminal-blue/80 px-4">
                <TerminalText text="Deployed on APE STORE. Trained to Strike on BASE." speed={80} />
              </div>

              <div className="flex flex-col gap-3 sm:gap-4 justify-center px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <Button className="bg-terminal-blue text-black hover:bg-terminal-blue/80 font-mono text-sm" size="lg">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    LAUNCH APE STORE
                  </Button>
                  <Button
                    variant="outline"
                    className="border-terminal-blue text-terminal-blue hover:bg-terminal-blue/10 font-mono bg-transparent text-sm"
                    size="lg"
                  >
                    READ DOSSIER
                  </Button>
                  <Button
                    variant="outline"
                    className="border-terminal-blue text-terminal-blue hover:bg-terminal-blue/10 font-mono bg-transparent text-sm"
                    size="lg"
                    onClick={() => setShowTerminal(true)}
                  >
                    ENTER TERMINAL
                  </Button>
                  <Button
                    variant="outline"
                    className="border-terminal-blue text-terminal-blue hover:bg-terminal-blue/10 font-mono bg-transparent text-sm"
                    size="lg"
                    onClick={() => setShowAIChat(true)}
                  >
                    <Bot className="mr-2 h-4 w-4" />
                    COBRA AI
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {bootComplete && (
        <>
          {/* AI Engine Overview */}
          <section className="py-10 sm:py-20 px-4 max-w-7xl mx-auto">
            <TerminalSection title="COBRA INTEL MODULE v1.0" className="mb-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="text-terminal-blue font-mono text-lg mb-4">SYSTEM READOUTS:</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>AI Strike Simulations:</span>
                      <span className="text-blue-400">ACTIVE</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Ape Store Interaction Logs:</span>
                      <span className="text-blue-400">MONITORING</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Adaptive Response Protocol:</span>
                      <span className="text-yellow-400">LEARNING</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Network Penetration:</span>
                      <span className="text-blue-400">87.3%</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="text-terminal-blue font-mono text-lg mb-4">APE STORE INTEGRATION:</h4>
                  <div className="space-y-2 text-sm">
                    <div>• Dynamic pricing algorithms</div>
                    <div>• Auto-propagation across dApp layer</div>
                    <div>• Cross-platform compatibility</div>
                    <div>• Real-time user access graph</div>
                  </div>
                </div>
              </div>
            </TerminalSection>
          </section>

          {/* About Section */}
          <section className="py-10 sm:py-20 px-4 max-w-7xl mx-auto">
            <TerminalSection title="CLASSIFIED DOSSIER - ABOUT COBRA PROTOCOL">
              <div className="space-y-8">
                {/* Mission Brief */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-terminal-blue font-mono text-lg mb-4 flex items-center gap-2">
                        <Shield className="h-5 w-5" />
                        MISSION BRIEF
                      </h4>
                      <p className="text-terminal-blue/80 text-sm leading-relaxed">
                        COBRA PROTOCOL is an AI-native cryptocurrency deployed on the BASE network through APE STORE
                        infrastructure. Our mission: Deploy stealth-grade intelligence systems across decentralized
                        networks to execute precision strikes in the DeFi ecosystem.
                      </p>
                    </div>

                    <div>
                      <h4 className="text-terminal-blue font-mono text-lg mb-4 flex items-center gap-2">
                        <Target className="h-5 w-5" />
                        TACTICAL OBJECTIVES
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-start gap-2">
                          <span className="text-terminal-blue/60">•</span>
                          <span className="text-terminal-blue/80">Establish autonomous yield generation protocols</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-terminal-blue/60">•</span>
                          <span className="text-terminal-blue/80">Deploy AI-powered market intelligence systems</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-terminal-blue/60">•</span>
                          <span className="text-terminal-blue/80">
                            Execute cross-platform integration via APE STORE
                          </span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-terminal-blue/60">•</span>
                          <span className="text-terminal-blue/80">
                            Maintain operational security across BASE network
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-terminal-blue font-mono text-lg mb-4 flex items-center gap-2">
                        <Brain className="h-5 w-5" />
                        TECHNOLOGY STACK
                      </h4>
                      <div className="border border-terminal-blue/30 p-4 bg-terminal-blue/5">
                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between">
                            <span>Blockchain:</span>
                            <span className="text-blue-400">BASE Network</span>
                          </div>
                          <div className="flex justify-between">
                            <span>AI Engine:</span>
                            <span className="text-blue-400">GPT-4o Integration</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Distribution:</span>
                            <span className="text-blue-400">APE STORE</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Protocol Type:</span>
                            <span className="text-blue-400">ERC-20 + AI Layer</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Security Level:</span>
                            <span className="text-yellow-400">CLASSIFIED</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-terminal-blue font-mono text-lg mb-4 flex items-center gap-2">
                        <Zap className="h-5 w-5" />
                        OPERATIONAL STATUS
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                          <span>Phase 1: APE STORE Deployment - COMPLETE</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                          <span>Phase 2: AI Integration - ACTIVE</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                          <span>Phase 3: Auto-Stake Protocol - IN PROGRESS</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                          <span>Phase 4: x100 Strike Mode - LOCKED</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Team Section */}
                <div className="border-t border-terminal-blue/30 pt-8">
                  <h4 className="text-terminal-blue font-mono text-lg mb-6 text-center">COMMAND STRUCTURE</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="border border-terminal-blue/30 p-4 bg-terminal-blue/5 text-center">
                      <div className="text-2xl mb-2">🐍</div>
                      <h5 className="text-terminal-blue font-mono text-sm mb-2">COBRA AI</h5>
                      <p className="text-terminal-blue/70 text-xs">Tactical Intelligence Officer</p>
                      <div className="mt-2 text-xs text-blue-400">STATUS: ONLINE</div>
                    </div>
                    <div className="border border-terminal-blue/30 p-4 bg-terminal-blue/5 text-center">
                      <div className="text-2xl mb-2">⚡</div>
                      <h5 className="text-terminal-blue font-mono text-sm mb-2">BASE NETWORK</h5>
                      <p className="text-terminal-blue/70 text-xs">Infrastructure Command</p>
                      <div className="mt-2 text-xs text-blue-400">STATUS: OPERATIONAL</div>
                    </div>
                    <div className="border border-terminal-blue/30 p-4 bg-terminal-blue/5 text-center">
                      <div className="text-2xl mb-2">🍌</div>
                      <h5 className="text-terminal-blue font-mono text-sm mb-2">APE STORE</h5>
                      <p className="text-terminal-blue/70 text-xs">Distribution Network</p>
                      <div className="mt-2 text-xs text-blue-400">STATUS: CONNECTED</div>
                    </div>
                  </div>
                </div>

                {/* Tokenomics */}
                <div className="border-t border-terminal-blue/30 pt-8">
                  <h4 className="text-terminal-blue font-mono text-lg mb-6 text-center">ASSET ALLOCATION</h4>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h5 className="text-terminal-blue font-mono text-base mb-4">TOKEN DISTRIBUTION</h5>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Community Operations</span>
                          <div className="flex items-center gap-2">
                            <div className="w-20 h-2 bg-terminal-blue/20 rounded">
                              <div className="w-3/5 h-full bg-terminal-blue rounded"></div>
                            </div>
                            <span className="text-xs text-terminal-blue">60%</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Liquidity Pool</span>
                          <div className="flex items-center gap-2">
                            <div className="w-20 h-2 bg-terminal-blue/20 rounded">
                              <div className="w-1/4 h-full bg-blue-400 rounded"></div>
                            </div>
                            <span className="text-xs text-terminal-blue">25%</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Development Fund</span>
                          <div className="flex items-center gap-2">
                            <div className="w-20 h-2 bg-terminal-blue/20 rounded">
                              <div className="w-1/5 h-full bg-yellow-400 rounded"></div>
                            </div>
                            <span className="text-xs text-terminal-blue">10%</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Strategic Reserve</span>
                          <div className="flex items-center gap-2">
                            <div className="w-20 h-2 bg-terminal-blue/20 rounded">
                              <div className="w-1/20 h-full bg-red-400 rounded"></div>
                            </div>
                            <span className="text-xs text-terminal-blue">5%</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h5 className="text-terminal-blue font-mono text-base mb-4">PROTOCOL METRICS</h5>
                      <div className="border border-terminal-blue/30 p-4 bg-terminal-blue/5">
                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between">
                            <span>Total Supply:</span>
                            <span className="text-terminal-blue">1,000,000,000 $COBRA</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Contract Address:</span>
                            <span className="text-terminal-blue text-xs">0x...CLASSIFIED</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Launch Date:</span>
                            <span className="text-terminal-blue">2024 Q4</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Security Audit:</span>
                            <span className="text-blue-400">VERIFIED ✓</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Call to Action */}
                <div className="border-t border-terminal-blue/30 pt-8 text-center">
                  <div className="space-y-4">
                    <h4 className="text-terminal-blue font-mono text-xl">JOIN THE COBRA PROTOCOL</h4>
                    <p className="text-terminal-blue/80 text-sm max-w-2xl mx-auto">
                      Ready to deploy with the most advanced AI-native crypto protocol on BASE? Join thousands of
                      operators already executing tactical strikes across the DeFi battlefield.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button className="bg-terminal-blue text-black hover:bg-terminal-blue/80 font-mono">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        DEPLOY VIA APE STORE
                      </Button>
                      <Button
                        variant="outline"
                        className="border-terminal-blue text-terminal-blue hover:bg-terminal-blue/10 font-mono bg-transparent"
                        onClick={() => setShowAIChat(true)}
                      >
                        <Bot className="mr-2 h-4 w-4" />
                        CONSULT COBRA AI
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </TerminalSection>
          </section>

          {/* Token Utility */}
          <section className="py-10 sm:py-20 px-4 max-w-7xl mx-auto">
            <TerminalSection title="$COBRA TOKEN ARSENAL">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
                {[
                  { icon: Shield, title: "Auto-Stake Protocol", desc: "Autonomous yield generation" },
                  { icon: Target, title: "Smart Attack Detection", desc: "AI-powered threat analysis" },
                  { icon: Zap, title: "Ape Store Compatible", desc: "Seamless ecosystem integration" },
                  { icon: Brain, title: "AI-Powered Farming", desc: "Intelligent reward optimization" },
                ].map((feature, index) => (
                  <Card key={index} className="bg-black/50 border-terminal-blue/30">
                    <CardContent className="p-4 text-center">
                      <feature.icon className="h-8 w-8 text-terminal-blue mx-auto mb-3" />
                      <h4 className="text-terminal-blue font-mono text-sm mb-2">{feature.title}</h4>
                      <p className="text-terminal-blue/70 text-xs">{feature.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="text-center">
                <blockquote className="text-xl text-terminal-blue/80 italic">
                  "This isn't just a token. It's a decentralized weapon system."
                </blockquote>
              </div>
            </TerminalSection>
          </section>

          {/* APE STORE Integration */}
          <section className="py-10 sm:py-20 px-4 max-w-7xl mx-auto">
            <TerminalSection title="APE STORE NODE LINKED" className="mb-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-center">
                <div className="space-y-4">
                  <p className="text-terminal-blue/80">
                    COBRA is live on APE STORE — bringing stealth-grade intelligence into the most accessible dApp layer
                    on BASE.
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                      <span>Verified Launchpad Status</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                      <span>Cross-dApp Integration Active</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                      <span>Real-time Price Feeds</span>
                    </div>
                  </div>
                  <Button className="bg-terminal-blue text-black hover:bg-terminal-blue/80 font-mono">
                    <DollarSign className="mr-2 h-4 w-4" />
                    DEPLOY COBRA VIA APE STORE
                  </Button>
                </div>
                <div className="border border-terminal-blue/30 p-6 bg-terminal-blue/5">
                  <div className="text-center space-y-4">
                    <div className="flex justify-center">
                      <img src="/images/ape-banana.png" alt="APE STORE" className="w-16 h-16" />
                    </div>
                    <div className="text-terminal-blue font-mono">APE STORE WIDGET</div>
                    <div className="text-sm text-terminal-blue/70">[COBRA Protocol Integration Active]</div>
                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div>Price: $0.0087</div>
                      <div>24h: +127.3%</div>
                      <div>Volume: $2.1M</div>
                      <div>Holders: 8,432</div>
                    </div>
                  </div>
                </div>
              </div>
            </TerminalSection>
          </section>

          {/* Mission Roadmap */}
          <section className="py-10 sm:py-20 px-4 max-w-7xl mx-auto">
            <TerminalSection title="ENCRYPTED MISSION LOGS">
              <MissionLog />
            </TerminalSection>
          </section>

          {/* Community Section */}
          <section className="py-10 sm:py-20 px-4 max-w-7xl mx-auto">
            <TerminalSection title="COBRA COMMUNITY CHANNELS">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                <div className="space-y-6">
                  <div className="border border-terminal-blue/30 p-6 bg-terminal-blue/5 hover:bg-terminal-blue/10 transition-colors">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12">
                        <img src="/images/twitter-icon.png" alt="X (Twitter)" className="w-full h-full" />
                      </div>
                      <div>
                        <h4 className="text-terminal-blue font-mono text-lg">X COMMAND CENTER</h4>
                        <p className="text-terminal-blue/70 text-sm">Real-time intel & strike updates</p>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm font-mono">
                      <div>• Live mission broadcasts</div>
                      <div>• Community strike coordination</div>
                      <div>• Alpha intelligence drops</div>
                    </div>
                    <Button
                      className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-mono"
                      onClick={() => window.open("https://x.com/CobraProtocol_", "_blank")}
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      FOLLOW @COBRAPROTOCOL_
                    </Button>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="border border-terminal-blue/30 p-6 bg-terminal-blue/5 hover:bg-terminal-blue/10 transition-colors">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12">
                        <img src="/images/telegram-icon.webp" alt="Telegram" className="w-full h-full" />
                      </div>
                      <div>
                        <h4 className="text-terminal-blue font-mono text-lg">TELEGRAM PORTAL</h4>
                        <p className="text-terminal-blue/70 text-sm">Encrypted comms & strategy</p>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm font-mono">
                      <div>• 24/7 community support</div>
                      <div>• Exclusive alpha channels</div>
                      <div>• Direct dev communication</div>
                    </div>
                    <Button
                      className="mt-4 bg-blue-400 hover:bg-blue-500 text-white font-mono"
                      onClick={() => window.open("https://t.me/cobraprotocolportal", "_blank")}
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      JOIN PORTAL
                    </Button>
                  </div>
                </div>
              </div>
            </TerminalSection>
          </section>

          {/* Footer */}
          <footer className="py-12 px-4 border-t border-terminal-blue/30">
            <div className="max-w-7xl mx-auto">
              <div className="text-center space-y-4 sm:space-y-6">
                <div className="font-mono text-xs text-terminal-blue/60">
                  <pre className="hidden sm:block">{`
_______________
/               \\
/    🐍 COBRA     \\
/    PROTOCOL      \\
/____________________\\
                `}</pre>
                  <div className="sm:hidden text-terminal-blue text-2xl">🐍 COBRA PROTOCOL</div>
                </div>

                <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 items-center">
                  <div className="flex items-center gap-2 flex-wrap justify-center">
                    <span className="bg-terminal-blue text-black px-2 py-1 text-xs rounded">APE STORE</span>
                    <span className="bg-blue-500 text-white px-2 py-1 text-xs rounded">BASE</span>
                    <span className="bg-terminal-blue text-black px-2 py-1 text-xs rounded">COBRA</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => window.open("https://x.com/CobraProtocol_", "_blank")}
                      className="text-terminal-blue/70 hover:text-terminal-blue transition-colors flex items-center gap-2"
                    >
                      <img src="/images/twitter-icon.png" alt="X" className="w-4 h-4" />
                      <span className="hidden sm:inline">X</span>
                    </button>
                    <button
                      onClick={() => window.open("https://t.me/cobraprotocolportal", "_blank")}
                      className="text-terminal-blue/70 hover:text-terminal-blue transition-colors flex items-center gap-2"
                    >
                      <img src="/images/telegram-icon.webp" alt="Telegram" className="w-4 h-4" />
                      <span className="hidden sm:inline">Telegram</span>
                    </button>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 text-xs sm:text-sm">
                  <button
                    onClick={() => setSoundEnabled(!soundEnabled)}
                    className={`px-3 py-1 border border-terminal-blue/30 ${soundEnabled ? "bg-terminal-blue/20" : ""}`}
                  >
                    Sound: {soundEnabled ? "ON" : "OFF"}
                  </button>
                  <button className="px-3 py-1 border border-terminal-blue/30">Terminal</button>
                  <button className="px-3 py-1 border border-terminal-blue/30">Night Ops</button>
                </div>

                <div className="text-xs text-terminal-blue/40 px-4">
                  COBRA PROTOCOL © 2024 | DEPLOYED ON BASE VIA APE STORE
                </div>
              </div>
            </div>
          </footer>
        </>
      )}
      {/* Terminal Interface */}
      <TerminalInterface isOpen={showTerminal} onClose={() => setShowTerminal(false)} />
      {/* AI Chat Interface */}
      <AIChat isOpen={showAIChat} onClose={() => setShowAIChat(false)} />
    </div>
  )
}
