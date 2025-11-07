"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"

const EXERCISES_LIST = [
  { name: "Jumping Jacks", emoji: "🤸", duration: 0.5, reps: null },
  { name: "Push-Ups", emoji: "💪", duration: null, reps: 10 },
  { name: "Squats", emoji: "🦵", duration: null, reps: 15 },
  { name: "Burpees", emoji: "🤸", duration: 1, reps: null },
  { name: "Plank", emoji: "📍", duration: 1, reps: null },
  { name: "Mountain Climbers", emoji: "⛰️", duration: 0.5, reps: null },
  { name: "Lunges", emoji: "🚶", duration: null, reps: 10 },
  { name: "Incline Push-Ups", emoji: "💪", duration: null, reps: 8 },
  { name: "Knee Push-Ups", emoji: "🏋️", duration: null, reps: 6 },
  { name: "High Knees", emoji: "🏃", duration: 0.5, reps: null },
  { name: "Tricep Dips", emoji: "💪", duration: null, reps: 12 },
  { name: "Leg Raises", emoji: "🦵", duration: null, reps: 10 },
  { name: "Bicycle Crunches", emoji: "🚴", duration: null, reps: 15 },
  { name: "Russian Twists", emoji: "🔄", duration: null, reps: 20 },
  { name: "Wall Sit", emoji: "🧗", duration: 1, reps: null },
  { name: "Glute Bridges", emoji: "🌉", duration: null, reps: 15 },
  { name: "Lateral Raises", emoji: "💪", duration: null, reps: 12 },
  { name: "Deadlifts", emoji: "🏋️", duration: null, reps: 8 },
  { name: "Rows", emoji: "🚣", duration: null, reps: 10 },
  { name: "Shoulder Press", emoji: "💪", duration: null, reps: 10 },
  { name: "Cardio Run", emoji: "🏃", duration: 5, reps: null },
  { name: "Jump Rope", emoji: "🪢", duration: 2, reps: null },
  { name: "Yoga Stretch", emoji: "🧘", duration: 3, reps: null },
  { name: "Meditation", emoji: "🧘‍♀️", duration: 5, reps: null },
  { name: "Swimming", emoji: "🏊", duration: 10, reps: null },
]

interface CustomWorkoutPageProps {
  onBack: () => void
  onCreateWorkout: (workout: any) => void
}

export function CustomWorkoutPage({ onBack, onCreateWorkout }: CustomWorkoutPageProps) {
  const [fitnessLevel, setFitnessLevel] = useState("Beginner")
  const [primaryGoal, setPrimaryGoal] = useState("General Fitness")
  const [focusArea, setFocusArea] = useState("Full Body")
  const [duration, setDuration] = useState(15)
  const [selectedExercises, setSelectedExercises] = useState<any[]>([])
  const [showExerciseList, setShowExerciseList] = useState(false)

  const handleAddExercise = (exercise: any) => {
    if (!selectedExercises.find((e) => e.name === exercise.name)) {
      setSelectedExercises([...selectedExercises, exercise])
    }
  }

  const handleRemoveExercise = (exerciseName: string) => {
    setSelectedExercises(selectedExercises.filter((e) => e.name !== exerciseName))
  }

  const handleCreateWorkout = () => {
    if (selectedExercises.length === 0) {
      alert("Please select at least one exercise")
      return
    }

    const workout = {
      fitnessLevel,
      primaryGoal,
      focusArea,
      duration,
      exercises: selectedExercises,
    }

    onCreateWorkout(workout)
  }

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="text-primary">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold">Create Your Own</h1>
      </div>

      {/* Fitness Level */}
      <div>
        <label className="block text-sm font-semibold mb-3">Fitness Level</label>
        <div className="flex gap-2">
          {["Beginner", "Intermediate", "Advanced"].map((level) => (
            <button
              key={level}
              onClick={() => setFitnessLevel(level)}
              className={`flex-1 py-2 px-3 rounded-lg font-semibold transition-colors ${
                fitnessLevel === level
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      {/* Primary Goal */}
      <div>
        <label className="block text-sm font-semibold mb-3">Primary Goal</label>
        <div className="grid grid-cols-2 gap-2">
          {["Weight Loss", "Muscle Building", "General Fitness", "Endurance", "Flexibility"].map((goal) => (
            <button
              key={goal}
              onClick={() => setPrimaryGoal(goal)}
              className={`py-2 px-3 rounded-lg font-semibold text-sm transition-colors ${
                primaryGoal === goal
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {goal}
            </button>
          ))}
        </div>
      </div>

      {/* Focus Area */}
      <div>
        <label className="block text-sm font-semibold mb-3">Focus Area</label>
        <div className="grid grid-cols-2 gap-2">
          {["Full Body", "Upper Body", "Lower Body", "Core", "Cardio"].map((area) => (
            <button
              key={area}
              onClick={() => setFocusArea(area)}
              className={`py-2 px-3 rounded-lg font-semibold text-sm transition-colors ${
                focusArea === area
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {area}
            </button>
          ))}
        </div>
      </div>

      {/* Duration */}
      <div>
        <label className="block text-sm font-semibold mb-3">Duration (minutes)</label>
        <div className="flex gap-2">
          {[10, 15, 20, 30, 45].map((min) => (
            <button
              key={min}
              onClick={() => setDuration(min)}
              className={`flex-1 py-2 px-3 rounded-lg font-semibold transition-colors ${
                duration === min
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {min}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Exercises */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <label className="block text-sm font-semibold">Selected Exercises ({selectedExercises.length})</label>
          <button onClick={() => setShowExerciseList(!showExerciseList)} className="text-primary text-sm font-semibold">
            {showExerciseList ? "Hide" : "Add"} →
          </button>
        </div>

        {selectedExercises.length > 0 && (
          <div className="space-y-2 mb-4">
            {selectedExercises.map((ex, idx) => (
              <Card key={idx} className="p-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{ex.emoji}</span>
                  <div>
                    <p className="font-semibold">{ex.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {ex.duration ? `${ex.duration} min` : `${ex.reps} reps`}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveExercise(ex.name)}
                  className="text-red-500 font-bold hover:text-red-600"
                >
                  ✕
                </button>
              </Card>
            ))}
          </div>
        )}

        {/* Exercise List */}
        {showExerciseList && (
          <div className="space-y-2 mb-4 max-h-64 overflow-y-auto">
            {EXERCISES_LIST.map((ex, idx) => (
              <Card
                key={idx}
                onClick={() => handleAddExercise(ex)}
                className="p-3 cursor-pointer hover:bg-muted transition-colors flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{ex.emoji}</span>
                  <div>
                    <p className="font-semibold text-sm">{ex.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {ex.duration ? `${ex.duration} min` : `${ex.reps} reps`}
                    </p>
                  </div>
                </div>
                <span className="text-primary font-bold">+</span>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Create Button */}
      <Button
        onClick={handleCreateWorkout}
        disabled={selectedExercises.length === 0}
        className="w-full h-12 text-lg font-bold bg-primary hover:bg-primary/90 disabled:opacity-50"
      >
        Create Workout
      </Button>
    </div>
  )
}
