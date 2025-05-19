"use client"

import React from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, UserPlus } from "lucide-react"

// Mock contact data
const mockContacts = [
  { id: "1", name: "Rajesh Kumar", email: "rajesh.kumar@example.com", department: "Procurement" },
  { id: "2", name: "Priya Sharma", email: "priya.sharma@example.com", department: "Finance" },
  { id: "3", name: "Amit Patel", email: "amit.patel@example.com", department: "Operations" },
  { id: "4", name: "Neha Singh", email: "neha.singh@example.com", department: "Procurement" },
  { id: "5", name: "Vikram Mehta", email: "vikram.mehta@example.com", department: "Management" },
  { id: "6", name: "Sunita Verma", email: "sunita.verma@example.com", department: "Finance" },
  { id: "7", name: "Deepak Gupta", email: "deepak.gupta@example.com", department: "Operations" },
  { id: "8", name: "Ananya Reddy", email: "ananya.reddy@example.com", department: "Management" },
]

interface ContactListProps {
  selectedContacts: string[]
  setSelectedContacts: React.Dispatch<React.SetStateAction<string[]>>
}

export default function ContactList({ selectedContacts, setSelectedContacts }: ContactListProps) {
  const [searchTerm, setSearchTerm] = React.useState("")

  const filteredContacts = mockContacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.department.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleSelectAll = () => {
    if (selectedContacts.length === filteredContacts.length) {
      setSelectedContacts([])
    } else {
      setSelectedContacts(filteredContacts.map((contact) => contact.id))
    }
  }

  const handleSelectContact = (id: string) => {
    if (selectedContacts.includes(id)) {
      setSelectedContacts(selectedContacts.filter((contactId) => contactId !== id))
    } else {
      setSelectedContacts([...selectedContacts, id])
    }
  }

  return (
    <div className="border rounded-md">
      <div className="p-3 border-b">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search contacts..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="p-3 border-b flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="select-all"
            checked={selectedContacts.length === filteredContacts.length && filteredContacts.length > 0}
            onCheckedChange={handleSelectAll}
          />
          <Label htmlFor="select-all">
            {selectedContacts.length > 0 ? `Selected ${selectedContacts.length} contacts` : "Select all"}
          </Label>
        </div>
        <Button variant="ghost" size="sm">
          <UserPlus className="h-4 w-4 mr-2" />
          Add New
        </Button>
      </div>

      <ScrollArea className="h-[300px]">
        <div className="divide-y">
          {filteredContacts.map((contact) => (
            <div key={contact.id} className="p-3 hover:bg-gray-50">
              <div className="flex items-center space-x-3">
                <Checkbox
                  id={`contact-${contact.id}`}
                  checked={selectedContacts.includes(contact.id)}
                  onCheckedChange={() => handleSelectContact(contact.id)}
                />
                <div>
                  <p className="font-medium">{contact.name}</p>
                  <p className="text-sm text-gray-500">{contact.email}</p>
                  <p className="text-xs text-gray-400">{contact.department}</p>
                </div>
              </div>
            </div>
          ))}

          {filteredContacts.length === 0 && (
            <div className="p-6 text-center text-gray-500">No contacts found matching your search.</div>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
