"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { exercisesLibrary } from "@/lib/exercises-library"

interface ExerciseDetailViewProps {
  exercise: any
  onSelectExercise: (exercise: any) => void
  allExercises: any[]
}

function ExerciseDetailView({ exercise, onSelectExercise, allExercises }: ExerciseDetailViewProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [highlightedWordIndex, setHighlightedWordIndex] = useState(-1)

  const words = exercise.voiceOver.split(/\s+/)
  const averageWordDuration = 400 // milliseconds per word (adjustable based on speech rate)

  const playVoiceOver = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel()
      setHighlightedWordIndex(-1)

      const utterance = new SpeechSynthesisUtterance(exercise.voiceOver)
      utterance.rate = 0.9
      utterance.pitch = 1

      let wordIndex = 0
      const highlightInterval = setInterval(() => {
        if (wordIndex < words.length) {
          setHighlightedWordIndex(wordIndex)
          wordIndex++
        } else {
          clearInterval(highlightInterval)
        }
      }, averageWordDuration)

      window.speechSynthesis.speak(utterance)
      setIsPlaying(true)

      utterance.onend = () => {
        setIsPlaying(false)
        setHighlightedWordIndex(-1)
        clearInterval(highlightInterval)
      }
    }
  }

  const otherExercises = allExercises.filter((ex) => ex.name !== exercise.name)

  return (
    <div className="p-4 space-y-6 pb-24">
      <div className="sticky top-0 bg-background z-10 pt-4 pb-2">
        <div className="text-center space-y-4">
          <div className="text-6xl">{exercise.emoji}</div>
          <h1 className="text-2xl font-bold">{exercise.name}</h1>
          <p className="text-sm text-muted-foreground">{exercise.category}</p>
        </div>

        <Card className="p-4 space-y-3 bg-primary/10 mt-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-lg">Voice Guide 🎤</h2>
            <Button onClick={playVoiceOver} disabled={isPlaying} className="bg-primary hover:bg-primary/90" size="sm">
              {isPlaying ? "Playing..." : "Play Voice"}
            </Button>
          </div>

          <div className="text-sm italic text-muted-foreground leading-relaxed flex flex-wrap gap-1">
            {words.map((word, idx) => (
              <span
                key={idx}
                className={`transition-all duration-100 px-1 rounded ${
                  idx === highlightedWordIndex
                    ? "bg-primary text-primary-foreground font-bold scale-110"
                    : idx < highlightedWordIndex
                      ? "bg-primary/30 text-foreground"
                      : "text-muted-foreground"
                }`}
              >
                {word}
              </span>
            ))}
          </div>
        </Card>
      </div>

      <div className="space-y-4">
        <Card className="p-4 space-y-3">
          <h2 className="font-bold text-lg">About This Exercise</h2>
          <p className="text-sm leading-relaxed">{exercise.description}</p>
        </Card>

        <Card className="p-4 space-y-3">
          <h2 className="font-bold text-lg">Benefits 💪</h2>
          <ul className="space-y-2">
            {exercise.benefits.map((benefit: string, idx: number) => (
              <li key={idx} className="text-sm flex gap-2">
                <span>✓</span>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-4 space-y-3">
          <h2 className="font-bold text-lg">How to Perform</h2>
          <ol className="space-y-2">
            {exercise.instructions.map((instruction: string, idx: number) => (
              <li key={idx} className="text-sm flex gap-2">
                <span className="font-bold">{idx + 1}.</span>
                <span>{instruction}</span>
              </li>
            ))}
          </ol>
        </Card>

        <Card className="p-4 space-y-3">
          <h2 className="font-bold text-lg">Pro Tips 💡</h2>
          <ul className="space-y-2">
            {exercise.tips.map((tip: string, idx: number) => (
              <li key={idx} className="text-sm flex gap-2">
                <span>⭐</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <div className="space-y-4 mt-8">
        <h2 className="font-bold text-xl">Other Exercises</h2>
        <div className="space-y-3">
          {otherExercises.map((ex, idx) => (
            <Card
              key={idx}
              className="p-4 cursor-pointer hover:bg-muted transition-colors"
              onClick={() => onSelectExercise(ex)}
            >
              <div className="flex items-center gap-4">
                <div className="text-4xl">{ex.emoji}</div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{ex.name}</h3>
                  <p className="text-sm text-muted-foreground">{ex.category}</p>
                </div>
                <div className="text-primary">→</div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export function ExercisesLibraryPage() {
  const [selectedExercise, setSelectedExercise] = useState<any>(null)

  if (selectedExercise) {
    return (
      <ExerciseDetailView
        exercise={selectedExercise}
        onSelectExercise={setSelectedExercise}
        allExercises={exercisesLibrary}
      />
    )
  }

  return (
    <div className="p-4 space-y-6 pb-24">
      {/* Header */}
      <div className="text-center space-y-2 mt-4">
        <h1 className="text-3xl font-bold">Exercise Library 📚</h1>
        <p className="text-muted-foreground">Learn proper form and technique</p>
      </div>

      {/* Search/Filter */}
      <div className="space-y-2">
        <input
          type="text"
          placeholder="Search exercises..."
          className="w-full px-4 py-2 rounded-lg border border-border bg-background"
        />
      </div>

      {/* Exercises Grid */}
      <div className="space-y-3">
        {exercisesLibrary.map((exercise, idx) => (
          <Card
            key={idx}
            className="p-4 cursor-pointer hover:bg-muted transition-colors"
            onClick={() => setSelectedExercise(exercise)}
          >
            <div className="flex items-center gap-4">
              <div className="text-4xl">{exercise.emoji}</div>
              <div className="flex-1">
                <h3 className="font-bold text-lg">{exercise.name}</h3>
                <p className="text-sm text-muted-foreground">{exercise.category}</p>
              </div>
              <div className="text-primary">→</div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
