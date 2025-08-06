"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, DollarSign, Clock, MapPin, CreditCard, Wallet, Banknote, MessageCircle, Home } from "lucide-react"

interface PaymentNegotiationProps {
  onNavigate: (screen: string) => void
}

export default function PaymentNegotiation({ onNavigate }: PaymentNegotiationProps) {
  const [proposedAmount, setProposedAmount] = useState("80")
  const [message, setMessage] = useState("")
  const [selectedPayment, setSelectedPayment] = useState("card")

  const serviceDetails = {
    provider: "Dr. Sarah Johnson",
    service: "General Consultation",
    duration: "30-60 minutes",
    distance: "2.3 km",
    originalPrice: 80,
    suggestedPrice: 75,
  }

  const paymentMethods = [
    { id: "card", name: "Credit/Debit Card", icon: CreditCard, details: "**** 1234" },
    { id: "wallet", name: "Digital Wallet", icon: Wallet, details: "PayPal, Apple Pay" },
    { id: "cash", name: "Cash Payment", icon: Banknote, details: "Pay on arrival" },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 py-4 shadow-sm">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="icon" onClick={() => onNavigate("consumer-home")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold text-gray-900">Payment & Booking</h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Service Summary */}
        <Card className="mx-4 mt-4">
          <CardHeader>
            <CardTitle className="text-lg">Service Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Provider</span>
                <span className="font-medium">{serviceDetails.provider}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Service</span>
                <span className="font-medium">{serviceDetails.service}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Duration</span>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-gray-400 mr-1" />
                  <span className="font-medium">{serviceDetails.duration}</span>
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Distance</span>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                  <span className="font-medium">{serviceDetails.distance}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Price Negotiation */}
        <Card className="mx-4 mt-4">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <DollarSign className="h-5 w-5 mr-2" />
              Price Proposal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Provider's Rate</span>
                <span className="text-xl font-bold text-gray-900">${serviceDetails.originalPrice}</span>
              </div>

              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                <span className="text-blue-800">Suggested Price</span>
                <span className="text-xl font-bold text-blue-600">${serviceDetails.suggestedPrice}</span>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Offer ($)</label>
                <Input
                  type="number"
                  value={proposedAmount}
                  onChange={(e) => setProposedAmount(e.target.value)}
                  placeholder="Enter your offer"
                  className="text-lg font-medium"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message (Optional)</label>
                <Textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Add a message to your proposal..."
                  rows={3}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Method */}
        <Card className="mx-4 mt-4">
          <CardHeader>
            <CardTitle className="text-lg">Payment Method</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  className={`flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedPayment === method.id ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:bg-gray-50"
                  }`}
                  onClick={() => setSelectedPayment(method.id)}
                >
                  <div className={`p-2 rounded-full ${selectedPayment === method.id ? "bg-blue-100" : "bg-gray-100"}`}>
                    <method.icon
                      className={`h-5 w-5 ${selectedPayment === method.id ? "text-blue-600" : "text-gray-600"}`}
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{method.name}</p>
                    <p className="text-sm text-gray-600">{method.details}</p>
                  </div>
                  <div
                    className={`h-4 w-4 rounded-full border-2 ${
                      selectedPayment === method.id ? "border-blue-500 bg-blue-500" : "border-gray-300"
                    }`}
                  >
                    {selectedPayment === method.id && (
                      <div className="h-full w-full rounded-full bg-white scale-50"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Terms */}
        <div className="px-4 mt-4 mb-6">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-medium text-yellow-800 mb-2">Important Notes</h4>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• Payment is processed after service completion</li>
              <li>• You can cancel up to 30 minutes before arrival</li>
              <li>• Provider may accept, decline, or counter your offer</li>
              <li>• Emergency services have fixed pricing</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="bg-white border-t border-gray-200 px-4 py-4">
        <div className="space-y-3">
          <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={() => onNavigate("map-tracking")}>
            Send Proposal - ${proposedAmount}
          </Button>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" onClick={() => onNavigate("chat")}>
              <MessageCircle className="h-4 w-4 mr-2" />
              Chat First
            </Button>
            <Button variant="outline">Book at ${serviceDetails.originalPrice}</Button>
          </div>
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
