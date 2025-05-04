"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/components/ui/use-toast"

export default function InvestorSignupForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Form submitted",
      description: "Thank you for your interest. We'll be in touch shortly.",
    })

    setIsSubmitting(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input id="firstName" placeholder="John" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input id="lastName" placeholder="Doe" required />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="john.doe@example.com" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="company">Company/Firm</Label>
        <Input id="company" placeholder="Acme Capital" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="investorType">Investor Type</Label>
        <Select defaultValue="angel">
          <SelectTrigger>
            <SelectValue placeholder="Select investor type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="angel">Angel Investor</SelectItem>
            <SelectItem value="vc">Venture Capital</SelectItem>
            <SelectItem value="pe">Private Equity</SelectItem>
            <SelectItem value="family">Family Office</SelectItem>
            <SelectItem value="corporate">Corporate Investor</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="investmentRange">Typical Investment Range</Label>
        <Select defaultValue="100k-250k">
          <SelectTrigger>
            <SelectValue placeholder="Select investment range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="100k-250k">$100K - $250K</SelectItem>
            <SelectItem value="250k-500k">$250K - $500K</SelectItem>
            <SelectItem value="500k-1m">$500K - $1M</SelectItem>
            <SelectItem value="1m-5m">$1M - $5M</SelectItem>
            <SelectItem value="5m+">$5M+</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Additional Information</Label>
        <Textarea
          id="message"
          placeholder="Tell us about your investment focus, portfolio companies, or any questions you have."
          rows={4}
        />
      </div>

      <div className="flex items-start space-x-2">
        <Checkbox id="terms" />
        <Label
          htmlFor="terms"
          className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          I agree to receive communications from GrowthVenture and understand that my data will be processed in
          accordance with the Privacy Policy.
        </Label>
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Request Investor Access"}
      </Button>
    </form>
  )
}
