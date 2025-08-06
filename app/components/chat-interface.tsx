"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Send, Phone, Video, MoreVertical, Shield, Home } from "lucide-react"

interface ChatInterfaceProps {
  onNavigate: (screen: string) => void
}

export default function ChatInterface({ onNavigate }: ChatInterfaceProps) {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "provider",
      content:
        "Hello! I received your service request. I can be there in about 15 minutes. Is that convenient for you?",
      time: "2:45 PM",
      type: "text",
    },
    {
      id: 2,
      sender: "user",
      content: "Yes, that works perfectly. Thank you!",
      time: "2:46 PM",
      type: "text",
    },
    {
      id: 3,
      sender: "provider",
      content: "Great! I'm on my way now. I have all the necessary equipment with me.",
      time: "2:50 PM",
      type: "text",
    },
    {
      id: 4,
      sender: "system",
      content: "Dr. Sarah Johnson is now on the way to your location",
      time: "2:50 PM",
      type: "system",
    },
    {
      id: 5,
      sender: "user",
      content: "Perfect! See you soon.",
      time: "2:51 PM",
      type: "text",
    },
  ])

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        sender: "user" as const,
        content: message,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        type: "text" as const,
      }
      setMessages([...messages, newMessage])
      setMessage("")
    }
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
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 rounded-full h-10 w-10 flex items-center justify-center">
                <span className="font-semibold text-blue-600 text-sm">SJ</span>
              </div>
              <div>
                <h1 className="font-semibold text-gray-900">Dr. Sarah Johnson</h1>
                <div className="flex items-center space-x-1">
                  <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Online</span>
                  <Shield className="h-3 w-3 text-green-500 ml-1" />
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon">
              <Phone className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Video className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Security Notice */}
      <div className="px-4 py-2">
        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
          <div className="flex items-center space-x-2">
            <Shield className="h-4 w-4 text-green-600" />
            <span className="text-sm text-green-800">End-to-end encrypted conversation</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id}>
            {msg.type === "system" ? (
              <div className="text-center">
                <div className="bg-gray-100 text-gray-600 text-sm px-3 py-2 rounded-full inline-block">
                  {msg.content}
                </div>
                <p className="text-xs text-gray-500 mt-1">{msg.time}</p>
              </div>
            ) : (
              <div className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-xs lg:max-w-md ${
                    msg.sender === "user" ? "bg-blue-600 text-white" : "bg-white text-gray-900 border border-gray-200"
                  } rounded-lg px-4 py-2 shadow-sm`}
                >
                  <p className="text-sm">{msg.content}</p>
                  <p className={`text-xs mt-1 ${msg.sender === "user" ? "text-blue-100" : "text-gray-500"}`}>
                    {msg.time}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="px-4 py-2">
        <div className="flex space-x-2 overflow-x-auto">
          <Button variant="outline" size="sm" className="whitespace-nowrap bg-transparent">
            Share Location
          </Button>
          <Button variant="outline" size="sm" className="whitespace-nowrap bg-transparent">
            Reschedule
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="whitespace-nowrap bg-transparent"
            onClick={() => onNavigate("emergency-support")}
          >
            Emergency
          </Button>
        </div>
      </div>

      {/* Message Input */}
      <div className="bg-white border-t border-gray-200 px-4 py-4">
        <div className="flex items-center space-x-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1"
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <Button onClick={handleSendMessage} disabled={!message.trim()} className="bg-blue-600 hover:bg-blue-700">
            <Send className="h-4 w-4" />
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
