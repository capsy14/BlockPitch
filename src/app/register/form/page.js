"use client"
import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, CheckCircle } from "lucide-react"
import { motion } from "framer-motion"
import { useAuth } from "@/context/AuthContext"
import { useSearchParams } from "next/navigation"

export default function RegisterPage() {
  const searchParams = useSearchParams()
  const defaultRole = searchParams.get("type") || "investor"

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: defaultRole,
    terms: false,
    profileImage: "",
    walletAddress: "",
    bio: "",
    foundersName: "",
    description: "",
    location: "",
    category: "",
    websiteLink: ""
  })

  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { signup } = useAuth()

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }
    if (!formData.terms) {
      setError("You must agree to the Terms of Service")
      return
    }

    setIsLoading(true)
    try {
      await signup(formData)
    } catch (err) {
      setError(err.message || "Failed to create account")
    } finally {
      setIsLoading(false)
    }
  }

  const isInvestor = formData.role === "investor"
  const isStartup = formData.role === "startup"

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="sm:mx-auto sm:w-full sm:max-w-md"
      >
        <h2 className="mt-6 text-center text-4xl font-extrabold text-gray-900">Create Your BlockPitch Account</h2>
        <p className="mt-2 text-center text-sm text-gray-600">Let's get you set up</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
      >
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10 border border-gray-200">
          {error && <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">{error}</div>}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <FormInput name="name" label={isStartup ? "Startup Name" : "Full Name"} value={formData.name} onChange={handleChange} />
            <FormInput name="email" label="Email" type="email" value={formData.email} onChange={handleChange} />
            <FormInput name="password" label="Password" type="password" value={formData.password} onChange={handleChange} />
            <FormInput name="confirmPassword" label="Confirm Password" type="password" value={formData.confirmPassword} onChange={handleChange} />

            {isInvestor && (
              <>
                <FormInput name="profileImage" label="Profile Image URL" value={formData.profileImage} onChange={handleChange} />
                <FormInput name="walletAddress" label="Wallet Address" value={formData.walletAddress} onChange={handleChange} />
                <FormInput name="bio" label="Short Bio" value={formData.bio} onChange={handleChange} />
              </>
            )}

            {isStartup && (
              <>
                <FormInput name="foundersName" label="Founders Name" value={formData.foundersName} onChange={handleChange} />
                <FormInput name="walletAddress" label="Wallet Address" value={formData.walletAddress} onChange={handleChange} />
                <FormInput name="description" label="Startup Description" value={formData.description} onChange={handleChange} />
                <FormInput name="location" label="Location" value={formData.location} onChange={handleChange} />
                <FormInput name="category" label="Category" value={formData.category} onChange={handleChange} />
                <FormInput name="websiteLink" label="Website Link" value={formData.websiteLink} onChange={handleChange} />
              </>
            )}

            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                checked={formData.terms}
                onChange={handleChange}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                required
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                I agree to the <a href="#" className="text-indigo-600 hover:text-indigo-500">Terms</a> and <a href="#" className="text-indigo-600 hover:text-indigo-500">Privacy Policy</a>
              </label>
            </div>

            <button type="submit" disabled={isLoading} className="w-full bg-indigo-600 text-white p-2 rounded">
              {isLoading ? "Creating Account..." : "Create Account"}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  )
}

function FormInput({ name, label, value, onChange, type = "text" }) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
      />
    </div>
  )
}