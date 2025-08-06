"use server"

// This is a simulated in-memory store for OTPs.
// In a real application, you would use a database (e.g., Redis, PostgreSQL)
// or a dedicated authentication service (e.g., Firebase Auth, Supabase Auth, Auth0).
const otpStore: Record<string, { otp: string; expiresAt: number }> = {}

const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString() // 6-digit OTP

export async function sendOtp(phoneNumber: string) {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  if (!phoneNumber) {
    return { success: false, message: "Phone number is required." }
  }

  const otp = generateOtp()
  const expiresAt = Date.now() + 5 * 60 * 1000 // OTP valid for 5 minutes

  otpStore[phoneNumber] = { otp, expiresAt }

  console.log(`Simulated OTP for ${phoneNumber}: ${otp}`) // Log OTP for demonstration
  return { success: true, message: `OTP sent to ${phoneNumber}. OTP: ${otp}` } // Include OTP in message for demo
}

export async function verifyOtp(phoneNumber: string, otp: string) {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  if (!phoneNumber || !otp) {
    return { success: false, message: "Phone number and OTP are required." }
  }

  const storedOtpData = otpStore[phoneNumber]

  if (!storedOtpData) {
    return { success: false, message: "No OTP found for this number. Please request a new one." }
  }

  if (storedOtpData.expiresAt < Date.now()) {
    delete otpStore[phoneNumber] // Clear expired OTP
    return { success: false, message: "OTP has expired. Please request a new one." }
  }

  if (storedOtpData.otp === otp) {
    delete otpStore[phoneNumber] // OTP consumed
    return { success: true, message: "OTP verified successfully!" }
  } else {
    return { success: false, message: "Invalid OTP. Please try again." }
  }
}

export async function registerUser(phoneNumber: string, name: string) {
  // Simulate user registration in a database
  await new Promise((resolve) => setTimeout(resolve, 1500))
  console.log(`Simulated user registration: Name - ${name}, Phone - ${phoneNumber}`)
  return { success: true, message: "User registered successfully!" }
}

export async function loginUser(phoneNumber: string) {
  // Simulate user login (e.g., fetching user data, setting session)
  await new Promise((resolve) => setTimeout(resolve, 1500))
  console.log(`Simulated user login: Phone - ${phoneNumber}`)
  return { success: true, message: "User logged in successfully!" }
}
