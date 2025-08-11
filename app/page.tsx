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
import UserProfile from "./components/user-profile"
import AccountSettingsPage from "./components/account-settings-page"

interface User {
  name: string
  phoneNumber: string
  role: "consumer" | "provider"
}

export default function GentleHeartsCareApp() {
  const [currentScreen, setCurrentScreen] = useState("auth-screen") // Initial screen is AuthScreen
  const [userRole, setUserRole] = useState<"consumer" | "provider" | null>(null)
  const [screenData, setScreenData] = useState<any>(null) // Store data to pass between screens
  const [user, setUser] = useState<User | null>(null) // Store user information
  // Add a new state to track if account settings are completed
  const [accountSettingsComplete, setAccountSettingsComplete] = useState(false)

  const navigateToScreen = (screen: string, data?: any) => {
    setCurrentScreen(screen)
    setScreenData(data || null)
  }

  const setUserData = (userData: User) => {
    setUser(userData)
    // If user is a consumer and not yet completed account settings, go to account settings page
    if (userData.role === "consumer" && !accountSettingsComplete) {
      setCurrentScreen("account-settings")
    } else {
      setCurrentScreen(userData.role === "consumer" ? "consumer-home" : "provider-dashboard")
    }
  }

  // Handler for AccountSettingsPage to save and update user info
  const handleAccountSettingsSave = (settings: any) => {
    setUser((prev) => prev ? { ...prev, ...settings } : settings)
    setAccountSettingsComplete(true)
    setCurrentScreen("consumer-home")
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case "auth-screen":
        return <AuthScreen onNavigate={navigateToScreen} />
      case "role-selection":
        return (
          <RoleSelectionScreen
            onRoleSelect={(role) => {
              setUserRole(role)
              navigateToScreen(role === "consumer" ? "consumer-auth" : "provider-signup-step1")
            }}
            onNavigate={navigateToScreen}
          />
        )
      case "consumer-auth":
        return <ConsumerAuth onNavigate={navigateToScreen} onUserLogin={setUserData} />
      case "provider-signup-step1":
        return <ProviderSignupStep1 onNavigate={navigateToScreen} />
      case "provider-signup-step2-docs":
        return <ProviderSignupStep2Docs onNavigate={navigateToScreen} />
      case "provider-verification-status":
        return <ProviderVerificationStatus onNavigate={navigateToScreen} />
      case "consumer-home":
        return <ConsumerHome onNavigate={navigateToScreen} user={user} />
      case "provider-profile":
        return <ProviderProfile onNavigate={navigateToScreen} data={screenData} />
      case "map-tracking":
        return <MapTracking onNavigate={navigateToScreen} />
      case "payment-negotiation":
        return <PaymentNegotiation onNavigate={navigateToScreen} />
      case "chat":
        return <ChatInterface onNavigate={navigateToScreen} />
      case "provider-dashboard":
        return <ProviderDashboard onNavigate={navigateToScreen} />
      case "emergency-support":
        return <EmergencySupport onNavigate={navigateToScreen} data={screenData} />
      case "notifications-page":
        return <NotificationsPage onNavigate={navigateToScreen} />
      case "my-appointments": // New case for My Appointments screen
        return <MyAppointments onNavigate={navigateToScreen} data={screenData} />
      case "user-profile":
        return <UserProfile user={user} onNavigate={navigateToScreen} />
      case "account-settings":
        // If screenData is present (from signup), use it as user prop
        return <AccountSettingsPage onNavigate={navigateToScreen} onSave={handleAccountSettingsSave} user={screenData || user} />
      default:
        return <AuthScreen onNavigate={navigateToScreen} />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile App Container */}
      <div className="max-w-md mx-auto bg-white min-h-screen shadow-xl">{renderScreen()}</div>
    </div>
  )
}
