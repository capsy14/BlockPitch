import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bell, BellOff } from "lucide-react"

export function InvestmentAlerts() {
  // Sample alerts data
  const alerts = [
    {
      id: "1",
      company: "TechFlow AI",
      title: "Upcoming Funding Round",
      description:
        "TechFlow AI is planning to raise a Series B round in Q1 2024. As an existing investor, you have pro-rata rights.",
      date: "May 15, 2023",
      type: "funding",
      read: false,
    },
    {
      id: "2",
      company: "MediSync",
      title: "Quarterly Performance Update",
      description: "MediSync has exceeded Q2 targets by 15%. Revenue growth is at 22% MoM.",
      date: "May 10, 2023",
      type: "performance",
      read: false,
    },
    {
      id: "3",
      company: "EduSpark",
      title: "New Strategic Partnership",
      description:
        "EduSpark has partnered with Microsoft to integrate their platform with Microsoft Teams for Education.",
      date: "May 5, 2023",
      type: "partnership",
      read: true,
    },
    {
      id: "4",
      company: "FinSecure",
      title: "Executive Team Change",
      description: "FinSecure has appointed a new CTO, formerly from Stripe, to accelerate product development.",
      date: "Apr 28, 2023",
      type: "team",
      read: true,
    },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Alert Settings</CardTitle>
          <CardDescription>Customize what notifications you receive</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between border rounded-lg p-3">
              <div>
                <p className="font-medium">Funding Rounds</p>
                <p className="text-sm text-muted-foreground">Get notified about new funding rounds</p>
              </div>
              <Button variant="outline" size="icon">
                <Bell className="h-4 w-4" />
                <span className="sr-only">Toggle funding alerts</span>
              </Button>
            </div>
            <div className="flex items-center justify-between border rounded-lg p-3">
              <div>
                <p className="font-medium">Performance Updates</p>
                <p className="text-sm text-muted-foreground">Quarterly and monthly performance reports</p>
              </div>
              <Button variant="outline" size="icon">
                <Bell className="h-4 w-4" />
                <span className="sr-only">Toggle performance alerts</span>
              </Button>
            </div>
            <div className="flex items-center justify-between border rounded-lg p-3">
              <div>
                <p className="font-medium">Team Changes</p>
                <p className="text-sm text-muted-foreground">Executive and key personnel changes</p>
              </div>
              <Button variant="outline" size="icon">
                <Bell className="h-4 w-4" />
                <span className="sr-only">Toggle team alerts</span>
              </Button>
            </div>
            <div className="flex items-center justify-between border rounded-lg p-3">
              <div>
                <p className="font-medium">Partnerships</p>
                <p className="text-sm text-muted-foreground">Strategic partnerships and collaborations</p>
              </div>
              <Button variant="outline" size="icon">
                <BellOff className="h-4 w-4" />
                <span className="sr-only">Toggle partnership alerts</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Alerts</CardTitle>
          <CardDescription>Important updates from your portfolio companies</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {alerts.map((alert) => (
              <div key={alert.id} className={`border-b pb-6 last:border-0 last:pb-0 ${alert.read ? "opacity-70" : ""}`}>
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium">{alert.company}</p>
                  {/* <Badge
                    variant={
                      alert.type === "funding"
                        ? "default"
                        : alert.type === "performance"
                          ? "secondary"
                          : alert.type === "partnership"
                            ? "outline"
                            : "outline"
                    }
                  > */}
                    {alert.type}
                  {/* </Badge> */}
                </div>
                <h3 className="text-base font-medium mb-1">{alert.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">{alert.description}</p>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">{alert.date}</p>
                  {/* {!alert.read && (
                    <Badge variant="outline" className="text-xs">
                      New
                    </Badge>
                  )} */}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
