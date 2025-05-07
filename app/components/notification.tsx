"use client"

import { useState, useEffect } from "react"
import { CheckCircle2, AlertCircle, X } from "lucide-react"

interface NotificationProps {
  message: string
  type: "success" | "error" | "info"
  duration?: number
  onClose?: () => void
}

export default function Notification({ message, type, duration = 3000, onClose }: NotificationProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      if (onClose) onClose()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  if (!isVisible) return null

  const bgColor =
    type === "success"
      ? "bg-green-50 border-green-200"
      : type === "error"
        ? "bg-red-50 border-red-200"
        : "bg-blue-50 border-blue-200"

  const textColor = type === "success" ? "text-green-700" : type === "error" ? "text-red-700" : "text-blue-700"

  const Icon = type === "success" ? CheckCircle2 : type === "error" ? AlertCircle : AlertCircle

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 max-w-md rounded-lg border ${bgColor} p-4 shadow-md animate-in fade-in slide-in-from-bottom-5`}
    >
      <div className="flex items-start">
        <div className={`mr-3 ${textColor}`}>
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <p className={`text-sm font-medium ${textColor}`}>{message}</p>
        </div>
        <button
          onClick={() => {
            setIsVisible(false)
            if (onClose) onClose()
          }}
          className={`ml-4 inline-flex ${textColor} hover:opacity-70`}
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
