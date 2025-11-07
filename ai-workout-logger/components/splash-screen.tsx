"use client"

import { useEffect, useState } from "react"

export function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      onComplete()
    }, 5000)

    return () => clearTimeout(timer)
  }, [onComplete])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center z-50 animate-fade-in">
      <div className="text-center">
        {/* Logo/Icon */}
        <div className="mb-6 text-7xl animate-bounce">🔥</div>

        {/* App Name */}
        <h1 className="text-5xl font-bold text-white mb-2 tracking-tight">FitFreak</h1>

        {/* Tagline */}
        <p className="text-xl text-blue-100 mb-8">Your AI Fitness Companion</p>

        {/* Loading Animation */}
        <div className="flex justify-center gap-2 mb-8">
          <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
          <div className="w-3 h-3 bg-white rounded-full animate-pulse delay-100"></div>
          <div className="w-3 h-3 bg-white rounded-full animate-pulse delay-200"></div>
        </div>

        {/* Motivational Text */}
        <p className="text-sm text-blue-50">Get ready to transform your fitness journey</p>
      </div>
    </div>
  )
}
