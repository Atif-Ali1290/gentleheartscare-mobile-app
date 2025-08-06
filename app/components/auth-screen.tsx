"use client"

import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"

interface AuthScreenProps {
  onNavigate: (screen: string) => void
}

export default function AuthScreen({ onNavigate }: AuthScreenProps) {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-white p-6">
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <div className="flex items-center justify-center mb-6">
          <div className="bg-blue-600 p-4 rounded-full shadow-lg">
            <Heart className="h-16 w-16 text-white" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to GentleHeartsCare</h1>
        <p className="text-lg text-gray-700 mb-10">Your compassionate partner for home healthcare.</p>

        <div className="w-full max-w-xs space-y-4">
          <Button
            className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-lg font-semibold"
            onClick={() => onNavigate("role-selection")}
          >
            Sign Up
          </Button>
          <Button
            variant="outline"
            className="w-full h-12 border-blue-300 text-blue-600 hover:bg-blue-50 text-lg font-semibold bg-transparent"
            onClick={() => onNavigate("consumer-auth")} // Assuming login starts with consumer auth
          >
            Sign In
          </Button>
        </div>
      </div>

      <div className="text-center text-xs text-gray-500 mt-auto py-4">
        <p>By continuing, you agree to our Terms of Service and Privacy Policy</p>
      </div>
    </div>
  )
}
