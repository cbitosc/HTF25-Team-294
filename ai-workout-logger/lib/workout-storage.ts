import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface WorkoutSession {
  id: string
  date: string
  exercises: Array<{
    name: string
    emoji: string
    duration?: number
    reps?: number
    completed: boolean
    completedTime?: number
  }>
  totalDuration: number
  totalExercises: number
  fitnessLevel: string
  primaryGoal: string
  focusArea: string
}

interface WorkoutStore {
  sessions: WorkoutSession[]
  currentSession: WorkoutSession | null
  addSession: (session: WorkoutSession) => void
  updateSession: (id: string, session: Partial<WorkoutSession>) => void
  getCurrentDaySession: () => WorkoutSession | null
  getSessionByDate: (date: string) => WorkoutSession | null
}

export const useWorkoutStore = create<WorkoutStore>(
  persist(
    (set, get) => ({
      sessions: [],
      currentSession: null,

      addSession: (session) => {
        set((state) => ({
          sessions: [...state.sessions, session],
          currentSession: session,
        }))
      },

      updateSession: (id, updates) => {
        set((state) => ({
          sessions: state.sessions.map((s) => (s.id === id ? { ...s, ...updates } : s)),
          currentSession:
            state.currentSession?.id === id ? { ...state.currentSession, ...updates } : state.currentSession,
        }))
      },

      getCurrentDaySession: () => {
        const today = new Date().toISOString().split("T")[0]
        return get().sessions.find((s) => s.date === today) || null
      },

      getSessionByDate: (date) => {
        return get().sessions.find((s) => s.date === date) || null
      },
    }),
    {
      name: "workout-storage",
    },
  ),
)
