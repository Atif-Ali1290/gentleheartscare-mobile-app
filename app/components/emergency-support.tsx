"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, PhoneCall, Share2, Home, AlertTriangle, MapPin, Clock } from "lucide-react"

interface EmergencySupportProps {
  onNavigate: (screen: string, data?: any) => void
  data?: any
}

export default function EmergencySupport({ onNavigate, data }: EmergencySupportProps) {
  const [emergencyInfo, setEmergencyInfo] = useState<any>(null)

  // Handle data passed from notifications
  useEffect(() => {
    if (data?.emergencyId) {
      setEmergencyInfo({
        id: data.emergencyId,
        type: data.type || "sos",
        timestamp: new Date().toLocaleString(),
        location: "Your current location",
        status: "Active"
      })
    }
  }, [data])

  const handleCallAmbulance = () => {
    alert("Calling Ambulance... (Simulated)")
    // In a real app, this would initiate a call or send an emergency signal
  }

  const handleShareLocation = () => {
    alert("Sharing your location with emergency contacts... (Simulated)")
    // In a real app, this would share GPS coordinates
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-red-50 to-white">
      {/* Header */}
      <div className="bg-white px-4 py-4 shadow-sm">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="icon" onClick={() => onNavigate("consumer-home")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold text-gray-900">Emergency Help</h1>
        </div>
      </div>

      {/* Emergency Info Card (if navigated from notification) */}
      {emergencyInfo && (
        <div className="px-4 py-4">
          <Card className="border-l-4 border-l-red-500 bg-red-50">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3 mb-3">
                <AlertTriangle className="h-6 w-6 text-red-600" />
                <h3 className="font-semibold text-red-800">Emergency Alert</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="text-gray-700">Triggered: {emergencyInfo.timestamp}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="text-gray-700">Location: {emergencyInfo.location}</span>
                </div>
                <div className="flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-2 text-red-500" />
                  <span className="text-red-700 font-medium">Status: {emergencyInfo.status}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 text-center">
        <div className="bg-red-600 p-6 rounded-full shadow-lg mb-8 animate-pulse">
          <PhoneCall className="h-20 w-20 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Emergency Help</h2>
        <p className="text-xl text-gray-700 mb-10">Stay calm. Help is on the way.</p>

        <div className="w-full max-w-xs space-y-4">
          <Button
            className="w-full h-14 bg-red-600 hover:bg-red-700 text-lg font-semibold"
            onClick={handleCallAmbulance}
          >
            <PhoneCall className="h-6 w-6 mr-3" />
            Call Ambulance
          </Button>
          <Button
            className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-lg font-semibold"
            onClick={handleShareLocation}
          >
            <Share2 className="h-6 w-6 mr-3" />
            Share Location
          </Button>
          <Button
            variant="outline"
            className="w-full h-14 border-gray-300 text-gray-800 hover:bg-gray-100 text-lg font-semibold bg-transparent"
            onClick={() => onNavigate("consumer-home")}
          >
            <Home className="h-6 w-6 mr-3" />
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  )
}
