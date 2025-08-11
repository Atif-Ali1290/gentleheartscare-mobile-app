"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Users, Stethoscope, Shield, Star } from "lucide-react"

interface WelcomeScreenProps {
  onRoleSelect: (role: "consumer" | "provider") => void
}

export default function WelcomeScreen({ onRoleSelect }: WelcomeScreenProps) {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-red-50 to-white">
      {/* Header */}
      <div className="text-center pt-12 pb-8 px-6">
        <div className="flex items-center justify-center mb-4">
          <div className="bg-red-600 p-3 rounded-full">
            <Heart className="h-8 w-8 text-white" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">GentleHeartsCare</h1>
        <p className="text-gray-600 text-lg">Compassionate healthcare at your doorstep</p>
      </div>

      {/* Features */}
      <div className="px-6 mb-8">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="bg-red-100 p-3 rounded-full w-fit mx-auto mb-2">
              <Shield className="h-6 w-6 text-red-600" />
            </div>
            <p className="text-sm text-gray-600">Secure & Safe</p>
          </div>
          <div className="text-center">
            <div className="bg-red-100 p-3 rounded-full w-fit mx-auto mb-2">
              <Star className="h-6 w-6 text-red-600" />
            </div>
            <p className="text-sm text-gray-600">Rated Providers</p>
          </div>
          <div className="text-center">
            <div className="bg-red-100 p-3 rounded-full w-fit mx-auto mb-2">
              <Users className="h-6 w-6 text-red-600" />
            </div>
            <p className="text-sm text-gray-600">24/7 Support</p>
          </div>
          <div className="text-center">
            <div className="bg-red-100 p-3 rounded-full w-fit mx-auto mb-2">
              <Stethoscope className="h-6 w-6 text-red-600" />
            </div>
            <p className="text-sm text-gray-600">Expert Care</p>
          </div>
        </div>
      </div>

      {/* Role Selection */}
      <div className="flex-1 px-6 pb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">Choose your role</h2>

        <div className="space-y-4">
          <Card
            className="border-2 border-transparent hover:border-red-200 transition-colors cursor-pointer"
            onClick={() => onRoleSelect("consumer")}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-3">
                <div className="bg-red-600 p-2 rounded-lg">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-lg">I need care</CardTitle>
                  <CardDescription>Book healthcare services for yourself or family</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Request home visits</li>
                <li>• Track your provider</li>
                <li>• Secure payments</li>
              </ul>
            </CardContent>
          </Card>

          <Card
            className="border-2 border-transparent hover:border-green-200 transition-colors cursor-pointer"
            onClick={() => onRoleSelect("provider")}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-3">
                <div className="bg-green-600 p-2 rounded-lg">
                  <Stethoscope className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-lg">I provide care</CardTitle>
                  <CardDescription>Join as a healthcare professional</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Manage your schedule</li>
                <li>• Accept requests</li>
                <li>• Track earnings</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 pb-6 text-center">
        <p className="text-xs text-gray-500">By continuing, you agree to our Terms of Service and Privacy Policy</p>
      </div>
    </div>
  )
}
