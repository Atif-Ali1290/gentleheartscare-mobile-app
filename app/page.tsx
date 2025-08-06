"use client"

import { useState } from "react"
import AuthScreen from "./components/auth-screen"
import RoleSelectionScreen from "./components/role-selection-screen"
import ConsumerAuth from "./components/auth/consumer-auth"
import ProviderSignupStep1 from "./components/auth/provider-signup-step1"
import ProviderSignupStep2Docs from "./components/auth/provider-signup-step2-docs"
import ProviderVerificationStatus from "./components/auth/provider-verification-status"
import ConsumerHome from "./components/consumer-home"
import ProviderProfile from "./components/provider-profile"
import MapTracking from "./components/map-tracking"
import PaymentNegotiation from "./components/payment-negotiation"
import ChatInterface from "./components/chat-interface"
import ProviderDashboard from "./components/provider-dashboard"
import EmergencySupport from "./components/emergency-support"
import NotificationsPage from "./components/notifications-page"
import MyAppointments from "./components/my-appointments" // Import the new component

export default function GentleHeartsCareApp() {
  const [currentScreen, setCurrentScreen] = useState("auth-screen") // Initial screen is AuthScreen
  const [userRole, setUserRole] = useState<"consumer" | "provider" | null>(null)

  const renderScreen = () => {
    switch (currentScreen) {
      case "auth-screen":
        return <AuthScreen onNavigate={setCurrentScreen} />
      case "role-selection":
        return (
          <RoleSelectionScreen
            onRoleSelect={(role) => {
              setUserRole(role)
              setCurrentScreen(role === "consumer" ? "consumer-auth" : "provider-signup-step1")
            }}
            onNavigate={setCurrentScreen}
          />
        )
      case "consumer-auth":
        return <ConsumerAuth onNavigate={setCurrentScreen} />
      case "provider-signup-step1":
        return <ProviderSignupStep1 onNavigate={setCurrentScreen} />
      case "provider-signup-step2-docs":
        return <ProviderSignupStep2Docs onNavigate={setCurrentScreen} />
      case "provider-verification-status":
        return <ProviderVerificationStatus onNavigate={setCurrentScreen} />
      case "consumer-home":
        return <ConsumerHome onNavigate={setCurrentScreen} />
      case "provider-profile":
        return <ProviderProfile onNavigate={setCurrentScreen} />
      case "map-tracking":
        return <MapTracking onNavigate={setCurrentScreen} />
      case "payment-negotiation":
        return <PaymentNegotiation onNavigate={setCurrentScreen} />
      case "chat":
        return <ChatInterface onNavigate={setCurrentScreen} />
      case "provider-dashboard":
        return <ProviderDashboard onNavigate={setCurrentScreen} />
      case "emergency-support":
        return <EmergencySupport onNavigate={setCurrentScreen} />
      case "notifications-page":
        return <NotificationsPage onNavigate={setCurrentScreen} />
      case "my-appointments": // New case for My Appointments screen
        return <MyAppointments onNavigate={setCurrentScreen} />
      default:
        return <AuthScreen onNavigate={setCurrentScreen} />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile App Container */}
      <div className="max-w-md mx-auto bg-white min-h-screen shadow-xl">{renderScreen()}</div>
    </div>
  )
}
