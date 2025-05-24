
import Lottie from "lottie-react";
import image1 from "@/../public/image1.json";
import InvestorSignupForm from "@/components/investor-signup-form"
import TeamMember from "@/components/team-member"
import MetricsCard from "@/components/metrics-card"
import Testimonial from "@/components/testimonial"
import FAQAccordion from "@/components/faq-accordion"
import MarketChart from "@/components/market-chart"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { ChevronRight, BarChart3, Users, TrendingUp, CheckCircle, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import lottie, { AnimationItem } from 'lottie-web';
import MyLottieComponent from "./MyLottieComponent";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { FlipWords } from "./ui/flip-word";
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


import { cva, type VariantProps } from "class-variance-authority"
import { RainbowButton } from "./magicui/rainbow-button";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"


export default function main() {

   const words = ["better", "cute", "beautiful", "modern"];
  return (
    <div className="w-full px-[2rem] flex max-w-[100%] min-h-screen flex-col items-center justify-center bg-background text-foreground">

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute top-0 left-0 w-full h-full" />

          <div className="container relative z-10 grid gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-center space-y-6">
              <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm text-primary">
                <span className="font-medium">Seed Round Now Open</span>
              </div>
             <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
  <FlipWords
    words={[
      { text: "Revolutionizing" },
      { text: "Modernizing" },
      { text: "Disrupting" },
      { text: "Transforming" },
      { text: "FinTech" },
      { text: "for" },
      { text: "the" },
      { text: "next" },
      { text: "Generation" },
    ]}
  />{" "}
  {/* <span className="text-primary ">FinTech</span> for the Next Generation */}
</h1>
{/* <p className="max-w-[600px] text-muted-foreground md:text-sm">
  Join us in building the future of financial technology. Our AI-powered platform is disrupting a $500B
  market with 215% YoY growth.
</p> */}

              {/* <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                Revolutionizing <span className="text-primary">FinTech</span> for the Next Generation
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Join us in building the future of financial technology. Our AI-powered platform is disrupting a $500B
                market with 215% YoY growth.
              </p> */}
              {/* <RainbowButton></RainbowButton> */}
              <div className="flex flex-col gap-3 sm:flex-row justify-center">
                <RainbowButton
                  size="lg"
                  className="gap-2 cursor-pointer"
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      const el = document.getElementById("investor-access");
                      if (el) {
                        el.scrollIntoView({ behavior: "smooth" });
                      }
                    }
                  }}
                >
                  Request Investor Access
                  <ArrowRight className="h-4 w-4" />
                </RainbowButton>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => window.open("/pitch-deck.pdf", "_blank")}
                >
                  View Pitch Deck
                </Button>
              </div>
              <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="inline-block h-8 w-8 rounded-full border-2 border-background bg-muted overflow-hidden"
                    >
                      <Image
                        src="/person.jpg"
                        alt="Investor"
                        width={32}
                        height={32}
                      />
                    </div>
                  ))}
                </div>
                
                <span>Joined by 40+ angel investors and VCs</span>
                
              </div>
            </div>
           <div className="relative flex items-center justify-center lg:justify-end">
  <div className="relative h-[400px] w-full max-w-[500px] overflow-hidden rounded-lg border shadow-xl">
    <MyLottieComponent animationPath="/business-strategy.json" width="110%" height="110%"  />
  </div>
</div>

          </div>
        </section>

        {/* Problem/Solution Section */}
        <section id="solution" className="py-20 bg-white dark:bg-background">
          <div className="container">
            <div className="mx-auto mb-12 max-w-[800px] text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">The Problem We're Solving</h2>
              <p className="mt-4 text-muted-foreground md:text-xl">
                Traditional financial services are failing the next generation with outdated technology, high fees, and
                poor user experiences.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: <BarChart3 className="h-10 w-10 text-primary" />,
                  title: "Outdated Systems",
                  description:
                    "Legacy financial systems are costing businesses $200B annually in inefficiencies and lost opportunities.",
                },
                {
                  icon: <Users className="h-10 w-10 text-primary" />,
                  title: "Poor User Experience",
                  description:
                    "78% of millennials and Gen Z are dissatisfied with traditional financial services interfaces.",
                },
                {
                  icon: <TrendingUp className="h-10 w-10 text-primary" />,
                  title: "High Transaction Costs",
                  description:
                    "Businesses pay an average of 3.5% in transaction fees, cutting into already thin margins.",
                },
              ].map((item, i) => (
                <div key={i} className="rounded-lg border bg-card p-6 shadow-sm">
                  <div className="mb-4">{item.icon}</div>
                  <h3 className="mb-2 text-xl font-bold">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-20">
              <div className="mx-auto mb-12 max-w-[800px] text-center">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Solution</h2>
                <p className="mt-4 text-muted-foreground md:text-xl">
                  An AI-powered financial platform that reduces costs by 80% while improving user satisfaction by 95%.
                </p>
              </div>

              <div className="grid gap-8 md:grid-cols-2">
                <div className="flex flex-col justify-center space-y-4">
                  {[
                    "Proprietary AI algorithms that reduce transaction costs to 0.5%",
                    "Intuitive interface designed specifically for digital natives",
                    "Seamless integration with existing financial infrastructure",
                    "Bank-grade security with modern user experience",
                  ].map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                      <p>{feature}</p>
                    </div>
                  ))}
                </div>
                <div className="relative h-[300px] rounded-lg border overflow-hidden shadow-lg">
                  {/* <Image
                    src="/placeholder.svg?height=300&width=500&text=Solution+Visualization"
                    alt="Solution Visualization"
                    fill
                    className="object-cover"
                  /> */}
                  <MyLottieComponent animationPath="/business-group-meeting.json" height="1000" width="1000"/>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Market Opportunity Section */}
        <section id="market" className="py-20 bg-slate-50 dark:bg-slate-950/50">
          <div className="container">
            <div className="mx-auto mb-12 max-w-[800px] text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Market Opportunity</h2>
              <p className="mt-4 text-muted-foreground md:text-xl">
                We're targeting a rapidly growing $500B market with significant disruption potential.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              <div className="h-[400px] rounded-lg border bg-card p-6 shadow-sm">
                <h3 className="mb-4 text-xl font-bold">Market Growth Projection</h3>
                <MarketChart />
              </div>

              <div className="grid gap-4">
                <MetricsCard
                  title="Total Addressable Market"
                  value="$500B"
                  description="Growing at 24% CAGR through 2030"
                />
                <MetricsCard
                  title="Current Market Penetration"
                  value="2.3%"
                  description="Significant room for growth and expansion"
                />
                <MetricsCard
                  title="Customer Acquisition Cost"
                  value="$42"
                  description="85% lower than industry average of $280"
                />
                <MetricsCard
                  title="Lifetime Value"
                  value="$2,800"
                  description="67:1 LTV:CAC ratio, well above industry benchmarks"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Traction Section */}
        <section className="py-20 bg-white dark:bg-background">
          <div className="container">
            <div className="mx-auto mb-12 max-w-[800px] text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Traction</h2>
              <p className="mt-4 text-muted-foreground md:text-xl">
                Rapid growth across all key performance indicators.
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { label: "Monthly Active Users", value: "125,000+", growth: "+215% YoY" },
                { label: "Transaction Volume", value: "$28M", growth: "+180% YoY" },
                { label: "Enterprise Clients", value: "42", growth: "+310% YoY" },
                { label: "Revenue Growth", value: "$4.2M ARR", growth: "+250% YoY" },
              ].map((stat, i) => (
                <div key={i} className="rounded-lg border bg-card p-6 text-center shadow-sm">
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="mt-2 text-3xl font-bold">{stat.value}</p>
                  <p className="mt-1 text-sm font-medium text-green-600 dark:text-green-500">{stat.growth}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section id="team" className="py-20 bg-slate-50 dark:bg-slate-950/50">
          <div className="container">
            <div className="mx-auto mb-12 max-w-[800px] text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Meet Our Team</h2>
              <p className="mt-4 text-muted-foreground md:text-xl">
                Led by serial entrepreneurs and industry veterans with multiple successful exits.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-8 text-center">
              <TeamMember
                name="Kartik Bhatt"
                role="CEO & Co-Founder"
                image="https://media.licdn.com/dms/image/v2/D5603AQGarAxqu1ZgNg/profile-displayphoto-shrink_400_400/B56ZV5bcA.GsAg-/0/1741498997370?e=1753315200&v=beta&t=q7gwinzX1o2QCE9aggXR8qsocRWLc7T5A9qmduiIncE"
                bio="SWE Intern @PayPal | Web3 Wing Senior Member @Axios"
                linkedin="https://www.linkedin.com/in/kartik-bhatt-2b9b2b256/"
              />
              <TeamMember
                name="Bhanu Singh"
                role="Frontend & Backend"
                image="https://media.licdn.com/dms/image/v2/D5603AQHVB_RMRDU7kQ/profile-displayphoto-shrink_400_400/B56ZWV6_QnHoAg-/0/1741977024248?e=1753315200&v=beta&t=EqZ2QydQ6dLYbFE1USmHBEEZBG47wmt8rDXfmif_Prk"
                bio="Campus Ambassador of @PhysicsWallah"
                linkedin="https://www.linkedin.com/in/bhanu-singh-405581249/"
              />
              <TeamMember
                name="Smit Italiya"
                role="Chief Product Officer AI"
                image="https://media.licdn.com/dms/image/v2/D4D03AQGvAmJrdkxNZA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1724866728344?e=1753315200&v=beta&t=ex8vfjjFtlKexmfXU_IuKvBKqekL0s1MslO9ou2q6Qs"
                bio="Summer Analyst @Goldman Sachs | Expert @Codeforces"
                linkedin="https://www.linkedin.com/in/smit-italiya-7b1252257/"
              />
              <TeamMember
                name="Jenil Jain"
                role="Chief Product Officer AI"
                image="https://media.licdn.com/dms/image/v2/D5603AQE7S43cHsZ5nA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1676894691115?e=1753315200&v=beta&t=7BtZaeoFMajA5fe1bZKlmGio89pwsSk73KL2YlaulP0"
                bio="Wen Wing Lead @GDSC IIIT Lucknow."
                linkedin="https://www.linkedin.com/in/jenil-jain-484095267/"
              />
              <TeamMember
                name="Rishi Rohilla"
                role="Frontend & Backend"
                image="https://media.licdn.com/dms/image/v2/D5603AQFOu20VPwdbAg/profile-displayphoto-shrink_400_400/B56ZUpmKexHsAg-/0/1740159630418?e=1753315200&v=beta&t=G-c5itmWdTF9_3lpE11Bgt1e5kNJPUTV3EVjatKpiaQ"
                bio="Expert @Codeforces"
                linkedin="https://www.linkedin.com/in/rishirohilla88/"
              />
              {/* <TeamMember
                name="Elena Gomez"
                role="VP of Marketing"
                image="/placeholder.svg?height=300&width=300&text=EG"
                bio="Ex-Airbnb Growth Lead. Drove 300% user acquisition improvement in 18 months."
                linkedin="#"
              /> */}
            </div>

            {/* <div className="mt-12 text-center">
              <h3 className="mb-6 text-xl font-bold">Backed By</h3>
              <div className="flex flex-wrap items-center justify-center gap-8">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="h-12 w-32 rounded-md bg-muted">
                    <Image
                      src={`/placeholder.svg?height=48&width=128&text=Investor+${i}`}
                      alt={`Investor ${i}`}
                      width={128}
                      height={48}
                    />
                  </div>
                ))}
              </div>
            </div> */}
          </div>
        </section>

        {/* Investment Opportunity Section */}
        <section id="investment" className="py-20 bg-white dark:bg-background ">
          <div className="container ">
            <div className="mx-auto mb-12 max-w-[800px] text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Investment Opportunity</h2>
              <p className="mt-4 text-muted-foreground md:text-xl">
                Join our $5M seed round to accelerate growth and capture market share.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              <div className="rounded-lg border bg-card p-6 shadow-sm">
                <h3 className="mb-4 text-xl font-bold">Funding Details</h3>
                <div className="space-y-4">
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-medium">Round Size</span>
                    <span>$5,000,000</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-medium">Minimum Investment</span>
                    <span>$100,000</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-medium">Pre-money Valuation</span>
                    <span>$25,000,000</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-medium">Instrument</span>
                    <span>SAFE with 20% discount</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-medium">Closing Date</span>
                    <span>June 30, 2025</span>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border bg-card p-6 shadow-sm">
                <h3 className="mb-4 text-xl font-bold">Use of Funds</h3>
                <div className="space-y-6">
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm font-medium">Product Development (40%)</span>
                      <span className="text-sm">$2,000,000</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted">
                      <div className="h-2 w-[40%] rounded-full bg-primary"></div>
                    </div>
                  </div>
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm font-medium">Sales & Marketing (30%)</span>
                      <span className="text-sm">$1,500,000</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted">
                      <div className="h-2 w-[30%] rounded-full bg-primary"></div>
                    </div>
                  </div>
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm font-medium">Team Expansion (20%)</span>
                      <span className="text-sm">$1,000,000</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted">
                      <div className="h-2 w-[20%] rounded-full bg-primary"></div>
                    </div>
                  </div>
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm font-medium">Operations (10%)</span>
                      <span className="text-sm">$500,000</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted">
                      <div className="h-2 w-[10%] rounded-full bg-primary"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 rounded-lg border bg-card p-8 shadow-sm">
              <h3 className="mb-6 text-center text-xl font-bold">Projected Returns</h3>
              <div className="grid gap-8 md:grid-cols-3">
                <div className="rounded-lg border bg-muted/50 p-6 text-center">
                  <h4 className="text-lg font-bold">Year 3</h4>
                  <p className="mt-2 text-3xl font-bold">5x</p>
                  <p className="mt-1 text-sm text-muted-foreground">Projected Return</p>
                </div>
                <div className="rounded-lg border bg-muted/50 p-6 text-center">
                  <h4 className="text-lg font-bold">Year 5</h4>
                  <p className="mt-2 text-3xl font-bold">12x</p>
                  <p className="mt-1 text-sm text-muted-foreground">Projected Return</p>
                </div>
                <div className="rounded-lg border bg-muted/50 p-6 text-center">
                  <h4 className="text-lg font-bold">Exit Strategy</h4>
                  <p className="mt-2 text-xl font-bold">Acquisition or IPO</p>
                  <p className="mt-1 text-sm text-muted-foreground">Within 5-7 years</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-slate-50 dark:bg-slate-950/50">
          <div className="container">
            <div className="mx-auto mb-12 max-w-[800px] text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">What Our Investors Say</h2>
              <p className="mt-4 text-muted-foreground md:text-xl">Hear from our early investors and advisors.</p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Testimonial
                quote="The team's execution speed is remarkable. They've consistently hit every milestone ahead of schedule."
                name="Alex Thompson"
                role="Partner, Sequoia Capital"
                image="https://media.licdn.com/dms/image/v2/D4E03AQH6TrPRLm_hgw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1697558218802?e=1753315200&v=beta&t=hvNqTKpCF4BWM5RjB0gcvviVW76vsGaKaNVMeLtxuhE"
              />
              <Testimonial
                quote="Their product-market fit is the strongest I've seen in the fintech space in the last decade."
                name="Jennifer Wu"
                role="Angel Investor, Former CFO at Visa"
                image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjj62a5RbaVGp1eNl33svrcsvFy58Z4cjdrw&s"
              />
              <Testimonial
                quote="The founding team combines deep technical expertise with exceptional business acumen. A rare combination."
                name="Robert Kiyosaki"
                role="Managing Director, Fintech Ventures"
                image="https://upload.wikimedia.org/wikipedia/commons/c/c1/Robert_Kiyosaki_by_Gage_Skidmore_2.jpg"
              />
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-20 bg-white dark:bg-background">
          <div className="container">
            <div className="mx-auto mb-12 max-w-[800px] text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Frequently Asked Questions
              </h2>
              <p className="mt-4 text-muted-foreground md:text-xl">Common questions from potential investors.</p>
            </div>

            <div className="mx-auto max-w-[800px]">
              <FAQAccordion
                items={[
                  {
                    question: "What is your competitive advantage?",
                    answer:
                      "Our proprietary AI algorithms provide 80% cost reduction compared to traditional solutions, while our team's deep industry expertise gives us unique insights into customer pain points.",
                  },
                  {
                    question: "What are your plans for international expansion?",
                    answer:
                      "We're currently focused on the North American market, with plans to expand into Europe in Q3 2025 and Asia-Pacific in Q1 2026.",
                  },
                  {
                    question: "How do you plan to use the investment?",
                    answer:
                      "40% will go toward product development, 30% to sales and marketing, 20% to team expansion, and 10% to operations and infrastructure.",
                  },
                  {
                    question: "What is your customer acquisition strategy?",
                    answer:
                      "We employ a multi-channel approach combining B2B partnerships, content marketing, and targeted digital advertising, resulting in our industry-leading CAC of $42.",
                  },
                  {
                    question: "What regulatory challenges do you face?",
                    answer:
                      "We've proactively built compliance into our platform and have engaged with regulatory bodies early. Our legal team includes former fintech regulators who guide our compliance strategy.",
                  },
                ]}
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container">
            <div className="mx-auto max-w-[800px] text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to Join Our Journey?
              </h2>
              <p className="mt-4 md:text-xl">
                Schedule a call with our founding team or request our detailed investor deck.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  Schedule a Call
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto bg-transparent border-white hover:bg-white/10"
                >
                  Request Investor Deck
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Investor Signup Form */}
        <section id="investor-access" className="py-20 bg-white dark:bg-background">
          <div className="container">
            <div className="mx-auto max-w-[600px]">
              <div className="mb-8 text-center">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Get Investor Access</h2>
                <p className="mt-4 text-muted-foreground">
                  Complete this form to receive our investor package and schedule a call with our team.
                </p>
              </div>
              <InvestorSignupForm />
            </div>
          </div>
        </section>
      </main>

      {/* <footer className="border-t bg-slate-50 dark:bg-slate-950/50">
        <div className="container py-8 md:py-12">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">GrowthVenture</span>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                Revolutionizing fintech for the next generation with AI-powered solutions.
              </p>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-semibold">Company</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Team
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Press
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-semibold">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Investor Deck
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Financial Projections
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Case Studies
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-semibold">Contact</h3>
              <ul className="space-y-2 text-sm">
                <li className="text-muted-foreground">123 Finance Street</li>
                <li className="text-muted-foreground">San Francisco, CA 94103</li>
                <li>
                  <Link
                    href="mailto:investors@growthventure.com"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    investors@growthventure.com
                  </Link>
                </li>
                <li>
                  <Link href="tel:+14155551234" className="text-muted-foreground hover:text-foreground">
                    (415) 555-1234
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} GrowthVenture, Inc. All rights reserved.
            </p>
            <div className="mt-4 sm:mt-0 flex items-center gap-4">
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <span className="sr-only">Twitter</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-twitter"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <span className="sr-only">LinkedIn</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-linkedin"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <span className="sr-only">GitHub</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-github"
                >
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer> */}
    </div>
  )
}