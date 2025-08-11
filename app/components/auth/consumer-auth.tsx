"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Phone, User, Loader2 } from "lucide-react"

interface User {
  name: string
  phoneNumber: string
  role: "consumer" | "provider"
}

interface ConsumerAuthProps {
  onNavigate: (screen: string, data?: any) => void
  onUserLogin: (userData: User) => void
}

export default function ConsumerAuth({ onNavigate, onUserLogin }: ConsumerAuthProps) {
  const [isLogin, setIsLogin] = useState(true)
  const [phoneNumber, setPhoneNumber] = useState("")
  const [name, setName] = useState("")
  const [isLoading, setIsLoading] = useState(false) // New loading state for simplified flow

  // Simplified authentication handler
  const handleAuthBypass = async () => {
    if (!phoneNumber || (!isLogin && !name)) {
      alert("Please fill in all required fields.")
      return
    }

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500)) // Simulate network delay

    if (isLogin) {
      console.log(`Simulated login for phone: ${phoneNumber}`)
      alert("Simulated Login Successful!")
      // For login, we'll use a default name since we don't have it stored
      onUserLogin({
        name: "User", // In a real app, this would come from the database
        phoneNumber,
        role: "consumer"
      })
    } else {
      console.log(`Simulated registration for name: ${name}, phone: ${phoneNumber}`)
      alert("Simulated Registration Successful!")
      onUserLogin({
        name,
        phoneNumber,
        role: "consumer"
      })
    }
    setIsLoading(false)
    onNavigate("consumer-home") // Directly navigate to consumer home
  }

  const handleToggleAuthMode = () => {
    setIsLogin(!isLogin)
    setPhoneNumber("")
    setName("")
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-white p-6">
      {/* Header with Back Button */}
      <div className="flex items-center mb-8">
        <Button variant="ghost" size="icon" onClick={() => onNavigate("auth-screen")}>
          <ArrowLeft className="h-6 w-6 text-gray-700" />
        </Button>
        <h1 className="text-2xl font-bold text-gray-900 ml-4">{isLogin ? "Sign In" : "Sign Up"} as Consumer</h1>
      </div>

      <div className="flex-1 flex flex-col justify-center">
        <div className="space-y-6">
          {!isLogin && (
            <div>
              <Label htmlFor="name" className="text-base font-medium text-gray-700 mb-2 flex items-center">
                <User className="h-4 w-4 mr-2 text-gray-500" />
                Full Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-12 text-base"
                disabled={isLoading}
              />
            </div>
          )}
          <div>
            <Label htmlFor="phone" className="text-base font-medium text-gray-700 mb-2 flex items-center">
              <Phone className="h-4 w-4 mr-2 text-gray-500" />
              Phone Number
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="e.g., +1234567890"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="h-12 text-base"
              disabled={isLoading}
            />
          </div>

          <Button
            className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-lg font-semibold"
            onClick={handleAuthBypass}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Processing...
              </>
            ) : isLogin ? (
              "Login"
            ) : (
              "Register"
            )}
          </Button>

          <Button
            variant="link"
            className="w-full text-blue-600 hover:text-blue-800"
            onClick={handleToggleAuthMode}
            disabled={isLoading}
          >
            {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
          </Button>
        </div>
      </div>

      <div className="text-center text-xs text-gray-500 mt-auto py-4">
        <p>By continuing, you agree to our Terms of Service and Privacy Policy</p>
      </div>
    </div>
  )
}
