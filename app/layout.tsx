import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
  title: "CEAT Tender Generation",
  description: "AI-powered tender generation application for CEAT",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-poppins">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}

          {/* Application-wide footer */}
          <footer className="bg-white border-t py-4 mt-12">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
              <div className="flex justify-center items-center">
                <span className="text-sm text-gray-500 mr-2">Powered by</span>
                <img src="/images/emojot-logo.png" alt="Emojot Logo" className="h-6" />
              </div>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  )
}
