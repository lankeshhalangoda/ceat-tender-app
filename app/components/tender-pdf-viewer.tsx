
"use client"

import { Button } from "@/components/ui/button"
import { Download, Eye, FileText, Copy, ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useRef } from "react"
import QRCode from "./qr-code"
import html2pdf from "html2pdf.js"


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

interface TenderPDFViewerProps {
  tenderData: TenderData
}

export default function TenderPDFViewer({ tenderData }: TenderPDFViewerProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 2
  const pdfRef = useRef<HTMLDivElement>(null)

  const nextPage = () => setCurrentPage((p) => Math.min(p + 1, totalPages))
  const prevPage = () => setCurrentPage((p) => Math.max(p - 1, 1))

  const openPDFInNewTab = async () => {
    if (!pdfRef.current) return

    const opt = {
      margin: 0.5,
      filename: `${tenderData.company}_Tender_${tenderData.title.replace(/\s+/g, "_")}.pdf`,
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" }
    }

    const element = pdfRef.current
    const worker = html2pdf().set(opt).from(element)
    const blob = await worker.outputPdf("blob")
    const url = URL.createObjectURL(blob)
    window.open(url, "_blank")
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end gap-2 action-buttons">
        <Button variant="outline" size="sm" onClick={openPDFInNewTab}>
          <Download className="h-4 w-4 mr-2" />
          Open PDF
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            navigator.clipboard.writeText(`${tenderData.company} Tender - ${tenderData.id}`)
          }}
        >
          <Copy className="h-4 w-4 mr-2" />
          Copy Link
        </Button>
      </div>

      <div ref={pdfRef} id="pdf-content" className="border rounded-lg overflow-hidden">

        <div className="p-6 bg-white">
          {currentPage === 1 && (
            <div className="border rounded-lg shadow-sm overflow-hidden">
              <div className="bg-gray-50 p-4 border-b flex justify-between items-center">
                <div className="flex items-center">
                  <img src="/images/ceat-logo.png" alt="CEAT Logo" className="h-12 mr-4" />
                  <div>
                    <h2 className="text-xl font-bold">TENDER DOCUMENT</h2>
                    <p className="text-sm text-gray-500">Ref: {tenderData.id}</p>
                  </div>
                </div>
                <QRCode size={80} surveyLink={tenderData.surveyLink} />
              </div>

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

                  <div className="flex justify-between mt-8 items-center">
                    <div></div>
                    <div className="text-sm text-gray-600">
                      <p>Page 1 of {totalPages}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentPage === 2 && (
            <div className="border rounded-lg shadow-sm overflow-hidden">
              <div className="bg-gray-50 p-4 border-b flex justify-between items-center">
                <div className="flex items-center">
                  <img src="/images/ceat-logo.png" alt="CEAT Logo" className="h-12 mr-4" />
                  <div>
                    <h2 className="text-xl font-bold">TENDER DOCUMENT</h2>
                    <p className="text-sm text-gray-500">Ref: {tenderData.id}</p>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <section>
                  <h3 className="text-lg font-semibold border-b pb-2 mb-2">4. Evaluation Criteria</h3>
                  <p className="text-gray-700">{tenderData.evaluationCriteria}</p>
                </section>

                <section>
                  <h3 className="text-lg font-semibold border-b pb-2 mb-2">5. Terms and Conditions</h3>
                  <p className="text-gray-700">{tenderData.terms}</p>
                </section>

                <section>
                  <h3 className="text-lg font-semibold border-b pb-2 mb-2">6. Contact Information</h3>
                  <p className="text-gray-700">
                    For any queries regarding this tender, please contact:
                    <br />
                    Procurement Department
                    <br />
                    Email: procurement@ceat.com
                    <br />
                    Phone: +91-22-12345678
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-semibold border-b pb-2 mb-2">7. Survey Link</h3>
                  <p className="text-gray-700">
                    Please complete the survey using the following link:{" "}
                    <a href={tenderData.surveyLink} className="text-blue-500 underline">
                      {tenderData.surveyLink}
                    </a>
                  </p>
                  <div className="flex justify-center mt-4">
                    <QRCode size={100} surveyLink={tenderData.surveyLink} />
                  </div>
                </section>

                <div className="flex justify-between mt-8 items-center">
                  <div></div>
                  <div className="text-sm text-gray-600">
                    <p>Page 2 of {totalPages}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-3 border-t flex justify-center items-center">
                <div className="text-xs text-gray-500 flex items-center">
                  <span className="mr-2">Powered by</span>
                  <img src="/images/emojot-logo.png" alt="Emojot Logo" className="h-4" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-center mt-4 space-x-2">
        <Button variant="outline" size="sm" onClick={prevPage} disabled={currentPage === 1}>
          <ChevronLeft className="h-4 w-4 mr-1" /> Previous
        </Button>
        <div className="flex items-center px-3 border rounded-md">
          Page {currentPage} of {totalPages}
        </div>
        <Button variant="outline" size="sm" onClick={nextPage} disabled={currentPage === totalPages}>
          Next <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </div>
  )
}
