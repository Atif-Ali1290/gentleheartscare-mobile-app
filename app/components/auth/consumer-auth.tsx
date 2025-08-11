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
    onNavigate("account-settings", {
      name: name,
      phoneNumber: phoneNumber,
      email: "user@example.com" // Placeholder for email
    })
  }

  const handleToggleAuthMode = () => {
    setIsLogin(!isLogin)
    setPhoneNumber("")
    setName("")
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-red-50 to-white p-6">
      {/* Logo at the top */}
      <div className="flex flex-col items-center mb-8 mt-4">
        <div className="relative mb-2">
          {/* Large Heart */}
          <div className="w-16 h-16 relative">
            {/* Outer pink layer */}
            <div className="absolute inset-0 bg-pink-200 rounded-full transform rotate-45"></div>
            {/* Middle white layer */}
            <div className="absolute inset-2 bg-white rounded-full transform rotate-45"></div>
            {/* Inner red layer */}
            <div className="absolute inset-4 bg-red-500 rounded-full transform rotate-45"></div>
          </div>
          {/* Small scattered hearts */}
          <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-pink-200 rounded-full transform rotate-45"></div>
          <div className="absolute -top-2 -left-2 w-3 h-3 bg-red-300 rounded-full transform rotate-45"></div>
        </div>
        <div className="text-red-600 font-bold text-2xl">GentleHeartsCare</div>
      </div>
      {/* Header with Back Button */}
      <div className="flex items-center mb-8">
        <Button variant="ghost" size="icon" onClick={() => onNavigate("auth-screen")}
          className="text-red-600 hover:bg-red-100">
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-2xl font-bold text-red-700 ml-4">{isLogin ? "Sign In" : "Sign Up"} as Consumer</h1>
      </div>

      <div className="flex-1 flex flex-col justify-center">
        <div className="space-y-6">
          {!isLogin && (
            <div>
              <Label htmlFor="name" className="text-base font-medium text-red-700 mb-2 flex items-center">
                <User className="h-4 w-4 mr-2 text-red-400" />
                Full Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-12 text-base border-red-200 focus:border-red-400 focus:ring-red-400"
                disabled={isLoading}
              />
            </div>
          )}
          <div>
            <Label htmlFor="phone" className="text-base font-medium text-red-700 mb-2 flex items-center">
              <Phone className="h-4 w-4 mr-2 text-red-400" />
              Phone Number
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="e.g., +1234567890"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="h-12 text-base border-red-200 focus:border-red-400 focus:ring-red-400"
              disabled={isLoading}
            />
          </div>

          <Button
            className="w-full h-12 bg-red-600 hover:bg-red-700 text-lg font-semibold text-white shadow"
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
            className="w-full text-red-600 hover:text-red-800"
            onClick={handleToggleAuthMode}
            disabled={isLoading}
          >
            {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
          </Button>
        </div>
      </div>

      <div className="text-center text-xs text-gray-500 mt-auto py-4">
        <p>By continuing, you agree to our <span className="text-red-600">Terms of Service</span> and <span className="text-red-600">Privacy Policy</span></p>
      </div>
    </div>
  )
}
