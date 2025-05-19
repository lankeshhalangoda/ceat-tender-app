"use client"

import QRCode from "./qr-code"
import { MessageSquare, Copy, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"

interface TenderData {
  title: string
  id: string
  deadline: string
  quantity: string
  company: string
  description: string
  surveyLink: string
}

interface TenderWhatsAppProps {
  tenderData: TenderData
}

export default function TenderWhatsApp({ tenderData }: TenderWhatsAppProps) {
  const [copied, setCopied] = useState(false)

  const whatsappText = `🔔 *${tenderData.company.toUpperCase()} TENDER NOTICE*\n\n📝 *Reference:* ${tenderData.id}\n🪑 *For:* ${tenderData.title}\n📦 *Quantity:* ${tenderData.quantity} units\n📅 *Last Date:* ${new Date(tenderData.deadline).toLocaleDateString()}\n\n${tenderData.description}\n\n*Key Requirements:*\n✓ Ergonomic design with lumbar support\n✓ Adjustable height and armrests\n✓ High-quality breathable mesh\n✓ Min. 2-year warranty\n\n*Survey Link:* ${tenderData.surveyLink}\n\nPlease contact our procurement team for any queries at procurement@ceat.com`

  const handleCopyText = () => {
    navigator.clipboard.writeText(whatsappText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleOpenWhatsApp = () => {
    const encodedText = encodeURIComponent(whatsappText)
    window.open(`https://wa.me/?text=${encodedText}`, "_blank")
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="bg-gray-100 p-3 border-b flex items-center justify-between">
        <div className="flex items-center">
          <MessageSquare className="h-5 w-5 mr-2 text-green-600" />
          <span className="font-medium">WhatsApp Template</span>
        </div>
      </div>

      <div className="p-6 bg-gray-50">
        <div className="border rounded-lg bg-[#e0ffd7] shadow-sm overflow-hidden max-w-md mx-auto">
          {/* WhatsApp Preview */}
          <div className="p-4 space-y-3 font-sans">
            <p className="font-bold">🔔 {tenderData.company.toUpperCase()} TENDER NOTICE</p>

            <p>
              📝 Reference: {tenderData.id}
              <br />🪑 For: {tenderData.title}
              <br />📦 Quantity: {tenderData.quantity} units
              <br />📅 Last Date: {new Date(tenderData.deadline).toLocaleDateString()}
            </p>

            <p>{tenderData.description}</p>

            <p>
              <b>Key Requirements:</b>
              <br />✓ Ergonomic design with lumbar support
              <br />✓ Adjustable height and armrests
              <br />✓ High-quality breathable mesh
              <br />✓ Min. 2-year warranty
            </p>

            <p>
              Survey Link: {tenderData.surveyLink}
              <br />
            </p>

            <div className="flex justify-center p-2">
              <QRCode size={150} surveyLink={tenderData.surveyLink} />
            </div>

            <p className="text-xs text-gray-600 mt-2">
              Please contact our procurement team for any queries at procurement@ceat.com
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Copyable WhatsApp Message</label>
            <Textarea value={whatsappText} className="font-mono text-sm h-48" readOnly />
          </div>

          <div className="flex justify-center gap-3">
            <Button onClick={handleCopyText} className="flex items-center">
              {copied ? <CheckCircle2 className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
              {copied ? "Copied!" : "Copy Text"}
            </Button>
            <Button variant="outline" onClick={handleOpenWhatsApp}>
              <MessageSquare className="h-4 w-4 mr-2" />
              Open in WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
