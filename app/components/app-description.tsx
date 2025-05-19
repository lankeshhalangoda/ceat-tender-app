import { Card, CardContent } from "@/components/ui/card"
import { Lightbulb, Zap, Users, FileCheck } from "lucide-react"

export default function AppDescription() {
  return (
    <div className="mb-8">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">CEAT Tender Generation Platform</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Streamline your procurement process with AI-powered tender generation and distribution
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <div className="bg-blue-100 p-3 rounded-full mb-3">
                <Lightbulb className="h-6 w-6 text-blue-700" />
              </div>
              <h3 className="font-medium text-gray-900 mb-1">AI-Powered Generation</h3>
              <p className="text-sm text-gray-500">
                Create professional tender documents in seconds using advanced AI technology
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <div className="bg-green-100 p-3 rounded-full mb-3">
                <FileCheck className="h-6 w-6 text-green-700" />
              </div>
              <h3 className="font-medium text-gray-900 mb-1">Multiple Formats</h3>
              <p className="text-sm text-gray-500">
                Generate tenders as digital posters, PDFs, emails, and WhatsApp messages
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <div className="bg-amber-100 p-3 rounded-full mb-3">
                <Zap className="h-6 w-6 text-amber-700" />
              </div>
              <h3 className="font-medium text-gray-900 mb-1">Instant Distribution</h3>
              <p className="text-sm text-gray-500">
                Send tenders to multiple vendors and contacts with just a few clicks
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <div className="bg-purple-100 p-3 rounded-full mb-3">
                <Users className="h-6 w-6 text-purple-700" />
              </div>
              <h3 className="font-medium text-gray-900 mb-1">Vendor Management</h3>
              <p className="text-sm text-gray-500">Organize contacts by vendor type for targeted tender distribution</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
