"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Star,
  MapPin,
  Shield,
  MessageCircle,
  Award,
  Calendar,
  Home,
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react"

interface ProviderProfileProps {
  onNavigate: (screen: string) => void
}

export default function ProviderProfile({ onNavigate }: ProviderProfileProps) {
  const provider = {
    name: "Dr. Sarah Johnson",
    specialty: "Family Medicine",
    rating: 4.9,
    reviews: 127,
    distance: "2.3 km",
    experience: "8 years",
    languages: ["English", "Spanish"],
    price: "$80/visit",
    availability: "Available now",
    verified: true,
    bio: "Board-certified family physician with extensive experience in home healthcare. Specializes in preventive care, chronic disease management, and geriatric medicine. My passion is to provide compassionate and comprehensive care to families in the comfort of their homes.",
    services: ["General Consultation", "Health Checkup", "Chronic Care", "Preventive Care", "Pediatric Care"],
    certifications: [
      "MD - Johns Hopkins University",
      "Board Certified Family Medicine (ABFM)",
      "Advanced Cardiac Life Support (ACLS)",
    ],
    social: {
      facebook: "sarahjohnsonmd",
      instagram: "drsarah_johnson",
      twitter: "DrSarahJ",
    },
    education: [
      { degree: "MD", institution: "Johns Hopkins University School of Medicine", year: 2015 },
      { degree: "B.S. Biology", institution: "University of California, Berkeley", year: 2011 },
    ],
    awards: ["Patient's Choice Award 2022", "Top Doctor in Home Healthcare 2023"],
  }

  const reviews = [
    {
      id: 1,
      name: "Emily R.",
      rating: 5,
      comment:
        "Excellent care and very professional. Highly recommend! Dr. Johnson was incredibly thorough and made me feel at ease.",
      date: "2 days ago",
    },
    {
      id: 2,
      name: "Michael T.",
      rating: 5,
      comment:
        "Dr. Johnson was thorough and caring. Great bedside manner. She took the time to explain everything clearly.",
      date: "1 week ago",
    },
    {
      id: 3,
      name: "Lisa M.",
      rating: 4,
      comment: "Very knowledgeable and punctual. Will book again. The visit was efficient and effective.",
      date: "2 weeks ago",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 py-4 shadow-sm">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="icon" onClick={() => onNavigate("consumer-home")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold text-gray-900">Provider Profile</h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Provider Info */}
        <div className="bg-white px-4 py-6">
          <div className="flex items-start space-x-4">
            <div className="bg-blue-100 rounded-full h-20 w-20 flex items-center justify-center flex-shrink-0">
              <span className="text-2xl font-semibold text-blue-600">SJ</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h2 className="text-xl font-semibold text-gray-900">{provider.name}</h2>
                {provider.verified && <Shield className="h-5 w-5 text-green-500" />}
              </div>
              <p className="text-gray-600 mb-2">{provider.specialty}</p>
              <div className="flex items-center space-x-4 mb-3">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium ml-1">{provider.rating}</span>
                  <span className="text-sm text-gray-500 ml-1">({provider.reviews} reviews)</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600 ml-1">{provider.distance}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="default" className="bg-green-100 text-green-800">
                  {provider.availability}
                </Badge>
                <Badge variant="outline">{provider.experience}</Badge>
              </div>
            </div>
          </div>
          {/* Social Links */}
          <div className="flex space-x-4 mt-4 justify-center">
            {provider.social.facebook && (
              <a
                href={`https://facebook.com/${provider.social.facebook}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook profile"
              >
                <Facebook className="h-6 w-6 text-blue-700 hover:text-blue-800" />
              </a>
            )}
            {provider.social.instagram && (
              <a
                href={`https://instagram.com/${provider.social.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram profile"
              >
                <Instagram className="h-6 w-6 text-pink-600 hover:text-pink-700" />
              </a>
            )}
            {provider.social.twitter && (
              <a
                href={`https://twitter.com/${provider.social.twitter}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter profile"
              >
                <Twitter className="h-6 w-6 text-blue-400 hover:text-blue-500" />
              </a>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="px-4 py-4">
          <div className="grid grid-cols-2 gap-3">
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => onNavigate("payment-negotiation")}>
              <Calendar className="h-4 w-4 mr-2" />
              Book Now - {provider.price}
            </Button>
            <Button variant="outline" onClick={() => onNavigate("chat")}>
              <MessageCircle className="h-4 w-4 mr-2" />
              Message
            </Button>
          </div>
        </div>

        {/* About */}
        <Card className="mx-4 mb-4">
          <CardHeader>
            <CardTitle className="text-lg">About</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 text-sm leading-relaxed">{provider.bio}</p>
            <div className="mt-4">
              <h4 className="font-medium text-gray-900 mb-2">Languages</h4>
              <div className="flex flex-wrap gap-2">
                {provider.languages.map((lang) => (
                  <Badge key={lang} variant="secondary">
                    {lang}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Education */}
        <Card className="mx-4 mb-4">
          <CardHeader>
            <CardTitle className="text-lg">Education</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {provider.education.map((edu, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-700 font-medium">{edu.degree}</span>
                  <span className="text-sm text-gray-600">
                    from {edu.institution} ({edu.year})
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Services */}
        <Card className="mx-4 mb-4">
          <CardHeader>
            <CardTitle className="text-lg">Services Offered</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              {provider.services.map((service) => (
                <div key={service} className="flex items-center space-x-2">
                  <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
                  <span className="text-sm text-gray-700">{service}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Certifications */}
        <Card className="mx-4 mb-4">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Award className="h-5 w-5 mr-2" />
              Certifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {provider.certifications.map((cert) => (
                <div key={cert} className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-gray-700">{cert}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Awards */}
        {provider.awards.length > 0 && (
          <Card className="mx-4 mb-4">
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Star className="h-5 w-5 mr-2 text-yellow-500" />
                Awards & Recognition
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                {provider.awards.map((award, index) => (
                  <li key={index}>{award}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {/* Reviews */}
        <Card className="mx-4 mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Recent Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="border-b border-gray-100 last:border-b-0 pb-4 last:pb-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-sm">{review.name}</span>
                      <div className="flex">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="h-3 w-3 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                    <span className="text-xs text-gray-500">{review.date}</span>
                  </div>
                  <p className="text-sm text-gray-600">{review.comment}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
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
