"use client"

import { useState } from "react"

interface Mission {
  id: string
  title: string
  status: "COMPLETE" | "ACTIVE" | "LOCKED"
  description: string
}

const missions: Mission[] = [
  {
    id: "M001",
    title: "APE STORE LAUNCH",
    status: "COMPLETE",
    description: "Successfully deployed on APE STORE infrastructure",
  },
  {
    id: "M002",
    title: "BASE NETWORK STRIKES",
    status: "ACTIVE",
    description: "Executing strategic operations across BASE network",
  },
  {
    id: "M003",
    title: "AUTO-STAKE MISSIONS",
    status: "ACTIVE",
    description: "Implementing autonomous staking protocols",
  },
  {
    id: "M004",
    title: "x100 STRIKE EXECUTION",
    status: "LOCKED",
    description: "Final phase activation pending",
  },
]

export function MissionLog() {
  const [selectedMission, setSelectedMission] = useState<string | null>(null)

  return (
    <div className="space-y-2">
      {missions.map((mission) => (
        <div
          key={mission.id}
          className={`border border-terminal-blue/30 p-3 cursor-pointer transition-all hover:bg-terminal-blue/5 ${
            selectedMission === mission.id ? "bg-terminal-blue/10" : ""
          }`}
          onClick={() => setSelectedMission(selectedMission === mission.id ? null : mission.id)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-terminal-blue/70 font-mono text-xs">[{mission.id}]</span>
              <span className="text-terminal-blue font-mono">{mission.title}</span>
            </div>
            <div
              className={`px-2 py-1 text-xs font-mono rounded ${
                mission.status === "COMPLETE"
                  ? "bg-blue-500/20 text-blue-400"
                  : mission.status === "ACTIVE"
                    ? "bg-yellow-500/20 text-yellow-400"
                    : "bg-red-500/20 text-red-400"
              }`}
            >
              {mission.status}
            </div>
          </div>
          {selectedMission === mission.id && (
            <div className="mt-2 pt-2 border-t border-terminal-blue/20">
              <p className="text-terminal-blue/80 text-sm font-mono">{mission.description}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
