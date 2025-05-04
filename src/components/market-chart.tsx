"use client"

import { useEffect, useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

const data = [
  { year: 2022, market: 320, company: 5 },
  { year: 2023, market: 400, company: 15 },
  { year: 2024, market: 500, company: 42 },
  { year: 2025, market: 620, company: 120 },
  { year: 2026, market: 770, company: 280 },
  { year: 2027, market: 950, company: 520 },
  { year: 2028, market: 1180, company: 850 },
]

export default function MarketChart() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="flex h-[300px] w-full items-center justify-center">
        <p>Loading chart...</p>
      </div>
    )
  }

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip formatter={(value) => [`$${value}B`, undefined]} labelFormatter={(label) => `Year: ${label}`} />
          <Legend />
          <Line
            type="monotone"
            dataKey="market"
            name="Market Size ($B)"
            stroke="#0ea5e9"
            activeDot={{ r: 8 }}
            strokeWidth={2}
          />
          <Line type="monotone" dataKey="company" name="Company Revenue ($M)" stroke="#10b981" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
