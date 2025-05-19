import QRCode from "./qr-code"
import { Calendar, Package2, Clock, FileCheck, Phone } from "lucide-react"

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

interface TenderPosterProps {
  type: "digital" | "print"
  tenderData: TenderData
}

export default function TenderPoster({ type, tenderData }: TenderPosterProps) {
  return (
    <div
      className={`border rounded-lg overflow-hidden shadow-lg ${
        type === "print" ? "bg-white" : "bg-gradient-to-b from-blue-50 via-white to-blue-50"
      }`}
    >
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-900 text-white p-5">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img src="/images/ceat-logo.png" alt="CEAT Logo" className="h-14 mr-5 bg-white p-1 rounded" />
            <div>
              <h1 className="text-3xl font-bold tracking-tight">TENDER NOTICE</h1>
              <p className="text-blue-100 text-lg">Reference: {tenderData.id}</p>
            </div>
          </div>
          <div className="hidden md:block">
            <QRCode size={110} surveyLink={tenderData.surveyLink} className="shadow-lg" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Title and Description */}
        <div className="mb-6 border-b pb-5">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-800 mb-3">{tenderData.title}</h2>
          <p className="text-gray-700 text-lg">{tenderData.description}</p>
        </div>

        {/* Key Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
          {/* Deadline Card */}
          <div className="bg-blue-50 rounded-lg p-5 border border-blue-100 flex items-start shadow-sm">
            <div className="bg-blue-700 text-white p-3 rounded-full mr-4">
              <Calendar className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-semibold text-blue-800 text-lg">Submission Deadline</h3>
              <p className="text-blue-900 font-medium text-xl">
                {new Date(tenderData.deadline).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
              <p className="text-sm text-blue-700 mt-1">Technical Bid Opening: May 30, 2023</p>
            </div>
          </div>

          {/* Quantity Card */}
          <div className="bg-green-50 rounded-lg p-5 border border-green-100 flex items-start shadow-sm">
            <div className="bg-green-700 text-white p-3 rounded-full mr-4">
              <Package2 className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-semibold text-green-800 text-lg">Required Quantity</h3>
              <p className="text-green-900 font-medium text-xl">{tenderData.quantity} units</p>
              <p className="text-sm text-green-700 mt-1">Delivery to {tenderData.company} Headquarters</p>
            </div>
          </div>
        </div>

        {/* Requirements Section */}
        <div className="mb-6 bg-gray-50 rounded-lg p-5 border border-gray-200 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-3 flex items-center text-lg">
            <FileCheck className="h-6 w-6 mr-2 text-gray-700" />
            Technical Requirements
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
            <li className="flex items-center text-gray-700">
              <div className="h-2 w-2 rounded-full bg-blue-600 mr-2"></div>
              Ergonomic design with lumbar support
            </li>
            <li className="flex items-center text-gray-700">
              <div className="h-2 w-2 rounded-full bg-blue-600 mr-2"></div>
              Adjustable height mechanism (gas lift)
            </li>
            <li className="flex items-center text-gray-700">
              <div className="h-2 w-2 rounded-full bg-blue-600 mr-2"></div>
              Adjustable armrests (height and width)
            </li>
            <li className="flex items-center text-gray-700">
              <div className="h-2 w-2 rounded-full bg-blue-600 mr-2"></div>
              High-quality breathable mesh backrest
            </li>
            <li className="flex items-center text-gray-700">
              <div className="h-2 w-2 rounded-full bg-blue-600 mr-2"></div>
              360° swivel with smooth-rolling casters
            </li>
            <li className="flex items-center text-gray-700">
              <div className="h-2 w-2 rounded-full bg-blue-600 mr-2"></div>
              Minimum 2-year warranty and support
            </li>
          </ul>
        </div>

        {/* Evaluation Criteria */}
        <div className="mb-6 bg-amber-50 rounded-lg p-5 border border-amber-100 shadow-sm">
          <h3 className="font-bold text-amber-800 mb-3 text-lg">Evaluation Criteria</h3>
          <p className="text-amber-900">{tenderData.evaluationCriteria}</p>
        </div>

        {/* How to Apply */}
        <div className="mb-6 bg-blue-50 rounded-lg p-5 border border-blue-100 shadow-sm">
          <h3 className="font-bold text-blue-800 mb-3 flex items-center text-lg">
            <Clock className="h-6 w-6 mr-2 text-blue-700" />
            How to Apply
          </h3>
          <p className="text-blue-900">
            Interested suppliers can submit their bids in sealed envelopes marked "Tender for {tenderData.title}" to the
            Procurement Department, {tenderData.company} Headquarters, or apply online by scanning the QR code.
          </p>
          <div className="md:hidden mt-5 flex justify-center">
            <QRCode size={130} surveyLink={tenderData.surveyLink} className="shadow-md" />
          </div>
        </div>

        {/* Contact Information */}
        <div className="flex items-center justify-between border-t pt-5">
          <div className="flex items-center text-gray-700">
            <Phone className="h-5 w-5 mr-2 text-blue-600" />
            <span>procurement@ceat.com | +94-81-234-5678</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-50 p-4 border-t">
        <div className="text-xs text-gray-500 text-center mb-2">
          <p>{tenderData.terms}</p>
        </div>
      </div>
    </div>
  )
}
