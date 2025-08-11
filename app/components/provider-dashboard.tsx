"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import {
  Bell,
  DollarSign,
  Clock,
  MapPin,
  Star,
  TrendingUp,
  Calendar,
  User,
  MessageCircle,
  Navigation,
  Home,
} from "lucide-react"

interface ProviderDashboardProps {
  onNavigate: (screen: string, data?: any) => void
}

export default function ProviderDashboard({ onNavigate }: ProviderDashboardProps) {
  const [isAvailable, setIsAvailable] = useState(true)

  const stats = {
    todayEarnings: 240,
    weeklyEarnings: 1680,
    completedServices: 8,
    rating: 4.9,
    responseTime: "2 min",
  }

  const pendingRequests = [
    {
      id: 1,
      patient: "John Smith",
      service: "General Consultation",
      location: "123 Main St, 2.3 km",
      proposedPrice: 75,
      originalPrice: 80,
      time: "3:30 PM",
      urgent: false,
    },
    {
      id: 2,
      patient: "Mary Johnson",
      service: "Health Checkup",
      location: "456 Oak Ave, 1.8 km",
      proposedPrice: 120,
      originalPrice: 120,
      time: "4:00 PM",
      urgent: true,
    },
  ]

  const todaySchedule = [
    { id: 1, time: "9:00 AM", patient: "Alice Brown", service: "Follow-up", status: "completed" },
    { id: 2, time: "11:30 AM", patient: "Bob Wilson", service: "Consultation", status: "completed" },
    { id: 3, time: "2:00 PM", patient: "Carol Davis", service: "Therapy", status: "in-progress" },
    { id: 4, time: "4:00 PM", patient: "David Lee", service: "Checkup", status: "upcoming" },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 py-4 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Good afternoon, Dr. Johnson</h1>
            <p className="text-gray-600">You have 2 pending requests</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="relative" onClick={() => onNavigate("notifications-page")}>
              <Bell className="h-5 w-5" />
              <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                2
              </div>
            </Button>
          </div>
        </div>

        {/* Availability Toggle */}
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className={`h-3 w-3 rounded-full ${isAvailable ? "bg-green-500" : "bg-gray-400"}`}></div>
            <span className="font-medium text-gray-900">{isAvailable ? "Available for requests" : "Unavailable"}</span>
          </div>
          <Switch checked={isAvailable} onCheckedChange={setIsAvailable} />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Stats Cards */}
        <div className="px-4 py-4">
          <div className="grid grid-cols-2 gap-3 mb-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-600">Today</p>
                    <p className="text-lg font-bold text-gray-900">${stats.todayEarnings}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-600">This Week</p>
                    <p className="text-lg font-bold text-gray-900">${stats.weeklyEarnings}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <Card>
              <CardContent className="p-3 text-center">
                <Star className="h-5 w-5 text-yellow-400 mx-auto mb-1" />
                <p className="text-lg font-bold text-gray-900">{stats.rating}</p>
                <p className="text-xs text-gray-600">Rating</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-3 text-center">
                <Clock className="h-5 w-5 text-blue-600 mx-auto mb-1" />
                <p className="text-lg font-bold text-gray-900">{stats.responseTime}</p>
                <p className="text-xs text-gray-600">Response</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-3 text-center">
                <Calendar className="h-5 w-5 text-green-600 mx-auto mb-1" />
                <p className="text-lg font-bold text-gray-900">{stats.completedServices}</p>
                <p className="text-xs text-gray-600">Completed</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Pending Requests */}
        <div className="px-4 py-2">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Pending Requests</h2>
          <div className="space-y-3">
            {pendingRequests.map((request) => (
              <Card key={request.id} className="border-l-4 border-l-blue-500">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-medium text-gray-900">{request.patient}</h3>
                        {request.urgent && (
                          <Badge variant="destructive" className="text-xs">
                            Urgent
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{request.service}</p>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{request.location}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>Requested for {request.time}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-green-600">${request.proposedPrice}</p>
                      {request.proposedPrice !== request.originalPrice && (
                        <p className="text-sm text-gray-500 line-through">${request.originalPrice}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <Button variant="outline" size="sm">
                      Counter
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600 border-red-200 bg-transparent">
                      Decline
                    </Button>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      Accept
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Today's Schedule */}
        <div className="px-4 py-2 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Today's Schedule</h2>
          <Card>
            <CardContent className="p-4">
              <div className="space-y-3">
                {todaySchedule.map((appointment) => (
                  <div key={appointment.id} className="flex items-center space-x-3">
                    <div className="text-sm font-medium text-gray-600 w-16">{appointment.time}</div>
                    <div
                      className={`h-3 w-3 rounded-full ${
                        appointment.status === "completed"
                          ? "bg-green-500"
                          : appointment.status === "in-progress"
                            ? "bg-blue-500"
                            : "bg-gray-300"
                      }`}
                    ></div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{appointment.patient}</p>
                      <p className="text-sm text-gray-600">{appointment.service}</p>
                    </div>
                    <Badge
                      variant={
                        appointment.status === "completed"
                          ? "default"
                          : appointment.status === "in-progress"
                            ? "secondary"
                            : "outline"
                      }
                      className="text-xs"
                    >
                      {appointment.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex justify-around">
          <Button variant="ghost" size="sm" className="flex-col space-y-1 text-blue-600">
            <Calendar className="h-5 w-5" />
            <span className="text-xs">Dashboard</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex-col space-y-1" onClick={() => onNavigate("map-tracking")}>
            <Navigation className="h-5 w-5" />
            <span className="text-xs">Navigate</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex-col space-y-1" onClick={() => onNavigate("chat")}>
            <MessageCircle className="h-5 w-5" />
            <span className="text-xs">Messages</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex-col space-y-1" onClick={() => onNavigate("user-profile")}>
            <User className="h-5 w-5" />
            <span className="text-xs">Profile</span>
          </Button>
        </div>
        {/* Back to Home Button */}
        <div className="mt-4">
          <Button
            className="w-full bg-blue-600 hover:bg-blue-700 text-lg font-semibold"
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
