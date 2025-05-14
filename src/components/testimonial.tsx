import Image from "next/image"
import { Quote } from "lucide-react"

interface TestimonialProps {
  quote: string
  name: string
  role: string
  image: string
}

export default function Testimonial({ quote, name, role, image }: TestimonialProps) {
  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <Quote className="h-8 w-8 text-muted-foreground/40" />
      <p className="mt-4 text-muted-foreground">{quote}</p>
      <div className="mt-6 flex items-center gap-3">
        <div className="h-10 w-10 overflow-hidden rounded-full">
          <Image
            src={image || "/placeholder.svg"}
            alt={name}
            width={40}
            height={40}
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <p className="font-medium">{name}</p>
          <p className="text-sm text-muted-foreground">{role}</p>
        </div>
      </div>
    </div>
  )
}
