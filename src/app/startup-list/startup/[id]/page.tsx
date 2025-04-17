import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StartupData } from "@/models/StartupData" // ✅ Correct
// Mock data for startups (same as in home page)

export default async function StartupDetail({
  params
}: {
  params: { id: string };
}) {
  const startup = await StartupData?.findById(params.id).lean(); // Use `.lean()` for plain JavaScript object

  if (!startup) {
    return <div className="p-6">Startup not found</div>;
  }

  return (
    <main className="min-h-screen bg-background py-12">
      <div className="container px-4 md:px-6">
        <Link
          href="/startup-list"
          className="mb-6 inline-flex items-center text-primary hover:underline"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Startups
        </Link>
        <div className="grid gap-12 lg:grid-cols-[2fr,1fr]">
          <div>
            <Image
              src={startup?.image || "/placeholder?.svg"}
              alt="image"
              width={800}
              height={400}
              className="rounded-lg object-cover"
            />
            <h1 className="mt-6 text-4xl font-bold">{startup.name}</h1>
            <div className="mt-4 flex items-center gap-4">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                {startup.industry}
              </span>
              <span className="text-sm text-muted-foreground">
                {startup.location}
              </span>
            </div>
            <div className="mt-6 space-y-4 whitespace-pre-line text-muted-foreground">
              {startup.description}
            </div>
          </div>
          <div className="space-y-6">
            <div className="rounded-lg border bg-card p-6">
              <h2 className="text-xl font-semibold">Investment Details</h2>
              <div className="mt-4 space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Funding Goal</p>
                  <p className="text-2xl font-bold">{startup.location}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Raised So Far</p>
                  <p className="text-2xl font-bold">{startup.location}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Expected Timeline
                  </p>
                  <p className="font-medium">{startup.location}</p>
                </div>
                <Link href = "/sendEth"><Button className="w-full" size="lg">
                
                  Invest Now
                </Button></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
