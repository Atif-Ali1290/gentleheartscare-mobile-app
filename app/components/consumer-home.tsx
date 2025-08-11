"use client"

import { useState, useMemo, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Bell,
  Heart,
  Stethoscope,
  Calendar,
  FileText,
  PhoneCall,
  BellRing,
  Search,
  MapPin,
  Star,
  User,
  MessageCircle,
  Brain,
  Activity,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

interface User {
  name: string
  phoneNumber: string
  role: "consumer" | "provider"
}

interface ConsumerHomeProps {
  onNavigate: (screen: string, data?: any) => void
  user?: User | null
}

export default function ConsumerHome({ onNavigate, user }: ConsumerHomeProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [showAllProviders, setShowAllProviders] = useState(false)

  // Reset showAllProviders when search query changes
  useEffect(() => {
    if (searchQuery.trim()) {
      setShowAllProviders(false)
    }
  }, [searchQuery])

  const menuItems = [
    { name: "Book Caregiver", icon: Stethoscope, screen: "provider-profile" }, // Reusing provider-profile for booking flow
    { name: "My Appointments", icon: Calendar, screen: "my-appointments" }, // Placeholder for future screen
    { name: "Health Records", icon: FileText, screen: "health-records" }, // Placeholder for future screen
    { name: "Notifications", icon: BellRing, screen: "notifications-page" }, // New menu item
  ]

  const services = [
    { id: 1, name: "Doctor Visit", icon: Stethoscope, price: "From $80", time: "30-60 min", category: "doctor" },
    { id: 2, name: "Nursing Care", icon: Heart, price: "From $45", time: "60-120 min", category: "nurse" },
    { id: 3, name: "PhysioTherapy", icon: Activity, price: "From $65", time: "45-90 min", category: "physiotherapy" },
    { id: 4, name: "Psychological Counseling", icon: Brain, price: "From $100", time: "60-90 min", category: "psychologist" },
    { id: 5, name: "Occupational Therapy", icon: Activity, price: "From $70", time: "45-75 min", category: "occupational" },
    { id: 6, name: "Speech Therapy", icon: MessageCircle, price: "From $60", time: "30-60 min", category: "speech" },
  ]

  const recentProviders = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "Family Medicine",
      rating: 4.9,
      distance: "2.3 km",
      available: true,
      category: "doctor"
    },
    { 
      id: 2, 
      name: "Nurse Maria Garcia", 
      specialty: "Home Care", 
      rating: 4.8, 
      distance: "1.8 km", 
      available: true,
      category: "nurse"
    },
    {
      id: 3,
      name: "Dr. Emily Chen",
      specialty: "PhysioTherapy",
      rating: 4.7,
      distance: "3.1 km",
      available: true,
      category: "physiotherapy"
    },
    {
      id: 4,
      name: "Dr. Michael Rodriguez",
      specialty: "Clinical Psychology",
      rating: 4.9,
      distance: "2.7 km",
      available: true,
      category: "psychologist"
    },
  ]

  // Filter services and providers based on search query
  const filteredServices = useMemo(() => {
    if (!searchQuery.trim()) return services
    const query = searchQuery.toLowerCase()
    return services.filter(service => 
      service.name.toLowerCase().includes(query) ||
      service.category.toLowerCase().includes(query)
    )
  }, [searchQuery])

  const filteredProviders = useMemo(() => {
    if (!searchQuery.trim()) return recentProviders
    const query = searchQuery.toLowerCase()
    return recentProviders.filter(provider => 
      provider.name.toLowerCase().includes(query) ||
      provider.specialty.toLowerCase().includes(query) ||
      provider.category.toLowerCase().includes(query)
    )
  }, [searchQuery])

  // Providers to show (2 by default, all if showAllProviders is true)
  const providersToShow = useMemo(() => {
    if (searchQuery.trim()) {
      // When searching, show all filtered providers
      console.log('Searching - showing all filtered providers:', filteredProviders.length)
      return filteredProviders
    } else {
      // When not searching, show 2 by default or all if showAllProviders is true
      const providers = showAllProviders ? filteredProviders : filteredProviders.slice(0, 2)
      console.log('Not searching - showAllProviders:', showAllProviders, 'showing providers:', providers.length)
      return providers
    }
  }, [searchQuery, showAllProviders, filteredProviders])

  const handleServiceClick = (service: any) => {
    onNavigate("provider-profile", { serviceType: service.category })
  }

  const handleProviderClick = (provider: any) => {
    onNavigate("provider-profile", { providerName: provider.name })
  }

  const handleViewAllClick = () => {
    console.log('View All button clicked! Current state:', showAllProviders)
    setShowAllProviders(!showAllProviders)
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 py-4 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">
              Welcome, {user?.name || "User"}!
            </h1>
            <p className="text-gray-600 text-sm">Your health, our priority.</p>
          </div>
          <Button variant="ghost" size="icon" className="relative" onClick={() => onNavigate("notifications-page")}>
            <Bell className="h-5 w-5" />
            <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              2
            </div>
          </Button>
        </div>
        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input 
            placeholder="Search services or providers..." 
            className="pl-10" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* Search Results */}
        {searchQuery.trim() && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              Search Results for "{searchQuery}"
            </h2>
            
            {/* Services Results */}
            {filteredServices.length > 0 && (
              <div className="mb-4">
                <h3 className="text-md font-medium text-gray-700 mb-2">Services</h3>
                <div className="grid grid-cols-2 gap-3">
                  {filteredServices.map((service) => (
                    <Card
                      key={service.id}
                      className="cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => handleServiceClick(service)}
                    >
                      <CardContent className="p-4">
                        <div className="flex flex-col items-center text-center">
                          <div className="bg-blue-100 p-3 rounded-full mb-3">
                            <service.icon className="h-6 w-6 text-blue-600" />
                          </div>
                          <h3 className="font-medium text-gray-900 mb-1">{service.name}</h3>
                          <p className="text-sm text-blue-600 font-medium">{service.price}</p>
                          <p className="text-xs text-gray-500">{service.time}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Providers Results */}
            {filteredProviders.length > 0 && (
              <div>
                <h3 className="text-md font-medium text-gray-700 mb-2">Providers</h3>
                <div className="space-y-3">
                  {filteredProviders.map((provider) => (
                    <Card
                      key={provider.id}
                      className="cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => handleProviderClick(provider)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3">
                          <div className="bg-gray-200 rounded-full h-12 w-12 flex items-center justify-center">
                            <User className="h-6 w-6 text-gray-600" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h3 className="font-medium text-gray-900">{provider.name}</h3>
                              <Badge variant={provider.available ? "default" : "secondary"} className="text-xs">
                                {provider.available ? "Available" : "Busy"}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600">{provider.specialty}</p>
                            <div className="flex items-center space-x-4 mt-1">
                              <div className="flex items-center">
                                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                <span className="text-sm text-gray-600 ml-1">{provider.rating}</span>
                              </div>
                              <div className="flex items-center">
                                <MapPin className="h-4 w-4 text-gray-400" />
                                <span className="text-sm text-gray-600 ml-1">{provider.distance}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* No Results */}
            {filteredServices.length === 0 && filteredProviders.length === 0 && (
              <div className="text-center text-gray-500 py-8">
                <Search className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No results found for "{searchQuery}"</p>
                <p className="text-sm">Try searching for different keywords</p>
              </div>
            )}
          </div>
        )}

        {/* Quick Actions / Service Categories (when not searching) */}
        {!searchQuery.trim() && (
          <>
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Request Care</h2>
        <div className="grid grid-cols-2 gap-3 mb-6">
          {services.map((service) => (
            <Card
              key={service.id}
              className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleServiceClick(service)}
            >
              <CardContent className="p-4">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-blue-100 p-3 rounded-full mb-3">
                    <service.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-medium text-gray-900 mb-1">{service.name}</h3>
                  <p className="text-sm text-blue-600 font-medium">{service.price}</p>
                  <p className="text-xs text-gray-500">{service.time}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Providers / Available Providers */}
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-gray-900">Available Providers</h2>
          {(() => {
            const shouldShowButton = !searchQuery.trim() && filteredProviders.length > 2
            console.log('Button condition - searchQuery:', searchQuery, 'filteredProviders.length:', filteredProviders.length, 'shouldShowButton:', shouldShowButton)
            return shouldShowButton ? (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleViewAllClick}
                className="text-blue-600 hover:text-blue-800"
              >
                {showAllProviders ? "Show Less" : "View All"}
              </Button>
            ) : null
          })()}
        </div>
        <div className="space-y-3 mb-6">
              {providersToShow.map((provider) => (
            <Card
              key={provider.id}
              className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleProviderClick(provider)}
            >
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-gray-200 rounded-full h-12 w-12 flex items-center justify-center">
                    <User className="h-6 w-6 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900">{provider.name}</h3>
                      <Badge variant={provider.available ? "default" : "secondary"} className="text-xs">
                        {provider.available ? "Available" : "Busy"}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{provider.specialty}</p>
                    <div className="flex items-center space-x-4 mt-1">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600 ml-1">{provider.rating}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600 ml-1">{provider.distance}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
          </>
        )}

        {/* Main Menu Options as Buttons */}
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Quick Access</h2>
        <div className="grid grid-cols-2 gap-4">
          {menuItems.map((item) => (
            <Button
              key={item.name}
              variant="outline"
              className="h-24 flex flex-col items-center justify-center space-y-2 border-blue-200 text-blue-700 hover:bg-blue-50 bg-transparent"
              onClick={() => onNavigate(item.screen)}
            >
              <item.icon className="h-8 w-8" />
              <span className="text-sm font-medium text-center">{item.name}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* SOS Button - Prominent at bottom right */}
      <Button
        variant="destructive"
        size="lg"
        className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-lg flex flex-col items-center justify-center text-white text-xs font-bold"
        onClick={() => onNavigate("emergency-support")}
        aria-label="Emergency SOS"
      >
        <PhoneCall className="h-6 w-6 mb-1" />
        SOS
      </Button>

      {/* Bottom Navigation (Optional, if needed for more complex navigation) */}
      <div className="bg-white border-t border-gray-200 px-4 py-2 mt-4">
        <div className="flex justify-around">
          <Button variant="ghost" size="sm" className="flex-col space-y-1 text-blue-600">
            <Heart className="h-5 w-5" />
            <span className="text-xs">Home</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex-col space-y-1" onClick={() => onNavigate("map-tracking")}>
            <MapPin className="h-5 w-5" />
            <span className="text-xs">Track</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex-col space-y-1" onClick={() => onNavigate("chat")}>
            <MessageCircle className="h-5 w-5" />
            <span className="text-xs">Chat</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex-col space-y-1">
            <User className="h-5 w-5" />
            <span className="text-xs">Profile</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
