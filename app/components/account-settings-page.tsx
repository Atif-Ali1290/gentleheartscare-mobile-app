import React, { useState, useEffect } from "react"

interface AccountSettingsPageProps {
  onNavigate?: (screen: string, data?: any) => void
  onSave?: (settings: any) => void
  user?: {
    name?: string
    email?: string
    phoneNumber?: string
    dob?: string
    gender?: string
    address?: string
  } | null
}

const defaultData = {
  fullName: "",
  email: "",
  phone: "",
  dob: "",
  gender: "Female",
  address: ""
}

export default function AccountSettingsPage({ onNavigate, onSave, user }: AccountSettingsPageProps) {
  // Pre-fill with user data if available
  const [form, setForm] = useState({ ...defaultData })
  const [editFields, setEditFields] = useState({ ...defaultData })
  const [isEditing, setIsEditing] = useState(true)

  useEffect(() => {
    if (user) {
      setForm({
        fullName: user.name || "",
        email: user.email || "",
        phone: user.phoneNumber || "",
        dob: user.dob || "",
        gender: user.gender || "Female",
        address: user.address || ""
      })
      setEditFields({
        fullName: user.name || "",
        email: user.email || "",
        phone: user.phoneNumber || "",
        dob: user.dob || "",
        gender: user.gender || "Female",
        address: user.address || ""
      })
    }
  }, [user])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setEditFields(f => ({ ...f, [name]: value }))
  }

  const handleCancel = () => {
    setEditFields(form)
    setIsEditing(false)
    if (onNavigate) onNavigate("user-profile")
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setForm(editFields)
    setIsEditing(false)
    if (onSave) {
      // Map fields to user object keys
      onSave({
        name: editFields.fullName,
        email: editFields.email,
        phoneNumber: editFields.phone,
        dob: editFields.dob,
        gender: editFields.gender,
        address: editFields.address
      })
    }
    if (onNavigate) onNavigate("consumer-home")
  }

  return (
    <div className="max-w-md mx-auto p-4 sm:p-6 bg-white min-h-screen flex flex-col items-center">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 mt-8 w-full text-center">Account Settings</h2>
      <form onSubmit={handleSave} className="w-full space-y-5">
        {/* Full Name */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={editFields.fullName}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-200"
            required
          />
        </div>
        {/* Email */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={editFields.email}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-200"
            placeholder="Email (optional)"
          />
        </div>
        {/* Phone Number */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={editFields.phone}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-200"
            required
          />
        </div>
        {/* Date of Birth */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Date of Birth</label>
          <input
            type="date"
            name="dob"
            value={editFields.dob}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-200"
            required
          />
        </div>
        {/* Gender */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Gender</label>
          <select
            name="gender"
            value={editFields.gender}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-200"
            required
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        {/* Address */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Address <span className="text-xs text-gray-400">(optional)</span></label>
          <textarea
            name="address"
            value={editFields.address}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-200"
            rows={2}
            placeholder="Address (optional)"
          />
        </div>
        {/* Buttons */}
        <div className="flex space-x-3 mt-8 justify-center">
          <button
            type="submit"
            className="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-red-700 transition"
          >
            Save Changes
          </button>
          <button
            type="button"
            className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-semibold shadow hover:bg-gray-300 transition"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
