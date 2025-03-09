"use client"

import { useEffect, useState } from "react"
import { useWeb3 } from "@/components/web3-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Award, BookOpen, CheckCircle, Clock } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Mock data for student dashboard
const mockCourses = [
  {
    id: 1,
    title: "Climate Change Fundamentals",
    description: "Learn the basics of climate science and global warming.",
    progress: 100,
    completed: true,
    duration: "4 hours",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    title: "Renewable Energy Solutions",
    description: "Explore different renewable energy technologies and their impact.",
    progress: 65,
    completed: false,
    duration: "6 hours",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    title: "Carbon Footprint Reduction",
    description: "Practical strategies to reduce your carbon footprint.",
    progress: 30,
    completed: false,
    duration: "5 hours",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 4,
    title: "Sustainable Business Practices",
    description: "How businesses can adopt sustainable practices.",
    progress: 0,
    completed: false,
    duration: "8 hours",
    image: "/placeholder.svg?height=200&width=300",
  },
]

const mockNFTs = [
  {
    id: 1,
    name: "Open Campus ID",
    image: "/placeholder.svg?height=300&width=300",
    description: "Your digital student identity on the blockchain",
    tokenId: "0x123...456",
  },
  {
    id: 2,
    name: "Climate Champion NFTree",
    image: "/placeholder.svg?height=300&width=300",
    description: "Awarded for completing Climate Change Fundamentals",
    tokenId: "0x789...012",
  },
]

export default function StudentDashboard() {
  const { isConnected, connect, address } = useWeb3()
  const [learningScore, setLearningScore] = useState(75)
  const [impactScore, setImpactScore] = useState(42)
  const [courses, setCourses] = useState(mockCourses)
  const [nfts, setNfts] = useState(mockNFTs)

  useEffect(() => {
    // In a real app, this would fetch the student's data from an API
    // For demo purposes, we're using mock data
  }, [address])

  if (!isConnected) {
    return (
      <div className="container py-12 flex flex-col items-center justify-center min-h-[70vh]">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Connect Your Wallet</CardTitle>
            <CardDescription>Please connect your wallet to access your student dashboard.</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button onClick={connect} className="w-full">
              Connect Wallet
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Student Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Learning Score</CardTitle>
            <CardDescription>Your progress in climate education</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl font-bold">{learningScore}/100</span>
              <BookOpen className="h-5 w-5 text-primary" />
            </div>
            <Progress value={learningScore} className="h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Impact Score</CardTitle>
            <CardDescription>Your contribution to carbon reduction</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl font-bold">{impactScore}/100</span>
              <Award className="h-5 w-5 text-primary" />
            </div>
            <Progress value={impactScore} className="h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Wallet</CardTitle>
            <CardDescription>Your connected wallet</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="font-mono text-sm">
                {address?.slice(0, 10)}...{address?.slice(-8)}
              </span>
              <Badge variant="outline">Educhain</Badge> {/* Updated to Educhain */}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="courses" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="nfts">My NFTs</TabsTrigger>
        </TabsList>

        <TabsContent value="courses">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <Card key={course.id} className="overflow-hidden">
                <div className="relative h-40">
                  <Image src={course.image || "/placeholder.svg"} alt={course.title} fill className="object-cover" />
                  {course.completed && (
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-primary">
                        <CheckCircle className="h-3 w-3 mr-1" /> Completed
                      </Badge>
                    </div>
                  )}
                </div>
                <CardHeader>
                  <CardTitle>{course.title}</CardTitle>
                  <CardDescription>{course.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">{course.progress}% complete</span>
                    <span className="text-sm flex items-center">
                      <Clock className="h-3 w-3 mr-1" /> {course.duration}
                    </span>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href={`/courses/${course.id}`}>
                      {course.completed ? "Review Course" : "Continue Learning"}
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="nfts">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {nfts.map((nft) => (
              <Card key={nft.id}>
                <div className="p-6 flex flex-col items-center">
                  <div className="relative h-48 w-48 mb-4">
                    <Image src={nft.image || "/placeholder.svg"} alt={nft.name} fill className="object-contain" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{nft.name}</h3>
                  <p className="text-sm text-muted-foreground text-center mb-4">{nft.description}</p>
                  <p className="text-xs font-mono bg-muted p-2 rounded-md w-full text-center truncate">
                    Token ID: {nft.tokenId}
                  </p>
                </div>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View on Educhain Explorer {/* Updated to Educhain Explorer */}
                  </Button>
                </CardFooter>
              </Card>
            ))}
            <Card>
              <div className="p-6 flex flex-col items-center justify-center h-full min-h-[300px]">
                <Award className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-xl font-bold mb-2">Earn More NFTrees</h3>
                <p className="text-sm text-muted-foreground text-center mb-4">
                  Complete more courses to earn unique NFT credentials.
                </p>
                <Button asChild>
                  <Link href="/courses">Browse Courses</Link>
                </Button>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}