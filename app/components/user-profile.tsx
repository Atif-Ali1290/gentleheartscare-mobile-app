import React, { useState, useEffect } from "react"
import { Pencil, User, Mail, Phone, Shield, Info, Settings, Lock, LogOut } from "lucide-react"

interface UserProfileProps {
  user?: {
    name: string
    phoneNumber: string
    email?: string
    role: string
    about?: string
  } | null,
  onNavigate?: (screen: string, data?: any) => void
}

export default function UserProfile({ user: userProp, onNavigate }: UserProfileProps) {
  // Use prop if provided, otherwise fallback to dummy data
  const [user, setUser] = useState({
    name: userProp?.name || "Jane Doe",
    phone: userProp?.phoneNumber || "+1234567890",
    email: userProp?.email || "",
    role: userProp?.role ? (userProp.role.charAt(0).toUpperCase() + userProp.role.slice(1)) : "Provider",
    about: userProp?.about || "Passionate healthcare provider with 5+ years of experience in home care. Dedicated to improving patient well-being and comfort."
  })

  useEffect(() => {
    if (userProp) {
      setUser({
        name: userProp.name,
        phone: userProp.phoneNumber,
        email: userProp.email || "",
        role: userProp.role ? (userProp.role.charAt(0).toUpperCase() + userProp.role.slice(1)) : "Provider",
        about: userProp.about || "Passionate healthcare provider with 5+ years of experience in home care. Dedicated to improving patient well-being and comfort."
      })
    }
  }, [userProp])

  const [isEditing, setIsEditing] = useState(false)
  const [editFields, setEditFields] = useState({
    name: user.name,
    email: user.email,
    about: user.about
  })
  const [error, setError] = useState("")

  const handleEdit = () => {
    setEditFields({ name: user.name, email: user.email, about: user.about })
    setError("")
    setIsEditing(true)
  }
  const handleCancel = () => {
    setIsEditing(false)
    setError("")
  }
  const handleSave = () => {
    setUser({ ...user, ...editFields })
    setIsEditing(false)
    setError("")
  }

  return (
    <div className="max-w-md mx-auto p-4 sm:p-6 bg-white min-h-screen flex flex-col items-center">
      {/* Profile Picture & Edit */}
      <div className="relative mt-6 mb-4">
        <div className="w-28 h-28 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 text-5xl shadow-md">
          <User className="w-16 h-16" />
        </div>
        <button className="absolute bottom-2 right-2 bg-red-600 text-white rounded-full p-2 shadow hover:bg-red-700 transition">
          <Pencil className="w-4 h-4" />
        </button>
      </div>

      {/* User Info */}
      <div className="text-center mb-6 w-full">
        {isEditing ? (
          <>
            <input
              className="w-full border border-gray-200 rounded-lg px-3 py-2 mb-2 text-center text-lg font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-200"
              value={editFields.name}
              onChange={e => setEditFields(f => ({ ...f, name: e.target.value }))}
              placeholder="Name"
            />
            <div className="flex items-center justify-center text-gray-500 text-sm mt-1">
              <Phone className="w-4 h-4 mr-1 text-red-500" />
              <span className="select-all">{user.phone}</span>
            </div>
            <div className="flex items-center justify-center text-gray-500 text-sm mt-1">
              <Mail className="w-4 h-4 mr-1" />
              <input
                className="border border-gray-200 rounded-lg px-2 py-1 w-48 text-center focus:outline-none focus:ring-2 focus:ring-red-200"
                value={editFields.email}
                onChange={e => setEditFields(f => ({ ...f, email: e.target.value }))}
                placeholder="Email (optional)"
                type="email"
              />
            </div>
            <div className="flex items-center justify-center text-xs mt-1">
              <Shield className="w-4 h-4 mr-1 text-red-500" /> {user.role}
            </div>
          </>
        ) : (
          <>
            <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
            <div className="flex items-center justify-center text-gray-500 text-sm mt-1">
              <Phone className="w-4 h-4 mr-1 text-red-500" /> {user.phone}
            </div>
            {user.email && (
              <div className="flex items-center justify-center text-gray-500 text-sm mt-1">
                <Mail className="w-4 h-4 mr-1" /> {user.email}
              </div>
            )}
            <div className="flex items-center justify-center text-xs mt-1">
              <Shield className="w-4 h-4 mr-1 text-red-500" /> {user.role}
            </div>
          </>
        )}
      </div>

      {/* About Me */}
      <div className="w-full bg-red-50 rounded-lg p-4 mb-6">
        <div className="flex items-center mb-2">
          <Info className="w-4 h-4 text-red-400 mr-2" />
          <span className="font-semibold text-gray-800">About Me</span>
        </div>
        {isEditing ? (
          <textarea
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-red-200"
            rows={3}
            value={editFields.about}
            onChange={e => setEditFields(f => ({ ...f, about: e.target.value }))}
            placeholder="About Me"
          />
        ) : (
          <p className="text-gray-700 text-sm">{user.about}</p>
        )}
      </div>

      {/* Editable Options */}
      <div className="w-full flex-1">
        <ul className="divide-y divide-gray-100 rounded-lg bg-white shadow">
          <li className="flex items-center p-4 hover:bg-red-50 cursor-pointer" onClick={handleEdit}>
            <Pencil className="w-5 h-5 text-red-500 mr-3" />
            <span className="text-gray-800">Edit Profile</span>
          </li>
          <li className="flex items-center p-4 hover:bg-red-50 cursor-pointer" onClick={() => onNavigate && onNavigate("account-settings")}> 
            <Settings className="w-5 h-5 text-gray-500 mr-3" />
            <span className="text-gray-800">Account Settings</span>
          </li>
          <li className="flex items-center p-4 hover:bg-red-50 cursor-pointer">
            <Shield className="w-5 h-5 text-gray-500 mr-3" />
            <span className="text-gray-800">Privacy Settings</span>
          </li>
          <li className="flex items-center p-4 hover:bg-red-50 cursor-pointer">
            <Lock className="w-5 h-5 text-gray-500 mr-3" />
            <span className="text-gray-800">Change Password</span>
          </li>
          <li className="flex items-center p-4 hover:bg-red-50 cursor-pointer">
            <LogOut className="w-5 h-5 text-gray-500 mr-3" />
            <span className="text-gray-800">Log Out</span>
          </li>
        </ul>
        {isEditing && (
          <>
            {error && <div className="text-red-600 text-sm mt-4 text-center">{error}</div>}
            <div className="flex space-x-3 mt-6 justify-center">
              <button
                className="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-red-700 transition"
                onClick={handleSave}
              >
                Save
              </button>
              <button
                className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-semibold shadow hover:bg-gray-300 transition"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
