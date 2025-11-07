export const DEMO_WORKOUTS = {
  "Day 1": {
    day: "DAY 1",
    exercises: [
      {
        name: "Jumping Jacks",
        emoji: "🤸",
        duration: 0.33,
        reps: null,
        description: "Full body cardio exercise",
      },
      {
        name: "Incline Push-Ups",
        emoji: "💪",
        duration: null,
        reps: 6,
        description: "Upper body strength exercise",
      },
      {
        name: "Knee Push-Ups",
        emoji: "🏋️",
        duration: null,
        reps: 4,
        description: "Modified push-ups for beginners",
      },
    ],
  },
  "Day 2": {
    day: "DAY 2",
    exercises: [
      {
        name: "Burpees",
        emoji: "🤸",
        duration: 0.5,
        reps: null,
        description: "Full body explosive exercise",
      },
      {
        name: "Squats",
        emoji: "🦵",
        duration: null,
        reps: 15,
        description: "Lower body strength exercise",
      },
      {
        name: "Plank",
        emoji: "📍",
        duration: 1,
        reps: null,
        description: "Core stability exercise",
      },
    ],
  },
  "Day 3": {
    day: "DAY 3",
    exercises: [
      {
        name: "Mountain Climbers",
        emoji: "⛰️",
        duration: 0.5,
        reps: null,
        description: "Cardio and core exercise",
      },
      {
        name: "Lunges",
        emoji: "🚶",
        duration: null,
        reps: 10,
        description: "Lower body and balance exercise",
      },
      {
        name: "Push-Ups",
        emoji: "💪",
        duration: null,
        reps: 8,
        description: "Upper body strength exercise",
      },
    ],
  },
}

export const WORKOUT_CATEGORIES = {
  "Full Body": [
    {
      name: "Full Body Beginner",
      emoji: "🏃",
      duration: 20,
      difficulty: "Beginner",
      exercises: 16,
    },
    {
      name: "Full Body Intermediate",
      emoji: "🏋️",
      duration: 30,
      difficulty: "Intermediate",
      exercises: 20,
    },
    {
      name: "Full Body Advanced",
      emoji: "💪",
      duration: 45,
      difficulty: "Advanced",
      exercises: 25,
    },
  ],
  Abs: [
    {
      name: "Abs Beginner",
      emoji: "🤸",
      duration: 20,
      difficulty: "Beginner",
      exercises: 16,
    },
    {
      name: "Abs Intermediate",
      emoji: "💪",
      duration: 29,
      difficulty: "Intermediate",
      exercises: 21,
    },
    {
      name: "Abs Advanced",
      emoji: "🔥",
      duration: 36,
      difficulty: "Advanced",
      exercises: 21,
    },
  ],
  Arm: [
    {
      name: "Arm Beginner",
      emoji: "💪",
      duration: 15,
      difficulty: "Beginner",
      exercises: 12,
    },
    {
      name: "Arm Intermediate",
      emoji: "🏋️",
      duration: 25,
      difficulty: "Intermediate",
      exercises: 18,
    },
  ],
  Chest: [
    {
      name: "Chest Beginner",
      emoji: "🏋️",
      duration: 18,
      difficulty: "Beginner",
      exercises: 14,
    },
    {
      name: "Chest Intermediate",
      emoji: "💪",
      duration: 28,
      difficulty: "Intermediate",
      exercises: 20,
    },
  ],
  Leg: [
    {
      name: "Leg Beginner",
      emoji: "🦵",
      duration: 20,
      difficulty: "Beginner",
      exercises: 15,
    },
    {
      name: "Leg Intermediate",
      emoji: "🏋️",
      duration: 30,
      difficulty: "Intermediate",
      exercises: 22,
    },
  ],
  Shoulder: [
    {
      name: "Shoulder Beginner",
      emoji: "🏋️",
      duration: 15,
      difficulty: "Beginner",
      exercises: 12,
    },
    {
      name: "Shoulder Intermediate",
      emoji: "💪",
      duration: 25,
      difficulty: "Intermediate",
      exercises: 18,
    },
  ],
}

export function getDailyWorkout(date: string) {
  const dayOfWeek = new Date(date).getDay()
  const days = ["Day 1", "Day 2", "Day 3", "Day 1", "Day 2", "Day 3", "Day 1"]
  const dayKey = days[dayOfWeek] as keyof typeof DEMO_WORKOUTS
  return DEMO_WORKOUTS[dayKey]
}

export function getWorkoutCategories() {
  return Object.keys(WORKOUT_CATEGORIES)
}

export function getWorkoutsByCategory(category: string) {
  return (WORKOUT_CATEGORIES as any)[category] || []
}

export function getWeeklyStats() {
  return {
    weeklyGoal: "5/7",
    totalDuration: 145,
    totalCalories: 1250,
    dailyData: [
      { day: "Monday", exercises: 11, duration: 25, calories: 180 },
      { day: "Tuesday", exercises: 8, duration: 20, calories: 150 },
      { day: "Wednesday", exercises: 15, duration: 30, calories: 220 },
      { day: "Thursday", exercises: 0, duration: 0, calories: 0 },
      { day: "Friday", exercises: 12, duration: 28, calories: 200 },
      { day: "Saturday", exercises: 10, duration: 22, calories: 160 },
      { day: "Sunday", exercises: 0, duration: 0, calories: 0 },
    ],
  }
}

export async function exportToImage(stats: any, date: string) {
  const canvas = document.createElement("canvas")
  canvas.width = 1080
  canvas.height = 1920

  const ctx = canvas.getContext("2d")
  if (!ctx) return

  // Background
  ctx.fillStyle = "#ffffff"
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // Header
  ctx.fillStyle = "#0066ff"
  ctx.font = "bold 60px Arial"
  ctx.fillText("WORKOUT REPORT", 40, 100)

  // Date
  ctx.fillStyle = "#666666"
  ctx.font = "24px Arial"
  ctx.fillText(`Date: ${date}`, 40, 160)

  // Stats
  ctx.fillStyle = "#000000"
  ctx.font = "bold 40px Arial"
  let yPos = 280

  ctx.fillText(`Weekly Goal: ${stats.weeklyGoal}`, 40, yPos)
  yPos += 80

  ctx.fillText(`Total Duration: ${stats.totalDuration} min`, 40, yPos)
  yPos += 80

  ctx.fillText(`Calories Burned: ${stats.totalCalories}`, 40, yPos)
  yPos += 120

  // Daily breakdown
  ctx.font = "bold 32px Arial"
  ctx.fillText("Daily Breakdown:", 40, yPos)
  yPos += 80

  ctx.font = "24px Arial"
  stats.dailyData.forEach((day: any) => {
    ctx.fillText(`${day.day}: ${day.exercises} exercises, ${day.duration} min, ${day.calories} cal`, 60, yPos)
    yPos += 60
  })

  // Download
  const link = document.createElement("a")
  link.href = canvas.toDataURL("image/png")
  link.download = `workout-report-${date}.png`
  link.click()
}
