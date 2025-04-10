"use client"
import Link from "next/link"
import { Button } from "./ui/button"
import MetaMaskLogin from "./MetaMaskLogin"
import { useAuth } from "@/context/AuthContext"

const Header = () => {
  const { user, logout } = useAuth()

  return (
    <div>
      <header className="border-b">
        <nav className="container flex items-center justify-between h-16 px-4 mx-auto">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-xl font-bold">
              BlockPitch
            </Link>
            <div className="hidden md:flex items-center space-x-6">
              <a href="#" className="text-sm font-medium">
                Buy Crypto
              </a>
              <a href="#" className="text-sm font-medium">
                Markets
              </a>
              <a href="#" className="text-sm font-medium">
                Exchange
              </a>
              <a href="#" className="text-sm font-medium">
                NFT/DEX
              </a>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <MetaMaskLogin />

            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium">Welcome, {user.name || user.email}</span>
                {user.role === "investor" && (
                  <Link href="/investor/dashboard">
                    <Button variant="outline">Dashboard</Button>
                  </Link>
                )}
                {user.role === "startup" && (
                  <Link href="/startup/dashboard">
                    <Button variant="outline">Dashboard</Button>
                  </Link>
                )}
                <Button variant="ghost" onClick={logout}>
                  Sign Out
                </Button>
              </div>
            ) : (
              <>
                <Link href="/user-select">
                  <Button variant="ghost">Sign In</Button>
                </Link>
                <Link href="/register">
                  <Button>Get Started</Button>
                </Link>
              </>
            )}
          </div>
        </nav>
      </header>
    </div>
  )
}

export default Header

