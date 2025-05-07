
'use client'
import { useEffect, useState } from "react"
import QRCode from "qrcode"

export default function QR({ surveyLink, size = 100 }: { surveyLink: string, size?: number }) {
  const [qrUrl, setQrUrl] = useState("")

  useEffect(() => {
    QRCode.toDataURL(surveyLink, { width: size, margin: 1 }, (err, url) => {
      if (!err) setQrUrl(url)
    })
  }, [surveyLink, size])

  return qrUrl ? (
    <img src={qrUrl} alt="QR Code" style={{ width: size, height: size }} />
  ) : null
}
