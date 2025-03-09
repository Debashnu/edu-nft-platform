"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { useWeb3 } from "@/components/web3-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle, Clock, Award, BookOpen, Play, FileText, CheckSquare } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Mock course data
const coursesData = [
  {
    id: 1,
    title: "Climate Change Fundamentals",
    description: "Learn the basics of climate science and global warming.",
    image: "/placeholder.svg?height=400&width=800",
    duration: "4 hours",
    level: "Beginner",
    students: 1245,
    modules: [
      {
        id: 1,
        title: "Introduction to Climate Science",
        duration: "45 min",
        type: "video",
        completed: false,
      },
      {
        id: 2,
        title: "Greenhouse Effect Explained",
        duration: "30 min",
        type: "video",
        completed: false,
      },
      {
        id: 3,
        title: "Global Warming Trends",
        duration: "50 min",
        type: "reading",
        completed: false,
      },
      {
        id: 4,
        title: "Climate Change Impacts",
        duration: "40 min",
        type: "video",
        completed: false,
      },
      {
        id: 5,
        title: "Final Assessment",
        duration: "30 min",
        type: "quiz",
        completed: false,
      },
    ],
    instructor: "Dr. Sarah Johnson",
    instructorBio: "Climate scientist with 15 years of research experience",
    instructorImage: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 2,
    title: "Renewable Energy Solutions",
    description: "Explore different renewable energy technologies and their impact.",
    image: "/placeholder.svg?height=400&width=800",
    duration: "6 hours",
    level: "Intermediate",
    students: 892,
    modules: [
      {
        id: 1,
        title: "Introduction to Renewable Energy",
        duration: "40 min",
        type: "video",
        completed: false,
      },
      {
        id: 2,
        title: "Solar Power Technologies",
        duration: "55 min",
        type: "video",
        completed: false,
      },
      {
        id: 3,
        title: "Wind Energy Systems",
        duration: "45 min",
        type: "video",
        completed: false,
      },
      {
        id: 4,
        title: "Hydroelectric Power",
        duration: "35 min",
        type: "reading",
        completed: false,
      },
      {
        id: 5,
        title: "Geothermal Energy",
        duration: "40 min",
        type: "video",
        completed: false,
      },
      {
        id: 6,
        title: "Biomass and Biofuels",
        duration: "50 min",
        type: "reading",
        completed: false,
      },
      {
        id: 7,
        title: "Energy Storage Solutions",
        duration: "45 min",
        type: "video",
        completed: false,
      },
      {
        id: 8,
        title: "Final Assessment",
        duration: "30 min",
        type: "quiz",
        completed: false,
      },
    ],
    instructor: "Prof. Michael Chen",
    instructorBio: "Renewable energy expert and engineering professor",
    instructorImage: "/placeholder.svg?height=100&width=100",
  },
  // Add more courses as needed
]

export default function CourseDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { isConnected, connect } = useWeb3()
  const [course, setCourse] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [activeModule, setActiveModule] = useState<number | null>(null)
  const [showCompletionAlert, setShowCompletionAlert] = useState(false)

  useEffect(() => {
    // In a real app, this would fetch course data from an API
    const courseId = Number(params.id)
    const foundCourse = coursesData.find((c) => c.id === courseId)

    if (foundCourse) {
      setCourse(foundCourse)
      // Calculate initial progress
      const completedModules = foundCourse.modules.filter((m) => m.completed).length
      const totalModules = foundCourse.modules.length
      setProgress(totalModules > 0 ? (completedModules / totalModules) * 100 : 0)
    }

    setLoading(false)
  }, [params.id])

  const completeModule = (moduleId: number) => {
    if (!course) return

    const updatedModules = course.modules.map((module: any) =>
      module.id === moduleId ? { ...module, completed: true } : module,
    )

    const updatedCourse = { ...course, modules: updatedModules }
    setCourse(updatedCourse)

    // Calculate new progress
    const completedModules = updatedModules.filter((m: any) => m.completed).length
    const totalModules = updatedModules.length
    const newProgress = (completedModules / totalModules) * 100
    setProgress(newProgress)

    // Check if course is completed
    if (newProgress === 100) {
      setShowCompletionAlert(true)
    }
  }

  if (loading) {
    return (
      <div className="container py-12 flex justify-center">
        <div className="animate-pulse space-y-4 w-full max-w-4xl">
          <div className="h-8 bg-muted rounded w-3/4"></div>
          <div className="h-64 bg-muted rounded"></div>
          <div className="space-y-2">
            <div className="h-4 bg-muted rounded w-5/6"></div>
            <div className="h-4 bg-muted rounded w-4/6"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!course) {
    return (
      <div className="container py-12 flex flex-col items-center justify-center min-h-[50vh]">
        <h2 className="text-2xl font-bold mb-4">Course Not Found</h2>
        <p className="text-muted-foreground mb-6">The course you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link href="/courses">Browse Courses</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container py-8">
      {showCompletionAlert && (
        <Alert className="mb-6 bg-primary/10 text-primary border-primary">
          <CheckCircle className="h-4 w-4" />
          <AlertTitle>Course Completed!</AlertTitle>
          <AlertDescription className="flex flex-col gap-2">
            <p>Congratulations! You've completed the course. You can now mint your NFTree credential.</p>
            <Button size="sm" className="w-fit" onClick={() => router.push("/mint")}>
              Mint NFTree Credential
            </Button>
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden mb-6">
            <Image src={course.image || "/placeholder.svg"} alt={course.title} fill className="object-cover" />
            <div className="absolute top-4 right-4 flex gap-2">
              <Badge className="bg-background/80 text-foreground backdrop-blur-sm">{course.level}</Badge>
            </div>
          </div>

          <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
          <p className="text-muted-foreground mb-6">{course.description}</p>

          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{course.duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <BookOpen className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{course.modules.length} modules</span>
            </div>
            <div className="flex items-center gap-1">
              <Award className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">NFTree Certificate</span>
            </div>
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Course Progress</span>
              <span className="text-sm">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <Tabs defaultValue="modules">
            <TabsList className="mb-4">
              <TabsTrigger value="modules">Course Content</TabsTrigger>
              <TabsTrigger value="instructor">Instructor</TabsTrigger>
            </TabsList>

            <TabsContent value="modules">
              <Card>
                <CardHeader>
                  <CardTitle>Course Modules</CardTitle>
                  <CardDescription>Complete all modules to earn your NFTree credential</CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {course.modules.map((module: any, index: number) => (
                      <AccordionItem key={module.id} value={`module-${module.id}`}>
                        <AccordionTrigger className="hover:no-underline">
                          <div className="flex items-center gap-3 text-left">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full border bg-muted">
                              {module.completed ? (
                                <CheckCircle className="h-4 w-4 text-primary" />
                              ) : (
                                <span>{index + 1}</span>
                              )}
                            </div>
                            <div>
                              <div className="font-medium">{module.title}</div>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                {module.type === "video" && <Play className="h-3 w-3" />}
                                {module.type === "reading" && <FileText className="h-3 w-3" />}
                                {module.type === "quiz" && <CheckSquare className="h-3 w-3" />}
                                <span>{module.duration}</span>
                              </div>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="pt-2 pb-4 px-4">
                            <p className="text-sm text-muted-foreground mb-4">
                              {module.type === "video" &&
                                "Watch this video lesson to learn about " + module.title.toLowerCase() + "."}
                              {module.type === "reading" &&
                                "Read this article to understand " + module.title.toLowerCase() + "."}
                              {module.type === "quiz" &&
                                "Complete this assessment to test your knowledge of the course material."}
                            </p>

                            {activeModule === module.id ? (
                              <div className="space-y-4">
                                <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                                  {module.type === "video" && <Play className="h-12 w-12 text-muted-foreground/50" />}
                                  {module.type === "reading" && (
                                    <FileText className="h-12 w-12 text-muted-foreground/50" />
                                  )}
                                  {module.type === "quiz" && (
                                    <CheckSquare className="h-12 w-12 text-muted-foreground/50" />
                                  )}
                                </div>
                                <Button
                                  onClick={() => {
                                    completeModule(module.id)
                                    setActiveModule(null)
                                  }}
                                  className="w-full"
                                >
                                  Mark as Completed
                                </Button>
                              </div>
                            ) : (
                              <Button
                                onClick={() => setActiveModule(module.id)}
                                variant={module.completed ? "outline" : "default"}
                                className="w-full"
                                disabled={!isConnected}
                              >
                                {module.completed ? "Review Module" : "Start Module"}
                              </Button>
                            )}

                            {!isConnected && (
                              <div className="mt-2 text-xs text-muted-foreground text-center">
                                <Button variant="link" size="sm" onClick={connect} className="h-auto p-0">
                                  Connect wallet
                                </Button>{" "}
                                to track your progress
                              </div>
                            )}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="instructor">
              <Card>
                <CardHeader>
                  <CardTitle>About the Instructor</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start">
                    <div className="relative h-24 w-24 rounded-full overflow-hidden">
                      <Image
                        src={course.instructorImage || "/placeholder.svg"}
                        alt={course.instructor}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{course.instructor}</h3>
                      <p className="text-muted-foreground">{course.instructorBio}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle>Course Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">What You'll Learn</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary mt-1" />
                    <span>Understand the fundamentals of {course.title.toLowerCase()}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary mt-1" />
                    <span>Apply practical knowledge to real-world scenarios</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary mt-1" />
                    <span>Earn an NFTree credential upon completion</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary mt-1" />
                    <span>Contribute to carbon offset initiatives</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium mb-2">Course Includes</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Play className="h-4 w-4 text-muted-foreground" />
                    <span>{course.modules.filter((m: any) => m.type === "video").length} video lessons</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span>{course.modules.filter((m: any) => m.type === "reading").length} reading materials</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckSquare className="h-4 w-4 text-muted-foreground" />
                    <span>{course.modules.filter((m: any) => m.type === "quiz").length} assessments</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-muted-foreground" />
                    <span>NFTree credential</span>
                  </li>
                </ul>
              </div>

              <div className="pt-2">
                <Button
                  className="w-full mb-2"
                  disabled={progress === 100}
                  onClick={() => {
                    if (!isConnected) {
                      connect()
                    } else {
                      // Find the first incomplete module
                      const firstIncompleteModule = course.modules.find((m: any) => !m.completed)
                      if (firstIncompleteModule) {
                        setActiveModule(firstIncompleteModule.id)
                        // Scroll to the module
                        document.querySelector(`[value="module-${firstIncompleteModule.id}"]`)?.scrollIntoView({
                          behavior: "smooth",
                          block: "center",
                        })
                      }
                    }
                  }}
                >
                  {!isConnected
                    ? "Connect Wallet to Start"
                    : progress === 100
                      ? "Course Completed"
                      : "Continue Learning"}
                </Button>

                {progress === 100 && (
                  <Button variant="outline" className="w-full" onClick={() => router.push("/mint")}>
                    Mint NFTree Credential
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

