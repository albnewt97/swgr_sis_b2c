import { getSubscribers, exportSubscribersCSV } from "@/app/actions/newsletter"
// import { getSubscribersKV, exportSubscribersCSVKV } from "@/app/actions/newsletter-kv"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Mail, Calendar, Users } from "lucide-react"

export const dynamic = "force-dynamic"

async function downloadCSV() {
  "use server"
  const result = await exportSubscribersCSV()
  return result
}

export default async function SubscribersPage() {
  const result = await getSubscribers()
  // const result = await getSubscribersKV() // Use this for KV version

  const { subscribers, count } = result

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Newsletter Subscribers</h1>
          <p className="text-slate-600">Manage your coming soon page email list</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Subscribers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{count}</div>
              <p className="text-xs text-muted-foreground">People waiting for launch</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Latest Signup</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {subscribers.length > 0
                  ? new Date(subscribers[subscribers.length - 1].timestamp).toLocaleDateString()
                  : "N/A"}
              </div>
              <p className="text-xs text-muted-foreground">Most recent subscriber</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Export Data</CardTitle>
              <Download className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <form action={downloadCSV}>
                <Button type="submit" variant="outline" className="w-full bg-transparent">
                  <Download className="h-4 w-4 mr-2" />
                  Download CSV
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Subscribers List */}
        <Card>
          <CardHeader>
            <CardTitle>All Subscribers</CardTitle>
          </CardHeader>
          <CardContent>
            {subscribers.length === 0 ? (
              <div className="text-center py-12 text-slate-500">
                <Mail className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No subscribers yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {subscribers.map((subscriber, index) => (
                  <div key={index} className="flex items-center justify-between border-b border-slate-200 pb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-blue-600 flex items-center justify-center text-white font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">{subscriber.email}</p>
                        <p className="text-sm text-slate-500">{new Date(subscriber.timestamp).toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Warning */}
        <Card className="mt-8 bg-amber-50 border-amber-200">
          <CardContent className="p-6">
            <h3 className="font-bold text-amber-900 mb-2">⚠️ Important Note</h3>
            <p className="text-amber-800 text-sm">
              The current implementation stores emails in memory and will be lost on deployment. For production:
            </p>
            <ul className="list-disc list-inside text-amber-800 text-sm mt-2 space-y-1">
              <li>Use Vercel KV for persistent storage (uncomment KV functions)</li>
              <li>Or integrate with Mailchimp/ConvertKit</li>
              <li>Or use a proper database (Postgres, MongoDB)</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
