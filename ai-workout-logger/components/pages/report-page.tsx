"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Calendar } from "lucide-react"
import { useWorkoutStore } from "@/lib/workout-storage"
import html2canvas from "html2canvas"

export function ReportPage() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0])
  const [isExporting, setIsExporting] = useState(false)
  const { getSessionByDate, sessions } = useWorkoutStore()
  const currentSession = getSessionByDate(selectedDate)

  const handleExportReport = async () => {
    if (!currentSession) return

    setIsExporting(true)
    try {
      const element = document.getElementById("report-content")
      if (element) {
        const canvas = await html2canvas(element, {
          backgroundColor: "#ffffff",
          scale: 2,
        })
        const link = document.createElement("a")
        link.href = canvas.toDataURL("image/png")
        link.download = `workout-report-${selectedDate}.png`
        link.click()
      }
    } catch (error) {
      console.error("Export error:", error)
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-3xl font-bold">REPORT</h1>

      {/* Date Selector */}
      <Card className="p-4">
        <div className="flex items-center gap-2">
          <Calendar size={20} />
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="flex-1 bg-background border border-border rounded px-3 py-2"
          />
        </div>
      </Card>

      {currentSession ? (
        <>
          {/* Report Content */}
          <div id="report-content" className="bg-white p-6 rounded-lg space-y-4">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold mb-2">Workout Report</h2>
              <p className="text-muted-foreground">{selectedDate}</p>
            </div>

            {/* Workout Details */}
            <Card className="p-4 bg-primary/10 border-primary">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Duration</p>
                  <p className="text-2xl font-bold">{currentSession.totalDuration} min</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Exercises</p>
                  <p className="text-2xl font-bold">{currentSession.totalExercises}</p>
                </div>
              </div>
            </Card>

            {/* Workout Info */}
            <Card className="p-4">
              <div className="space-y-2">
                <div>
                  <p className="text-sm text-muted-foreground">Fitness Level</p>
                  <p className="font-semibold">{currentSession.fitnessLevel}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Primary Goal</p>
                  <p className="font-semibold">{currentSession.primaryGoal}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Focus Area</p>
                  <p className="font-semibold">{currentSession.focusArea}</p>
                </div>
              </div>
            </Card>

            {/* Exercises List */}
            <div>
              <h3 className="font-bold mb-3">Exercises Completed</h3>
              <div className="space-y-2">
                {currentSession.exercises.map((ex: any, idx: number) => (
                  <div key={idx} className="flex items-center gap-3 p-2 bg-muted rounded">
                    <span className="text-2xl">{ex.emoji}</span>
                    <div className="flex-1">
                      <p className="font-semibold">{ex.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {ex.duration ? `${ex.duration} min` : `${ex.reps} reps`}
                      </p>
                    </div>
                    {ex.completed && <span className="text-primary font-bold">✓</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Export Button */}
          <Button
            onClick={handleExportReport}
            disabled={isExporting}
            className="w-full h-12 gap-2 bg-primary hover:bg-primary/90"
          >
            <Download size={20} />
            {isExporting ? "Exporting..." : "Export as PNG"}
          </Button>
        </>
      ) : (
        <Card className="p-8 text-center">
          <div className="text-4xl mb-4">📊</div>
          <p className="font-semibold mb-2">No Workout Data</p>
          <p className="text-sm text-muted-foreground">Create a workout to see your report</p>
        </Card>
      )}

      {/* All Sessions Summary */}
      {sessions.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-4">All Sessions</h2>
          <div className="space-y-2">
            {sessions.map((session) => (
              <Card
                key={session.id}
                className={`p-4 cursor-pointer transition-colors ${
                  session.date === selectedDate ? "bg-primary/10 border-primary" : "hover:bg-muted"
                }`}
                onClick={() => setSelectedDate(session.date)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{session.date}</p>
                    <p className="text-sm text-muted-foreground">
                      {session.fitnessLevel} • {session.primaryGoal}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{session.totalDuration} min</p>
                    <p className="text-sm text-primary">{session.totalExercises} exercises</p>
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
