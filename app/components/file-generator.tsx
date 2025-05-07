// This component handles file generation for downloads
import html2canvas from "html2canvas"
import { jsPDF } from "jspdf"

// Function to capture an element as an image with improved QR code handling
export async function captureElementAsImage(elementId: string): Promise<string> {
  const element = document.getElementById(elementId)
  if (!element) return ""

  try {
    // Hide any buttons or controls that shouldn't be in the image
    const actionButtons = element.querySelectorAll(".action-buttons, .download-button")
    actionButtons.forEach((btn) => ((btn as HTMLElement).style.display = "none"))

    // Wait for a moment to ensure everything is rendered
    await new Promise((resolve) => setTimeout(resolve, 500))

    const canvas = await html2canvas(element, {
      scale: 2, // Higher scale for better quality
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#ffffff",
      logging: false,
      removeContainer: false,
      imageTimeout: 15000, // Longer timeout for images
      onclone: (clonedDoc) => {
        // Additional cleanup on the cloned document
        const clonedElement = clonedDoc.getElementById(elementId)
        if (clonedElement) {
          const clonedButtons = clonedElement.querySelectorAll(".action-buttons, .download-button")
          clonedButtons.forEach((btn) => ((btn as HTMLElement).style.display = "none"))
        }
      },
    })

    // Restore visibility
    actionButtons.forEach((btn) => ((btn as HTMLElement).style.display = ""))

    return canvas.toDataURL("image/png")
  } catch (error) {
    console.error("Error capturing element:", error)
    return ""
  }
}

// Function to generate PDF from elements - completely revised to match viewer exactly
export async function generatePDFFromElement(elementId: string, tenderData: any): Promise<string> {
  try {
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    })

    // Get all pages
    const pages = document.querySelectorAll(`#${elementId} > div > div`)

    if (pages.length === 0) {
      throw new Error("No pages found")
    }

    // Process each page
    for (let i = 0; i < pages.length; i++) {
      // Only add a new page after the first page
      if (i > 0) {
        pdf.addPage()
      }

      const page = pages[i] as HTMLElement

      // Hide any buttons or controls that shouldn't be in the PDF
      const actionButtons = page.querySelectorAll(".action-buttons, .download-button")
      actionButtons.forEach((btn) => ((btn as HTMLElement).style.display = "none"))

      // Wait for a moment to ensure everything is rendered
      await new Promise((resolve) => setTimeout(resolve, 300))

      // Capture the page
      const canvas = await html2canvas(page, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        logging: false,
        imageTimeout: 15000,
      })

      // Restore visibility
      actionButtons.forEach((btn) => ((btn as HTMLElement).style.display = ""))

      const imgData = canvas.toDataURL("image/png")

      // Calculate dimensions to fit the image properly on the PDF
      const imgWidth = 210 // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width

      // Add image to PDF
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight)

      // Add page number at the bottom center
      pdf.setFont("helvetica", "normal")
      pdf.setFontSize(10)
      pdf.setTextColor(100, 100, 100)
      pdf.text(`${i + 1}`, 105, 290, { align: "center" })
    }

    return pdf.output("datauristring")
  } catch (error) {
    console.error("Error generating PDF:", error)
    return ""
  }
}

// Legacy functions for fallback
export function generatePosterImage(tenderData: any, type: "digital" | "print"): string {
  // In a real app, this would generate an actual image
  // For demo purposes, we'll create a simple data URL
  const canvas = document.createElement("canvas")
  canvas.width = 800
  canvas.height = 1000
  const ctx = canvas.getContext("2d")

  if (!ctx) return ""

  // Set background
  if (type === "digital") {
    const gradient = ctx.createLinearGradient(0, 0, 0, 1000)
    gradient.addColorStop(0, "#EEF2FF")
    gradient.addColorStop(1, "#E0E7FF")
    ctx.fillStyle = gradient
  } else {
    ctx.fillStyle = "#FFFFFF"
  }
  ctx.fillRect(0, 0, 800, 1000)

  // Add border
  ctx.strokeStyle = "#E5E7EB"
  ctx.lineWidth = 2
  ctx.strokeRect(5, 5, 790, 990)

  // Add title
  ctx.fillStyle = "#111827"
  ctx.font = "bold 30px Arial"
  ctx.fillText("TENDER NOTICE", 50, 80)

  // Add tender title
  ctx.font = "bold 24px Arial"
  ctx.fillText(tenderData.title, 50, 150)

  // Add tender ID
  ctx.fillStyle = "#6B7280"
  ctx.font = "16px Arial"
  ctx.fillText(`Ref: ${tenderData.id}`, 50, 180)

  // Add description
  ctx.fillStyle = "#374151"
  ctx.font = "16px Arial"
  const words = tenderData.description.split(" ")
  let line = ""
  let y = 220
  for (let i = 0; i < words.length; i++) {
    const testLine = line + words[i] + " "
    const metrics = ctx.measureText(testLine)
    if (metrics.width > 700 && i > 0) {
      ctx.fillText(line, 50, y)
      line = words[i] + " "
      y += 25
    } else {
      line = testLine
    }
  }
  ctx.fillText(line, 50, y)

  // Add company name
  ctx.fillStyle = "#111827"
  ctx.font = "bold 18px Arial"
  ctx.fillText(tenderData.company, 50, 900)

  // Add survey link
  ctx.fillStyle = "#2563EB"
  ctx.font = "14px Arial"
  ctx.fillText(`Survey Link: ${tenderData.surveyLink}`, 50, 930)

  return canvas.toDataURL("image/png")
}

export function generatePDF(tenderData: any): string {
  // In a real app, this would generate an actual PDF
  // For demo purposes, we'll create a simple data URL with PDF content

  // This is a minimal PDF structure
  const pdfContent = `
%PDF-1.4
1 0 obj
<</Type /Catalog /Pages 2 0 R>>
endobj
2 0 obj
<</Type /Pages /Kids [3 0 R] /Count 1>>
endobj
3 0 obj
<</Type /Page /Parent 2 0 R /Resources 4 0 R /MediaBox [0 0 595 842] /Contents 6 0 R>>
endobj
4 0 obj
<</Font <</F1 5 0 R>>>>
endobj
5 0 obj
<</Type /Font /Subtype /Type1 /BaseFont /Helvetica>>
endobj
6 0 obj
<</Length 128>>
stream
BT
/F1 24 Tf
50 750 Td
(${tenderData.company} - Tender Document) Tj
/F1 16 Tf
0 -50 Td
(${tenderData.title}) Tj
0 -30 Td
(Ref: ${tenderData.id}) Tj
ET
endstream
endobj
xref
0 7
0000000000 65535 f
0000000009 00000 n
0000000056 00000 n
0000000111 00000 n
0000000212 00000 n
0000000250 00000 n
0000000317 00000 n
trailer
<</Size 7 /Root 1 0 R>>
startxref
494
%%EOF
  `.trim()

  // Convert to data URL
  const bytes = new TextEncoder().encode(pdfContent)
  let binary = ""
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return "data:application/pdf;base64," + btoa(binary)
}
