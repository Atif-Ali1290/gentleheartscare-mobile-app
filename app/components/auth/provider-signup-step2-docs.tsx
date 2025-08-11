"use client"

import { Input } from "@/components/ui/input"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { ArrowLeft, UploadCloud, FileText, CheckCircle } from "lucide-react"

interface ProviderSignupStep2DocsProps {
  onNavigate: (screen: string, data?: any) => void
}

export default function ProviderSignupStep2Docs({ onNavigate }: ProviderSignupStep2DocsProps) {
  const [medicalLicense, setMedicalLicense] = useState<File | null>(null)
  const [idProof, setIdProof] = useState<File | null>(null)
  const [certification, setCertification] = useState<File | null>(null)

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<File | null>>,
  ) => {
    if (e.target.files && e.target.files[0]) {
      setter(e.target.files[0])
    }
  }

  const handleSubmit = () => {
    if (!medicalLicense || !idProof || !certification) {
      alert("Please upload all required documents.")
      return
    }
    alert("Documents uploaded! Your application is now under review. (Simulated)")
    onNavigate("provider-verification-status")
  }

  const DocumentUploadField = ({
    label,
    file,
    setter,
  }: { label: string; file: File | null; setter: React.Dispatch<React.SetStateAction<File | null>> }) => (
    <div className="space-y-2">
      <Label className="text-base font-medium text-gray-700 flex items-center">
        <FileText className="h-4 w-4 mr-2 text-gray-500" />
        {label}
      </Label>
      <div className="flex items-center space-x-3">
        <Input
          type="file"
          accept=".pdf,.jpg,.png"
          onChange={(e) => handleFileChange(e, setter)}
          className="flex-1 block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100"
        />
        {file && <CheckCircle className="h-6 w-6 text-green-500" />}
      </div>
      {file && <p className="text-sm text-gray-600">Uploaded: {file.name}</p>}
    </div>
  )

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-red-50 to-white p-6">
      {/* Header with Back Button */}
      <div className="flex items-center mb-8">
        <Button variant="ghost" size="icon" onClick={() => onNavigate("provider-signup-step1")}
          className="text-red-600 hover:bg-red-100">
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-2xl font-bold text-red-700 ml-4">Provider Sign Up (2/2)</h1>
      </div>

      <div className="flex-1 overflow-y-auto space-y-6 pb-8">
        <div className="text-center mb-6">
          <UploadCloud className="h-16 w-16 text-red-600 mx-auto mb-4" />
          <p className="text-lg text-red-700">Upload your credentials for verification.</p>
          <p className="text-sm text-gray-500">Accepted formats: PDF, JPG, PNG</p>
        </div>

        <DocumentUploadField
          label="Medical License / Professional ID"
          file={medicalLicense}
          setter={setMedicalLicense}
        />
        <DocumentUploadField
          label="Government Issued ID (e.g., Passport, Driver's License)"
          file={idProof}
          setter={setIdProof}
        />
        <DocumentUploadField
          label="Relevant Certifications (e.g., CPR, Specialty Certs)"
          file={certification}
          setter={setCertification}
        />
      </div>

      <div className="mt-auto py-4">
        <Button className="w-full h-12 bg-red-600 hover:bg-red-700 text-lg font-semibold text-white shadow" onClick={handleSubmit}>
          Submit for Verification
        </Button>
      </div>
    </div>
  )
}
