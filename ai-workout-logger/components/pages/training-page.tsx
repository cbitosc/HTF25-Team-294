"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExerciseDetail } from "@/components/exercise-detail"
import { CustomWorkoutPage } from "./custom-workout-page"
import { useWorkoutStore } from "@/lib/workout-storage"

export function TrainingPage() {
  const [selectedExercise, setSelectedExercise] = useState<any>(null)
  const [workout, setWorkout] = useState<any>(null)
  const [showCustom, setShowCustom] = useState(false)
  const [customWorkout, setCustomWorkout] = useState<any>(null)
  const [completedExercises, setCompletedExercises] = useState<string[]>([])
  const { getCurrentDaySession, addSession, updateSession } = useWorkoutStore()

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0]
    const existingSession = getCurrentDaySession()

    if (existingSession) {
      setWorkout(existingSession)
      setCompletedExercises(existingSession.exercises.filter((e: any) => e.completed).map((e: any) => e.name))
    } else {
      const emptyWorkout = {
        day: "DAY 1",
        exercises: [],
      }
      setWorkout(emptyWorkout)
    }
  }, [])

  const handleCreateCustomWorkout = (customWO: any) => {
    const today = new Date().toISOString().split("T")[0]
    const session = {
      id: `session-${today}-${Date.now()}`,
      date: today,
      exercises: customWO.exercises.map((ex: any) => ({
        ...ex,
        completed: false,
      })),
      totalDuration: customWO.duration,
      totalExercises: customWO.exercises.length,
      fitnessLevel: customWO.fitnessLevel,
      primaryGoal: customWO.primaryGoal,
      focusArea: customWO.focusArea,
    }

    addSession(session)
    setWorkout(session)
    setCustomWorkout(customWO)
    setShowCustom(false)
  }

  const handleExerciseComplete = (exerciseName: string) => {
    if (!completedExercises.includes(exerciseName)) {
      setCompletedExercises([...completedExercises, exerciseName])

      // Update session
      if (workout.id) {
        const updatedExercises = workout.exercises.map((ex: any) =>
          ex.name === exerciseName ? { ...ex, completed: true } : ex,
        )
        updateSession(workout.id, { exercises: updatedExercises })
      }
    }
  }

  if (showCustom) {
    return <CustomWorkoutPage onBack={() => setShowCustom(false)} onCreateWorkout={handleCreateCustomWorkout} />
  }

  if (selectedExercise) {
    return (
      <ExerciseDetail
        exercise={selectedExercise}
        onBack={() => setSelectedExercise(null)}
        onComplete={() => {
          handleExerciseComplete(selectedExercise.name)
          setSelectedExercise(null)
        }}
      />
    )
  }

  if (!workout) return null

  const totalDuration = workout.exercises.reduce((sum: number, ex: any) => sum + (ex.duration || 0), 0)
  const completedCount = completedExercises.length

  return (
    <div className="p-4 space-y-6">
      {/* Header with Image */}
      <div className="relative h-48 bg-gradient-to-b from-primary/20 to-background rounded-lg overflow-hidden flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-2">💪</div>
          <h1 className="text-2xl font-bold">{workout.day}</h1>
        </div>
      </div>

      {/* Stats - Shows 0 initially */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4 text-center">
          <div className="text-sm text-muted-foreground">Duration</div>
          <div className="text-2xl font-bold">{totalDuration} mins</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-sm text-muted-foreground">Exercises</div>
          <div className="text-2xl font-bold">{workout.exercises.length}</div>
        </Card>
      </div>

      {/* Exercises or Empty State */}
      {workout.exercises.length === 0 ? (
        <Card className="p-8 text-center space-y-4">
          <div className="text-4xl">🎯</div>
          <div>
            <p className="font-semibold text-lg mb-2">No Workout Yet</p>
            <p className="text-sm text-muted-foreground mb-4">Create your first workout to get started!</p>
          </div>
          <Button onClick={() => setShowCustom(true)} className="w-full bg-primary hover:bg-primary/90">
            Create Your First Workout
          </Button>
        </Card>
      ) : (
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Exercises</h2>
            <button onClick={() => setShowCustom(true)} className="text-primary text-sm font-semibold">
              Edit →
            </button>
          </div>

          {workout.exercises.map((exercise: any, idx: number) => (
            <Card
              key={idx}
              className={`p-4 cursor-pointer transition-colors ${
                completedExercises.includes(exercise.name) ? "bg-primary/10 border-primary" : "hover:bg-muted"
              }`}
              onClick={() => setSelectedExercise(exercise)}
            >
              <div className="flex items-center gap-4">
                <div className="text-4xl">{exercise.emoji}</div>
                <div className="flex-1">
                  <h3
                    className={`font-bold text-lg ${completedExercises.includes(exercise.name) ? "line-through" : ""}`}
                  >
                    {exercise.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {exercise.duration ? `${exercise.duration} mins` : `${exercise.reps}x`}
                  </p>
                </div>
                {completedExercises.includes(exercise.name) && (
                  <span className="text-primary font-bold text-xl">✓</span>
                )}
              </div>
            </Card>
          ))}

          {/* Progress */}
          <Card className="p-4 bg-primary/10 border-primary">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold">Progress</span>
              <span className="text-sm">
                {completedCount}/{workout.exercises.length}
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all"
                style={{ width: `${(completedCount / workout.exercises.length) * 100}%` }}
              />
            </div>
          </Card>
        </div>
      )}

      {/* Start/Create Button */}
      {workout.exercises.length > 0 && (
        <Button
          onClick={() => setSelectedExercise(workout.exercises[0])}
          className="w-full h-14 text-lg font-bold rounded-full bg-primary hover:bg-primary/90"
        >
          Start Workout
        </Button>
      )}
    </div>
  )
}
