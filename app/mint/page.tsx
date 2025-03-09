"use client"

import type React from "react"

import { useState } from "react"
import { useWeb3 } from "@/components/web3-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle, Leaf, User } from "lucide-react"
import Image from "next/image"

export default function MintPage() {
  const { isConnected, connect, address, chainId, switchNetwork } = useWeb3()
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  // Form states
  const [studentName, setStudentName] = useState("")
  const [studentEmail, setStudentEmail] = useState("")
  const [companyName, setCompanyName] = useState("")
  const [offsetAmount, setOffsetAmount] = useState("")

  const handleMintStudentID = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isConnected) {
      await connect()
      return
    }

    // Check if on Educhain network (chainId 12345 for Educhain testnet)
    if (chainId !== 656476) {
      await switchNetwork(656476) // Switch to Educhain testnet
      return
    }

    setIsLoading(true)
    setError("")

    try {
      // In a real app, this would interact with a smart contract
      // For demo purposes, we'll simulate the minting process
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setSuccess(true)
      // Reset form
      setStudentName("")
      setStudentEmail("")
    } catch (err: any) {
      setError(err.message || "Failed to mint NFT. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleMintCompanyNFT = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isConnected) {
      await connect()
      return
    }

    // Check if on Educhain network
    if (chainId !== 656476) {
      await switchNetwork(656476) // Switch to Educhain testnet
      return
    }

    setIsLoading(true)
    setError("")

    try {
      // In a real app, this would interact with a smart contract
      // For demo purposes, we'll simulate the minting process
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setSuccess(true)
      // Reset form
      setCompanyName("")
      setOffsetAmount("")
    } catch (err: any) {
      setError(err.message || "Failed to mint NFT. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (!isConnected) {
    return (
      <div className="container py-12 flex flex-col items-center justify-center min-h-[70vh]">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Connect Your Wallet</CardTitle>
            <CardDescription>Please connect your wallet to mint NFTs.</CardDescription>
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
      <h1 className="text-3xl font-bold mb-6">Mint NFTs</h1>

      {success && (
        <Alert className="mb-6 bg-primary/10 text-primary border-primary">
          <CheckCircle className="h-4 w-4" />
          <AlertTitle>Success!</AlertTitle>
          <AlertDescription>
            Your NFT has been successfully minted. It may take a few minutes to appear in your wallet.
          </AlertDescription>
        </Alert>
      )}

      {error && (
        <Alert className="mb-6 bg-destructive/10 text-destructive border-destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="student" className="w-full">
        <TabsList className="mb-6 grid grid-cols-2 w-full max-w-md mx-auto">
          <TabsTrigger value="student">Student ID</TabsTrigger>
          <TabsTrigger value="company">Company NFT</TabsTrigger>
        </TabsList>

        <TabsContent value="student">
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Mint Open Campus ID</CardTitle>
                <CardDescription>Create your digital student identity as an NFT on Educhain</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleMintStudentID} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={studentEmail}
                      onChange={(e) => setStudentEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="wallet">Wallet Address</Label>
                    <Input id="wallet" value={address || ""} disabled className="font-mono text-sm" />
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Minting..." : "Mint Student ID NFT"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="flex flex-col items-center justify-center">
              <div className="relative h-64 w-64 mb-6">
                <Image
                  src="/placeholder.svg?height=300&width=300"
                  alt="Open Campus ID NFT Preview"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="text-center space-y-2 max-w-xs">
                <h3 className="text-xl font-bold">Open Campus ID</h3>
                <p className="text-sm text-muted-foreground">
                  Your Open Campus ID is your digital identity for the platform. It verifies your enrollment and tracks
                  your learning achievements.
                </p>
                <div className="flex items-center justify-center gap-2 pt-2">
                  <User className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Powered by Educhain</span>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="company">
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Mint ESG Carbon Offset NFT</CardTitle>
                <CardDescription>Create a verifiable carbon offset certificate as an NFT</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleMintCompanyNFT} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input
                      id="companyName"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="Enter company name"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="offsetAmount">Carbon Offset Amount (tons)</Label>
                    <Input
                      id="offsetAmount"
                      type="number"
                      min="1"
                      value={offsetAmount}
                      onChange={(e) => setOffsetAmount(e.target.value)}
                      placeholder="Enter amount in tons"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description (Optional)</Label>
                    <Textarea id="description" placeholder="Add details about this carbon offset" rows={3} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="companyWallet">Wallet Address</Label>
                    <Input id="companyWallet" value={address || ""} disabled className="font-mono text-sm" />
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Minting..." : "Mint Carbon Offset NFT"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="flex flex-col items-center justify-center">
              <div className="relative h-64 w-64 mb-6">
                <Image
                  src="/placeholder.svg?height=300&width=300"
                  alt="Carbon Offset NFT Preview"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="text-center space-y-2 max-w-xs">
                <h3 className="text-xl font-bold">ESG Carbon Offset NFT</h3>
                <p className="text-sm text-muted-foreground">
                  This NFT certifies your company's carbon offset contribution. It can be used for ESG reporting and
                  sustainability verification.
                </p>
                <div className="flex items-center justify-center gap-2 pt-2">
                  <Leaf className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Verified Carbon Impact</span>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}