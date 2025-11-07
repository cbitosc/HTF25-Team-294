"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Volume2, VolumeX } from "lucide-react"

interface ExerciseDetailProps {
  exercise: any
  onBack: () => void
}

export function ExerciseDetail({ exercise, onBack }: ExerciseDetailProps) {
  const [timeLeft, setTimeLeft] = useState(exercise.duration ? exercise.duration * 60 : 30)
  const [isRunning, setIsRunning] = useState(false)
  const [repsCompleted, setRepsCompleted] = useState(0)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [animationPhase, setAnimationPhase] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)
  const lastRepRef = useRef(0)

  useEffect(() => {
    let animationInterval: NodeJS.Timeout
    if (isRunning) {
      animationInterval = setInterval(() => {
        setAnimationPhase((prev) => (prev + 1) % 4)
      }, 300)
    }
    return () => clearInterval(animationInterval)
  }, [isRunning])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          const newTime = prev - 1
          if (newTime === 10 && soundEnabled) {
            playWarningSound()
          }
          return newTime
        })
      }, 1000)
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false)
      if (soundEnabled) {
        playCompletionSound()
      }
    }
    return () => clearInterval(interval)
  }, [isRunning, timeLeft, soundEnabled])

  useEffect(() => {
    if (repsCompleted > lastRepRef.current && soundEnabled && isRunning) {
      playRepSound()
      lastRepRef.current = repsCompleted
    }
  }, [repsCompleted, soundEnabled, isRunning])

  const playWarningSound = () => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    oscillator.frequency.value = 800
    oscillator.type = "sine"

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1)

    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.1)
  }

  const playRepSound = () => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    oscillator.frequency.value = 1200
    oscillator.type = "sine"

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15)

    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.15)
  }

  const playCompletionSound = () => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    oscillator.frequency.setValueAtTime(1000, audioContext.currentTime)
    oscillator.frequency.setValueAtTime(1200, audioContext.currentTime + 0.1)
    oscillator.type = "sine"

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2)

    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.2)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const progress = exercise.duration
    ? ((exercise.duration * 60 - timeLeft) / (exercise.duration * 60)) * 100
    : (repsCompleted / (exercise.reps || 12)) * 100

  const getAnimationStyle = () => {
    const baseTransform = "translateY(0px) scale(1)"
    const transforms = [
      "translateY(0px) scale(1)",
      "translateY(-20px) scale(1.05)",
      "translateY(-40px) scale(1.1)",
      "translateY(-20px) scale(1.05)",
    ]
    return {
      transform: transforms[animationPhase],
      transition: "transform 0.3s ease-in-out",
    }
  }

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="p-2 hover:bg-muted rounded-lg transition-colors">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl font-bold flex-1 text-center">{exercise.name}</h1>
        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="p-2 hover:bg-muted rounded-lg transition-colors"
        >
          {soundEnabled ? <Volume2 size={24} /> : <VolumeX size={24} />}
        </button>
      </div>

      {/* Exercise Image/Emoji */}
      <div className="flex justify-center">
        <div className="text-8xl" style={getAnimationStyle()}>
          {exercise.emoji}
        </div>
      </div>

      {/* Status */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-primary mb-2">READY TO GO!</h2>
        <p className="text-lg font-bold">{exercise.name.toUpperCase()}</p>
      </div>

      {/* Timer/Reps Display */}
      <Card className="p-8 text-center">
        <div className="relative w-48 h-48 mx-auto mb-4">
          <svg className="w-full h-full transform -rotate-90">
            <circle cx="96" cy="96" r="88" fill="none" stroke="currentColor" strokeWidth="8" className="text-muted" />
            <circle
              cx="96"
              cy="96"
              r="88"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              strokeDasharray={`${(progress / 100) * 552.92} 552.92`}
              className="text-primary transition-all"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              {exercise.duration ? (
                <div className="text-5xl font-bold">{formatTime(timeLeft)}</div>
              ) : (
                <div>
                  <div className="text-5xl font-bold">{repsCompleted}</div>
                  <div className="text-sm text-muted-foreground">/ {exercise.reps || 12}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Controls */}
      <div className="space-y-3">
        {exercise.duration ? (
          <Button
            onClick={() => setIsRunning(!isRunning)}
            className="w-full h-14 text-lg font-bold rounded-full bg-primary hover:bg-primary/90"
          >
            {isRunning ? "Pause" : "Start"}
          </Button>
        ) : (
          <div className="flex gap-3">
            <Button
              onClick={() => setRepsCompleted(Math.max(0, repsCompleted - 1))}
              variant="outline"
              className="flex-1 h-14"
            >
              <ChevronLeft size={24} />
            </Button>
            <Button
              onClick={() => setRepsCompleted(repsCompleted + 1)}
              className="flex-1 h-14 bg-primary hover:bg-primary/90"
            >
              <ChevronRight size={24} />
            </Button>
          </div>
        )}

        <Button onClick={onBack} variant="outline" className="w-full h-12 bg-transparent">
          Done
        </Button>
      </div>

      {/* Exercise Info */}
      <Card className="p-4 bg-muted/50">
        <h3 className="font-bold mb-2">Exercise Info</h3>
        <p className="text-sm text-muted-foreground">
          {exercise.description || "Perform this exercise with proper form and controlled movements."}
        </p>
        {exercise.duration && (
          <p className="text-sm text-muted-foreground mt-2">Duration: {exercise.duration} minutes</p>
        )}
        {exercise.reps && <p className="text-sm text-muted-foreground mt-2">Target Reps: {exercise.reps}</p>}
      </Card>
    </div>
  )
}
