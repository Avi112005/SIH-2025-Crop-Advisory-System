"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, TrendingDown, MapPin, Calendar, RefreshCw, Filter, Search, DollarSign } from "lucide-react"
import { Input } from "@/components/ui/input"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"

const marketData = [
  {
    crop: "Wheat",
    currentPrice: 2150,
    previousPrice: 1920,
    change: 12.0,
    trend: "up",
    unit: "quintal",
    market: "Delhi Mandi",
    lastUpdated: "2 hours ago",
    category: "cereals",
  },
  {
    crop: "Rice",
    currentPrice: 3200,
    previousPrice: 3300,
    change: -3.0,
    trend: "down",
    unit: "quintal",
    market: "Mumbai APMC",
    lastUpdated: "1 hour ago",
    category: "cereals",
  },
  {
    crop: "Cotton",
    currentPrice: 5800,
    previousPrice: 5370,
    change: 8.0,
    trend: "up",
    unit: "quintal",
    market: "Ahmedabad",
    lastUpdated: "3 hours ago",
    category: "cash-crops",
  },
  {
    crop: "Sugarcane",
    currentPrice: 350,
    previousPrice: 340,
    change: 2.9,
    trend: "up",
    unit: "quintal",
    market: "Pune Mandi",
    lastUpdated: "4 hours ago",
    category: "cash-crops",
  },
  {
    crop: "Tomato",
    currentPrice: 2500,
    previousPrice: 2800,
    change: -10.7,
    trend: "down",
    unit: "quintal",
    market: "Bangalore",
    lastUpdated: "1 hour ago",
    category: "vegetables",
  },
  {
    crop: "Onion",
    currentPrice: 1800,
    previousPrice: 1650,
    change: 9.1,
    trend: "up",
    unit: "quintal",
    market: "Nashik",
    lastUpdated: "2 hours ago",
    category: "vegetables",
  },
  {
    crop: "Potato",
    currentPrice: 1200,
    previousPrice: 1150,
    change: 4.3,
    trend: "up",
    unit: "quintal",
    market: "Agra Mandi",
    lastUpdated: "5 hours ago",
    category: "vegetables",
  },
  {
    crop: "Soybean",
    currentPrice: 4200,
    previousPrice: 4100,
    change: 2.4,
    trend: "up",
    unit: "quintal",
    market: "Indore",
    lastUpdated: "3 hours ago",
    category: "pulses",
  },
]

const priceHistoryData = [
  { date: "Jan", wheat: 1800, rice: 3100, cotton: 5200 },
  { date: "Feb", wheat: 1850, rice: 3150, cotton: 5300 },
  { date: "Mar", wheat: 1900, rice: 3200, cotton: 5400 },
  { date: "Apr", wheat: 1950, rice: 3250, cotton: 5500 },
  { date: "May", wheat: 2000, rice: 3300, cotton: 5600 },
  { date: "Jun", wheat: 2100, rice: 3200, cotton: 5700 },
  { date: "Jul", wheat: 2150, rice: 3200, cotton: 5800 },
]

const topGainersLosers = {
  gainers: marketData.filter((item) => item.trend === "up").slice(0, 3),
  losers: marketData.filter((item) => item.trend === "down").slice(0, 3),
}

export default function MarketPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedMarket, setSelectedMarket] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredData = marketData.filter((item) => {
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory
    const matchesMarket = selectedMarket === "all" || item.market.toLowerCase().includes(selectedMarket.toLowerCase())
    const matchesSearch = item.crop.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesMarket && matchesSearch
  })

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-balance">Market Prices</h1>
              <p className="text-muted-foreground">Real-time crop prices from major markets across India</p>
            </div>
            <Button variant="outline" className="gap-2 bg-transparent">
              <RefreshCw className="h-4 w-4" />
              Refresh
            </Button>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search crops..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="cereals">Cereals</SelectItem>
                <SelectItem value="vegetables">Vegetables</SelectItem>
                <SelectItem value="cash-crops">Cash Crops</SelectItem>
                <SelectItem value="pulses">Pulses</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedMarket} onValueChange={setSelectedMarket}>
              <SelectTrigger className="w-48">
                <MapPin className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Market" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Markets</SelectItem>
                <SelectItem value="delhi">Delhi</SelectItem>
                <SelectItem value="mumbai">Mumbai</SelectItem>
                <SelectItem value="bangalore">Bangalore</SelectItem>
                <SelectItem value="pune">Pune</SelectItem>
                <SelectItem value="ahmedabad">Ahmedabad</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="prices" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="prices">Current Prices</TabsTrigger>
            <TabsTrigger value="trends">Price Trends</TabsTrigger>
            <TabsTrigger value="analysis">Market Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="prices" className="space-y-6">
            {/* Top Gainers & Losers */}
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-600">
                    <TrendingUp className="h-5 w-5" />
                    Top Gainers
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {topGainersLosers.gainers.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg bg-green-50 dark:bg-green-950/20"
                    >
                      <div>
                        <p className="font-semibold">{item.crop}</p>
                        <p className="text-sm text-muted-foreground">{item.market}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-600">+{item.change}%</p>
                        <p className="text-sm">{formatPrice(item.currentPrice)}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-600">
                    <TrendingDown className="h-5 w-5" />
                    Top Losers
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {topGainersLosers.losers.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg bg-red-50 dark:bg-red-950/20"
                    >
                      <div>
                        <p className="font-semibold">{item.crop}</p>
                        <p className="text-sm text-muted-foreground">{item.market}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-red-600">{item.change}%</p>
                        <p className="text-sm">{formatPrice(item.currentPrice)}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Price Table */}
            <Card>
              <CardHeader>
                <CardTitle>Current Market Prices</CardTitle>
                <CardDescription>Live prices from major agricultural markets</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredData.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 rounded-lg border hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <DollarSign className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{item.crop}</h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="h-3 w-3" />
                            <span>{item.market}</span>
                            <span>•</span>
                            <Calendar className="h-3 w-3" />
                            <span>{item.lastUpdated}</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-2xl font-bold">{formatPrice(item.currentPrice)}</span>
                          <Badge
                            variant={item.trend === "up" ? "default" : "destructive"}
                            className={
                              item.trend === "up"
                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                            }
                          >
                            {item.trend === "up" ? (
                              <TrendingUp className="h-3 w-3 mr-1" />
                            ) : (
                              <TrendingDown className="h-3 w-3 mr-1" />
                            )}
                            {Math.abs(item.change)}%
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">per {item.unit}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trends" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Price Trends (Last 7 Months)</CardTitle>
                <CardDescription>Historical price movement for major crops</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={priceHistoryData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip
                        formatter={(value: number) => [formatPrice(value), ""]}
                        labelFormatter={(label) => `Month: ${label}`}
                      />
                      <Line type="monotone" dataKey="wheat" stroke="#22c55e" strokeWidth={2} name="Wheat" />
                      <Line type="monotone" dataKey="rice" stroke="#3b82f6" strokeWidth={2} name="Rice" />
                      <Line type="monotone" dataKey="cotton" stroke="#f59e0b" strokeWidth={2} name="Cotton" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Monthly Comparison</CardTitle>
                <CardDescription>Compare current month prices with previous month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={priceHistoryData.slice(-2)}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip formatter={(value: number) => [formatPrice(value), ""]} />
                      <Bar dataKey="wheat" fill="#22c55e" name="Wheat" />
                      <Bar dataKey="rice" fill="#3b82f6" name="Rice" />
                      <Bar dataKey="cotton" fill="#f59e0b" name="Cotton" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analysis" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Market Insights</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800">
                    <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Wheat Market</h4>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      Strong demand from flour mills and government procurement driving prices up by 12%. Expected to
                      remain stable through harvest season.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800">
                    <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">Cotton Market</h4>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      Export demand increasing due to global supply chain issues. Textile industry showing strong
                      recovery post-pandemic.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800">
                    <h4 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">Vegetable Market</h4>
                    <p className="text-sm text-orange-700 dark:text-orange-300">
                      Seasonal fluctuations expected. Tomato prices may recover next month with improved weather
                      conditions.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Price Alerts</CardTitle>
                  <CardDescription>Set up notifications for price changes</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 rounded-lg border">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Wheat Price Alert</span>
                      <Badge variant="outline">Active</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Notify when price goes above ₹2,200/quintal</p>
                  </div>

                  <div className="p-4 rounded-lg border">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Rice Price Alert</span>
                      <Badge variant="outline">Active</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Notify when price drops below ₹3,000/quintal</p>
                  </div>

                  <Button className="w-full bg-transparent" variant="outline">
                    Set New Alert
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
