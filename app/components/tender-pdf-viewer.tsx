"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Download, Printer, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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

interface TenderPDFViewerProps {
  tenderData: TenderData
  onDownload: () => void
}

export default function TenderPDFViewer({ tenderData, onDownload }: TenderPDFViewerProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [zoom, setZoom] = useState(100)
  const totalPages = 3

  const handleZoomIn = () => {
    if (zoom < 200) setZoom(zoom + 10)
  }

  const handleZoomOut = () => {
    if (zoom > 50) setZoom(zoom - 10)
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1)
  }

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1)
  }

  return (
    <div className="border rounded-lg overflow-hidden bg-gray-100">
      {/* PDF Viewer Toolbar */}
      <div className="bg-gray-200 p-2 border-b flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" onClick={handlePrevPage} disabled={currentPage === 1}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="text-sm">
            Page <span className="font-medium">{currentPage}</span> of <span className="font-medium">{totalPages}</span>
          </div>
          <Button variant="ghost" size="icon" onClick={handleNextPage} disabled={currentPage === totalPages}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" onClick={handleZoomOut} disabled={zoom <= 50}>
            <ZoomOut className="h-4 w-4" />
          </Button>
          <span className="text-sm font-medium">{zoom}%</span>
          <Button variant="ghost" size="icon" onClick={handleZoomIn} disabled={zoom >= 200}>
            <ZoomIn className="h-4 w-4" />
          </Button>
          <div className="h-5 border-l mx-1"></div>
          <Button variant="ghost" size="icon" onClick={() => window.print()}>
            <Printer className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={onDownload} className="download-button">
            <Download className="h-4 w-4" />
          </Button>
        </div>

        <div className="relative w-48">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
          <Input placeholder="Search document" className="pl-8 h-9 text-sm" />
        </div>
      </div>

      {/* PDF Content */}
      <div className="p-6 bg-gray-800 flex justify-center min-h-[700px]" id="pdf-content">
        <div
          className="bg-white shadow-lg rounded-sm overflow-hidden transition-all duration-200"
          style={{
            width: `${8.27 * (zoom / 100)}in`,
            height: `${11.7 * (zoom / 100)}in`,
            transform: `scale(${zoom / 100})`,
            transformOrigin: "top center",
          }}
        >
          {currentPage === 1 ? (
            <div className="relative p-8">
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

              {/* PDF Content */}
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
                </div>
              </div>

              {/* PDF Footer */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center text-sm">
                <span className="text-gray-500">1</span>
              </div>
            </div>
          ) : currentPage === 2 ? (
            <div className="relative p-8">
              {/* Page 2 Header */}
              <div className="bg-gray-50 p-4 border-b flex justify-between items-center">
                <div className="flex items-center">
                  <img src="/images/ceat-logo.png" alt="CEAT Logo" className="h-10 mr-4" />
                  <div>
                    <h2 className="text-xl font-bold">TENDER DOCUMENT</h2>
                    <p className="text-sm text-gray-500">Ref: {tenderData.id}</p>
                  </div>
                </div>
              </div>

              {/* Page 2 Content */}
              <div className="p-6 space-y-4">
                <section>
                  <h3 className="text-lg font-semibold border-b pb-2 mb-2">5. Eligibility Criteria</h3>
                  <p className="text-gray-700 mb-2">Bidders must meet the following eligibility criteria:</p>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    <li>Minimum 3 years of experience in supplying office furniture</li>
                    <li>Annual turnover of at least INR 1 crore in the last financial year</li>
                    <li>Valid GST registration and PAN</li>
                    <li>No blacklisting by any government or private organization</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-lg font-semibold border-b pb-2 mb-2">6. Submission Guidelines</h3>
                  <p className="text-gray-700 mb-2">Bids must be submitted in the following format:</p>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    <li>Technical bid and financial bid in separate sealed envelopes</li>
                    <li>Company profile and relevant experience</li>
                    <li>Product specifications and brochures</li>
                    <li>Warranty and after-sales service details</li>
                    <li>Delivery timeline</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-lg font-semibold border-b pb-2 mb-2">7. Evaluation Criteria</h3>
                  <p className="text-gray-700 mb-2">Bids will be evaluated based on:</p>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    <li>Technical compliance (40%)</li>
                    <li>Price (30%)</li>
                    <li>Delivery timeline (15%)</li>
                    <li>Warranty and after-sales service (15%)</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-lg font-semibold border-b pb-2 mb-2">8. Contact Information</h3>
                  <p className="text-gray-700">For any queries related to this tender, please contact:</p>
                  <div className="mt-2 space-y-1 text-gray-700">
                    <p>Procurement Department</p>
                    <p>{tenderData.company}</p>
                    <p>Email: procurement@ceat.com</p>
                    <p>Phone: +94-81-234-5678</p>
                  </div>
                </section>
              </div>

              {/* PDF Footer */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center text-sm">
                <span className="text-gray-500">2</span>
              </div>
            </div>
          ) : (
            <div className="relative p-8">
              {/* Page 3 Header - Terms and Conditions */}
              <div className="bg-gray-50 p-4 border-b flex justify-between items-center">
                <div className="flex items-center">
                  <img src="/images/ceat-logo.png" alt="CEAT Logo" className="h-10 mr-4" />
                  <div>
                    <h2 className="text-xl font-bold">TENDER DOCUMENT</h2>
                    <p className="text-sm text-gray-500">Ref: {tenderData.id}</p>
                  </div>
                </div>
              </div>

              {/* Page 3 Content - Terms and Conditions */}
              <div className="p-6 space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2 mb-2">9. Terms and Conditions</h3>

                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="text-gray-700 whitespace-pre-line">{tenderData.terms}</p>
                </div>

                <div className="mt-8">
                  <h4 className="font-medium mb-2">Declaration</h4>
                  <p className="text-gray-700">
                    By submitting a bid in response to this tender, the bidder acknowledges that they have read,
                    understood, and agree to abide by all the terms and conditions specified in this document.
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-medium">For {tenderData.company}</p>
                      <p className="text-gray-500 mt-8">Authorized Signatory</p>
                    </div>
                    <div>
                      <p className="font-medium">For Supplier</p>
                      <p className="text-gray-500 mt-8">Authorized Signatory</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* PDF Footer */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center text-sm">
                <span className="text-gray-500">3</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
