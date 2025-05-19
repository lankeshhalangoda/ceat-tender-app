"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HelpCircle, FileText, MessageSquare, Mail, ImageIcon, CheckCircle2 } from "lucide-react"

export default function InstructionModal() {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-1">
          <HelpCircle className="h-5 w-5" />
          <span className="hidden md:inline">How to Use</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">How to Use CEAT Tender Generator</DialogTitle>
          <DialogDescription>Follow these simple steps to generate and distribute tender documents</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="generate" className="mt-4">
          <TabsList className="grid grid-cols-5 mb-4">
            <TabsTrigger value="generate">1. Generate</TabsTrigger>
            <TabsTrigger value="customize">2. Customize</TabsTrigger>
            <TabsTrigger value="preview">3. Preview</TabsTrigger>
            <TabsTrigger value="distribute">4. Distribute</TabsTrigger>
            <TabsTrigger value="tips">Tips & Tricks</TabsTrigger>
          </TabsList>

          <TabsContent value="generate" className="space-y-4">
            <div className="border rounded-lg p-4 bg-blue-50">
              <h3 className="text-lg font-medium mb-2 text-blue-800">Step 1: Generate Your Tender</h3>
              <ol className="space-y-3 text-gray-700">
                <li className="flex gap-2">
                  <div className="bg-blue-100 text-blue-800 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 font-medium">
                    1
                  </div>
                  <div>
                    <p>
                      <strong>Enter a prompt</strong> in the text area describing the tender you want to create.
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Example: "Create a tender for 200 office chairs with ergonomic design and adjustable height"
                    </p>
                  </div>
                </li>
                <li className="flex gap-2">
                  <div className="bg-blue-100 text-blue-800 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 font-medium">
                    2
                  </div>
                  <div>
                    <p>
                      Click the <strong>Generate Tender</strong> button and wait for the AI to create your tender
                      document.
                    </p>
                  </div>
                </li>
                <li className="flex gap-2">
                  <div className="bg-blue-100 text-blue-800 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 font-medium">
                    3
                  </div>
                  <div>
                    <p>Once generated, you'll see additional sections appear for customizing your tender details.</p>
                  </div>
                </li>
              </ol>
              <div className="mt-4 bg-white p-3 rounded border">
                <p className="text-sm text-gray-600">
                  <strong>Pro Tip:</strong> Be specific in your prompt about quantity, specifications, and deadline to
                  get more accurate results.
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="customize" className="space-y-4">
            <div className="border rounded-lg p-4 bg-green-50">
              <h3 className="text-lg font-medium mb-2 text-green-800">Step 2: Customize Your Tender</h3>
              <ol className="space-y-3 text-gray-700">
                <li className="flex gap-2">
                  <div className="bg-green-100 text-green-800 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 font-medium">
                    1
                  </div>
                  <div>
                    <p>
                      Edit the <strong>Tender Details</strong> section to update title, ID, deadline, quantity, etc.
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Click "Save" after making changes to apply them to all output formats.
                    </p>
                  </div>
                </li>
                <li className="flex gap-2">
                  <div className="bg-green-100 text-green-800 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 font-medium">
                    2
                  </div>
                  <div>
                    <p>
                      Modify the <strong>Evaluation Criteria</strong> or click "Regenerate" for new suggestions.
                    </p>
                  </div>
                </li>
                <li className="flex gap-2">
                  <div className="bg-green-100 text-green-800 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 font-medium">
                    3
                  </div>
                  <div>
                    <p>
                      Review and edit the <strong>Terms and Conditions</strong> to match your company policies.
                    </p>
                  </div>
                </li>
                <li className="flex gap-2">
                  <div className="bg-green-100 text-green-800 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 font-medium">
                    4
                  </div>
                  <div>
                    <p>
                      If needed, click <strong>Regenerate Tender</strong> to create a completely new version.
                    </p>
                  </div>
                </li>
              </ol>
            </div>
          </TabsContent>

          <TabsContent value="preview" className="space-y-4">
            <div className="border rounded-lg p-4 bg-amber-50">
              <h3 className="text-lg font-medium mb-2 text-amber-800">Step 3: Preview Output Formats</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="bg-white p-1 rounded">
                      <ImageIcon className="h-5 w-5 text-amber-600" />
                    </div>
                    <h4 className="font-medium">Digital Poster</h4>
                  </div>
                  <p className="text-sm text-gray-700">
                    A visual representation of your tender that can be shared digitally or printed.
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="bg-white p-1 rounded">
                      <FileText className="h-5 w-5 text-red-600" />
                    </div>
                    <h4 className="font-medium">PDF Document</h4>
                  </div>
                  <p className="text-sm text-gray-700">
                    A formal multi-page document with complete tender details and terms.
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="bg-white p-1 rounded">
                      <MessageSquare className="h-5 w-5 text-green-600" />
                    </div>
                    <h4 className="font-medium">WhatsApp Message</h4>
                  </div>
                  <p className="text-sm text-gray-700">
                    A formatted message ready to share via WhatsApp with key tender information.
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="bg-white p-1 rounded">
                      <Mail className="h-5 w-5 text-blue-600" />
                    </div>
                    <h4 className="font-medium">Email Template</h4>
                  </div>
                  <p className="text-sm text-gray-700">
                    A professional email template with tender details and attachments.
                  </p>
                </div>
              </div>
              <div className="mt-4 bg-white p-3 rounded border">
                <p className="text-sm text-gray-600">
                  <strong>Note:</strong> You can switch between formats using the tabs and download or copy each format
                  as needed.
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="distribute" className="space-y-4">
            <div className="border rounded-lg p-4 bg-purple-50">
              <h3 className="text-lg font-medium mb-2 text-purple-800">Step 4: Distribute Your Tender</h3>
              <ol className="space-y-3 text-gray-700">
                <li className="flex gap-2">
                  <div className="bg-purple-100 text-purple-800 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 font-medium">
                    1
                  </div>
                  <div>
                    <p>
                      Select <strong>Vendor Types</strong> to target specific categories of suppliers.
                    </p>
                  </div>
                </li>
                <li className="flex gap-2">
                  <div className="bg-purple-100 text-purple-800 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 font-medium">
                    2
                  </div>
                  <div>
                    <p>
                      Choose <strong>Recipients</strong> from your contact list or add new contacts.
                    </p>
                  </div>
                </li>
                <li className="flex gap-2">
                  <div className="bg-purple-100 text-purple-800 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 font-medium">
                    3
                  </div>
                  <div>
                    <p>
                      Select <strong>Email Options</strong> including subject, attachments, and send method.
                    </p>
                  </div>
                </li>
                <li className="flex gap-2">
                  <div className="bg-purple-100 text-purple-800 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 font-medium">
                    4
                  </div>
                  <div>
                    <p>
                      Click <strong>Send</strong> to distribute your tender to all selected recipients.
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      You'll receive a confirmation once the emails are sent.
                    </p>
                  </div>
                </li>
              </ol>
              <div className="mt-4 bg-white p-3 rounded border">
                <p className="text-sm text-gray-600">
                  <strong>Pro Tip:</strong> Use "Bulk Email (BCC)" to send to multiple recipients while keeping their
                  email addresses private.
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="tips" className="space-y-4">
            <div className="border rounded-lg p-4 bg-gray-50">
              <h3 className="text-lg font-medium mb-3 text-gray-800">Tips & Tricks</h3>
              <div className="space-y-3">
                <div className="flex gap-3 items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Be specific in your prompts</p>
                    <p className="text-sm text-gray-600">
                      Include details like quantity, specifications, and deadline in your initial prompt for better
                      results.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Save frequently</p>
                    <p className="text-sm text-gray-600">
                      Click the "Save" button after making changes to ensure your edits are applied to all output
                      formats.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Organize contacts by vendor type</p>
                    <p className="text-sm text-gray-600">
                      Select relevant vendor types first, then choose specific recipients for more targeted
                      distribution.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Preview before sending</p>
                    <p className="text-sm text-gray-600">
                      Always check all output formats before distribution to ensure accuracy and professionalism.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Use regeneration for variations</p>
                    <p className="text-sm text-gray-600">
                      The "Regenerate" buttons can provide alternative wording for evaluation criteria and terms.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="border rounded-lg p-4 bg-blue-50">
              <h3 className="text-lg font-medium mb-2 text-blue-800">Keyboard Shortcuts</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-700">Generate Tender</span>
                  <span className="font-mono bg-white px-2 rounded border">Ctrl + Enter</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Save Changes</span>
                  <span className="font-mono bg-white px-2 rounded border">Ctrl + S</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Copy to Clipboard</span>
                  <span className="font-mono bg-white px-2 rounded border">Ctrl + C</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Download</span>
                  <span className="font-mono bg-white px-2 rounded border">Ctrl + D</span>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="mt-6 flex items-center justify-between">
          <div className="text-sm text-gray-500">For additional help, contact support@emojot.com</div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
