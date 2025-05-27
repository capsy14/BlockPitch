
"use client"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import axios from "axios"
import { ArrowRight, Search, TrendingUp, X } from "lucide-react"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function Home() {
  const [startups, setStartups] = useState([])
  const [filteredStartups, setFilteredStartups] = useState([])
  const [nameFilter, setNameFilter] = useState("")
  const [industryFilter, setIndustryFilter] = useState("")
  const [industries, setIndustries] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const res = await axios.get("/api/startup")
        console.log("Fetched data:", res.data)
        setStartups(res.data)
        setFilteredStartups(res.data)

        // Extract unique industries for the filter dropdown
        const uniqueIndustries = [...new Set(res.data.map((startup) => startup.industry))].filter(Boolean)
        setIndustries(uniqueIndustries)
      } catch (err) {
        console.error("Error fetching startups:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    // Filter startups based on name and industry
    const filtered = startups.filter((startup) => {
      const nameMatch = !nameFilter || startup.startupName?.toLowerCase().includes(nameFilter.toLowerCase())

      const industryMatch = !industryFilter || startup.industry?.toLowerCase() === industryFilter.toLowerCase()

      return nameMatch && industryMatch
    })

    setFilteredStartups(filtered)
  }, [nameFilter, industryFilter, startups])

  const resetFilters = () => {
    setNameFilter("")
    setIndustryFilter("")
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-background/95 py-16">
      <div className="container px-4 md:px-6 relative">
        {/* Background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
        </div>

        <div className="mb-16 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 text-sm font-medium rounded-full bg-primary/10 text-primary">
            <TrendingUp className="w-4 h-4 mr-2" />
            Discover the future of innovation
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
            Startup Investment Platform
          </h1>
          {/* <p className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover and invest in the next generation of groundbreaking startups that are shaping tomorrow's world
          </p> */}
        </div>

        {/* Filter Section */}
        <div className="mb-10 p-6 rounded-xl bg-card/80 backdrop-blur-sm border border-border/50 shadow-sm">
          <div className="flex flex-col gap-6 md:flex-row md:items-end">
            <div className="flex-1 space-y-2">
              <label htmlFor="name-filter" className="text-sm font-medium">
                Startup Name
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="name-filter"
                  value={nameFilter}
                  onChange={(e) => setNameFilter(e.target.value)}
                  placeholder="Search by name..."
                  className="pl-9"
                />
                {nameFilter && (
                  <button
                    onClick={() => setNameFilter("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>

            <div className="flex-1 space-y-2">
              <label htmlFor="industry-filter" className="text-sm font-medium">
                Industry
              </label>
              <Select value={industryFilter} onValueChange={setIndustryFilter}>
                <SelectTrigger id="industry-filter">
                  <SelectValue placeholder="All industries" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All industries</SelectItem>
                  {industries.map((industry) => (
                    <SelectItem key={industry} value={industry.toLowerCase()}>
                      {industry}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              variant="outline"
              onClick={resetFilters}
              className="md:self-end"
              disabled={!nameFilter && !industryFilter}
            >
              Reset Filters
            </Button>
          </div>

          {/* Filter summary */}
          {(nameFilter || industryFilter) && (
            <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
              <span>Showing results for:</span>
              <div className="flex flex-wrap gap-2">
                {nameFilter && (
                  <Badge variant="outline" className="flex items-center gap-1">
                    Name: {nameFilter}
                    <button onClick={() => setNameFilter("")}>
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                {industryFilter && (
                  <Badge variant="outline" className="flex items-center gap-1">
                    Industry: {industryFilter}
                    <button onClick={() => setIndustryFilter("")}>
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Results count */}
        {!isLoading && (
          <div className="mb-6 text-sm text-muted-foreground">
            Showing {filteredStartups.length} {filteredStartups.length === 1 ? "startup" : "startups"}
            {(nameFilter || industryFilter) && " matching your filters"}
          </div>
        )}

        {/* Startups Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredStartups.map((startup) => (
            <Card
              key={startup._id}
              className="group overflow-hidden border border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1"
            >
              <CardHeader className="p-0 overflow-hidden">
                <div className="relative h-[220px] w-full overflow-hidden">
                  <Image
                    src={startup.image || "/image.png"}
                    alt={startup.startupName || "Startup Image"}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    style={{ objectPosition: "center" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-2xl font-bold tracking-tight group-hover:text-primary transition-colors duration-200">
                    {startup.startupName}
                  </h2>
                  {startup.industry && (
                    <Badge variant="secondary" className="px-3 py-1">
                      {startup.industry}
                    </Badge>
                  )}
                </div>
                <p className="line-clamp-2 text-muted-foreground leading-relaxed">{startup.description}</p>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Link href={`./startups/${startup._id}`} className="w-full">
                  <Button
                    className="w-full group/button relative overflow-hidden transition-all duration-300 hover:bg-primary/90"
                    size="lg"
                  >
                    <span className="flex items-center justify-center gap-2 transition-transform duration-300 group-hover/button:translate-x-1">
                      Invest Now
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/button:translate-x-1" />
                    </span>
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Loading state */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center h-64 mt-8 rounded-lg border border-dashed border-border p-8 text-center">
            <div className="animate-pulse h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-primary/50" />
            </div>
            <h3 className="text-xl font-medium">Loading startups...</h3>
            <p className="text-muted-foreground mt-2">Please wait while we fetch the latest opportunities</p>
          </div>
        )}

        {/* Empty state */}
        {!isLoading && filteredStartups.length === 0 && (
          <div className="flex flex-col items-center justify-center h-64 mt-8 rounded-lg border border-dashed border-border p-8 text-center">
            <Search className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-xl font-medium">No startups found</h3>
            <p className="text-muted-foreground mt-2">Try adjusting your filters to find more results</p>
            <Button onClick={resetFilters} variant="outline" className="mt-4">
              Reset Filters
            </Button>
          </div>
        )}
      </div>
    </main>
  )
}
