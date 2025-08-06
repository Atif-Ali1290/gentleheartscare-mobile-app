"use client"

import { Button } from "@/components/ui/button"
import { Clock, Home, ArrowLeft } from "lucide-react"

interface ProviderVerificationStatusProps {
  onNavigate: (screen: string) => void
}

export default function ProviderVerificationStatus({ onNavigate }: ProviderVerificationStatusProps) {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-white p-6 text-center">
      {/* Header with Back Button */}
      <div className="flex items-center mb-8">
        <Button variant="ghost" size="icon" onClick={() => onNavigate("auth-screen")}>
          <ArrowLeft className="h-6 w-6 text-gray-700" />
        </Button>
        <h1 className="text-2xl font-bold text-gray-900 ml-4">Verification Status</h1>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="bg-blue-100 p-6 rounded-full mb-8">
          <Clock className="h-20 w-20 text-blue-600 animate-spin-slow" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Application Under Review</h1>
        <p className="text-lg text-gray-700 mb-6">
          Thank you for submitting your documents. Our team is now reviewing your application.
        </p>
        <p className="text-md text-gray-600 mb-10">
          You will receive a notification once your profile has been verified. This usually takes 24-48 hours.
        </p>

        <Button
          className="w-full max-w-xs h-12 bg-blue-600 hover:bg-blue-700 text-lg font-semibold"
          onClick={() => onNavigate("auth-screen")} // Go back to auth screen or a waiting screen
        >
          <Home className="h-5 w-5 mr-2" />
          Back to Home
        </Button>
      </div>

      <div className="text-center text-xs text-gray-500 mt-auto py-4">
        <p>GentleHeartsCare - Your trusted partner for home healthcare.</p>
      </div>
    </div>
  )
}
