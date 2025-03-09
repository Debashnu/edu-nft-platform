"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { ethers } from "ethers"

type Web3ContextType = {
  provider: ethers.BrowserProvider | null
  signer: ethers.JsonRpcSigner | null
  address: string | null
  isConnected: boolean
  connect: () => Promise<void>
  disconnect: () => void
  chainId: number | null
  switchNetwork: (chainId: number) => Promise<void>
}

const Web3Context = createContext<Web3ContextType>({
  provider: null,
  signer: null,
  address: null,
  isConnected: false,
  connect: async () => {},
  disconnect: () => {},
  chainId: null,
  switchNetwork: async () => {},
})

export const useWeb3 = () => useContext(Web3Context)

export const Web3Provider = ({ children }: { children: ReactNode }) => {
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null)
  const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null)
  const [address, setAddress] = useState<string | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [chainId, setChainId] = useState<number | null>(null)

  // Check if wallet is already connected on component mount
  useEffect(() => {
    const checkConnection = async () => {
      if (typeof window !== "undefined" && window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ method: "eth_accounts" })
          if (accounts.length > 0) {
            const newProvider = new ethers.BrowserProvider(window.ethereum)
            const newSigner = await newProvider.getSigner()
            const newAddress = await newSigner.getAddress()
            const { chainId } = await newProvider.getNetwork()

            setProvider(newProvider)
            setSigner(newSigner)
            setAddress(newAddress)
            setChainId(Number(chainId))
            setIsConnected(true)
          }
        } catch (error) {
          console.error("Failed to check wallet connection:", error)
        }
      }
    }

    checkConnection()
  }, [])

  // Listen for account changes
  useEffect(() => {
    if (typeof window !== "undefined" && window.ethereum) {
      const handleAccountsChanged = async (accounts: string[]) => {
        if (accounts.length === 0) {
          // User disconnected their wallet
          disconnect()
        } else if (accounts[0] !== address) {
          // User switched accounts
          const newProvider = new ethers.BrowserProvider(window.ethereum)
          const newSigner = await newProvider.getSigner()
          const newAddress = await newSigner.getAddress()

          setProvider(newProvider)
          setSigner(newSigner)
          setAddress(newAddress)
          setIsConnected(true)
        }
      }

      const handleChainChanged = (chainIdHex: string) => {
        const newChainId = Number.parseInt(chainIdHex, 16)
        setChainId(newChainId)
        window.location.reload()
      }

      window.ethereum.on("accountsChanged", handleAccountsChanged)
      window.ethereum.on("chainChanged", handleChainChanged)

      return () => {
        window.ethereum.removeListener("accountsChanged", handleAccountsChanged)
        window.ethereum.removeListener("chainChanged", handleChainChanged)
      }
    }
  }, [address])

  const connect = async () => {
    if (typeof window !== "undefined" && window.ethereum) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" })
        const newProvider = new ethers.BrowserProvider(window.ethereum)
        const newSigner = await newProvider.getSigner()
        const newAddress = await newSigner.getAddress()
        const { chainId } = await newProvider.getNetwork()

        setProvider(newProvider)
        setSigner(newSigner)
        setAddress(newAddress)
        setChainId(Number(chainId))
        setIsConnected(true)
      } catch (error) {
        console.error("Failed to connect wallet:", error)
      }
    } else {
      alert("Please install MetaMask or another Web3 wallet to use this feature")
    }
  }

  const disconnect = () => {
    setProvider(null)
    setSigner(null)
    setAddress(null)
    setIsConnected(false)
    setChainId(null)
  }

  const switchNetwork = async (targetChainId: number) => {
    if (!window.ethereum) return;

    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: `0x${targetChainId.toString(16)}` }],
      });
    } catch (error: any) {
      // This error code indicates that the chain has not been added to MetaMask
      if (error.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: `0x${targetChainId.toString(16)}`,
                chainName: "EDU Chain Testnet", // Updated network name
                nativeCurrency: {
                  name: "EDU", // Native currency name
                  symbol: "EDU", // Native currency symbol
                  decimals: 18, // Native currency decimals
                },
                rpcUrls: ["rpc.open-compus-codex.gelato.digital"], // Updated RPC URL
                blockExplorerUrls: ["edu-chain-testnet.blockscout.com"], // Updated block explorer URL
              },
            ],
          });
        } catch (addError) {
          console.error("Failed to add network:", addError);
        }
      } else {
        console.error("Failed to switch network:", error);
      }
    }
  }

  return (
    <Web3Context.Provider
      value={{
        provider,
        signer,
        address,
        isConnected,
        connect,
        disconnect,
        chainId,
        switchNetwork,
      }}
    >
      {children}
    </Web3Context.Provider>
  )
}