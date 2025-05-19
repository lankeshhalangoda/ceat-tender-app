"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Copy, Download, Mail, MessageSquare, Send, CheckCircle2, Save, RefreshCw, Check, Sparkles } from "lucide-react"
import ContactList from "./components/contact-list"
import TenderPoster from "./components/tender-poster"
import TenderEmail from "./components/tender-email"
import TenderWhatsApp from "./components/tender-whatsapp"
import TenderPDFViewer from "./components/tender-pdf-viewer"
import Notification from "./components/notification"
import InstructionModal from "./components/instruction-modal"
import AppDescription from "./components/app-description"
import { captureElementAsImage, generatePDFFromElement } from "./components/file-generator"

// Sample evaluation criteria texts for regeneration
const evaluationCriteriaSamples = [
  "Bids will be evaluated based on a comprehensive scoring system that considers technical compliance (40%), competitive pricing (30%), delivery timeline (15%), and warranty & after-sales service (15%). Suppliers must meet all mandatory requirements specified in the tender document. The evaluation committee will assess each bid against these criteria to ensure the best value for money while maintaining quality standards.",

  "The evaluation process will follow a two-stage approach: technical evaluation (60%) and financial evaluation (40%). Technical evaluation will assess product quality, specifications compliance, supplier experience, and after-sales support. Financial evaluation will consider the total cost of ownership including purchase price, maintenance costs, and operational expenses over a 5-year period.",

  "Evaluation will be conducted using a points-based system with the following weightings: Product Quality (30%), Price Competitiveness (25%), Delivery Schedule (15%), Technical Support (15%), Company Experience (10%), and Environmental Sustainability (5%). A minimum score of 70% in the technical evaluation is required to proceed to the financial evaluation stage.",

  "Our evaluation methodology employs a balanced scorecard approach with equal emphasis on four key areas: Technical Specifications (25%), Commercial Terms (25%), Supplier Reliability (25%), and Value-Added Services (25%). This ensures a holistic assessment that balances immediate cost considerations with long-term value and partnership potential.",
]

// Sample terms and conditions texts
const termsAndConditionsSamples = [
  "By submitting a bid, suppliers agree to CEAT's standard procurement terms and conditions. Late submissions will not be considered. CEAT reserves the right to accept or reject any bid without assigning any reason.",

  "All submissions must comply with the tender specifications. CEAT reserves the right to negotiate terms with shortlisted suppliers, request additional information, or cancel the tender process at any stage without liability. Payment terms are net 60 days after delivery and acceptance.",

  "Suppliers must acknowledge that all intellectual property rights in the specifications remain with CEAT. Confidentiality of tender information must be maintained. CEAT may award the contract in whole or in parts to different suppliers based on best value determination.",

  "The successful bidder will be required to provide a performance guarantee of 5% of the contract value. Liquidated damages for delayed delivery will be applied at 0.5% per week up to a maximum of 10% of the contract value. Force majeure clauses apply as per standard industry practice.",
]

const vendorTypes = [
  "Raw Material and Component Suppliers",
  "Machinery and Equipment Vendors",
  "Manpower and Service Providers",
  "Logistics and Distribution Partners",
  "Dealers and Retail Partners",
  "Specialty Tyre Vendors",
]

export default function Home() {
  const [prompt, setPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [isGenerated, setIsGenerated] = useState(false)
  const [selectedContacts, setSelectedContacts] = useState<string[]>([])
  const [selectedVendorTypes, setSelectedVendorTypes] = useState<string[]>([])
  const [showSentConfirmation, setShowSentConfirmation] = useState(false)
  const [notification, setNotification] = useState<{
    message: string
    type: "success" | "error" | "info"
  } | null>(null)

  // State for tender details
  const [tenderDetails, setTenderDetails] = useState({
    title: "Supply of Office Chairs",
    id: "CEAT/2023/OFC-001",
    deadline: "2023-05-25",
    quantity: "200",
    company: "CEAT Ltd.",
    description:
      "CEAT invites sealed tenders from reputed manufacturers and suppliers for the supply of ergonomic office chairs for our corporate headquarters.",
  })

  // State for evaluation criteria with editing capability
  const [evaluationCriteria, setEvaluationCriteria] = useState(evaluationCriteriaSamples[0])
  const [editableEvaluationCriteria, setEditableEvaluationCriteria] = useState(evaluationCriteriaSamples[0])
  const [showEvaluationSaved, setShowEvaluationSaved] = useState(false)

  // State for terms and conditions with editing capability
  const [termsAndConditions, setTermsAndConditions] = useState(termsAndConditionsSamples[0])
  const [editableTermsAndConditions, setEditableTermsAndConditions] = useState(termsAndConditionsSamples[0])
  const [showTermsSaved, setShowTermsSaved] = useState(false)

  // Combined tender data for components
  const tenderData = {
    ...tenderDetails,
    evaluationCriteria,
    terms: termsAndConditions,
    surveyLink: "https://emojot.com/ceat",
  }

  const showNotification = (message: string, type: "success" | "error" | "info" = "success") => {
    setNotification({ message, type })
  }

  const handleSaveTenderDetails = () => {
    showNotification("Tender details saved successfully", "success")
  }

  const handleSaveEvaluationCriteria = () => {
    setEvaluationCriteria(editableEvaluationCriteria)
    setShowEvaluationSaved(true)
    showNotification("Evaluation criteria saved successfully", "success")

    // Hide the success indicator after 2 seconds
    setTimeout(() => {
      setShowEvaluationSaved(false)
    }, 2000)
  }

  const handleRegenerateEvaluationCriteria = () => {
    // Get a random evaluation criteria text that's different from the current one
    let newIndex
    do {
      newIndex = Math.floor(Math.random() * evaluationCriteriaSamples.length)
    } while (evaluationCriteriaSamples[newIndex] === editableEvaluationCriteria && evaluationCriteriaSamples.length > 1)

    const newCriteria = evaluationCriteriaSamples[newIndex]
    setEditableEvaluationCriteria(newCriteria)
    showNotification("Evaluation criteria regenerated", "info")
  }

  const handleSaveTermsAndConditions = () => {
    setTermsAndConditions(editableTermsAndConditions)
    setShowTermsSaved(true)
    showNotification("Terms and conditions saved successfully", "success")

    // Hide the success indicator after 2 seconds
    setTimeout(() => {
      setShowTermsSaved(false)
    }, 2000)
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

  const handleRegenerateTender = () => {
    if (!prompt.trim()) return

    setIsGenerating(true)
    showNotification("Regenerating tender...", "info")

    // Simulate AI regeneration with a timeout
    setTimeout(() => {
      setIsGenerating(false)

      // Simulate getting new content by changing some values
      setTenderDetails((prev) => ({
        ...prev,
        id: `CEAT/2023/OFC-${Math.floor(Math.random() * 999)
          .toString()
          .padStart(3, "0")}`,
      }))

      // Get a random evaluation criteria
      const evalIndex = Math.floor(Math.random() * evaluationCriteriaSamples.length)
      setEvaluationCriteria(evaluationCriteriaSamples[evalIndex])
      setEditableEvaluationCriteria(evaluationCriteriaSamples[evalIndex])

      // Get a random terms and conditions
      const termsIndex = Math.floor(Math.random() * termsAndConditionsSamples.length)
      setTermsAndConditions(termsAndConditionsSamples[termsIndex])
      setEditableTermsAndConditions(termsAndConditionsSamples[termsIndex])

      showNotification("Tender regenerated successfully!", "success")
    }, 1500)
  }

  const handleToggleVendorType = (type: string) => {
    setSelectedVendorTypes((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]))
  }

  const handleSendTender = () => {
    if (selectedContacts.length === 0) {
      showNotification("Please select at least one recipient", "error")
      return
    }

    setShowSentConfirmation(true)

    const recipientCount = selectedContacts.length
    const vendorTypeInfo = selectedVendorTypes.length > 0 ? ` (${selectedVendorTypes.length} vendor types)` : ""

    showNotification(`Tender sent successfully to ${recipientCount} recipients${vendorTypeInfo}!`, "success")

    // Hide confirmation after 3 seconds
    setTimeout(() => {
      setShowSentConfirmation(false)
      setSelectedContacts([])
      setSelectedVendorTypes([])
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
    <main className="min-h-screen bg-gray-50 pb-16">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 py-4 px-6 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/images/ceat-logo.png" alt="CEAT Logo" className="h-10" />
            <h1 className="text-xl font-bold">Tender Generation</h1>
          </div>
          <InstructionModal />
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-4 md:p-6">
        {/* App Description */}
        <AppDescription />

        <div className="grid grid-cols-1 gap-6 md:gap-8">
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

              <Button
                onClick={handleGenerate}
                disabled={!prompt.trim() || isGenerating}
                className="w-full md:w-auto transition-all duration-200 hover:shadow-md"
              >
                {isGenerating ? "Generating..." : "Generate Tender"}
              </Button>
            </div>
          </section>

          {/* Tender Details Section - Only show after generation */}
          {isGenerated && (
            <Card className="transition-all duration-300 animate-in fade-in-50">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg font-medium text-gray-800">Tender Details</CardTitle>
                  <Button variant="outline" size="sm" onClick={handleSaveTenderDetails} className="h-8">
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="tenderTitle" className="text-gray-700">
                      Tender Title
                    </Label>
                    <Input
                      id="tenderTitle"
                      value={tenderDetails.title}
                      className="mt-1"
                      onChange={(e) => setTenderDetails((prev) => ({ ...prev, title: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="tenderId" className="text-gray-700">
                      Tender ID
                    </Label>
                    <Input
                      id="tenderId"
                      value={tenderDetails.id}
                      className="mt-1"
                      onChange={(e) => setTenderDetails((prev) => ({ ...prev, id: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="deadline" className="text-gray-700">
                      Deadline
                    </Label>
                    <Input
                      id="deadline"
                      type="date"
                      value={tenderDetails.deadline}
                      className="mt-1"
                      onChange={(e) => setTenderDetails((prev) => ({ ...prev, deadline: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="quantity" className="text-gray-700">
                      Quantity
                    </Label>
                    <Input
                      id="quantity"
                      type="number"
                      value={tenderDetails.quantity}
                      className="mt-1"
                      onChange={(e) => setTenderDetails((prev) => ({ ...prev, quantity: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="company" className="text-gray-700">
                      Company Name
                    </Label>
                    <Input
                      id="company"
                      value={tenderDetails.company}
                      className="mt-1"
                      onChange={(e) => setTenderDetails((prev) => ({ ...prev, company: e.target.value }))}
                    />
                  </div>
                  <div className="col-span-1 md:col-span-2">
                    <Label htmlFor="description" className="text-gray-700">
                      Tender Description
                    </Label>
                    <Textarea
                      id="description"
                      value={tenderDetails.description}
                      className="min-h-[80px] mt-1"
                      onChange={(e) => setTenderDetails((prev) => ({ ...prev, description: e.target.value }))}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Evaluation Criteria Section - Only show after generation */}
          {isGenerated && (
            <Card className="transition-all duration-300 animate-in fade-in-50">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg font-medium text-gray-800">Evaluation Criteria</CardTitle>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={handleRegenerateEvaluationCriteria} className="h-8">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Regenerate
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleSaveEvaluationCriteria} className="h-8">
                      {showEvaluationSaved ? (
                        <Check className="h-4 w-4 mr-2 text-green-500" />
                      ) : (
                        <Save className="h-4 w-4 mr-2" />
                      )}
                      Save
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Display current saved evaluation criteria */}
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="text-gray-700 text-sm whitespace-pre-line">{evaluationCriteria}</p>
                </div>

                {/* Editable evaluation criteria */}
                <div>
                  <Label htmlFor="evaluationCriteria" className="text-gray-700">
                    Edit Evaluation Criteria
                  </Label>
                  <Textarea
                    id="evaluationCriteria"
                    value={editableEvaluationCriteria}
                    className="min-h-[120px] mt-1 border-gray-300"
                    onChange={(e) => setEditableEvaluationCriteria(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Terms and Conditions Section - Only show after generation */}
          {isGenerated && (
            <Card className="transition-all duration-300 animate-in fade-in-50">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg font-medium text-gray-800">Terms and Conditions</CardTitle>
                  <Button variant="outline" size="sm" onClick={handleSaveTermsAndConditions} className="h-8">
                    {showTermsSaved ? (
                      <Check className="h-4 w-4 mr-2 text-green-500" />
                    ) : (
                      <Save className="h-4 w-4 mr-2" />
                    )}
                    Save
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Display current saved terms and conditions */}
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="text-gray-700 text-sm whitespace-pre-line">{termsAndConditions}</p>
                </div>

                {/* Editable terms and conditions */}
                <div>
                  <Label htmlFor="termsAndConditions" className="text-gray-700">
                    Edit Terms and Conditions
                  </Label>
                  <Textarea
                    id="termsAndConditions"
                    value={editableTermsAndConditions}
                    className="min-h-[120px] mt-1 border-gray-300"
                    onChange={(e) => setEditableTermsAndConditions(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Regenerate Tender Button - Only show after generation */}
          {isGenerated && (
            <div className="flex justify-center">
              <Button
                onClick={handleRegenerateTender}
                disabled={!prompt.trim() || isGenerating}
                className="transition-all duration-200 hover:shadow-md"
                variant="outline"
                size="lg"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                {isGenerating ? "Regenerating..." : "Regenerate Tender"}
              </Button>
            </div>
          )}

          {/* Section 2: Output */}
          {isGenerated && (
            <section className="bg-white rounded-lg shadow-sm p-4 md:p-6 transition-all duration-200 hover:shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Tender Output</h2>
              <Tabs defaultValue="digital-poster">
                <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-6">
                  <TabsTrigger value="digital-poster">Image</TabsTrigger>
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

                  {/* Distribution section for Email - Simplified */}
                  <div className="mt-8 border-t pt-6">
                    <h3 className="text-lg font-medium mb-4 text-gray-800">Distribute via Email</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Left column: Vendor Types and Recipients */}
                      <div className="space-y-6">
                        {/* Vendor Types */}
                        <div>
                          <h4 className="text-md font-medium mb-3 text-gray-700">Select Vendor Type</h4>
                          <div className="border rounded-md p-3 space-y-2 max-h-[200px] overflow-y-auto">
                            {vendorTypes.map((type, index) => (
                              <div key={index} className="flex items-center space-x-2">
                                <Checkbox
                                  id={`vendor-type-${index}`}
                                  checked={selectedVendorTypes.includes(type)}
                                  onCheckedChange={() => handleToggleVendorType(type)}
                                />
                                <Label htmlFor={`vendor-type-${index}`} className="text-gray-600">
                                  {type}
                                </Label>
                              </div>
                            ))}
                          </div>
                          {selectedVendorTypes.length > 0 && (
                            <p className="text-sm text-blue-600 mt-2">
                              {selectedVendorTypes.length} vendor types selected
                            </p>
                          )}
                        </div>

                        {/* Recipients */}
                        <div>
                          <h4 className="text-md font-medium mb-3 text-gray-700">Select Recipients</h4>
                          <ContactList selectedContacts={selectedContacts} setSelectedContacts={setSelectedContacts} />
                        </div>
                      </div>

                      {/* Right column: Email Options */}
                      <div>
                        <h4 className="text-md font-medium mb-3 text-gray-700">Email Options</h4>
                        <Card className="border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
                          <CardContent className="pt-6">
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label htmlFor="subject" className="text-gray-700">
                                  Email Subject
                                </Label>
                                <Input
                                  id="subject"
                                  defaultValue={`${tenderData.company} Tender: ${tenderData.title} - Ref: ${tenderData.id}`}
                                  className="mt-1"
                                />
                              </div>

                              <div className="space-y-2">
                                <p className="text-sm font-medium text-gray-700">Attachments</p>
                                <div className="grid grid-cols-2 gap-2">
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

                              <div className="space-y-2">
                                <p className="text-sm font-medium text-gray-700">Send Method</p>
                                <div className="flex flex-wrap gap-2">
                                  <Button variant="outline" size="sm" className="flex items-center">
                                    <Mail className="h-4 w-4 mr-2" />
                                    Individual Emails
                                  </Button>
                                  <Button variant="outline" size="sm" className="flex items-center">
                                    <Mail className="h-4 w-4 mr-2" />
                                    Bulk Email (BCC)
                                  </Button>
                                </div>
                              </div>

                              <Button
                                onClick={handleSendTender}
                                className="w-full"
                                disabled={selectedContacts.length === 0}
                              >
                                <Send className="h-4 w-4 mr-2" />
                                {selectedContacts.length > 0
                                  ? `Send to ${selectedContacts.length} Recipients`
                                  : "Select Recipients to Send"}
                              </Button>

                              {showSentConfirmation && (
                                <div className="bg-green-50 text-green-700 p-3 rounded-md flex items-center">
                                  <CheckCircle2 className="h-5 w-5 mr-2" />
                                  Email sent successfully to {selectedContacts.length} recipients
                                  {selectedVendorTypes.length > 0 && ` (${selectedVendorTypes.length} vendor types)`}!
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
      </div>

      {/* Custom Notification */}
      {notification && (
        <Notification message={notification.message} type={notification.type} onClose={() => setNotification(null)} />
      )}
    </main>
  )
}
