// Enhanced export functionality with better image generation

export async function exportWorkoutAsImage(
  workoutData: any,
  date: string,
  format: "png" | "jpg" = "png",
): Promise<void> {
  const canvas = document.createElement("canvas")
  canvas.width = 1080
  canvas.height = 1920

  const ctx = canvas.getContext("2d")
  if (!ctx) return

  // Background gradient
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
  gradient.addColorStop(0, "#ffffff")
  gradient.addColorStop(1, "#f5f5f5")
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // Header
  ctx.fillStyle = "#0066ff"
  ctx.font = "bold 70px Arial"
  ctx.textAlign = "center"
  ctx.fillText("WORKOUT REPORT", canvas.width / 2, 120)

  // Date
  ctx.fillStyle = "#666666"
  ctx.font = "28px Arial"
  ctx.fillText(`Date: ${date}`, canvas.width / 2, 200)

  // Divider
  ctx.strokeStyle = "#0066ff"
  ctx.lineWidth = 3
  ctx.beginPath()
  ctx.moveTo(100, 240)
  ctx.lineTo(canvas.width - 100, 240)
  ctx.stroke()

  // Stats
  ctx.fillStyle = "#000000"
  ctx.font = "bold 48px Arial"
  ctx.textAlign = "left"
  let yPos = 320

  ctx.fillText(`Weekly Goal: ${workoutData.weeklyGoal}`, 60, yPos)
  yPos += 100

  ctx.fillText(`Total Duration: ${workoutData.totalDuration} min`, 60, yPos)
  yPos += 100

  ctx.fillText(`Calories Burned: ${workoutData.totalCalories}`, 60, yPos)
  yPos += 150

  // Daily breakdown header
  ctx.font = "bold 40px Arial"
  ctx.fillText("Daily Breakdown:", 60, yPos)
  yPos += 80

  // Daily breakdown items
  ctx.font = "24px Arial"
  ctx.fillStyle = "#333333"
  workoutData.dailyData.forEach((day: any) => {
    const dayText = `${day.day}: ${day.exercises} exercises`
    const timeText = `${day.duration} min | ${day.calories} cal`

    ctx.fillText(dayText, 80, yPos)
    yPos += 50
    ctx.fillStyle = "#0066ff"
    ctx.font = "22px Arial"
    ctx.fillText(timeText, 100, yPos)
    yPos += 60
    ctx.fillStyle = "#333333"
    ctx.font = "24px Arial"
  })

  // Footer
  yPos = canvas.height - 100
  ctx.fillStyle = "#999999"
  ctx.font = "18px Arial"
  ctx.textAlign = "center"
  ctx.fillText("Generated with AI Workout Logger", canvas.width / 2, yPos)
  ctx.fillText(`${new Date().toLocaleDateString()}`, canvas.width / 2, yPos + 40)

  // Download
  const link = document.createElement("a")
  link.href = canvas.toDataURL(`image/${format}`)
  link.download = `workout-report-${date}.${format}`
  link.click()
}

export async function exportDailyExercisesAsImage(exercises: any[], date: string, dayName: string): Promise<void> {
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
  ctx.textAlign = "center"
  ctx.fillText(dayName, canvas.width / 2, 100)

  // Date
  ctx.fillStyle = "#666666"
  ctx.font = "24px Arial"
  ctx.fillText(`Date: ${date}`, canvas.width / 2, 160)

  // Exercises
  ctx.fillStyle = "#000000"
  ctx.font = "bold 36px Arial"
  ctx.textAlign = "left"
  let yPos = 260

  exercises.forEach((exercise, idx) => {
    // Exercise number
    ctx.fillStyle = "#0066ff"
    ctx.font = "bold 32px Arial"
    ctx.fillText(`${idx + 1}. ${exercise.name}`, 60, yPos)
    yPos += 60

    // Exercise details
    ctx.fillStyle = "#666666"
    ctx.font = "24px Arial"
    if (exercise.duration) {
      ctx.fillText(`Duration: ${exercise.duration} minutes`, 80, yPos)
    } else if (exercise.reps) {
      ctx.fillText(`Reps: ${exercise.reps}`, 80, yPos)
    }
    yPos += 50

    // Description
    ctx.fillStyle = "#999999"
    ctx.font = "20px Arial"
    ctx.fillText(exercise.description || "Perform with proper form", 80, yPos)
    yPos += 80
  })

  // Download
  const link = document.createElement("a")
  link.href = canvas.toDataURL("image/png")
  link.download = `exercises-${dayName}-${date}.png`
  link.click()
}
