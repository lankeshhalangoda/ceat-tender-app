import QRCode from "./qr-code"
import { Mail } from "lucide-react"

interface TenderData {
  title: string
  id: string
  deadline: string
  quantity: string
  company: string
  description: string
  surveyLink: string
  terms: string
  evaluationCriteria: string
}

interface TenderEmailProps {
  tenderData: TenderData
}

export default function TenderEmail({ tenderData }: TenderEmailProps) {
  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="bg-gray-100 p-3 border-b flex items-center justify-between">
        <div className="flex items-center">
          <Mail className="h-5 w-5 mr-2 text-blue-600" />
          <span className="font-medium">Email Template</span>
        </div>
      </div>

      <div className="p-6 bg-gray-50">
        <div className="border rounded-lg bg-white shadow-sm overflow-hidden">
          {/* Email Header */}
          <div className="p-4 border-b bg-blue-50">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm text-gray-500">From: {tenderData.company} Procurement</div>
                  <div className="text-sm text-gray-500">To: [Recipient]</div>
                  <div className="font-medium mt-2">
                    Subject: {tenderData.company} Tender: {tenderData.title} - Ref: {tenderData.id}
                  </div>
                </div>
                <img src="/images/ceat-logo.png" alt="CEAT Logo" className="h-10" />
              </div>
            </div>
          </div>

          {/* Email Body Preview */}
          <div className="p-6 space-y-4">
            <p>Dear Valued Supplier,</p>

            <p>
              We are pleased to invite you to participate in our tender for the{" "}
              <strong>{tenderData.title.toLowerCase()}</strong>.
            </p>

            <div className="bg-gray-50 border p-4 rounded-md space-y-2">
              <h3 className="font-semibold text-gray-800">Tender Details:</h3>
              <table className="min-w-full">
                <tbody>
                  <tr>
                    <td className="py-1 pr-4 font-medium text-gray-700">Reference:</td>
                    <td className="py-1">{tenderData.id}</td>
                  </tr>
                  <tr>
                    <td className="py-1 pr-4 font-medium text-gray-700">Last Date:</td>
                    <td className="py-1">
                      {new Date(tenderData.deadline).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-1 pr-4 font-medium text-gray-700">Quantity:</td>
                    <td className="py-1">{tenderData.quantity} units</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p>{tenderData.description}</p>

            <div className="bg-blue-50 border border-blue-100 p-4 rounded-md">
              <h3 className="font-semibold text-blue-800 mb-2">Key Requirements:</h3>
              <ul className="list-disc list-inside space-y-1 text-blue-700">
                <li>Ergonomic design with lumbar support</li>
                <li>Adjustable height mechanism (gas lift)</li>
                <li>High-quality breathable mesh backrest</li>
                <li>Minimum 2-year warranty and support</li>
              </ul>
            </div>

            <div className="bg-gray-50 border p-4 rounded-md">
              <h3 className="font-semibold mb-2">Evaluation Criteria:</h3>
              <p className="text-sm text-gray-700">{tenderData.evaluationCriteria}</p>
            </div>

            <p>
              Please complete our supplier survey to register your interest. You can access the survey at:{" "}
              <a href={tenderData.surveyLink} className="text-blue-600 underline">
                {tenderData.surveyLink}
              </a>
            </p>

            <div className="flex gap-4 items-center justify-center bg-gray-50 p-4 rounded-md">
              <div className="text-center">
                <p className="mb-2 font-medium">Scan the QR code to access the survey:</p>
                <QRCode size={120} surveyLink={tenderData.surveyLink} />
              </div>
            </div>

            <div className="pt-4 border-t">
              <p>Best Regards,</p>
              <p className="font-medium">Procurement Team</p>
              <p>{tenderData.company}</p>
              <p className="text-sm text-gray-500">procurement@ceat.com | +91-22-12345678</p>
            </div>

            <div className="bg-gray-50 border-t p-3 text-xs text-gray-500">
              <p>{tenderData.terms}</p>
            </div>
          </div>

          {/* Email Footer */}
          <div className="bg-gray-100 p-3 border-t flex justify-center items-center">
            <div className="text-xs text-gray-500 flex items-center">
              <span className="mr-2">Powered by</span>
              <img src="/images/emojot-logo.png" alt="Emojot Logo" className="h-5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
