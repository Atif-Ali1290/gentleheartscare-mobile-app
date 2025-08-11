"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, User, Mail, Phone, Stethoscope, Calendar } from "lucide-react"

interface ProviderSignupStep1Props {
  onNavigate: (screen: string, data?: any) => void
}

export default function ProviderSignupStep1({ onNavigate }: ProviderSignupStep1Props) {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [specialty, setSpecialty] = useState("")
  const [experience, setExperience] = useState("")
  const [bio, setBio] = useState("")

  const handleNext = () => {
    // Basic validation
    if (!fullName || !email || !phoneNumber || !specialty || !experience || !bio) {
      alert("Please fill in all fields.")
      return
    }
    onNavigate("provider-signup-step2-docs")
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-white p-6">
      {/* Header with Back Button */}
      <div className="flex items-center mb-8">
        <Button variant="ghost" size="icon" onClick={() => onNavigate("role-selection")}>
          <ArrowLeft className="h-6 w-6 text-gray-700" />
        </Button>
        <h1 className="text-2xl font-bold text-gray-900 ml-4">Provider Sign Up (1/2)</h1>
      </div>

      <div className="flex-1 overflow-y-auto space-y-6 pb-8">
        <div>
          <Label htmlFor="fullName" className="text-base font-medium text-gray-700 mb-2 flex items-center">
            <User className="h-4 w-4 mr-2 text-gray-500" />
            Full Name
          </Label>
          <Input
            id="fullName"
            type="text"
            placeholder="Enter your full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="h-12 text-base"
          />
        </div>
        <div>
          <Label htmlFor="email" className="text-base font-medium text-gray-700 mb-2 flex items-center">
            <Mail className="h-4 w-4 mr-2 text-gray-500" />
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-12 text-base"
          />
        </div>
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
          />
        </div>
        <div>
          <Label htmlFor="specialty" className="text-base font-medium text-gray-700 mb-2 flex items-center">
            <Stethoscope className="h-4 w-4 mr-2 text-gray-500" />
            Specialty
          </Label>
          <Input
            id="specialty"
            type="text"
            placeholder="e.g., Family Medicine, Nursing"
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
            className="h-12 text-base"
          />
        </div>
        <div>
          <Label htmlFor="experience" className="text-base font-medium text-gray-700 mb-2 flex items-center">
            <Calendar className="h-4 w-4 mr-2 text-gray-500" />
            Years of Experience
          </Label>
          <Input
            id="experience"
            type="number"
            placeholder="e.g., 5"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="h-12 text-base"
          />
        </div>
        <div>
          <Label htmlFor="bio" className="text-base font-medium text-gray-700 mb-2 flex items-center">
            <User className="h-4 w-4 mr-2 text-gray-500" />
            Short Bio
          </Label>
          <Textarea
            id="bio"
            placeholder="Tell us about yourself and your experience..."
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            className="text-base"
          />
        </div>
      </div>

      <div className="mt-auto py-4">
        <Button className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-lg font-semibold" onClick={handleNext}>
          Next: Upload Documents
        </Button>
      </div>
    </div>
  )
}
