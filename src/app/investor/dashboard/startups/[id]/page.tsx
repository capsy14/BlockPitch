import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StartupData } from "@/models/StartupData" // ✅ Correct
// Mock data for startups (same as in home page)
// import Image from "next/image"
import { notFound } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { MessageSquare, DollarSign, Video } from "lucide-react"
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
    <div className="container mx-auto py-8 px-4 max-w-5xl">
      <Link
          href="/investor/dashboard/startups"
          className="mb-6 inline-flex items-center text-primary hover:underline"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Startups
        </Link>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left column - Image and action buttons */}
        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardContent className="p-4">
              <div className="relative aspect-square w-full overflow-hidden rounded-lg">
                <Image
                  src={startup.imageUrl || "/image.png"}
                  alt={startup.startupName}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="mt-6 space-y-3">
                <Button className="w-full flex items-center justify-center gap-2" variant="outline">
                  <MessageSquare className="h-4 w-4" />
                  <span>Link Message</span>
                </Button>
                <Link href="/sendEth" className="w-full">
                <Button className="w-full flex items-center justify-center gap-2" variant="default">
                  <DollarSign className="h-4 w-4" />
                  <span>Invest Now</span>
                </Button>
            </Link>
                <Button className="w-full flex items-center justify-center gap-2" variant="secondary">
                  <Video className="h-4 w-4" />
                  <span>Request a Video Call</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right column - Startup details */}
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">{startup.startupName}</CardTitle>
              <div className="flex flex-wrap gap-2 text-sm">
                <span className="bg-muted px-2 py-1 rounded-md">{startup.industry}</span>
                <span className="bg-muted px-2 py-1 rounded-md">{startup.location}</span>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <div className="whitespace-pre-line text-muted-foreground">{startup.description}</div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Problem</h3>
                  <p className="text-muted-foreground">{startup.problem}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Solution</h3>
                  <p className="text-muted-foreground">{startup.solution}</p>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-semibold mb-4">Founding Team</h3>

                <div className="space-y-4">
                  {/* Founder */}
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium">Founder</h4>
                    <p className="text-lg font-semibold">{startup.founderName}</p>
                    <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                      <p>
                        Email:{" "}
                        <Link href={`mailto:${startup.founderEmail}`} className="text-primary hover:underline">
                          {startup.founderEmail}
                        </Link>
                      </p>
                      {startup.founderLinkedIn && (
                        <p>
                          LinkedIn:{" "}
                          <Link
                            href={`https://${startup.founderLinkedIn}`}
                            target="_blank"
                            className="text-primary hover:underline"
                          >
                            {startup.founderLinkedIn}
                          </Link>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Co-founder (if exists) */}
                  {startup.cofounderName && (
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium">Co-founder</h4>
                      <p className="text-lg font-semibold">{startup.cofounderName}</p>
                      <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                        {startup.cofounderEmail && (
                          <p>
                            Email:{" "}
                            <Link href={`mailto:${startup.cofounderEmail}`} className="text-primary hover:underline">
                              {startup.cofounderEmail}
                            </Link>
                          </p>
                        )}
                        {startup.cofounderLinkedin && (
                          <p>
                            LinkedIn:{" "}
                            <Link
                              href={`https://${startup.cofounderLinkedin}`}
                              target="_blank"
                              className="text-primary hover:underline"
                            >
                              {startup.cofounderLinkedin}
                            </Link>
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
    // <main className="min-h-screen bg-background py-12">
    //   <div className="container px-4 md:px-6">
    //     <Link
    //       href="/investor/dashboard/startups"
    //       className="mb-6 inline-flex items-center text-primary hover:underline"
    //     >
    //       <ArrowLeft className="mr-2 h-4 w-4" />
    //       Back to Startups
    //     </Link>
    //     <div className="grid gap-12 lg:grid-cols-[2fr,1fr]">
    //       <div>
    //         <Image
    //           src={startup?.image || "/image.png"}
    //           alt="image"
    //           width={800}
    //           height={400}
    //           className="rounded-lg object-cover"
    //         />
    //         <h1 className="mt-6 text-4xl font-bold">{startup.name}</h1>
    //         <div className="mt-4 flex items-center gap-4">
    //           <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
    //             {startup.industry}
    //           </span>
    //           <span className="text-sm text-muted-foreground">
    //             {startup.location}
    //           </span>
    //         </div>
    //         <div className="mt-6 space-y-4 whitespace-pre-line text-muted-foreground">
    //           {startup.description}
    //         </div>
    //       </div>
    //       <div className="space-y-6">
    //         <div className="rounded-lg border bg-card p-6">
    //           <h2 className="text-xl font-semibold">Investment Details</h2>
    //           <div className="mt-4 space-y-4">
    //             <div>
    //               <p className="text-sm text-muted-foreground">Funding Goal</p>
    //               <p className="text-2xl font-bold">{startup.location}</p>
    //             </div>
    //             <div>
    //               <p className="text-sm text-muted-foreground">Raised So Far</p>
    //               <p className="text-2xl font-bold">{startup.location}</p>
    //             </div>
    //             <div>
    //               <p className="text-sm text-muted-foreground">
    //                 Expected Timeline
    //               </p>
    //               <p className="font-medium">{startup.location}</p>
    //             </div>
    //             <Link href = "/sendEth"><Button className="w-full" size="lg">
    //               Invest Now
    //             </Button></Link>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </main>
  );
}