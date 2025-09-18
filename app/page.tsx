import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Sprout, CloudRain, Bug, TrendingUp, MessageCircle, Shield, Users, Zap } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container px-4 py-16 md:py-24">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="space-y-6 animate-fade-in">
              <Badge variant="secondary" className="w-fit">
                AI-Powered Agriculture
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-5xl md:text-6xl">
                Smart Crop Advisory for <span className="text-primary">Modern Farmers</span>
              </h1>
              <p className="text-xl text-muted-foreground text-pretty max-w-2xl">
                Get real-time crop recommendations, pest detection, market prices, and weather insights. Designed for
                small and marginal farmers with multilingual support and voice assistance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="text-lg px-8">
                  <Link href="/dashboard">
                    Get Started <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-lg px-8 bg-transparent">
                  <Link href="/chatbot">Try AI Assistant</Link>
                </Button>
              </div>
            </div>

            <div className="relative animate-fade-in-delay">
              <div className="relative mx-auto w-full max-w-lg">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 blur-3xl rounded-full"></div>
                <img
                  src="/modern-farmer-using-smartphone-in-green-crop-field.jpg"
                  alt="Smart farming technology"
                  className="relative z-10 w-full h-auto rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Everything You Need for Smart Farming</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              Our comprehensive platform provides AI-powered insights to help you make better farming decisions
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Sprout className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Crop Advisory</CardTitle>
                <CardDescription>
                  Get personalized recommendations for your crops based on soil conditions, weather, and growth stage
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Bug className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Pest Detection</CardTitle>
                <CardDescription>
                  Upload crop images for instant AI-powered pest and disease identification with treatment suggestions
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Market Prices</CardTitle>
                <CardDescription>
                  Real-time market price tracking for your crops to help you make informed selling decisions
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <CloudRain className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Weather Insights</CardTitle>
                <CardDescription>
                  Accurate weather forecasts and alerts to help you plan farming activities effectively
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <MessageCircle className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>AI Chatbot</CardTitle>
                <CardDescription>
                  24/7 multilingual AI assistant with voice support for instant farming guidance and support
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Soil Health</CardTitle>
                <CardDescription>
                  Monitor soil conditions and get recommendations for fertilizers and soil improvement techniques
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container px-4">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">
                Built for Small & Marginal Farmers
              </h2>
              <p className="text-lg text-muted-foreground text-pretty">
                We understand the unique challenges faced by small-scale farmers. Our platform is designed to be
                accessible, affordable, and easy to use, even for those with limited digital literacy.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <Users className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Multilingual Support</h3>
                    <p className="text-muted-foreground">
                      Available in multiple local languages with voice input and output
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <Zap className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Mobile-First Design</h3>
                    <p className="text-muted-foreground">
                      Optimized for smartphones with large buttons and clear navigation
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <Shield className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Offline Capability</h3>
                    <p className="text-muted-foreground">Core features work even with limited internet connectivity</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <img
                src="/diverse-group-of-farmers-using-mobile-phones-in-ag.jpg"
                alt="Farmers using technology"
                className="w-full h-auto rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4">
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">
              Ready to Transform Your Farming?
            </h2>
            <p className="text-xl text-muted-foreground text-pretty">
              Join thousands of farmers who are already using smart technology to improve their crop yields and income
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8">
                <Link href="/dashboard">
                  Start Your Journey <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 bg-transparent">
                <Link href="/chatbot">Ask AI Assistant</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30">
        <div className="container px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Sprout className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold text-primary">CropAdvisor</span>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              © 2024 Smart Crop Advisory System. Empowering farmers with AI technology.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
