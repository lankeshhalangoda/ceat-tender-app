interface QRCodeProps {
  size?: number
  className?: string
  surveyLink?: string
}

export default function QRCode({ size = 120, className = "", surveyLink = "https://ceat.com/survey" }: QRCodeProps) {
  return (
    <div className={`bg-white p-2 inline-block rounded-md ${className}`}>
      <div className="flex flex-col items-center justify-center">
        {/* Use the provided QR code image */}
        <img
          src="/images/qr-code.png"
          width={size}
          height={size}
          alt="QR Code"
          className="qr-code-image"
          style={{ display: "block" }}
        />
        <div className="text-xs text-center mt-1 font-medium text-gray-800">Scan to respond</div>
      </div>
    </div>
  )
}
