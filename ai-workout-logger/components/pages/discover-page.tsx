"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getWorkoutCategories, getWorkoutsByCategory } from "@/lib/demo-data"
import { Search, Flame } from "lucide-react"

interface DiscoverPageProps {
  onCreateCustom?: () => void
}

export function DiscoverPage({ onCreateCustom }: DiscoverPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const categories = getWorkoutCategories()
  const workouts = selectedCategory ? getWorkoutsByCategory(selectedCategory) : []

  const filteredWorkouts = workouts.filter((w) => w.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="p-4 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">HOME WORKOUT</h1>
        <div className="flex gap-2">
          <Flame className="text-red-500" size={24} />
          <span className="text-sm font-semibold">PRO</span>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-3 text-muted-foreground" size={20} />
        <Input
          placeholder="Search workouts, plans..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {!selectedCategory ? (
        <>
          {/* Custom Workout */}
          <Card className="bg-gradient-to-br from-primary to-primary/80 p-6 text-white rounded-2xl">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-bold mb-2">CREATE YOUR OWN</h3>
                <Button onClick={onCreateCustom} className="bg-white text-primary hover:bg-white/90">
                  GO
                </Button>
              </div>
              <div className="text-4xl">✏️</div>
            </div>
          </Card>

          {/* Categories */}
          <div>
            <h2 className="text-xl font-bold mb-4">Body Focus</h2>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className="px-4 py-2 rounded-full border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors whitespace-nowrap"
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Featured Workouts */}
          <div>
            <h2 className="text-xl font-bold mb-4">Just For You</h2>
            <div className="space-y-3">
              {getWorkoutsByCategory("Full Body")
                .slice(0, 3)
                .map((w, idx) => (
                  <Card key={idx} className="p-4 cursor-pointer hover:bg-muted">
                    <div className="flex gap-4">
                      <div className="text-4xl">{w.emoji}</div>
                      <div className="flex-1">
                        <h3 className="font-bold">{w.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {w.duration} min • {w.difficulty}
                        </p>
                      </div>
                      <span className="text-primary">→</span>
                    </div>
                  </Card>
                ))}
            </div>
          </div>
        </>
      ) : (
        <>
          <button onClick={() => setSelectedCategory(null)} className="text-primary font-semibold mb-4">
            ← Back
          </button>
          <h2 className="text-2xl font-bold mb-4">{selectedCategory} Workouts</h2>
          <div className="space-y-3">
            {filteredWorkouts.map((w, idx) => (
              <Card key={idx} className="p-4 cursor-pointer hover:bg-muted">
                <div className="flex gap-4">
                  <div className="text-4xl">{w.emoji}</div>
                  <div className="flex-1">
                    <h3 className="font-bold">{w.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {w.duration} min • {w.difficulty}
                    </p>
                  </div>
                  <span className="text-primary">→</span>
                </div>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
