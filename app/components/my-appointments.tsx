"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, Clock, MapPin, Home } from "lucide-react"

interface MyAppointmentsProps {
  onNavigate: (screen: string, data?: any) => void
  data?: any
}

export default function MyAppointments({ onNavigate, data }: MyAppointmentsProps) {
  const [activeTab, setActiveTab] = useState("upcoming") // 'upcoming' or 'past'
  const [highlightedAppointment, setHighlightedAppointment] = useState<number | null>(null)

  // Handle data passed from notifications
  useEffect(() => {
    if (data?.appointmentId) {
      setHighlightedAppointment(data.appointmentId)
      // Auto-scroll to the specific appointment after a short delay
      setTimeout(() => {
        const element = document.getElementById(`appointment-${data.appointmentId}`)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      }, 500)
    }
  }, [data])

  const upcomingAppointments = [
    {
      id: 1,
      provider: "Dr. Sarah Johnson",
      service: "General Consultation",
      date: "2025-08-10",
      time: "10:00 AM",
      status: "Confirmed",
      location: "Your Home",
    },
    {
      id: 2,
      provider: "Nurse Maria Garcia",
      service: "Nursing Care",
      date: "2025-08-12",
      time: "02:30 PM",
      status: "Pending",
      location: "Your Home",
    },
  ]

  const pastAppointments = [
    {
      id: 3,
      provider: "Dr. Sarah Johnson",
      service: "Follow-up Checkup",
      date: "2025-07-25",
      time: "11:00 AM",
      status: "Completed",
      location: "Your Home",
    },
    {
      id: 4,
      provider: "Physical Therapist Alex Lee",
      service: "Physical Therapy Session",
      date: "2025-07-18",
      time: "03:00 PM",
      status: "Completed",
      location: "Your Home",
    },
    {
      id: 5,
      provider: "Dr. Sarah Johnson",
      service: "Initial Consultation",
      date: "2025-07-01",
      time: "09:00 AM",
      status: "Cancelled",
      location: "Your Home",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Confirmed":
        return <Badge className="bg-blue-100 text-blue-800">Confirmed</Badge>
      case "Pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      case "Completed":
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>
      case "Cancelled":
        return <Badge className="bg-red-100 text-red-800">Cancelled</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 py-4 shadow-sm">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="icon" onClick={() => onNavigate("consumer-home")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold text-gray-900">My Appointments</h1>
        </div>
      </div>

      {/* Tabs for Upcoming/Past */}
      <div className="bg-white px-4 py-3 shadow-sm border-b border-gray-200">
        <div className="flex justify-around">
          <Button
            variant={activeTab === "upcoming" ? "default" : "ghost"}
            onClick={() => setActiveTab("upcoming")}
            className={activeTab === "upcoming" ? "bg-blue-600 hover:bg-blue-700" : "text-gray-700 hover:bg-gray-100"}
          >
            Upcoming
            {upcomingAppointments.length > 0 && (
              <span className="ml-2 px-2 py-0.5 text-xs font-semibold rounded-full bg-white text-blue-600">
                {upcomingAppointments.length}
              </span>
            )}
          </Button>
          <Button
            variant={activeTab === "past" ? "default" : "ghost"}
            onClick={() => setActiveTab("past")}
            className={activeTab === "past" ? "bg-blue-600 hover:bg-blue-700" : "text-gray-700 hover:bg-gray-100"}
          >
            Past
            {pastAppointments.length > 0 && (
              <span className="ml-2 px-2 py-0.5 text-xs font-semibold rounded-full bg-white text-blue-600">
                {pastAppointments.length}
              </span>
            )}
          </Button>
        </div>
      </div>

      {/* Appointments List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {activeTab === "upcoming" &&
          (upcomingAppointments.length === 0 ? (
            <div className="text-center text-gray-500 py-10">No upcoming appointments.</div>
          ) : (
            upcomingAppointments.map((appointment) => (
              <Card 
                key={appointment.id} 
                id={`appointment-${appointment.id}`}
                className={`border-l-4 ${
                  highlightedAppointment === appointment.id 
                    ? 'border-l-green-500 bg-green-50 shadow-lg' 
                    : 'border-l-blue-500'
                } transition-all duration-300`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">{appointment.service}</h3>
                    {getStatusBadge(appointment.status)}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">with {appointment.provider}</p>
                  <div className="space-y-1 text-sm text-gray-700">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                      <span>{appointment.date}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-gray-500" />
                      <span>{appointment.time}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                      <span>{appointment.location}</span>
                    </div>
                  </div>
                  <div className="mt-4 flex space-x-2">
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      Reschedule
                    </Button>
                    <Button variant="destructive" size="sm" className="flex-1">
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ))}

        {activeTab === "past" &&
          (pastAppointments.length === 0 ? (
            <div className="text-center text-gray-500 py-10">No past appointments.</div>
          ) : (
            pastAppointments.map((appointment) => (
              <Card 
                key={appointment.id} 
                id={`appointment-${appointment.id}`}
                className={`border-l-4 ${
                  highlightedAppointment === appointment.id 
                    ? 'border-l-green-500 bg-green-50 shadow-lg' 
                    : 'border-l-gray-300'
                } transition-all duration-300`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">{appointment.service}</h3>
                    {getStatusBadge(appointment.status)}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">with {appointment.provider}</p>
                  <div className="space-y-1 text-sm text-gray-700">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                      <span>{appointment.date}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-gray-500" />
                      <span>{appointment.time}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                      <span>{appointment.location}</span>
                    </div>
                  </div>
                  {appointment.status === "Completed" && (
                    <div className="mt-4">
                      <Button variant="outline" size="sm" className="w-full bg-transparent">
                        Leave Review
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          ))}
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
