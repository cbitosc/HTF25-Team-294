"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { TrainingPage } from "@/components/pages/training-page"
import { DiscoverPage } from "@/components/pages/discover-page"
import { ReportPage } from "@/components/pages/report-page"
import { SettingsPage } from "@/components/pages/settings-page"
import { WelcomePage } from "@/components/pages/welcome-page"
import { ExercisesLibraryPage } from "@/components/pages/exercises-library-page"
import { SplashScreen } from "@/components/splash-screen"

export default function Home() {
  const [currentPage, setCurrentPage] = useState("welcome")
  const [mounted, setMounted] = useState(false)
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-background text-foreground">
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}

      <div className="max-w-md mx-auto bg-background min-h-screen flex flex-col">
        {/* Page Content */}
        <div className="flex-1 overflow-y-auto pb-20">
          {currentPage === "welcome" && <WelcomePage onStart={() => setCurrentPage("training")} />}
          {currentPage === "training" && <TrainingPage />}
          {currentPage === "discover" && <DiscoverPage onCreateCustom={() => setCurrentPage("training")} />}
          {currentPage === "exercises" && <ExercisesLibraryPage />}
          {currentPage === "report" && <ReportPage />}
          {currentPage === "settings" && <SettingsPage />}
        </div>

        {/* Navigation */}
        <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />
      </div>
    </div>
  )
}
