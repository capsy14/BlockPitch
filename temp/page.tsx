import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

// Mock data for startups (same as in home page)
const startups = [
  {
    id: 1,
    name: "EcoTech Solutions",
    description:
      "Revolutionary sustainable energy technology that converts waste into clean, renewable power for residential and commercial use. Our patented process achieves 95% efficiency while reducing carbon emissions.",
    fullDescription: `EcoTech Solutions is pioneering the future of sustainable energy with our groundbreaking waste-to-energy conversion technology. Our innovative system transforms various types of waste materials into clean, renewable power that can be used for both residential and commercial applications.

Key Features:
• 95% conversion efficiency
• Zero harmful emissions
• Compact, modular design
• Remote monitoring capabilities
• AI-optimized processing

Market Opportunity:
The global waste-to-energy market is projected to reach $50 billion by 2027, with increasing demand for sustainable energy solutions driving growth across all regions.

Team:
• Dr. Sarah Chen - CEO (Former Tesla Energy Division Lead)
• Michael Rodriguez - CTO (20+ years in renewable energy)
• Dr. James Wilson - Head of R&D (PhD in Chemical Engineering)

Investment Use:
• Scale production facilities
• Expand R&D team
• International market expansion
• Patent portfolio development`,
    image: "/placeholder.svg?height=400&width=800",
    funding: "$2M",
    category: "Clean Energy",
    raised: "$800K",
    timeline: "Q4 2024",
    location: "San Francisco, CA",
  },
  {
    id: 2,
    name: "HealthAI",
    description:
      "AI-powered healthcare diagnostics platform that uses machine learning to analyze medical images and provide instant, accurate disease detection and treatment recommendations.",
    fullDescription: `HealthAI is revolutionizing medical diagnostics through advanced artificial intelligence and machine learning technologies. Our platform provides healthcare professionals with instant, accurate disease detection and treatment recommendations based on medical imaging analysis.

Key Features:
• 99.9% accuracy rate
• Real-time analysis
• Integration with existing PACS systems
• Multi-modality support
• HIPAA compliant

Market Opportunity:
The global AI in healthcare market is expected to reach $45 billion by 2026, with diagnostic applications leading the growth.

Team:
• Dr. Emily Watson - CEO (Former Head of AI at Mayo Clinic)
• Alex Kumar - CTO (Ex-Google Health)
• Dr. Robert Martinez - Medical Director (20+ years in radiology)

Investment Use:
• Clinical trials expansion
• FDA approval process
• Team expansion
• Platform development`,
    image: "/placeholder.svg?height=400&width=800",
    funding: "$1.5M",
    category: "Healthcare",
    raised: "$500K",
    timeline: "Q3 2024",
    location: "Boston, MA",
  },
  {
    id: 3,
    name: "SmartFarm",
    description:
      "IoT-based precision agriculture system that optimizes crop yields through automated monitoring, irrigation, and pest control, reducing water usage by 40%.",
    fullDescription: `SmartFarm is transforming agriculture with our comprehensive IoT-based precision farming system. Our solution enables farmers to maximize crop yields while minimizing resource usage through automated monitoring, intelligent irrigation, and advanced pest control systems.

Key Features:
• 40% reduction in water usage
• Real-time crop monitoring
• Automated pest detection
• Weather-adaptive irrigation
• Mobile app control

Market Opportunity:
The precision agriculture market is projected to reach $12.9 billion by 2027, with increasing demand for sustainable farming solutions.

Team:
• John Anderson - CEO (Former Agricultural Technology Director)
• Maria Garcia - CTO (IoT Expert, 15+ years experience)
• Dr. Peter Thompson - Head of Agronomy

Investment Use:
• Hardware manufacturing
• Software development
• Market expansion
• R&D for new crop types`,
    image: "/placeholder.svg?height=400&width=800",
    funding: "$3M",
    category: "AgTech",
    raised: "$1.2M",
    timeline: "Q2 2024",
    location: "Davis, CA",
  },
  {
    id: 4,
    name: "CyberShield",
    description:
      "Next-generation cybersecurity platform utilizing quantum-resistant encryption to protect enterprise data from both classical and quantum computing threats.",
    fullDescription: `CyberShield is at the forefront of quantum-resistant cybersecurity, developing cutting-edge encryption technologies to protect enterprise data from both current and future threats, including quantum computing attacks.

Key Features:
• Quantum-resistant encryption
• Zero-trust architecture
• Real-time threat detection
• Automated incident response
• Cloud-native deployment

Market Opportunity:
The quantum cryptography market is expected to reach $5.5 billion by 2027, driven by increasing cybersecurity threats and quantum computing advancement.

Team:
• David Chang - CEO (Former NSA Cryptography Expert)
• Dr. Lisa Brown - CTO (PhD in Quantum Computing)
• Mark Williams - Head of Product (Ex-Palantir)

Investment Use:
• Core technology development
• Team expansion
• Sales and marketing
• Enterprise pilot programs`,
    image: "/placeholder.svg?height=400&width=800",
    funding: "$5M",
    category: "Cybersecurity",
    raised: "$2M",
    timeline: "Q1 2024",
    location: "Austin, TX",
  },
]

export default function StartupDetail({ params }: { params: { id: string } }) {
  const startup = startups.find((s) => s.id === Number.parseInt(params.id))

  if (!startup) {
    return <div>Startup not found</div>
  }

  return (
    <main className="min-h-screen bg-background py-12">
      <div className="container px-4 md:px-6">
        <Link href="/" className="mb-6 inline-flex items-center text-primary hover:underline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Startups
        </Link>
        <div className="grid gap-12 lg:grid-cols-[2fr,1fr]">
          <div>
            <Image
              src={startup.image || "/placeholder.svg"}
              alt={startup.name}
              width={800}
              height={400}
              className="rounded-lg object-cover"
            />
            <h1 className="mt-6 text-4xl font-bold">{startup.name}</h1>
            <div className="mt-4 flex items-center gap-4">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                {startup.category}
              </span>
              <span className="text-sm text-muted-foreground">{startup.location}</span>
            </div>
            <div className="mt-6 space-y-4 whitespace-pre-line text-muted-foreground">{startup.fullDescription}</div>
          </div>
          <div className="space-y-6">
            <div className="rounded-lg border bg-card p-6">
              <h2 className="text-xl font-semibold">Investment Details</h2>
              <div className="mt-4 space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Funding Goal</p>
                  <p className="text-2xl font-bold">{startup.funding}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Raised So Far</p>
                  <p className="text-2xl font-bold">{startup.raised}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Expected Timeline</p>
                  <p className="font-medium">{startup.timeline}</p>
                </div>
                <Button className="w-full" size="lg">
                  Invest Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}