"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sparkles, Loader2 } from "lucide-react"
import { generateWorkout } from "@/lib/workout-generator"

interface Exercise {
  name: string
  emoji: string
  duration?: number
  reps?: number
  description: string
}

export function AIGeneratorPage() {
  const [fitnessLevel, setFitnessLevel] = useState<"Beginner" | "Intermediate" | "Advanced">("Beginner")
  const [primaryGoal, setPrimaryGoal] = useState<
    "Weight Loss" | "Muscle Building" | "General Fitness" | "Endurance" | "Flexibility"
  >("General Fitness")
  const [duration, setDuration] = useState(15)
  const [focusArea, setFocusArea] = useState<"Full Body" | "Upper Body" | "Lower Body" | "Core" | "Cardio">("Full Body")
  const [loading, setLoading] = useState(false)
  const [generatedWorkout, setGeneratedWorkout] = useState<Exercise[]>([])

  const fitnessLevels: Array<"Beginner" | "Intermediate" | "Advanced"> = ["Beginner", "Intermediate", "Advanced"]
  const goals: Array<"Weight Loss" | "Muscle Building" | "General Fitness" | "Endurance" | "Flexibility"> = [
    "Weight Loss",
    "Muscle Building",
    "General Fitness",
    "Endurance",
    "Flexibility",
  ]
  const durations = [10, 15, 20, 30, 45]
  const focusAreas: Array<"Full Body" | "Upper Body" | "Lower Body" | "Core" | "Cardio"> = [
    "Full Body",
    "Upper Body",
    "Lower Body",
    "Core",
    "Cardio",
  ]

  const handleGenerateWorkout = async () => {
    setLoading(true)
    // Simulate API delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 800))

    const exercises = generateWorkout({
      fitnessLevel,
      primaryGoal,
      duration,
      focusArea,
    })
    setGeneratedWorkout(exercises)
    setLoading(false)
  }

  return (
    <div className="p-4 space-y-6 pb-24">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Sparkles className="text-primary" size={32} />
          AI Workout Generator
        </h1>
        <p className="text-muted-foreground mt-2">Create a personalized workout with AI</p>
      </div>

      {/* Info Card */}
      <Card className="p-4 bg-gradient-to-r from-primary/20 to-primary/10 border-primary/30">
        <div className="flex gap-3">
          <Sparkles className="text-primary flex-shrink-0" size={24} />
          <div>
            <h3 className="font-bold text-primary mb-1">AI-Powered Workouts</h3>
            <p className="text-sm text-foreground">
              Our AI analyzes your preferences and creates a custom workout plan tailored to your fitness level and
              goals.
            </p>
          </div>
        </div>
      </Card>

      {/* Fitness Level */}
      <div>
        <h3 className="font-bold mb-3 flex items-center gap-2">
          <span className="text-xl">⚡</span> Fitness Level
        </h3>
        <div className="flex gap-2 flex-wrap">
          {fitnessLevels.map((level) => (
            <button
              key={level}
              onClick={() => setFitnessLevel(level)}
              className={`px-4 py-2 rounded-full font-semibold transition-all ${
                fitnessLevel === level ? "bg-primary text-white" : "bg-muted text-foreground hover:bg-muted/80"
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      {/* Primary Goal */}
      <div>
        <h3 className="font-bold mb-3 flex items-center gap-2">
          <span className="text-xl">🎯</span> Primary Goal
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {goals.map((goal) => (
            <button
              key={goal}
              onClick={() => setPrimaryGoal(goal)}
              className={`px-3 py-2 rounded-lg font-semibold transition-all text-sm ${
                primaryGoal === goal ? "bg-primary text-white" : "bg-muted text-foreground hover:bg-muted/80"
              }`}
            >
              {goal}
            </button>
          ))}
        </div>
      </div>

      {/* Duration */}
      <div>
        <h3 className="font-bold mb-3 flex items-center gap-2">
          <span className="text-xl">⏱️</span> Duration (minutes)
        </h3>
        <div className="flex gap-2 flex-wrap">
          {durations.map((dur) => (
            <button
              key={dur}
              onClick={() => setDuration(dur)}
              className={`px-4 py-2 rounded-full font-semibold transition-all ${
                duration === dur ? "bg-primary text-white" : "bg-muted text-foreground hover:bg-muted/80"
              }`}
            >
              {dur}
            </button>
          ))}
        </div>
      </div>

      {/* Focus Area */}
      <div>
        <h3 className="font-bold mb-3 flex items-center gap-2">
          <span className="text-xl">🎪</span> Focus Area
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {focusAreas.map((area) => (
            <button
              key={area}
              onClick={() => setFocusArea(area)}
              className={`px-3 py-2 rounded-lg font-semibold transition-all text-sm ${
                focusArea === area ? "bg-primary text-white" : "bg-muted text-foreground hover:bg-muted/80"
              }`}
            >
              {area}
            </button>
          ))}
        </div>
      </div>

      {/* Generate Button */}
      <Button
        onClick={handleGenerateWorkout}
        disabled={loading}
        className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white font-bold py-3 rounded-full text-lg"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 animate-spin" size={20} />
            Generating...
          </>
        ) : (
          <>
            <Sparkles className="mr-2" size={20} />
            Generate AI Workout
          </>
        )}
      </Button>

      {/* Tip */}
      <Card className="p-3 bg-blue-50 border-blue-200">
        <p className="text-sm text-blue-900">
          <strong>Tip:</strong> The AI will create a unique workout based on your preferences. Each generated workout
          will be different and tailored to help you achieve your fitness goals.
        </p>
      </Card>

      {/* Generated Workout */}
      {generatedWorkout.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Your Generated Workout</h2>
          <div className="space-y-3">
            {generatedWorkout.map((exercise, idx) => (
              <Card key={idx} className="p-4 border-l-4 border-l-primary">
                <div className="flex items-start gap-3">
                  <span className="text-3xl">{exercise.emoji}</span>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">{exercise.name}</h3>
                    <p className="text-sm text-muted-foreground">{exercise.description}</p>
                    <div className="flex gap-4 mt-2 text-sm font-semibold">
                      {exercise.duration && <span>⏱️ {exercise.duration} min</span>}
                      {exercise.reps && <span>🔢 {exercise.reps} reps</span>}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
