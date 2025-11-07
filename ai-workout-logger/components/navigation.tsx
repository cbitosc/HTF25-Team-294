"use client"

import { Activity, Compass, BarChart3, Settings, Sparkles, Home, BookOpen } from "lucide-react"

interface NavigationProps {
  currentPage: string
  onPageChange: (page: string) => void
}

export function Navigation({ currentPage, onPageChange }: NavigationProps) {
  const navItems = [
    { id: "welcome", label: "Home", icon: Home },
    { id: "training", label: "Training", icon: Activity },
    { id: "exercises", label: "Exercises", icon: BookOpen },
    { id: "ai-generator", label: "AI", icon: Sparkles },
    { id: "discover", label: "Discover", icon: Compass },
    { id: "report", label: "Report", icon: BarChart3 },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-background border-t border-border flex justify-around items-center h-20 overflow-x-auto">
      {navItems.map((item) => {
        const Icon = item.icon
        const isActive = currentPage === item.id
        return (
          <button
            key={item.id}
            onClick={() => onPageChange(item.id)}
            className={`flex flex-col items-center justify-center flex-shrink-0 w-16 h-full gap-1 transition-colors ${
              isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Icon size={24} />
            <span className="text-xs">{item.label}</span>
          </button>
        )
      })}
    </nav>
  )
}
