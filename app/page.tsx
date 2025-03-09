import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Leaf, BookOpen, BarChart3 } from "lucide-react"
import Link from "next/link"
import StatsDisplay from "@/components/stats-display"
import SponsorShowcase from "@/components/sponsor-showcase"

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-b from-secondary/50 to-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Earn NFTrees by Learning & Offsetting Carbon
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Join our platform to learn about climate change, earn NFT credentials, and make a real impact on the
                environment.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link href="/connect">Connect Wallet</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/courses">Start Learning</Link>
              </Button>
              <Button size="lg" variant="secondary" asChild>
                <Link href="/impact">View Impact</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-muted/50">
        <div className="container px-4 md:px-6">
          <StatsDisplay />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                <div className="p-2 bg-primary/10 rounded-full">
                  <Leaf className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Learn About Climate</h3>
                <p className="text-muted-foreground">
                  Access high-quality courses about climate change, sustainability, and environmental impact.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                <div className="p-2 bg-primary/10 rounded-full">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Earn NFT Credentials</h3>
                <p className="text-muted-foreground">
                  Get rewarded with unique NFTrees for completing courses and demonstrating your knowledge.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                <div className="p-2 bg-primary/10 rounded-full">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Make Real Impact</h3>
                <p className="text-muted-foreground">
                  Companies sponsor carbon offsets based on your learning, creating tangible environmental benefits.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Sponsors Section */}
      <section className="py-12 bg-muted/50">
        <div className="container px-4 md:px-6">
          <h2 className="text-2xl font-bold text-center mb-8">Our Sponsors</h2>
          <SponsorShowcase />
        </div>
      </section>
    </div>
  )
}

