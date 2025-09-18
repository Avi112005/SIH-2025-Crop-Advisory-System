"use client"

import type React from "react"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Droplets,
  Wind,
  Sun,
  AlertTriangle,
  TrendingUp,
  Sprout,
  Bug,
  Calendar,
  MapPin,
  ArrowRight,
  Leaf,
  DollarSign,
  MessageCircle,
  Send,
} from "lucide-react"
import Link from "next/link"

const stateDistrictData = {
  Rajasthan: ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Bikaner", "Ajmer", "Alwar"],
  Punjab: ["Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda", "Mohali"],
  Haryana: ["Gurgaon", "Faridabad", "Hisar", "Panipat", "Karnal", "Ambala"],
  "Uttar Pradesh": ["Lucknow", "Kanpur", "Agra", "Varanasi", "Meerut", "Allahabad"],
  Maharashtra: ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad", "Solapur"],
  Gujarat: ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar", "Jamnagar"],
  "Madhya Pradesh": ["Bhopal", "Indore", "Gwalior", "Jabalpur", "Ujjain", "Sagar"],
  Karnataka: ["Bangalore", "Mysore", "Hubli", "Mangalore", "Belgaum", "Gulbarga"],
  "Andhra Pradesh": ["Hyderabad", "Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Kurnool"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Tirunelveli"],
}

const soilTypes = [
  "Alluvial Soil",
  "Black Soil (Regur)",
  "Red Soil",
  "Laterite Soil",
  "Desert Soil",
  "Mountain Soil",
  "Saline Soil",
  "Peaty Soil",
  "Forest Soil",
  "Sandy Soil",
  "Clay Soil",
  "Loamy Soil",
]

const cropOptions = [
  "Wheat",
  "Rice",
  "Cotton",
  "Sugarcane",
  "Maize",
  "Barley",
  "Jowar",
  "Bajra",
  "Ragi",
  "Arhar",
  "Moong",
  "Urad",
  "Chana",
  "Masoor",
  "Groundnut",
  "Mustard",
  "Sunflower",
  "Soybean",
  "Sesame",
  "Potato",
  "Onion",
  "Tomato",
  "Brinjal",
  "Okra",
  "Cabbage",
  "Cauliflower",
  "Carrot",
  "Radish",
]

export default function DashboardPage() {
  const [formData, setFormData] = useState({
    state: "",
    district: "",
    soilType: "",
    previousCrop: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [dashboardData, setDashboardData] = useState({
    location: "Rajasthan, India",
    crops: ["Wheat", "Rice", "Cotton"],
    recommendations: [
      {
        crop: "Wheat Field - Block A",
        advice: "Apply nitrogen fertilizer (20kg/acre). Soil moisture is optimal for nutrient absorption.",
        priority: "High Priority",
        color: "green",
      },
      {
        crop: "Rice Field - Block B",
        advice: "Reduce irrigation by 30%. Expected rainfall in next 2 days will provide sufficient water.",
        priority: "Medium Priority",
        color: "blue",
      },
      {
        crop: "Cotton Field - Block C",
        advice: "Monitor for bollworm activity. Consider preventive spray if temperature exceeds 30°C.",
        priority: "Watch",
        color: "orange",
      },
    ],
  })

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.state || !formData.district || !formData.soilType || !formData.previousCrop) {
      return
    }

    setIsSubmitting(true)

    setTimeout(() => {
      const newLocation = `${formData.district}, ${formData.state}`
      const newRecommendations = [
        {
          crop: `${formData.previousCrop} Field - Block A`,
          advice: `Based on ${formData.soilType.toLowerCase()} and previous ${formData.previousCrop.toLowerCase()} cultivation, apply organic compost (15kg/acre) for soil enrichment.`,
          priority: "High Priority",
          color: "green",
        },
        {
          crop: `Recommended Next Crop - Block B`,
          advice: `Consider planting legumes after ${formData.previousCrop.toLowerCase()} to improve soil nitrogen content in ${formData.soilType.toLowerCase()}.`,
          priority: "Medium Priority",
          color: "blue",
        },
        {
          crop: `Soil Management - ${formData.district}`,
          advice: `${formData.soilType} requires specific pH management. Test soil pH and adjust accordingly for optimal crop yield.`,
          priority: "Important",
          color: "purple",
        },
      ]

      setDashboardData({
        location: newLocation,
        crops: [formData.previousCrop, "Recommended Rotation", "Soil Management"],
        recommendations: newRecommendations,
      })
      setIsSubmitting(false)
    }, 2000)
  }

  const availableDistricts = formData.state
    ? stateDistrictData[formData.state as keyof typeof stateDistrictData] || []
    : []

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container px-4 py-8">
        <Card className="mb-8 border-2 border-primary/20 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sprout className="h-5 w-5 text-primary" />
              Crop Advisory Input
            </CardTitle>
            <CardDescription>Enter your farming details to get personalized recommendations</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">State</label>
                  <Select
                    value={formData.state}
                    onValueChange={(value) => setFormData({ ...formData, state: value, district: "" })}
                  >
                    <SelectTrigger className="transition-all duration-200 hover:border-primary/50 focus:border-primary">
                      <SelectValue placeholder="Select State" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(stateDistrictData).map((state) => (
                        <SelectItem key={state} value={state} className="hover:bg-primary/10">
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">District</label>
                  <Select
                    value={formData.district}
                    onValueChange={(value) => setFormData({ ...formData, district: value })}
                    disabled={!formData.state}
                  >
                    <SelectTrigger className="transition-all duration-200 hover:border-primary/50 focus:border-primary disabled:opacity-50">
                      <SelectValue placeholder="Select District" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableDistricts.map((district) => (
                        <SelectItem key={district} value={district} className="hover:bg-primary/10">
                          {district}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Soil Type</label>
                  <Select
                    value={formData.soilType}
                    onValueChange={(value) => setFormData({ ...formData, soilType: value })}
                  >
                    <SelectTrigger className="transition-all duration-200 hover:border-primary/50 focus:border-primary">
                      <SelectValue placeholder="Select Soil Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {soilTypes.map((soil) => (
                        <SelectItem key={soil} value={soil} className="hover:bg-primary/10">
                          {soil}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Previous Crop</label>
                  <Select
                    value={formData.previousCrop}
                    onValueChange={(value) => setFormData({ ...formData, previousCrop: value })}
                  >
                    <SelectTrigger className="transition-all duration-200 hover:border-primary/50 focus:border-primary">
                      <SelectValue placeholder="Select Previous Crop" />
                    </SelectTrigger>
                    <SelectContent>
                      {cropOptions.map((crop) => (
                        <SelectItem key={crop} value={crop} className="hover:bg-primary/10">
                          {crop}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button
                  type="submit"
                  disabled={
                    !formData.state ||
                    !formData.district ||
                    !formData.soilType ||
                    !formData.previousCrop ||
                    isSubmitting
                  }
                  className="min-w-[120px] transition-all duration-300 hover:scale-105"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Processing...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Send className="h-4 w-4" />
                      Get Recommendations
                    </div>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground transition-all duration-500">{dashboardData.location}</span>
          </div>
          <h1 className="text-3xl font-bold text-balance">Good morning, Farmer!</h1>
          <p className="text-muted-foreground">Here's your personalized farming dashboard for today</p>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Crops</CardTitle>
              <Sprout className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground transition-all duration-500">
                {dashboardData.crops.join(", ")}
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Weather</CardTitle>
              <Sun className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">28°C</div>
              <p className="text-xs text-muted-foreground">Sunny, 65% humidity</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Market Alert</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+12%</div>
              <p className="text-xs text-muted-foreground">Wheat prices up</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
              <Calendar className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">Due this week</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Weather Widget */}
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sun className="h-5 w-5 text-yellow-500" />
                  Weather Forecast
                </CardTitle>
                <CardDescription>5-day weather outlook for your location</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-5 gap-4">
                  {[
                    { day: "Today", temp: "28°C", icon: Sun, desc: "Sunny" },
                    { day: "Tomorrow", temp: "26°C", icon: Droplets, desc: "Light Rain" },
                    { day: "Wed", temp: "24°C", icon: Wind, desc: "Cloudy" },
                    { day: "Thu", temp: "27°C", icon: Sun, desc: "Sunny" },
                    { day: "Fri", temp: "29°C", icon: Sun, desc: "Hot" },
                  ].map((weather, index) => {
                    const Icon = weather.icon
                    return (
                      <div
                        key={index}
                        className="text-center p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                      >
                        <p className="text-sm font-medium mb-2">{weather.day}</p>
                        <Icon className="h-6 w-6 mx-auto mb-2 text-primary" />
                        <p className="text-lg font-bold">{weather.temp}</p>
                        <p className="text-xs text-muted-foreground">{weather.desc}</p>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Crop Recommendations */}
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Leaf className="h-5 w-5 text-green-500" />
                  Today's Recommendations
                </CardTitle>
                <CardDescription>Personalized advice for your crops</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {dashboardData.recommendations.map((rec, index) => (
                  <div
                    key={index}
                    className={`flex items-start gap-3 p-4 rounded-lg border transition-all duration-500 animate-in fade-in slide-in-from-left-5 ${
                      rec.color === "green"
                        ? "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800"
                        : rec.color === "blue"
                          ? "bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800"
                          : rec.color === "orange"
                            ? "bg-orange-50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-800"
                            : "bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-800"
                    }`}
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    <Sprout
                      className={`h-5 w-5 mt-0.5 ${
                        rec.color === "green"
                          ? "text-green-600"
                          : rec.color === "blue"
                            ? "text-blue-600"
                            : rec.color === "orange"
                              ? "text-orange-600"
                              : "text-purple-600"
                      }`}
                    />
                    <div className="flex-1">
                      <h4
                        className={`font-semibold ${
                          rec.color === "green"
                            ? "text-green-800 dark:text-green-200"
                            : rec.color === "blue"
                              ? "text-blue-800 dark:text-blue-200"
                              : rec.color === "orange"
                                ? "text-orange-800 dark:text-orange-200"
                                : "text-purple-800 dark:text-purple-200"
                        }`}
                      >
                        {rec.crop}
                      </h4>
                      <p
                        className={`text-sm mt-1 ${
                          rec.color === "green"
                            ? "text-green-700 dark:text-green-300"
                            : rec.color === "blue"
                              ? "text-blue-700 dark:text-blue-300"
                              : rec.color === "orange"
                                ? "text-orange-700 dark:text-orange-300"
                                : "text-purple-700 dark:text-purple-300"
                        }`}
                      >
                        {rec.advice}
                      </p>
                      <Badge
                        variant="secondary"
                        className={`mt-2 ${
                          rec.color === "green"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : rec.color === "blue"
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                              : rec.color === "orange"
                                ? "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
                                : "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                        }`}
                      >
                        {rec.priority}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Market Prices */}
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-green-500" />
                    Market Prices
                  </CardTitle>
                  <CardDescription>Current rates in your local market</CardDescription>
                </div>
                <Button asChild variant="outline" size="sm">
                  <Link href="/market">
                    View All <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { crop: "Wheat", price: "₹2,150", change: "+12%", trend: "up" },
                    { crop: "Rice", price: "₹3,200", change: "-3%", trend: "down" },
                    { crop: "Cotton", price: "₹5,800", change: "+8%", trend: "up" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary"></div>
                        <span className="font-medium">{item.crop}</span>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">{item.price}/quintal</p>
                        <p className={`text-sm ${item.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                          {item.change}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Alerts */}
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-500" />
                  Alerts & Notifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800">
                  <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-red-800 dark:text-red-200">Pest Alert</p>
                    <p className="text-xs text-red-700 dark:text-red-300">Aphids detected in nearby farms</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800">
                  <Droplets className="h-4 w-4 text-yellow-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">Weather Warning</p>
                    <p className="text-xs text-yellow-700 dark:text-yellow-300">Heavy rain expected tomorrow</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800">
                  <TrendingUp className="h-4 w-4 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-800 dark:text-blue-200">Market Update</p>
                    <p className="text-xs text-blue-700 dark:text-blue-300">Wheat prices increased by 12%</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Crop Growth Progress */}
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sprout className="h-5 w-5 text-green-500" />
                  Crop Growth Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Wheat (Block A)</span>
                    <span className="text-sm text-muted-foreground">75%</span>
                  </div>
                  <Progress value={75} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-1">Flowering stage - 30 days to harvest</p>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Rice (Block B)</span>
                    <span className="text-sm text-muted-foreground">60%</span>
                  </div>
                  <Progress value={60} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-1">Grain filling - 45 days to harvest</p>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Cotton (Block C)</span>
                    <span className="text-sm text-muted-foreground">40%</span>
                  </div>
                  <Progress value={40} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-1">Boll development - 60 days to harvest</p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button asChild className="w-full justify-start bg-transparent" variant="outline">
                  <Link href="/chatbot">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Ask AI Assistant
                  </Link>
                </Button>

                <Button asChild className="w-full justify-start bg-transparent" variant="outline">
                  <Link href="/pest-detection">
                    <Bug className="mr-2 h-4 w-4" />
                    Detect Pest/Disease
                  </Link>
                </Button>

                <Button asChild className="w-full justify-start bg-transparent" variant="outline">
                  <Link href="/market">
                    <TrendingUp className="mr-2 h-4 w-4" />
                    Check Market Prices
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
