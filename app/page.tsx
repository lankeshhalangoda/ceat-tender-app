"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Copy, Download, Mail, MessageSquare, Printer, Send, CheckCircle2 } from "lucide-react"
import ContactList from "./components/contact-list"
import TenderPoster from "./components/tender-poster"
import TenderEmail from "./components/tender-email"
import TenderWhatsApp from "./components/tender-whatsapp"
import TenderPDFViewer from "./components/tender-pdf-viewer"
import Notification from "./components/notification"
import { captureElementAsImage, generatePDFFromElement } from "./components/file-generator"

export default function Home() {
  const [prompt, setPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [isGenerated, setIsGenerated] = useState(false)
  const [selectedContacts, setSelectedContacts] = useState<string[]>([])
  const [showSentConfirmation, setShowSentConfirmation] = useState(false)
  const [notification, setNotification] = useState<{
    message: string
    type: "success" | "error" | "info"
  } | null>(null)

  const [tenderData, setTenderData] = useState({
    title: "Supply of Office Chairs",
    id: "CEAT/2023/OFC-001",
    deadline: "2023-05-25",
    quantity: "200",
    company: "CEAT Ltd.",
    description:
      "CEAT invites sealed tenders from reputed manufacturers and suppliers for the supply of ergonomic office chairs for our corporate headquarters.",
    surveyLink: "https://ceat.com/survey/office-chairs",
    terms:
      "By submitting a bid, suppliers agree to CEAT's standard procurement terms and conditions. Late submissions will not be considered. CEAT reserves the right to accept or reject any bid without assigning any reason.",
  })

  const showNotification = (message: string, type: "success" | "error" | "info" = "success") => {
    setNotification({ message, type })
  }

  const handleGenerate = () => {
    if (!prompt.trim()) return

    setIsGenerating(true)

    // Simulate AI generation with a timeout
    setTimeout(() => {
      setIsGenerating(false)
      setIsGenerated(true)
      showNotification("Tender generated successfully!", "success")
    }, 1500)
  }

  const handleSendTender = () => {
    if (selectedContacts.length === 0) return

    setShowSentConfirmation(true)
    showNotification(`Tender sent successfully to ${selectedContacts.length} recipients!`, "success")

    // Hide confirmation after 3 seconds
    setTimeout(() => {
      setShowSentConfirmation(false)
      setSelectedContacts([])
    }, 3000)
  }

  // Update the handleDownload function to better handle the PDF generation
  const handleDownload = async (type: string) => {
    let dataUrl = ""
    let filename = ""
    let elementId = ""

    if (type === "digital-poster") {
      elementId = "digital-poster-content"
      filename = `${tenderData.company.replace(/\s+/g, "_")}_Digital_Poster.png`
    } else if (type === "print-poster") {
      elementId = "print-poster-content"
      filename = `${tenderData.company.replace(/\s+/g, "_")}_Print_Poster.png`
    } else if (type === "pdf") {
      elementId = "pdf-content"
      filename = `${tenderData.company.replace(/\s+/g, "_")}_Tender_${tenderData.title.replace(/\s+/g, "_")}.pdf`
    }

    setNotification({ message: "Preparing download...", type: "info" })

    try {
      if (type === "pdf") {
        dataUrl = await generatePDFFromElement(elementId, tenderData)
      } else {
        dataUrl = await captureElementAsImage(elementId)
      }

      if (!dataUrl) {
        throw new Error("Failed to generate file")
      }

      const link = document.createElement("a")
      link.href = dataUrl
      link.download = filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      showNotification(`${filename} downloaded successfully`, "success")
    } catch (error) {
      console.error("Download error:", error)
      showNotification("Failed to download file. Please try again.", "error")
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 py-4 px-6 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/images/ceat-logo.png" alt="CEAT Logo" className="h-10" />
            <h1 className="text-xl font-bold">Tender Generation</h1>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-4 md:p-6 grid grid-cols-1 gap-6 md:gap-8">
        {/* Section 1: Input */}
        <section className="bg-white rounded-lg shadow-sm p-4 md:p-6 transition-all duration-200 hover:shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Generate Tender</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="prompt" className="text-gray-700">
                Enter your prompt
              </Label>
              <Textarea
                id="prompt"
                placeholder="Create a tender poster for office chair supply..."
                className="min-h-[120px] mt-1.5 resize-y"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
            </div>

            {/* Tender Fields Card - Only show after generation */}
            {isGenerated && (
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 transition-all duration-300 animate-in fade-in-50">
                <h3 className="text-md font-medium mb-3 text-gray-800">Tender Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="tenderTitle" className="text-gray-700">
                      Tender Title
                    </Label>
                    <Input
                      id="tenderTitle"
                      value={tenderData.title}
                      className="mt-1"
                      onChange={(e) => setTenderData((prev) => ({ ...prev, title: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="tenderId" className="text-gray-700">
                      Tender ID
                    </Label>
                    <Input
                      id="tenderId"
                      value={tenderData.id}
                      className="mt-1"
                      onChange={(e) => setTenderData((prev) => ({ ...prev, id: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="deadline" className="text-gray-700">
                      Deadline
                    </Label>
                    <Input
                      id="deadline"
                      type="date"
                      value={tenderData.deadline}
                      className="mt-1"
                      onChange={(e) => setTenderData((prev) => ({ ...prev, deadline: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="quantity" className="text-gray-700">
                      Quantity
                    </Label>
                    <Input
                      id="quantity"
                      type="number"
                      value={tenderData.quantity}
                      className="mt-1"
                      onChange={(e) => setTenderData((prev) => ({ ...prev, quantity: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="company" className="text-gray-700">
                      Company Name
                    </Label>
                    <Input
                      id="company"
                      value={tenderData.company}
                      className="mt-1"
                      onChange={(e) => setTenderData((prev) => ({ ...prev, company: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="surveyLink" className="text-gray-700">
                      Survey Link
                    </Label>
                    <Input
                      id="surveyLink"
                      value={tenderData.surveyLink}
                      className="mt-1"
                      onChange={(e) => setTenderData((prev) => ({ ...prev, surveyLink: e.target.value }))}
                    />
                  </div>
                  <div className="col-span-1 md:col-span-2">
                    <Label htmlFor="description" className="text-gray-700">
                      Tender Description
                    </Label>
                    <Textarea
                      id="description"
                      value={tenderData.description}
                      className="min-h-[80px] mt-1"
                      onChange={(e) => setTenderData((prev) => ({ ...prev, description: e.target.value }))}
                    />
                  </div>
                  <div className="col-span-1 md:col-span-2">
                    <Label htmlFor="terms" className="text-gray-700">
                      Terms and Conditions
                    </Label>
                    <Textarea
                      id="terms"
                      value={tenderData.terms}
                      className="min-h-[80px] text-sm mt-1"
                      onChange={(e) => setTenderData((prev) => ({ ...prev, terms: e.target.value }))}
                    />
                  </div>
                </div>
              </div>
            )}

            <Button
              onClick={handleGenerate}
              disabled={!prompt.trim() || isGenerating}
              className="w-full md:w-auto transition-all duration-200 hover:shadow-md"
            >
              {isGenerating ? "Generating..." : "Generate Tender"}
            </Button>
          </div>
        </section>

        {/* Section 2: Output */}
        {isGenerated && (
          <section className="bg-white rounded-lg shadow-sm p-4 md:p-6 transition-all duration-200 hover:shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Tender Output</h2>
            <Tabs defaultValue="digital-poster">
              <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-6">
                <TabsTrigger value="digital-poster">Digital Poster</TabsTrigger>
                <TabsTrigger value="print-poster">Print Poster</TabsTrigger>
                <TabsTrigger value="pdf">PDF</TabsTrigger>
                <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
                <TabsTrigger value="email">Email</TabsTrigger>
              </TabsList>

              <TabsContent value="digital-poster" className="space-y-4">
                <div className="flex justify-end gap-2 action-buttons">
                  <Button variant="outline" size="sm" onClick={() => handleDownload("digital-poster")}>
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      // In a real app, this would copy the poster image
                      showNotification("Poster copied to clipboard", "success")
                    }}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                </div>
                <div id="digital-poster-content">
                  <TenderPoster type="digital" tenderData={tenderData} />
                </div>
              </TabsContent>

              <TabsContent value="print-poster" className="space-y-4">
                <div className="flex justify-end gap-2 action-buttons">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      window.print()
                      showNotification("Print dialog opened", "info")
                    }}
                  >
                    <Printer className="h-4 w-4 mr-2" />
                    Print
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDownload("print-poster")}>
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
                <div id="print-poster-content">
                  <TenderPoster type="print" tenderData={tenderData} />
                </div>
              </TabsContent>

              <TabsContent value="pdf" className="space-y-4">
                <TenderPDFViewer tenderData={tenderData} onDownload={() => handleDownload("pdf")} />
              </TabsContent>

              <TabsContent value="whatsapp" className="space-y-4">
                <TenderWhatsApp tenderData={tenderData} />

                {/* Distribution section for WhatsApp */}
                <div className="mt-8 border-t pt-6">
                  <h3 className="text-lg font-medium mb-4 text-gray-800">Distribute via WhatsApp</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-md font-medium mb-3 text-gray-700">Select Recipients</h4>
                      <ContactList selectedContacts={selectedContacts} setSelectedContacts={setSelectedContacts} />
                    </div>

                    <div>
                      <h4 className="text-md font-medium mb-3 text-gray-700">Send Options</h4>
                      <Card className="border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
                        <CardContent className="pt-6">
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <p className="text-sm font-medium text-gray-700">Attachments</p>
                              <div className="space-y-2">
                                <div className="flex items-center space-x-2">
                                  <Checkbox id="attach-pdf-whatsapp" defaultChecked />
                                  <Label htmlFor="attach-pdf-whatsapp" className="text-gray-600">
                                    Tender PDF
                                  </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Checkbox id="include-survey-link" defaultChecked />
                                  <Label htmlFor="include-survey-link" className="text-gray-600">
                                    Include Survey Link
                                  </Label>
                                </div>
                              </div>
                            </div>

                            <div className="flex flex-wrap gap-2">
                              <Button
                                variant="outline"
                                onClick={() => {
                                  const whatsappText =
                                    `🔔 ${tenderData.company.toUpperCase()} TENDER NOTICE\n\n` +
                                    `📝 Reference: ${tenderData.id}\n` +
                                    `🪑 For: ${tenderData.title}\n` +
                                    `📦 Quantity: ${tenderData.quantity} units\n` +
                                    `📅 Last Date: ${new Date(tenderData.deadline).toLocaleDateString()}\n\n` +
                                    `${tenderData.description}\n\n` +
                                    `Survey Link: ${tenderData.surveyLink}`

                                  navigator.clipboard.writeText(whatsappText)
                                  showNotification("WhatsApp message copied to clipboard", "success")
                                }}
                              >
                                <Copy className="h-4 w-4 mr-2" />
                                Copy Message
                              </Button>
                              <Button
                                onClick={() => {
                                  const text = encodeURIComponent(
                                    `🔔 ${tenderData.company.toUpperCase()} TENDER NOTICE\n\n` +
                                      `📝 Reference: ${tenderData.id}\n` +
                                      `🪑 For: ${tenderData.title}\n` +
                                      `📦 Quantity: ${tenderData.quantity} units\n` +
                                      `📅 Last Date: ${new Date(tenderData.deadline).toLocaleDateString()}\n\n` +
                                      `${tenderData.description}\n\n` +
                                      `Survey Link: ${tenderData.surveyLink}`,
                                  )
                                  window.open(`https://wa.me/?text=${text}`, "_blank")
                                  showNotification("Opening WhatsApp with pre-filled message", "info")
                                }}
                              >
                                <MessageSquare className="h-4 w-4 mr-2" />
                                Send via WhatsApp
                              </Button>
                            </div>

                            {selectedContacts.length > 0 && (
                              <Button
                                className="w-full"
                                onClick={() => {
                                  showNotification(
                                    `WhatsApp message sent to ${selectedContacts.length} recipients`,
                                    "success",
                                  )
                                  setSelectedContacts([])
                                }}
                              >
                                <Send className="h-4 w-4 mr-2" />
                                Send to {selectedContacts.length} Recipients
                              </Button>
                            )}

                            {showSentConfirmation && (
                              <div className="bg-green-50 text-green-700 p-3 rounded-md flex items-center">
                                <CheckCircle2 className="h-5 w-5 mr-2" />
                                Message sent successfully to {selectedContacts.length} recipients!
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="email" className="space-y-4">
                <TenderEmail tenderData={tenderData} />

                {/* Distribution section for Email */}
                <div className="mt-8 border-t pt-6">
                  <h3 className="text-lg font-medium mb-4 text-gray-800">Distribute via Email</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-md font-medium mb-3 text-gray-700">Select Recipients</h4>
                      <ContactList selectedContacts={selectedContacts} setSelectedContacts={setSelectedContacts} />
                    </div>

                    <div>
                      <h4 className="text-md font-medium mb-3 text-gray-700">Send Options</h4>
                      <Card className="border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
                        <CardContent className="pt-6">
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="subject" className="text-gray-700">
                                Email Subject
                              </Label>
                              <Input
                                id="subject"
                                defaultValue={`${tenderData.company} Tender: ${tenderData.title}`}
                                className="mt-1"
                              />
                            </div>

                            <div className="space-y-2">
                              <p className="text-sm font-medium text-gray-700">Attachments</p>
                              <div className="space-y-2">
                                <div className="flex items-center space-x-2">
                                  <Checkbox id="attach-poster-email" defaultChecked />
                                  <Label htmlFor="attach-poster-email" className="text-gray-600">
                                    Tender Poster
                                  </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Checkbox id="attach-pdf-email" defaultChecked />
                                  <Label htmlFor="attach-pdf-email" className="text-gray-600">
                                    Tender PDF
                                  </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Checkbox id="attach-qr-email" defaultChecked />
                                  <Label htmlFor="attach-qr-email" className="text-gray-600">
                                    QR Code
                                  </Label>
                                </div>
                              </div>
                            </div>

                            <div className="flex flex-wrap gap-2">
                              <Button
                                variant="outline"
                                onClick={() => {
                                  navigator.clipboard.writeText(
                                    `Subject: ${tenderData.company} Tender: ${tenderData.title}\n\n` +
                                      `Dear Supplier,\n\n` +
                                      `${tenderData.company} is pleased to invite you to participate in our tender for the ${tenderData.title}.\n\n` +
                                      `Tender Details:\n` +
                                      `- Reference: ${tenderData.id}\n` +
                                      `- Last Date: ${new Date(tenderData.deadline).toLocaleDateString()}\n` +
                                      `- Quantity: ${tenderData.quantity} units\n\n` +
                                      `${tenderData.description}\n\n` +
                                      `Survey Link: ${tenderData.surveyLink}\n\n` +
                                      `Best Regards,\n` +
                                      `Procurement Team\n` +
                                      `${tenderData.company}`,
                                  )
                                  showNotification("Email text copied to clipboard", "success")
                                }}
                              >
                                <Copy className="h-4 w-4 mr-2" />
                                Copy Text
                              </Button>
                              <Button
                                variant="outline"
                                onClick={() => {
                                  const subject = encodeURIComponent(
                                    `${tenderData.company} Tender: ${tenderData.title}`,
                                  )
                                  const body = encodeURIComponent(
                                    `Dear Supplier,\n\n` +
                                      `${tenderData.company} is pleased to invite you to participate in our tender for the ${tenderData.title}.\n\n` +
                                      `Tender Details:\n` +
                                      `- Reference: ${tenderData.id}\n` +
                                      `- Last Date: ${new Date(tenderData.deadline).toLocaleDateString()}\n` +
                                      `- Quantity: ${tenderData.quantity} units\n\n` +
                                      `${tenderData.description}\n\n` +
                                      `Survey Link: ${tenderData.surveyLink}\n\n` +
                                      `Best Regards,\n` +
                                      `Procurement Team\n` +
                                      `${tenderData.company}`,
                                  )
                                  window.location.href = `mailto:?subject=${subject}&body=${body}`
                                  showNotification("Opening email client", "info")
                                }}
                              >
                                <Mail className="h-4 w-4 mr-2" />
                                Copy Email
                              </Button>
                            </div>

                            <div className="space-y-2">
                              <p className="text-sm font-medium text-gray-700">Send Method</p>
                              <div className="flex flex-wrap gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="flex items-center"
                                  onClick={() => {
                                    if (selectedContacts.length > 0) {
                                      showNotification(
                                        `Email will be sent individually to ${selectedContacts.length} recipients`,
                                        "info",
                                      )
                                    } else {
                                      showNotification("Please select at least one recipient", "error")
                                    }
                                  }}
                                >
                                  <Mail className="h-4 w-4 mr-2" />
                                  Individual Emails
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="flex items-center"
                                  onClick={() => {
                                    if (selectedContacts.length > 0) {
                                      showNotification(
                                        `Email will be sent as BCC to ${selectedContacts.length} recipients`,
                                        "info",
                                      )
                                    } else {
                                      showNotification("Please select at least one recipient", "error")
                                    }
                                  }}
                                >
                                  <Mail className="h-4 w-4 mr-2" />
                                  Bulk Email
                                </Button>
                              </div>
                            </div>

                            {selectedContacts.length > 0 && (
                              <Button onClick={handleSendTender} className="w-full">
                                <Send className="h-4 w-4 mr-2" />
                                Send to {selectedContacts.length} Recipients
                              </Button>
                            )}

                            {showSentConfirmation && (
                              <div className="bg-green-50 text-green-700 p-3 rounded-md flex items-center">
                                <CheckCircle2 className="h-5 w-5 mr-2" />
                                Email sent successfully to {selectedContacts.length} recipients!
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </section>
        )}
      </div>

      {/* Custom Notification */}
      {notification && (
        <Notification message={notification.message} type={notification.type} onClose={() => setNotification(null)} />
      )}
    </main>
  )
}
