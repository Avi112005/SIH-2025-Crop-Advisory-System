"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  User,
  Settings,
  Bell,
  MapPin,
  Phone,
  Mail,
  Camera,
  Save,
  Shield,
  HelpCircle,
  LogOut,
  Smartphone,
  Volume2,
  Languages,
  Sun,
} from "lucide-react"

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "hi", name: "हिंदी", flag: "🇮🇳" },
  { code: "bn", name: "বাংলা", flag: "🇧🇩" },
  { code: "te", name: "తెలుగు", flag: "🇮🇳" },
  { code: "ta", name: "தமிழ்", flag: "🇮🇳" },
  { code: "mr", name: "मराठी", flag: "🇮🇳" },
  { code: "gu", name: "ગુજરાતી", flag: "🇮🇳" },
  { code: "pa", name: "ਪੰਜਾਬੀ", flag: "🇮🇳" },
]

const states = [
  "Andhra Pradesh",
  "Bihar",
  "Gujarat",
  "Haryana",
  "Karnataka",
  "Madhya Pradesh",
  "Maharashtra",
  "Punjab",
  "Rajasthan",
  "Tamil Nadu",
  "Uttar Pradesh",
  "West Bengal",
]

export default function SettingsPage() {
  const [profile, setProfile] = useState({
    name: "Rajesh Kumar",
    email: "rajesh.kumar@example.com",
    phone: "+91 98765 43210",
    location: "Rajasthan",
    farmSize: "5",
    primaryCrops: "Wheat, Cotton, Mustard",
  })

  const [preferences, setPreferences] = useState({
    language: "en",
    notifications: {
      weather: true,
      pest: true,
      market: true,
      general: false,
    },
    voice: {
      enabled: true,
      speed: "normal",
    },
    privacy: {
      shareData: false,
      analytics: true,
    },
  })

  const handleProfileChange = (field: string, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }))
  }

  const handleNotificationChange = (type: string, value: boolean) => {
    setPreferences((prev) => ({
      ...prev,
      notifications: { ...prev.notifications, [type]: value },
    }))
  }

  const handleVoiceChange = (field: string, value: string | boolean) => {
    setPreferences((prev) => ({
      ...prev,
      voice: { ...prev.voice, [field]: value },
    }))
  }

  const handlePrivacyChange = (field: string, value: boolean) => {
    setPreferences((prev) => ({
      ...prev,
      privacy: { ...prev.privacy, [field]: value },
    }))
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container px-4 py-8 max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-balance mb-2">Settings & Profile</h1>
          <p className="text-muted-foreground">Manage your account settings and preferences</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Personal Information
                </CardTitle>
                <CardDescription>Update your personal details and farm information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Profile Picture */}
                <div className="flex items-center gap-4">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src="/farmer-profile-avatar.jpg" alt="Profile" />
                    <AvatarFallback className="text-lg">RK</AvatarFallback>
                  </Avatar>
                  <div>
                    <Button variant="outline" className="gap-2 bg-transparent">
                      <Camera className="h-4 w-4" />
                      Change Photo
                    </Button>
                    <p className="text-sm text-muted-foreground mt-1">JPG, PNG up to 5MB</p>
                  </div>
                </div>

                <Separator />

                {/* Personal Details */}
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) => handleProfileChange("name", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        className="pl-10"
                        value={profile.email}
                        onChange={(e) => handleProfileChange("email", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        type="tel"
                        className="pl-10"
                        value={profile.phone}
                        onChange={(e) => handleProfileChange("phone", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">State/Location</Label>
                    <Select value={profile.location} onValueChange={(value) => handleProfileChange("location", value)}>
                      <SelectTrigger>
                        <MapPin className="h-4 w-4 mr-2" />
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {states.map((state) => (
                          <SelectItem key={state} value={state}>
                            {state}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator />

                {/* Farm Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Farm Information</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="farmSize">Farm Size (acres)</Label>
                      <Input
                        id="farmSize"
                        type="number"
                        value={profile.farmSize}
                        onChange={(e) => handleProfileChange("farmSize", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="primaryCrops">Primary Crops</Label>
                      <Input
                        id="primaryCrops"
                        placeholder="e.g., Wheat, Rice, Cotton"
                        value={profile.primaryCrops}
                        onChange={(e) => handleProfileChange("primaryCrops", e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button className="gap-2">
                    <Save className="h-4 w-4" />
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preferences" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  App Preferences
                </CardTitle>
                <CardDescription>Customize your app experience</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Theme */}
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-base font-medium flex items-center gap-2">
                      <Sun className="h-4 w-4" />
                      Theme
                    </Label>
                    <p className="text-sm text-muted-foreground">Choose your preferred theme</p>
                  </div>
                  <ThemeToggle />
                </div>

                <Separator />

                {/* Language */}
                <div className="space-y-3">
                  <Label className="text-base font-medium flex items-center gap-2">
                    <Languages className="h-4 w-4" />
                    Language
                  </Label>
                  <Select
                    value={preferences.language}
                    onValueChange={(value) => setPreferences((prev) => ({ ...prev, language: value }))}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((lang) => (
                        <SelectItem key={lang.code} value={lang.code}>
                          <span className="flex items-center gap-2">
                            <span>{lang.flag}</span>
                            <span>{lang.name}</span>
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                {/* Voice Settings */}
                <div className="space-y-4">
                  <Label className="text-base font-medium flex items-center gap-2">
                    <Volume2 className="h-4 w-4" />
                    Voice Assistant
                  </Label>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Enable Voice Input/Output</p>
                      <p className="text-sm text-muted-foreground">Use voice commands and audio responses</p>
                    </div>
                    <Switch
                      checked={preferences.voice.enabled}
                      onCheckedChange={(checked) => handleVoiceChange("enabled", checked)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Speech Speed</Label>
                    <Select
                      value={preferences.voice.speed}
                      onValueChange={(value) => handleVoiceChange("speed", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="slow">Slow</SelectItem>
                        <SelectItem value="normal">Normal</SelectItem>
                        <SelectItem value="fast">Fast</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notification Settings
                </CardTitle>
                <CardDescription>Choose what notifications you want to receive</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Weather Alerts</p>
                      <p className="text-sm text-muted-foreground">Get notified about weather changes and warnings</p>
                    </div>
                    <Switch
                      checked={preferences.notifications.weather}
                      onCheckedChange={(checked) => handleNotificationChange("weather", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Pest & Disease Alerts</p>
                      <p className="text-sm text-muted-foreground">Receive alerts about pest outbreaks in your area</p>
                    </div>
                    <Switch
                      checked={preferences.notifications.pest}
                      onCheckedChange={(checked) => handleNotificationChange("pest", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Market Price Updates</p>
                      <p className="text-sm text-muted-foreground">
                        Get notified when crop prices change significantly
                      </p>
                    </div>
                    <Switch
                      checked={preferences.notifications.market}
                      onCheckedChange={(checked) => handleNotificationChange("market", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">General Notifications</p>
                      <p className="text-sm text-muted-foreground">App updates, tips, and general information</p>
                    </div>
                    <Switch
                      checked={preferences.notifications.general}
                      onCheckedChange={(checked) => handleNotificationChange("general", checked)}
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <Label className="text-base font-medium flex items-center gap-2">
                    <Smartphone className="h-4 w-4" />
                    Delivery Method
                  </Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="push" className="rounded" defaultChecked />
                      <Label htmlFor="push">Push Notifications</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="sms" className="rounded" />
                      <Label htmlFor="sms">SMS Alerts</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="email-notif" className="rounded" />
                      <Label htmlFor="email-notif">Email Notifications</Label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Privacy & Security
                </CardTitle>
                <CardDescription>Manage your privacy settings and data sharing preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Share Farm Data</p>
                      <p className="text-sm text-muted-foreground">
                        Help improve recommendations by sharing anonymized farm data
                      </p>
                    </div>
                    <Switch
                      checked={preferences.privacy.shareData}
                      onCheckedChange={(checked) => handlePrivacyChange("shareData", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Analytics & Usage Data</p>
                      <p className="text-sm text-muted-foreground">Help us improve the app with usage analytics</p>
                    </div>
                    <Switch
                      checked={preferences.privacy.analytics}
                      onCheckedChange={(checked) => handlePrivacyChange("analytics", checked)}
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <Label className="text-base font-medium">Account Actions</Label>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start gap-2 bg-transparent">
                      <Shield className="h-4 w-4" />
                      Change Password
                    </Button>
                    <Button variant="outline" className="w-full justify-start gap-2 bg-transparent">
                      <HelpCircle className="h-4 w-4" />
                      Download My Data
                    </Button>
                    <Button variant="destructive" className="w-full justify-start gap-2">
                      <LogOut className="h-4 w-4" />
                      Delete Account
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>About</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">App Version</span>
                  <span>1.0.0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Last Updated</span>
                  <span>Dec 2024</span>
                </div>
                <Separator />
                <div className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start p-0 h-auto">
                    Terms of Service
                  </Button>
                  <Button variant="ghost" className="w-full justify-start p-0 h-auto">
                    Privacy Policy
                  </Button>
                  <Button variant="ghost" className="w-full justify-start p-0 h-auto">
                    Help & Support
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
