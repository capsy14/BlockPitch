interface MetricsCardProps {
    title: string
    value: string
    description: string
  }
  
  export default function MetricsCard({ title, value, description }: MetricsCardProps) {
    return (
      <div className="rounded-lg border bg-card p-6 shadow-sm">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <p className="mt-2 text-3xl font-bold">{value}</p>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>
    )
  }
  