"use client"

import type React from "react"

import { useState } from "react"
import { useWeb3 } from "@/components/web3-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Leaf, TreePine, Globe, AlertCircle, CheckCircle } from "lucide-react"
import Image from "next/image"

export default function SponsorPage() {
  const { isConnected, connect, address } = useWeb3()
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  // Form states
  const [companyName, setCompanyName] = useState("")
  const [email, setEmail] = useState("")
  const [amount, setAmount] = useState("")
  const [offsetType, setOffsetType] = useState("direct")
  const [message, setMessage] = useState("")

  const handleSponsor = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isConnected) {
      await connect()
      return
    }

    setIsLoading(true)
    setError("")

    try {
      // In a real app, this would interact with a smart contract
      // For demo purposes, we'll simulate the sponsorship process
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setSuccess(true)
      // Reset form
      setCompanyName("")
      setEmail("")
      setAmount("")
      setOffsetType("direct")
      setMessage("")
    } catch (err: any) {
      setError(err.message || "Failed to process sponsorship. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const sponsorshipOptions = [
    {
      id: "direct",
      title: "Direct Carbon Offset",
      description: "Fund verified carbon offset projects directly",
      icon: <Leaf className="h-6 w-6 text-primary" />,
      impact: "1 ton of CO₂ offset per $15 contributed",
    },
    {
      id: "reforestation",
      title: "Reforestation Projects",
      description: "Plant trees in deforested areas worldwide",
      icon: <TreePine className="h-6 w-6 text-primary" />,
      impact: "10 trees planted per $20 contributed",
    },
    {
      id: "renewable",
      title: "Renewable Energy",
      description: "Support solar, wind, and other clean energy projects",
      icon: <Globe className="h-6 w-6 text-primary" />,
      impact: "1 MWh of clean energy per $25 contributed",
    },
  ]

  return (
    <div className="container py-8">
      <div className="flex flex-col items-center text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">Sponsor Carbon Offsets</h1>
        <p className="text-muted-foreground max-w-2xl">
          Fund climate education and carbon offset initiatives while earning ESG-compliant NFTs for your company.
        </p>
      </div>

      {success && (
        <Alert className="mb-8 bg-primary/10 text-primary border-primary">
          <CheckCircle className="h-4 w-4" />
          <AlertTitle>Sponsorship Successful!</AlertTitle>
          <AlertDescription>
            Thank you for your contribution to carbon offset initiatives. You will receive your ESG NFT shortly.
          </AlertDescription>
        </Alert>
      )}

      {error && (
        <Alert className="mb-8 bg-destructive/10 text-destructive border-destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Sponsor Form</CardTitle>
              <CardDescription>Complete this form to sponsor carbon offsets and receive an ESG NFT</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSponsor} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Enter your company name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Contact Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter contact email"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amount">Sponsorship Amount (USD)</Label>
                  <Input
                    id="amount"
                    type="number"
                    min="100"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount (min. $100)"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Offset Type</Label>
                  <RadioGroup value={offsetType} onValueChange={setOffsetType} className="grid gap-4 pt-2">
                    {sponsorshipOptions.map((option) => (
                      <div key={option.id} className="flex items-start space-x-2">
                        <RadioGroupItem value={option.id} id={option.id} className="mt-1" />
                        <Label htmlFor={option.id} className="flex flex-col space-y-1 font-normal">
                          <span className="font-medium flex items-center gap-2">
                            {option.icon}
                            {option.title}
                          </span>
                          <span className="text-sm text-muted-foreground">{option.description}</span>
                          <span className="text-xs text-primary">{option.impact}</span>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message (Optional)</Label>
                  <Textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Add a message to be included with your sponsorship"
                    rows={3}
                  />
                </div>

                {isConnected && (
                  <div className="space-y-2">
                    <Label htmlFor="wallet">Wallet Address</Label>
                    <Input id="wallet" value={address || ""} disabled className="font-mono text-sm" />
                  </div>
                )}
              </form>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSponsor} className="w-full" disabled={isLoading}>
                {!isConnected ? "Connect Wallet to Sponsor" : isLoading ? "Processing..." : "Sponsor Now"}
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div>
          <Tabs defaultValue="benefits">
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="benefits">Benefits</TabsTrigger>
              <TabsTrigger value="nft">ESG NFT</TabsTrigger>
            </TabsList>

            <TabsContent value="benefits">
              <Card>
                <CardHeader>
                  <CardTitle>Sponsorship Benefits</CardTitle>
                  <CardDescription>Why your company should sponsor carbon offsets</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="p-2 bg-primary/10 rounded-full h-fit">
                        <CheckCircle className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">ESG Compliance</h3>
                        <p className="text-sm text-muted-foreground">
                          Receive blockchain-verified NFTs that demonstrate your company's commitment to sustainability
                          and ESG goals.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="p-2 bg-primary/10 rounded-full h-fit">
                        <CheckCircle className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Brand Visibility</h3>
                        <p className="text-sm text-muted-foreground">
                          Your company will be featured on our platform as a sustainability leader, reaching thousands
                          of environmentally conscious users.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="p-2 bg-primary/10 rounded-full h-fit">
                        <CheckCircle className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Real Environmental Impact</h3>
                        <p className="text-sm text-muted-foreground">
                          Your sponsorship directly funds verified carbon offset projects, reforestation efforts, and
                          renewable energy initiatives.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="p-2 bg-primary/10 rounded-full h-fit">
                        <CheckCircle className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Educational Support</h3>
                        <p className="text-sm text-muted-foreground">
                          Help fund climate education for students worldwide, creating a more environmentally aware
                          future generation.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-muted p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Sponsorship Tiers</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Bronze</span>
                        <span className="text-sm font-medium">$100 - $499</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Silver</span>
                        <span className="text-sm font-medium">$500 - $999</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Gold</span>
                        <span className="text-sm font-medium">$1,000 - $4,999</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Platinum</span>
                        <span className="text-sm font-medium">$5,000+</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="nft">
              <Card>
                <CardHeader>
                  <CardTitle>ESG NFT Certificate</CardTitle>
                  <CardDescription>Blockchain-verified proof of your environmental contribution</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                  <div className="relative h-64 w-64 mb-6">
                    <Image
                      src="/placeholder.svg?height=300&width=300"
                      alt="ESG NFT Certificate Preview"
                      fill
                      className="object-contain"
                    />
                  </div>

                  <div className="text-center space-y-4 max-w-md">
                    <h3 className="text-xl font-bold">Carbon Offset Certificate</h3>
                    <p className="text-sm text-muted-foreground">
                      This NFT certifies your company's contribution to carbon offset initiatives. It includes
                      verifiable data about the amount of CO₂ offset, the projects supported, and the environmental
                      impact created.
                    </p>

                    <div className="bg-muted p-4 rounded-lg text-left space-y-2">
                      <h4 className="text-sm font-medium">NFT Certificate Includes:</h4>
                      <ul className="text-sm space-y-1">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-primary mt-0.5" />
                          <span>Verifiable carbon offset amount</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-primary mt-0.5" />
                          <span>Project details and location</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-primary mt-0.5" />
                          <span>Timestamp and blockchain verification</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-primary mt-0.5" />
                          <span>Company branding and custom message</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-primary mt-0.5" />
                          <span>Shareable for ESG reporting</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

