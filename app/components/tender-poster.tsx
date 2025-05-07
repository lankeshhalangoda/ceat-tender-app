import QRCode from "./qr-code"

interface TenderData {
  title: string
  id: string
  deadline: string
  quantity: string
  company: string
  description: string
  surveyLink: string
  terms: string
}

interface TenderPosterProps {
  type: "digital" | "print"
  tenderData: TenderData
}

export default function TenderPoster({ type, tenderData }: TenderPosterProps) {
  return (
    <div
      className={`border rounded-lg overflow-hidden ${type === "print" ? "bg-white" : "bg-gradient-to-br from-blue-50 to-indigo-50"}`}
    >
      <div className="p-8 relative">
        {/* Header with logo and QR code side by side */}
        <div className="flex justify-between items-start mb-8">
          <div className="flex items-center">
            <img src="/images/ceat-logo.png" alt="CEAT Logo" className="h-12 mr-4" />
            <div className="border-l-2 border-red-500 pl-4">
              <h3 className="text-xl font-bold">TENDER NOTICE</h3>
              <p className="text-sm text-gray-500">Ref: {tenderData.id}</p>
            </div>
          </div>

          {/* QR code positioned to not overlap content */}
          <div className="bg-white p-2 rounded-lg shadow-sm ml-4">
            <QRCode surveyLink={tenderData.surveyLink} />
          </div>
        </div>

        {/* Content area with no right padding needed now */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">{tenderData.title}</h1>
          <p className="text-gray-700 mb-4">{tenderData.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="font-semibold mb-2">Requirements:</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>Ergonomic design with lumbar support</li>
              <li>Adjustable height and armrests</li>
              <li>High-quality breathable mesh material</li>
              <li>Minimum 2-year warranty</li>
              <li>Quantity: {tenderData.quantity} units</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Important Dates:</h3>
            <div className="space-y-2 text-gray-700">
              <div className="flex justify-between">
                <span>Tender Release Date:</span>
                <span className="font-medium">May 10, 2023</span>
              </div>
              <div className="flex justify-between">
                <span>Last Date for Submission:</span>
                <span className="font-medium">
                  {new Date(tenderData.deadline).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Technical Bid Opening:</span>
                <span className="font-medium">May 30, 2023</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <h3 className="font-semibold mb-2">How to Apply:</h3>
          <p className="text-gray-700">
            Interested suppliers can submit their bids in sealed envelopes marked "Tender for {tenderData.title}" to the
            Procurement Department, {tenderData.company} Headquarters, or apply online by scanning the QR code.
          </p>
        </div>

        <div className="text-center text-gray-700 text-sm">
          <p>For queries, contact: procurement@ceat.com | +91-22-12345678</p>
          <p className="mt-1">Survey Link: {tenderData.surveyLink}</p>
        </div>

        <div className="mt-4 pt-4 border-t text-xs text-gray-500">
          <p>{tenderData.terms}</p>
        </div>
      </div>
    </div>
  )
}
