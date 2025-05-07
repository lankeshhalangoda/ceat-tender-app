"use client"

import { MessageSquare } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"

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

interface TenderWhatsAppProps {
  tenderData: TenderData
}

export default function TenderWhatsApp({ tenderData }: TenderWhatsAppProps) {
  const whatsappText = `🔔 ${tenderData.company.toUpperCase()} TENDER NOTICE

📝 Reference: ${tenderData.id}
🪑 For: ${tenderData.title}
📦 Quantity: ${tenderData.quantity} units
📅 Last Date: ${new Date(tenderData.deadline).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}

${tenderData.description}

Requirements:
• Ergonomic design with lumbar support
• Adjustable height and armrests
• High-quality breathable mesh
• Min. 2-year warranty

To apply, visit our survey link: ${tenderData.surveyLink}

For queries:
📧 procurement@ceat.com
📞 +91-22-12345678

${tenderData.terms}`

  const handleCopyText = () => {
    navigator.clipboard
      .writeText(whatsappText)
      .then(() => alert("WhatsApp message copied to clipboard"))
      .catch((err) => console.error("Failed to copy text: ", err))
  }

  const handleSendWhatsApp = () => {
    const encodedText = encodeURIComponent(whatsappText)
    window.open(`https://wa.me/?text=${encodedText}`, "_blank")
    alert("Opening WhatsApp with pre-filled message")
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <div className="h-8 w-8 bg-green-500 rounded-full flex items-center justify-center text-white mr-3">
              <MessageSquare className="h-4 w-4" />
            </div>
            <div>
              <div className="font-medium">WhatsApp Message Format</div>
              <div className="text-xs text-gray-500">Plain text with emoji</div>
            </div>
          </div>
        </div>

        <Textarea className="min-h-[300px] font-mono text-sm mb-4" value={whatsappText} readOnly />

        <div className="text-sm text-gray-600 mb-4">
          <p>
            This plain text message can be copied and sent via WhatsApp. The PDF and survey link will be included as
            attachments.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
