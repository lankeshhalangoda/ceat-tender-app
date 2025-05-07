import QRCode from "./qr-code"
import { FileText, Download } from "lucide-react"

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

interface TenderPDFProps {
  tenderData: TenderData
}

export default function TenderPDF({ tenderData }: TenderPDFProps) {
  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="bg-gray-100 p-3 border-b flex items-center justify-between">
        <div className="flex items-center">
          <FileText className="h-5 w-5 mr-2 text-red-500" />
          <span className="font-medium">
            {tenderData.company}_Tender_{tenderData.title.replace(/\s+/g, "_")}.pdf
          </span>
        </div>
        <div className="text-sm text-gray-500 action-buttons">2 pages • 1.2 MB</div>
      </div>

      <div className="p-6 bg-white">
        <div className="border rounded-lg shadow-sm overflow-hidden">
          {/* PDF Header */}
          <div className="bg-gray-50 p-4 border-b flex justify-between items-center">
            <div className="flex items-center">
              <img src="/images/ceat-logo.png" alt="CEAT Logo" className="h-10 mr-4" />
              <div>
                <h2 className="text-xl font-bold">TENDER DOCUMENT</h2>
                <p className="text-sm text-gray-500">Ref: {tenderData.id}</p>
              </div>
            </div>
            <QRCode size={80} surveyLink={tenderData.surveyLink} />
          </div>

          {/* PDF Content Preview */}
          <div className="p-6 space-y-4">
            <h1 className="text-2xl font-bold text-center">INVITATION TO TENDER</h1>
            <h2 className="text-xl font-semibold text-center mb-4">{tenderData.title}</h2>

            <div className="space-y-4">
              <section>
                <h3 className="text-lg font-semibold border-b pb-2 mb-2">1. Introduction</h3>
                <p className="text-gray-700">
                  {tenderData.company} invites sealed tenders from reputed manufacturers and suppliers for the{" "}
                  {tenderData.title.toLowerCase()} for our corporate headquarters.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold border-b pb-2 mb-2">2. Scope of Supply</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>
                    {tenderData.title} - {tenderData.quantity} units
                  </li>
                  <li>Delivery to {tenderData.company} Headquarters</li>
                  <li>Installation and assembly at the designated location</li>
                  <li>Minimum 2-year warranty and after-sales service</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-semibold border-b pb-2 mb-2">3. Technical Specifications</h3>
                <div className="text-gray-700">
                  <p className="mb-2">All items must meet the following specifications:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Ergonomic design with adjustable lumbar support</li>
                    <li>Height adjustment mechanism (gas lift)</li>
                    <li>Adjustable armrests (height and width)</li>
                    <li>High-quality breathable mesh backrest</li>
                    <li>360° swivel with smooth-rolling casters</li>
                    <li>Weight capacity: minimum 120 kg</li>
                    <li>Tilt mechanism with multiple locking positions</li>
                  </ul>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-semibold border-b pb-2 mb-2">4. Survey Link</h3>
                <p className="text-gray-700">
                  For more information and to submit your response, please visit:{" "}
                  <span className="text-blue-600">{tenderData.surveyLink}</span>
                </p>
              </section>

              {/* Faded content to indicate more pages */}
              <div className="relative mt-6 pt-6">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white"></div>
                <section className="opacity-30">
                  <h3 className="text-lg font-semibold border-b pb-2 mb-2">5. Eligibility Criteria</h3>
                  <p className="text-gray-700">Bidders must meet the following eligibility criteria:</p>
                </section>
              </div>
            </div>
          </div>

          {/* PDF Footer */}
          <div className="bg-gray-50 p-3 border-t flex justify-between text-sm">
            <span className="text-gray-500">Page 1 of 2</span>
            <span className="text-xs text-gray-500">{tenderData.terms}</span>
          </div>
        </div>

        <div className="mt-4 text-center action-buttons">
          <p className="text-sm text-gray-500 mb-2">
            This PDF includes the complete tender specifications, terms & conditions, and submission guidelines.
          </p>
          <div className="inline-flex items-center text-blue-600 cursor-pointer">
            <Download className="h-4 w-4 mr-1" />
            <span>Download Full PDF</span>
          </div>
        </div>
      </div>
    </div>
  )
}
