"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { useWeb3 } from "@/components/web3-provider"
import { Menu, X, Leaf } from "lucide-react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { isConnected, address, connect } = useWeb3()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">NFTrees</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/courses" className="text-sm font-medium hover:text-primary">
            Courses
          </Link>
          <Link href="/student" className="text-sm font-medium hover:text-primary">
            Student Dashboard
          </Link>
          <Link href="/company" className="text-sm font-medium hover:text-primary">
            Company Dashboard
          </Link>
          <Link href="/mint" className="text-sm font-medium hover:text-primary">
            Mint NFTs
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <ModeToggle />
          {isConnected ? (
            <Button variant="outline" size="sm">
              {address?.slice(0, 6)}...{address?.slice(-4)}
            </Button>
          ) : (
            <Button size="sm" onClick={connect}>
              Connect Wallet
            </Button>
          )}

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t">
          <div className="container py-4 flex flex-col gap-4">
            <Link
              href="/courses"
              className="text-sm font-medium hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Courses
            </Link>
            <Link
              href="/student"
              className="text-sm font-medium hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Student Dashboard
            </Link>
            <Link
              href="/company"
              className="text-sm font-medium hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Company Dashboard
            </Link>
            <Link href="/mint" className="text-sm font-medium hover:text-primary" onClick={() => setIsMenuOpen(false)}>
              Mint NFTs
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

