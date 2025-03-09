"use client"

import { useEffect, useState } from "react"
import { useWeb3 } from "@/components/web3-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { BarChart3, Leaf, TreePine, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Mock data for company dashboard
const mockNFTs = [
  {
    id: 1,
    name: "Carbon Offset Certificate",
    image: "/placeholder.svg?height=300&width=300",
    description: "100 tons of CO₂ offset through educational sponsorship",
    tokenId: "0xabc...def",
    date: "2023-12-15",
  },
  {
    id: 2,
    name: "ESG Impact NFT",
    image: "/placeholder.svg?height=300&width=300",
    description: "Recognition for supporting climate education initiatives",
    tokenId: "0x456...789",
    date: "2024-02-20",
  },
]

const mockImpactData = [
  { month: "Jan", offset: 25 },
  { month: "Feb", offset: 40 },
  { month: "Mar", offset: 35 },
  { month: "Apr", offset: 50 },
  { month: "May", offset: 45 },
  { month: "Jun", offset: 60 },
]

export default function CompanyDashboard() {
  const { isConnected, connect, address } = useWeb3()
  const [totalOffset, setTotalOffset] = useState(255)
  const [studentsSponsored, setStudentsSponsored] = useState(127)
  const [nfts, setNfts] = useState(mockNFTs)
  const [impactData, setImpactData] = useState(mockImpactData)

  useEffect(() => {
    // In a real app, this would fetch the company's data from an API
    // For demo purposes, we're using mock data
  }, [address])

  if (!isConnected) {
    return (
      <div className="container py-12 flex flex-col items-center justify-center min-h-[70vh]">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Connect Your Wallet</CardTitle>
            <CardDescription>Please connect your company wallet to access your dashboard.</CardDescription>
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
      <h1 className="text-3xl font-bold mb-6">Company Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Total Carbon Offset</CardTitle>
            <CardDescription>Your company's contribution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold">{totalOffset} tons</span>
              <Leaf className="h-6 w-6 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Students Sponsored</CardTitle>
            <CardDescription>Learners supported by your company</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold">{studentsSponsored}</span>
              <Users className="h-6 w-6 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>NFTrees Funded</CardTitle>
            <CardDescription>Trees planted through your sponsorship</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold">{Math.floor(totalOffset / 2)}</span>
              <TreePine className="h-6 w-6 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Carbon Offset Progress</CardTitle>
            <CardDescription>Tracking toward your annual goal</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">{totalOffset} of 500 tons</span>
              <span className="text-sm font-medium">{Math.floor((totalOffset / 500) * 100)}%</span>
            </div>
            <Progress value={(totalOffset / 500) * 100} className="h-2" />

            <div className="mt-6 space-y-2">
              <h4 className="text-sm font-medium">Monthly Offset</h4>
              <div className="flex items-end gap-2 h-32">
                {impactData.map((item) => (
                  <div key={item.month} className="flex flex-col items-center flex-1">
                    <div
                      className="w-full bg-primary rounded-t-sm"
                      style={{ height: `${(item.offset / 60) * 100}%` }}
                    ></div>
                    <span className="text-xs mt-1">{item.month}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/sponsor">Sponsor More Trees</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>ESG Impact</CardTitle>
            <CardDescription>Environmental, Social, and Governance metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">Environmental Score</span>
                <span className="text-sm">82/100</span>
              </div>
              <Progress value={82} className="h-2" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">Social Score</span>
                <span className="text-sm">75/100</span>
              </div>
              <Progress value={75} className="h-2" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">Governance Score</span>
                <span className="text-sm">90/100</span>
              </div>
              <Progress value={90} className="h-2" />
            </div>

            <div className="pt-4">
              <h4 className="text-sm font-medium mb-2">Impact Highlights</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <Leaf className="h-4 w-4 text-primary mt-0.5" />
                  <span>Reduced carbon footprint by 15% year-over-year</span>
                </li>
                <li className="flex items-start gap-2">
                  <Users className="h-4 w-4 text-primary mt-0.5" />
                  <span>Supported 127 students in climate education</span>
                </li>
                <li className="flex items-start gap-2">
                  <BarChart3 className="h-4 w-4 text-primary mt-0.5" />
                  <span>Improved sustainability reporting transparency</span>
                </li>
              </ul>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Download ESG Report
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your ESG NFTs</CardTitle>
          <CardDescription>Blockchain-verified sustainability credentials</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {nfts.map((nft) => (
              <Card key={nft.id}>
                <div className="p-4 flex flex-col items-center">
                  <div className="relative h-40 w-40 mb-4">
                    <Image src={nft.image || "/placeholder.svg"} alt={nft.name} fill className="object-contain" />
                  </div>
                  <h3 className="text-lg font-bold mb-1">{nft.name}</h3>
                  <p className="text-sm text-muted-foreground text-center mb-2">{nft.description}</p>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline">ESG Verified</Badge>
                    <Badge variant="outline">{nft.date}</Badge>
                  </div>
                  <p className="text-xs font-mono bg-muted p-1.5 rounded-md w-full text-center truncate">
                    {nft.tokenId}
                  </p>
                </div>
                <CardFooter className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    View
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    Share
                  </Button>
                </CardFooter>
              </Card>
            ))}
            <Card>
              <div className="p-6 flex flex-col items-center justify-center h-full min-h-[250px]">
                <Leaf className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-bold mb-2">Sponsor More Impact</h3>
                <p className="text-sm text-muted-foreground text-center mb-4">
                  Fund more climate education and earn ESG-compliant NFTs.
                </p>
                <Button asChild>
                  <Link href="/sponsor">Sponsor Now</Link>
                </Button>
              </div>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

