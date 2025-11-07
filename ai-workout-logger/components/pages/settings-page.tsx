"use client"

import { Card } from "@/components/ui/card"
import { Settings, Volume2, MessageSquare, Globe, Heart, Share2, Star, MessageCircle, Zap } from "lucide-react"

export function SettingsPage() {
  const settingsItems = [
    { icon: Settings, label: "General Settings" },
    { icon: Volume2, label: "Voice Options (TTS)" },
    { icon: MessageSquare, label: "Suggest Other Features" },
    { icon: Globe, label: "Language Options" },
    { icon: Heart, label: "Sync to Health Connect" },
  ]

  const bottomItems = [
    { icon: Share2, label: "Share with friends" },
    { icon: Star, label: "Rate us" },
    { icon: MessageCircle, label: "Feedback" },
    { icon: Zap, label: "Remove Ads" },
  ]

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-3xl font-bold">SETTINGS</h1>

      {/* Main Settings */}
      <div className="space-y-2">
        {settingsItems.map((item, idx) => {
          const Icon = item.icon
          return (
            <Card key={idx} className="p-4 cursor-pointer hover:bg-muted transition-colors flex items-center gap-3">
              <Icon size={24} className="text-primary" />
              <span className="font-semibold flex-1">{item.label}</span>
              <span className="text-muted-foreground">›</span>
            </Card>
          )
        })}
      </div>

      {/* Bottom Items */}
      <div className="space-y-2 pt-4 border-t border-border">
        {bottomItems.map((item, idx) => {
          const Icon = item.icon
          return (
            <Card key={idx} className="p-4 cursor-pointer hover:bg-muted transition-colors flex items-center gap-3">
              <Icon size={24} className="text-muted-foreground" />
              <span className="font-semibold flex-1">{item.label}</span>
              <span className="text-muted-foreground">›</span>
            </Card>
          )
        })}
      </div>

      <p className="text-center text-sm text-muted-foreground pt-4">Version 1.0.0</p>
    </div>
  )
}
