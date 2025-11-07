"use client"

interface GenerateWorkoutParams {
  bodyFocus?: string
  difficulty?: "beginner" | "intermediate" | "advanced"
  duration?: number
  goal?: string
  apiKey?: string
}

interface Exercise {
  name: string
  emoji: string
  duration?: number
  reps?: number
  description: string
}

export async function generateWorkoutWithAI(params: GenerateWorkoutParams): Promise<Exercise[]> {
  const apiKey = params.apiKey || localStorage.getItem("openai_api_key")

  if (!apiKey) {
    return generateDemoWorkout(params)
  }

  try {
    const prompt = buildPrompt(params)
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are a professional fitness trainer. Generate a detailed workout with specific exercises. Return ONLY a valid JSON array, no other text. Each exercise must have: name (string), emoji (single emoji character), duration (number in minutes, or null), reps (number, or null), and description (string). Include 6-10 exercises.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    })

    if (!response.ok) {
      console.error("OpenAI API error:", response.statusText)
      return generateDemoWorkout(params)
    }

    const data = await response.json()
    const content = data.choices[0].message.content

    // Parse JSON from response
    const jsonMatch = content.match(/\[[\s\S]*\]/)
    if (jsonMatch) {
      const exercises = JSON.parse(jsonMatch[0])
      return exercises.map((ex: any) => ({
        name: ex.name || "Exercise",
        emoji: ex.emoji || "💪",
        duration: ex.duration || undefined,
        reps: ex.reps || undefined,
        description: ex.description || "Perform this exercise with proper form.",
      }))
    }

    return generateDemoWorkout(params)
  } catch (error) {
    console.error("Error generating workout with AI:", error)
    return generateDemoWorkout(params)
  }
}

function buildPrompt(params: GenerateWorkoutParams): string {
  const bodyFocus = params.bodyFocus || "Full Body"
  const difficulty = params.difficulty || "beginner"
  const duration = params.duration || 20
  const goal = params.goal || "general fitness"

  return `Create a ${difficulty} level ${bodyFocus} workout for the goal of ${goal}.
The total workout should take approximately ${duration} minutes.

Return ONLY a JSON array with 6-10 exercises. Each exercise must have:
- name: specific exercise name
- emoji: single relevant emoji
- duration: minutes (or null if reps-based)
- reps: number of repetitions (or null if time-based)
- description: brief description of how to perform it

Example format:
[
  {"name": "Warm-up Jog", "emoji": "🏃", "duration": 2, "reps": null, "description": "Light jogging in place"},
  {"name": "Push-ups", "emoji": "💪", "duration": null, "reps": 15, "description": "Standard push-ups with proper form"}
]

Make the workout realistic, safe, and appropriate for ${difficulty} level fitness.`
}

function generateDemoWorkout(params: GenerateWorkoutParams): Exercise[] {
  const demoExercises: Record<string, Record<string, Exercise[]>> = {
    "Full Body": {
      beginner: [
        {
          name: "Warm-up Jumping Jacks",
          emoji: "🤸",
          duration: 1,
          description: "Get your heart rate up with jumping jacks",
        },
        { name: "Bodyweight Squats", emoji: "🦵", reps: 12, description: "Lower body strength exercise" },
        { name: "Push-ups (Modified)", emoji: "💪", reps: 8, description: "Knee push-ups for beginners" },
        { name: "Plank Hold", emoji: "📍", duration: 1, description: "Core stability exercise" },
        { name: "Lunges", emoji: "🚶", reps: 10, description: "Single leg strength exercise" },
        { name: "Mountain Climbers", emoji: "⛰️", duration: 1, description: "Cardio and core exercise" },
        { name: "Burpees (Modified)", emoji: "🤸", reps: 5, description: "Full body explosive exercise" },
        { name: "Cool-down Stretching", emoji: "🧘", duration: 2, description: "Stretch all major muscle groups" },
      ],
      intermediate: [
        { name: "Dynamic Warm-up", emoji: "🔥", duration: 2, description: "Arm circles and leg swings" },
        { name: "Push-ups", emoji: "💪", reps: 15, description: "Standard push-ups with proper form" },
        { name: "Squats", emoji: "🦵", reps: 20, description: "Deep bodyweight squats" },
        { name: "Plank", emoji: "📍", duration: 2, description: "Extended core hold" },
        { name: "Burpees", emoji: "🤸", reps: 10, description: "Full body explosive exercise" },
        { name: "Lunges (Alternating)", emoji: "🚶", reps: 16, description: "Walking lunges" },
        { name: "Russian Twists", emoji: "🔄", reps: 20, description: "Oblique core exercise" },
        { name: "Jump Squats", emoji: "⬆️", reps: 12, description: "Explosive lower body" },
        { name: "Cool-down", emoji: "🧘", duration: 2, description: "Full body stretching" },
      ],
      advanced: [
        { name: "HIIT Warm-up", emoji: "🔥", duration: 2, description: "High intensity interval training warm-up" },
        { name: "Diamond Push-ups", emoji: "💎", reps: 12, description: "Advanced push-up variation" },
        { name: "Pistol Squats", emoji: "🦵", reps: 8, description: "Single leg squats" },
        { name: "Handstand Hold", emoji: "🤸", duration: 1, description: "Advanced balance exercise" },
        { name: "Burpee Box Jumps", emoji: "📦", reps: 8, description: "Explosive full body movement" },
        { name: "Decline Push-ups", emoji: "📉", reps: 10, description: "Feet elevated push-ups" },
        { name: "Plank to Pike", emoji: "🏔️", reps: 12, description: "Advanced core exercise" },
        { name: "Mountain Climbers (Fast)", emoji: "⛰️", duration: 2, description: "High speed cardio" },
        { name: "Cool-down Yoga", emoji: "🧘", duration: 3, description: "Restorative stretching" },
      ],
    },
    "Upper Body": {
      beginner: [
        { name: "Arm Circles", emoji: "🔄", duration: 1, description: "Shoulder warm-up" },
        { name: "Push-ups (Incline)", emoji: "💪", reps: 10, description: "Easier push-up variation" },
        { name: "Tricep Dips (Chair)", emoji: "🪑", reps: 8, description: "Tricep strengthening" },
        { name: "Shoulder Taps", emoji: "👋", reps: 12, description: "Plank variation for shoulders" },
        { name: "Wall Push-ups", emoji: "🧱", reps: 15, description: "Beginner friendly push-ups" },
        { name: "Bicep Curls (Bodyweight)", emoji: "💪", reps: 12, description: "Resistance band alternative" },
      ],
      intermediate: [
        { name: "Warm-up Arm Swings", emoji: "🔄", duration: 1, description: "Dynamic shoulder warm-up" },
        { name: "Push-ups", emoji: "💪", reps: 15, description: "Standard push-ups" },
        { name: "Tricep Dips", emoji: "🪑", reps: 12, description: "Tricep exercise" },
        { name: "Pike Push-ups", emoji: "🏔️", reps: 10, description: "Shoulder focused push-up" },
        { name: "Plank Shoulder Taps", emoji: "👋", reps: 20, description: "Plank variation" },
        { name: "Reverse Push-ups", emoji: "🔄", reps: 10, description: "Back and shoulder exercise" },
      ],
      advanced: [
        { name: "Dynamic Warm-up", emoji: "🔥", duration: 2, description: "Intense shoulder prep" },
        { name: "Diamond Push-ups", emoji: "💎", reps: 12, description: "Advanced push-up" },
        { name: "Decline Push-ups", emoji: "📉", reps: 10, description: "Feet elevated" },
        { name: "Archer Push-ups", emoji: "🏹", reps: 8, description: "One-sided push-up" },
        { name: "Handstand Push-ups", emoji: "🤸", reps: 5, description: "Advanced shoulder exercise" },
        { name: "Pseudo Planche Lean", emoji: "🏋️", duration: 1, description: "Strength hold" },
      ],
    },
    "Lower Body": {
      beginner: [
        { name: "Leg Swings", emoji: "🦵", duration: 1, description: "Hip and leg warm-up" },
        { name: "Bodyweight Squats", emoji: "🦵", reps: 15, description: "Basic squat" },
        { name: "Lunges", emoji: "🚶", reps: 10, description: "Single leg exercise" },
        { name: "Glute Bridges", emoji: "🌉", reps: 12, description: "Glute activation" },
        { name: "Calf Raises", emoji: "🦵", reps: 20, description: "Calf strengthening" },
        { name: "Wall Sit", emoji: "🪑", duration: 1, description: "Isometric leg exercise" },
      ],
      intermediate: [
        { name: "Dynamic Leg Warm-up", emoji: "🔥", duration: 2, description: "Leg prep" },
        { name: "Squats", emoji: "🦵", reps: 20, description: "Deep squats" },
        { name: "Walking Lunges", emoji: "🚶", reps: 16, description: "Alternating lunges" },
        { name: "Jump Squats", emoji: "⬆️", reps: 12, description: "Explosive squats" },
        { name: "Single Leg Glute Bridges", emoji: "🌉", reps: 10, description: "Advanced glute work" },
        { name: "Bulgarian Split Squats", emoji: "🇧🇬", reps: 12, description: "Single leg squat variation" },
      ],
      advanced: [
        { name: "HIIT Leg Warm-up", emoji: "🔥", duration: 2, description: "Intense prep" },
        { name: "Pistol Squats", emoji: "🦵", reps: 8, description: "Single leg squat" },
        { name: "Jump Lunges", emoji: "⬆️", reps: 12, description: "Explosive lunges" },
        { name: "Single Leg Deadlifts", emoji: "🏋️", reps: 10, description: "Balance and strength" },
        { name: "Box Jump Squats", emoji: "📦", reps: 8, description: "Explosive power" },
        { name: "Nordic Curls", emoji: "🇳🇴", reps: 6, description: "Hamstring strength" },
      ],
    },
    Core: {
      beginner: [
        { name: "Warm-up Marching", emoji: "🚶", duration: 1, description: "Light cardio warm-up" },
        { name: "Plank Hold", emoji: "📍", duration: 1, description: "Basic core hold" },
        { name: "Crunches", emoji: "🤸", reps: 15, description: "Abdominal exercise" },
        { name: "Leg Raises (Bent)", emoji: "🦵", reps: 12, description: "Lower ab exercise" },
        { name: "Bird Dog", emoji: "🐕", reps: 12, description: "Core stability" },
        { name: "Dead Bug", emoji: "🐛", reps: 12, description: "Core coordination" },
      ],
      intermediate: [
        { name: "Dynamic Core Warm-up", emoji: "🔥", duration: 1, description: "Core activation" },
        { name: "Plank", emoji: "📍", duration: 2, description: "Extended hold" },
        { name: "Russian Twists", emoji: "🔄", reps: 20, description: "Oblique exercise" },
        { name: "Leg Raises", emoji: "🦵", reps: 15, description: "Lower ab work" },
        { name: "Mountain Climbers", emoji: "⛰️", duration: 1, description: "Dynamic core" },
        { name: "Bicycle Crunches", emoji: "🚴", reps: 20, description: "Oblique crunches" },
      ],
      advanced: [
        { name: "HIIT Core Warm-up", emoji: "🔥", duration: 2, description: "Intense prep" },
        { name: "Plank to Pike", emoji: "🏔️", reps: 15, description: "Advanced core" },
        { name: "Hanging Leg Raises", emoji: "🦵", reps: 12, description: "Strength exercise" },
        { name: "Ab Wheel Rollout", emoji: "🎡", reps: 10, description: "Advanced ab exercise" },
        { name: "Hollow Body Hold", emoji: "⭕", duration: 2, description: "Gymnastics core" },
        { name: "Dragon Flags", emoji: "🐉", reps: 8, description: "Advanced core strength" },
      ],
    },
    Cardio: {
      beginner: [
        { name: "Marching in Place", emoji: "🚶", duration: 2, description: "Light warm-up" },
        { name: "Jumping Jacks", emoji: "🤸", duration: 2, description: "Full body cardio" },
        { name: "High Knees", emoji: "🦵", duration: 1, description: "Cardio and leg work" },
        { name: "Butt Kicks", emoji: "🦵", duration: 1, description: "Hamstring cardio" },
        { name: "Step Touches", emoji: "👣", duration: 2, description: "Low impact cardio" },
        { name: "Cool-down Walk", emoji: "🚶", duration: 2, description: "Recovery" },
      ],
      intermediate: [
        { name: "Dynamic Warm-up", emoji: "🔥", duration: 2, description: "Cardio prep" },
        { name: "Burpees", emoji: "🤸", reps: 12, description: "Full body cardio" },
        { name: "Jump Rope (Simulated)", emoji: "🪢", duration: 2, description: "Cardio exercise" },
        { name: "Mountain Climbers", emoji: "⛰️", duration: 2, description: "Cardio and core" },
        { name: "High Intensity Sprints", emoji: "🏃", duration: 1, description: "HIIT cardio" },
        { name: "Cool-down Jog", emoji: "🏃", duration: 2, description: "Recovery jog" },
      ],
      advanced: [
        { name: "HIIT Warm-up", emoji: "🔥", duration: 2, description: "Intense prep" },
        { name: "Burpee Box Jumps", emoji: "📦", reps: 10, description: "Explosive cardio" },
        { name: "Double Unders (Simulated)", emoji: "🪢", duration: 2, description: "Advanced jump rope" },
        { name: "Sprint Intervals", emoji: "🏃", duration: 3, description: "Max effort sprints" },
        { name: "Plyometric Circuits", emoji: "💥", duration: 2, description: "Explosive movements" },
        { name: "Cool-down Stretching", emoji: "🧘", duration: 2, description: "Recovery" },
      ],
    },
  }

  const bodyFocus = params.bodyFocus || "Full Body"
  const difficulty = params.difficulty || "beginner"

  const focusExercises = demoExercises[bodyFocus] || demoExercises["Full Body"]
  return focusExercises[difficulty] || focusExercises["beginner"]
}
