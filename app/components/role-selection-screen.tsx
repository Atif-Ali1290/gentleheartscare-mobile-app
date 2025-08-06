"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Stethoscope, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

interface RoleSelectionScreenProps {
  onRoleSelect: (role: "consumer" | "provider") => void
  onNavigate: (screen: string) => void
}

export default function RoleSelectionScreen({ onRoleSelect, onNavigate }: RoleSelectionScreenProps) {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-white p-6">
      {/* Header with Back Button */}
      <div className="flex items-center mb-8">
        <Button variant="ghost" size="icon" onClick={() => onNavigate("auth-screen")}>
          <ArrowLeft className="h-6 w-6 text-gray-700" />
        </Button>
        <h1 className="text-2xl font-bold text-gray-900 ml-4">Choose Your Role</h1>
      </div>

      <div className="flex-1 flex flex-col justify-center">
        <div className="space-y-6">
          <Card
            className="border-2 border-transparent hover:border-blue-200 transition-colors cursor-pointer"
            onClick={() => onRoleSelect("consumer")}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-600 p-3 rounded-lg">
                  <Heart className="h-7 w-7 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl">I need care</CardTitle>
                  <CardDescription>Book healthcare services for yourself or family</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <ul className="text-sm text-gray-600 space-y-1 list-disc pl-5">
                <li>Request home visits</li>
                <li>Track your provider</li>
                <li>Secure payments</li>
              </ul>
            </CardContent>
          </Card>

          <Card
            className="border-2 border-transparent hover:border-blue-200 transition-colors cursor-pointer"
            onClick={() => onRoleSelect("provider")}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-3">
                <div className="bg-green-600 p-3 rounded-lg">
                  <Stethoscope className="h-7 w-7 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl">I provide care</CardTitle>
                  <CardDescription>Join as a healthcare professional</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <ul className="text-sm text-gray-600 space-y-1 list-disc pl-5">
                <li>Manage your schedule</li>
                <li>Accept requests</li>
                <li>Track earnings</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="text-center text-xs text-gray-500 mt-auto py-4">
        <p>By continuing, you agree to our Terms of Service and Privacy Policy</p>
      </div>
    </div>
  )
}
