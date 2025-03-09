"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Leaf, Users, Award } from "lucide-react"

export default function StatsDisplay() {
  const [stats, setStats] = useState({
    carbonOffset: 0,
    nftreesMinted: 0,
    studentEnrollments: 0,
  })

  useEffect(() => {
    // In a real app, this would fetch from an API
    // For demo purposes, we'll use mock data
    const mockStats = {
      carbonOffset: 1250,
      nftreesMinted: 427,
      studentEnrollments: 3892,
    }

    // Animate the numbers counting up
    const duration = 2000 // 2 seconds
    const steps = 50
    const interval = duration / steps

    let step = 0
    const timer = setInterval(() => {
      step++
      setStats({
        carbonOffset: Math.floor((mockStats.carbonOffset / steps) * step),
        nftreesMinted: Math.floor((mockStats.nftreesMinted / steps) * step),
        studentEnrollments: Math.floor((mockStats.studentEnrollments / steps) * step),
      })

      if (step >= steps) {
        clearInterval(timer)
        setStats(mockStats)
      }
    }, interval)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardContent className="p-6 flex items-center gap-4">
          <div className="p-2 bg-primary/10 rounded-full">
            <Leaf className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total CO₂ Offset</p>
            <h3 className="text-2xl font-bold">{stats.carbonOffset} tons</h3>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6 flex items-center gap-4">
          <div className="p-2 bg-primary/10 rounded-full">
            <Award className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">NFTrees Minted</p>
            <h3 className="text-2xl font-bold">{stats.nftreesMinted}</h3>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6 flex items-center gap-4">
          <div className="p-2 bg-primary/10 rounded-full">
            <Users className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Student Enrollments</p>
            <h3 className="text-2xl font-bold">{stats.studentEnrollments}</h3>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

