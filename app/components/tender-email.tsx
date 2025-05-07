"use client"

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

interface TenderEmailProps {
  tenderData: TenderData
}

export default function TenderEmail({ tenderData }: TenderEmailProps) {
  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="bg-gray-100 p-3 border-b flex justify-between items-center">
        <div>
          <span className="font-medium">Subject:</span> {tenderData.company} Tender: {tenderData.title}
        </div>
        <div className="text-sm text-gray-500">From: tenders@ceat.com</div>
      </div>

      <div className="p-6 bg-white">
        <div className="mb-6">
          <img src="/images/ceat-logo.png" alt="CEAT Logo" className="h-10" />
        </div>

        <div className="space-y-4">
          <p>Dear Supplier,</p>

          <p>
            {tenderData.company} is pleased to invite you to participate in our tender for the {tenderData.title} for
            our corporate headquarters.
          </p>

          <div className="bg-gray-50 p-4 rounded-md">
            <h3 className="font-bold text-lg mb-2">Tender Details: {tenderData.title}</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Tender Reference: {tenderData.id}</li>
              <li>
                Last Date for Submission:{" "}
                {new Date(tenderData.deadline).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </li>
              <li>Quantity Required: {tenderData.quantity} units</li>
            </ul>
          </div>

          <p>{tenderData.description}</p>

          <p>
            Please find attached the detailed tender document and specifications. To submit your bid, you can either:
          </p>

          <ul className="list-disc list-inside space-y-1">
            <li>Reply to this email with the required documents</li>
            <li>Submit through our online portal by scanning the QR code below</li>
            <li>Send a sealed envelope to our procurement department</li>
          </ul>

          <div className="flex justify-center my-4">
            <QRCode size={150} surveyLink={tenderData.surveyLink} />
          </div>

          <p>
            Survey Link:{" "}
            <a href={tenderData.surveyLink} className="text-blue-600 underline">
              {tenderData.surveyLink}
            </a>
          </p>

          <p>
            If you have any questions or require clarification, please contact our procurement team at
            procurement@ceat.com or call +91-22-12345678.
          </p>

          <p>We look forward to your participation.</p>

          <div className="pt-4">
            <p>Best Regards,</p>
            <p className="font-medium">Procurement Team</p>
            <p>{tenderData.company}</p>
          </div>

          <div className="text-xs text-gray-500 mt-4 pt-4 border-t">
            <p>{tenderData.terms}</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 p-3 border-t">
        <div className="flex items-center justify-between">
          <span className="text-gray-500 text-sm">Attachments: Tender_Document.pdf, Specifications.pdf</span>
        </div>
      </div>
    </div>
  )
}
