import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
import { Download, Eye, FileText, Upload } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function LegalDocuments() {
  // Sample documents data
  const documents = [
    {
      id: "1",
      name: "TechFlow AI - Investment Agreement",
      company: "TechFlow AI",
      type: "PDF",
      size: "1.2 MB",
      date: "Mar 18, 2023",
      status: "signed",
    },
    {
      id: "2",
      name: "MediSync - Term Sheet",
      company: "MediSync",
      type: "PDF",
      size: "620 KB",
      date: "Jan 5, 2023",
      status: "signed",
    },
    {
      id: "3",
      name: "EduSpark - SAFE Agreement",
      company: "EduSpark",
      type: "PDF",
      size: "850 KB",
      date: "Nov 20, 2022",
      status: "signed",
    },
    {
      id: "4",
      name: "FinSecure - Shareholder Agreement",
      company: "FinSecure",
      type: "PDF",
      size: "1.5 MB",
      date: "Aug 3, 2022",
      status: "signed",
    },
  ]

  const pendingDocuments = [
    {
      id: "5",
      name: "CloudScale - Term Sheet",
      company: "CloudScale",
      type: "PDF",
      size: "580 KB",
      date: "May 12, 2023",
      status: "pending",
    },
  ]

  return (
    <div className="space-y-6">
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Documents</TabsTrigger>
          <TabsTrigger value="pending">Pending Signature</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="pt-4">
          <Card>
            <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle>Legal Documents</CardTitle>
                <CardDescription>Access and manage your investment agreements</CardDescription>
              </div>
              <Button>
                <Upload className="mr-2 h-4 w-4" />
                Upload Document
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {documents.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{doc.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {doc.type} • {doc.size} • {doc.date}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {/* <Badge variant={doc.status === "signed" ? "outline" : "default"}> */}
                        {doc.status === "signed" ? "Signed" : "Pending"}
                      {/* </Badge> */}
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View</span>
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                        <span className="sr-only">Download</span>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="pending" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Documents Pending Signature</CardTitle>
              <CardDescription>Documents that require your attention</CardDescription>
            </CardHeader>
            <CardContent>
              {pendingDocuments.length > 0 ? (
                <div className="space-y-4">
                  {pendingDocuments.map((doc) => (
                    <div
                      key={doc.id}
                      className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                          <FileText className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{doc.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {doc.type} • {doc.size} • {doc.date}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {/* <Badge>Pending</Badge> */}
                        <Button size="sm">Sign Document</Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <p className="text-muted-foreground">No documents pending signature</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Document Templates</CardTitle>
          <CardDescription>Standard templates for investment documents</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b pb-4">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">SAFE Agreement Template</p>
                  <p className="text-xs text-muted-foreground">PDF • 420 KB</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </div>
            <div className="flex items-center justify-between border-b pb-4">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Term Sheet Template</p>
                  <p className="text-xs text-muted-foreground">PDF • 380 KB</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Convertible Note Template</p>
                  <p className="text-xs text-muted-foreground">PDF • 510 KB</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
