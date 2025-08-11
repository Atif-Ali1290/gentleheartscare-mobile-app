"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Calendar, User, AlertTriangle, Home } from "lucide-react"

interface NotificationsPageProps {
  onNavigate: (screen: string, data?: any) => void
}

export default function NotificationsPage({ onNavigate }: NotificationsPageProps) {
  const notifications = [
    {
      id: 1,
      type: "appointment",
      icon: Calendar,
      title: "Appointment Reminder",
      message: "Your appointment with Dr. Sarah Johnson is tomorrow at 10:00 AM.",
      time: "2 hours ago",
      color: "text-blue-600",
      navigateTo: "my-appointments", // Navigate to appointments page
      data: { appointmentId: 1, providerName: "Dr. Sarah Johnson" }
    },
    {
      id: 2,
      type: "update",
      icon: User,
      title: "Caregiver Update",
      message: "Nurse Maria Garcia has updated her availability for next week.",
      time: "Yesterday",
      color: "text-green-600",
      navigateTo: "provider-profile", // Navigate to provider profile
      data: { providerId: 2, providerName: "Nurse Maria Garcia" }
    },
    {
      id: 3,
      type: "emergency",
      icon: AlertTriangle,
      title: "Emergency Log",
      message: "SOS activated from your account. Location shared with emergency contacts.",
      time: "3 days ago",
      color: "text-red-600",
      navigateTo: "emergency-support", // Navigate to emergency support
      data: { emergencyId: 3, type: "sos" }
    },
    {
      id: 4,
      type: "appointment",
      icon: Calendar,
      title: "New Service Available",
      message: "New physical therapy services are now available in your area.",
      time: "1 week ago",
      color: "text-blue-600",
      navigateTo: "provider-profile", // Navigate to booking page
      data: { serviceType: "physical-therapy" }
    },
  ]

  const handleNotificationClick = (notification: any) => {
    // Navigate to the appropriate screen based on notification type
    if (notification.navigateTo) {
      onNavigate(notification.navigateTo, notification.data)
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
          <h1 className="text-lg font-semibold text-gray-900">Notifications</h1>
        </div>
      </div>

      {/* Notifications List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {notifications.length === 0 ? (
          <div className="text-center text-gray-500 py-10">No new notifications.</div>
        ) : (
          notifications.map((notification) => (
            <Card 
              key={notification.id} 
              className="border-l-4 border-l-blue-500 cursor-pointer hover:shadow-md transition-shadow active:scale-95"
              onClick={() => handleNotificationClick(notification)}
            >
              <CardContent className="p-4 flex items-start space-x-3">
                <div
                  className={`p-2 rounded-full bg-blue-100 ${notification.color.replace("text-", "bg-").replace("-600", "-100")}`}
                >
                  <notification.icon className={`h-5 w-5 ${notification.color}`} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{notification.title}</h3>
                  <p className="text-sm text-gray-700 mt-1">{notification.message}</p>
                  <p className="text-xs text-gray-500 mt-2">{notification.time}</p>
                </div>
                {/* Add a subtle arrow to indicate it's clickable */}
                <div className="text-gray-400">
                  <ArrowLeft className="h-4 w-4 transform rotate-180" />
                </div>
              </CardContent>
            </Card>
          ))
        )}
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
