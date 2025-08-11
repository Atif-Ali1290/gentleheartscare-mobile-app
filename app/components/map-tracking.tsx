"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, MapPin, Clock, Phone, MessageCircle, User, Star, Home } from "lucide-react"

interface MapTrackingProps {
  onNavigate: (screen: string, data?: any) => void
}

export default function MapTracking({ onNavigate }: MapTrackingProps) {
  const [estimatedTime, setEstimatedTime] = useState(12)
  const [providerStatus, setProviderStatus] = useState("On the way")

  const provider = {
    name: "Dr. Sarah Johnson",
    rating: 4.9,
    phone: "+1 (555) 123-4567",
    vehicle: "Blue Honda Civic - ABC 123",
    currentLocation: "0.8 km away",
  }

  const statusUpdates = [
    { time: "2:45 PM", status: "Request accepted", completed: true },
    { time: "2:50 PM", status: "Provider is preparing", completed: true },
    { time: "3:05 PM", status: "On the way to you", completed: true },
    { time: "3:17 PM", status: "Arriving soon", completed: false },
    { time: "3:20 PM", status: "Arrived at location", completed: false },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setEstimatedTime((prev) => Math.max(0, prev - 1))
    }, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [])

  const handleCancelRequest = () => {
    alert("Your request has been cancelled. (Simulated)")
    onNavigate("consumer-home") // Navigate back to home after cancellation
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="icon" onClick={() => onNavigate("consumer-home")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-lg font-semibold text-gray-900">Track Provider</h1>
          </div>
          <Badge variant="default" className="bg-green-100 text-green-800">
            {providerStatus}
          </Badge>
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="bg-blue-50 h-64 mx-4 mt-4 rounded-lg relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="h-12 w-12 text-blue-600 mx-auto mb-2" />
            <p className="text-blue-800 font-medium">Live Map View</p>
            <p className="text-blue-600 text-sm">Provider location updating...</p>
          </div>
        </div>

        {/* Provider marker */}
        <div className="absolute top-20 left-32 bg-blue-600 p-2 rounded-full shadow-lg">
          <User className="h-4 w-4 text-white" />
        </div>

        {/* Your location marker */}
        <div className="absolute bottom-16 right-20 bg-red-500 p-2 rounded-full shadow-lg">
          <MapPin className="h-4 w-4 text-white" />
        </div>

        {/* Route line */}
        <div className="absolute top-24 left-36 w-24 h-0.5 bg-blue-400 transform rotate-45"></div>
        <div className="absolute top-32 left-48 w-16 h-0.5 bg-blue-400 transform rotate-12"></div>
      </div>

      {/* ETA Card */}
      <Card className="mx-4 mt-4">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <Clock className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Estimated Arrival</p>
                <p className="text-sm text-gray-600">{provider.currentLocation}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-blue-600">{estimatedTime} min</p>
              <p className="text-sm text-gray-500">3:17 PM</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Provider Info */}
      <Card className="mx-4 mt-4">
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-100 rounded-full h-12 w-12 flex items-center justify-center">
              <span className="font-semibold text-blue-600">SJ</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <h3 className="font-medium text-gray-900">{provider.name}</h3>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600 ml-1">{provider.rating}</span>
                </div>
              </div>
              <p className="text-sm text-gray-600">{provider.vehicle}</p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="icon" onClick={() => onNavigate("chat")}>
                <MessageCircle className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Phone className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Status Timeline */}
      <Card className="mx-4 mt-4 mb-6">
        <CardContent className="p-4">
          <h3 className="font-medium text-gray-900 mb-4">Status Updates</h3>
          <div className="space-y-4">
            {statusUpdates.map((update, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className={`h-3 w-3 rounded-full ${update.completed ? "bg-green-500" : "bg-gray-300"}`}></div>
                <div className="flex-1">
                  <p className={`text-sm ${update.completed ? "text-gray-900 font-medium" : "text-gray-500"}`}>
                    {update.status}
                  </p>
                  <p className="text-xs text-gray-500">{update.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Emergency Actions */}
      <div className="px-4 pb-6">
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            className="border-red-200 text-red-600 hover:bg-red-50 bg-transparent"
            onClick={handleCancelRequest} // Added onClick handler
          >
            Cancel Request
          </Button>
          <Button variant="destructive" onClick={() => onNavigate("emergency-support")}>
            Emergency SOS
          </Button>
        </div>
      </div>

      {/* Back to Home Button */}
      <div className="bg-white border-t border-gray-200 px-4 py-4">
        <Button
          className="w-full bg-blue-600 hover:bg-blue-700 text-lg font-semibold"
          onClick={() => onNavigate("consumer-home")}
        >
          <Home className="h-6 w-6 mr-3" />
          Back to Home
        </Button>
      </div>
    </div>
  )
}
