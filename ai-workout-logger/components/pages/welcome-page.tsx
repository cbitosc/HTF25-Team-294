"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface WelcomePageProps {
  onStart: () => void
}

export function WelcomePage({ onStart }: WelcomePageProps) {
  const [showQuickStart, setShowQuickStart] = useState(false)

  const quickWorkouts = [
    { title: "Full Body Beginner", duration: "20 min", level: "Beginner", emoji: "🏃" },
    { title: "Full Body Intermediate", duration: "30 min", level: "Intermediate", emoji: "💪" },
    { title: "Full Body Advanced", duration: "45 min", level: "Advanced", emoji: "🔥" },
  ]

  return (
    <div className="p-4 space-y-6 pb-24">
      {/* Welcome Header */}
      <div className="text-center space-y-4 mt-8">
        <div className="text-7xl">🔥</div>
        <h1 className="text-4xl font-bold">FitFreak</h1>
        <p className="text-muted-foreground text-lg">Your Personal Fitness Journey Starts Here</p>
      </div>

      {/* Stats - Initially Empty */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4 text-center">
          <div className="text-sm text-muted-foreground">Duration</div>
          <div className="text-2xl font-bold">0 mins</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-sm text-muted-foreground">Exercises</div>
          <div className="text-2xl font-bold">0</div>
        </Card>
      </div>

      {/* Quick Start Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold">Just For You 💡</h2>
        {quickWorkouts.map((workout, idx) => (
          <Card
            key={idx}
            className="p-4 cursor-pointer hover:bg-muted transition-colors"
            onClick={() => {
              setShowQuickStart(true)
              onStart()
            }}
          >
            <div className="flex items-center gap-4">
              <div className="text-4xl">{workout.emoji}</div>
              <div className="flex-1">
                <h3 className="font-bold text-lg">{workout.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {workout.duration} • {workout.level}
                </p>
              </div>
              <div className="text-primary">→</div>
            </div>
          </Card>
        ))}
      </div>

      {/* Features */}
      <div className="space-y-3">
        <h2 className="text-xl font-bold">Features ✨</h2>
        <div className="grid grid-cols-2 gap-3">
          <Card className="p-3 text-center">
            <div className="text-3xl mb-2">🎯</div>
            <p className="text-sm font-semibold">AI Generated</p>
          </Card>
          <Card className="p-3 text-center">
            <div className="text-3xl mb-2">🎤</div>
            <p className="text-sm font-semibold">Voice Guide</p>
          </Card>
          <Card className="p-3 text-center">
            <div className="text-3xl mb-2">📊</div>
            <p className="text-sm font-semibold">Track Progress</p>
          </Card>
          <Card className="p-3 text-center">
            <div className="text-3xl mb-2">⏱️</div>
            <p className="text-sm font-semibold">Smart Timer</p>
          </Card>
        </div>
      </div>

      {/* CTA Button */}
      <Button onClick={onStart} className="w-full h-14 text-lg font-bold rounded-full bg-primary hover:bg-primary/90">
        Get Started 🚀
      </Button>
    </div>
  )
}
