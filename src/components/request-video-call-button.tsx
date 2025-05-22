"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Video } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface RequestVideoCallButtonProps {
  founderEmail: string
  founderName?: string
  investorName?: string
}

export function RequestVideoCallButton({ founderEmail, founderName, investorName }: RequestVideoCallButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleRequestCall = async () => {
    if (!founderEmail) {
      toast({
        title: "Error",
        description: "Founder email is required to request a call",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/request-video-call", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          founderEmail,
          founderName,
          investorName,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to request video call")
      }

      toast({
        title: "Success!",
        description: "Video call request sent. Redirecting to meeting room...",
      })

      // Redirect to the Jitsi room
      setTimeout(() => {
        window.location.href = data.roomUrl
      }, 1500)
    } catch (error) {
      console.error("Error requesting video call:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to request video call",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      className="w-full flex items-center justify-center gap-2"
      variant="secondary"
      onClick={handleRequestCall}
      disabled={isLoading}
    >
      <Video className="h-4 w-4" />
      <span>{isLoading ? "Requesting..." : "Request a Video Call"}</span>
    </Button>
  )
}
