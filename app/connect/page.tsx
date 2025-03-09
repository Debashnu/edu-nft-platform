"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useWeb3 } from "@/components/web3-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Steps, Step } from "@/components/steps"
import { AlertCircle, CheckCircle, Wallet, ArrowRight, Shield, Leaf } from "lucide-react"
import Image from "next/image"

export default function ConnectPage() {
  const router = useRouter()
  const { isConnected, connect, address, chainId, switchNetwork } = useWeb3()
  const [error, setError] = useState("")
  const [isCorrectNetwork, setIsCorrectNetwork] = useState(false)

  useEffect(() => {
    // Check if on Educhain network (chainId 12345 for Educhain testnet)
    setIsCorrectNetwork(chainId === 656476)
  }, [chainId])

  const handleConnect = async () => {
    try {
      setError("")
      await connect()
    } catch (err: any) {
      setError(err.message || "Failed to connect wallet")
    }
  }

  const handleSwitchNetwork = async () => {
    try {
      setError("")
      // Switch to Educhain testnet
      await switchNetwork(12345)
    } catch (err: any) {
      setError(err.message || "Failed to switch network")
    }
  }

  const handleContinue = () => {
    router.push("/student")
  }

  return (
    <div className="container py-12 flex flex-col items-center">
      <div className="max-w-3xl w-full">
        <h1 className="text-3xl font-bold text-center mb-2">Connect Your Wallet</h1>
        <p className="text-muted-foreground text-center mb-8">
          Connect your wallet to access the Educhain platform and start earning NFT credentials.
        </p>

        {error && (
          <Alert className="mb-6 bg-destructive/10 text-destructive border-destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Connection Status</CardTitle>
              <CardDescription>Follow these steps to connect your wallet</CardDescription>
            </CardHeader>
            <CardContent>
              <Steps activeStep={isConnected ? (isCorrectNetwork ? 3 : 2) : 1}>
                <Step
                  title="Install Wallet"
                  description="Install MetaMask or another Web3 wallet"
                  icon={<Shield className="h-5 w-5" />}
                  status="complete"
                />
                <Step
                  title="Connect Wallet"
                  description="Connect your wallet to Educhain"
                  icon={<Wallet className="h-5 w-5" />}
                  status={isConnected ? "complete" : "current"}
                />
                <Step
                  title="Switch to Educhain"
                  description="Ensure you're on the Educhain network"
                  icon={<Leaf className="h-5 w-5" />}
                  status={isConnected ? (isCorrectNetwork ? "complete" : "current") : "upcoming"}
                />
                <Step
                  title="Start Learning"
                  description="Begin your educational journey"
                  icon={<ArrowRight className="h-5 w-5" />}
                  status={isConnected && isCorrectNetwork ? "current" : "upcoming"}
                />
              </Steps>
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
              {!isConnected ? (
                <Button onClick={handleConnect} className="w-full">
                  Connect Wallet
                </Button>
              ) : !isCorrectNetwork ? (
                <Button onClick={handleSwitchNetwork} className="w-full">
                  Switch to Educhain
                </Button>
              ) : (
                <Button onClick={handleContinue} className="w-full">
                  Continue to Dashboard
                </Button>
              )}

              {isConnected && (
                <div className="w-full text-center text-sm text-muted-foreground mt-2">
                  Connected: {address?.slice(0, 6)}...{address?.slice(-4)}
                </div>
              )}
            </CardFooter>
          </Card>

          <div>
            <Tabs defaultValue="metamask">
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger value="metamask">MetaMask</TabsTrigger>
                <TabsTrigger value="walletconnect">WalletConnect</TabsTrigger>
              </TabsList>

              <TabsContent value="metamask">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Image src="/placeholder.svg?height=24&width=24" alt="MetaMask" width={24} height={24} />
                      MetaMask
                    </CardTitle>
                    <CardDescription>The most popular Web3 wallet</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">How to Install</h3>
                      <ol className="list-decimal list-inside text-sm space-y-1 text-muted-foreground">
                        <li>
                          Visit the{" "}
                          <a
                            href="https://metamask.io/download/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                          >
                            MetaMask website
                          </a>
                        </li>
                        <li>Download and install the browser extension</li>
                        <li>Create a new wallet or import an existing one</li>
                        <li>Secure your wallet with a strong password</li>
                      </ol>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">How to Add Educhain Network</h3>
                      <ol className="list-decimal list-inside text-sm space-y-1 text-muted-foreground">
                        <li>Open MetaMask and click on the network dropdown</li>
                        <li>Select "Add Network"</li>
                        <li>Enter Educhain network details</li>
                        <li>Click "Save" to add the network</li>
                      </ol>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" onClick={handleConnect} disabled={isConnected}>
                      {isConnected ? "Connected" : "Connect with MetaMask"}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="walletconnect">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Image src="/placeholder.svg?height=24&width=24" alt="WalletConnect" width={24} height={24} />
                      WalletConnect
                    </CardTitle>
                    <CardDescription>Connect with mobile wallets</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">How to Connect</h3>
                      <ol className="list-decimal list-inside text-sm space-y-1 text-muted-foreground">
                        <li>Open your mobile wallet app</li>
                        <li>Scan the QR code that appears</li>
                        <li>Approve the connection request</li>
                        <li>Your wallet will be connected to Educhain</li>
                      </ol>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Compatible Wallets</h3>
                      <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
                        <li>Trust Wallet</li>
                        <li>Rainbow</li>
                        <li>Argent</li>
                        <li>And many more...</li>
                      </ul>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" onClick={handleConnect} disabled={isConnected}>
                      {isConnected ? "Connected" : "Connect with WalletConnect"}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {isConnected && isCorrectNetwork && (
          <div className="mt-8 flex justify-center">
            <Alert className="max-w-md bg-primary/10 text-primary border-primary">
              <CheckCircle className="h-4 w-4" />
              <AlertTitle>Successfully Connected!</AlertTitle>
              <AlertDescription>
                Your wallet is now connected to the Educhain platform. You can now access all features.
              </AlertDescription>
            </Alert>
          </div>
        )}
      </div>
    </div>
  )
}