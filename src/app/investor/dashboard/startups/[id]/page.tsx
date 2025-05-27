'use client';
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import  StartupData  from "@/models/StartupData" // ✅ Correct
import { StartupActions, ConnectWithFounder } from "@/components/StartupActions"
import { MdOutlineMail } from "react-icons/md";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { MessageSquare, DollarSign, Video  } from "lucide-react"
import { RequestVideoCallButton } from "@/components/request-video-call-button"
import type { Model } from 'mongoose';
import type { IStartup } from '@/models/StartupData';

export default async function StartupDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;


const TypedStartup = StartupData as Model<IStartup>;

const startup = await TypedStartup
  .findById(id)
  .lean()
  .exec();
  // const startup = await StartupData?.findById(id).lean();

  if (!startup) {
    return <div className="p-6">Startup not found</div>;
  }

  return (
    <Layout>
     
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
                  src={startup?.imageUrl || "/image.png"}
                  alt={startup.startupName}
                  fill
                  className="object-cover"
                />
              </div>


              <div className="mt-6 space-y-3">
              
                {/* <Link href="/sendEth" className="w-full">
                <Button className="w-full mt-2 flex items-center justify-center gap-2" variant="default">
                  <DollarSign className="h-4 w-4" />
                  <span>Invest Now</span>
                </Button>
                </Link> */}
                <Link
  href={`/sendEth?startupId=${startup._id}&walletAddress=${startup.walletAddress}&startupName=${startup.startupName}`}
  className="w-full"
>
  <Button className="w-full mt-2 flex items-center justify-center gap-2" variant="default">
    <DollarSign className="h-4 w-4" />
    <span>Invest Now</span>
  </Button>
</Link>
            <Link href = {startup.pitchDeck} target="_blank">
                <Button className="w-full mt-2 flex items-center justify-center gap-2" variant="secondary">
                  <Video className="h-4 w-4" />
                  <span>View Pitch Desk</span>
                </Button>
            </Link>
            <ConnectWithFounder
  founderEmail={startup.founderEmail}
  founderName={startup.founderName}
  
/>
                {/* <Button className="w-full flex items-center justify-center gap-2" variant="secondary">
                  <Video className="h-4 w-4" />
                  <span>Request a Video Call</span>
                </Button> */}
                <RequestVideoCallButton founderEmail={startup.founderEmail} founderName={startup.founderName} />
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
    </Layout>
    
  );
}