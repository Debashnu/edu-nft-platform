import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Leaf, TreePine, Users, BarChart3, Globe, Droplets } from "lucide-react"
import Image from "next/image"

export default function ImpactPage() {
  return (
    <div className="container py-8">
      <div className="flex flex-col items-center text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">Our Environmental Impact</h1>
        <p className="text-muted-foreground max-w-2xl">
          Track the real-world impact of our platform through carbon offsets, tree planting initiatives, and educational
          outcomes.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Total Carbon Offset</CardTitle>
            <CardDescription>CO₂ offset through our platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold">1,250 tons</span>
              <Leaf className="h-6 w-6 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>NFTrees Minted</CardTitle>
            <CardDescription>Digital trees with real-world impact</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold">427</span>
              <TreePine className="h-6 w-6 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Students Enrolled</CardTitle>
            <CardDescription>Learners on our platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold">3,892</span>
              <Users className="h-6 w-6 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="carbon" className="w-full mb-12">
        <TabsList className="mb-6 grid grid-cols-3 w-full max-w-md mx-auto">
          <TabsTrigger value="carbon">Carbon Impact</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
          <TabsTrigger value="sponsors">Sponsors</TabsTrigger>
        </TabsList>

        <TabsContent value="carbon">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Carbon Offset Progress</CardTitle>
                <CardDescription>Tracking toward our annual goal</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">1,250 of 5,000 tons</span>
                  <span className="text-sm font-medium">25%</span>
                </div>
                <Progress value={25} className="h-2 mb-6" />

                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium flex items-center gap-1">
                        <Leaf className="h-4 w-4 text-primary" /> Direct Offsets
                      </span>
                      <span className="text-sm">750 tons</span>
                    </div>
                    <Progress value={60} className="h-1.5" />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium flex items-center gap-1">
                        <TreePine className="h-4 w-4 text-primary" /> Reforestation
                      </span>
                      <span className="text-sm">350 tons</span>
                    </div>
                    <Progress value={28} className="h-1.5" />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium flex items-center gap-1">
                        <Globe className="h-4 w-4 text-primary" /> Renewable Energy
                      </span>
                      <span className="text-sm">150 tons</span>
                    </div>
                    <Progress value={12} className="h-1.5" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Impact by Region</CardTitle>
                <CardDescription>Where our carbon offsets are making a difference</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative h-64 mb-4">
                  <Image
                    src="/placeholder.svg?height=300&width=500"
                    alt="World map showing impact regions"
                    fill
                    className="object-contain"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge className="bg-primary/20 text-primary hover:bg-primary/30">Asia</Badge>
                      <span className="text-sm font-medium">35%</span>
                    </div>
                    <div className="flex items-center gap-2 mb-1">
                      <Badge className="bg-primary/20 text-primary hover:bg-primary/30">Africa</Badge>
                      <span className="text-sm font-medium">25%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-primary/20 text-primary hover:bg-primary/30">S. America</Badge>
                      <span className="text-sm font-medium">20%</span>
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge className="bg-primary/20 text-primary hover:bg-primary/30">N. America</Badge>
                      <span className="text-sm font-medium">10%</span>
                    </div>
                    <div className="flex items-center gap-2 mb-1">
                      <Badge className="bg-primary/20 text-primary hover:bg-primary/30">Europe</Badge>
                      <span className="text-sm font-medium">5%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-primary/20 text-primary hover:bg-primary/30">Oceania</Badge>
                      <span className="text-sm font-medium">5%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="education">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Educational Outcomes</CardTitle>
                <CardDescription>Impact of our climate education</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">Course Completion Rate</span>
                    <span className="text-sm">78%</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">Knowledge Retention</span>
                    <span className="text-sm">85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">Behavioral Change</span>
                    <span className="text-sm">62%</span>
                  </div>
                  <Progress value={62} className="h-2" />
                </div>

                <div className="pt-2">
                  <h3 className="text-sm font-medium mb-2">Top Courses by Completion</h3>
                  <ol className="space-y-2">
                    <li className="flex items-center justify-between">
                      <span className="text-sm">1. Climate Change Fundamentals</span>
                      <Badge>1,245 students</Badge>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-sm">2. Carbon Footprint Reduction</span>
                      <Badge>1,056 students</Badge>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-sm">3. Renewable Energy Solutions</span>
                      <Badge>892 students</Badge>
                    </li>
                  </ol>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Student Demographics</CardTitle>
                <CardDescription>Who's learning on our platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Age Distribution</h3>
                    <div className="space-y-2">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs">18-24</span>
                          <span className="text-xs">35%</span>
                        </div>
                        <Progress value={35} className="h-1.5" />
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs">25-34</span>
                          <span className="text-xs">40%</span>
                        </div>
                        <Progress value={40} className="h-1.5" />
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs">35-44</span>
                          <span className="text-xs">15%</span>
                        </div>
                        <Progress value={15} className="h-1.5" />
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs">45+</span>
                          <span className="text-xs">10%</span>
                        </div>
                        <Progress value={10} className="h-1.5" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2">Geographic Distribution</h3>
                    <div className="space-y-2">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs">North America</span>
                          <span className="text-xs">30%</span>
                        </div>
                        <Progress value={30} className="h-1.5" />
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs">Europe</span>
                          <span className="text-xs">25%</span>
                        </div>
                        <Progress value={25} className="h-1.5" />
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs">Asia</span>
                          <span className="text-xs">35%</span>
                        </div>
                        <Progress value={35} className="h-1.5" />
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs">Other</span>
                          <span className="text-xs">10%</span>
                        </div>
                        <Progress value={10} className="h-1.5" />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">Student Engagement</h3>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="bg-muted rounded-md p-3">
                      <div className="text-2xl font-bold">4.2</div>
                      <div className="text-xs text-muted-foreground">Avg. Courses per Student</div>
                    </div>
                    <div className="bg-muted rounded-md p-3">
                      <div className="text-2xl font-bold">85%</div>
                      <div className="text-xs text-muted-foreground">Return Rate</div>
                    </div>
                    <div className="bg-muted rounded-md p-3">
                      <div className="text-2xl font-bold">92%</div>
                      <div className="text-xs text-muted-foreground">Satisfaction</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sponsors">
          <Card>
            <CardHeader>
              <CardTitle>Corporate Sponsors</CardTitle>
              <CardDescription>Companies funding sustainability efforts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    name: "EcoTech Solutions",
                    logo: "/placeholder.svg?height=80&width=200",
                    contribution: "250 tons CO₂ offset",
                    description: "Leading provider of renewable energy solutions",
                    since: "2022",
                  },
                  {
                    name: "Green Future Inc",
                    logo: "/placeholder.svg?height=80&width=200",
                    contribution: "180 tons CO₂ offset",
                    description: "Sustainable manufacturing and packaging",
                    since: "2022",
                  },
                  {
                    name: "Sustainable Ventures",
                    logo: "/placeholder.svg?height=80&width=200",
                    contribution: "320 tons CO₂ offset",
                    description: "Investment firm focused on climate tech",
                    since: "2023",
                  },
                  {
                    name: "ClimateFirst Corp",
                    logo: "/placeholder.svg?height=80&width=200",
                    contribution: "210 tons CO₂ offset",
                    description: "Carbon-neutral retail operations",
                    since: "2023",
                  },
                  {
                    name: "EarthCare Partners",
                    logo: "/placeholder.svg?height=80&width=200",
                    contribution: "290 tons CO₂ offset",
                    description: "Sustainable agriculture and food production",
                    since: "2023",
                  },
                ].map((sponsor) => (
                  <Card key={sponsor.name} className="overflow-hidden">
                    <div className="p-4">
                      <div className="bg-muted rounded-md p-4 flex items-center justify-center h-20 mb-4">
                        <Image
                          src={sponsor.logo || "/placeholder.svg"}
                          alt={sponsor.name}
                          width={160}
                          height={60}
                          className="max-h-12 object-contain"
                        />
                      </div>
                      <h3 className="font-bold mb-1">{sponsor.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{sponsor.description}</p>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className="text-primary">
                          <Leaf className="h-3 w-3 mr-1" />
                          {sponsor.contribution}
                        </Badge>
                        <span className="text-xs text-muted-foreground">Since {sponsor.since}</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Environmental Resources Saved</CardTitle>
          <CardDescription>Tangible impact of our carbon offset initiatives</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="flex flex-col items-center text-center p-4">
              <div className="p-3 bg-primary/10 rounded-full mb-4">
                <TreePine className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-1">12,500</h3>
              <p className="text-sm text-muted-foreground">Trees Planted</p>
              <p className="text-xs text-muted-foreground mt-2">Equivalent to 25 acres of forest</p>
            </div>

            <div className="flex flex-col items-center text-center p-4">
              <div className="p-3 bg-primary/10 rounded-full mb-4">
                <Droplets className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-1">8.2M</h3>
              <p className="text-sm text-muted-foreground">Gallons of Water</p>
              <p className="text-xs text-muted-foreground mt-2">Saved through conservation efforts</p>
            </div>

            <div className="flex flex-col items-center text-center p-4">
              <div className="p-3 bg-primary/10 rounded-full mb-4">
                <BarChart3 className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-1">4,750</h3>
              <p className="text-sm text-muted-foreground">MWh Clean Energy</p>
              <p className="text-xs text-muted-foreground mt-2">Generated from renewable sources</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

