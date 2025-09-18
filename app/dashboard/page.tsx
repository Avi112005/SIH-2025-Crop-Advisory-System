import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
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
} from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Rajasthan, India</span>
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
              <p className="text-xs text-muted-foreground">Wheat, Rice, Cotton</p>
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
                <div className="flex items-start gap-3 p-4 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800">
                  <Sprout className="h-5 w-5 text-green-600 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-green-800 dark:text-green-200">Wheat Field - Block A</h4>
                    <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                      Apply nitrogen fertilizer (20kg/acre). Soil moisture is optimal for nutrient absorption.
                    </p>
                    <Badge
                      variant="secondary"
                      className="mt-2 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                    >
                      High Priority
                    </Badge>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800">
                  <Droplets className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-blue-800 dark:text-blue-200">Rice Field - Block B</h4>
                    <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                      Reduce irrigation by 30%. Expected rainfall in next 2 days will provide sufficient water.
                    </p>
                    <Badge
                      variant="secondary"
                      className="mt-2 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                    >
                      Medium Priority
                    </Badge>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-lg bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800">
                  <Bug className="h-5 w-5 text-orange-600 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-orange-800 dark:text-orange-200">Cotton Field - Block C</h4>
                    <p className="text-sm text-orange-700 dark:text-orange-300 mt-1">
                      Monitor for bollworm activity. Consider preventive spray if temperature exceeds 30°C.
                    </p>
                    <Badge
                      variant="secondary"
                      className="mt-2 bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
                    >
                      Watch
                    </Badge>
                  </div>
                </div>
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
