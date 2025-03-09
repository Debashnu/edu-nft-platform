import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, BookOpen } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Mock data for courses
const courses = [
  {
    id: 1,
    title: "Climate Change Fundamentals",
    description: "Learn the basics of climate science and global warming.",
    image: "/placeholder.svg?height=200&width=300",
    duration: "4 hours",
    level: "Beginner",
    students: 1245,
    modules: 5,
  },
  {
    id: 2,
    title: "Renewable Energy Solutions",
    description: "Explore different renewable energy technologies and their impact.",
    image: "/placeholder.svg?height=200&width=300",
    duration: "6 hours",
    level: "Intermediate",
    students: 892,
    modules: 8,
  },
  {
    id: 3,
    title: "Carbon Footprint Reduction",
    description: "Practical strategies to reduce your carbon footprint.",
    image: "/placeholder.svg?height=200&width=300",
    duration: "5 hours",
    level: "Beginner",
    students: 1056,
    modules: 6,
  },
  {
    id: 4,
    title: "Sustainable Business Practices",
    description: "How businesses can adopt sustainable practices.",
    image: "/placeholder.svg?height=200&width=300",
    duration: "8 hours",
    level: "Advanced",
    students: 678,
    modules: 10,
  },
  {
    id: 5,
    title: "Climate Policy and Governance",
    description: "Understanding international climate agreements and policies.",
    image: "/placeholder.svg?height=200&width=300",
    duration: "7 hours",
    level: "Advanced",
    students: 523,
    modules: 9,
  },
  {
    id: 6,
    title: "Biodiversity and Ecosystems",
    description: "The relationship between climate change and biodiversity loss.",
    image: "/placeholder.svg?height=200&width=300",
    duration: "6 hours",
    level: "Intermediate",
    students: 745,
    modules: 7,
  },
]

export default function CoursesPage() {
  return (
    <div className="container py-8">
      <div className="flex flex-col items-center text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">Climate Education Courses</h1>
        <p className="text-muted-foreground max-w-2xl">
          Complete these courses to earn NFT credentials while companies sponsor carbon offsets based on your learning
          progress.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <Card key={course.id} className="overflow-hidden flex flex-col">
            <div className="relative h-48">
              <Image src={course.image || "/placeholder.svg"} alt={course.title} fill className="object-cover" />
              <div className="absolute top-2 right-2">
                <Badge className="bg-background/80 text-foreground backdrop-blur-sm">{course.level}</Badge>
              </div>
            </div>
            <CardHeader>
              <CardTitle>{course.title}</CardTitle>
              <CardDescription>{course.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center">
                  <BookOpen className="h-4 w-4 mr-1" />
                  <span>{course.modules} modules</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  <span>{course.students}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 flex-1 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: "0%" }}></div>
                </div>
                <span className="text-xs font-medium">0% complete</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href={`/courses/${course.id}`}>Start Learning</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

