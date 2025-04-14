"use client";
import React from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import Lottie from "lottie-react";
import image1 from "@/../public/image1.json";
import bitcoinAnimation from "@/../public/bitcoin.json";

const main = () => {
  return (
    <div>
      <main className="flex-1">
        <section className="container px-4 py-20 mx-auto text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          Empowering Ideas, 
            <br />
            Accelerating Investments
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
          Utilize AI insights, blockchain security, and real-time pitches to build your portfolio.
          </p>
          <Button className="mt-8" size="lg">
          Begin Your Journey
          </Button>
          <div className="-mt-40 flex justify-center items-center">
            <Lottie
              animationData={image1}
              loop={true}
              style={{ width: 600, height: 500 }}
            />
          </div>
        </section>

        <section className="container px-4 -mt-10 mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose BlockPitch
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <Card className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">
                      Manage your portfolio
                    </h3>
                    <p className="text-muted-foreground">
                      Buy and sell popular digital currencies and keep track of
                      them in one place
                    </p>
                  </div>
                </div>
              </Card>
              <Card className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Recurring buys</h3>
                    <p className="text-muted-foreground">
                      Invest in cryptocurrency slowly over time by scheduling
                      buys daily, weekly, or monthly
                    </p>
                  </div>
                </div>
              </Card>
              <Card className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Mobile apps</h3>
                    <p className="text-muted-foreground">
                      Stay on top of the markets with our mobile app. Never miss
                      an opportunity
                    </p>
                  </div>
                </div>
              </Card>
            </div>
            <div className="relative">
              <Lottie animationData={bitcoinAnimation} className="h-[50vh]" />
            </div>
          </div>
        </section>

        {/* Steps Section */}
        <section className="container px-4 py-20 mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            3 Steps Easy Trading
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Download",
                description:
                  "Download our mobile app or visit our website to get started"
              },
              {
                title: "Connect Wallet",
                description:
                  "Connect your crypto wallet to start trading instantly"
              },
              {
                title: "Start Trading",
                description: "Buy and sell crypto with just a few clicks"
              }
            ].map((step, i) => (
              <Card key={i} className="p-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <span className="text-xl font-bold text-primary">
                    {i + 1}
                  </span>
                </div>
                <h3 className="font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section className="container px-4 py-20 mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            The Numbers Don't Lie
          </h2>
          <div className="grid grid-cols-3 gap-8">
            {[
              { number: "20m+", label: "Users worldwide" },
              { number: "100m+", label: "Monthly volume" },
              { number: "10m+", label: "Verified users" }
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="container px-4 py-20 mx-auto">
          <div className="flex justify-center items-center">
            <div className="flex flex-col items-center justify-center text-center">
              <h2 className="text-3xl font-bold mb-6">
                Join Our Trading Global Community
              </h2>
              <p className="text-muted-foreground mb-8">
                Join millions of users worldwide in the fastest growing crypto
                community
              </p>
              <Button size="lg">Join Now</Button>
            </div>
          </div>
        </section>

        {/* Learn and Earn Section */}
        <section className="container px-4 py-20 mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Learn And Earn
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((card) => (
              <Card key={card} className="overflow-hidden">
                <div className="aspect-video relative bg-primary/10"></div>
                <div className="p-6">
                  <h3 className="font-semibold mb-2">
                    Learn about UBI coin and earn an All-Access Pass
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Learn and earn rewards by completing educational tasks
                  </p>
                  <Button variant="outline">Learn more</Button>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default main;
