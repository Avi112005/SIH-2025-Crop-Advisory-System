"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Upload,
  Camera,
  Bug,
  AlertTriangle,
  CheckCircle,
  X,
  Loader2,
  Eye,
  Leaf,
  Shield,
  Zap,
  Clock,
  MapPin,
} from "lucide-react"

interface DetectionResult {
  id: string
  pestName: string
  confidence: number
  severity: "low" | "medium" | "high"
  cropAffected: string
  description: string
  symptoms: string[]
  treatment: {
    organic: string[]
    chemical: string[]
    preventive: string[]
  }
  timeToAct: string
  image: string
}

const sampleResults: DetectionResult[] = [
  {
    id: "1",
    pestName: "Aphids",
    confidence: 94,
    severity: "medium",
    cropAffected: "Cotton",
    description:
      "Small, soft-bodied insects that feed on plant sap. They can cause yellowing of leaves, stunted growth, and transmit viral diseases.",
    symptoms: ["Yellowing leaves", "Sticky honeydew", "Curled leaves", "Stunted growth"],
    treatment: {
      organic: ["Neem oil spray", "Ladybug release", "Soap water solution", "Garlic spray"],
      chemical: ["Imidacloprid", "Thiamethoxam", "Acetamiprid"],
      preventive: ["Regular monitoring", "Remove weeds", "Balanced fertilization", "Proper spacing"],
    },
    timeToAct: "2-3 days",
    image: "/aphids-on-cotton-plant-leaves.jpg",
  },
]

const commonPests = [
  {
    name: "Bollworm",
    crop: "Cotton",
    severity: "high",
    image: "/bollworm-pest-on-cotton.jpg",
  },
  {
    name: "Stem Borer",
    crop: "Rice",
    severity: "high",
    image: "/stem-borer-pest-on-rice.jpg",
  },
  {
    name: "Leaf Miner",
    crop: "Tomato",
    severity: "medium",
    image: "/leaf-miner-pest-on-tomato.jpg",
  },
  {
    name: "Whitefly",
    crop: "Various",
    severity: "medium",
    image: "/whitefly-pest-on-plant.jpg",
  },
]

export default function PestDetectionPage() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const [detectionResult, setDetectionResult] = useState<DetectionResult | null>(null)
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string)
        startAnalysis()
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(false)
    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFileUpload(files[0])
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(false)
  }

  const startAnalysis = () => {
    setIsAnalyzing(true)
    setAnalysisProgress(0)
    setDetectionResult(null)

    // Simulate AI analysis with progress
    const interval = setInterval(() => {
      setAnalysisProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsAnalyzing(false)
          setDetectionResult(sampleResults[0])
          return 100
        }
        return prev + 10
      })
    }, 300)
  }

  const resetDetection = () => {
    setUploadedImage(null)
    setDetectionResult(null)
    setAnalysisProgress(0)
    setIsAnalyzing(false)
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "text-red-600 bg-red-50 dark:bg-red-950/20"
      case "medium":
        return "text-yellow-600 bg-yellow-50 dark:bg-yellow-950/20"
      case "low":
        return "text-green-600 bg-green-50 dark:bg-green-950/20"
      default:
        return "text-gray-600 bg-gray-50 dark:bg-gray-950/20"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container px-4 py-8 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-balance mb-2">AI Pest Detection</h1>
          <p className="text-muted-foreground">
            Upload crop images for instant AI-powered pest and disease identification
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Upload Section */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bug className="h-5 w-5" />
                  Upload Crop Image
                </CardTitle>
                <CardDescription>Take a clear photo of the affected plant or upload from gallery</CardDescription>
              </CardHeader>
              <CardContent>
                {!uploadedImage ? (
                  <div
                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                      dragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50"
                    }`}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                  >
                    <div className="space-y-4">
                      <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                        <Upload className="h-8 w-8 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Upload Image for Analysis</h3>
                        <p className="text-muted-foreground mb-4">Drag and drop your image here, or click to browse</p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                          <Button onClick={() => fileInputRef.current?.click()} className="gap-2">
                            <Upload className="h-4 w-4" />
                            Choose File
                          </Button>
                          <Button variant="outline" className="gap-2 bg-transparent">
                            <Camera className="h-4 w-4" />
                            Take Photo
                          </Button>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">Supported formats: JPG, PNG, WebP (Max 10MB)</p>
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
                      className="hidden"
                    />
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="relative">
                      <img
                        src={uploadedImage || "/placeholder.svg"}
                        alt="Uploaded crop"
                        className="w-full h-64 object-cover rounded-lg"
                      />
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={resetDetection}
                        className="absolute top-2 right-2"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>

                    {isAnalyzing && (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span className="text-sm font-medium">Analyzing image...</span>
                        </div>
                        <Progress value={analysisProgress} className="h-2" />
                        <p className="text-xs text-muted-foreground">
                          AI is examining your crop for pests and diseases
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Results */}
            {detectionResult && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    Detection Results
                  </CardTitle>
                  <CardDescription>AI analysis completed with {detectionResult.confidence}% confidence</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="identification" className="space-y-4">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="identification">Identification</TabsTrigger>
                      <TabsTrigger value="treatment">Treatment</TabsTrigger>
                      <TabsTrigger value="prevention">Prevention</TabsTrigger>
                    </TabsList>

                    <TabsContent value="identification" className="space-y-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-4">
                          <div>
                            <h3 className="text-xl font-bold text-primary mb-2">{detectionResult.pestName}</h3>
                            <div className="flex items-center gap-2 mb-3">
                              <Badge variant="outline" className="bg-transparent">
                                {detectionResult.confidence}% Confidence
                              </Badge>
                              <Badge className={getSeverityColor(detectionResult.severity)}>
                                {detectionResult.severity.toUpperCase()} Risk
                              </Badge>
                            </div>
                            <p className="text-muted-foreground">{detectionResult.description}</p>
                          </div>

                          <div>
                            <h4 className="font-semibold mb-2 flex items-center gap-2">
                              <Eye className="h-4 w-4" />
                              Symptoms Observed
                            </h4>
                            <ul className="space-y-1">
                              {detectionResult.symptoms.map((symptom, index) => (
                                <li key={index} className="flex items-center gap-2 text-sm">
                                  <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                                  {symptom}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <img
                            src={detectionResult.image || "/placeholder.svg"}
                            alt={detectionResult.pestName}
                            className="w-full h-48 object-cover rounded-lg"
                          />
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Leaf className="h-4 w-4" />
                              <span>{detectionResult.cropAffected}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>Act within {detectionResult.timeToAct}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="treatment" className="space-y-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <Card>
                          <CardHeader className="pb-3">
                            <CardTitle className="text-lg flex items-center gap-2">
                              <Leaf className="h-4 w-4 text-green-500" />
                              Organic Treatment
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-2">
                              {detectionResult.treatment.organic.map((treatment, index) => (
                                <li key={index} className="flex items-start gap-2 text-sm">
                                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  {treatment}
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader className="pb-3">
                            <CardTitle className="text-lg flex items-center gap-2">
                              <Zap className="h-4 w-4 text-blue-500" />
                              Chemical Treatment
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-2">
                              {detectionResult.treatment.chemical.map((treatment, index) => (
                                <li key={index} className="flex items-start gap-2 text-sm">
                                  <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                                  {treatment}
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      </div>

                      <div className="p-4 rounded-lg bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800">
                        <div className="flex items-start gap-2">
                          <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                          <div>
                            <h4 className="font-semibold text-yellow-800 dark:text-yellow-200">Important Note</h4>
                            <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                              Always follow label instructions when using chemical treatments. Consider organic methods
                              first for sustainable farming practices.
                            </p>
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="prevention" className="space-y-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Shield className="h-4 w-4 text-green-500" />
                            Prevention Strategies
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid gap-3">
                            {detectionResult.treatment.preventive.map((prevention, index) => (
                              <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                                <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center flex-shrink-0">
                                  <span className="text-xs font-bold text-green-600">{index + 1}</span>
                                </div>
                                <p className="text-sm">{prevention}</p>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Common Pests */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Common Pests</CardTitle>
                <CardDescription>Frequently detected in your region</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {commonPests.map((pest, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                  >
                    <img
                      src={pest.image || "/placeholder.svg"}
                      alt={pest.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{pest.name}</h4>
                      <p className="text-xs text-muted-foreground">{pest.crop}</p>
                    </div>
                    <Badge variant="outline" className={`text-xs ${getSeverityColor(pest.severity)}`}>
                      {pest.severity}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Photography Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-2">
                  <Camera className="h-4 w-4 text-primary mt-0.5" />
                  <p className="text-sm">Take photos in good natural light</p>
                </div>
                <div className="flex items-start gap-2">
                  <Eye className="h-4 w-4 text-primary mt-0.5" />
                  <p className="text-sm">Focus on affected areas clearly</p>
                </div>
                <div className="flex items-start gap-2">
                  <Leaf className="h-4 w-4 text-primary mt-0.5" />
                  <p className="text-sm">Include both healthy and affected parts</p>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-primary mt-0.5" />
                  <p className="text-sm">Capture multiple angles if possible</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
