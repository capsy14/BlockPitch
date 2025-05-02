'use client'
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useEffect } from "react"
import axios from "axios"


export default function Home() {
  const [startups, setStartups] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/startup");
        console.log("Fetched data:", res.data);
        setStartups(res.data);
      } catch (err) {
        console.error("Error fetching startups:", err);
      }
    };

    fetchData();
  }, []);
  return (
    <main className="min-h-screen bg-background py-12">
      <div className="container px-4 md:px-6">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">Startup Investment Platform</h1>
          <p className="mt-4 text-xl text-muted-foreground">
            Discover and invest in the next generation of groundbreaking startups
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {startups.map((startup) => (
            <Card key={startup._id} className="overflow-hidden">
              <CardHeader className="p-0">
                <Image
                  src={startup.image || "/image.png"}
                  alt="image"
                  width={400}
                  height={200}
                  className="h-[200px] w-full object-cover"
                />
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">{startup.name}</h2>
                  <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-sm font-semibold text-primary">
                    {startup.industry}
                  </span>
                </div>
                <p className="mt-2 line-clamp-2 text-muted-foreground">{startup.description}</p>
                <div className="mt-4">
                  {/* <p className="font-semibold">Funding Goal: {startup.funding}</p> */}
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Link href={`startup-list/startup/${startup._id}`} className="w-full">
                  <Button className="w-full" size="lg">
                    Invest Now
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </main>
  )
}