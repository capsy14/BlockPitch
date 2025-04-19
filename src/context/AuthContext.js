"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function loadUserFromCookie() {
      try {
        const response = await fetch("/api/auth/me")
        if (response.ok) {
          const data = await response.json()
          setUser(data.user)
        }
      } catch (error) {
        console.error("Failed to load user", error)
      } finally {
        setLoading(false)
      }
    }

    loadUserFromCookie()
  }, [])

  const login = async (email, password) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Login failed")
      }

      const data = await response.json()
      setUser(data.user)

      // Redirect based on role
      if (data.user.role === "investor") {
        router.push("/investor/dashboard")
      } else if (data.user.role === "startup") {
        router.push("/startup/dashboard")
      } else {
        router.push("/dashboard")
      }

      return data
    } catch (error) {
      console.error("Login error:", error)
      throw error
    }
  }

  // const signup = async (userData) => {
  //   try {
  //     const response = await fetch("/api/auth/signup", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(userData),
  //     })

  //     if (!response.ok) {
  //       const error = await response.json()
  //       throw new Error(error.error || "Signup failed")
  //     }

  //     const data = await response.json()
  //     setUser(data.user)

  //     // Redirect based on role
  //     if (data.user.role === "investor") {
  //       router.push("/investor/dashboard")
  //     } else if (data.user.role === "startup") {
  //       router.push("/startup/dashboard")
  //     } else {
  //       router.push("/dashboard")
  //     }

  //     return data
  //   } catch (error) {
  //     console.error("Signup error:", error)
  //     throw error
  //   }
  // }

  const signup = async (userData) => {
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      })
  
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Signup failed")
      }
  
      const data = await response.json()
      setUser(data.user)
  
      // Redirect to next step (profile completion)
      if (data.user.role === "investor") {
        router.push("/investordata")
      } else if (data.user.role === "startup") {
        router.push("/startupdata")
      }
  
      return data
    } catch (error) {
      console.error("Signup error:", error)
      throw error
    }
  }

  
  
  const logout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      setUser(null)
      router.push("/")
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  return <AuthContext.Provider value={{ user, loading, login, signup, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
