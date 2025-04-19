"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowRight, Briefcase } from "lucide-react"

export default function InvestorProfilePage() {
  const router = useRouter()
  const [form, setForm] = useState({
    preferredCategories: "",
    minInvestment: "",
    maxInvestment: "",
    portfolioURL: "",
    linkedIn: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await fetch("/api/investordata", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        preferredCategories: form.preferredCategories.split(",").map((tag) => tag.trim()),
      }),
    })
    if (res.ok) router.push("/investor/dashboard")
  }

  const formFields = [
    {
      name: "preferredCategories",
      label: "Preferred Categories",
      placeholder: "SaaS, Fintech, AI, etc. (comma separated)",
      description: "Industries and sectors you're interested in investing in",
    },
    {
      name: "minInvestment",
      label: "Minimum Investment",
      type: "number",
      placeholder: "10000",
      description: "The smallest amount you're willing to invest (USD)",
    },
    {
      name: "maxInvestment",
      label: "Maximum Investment",
      type: "number",
      placeholder: "100000",
      description: "The largest amount you're willing to invest (USD)",
    },
    {
      name: "portfolioURL",
      label: "Portfolio Website",
      placeholder: "https://yourportfolio.com",
      description: "Link to your investment portfolio or personal website",
    },
    {
      name: "linkedIn",
      label: "LinkedIn URL",
      placeholder: "https://linkedin.com/in/yourprofile",
      description: "Your professional LinkedIn profile",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center p-4 sm:p-6 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        <div className="rounded-xl shadow-2xl bg-white border border-gray-200 px-6 py-10 sm:px-10">
          <div className="max-w-lg mx-auto flex flex-col items-center text-center space-y-6">
            {/* Top Icon */}
            <div className="flex items-center justify-center w-24 h-24 rounded-full bg-indigo-100">
              <Briefcase className="h-12 w-12 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-800">Complete Your Investor Profile</h2>
              <p className="text-sm text-gray-600 mt-1">
                Help startups understand your investment preferences and criteria
              </p>
            </div>
          </div>

          {/* Form Section */}
          <form
            onSubmit={handleSubmit}
            className="max-w-lg mx-auto mt-10 flex flex-col gap-6"
          >
            {formFields.map(({ name, label, type = "text", placeholder, description }) => (
              <div key={name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor={name} className="block font-medium text-sm text-gray-700">
                    {label}
                  </label>
                  <span className="text-xs text-gray-500 text-right">{description}</span>
                </div>
                <input
                  id={name}
                  name={name}
                  type={type}
                  value={form[name]}
                  onChange={handleChange}
                  required
                  placeholder={placeholder}
                  className="w-full h-10 rounded-md border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 transition-all duration-200 bg-white text-sm px-3 py-2 placeholder:text-gray-400"
                />
              </div>
            ))}

            <button
              type="submit"
              className="mt-2 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-md transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center group"
            >
              <span>Save and Continue</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </form>

          <p className="text-xs text-center text-gray-500 mt-6 max-w-sm mx-auto">
            Your information will be securely stored and only shared with relevant startups
          </p>
        </div>
      </motion.div>
    </div>
  )
}
