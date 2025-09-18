"use client"

import { useState, useRef, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MessageCircle, Send, Mic, MicOff, Volume2, VolumeX, Bot, User, Sprout, Languages, Loader2 } from "lucide-react"

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
  language?: string
}

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "hi", name: "हिंदी", flag: "🇮🇳" },
  { code: "bn", name: "বাংলা", flag: "🇧🇩" },
  { code: "te", name: "తెలుగు", flag: "🇮🇳" },
  { code: "ta", name: "தமிழ்", flag: "🇮🇳" },
  { code: "mr", name: "मराठी", flag: "🇮🇳" },
]

const quickQuestions = [
  "What fertilizer should I use for wheat?",
  "How to identify pest in cotton crop?",
  "Best time to plant rice?",
  "Soil preparation for tomatoes",
  "Weather impact on crop growth",
  "Organic farming techniques",
]

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hello! I'm your AI crop advisor. I can help you with farming questions, pest identification, weather advice, and more. How can I assist you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [selectedLanguage, setSelectedLanguage] = useState("en")
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: "user",
      timestamp: new Date(),
      language: selectedLanguage,
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateBotResponse(inputMessage),
        sender: "bot",
        timestamp: new Date(),
        language: selectedLanguage,
      }
      setMessages((prev) => [...prev, botResponse])
      setIsLoading(false)
    }, 1500)
  }

  const generateBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase()

    if (input.includes("wheat") && input.includes("fertilizer")) {
      return "For wheat crops, I recommend using NPK fertilizer (120:60:40 kg/ha) at the time of sowing. Apply nitrogen in 3 splits: 50% at sowing, 25% at crown root initiation, and 25% at jointing stage. Also consider adding organic compost to improve soil health."
    }

    if (input.includes("pest") || input.includes("cotton")) {
      return "Common cotton pests include bollworm, aphids, and whitefly. Look for signs like holes in leaves, sticky honeydew, or small insects on plant undersides. For organic control, use neem oil spray. For severe infestations, consider targeted insecticides. Would you like me to help identify a specific pest from a photo?"
    }

    if (input.includes("rice") && input.includes("plant")) {
      return "The best time to plant rice depends on your region. For kharif season: June-July (monsoon). For rabi season: November-December. Ensure soil temperature is above 20°C and adequate water supply is available. Prepare nursery beds 25-30 days before transplanting."
    }

    if (input.includes("weather")) {
      return "Weather significantly impacts crop growth. Current conditions show good humidity for most crops. However, expected rainfall tomorrow means you should avoid spraying pesticides. High temperatures next week may require increased irrigation. Would you like specific weather-based recommendations for your crops?"
    }

    if (input.includes("soil") || input.includes("tomato")) {
      return "For tomatoes, prepare well-drained soil with pH 6.0-7.0. Add organic matter like compost or well-rotted manure (20-25 tons/ha). Ensure good drainage as tomatoes are sensitive to waterlogging. Consider raised beds in heavy clay soils."
    }

    if (input.includes("organic")) {
      return "Organic farming techniques include: 1) Crop rotation to maintain soil fertility, 2) Composting for natural fertilizers, 3) Beneficial insects for pest control, 4) Cover crops to prevent soil erosion, 5) Natural mulching to retain moisture. Start with soil testing to understand your current soil health."
    }

    return "Thank you for your question! Based on your farming needs, I'd recommend consulting with local agricultural experts for region-specific advice. You can also upload photos of your crops for more detailed analysis. Is there anything specific about your crops, soil, or farming practices you'd like to discuss?"
  }

  const handleVoiceInput = () => {
    if (!isListening) {
      setIsListening(true)
      // Simulate voice recognition
      setTimeout(() => {
        setInputMessage("How to control pests in my cotton field?")
        setIsListening(false)
      }, 3000)
    } else {
      setIsListening(false)
    }
  }

  const handleTextToSpeech = (text: string) => {
    if (!isSpeaking) {
      setIsSpeaking(true)
      // Simulate text-to-speech
      setTimeout(() => {
        setIsSpeaking(false)
      }, 3000)
    } else {
      setIsSpeaking(false)
    }
  }

  const handleQuickQuestion = (question: string) => {
    setInputMessage(question)
    inputRef.current?.focus()
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container px-4 py-8 max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Bot className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">AI Crop Advisor</h1>
                <p className="text-muted-foreground">Your 24/7 farming assistant</p>
              </div>
            </div>

            {/* Language Selector */}
            <div className="flex items-center gap-2">
              <Languages className="h-4 w-4 text-muted-foreground" />
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger className="w-32">
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
          </div>

          {/* Quick Questions */}
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-3 text-muted-foreground">Quick Questions:</h3>
            <div className="flex flex-wrap gap-2">
              {quickQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickQuestion(question)}
                  className="text-xs bg-transparent hover:bg-primary/10"
                >
                  {question}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Chat Interface */}
        <Card className="h-[600px] flex flex-col">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              Chat with AI Assistant
            </CardTitle>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col p-0">
            {/* Messages */}
            <ScrollArea className="flex-1 px-6">
              <div className="space-y-4 pb-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {message.sender === "bot" && (
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Sprout className="h-4 w-4 text-primary" />
                      </div>
                    )}

                    <div
                      className={`max-w-[80%] rounded-lg px-4 py-3 ${
                        message.sender === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.content}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs opacity-70">
                          {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </span>
                        {message.sender === "bot" && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleTextToSpeech(message.content)}
                            className="h-6 w-6 p-0 hover:bg-transparent"
                          >
                            {isSpeaking ? <VolumeX className="h-3 w-3" /> : <Volume2 className="h-3 w-3" />}
                          </Button>
                        )}
                      </div>
                    </div>

                    {message.sender === "user" && (
                      <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                        <User className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                ))}

                {isLoading && (
                  <div className="flex gap-3 justify-start">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Sprout className="h-4 w-4 text-primary" />
                    </div>
                    <div className="bg-muted rounded-lg px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span className="text-sm text-muted-foreground">AI is thinking...</span>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Input Area */}
            <div className="border-t p-4">
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <Input
                    ref={inputRef}
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Ask about crops, pests, weather, or farming techniques..."
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    className="pr-12"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleVoiceInput}
                    className={`absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 ${
                      isListening ? "text-red-500" : "text-muted-foreground"
                    }`}
                  >
                    {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                  </Button>
                </div>
                <Button onClick={handleSendMessage} disabled={!inputMessage.trim() || isLoading}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>

              {isListening && (
                <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  Listening... Speak your question
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <Card className="text-center p-4">
            <Languages className="h-8 w-8 text-primary mx-auto mb-2" />
            <h3 className="font-semibold mb-1">Multilingual</h3>
            <p className="text-sm text-muted-foreground">Available in 6+ local languages</p>
          </Card>

          <Card className="text-center p-4">
            <Mic className="h-8 w-8 text-primary mx-auto mb-2" />
            <h3 className="font-semibold mb-1">Voice Support</h3>
            <p className="text-sm text-muted-foreground">Speak your questions naturally</p>
          </Card>

          <Card className="text-center p-4">
            <Bot className="h-8 w-8 text-primary mx-auto mb-2" />
            <h3 className="font-semibold mb-1">24/7 Available</h3>
            <p className="text-sm text-muted-foreground">Get help anytime, anywhere</p>
          </Card>
        </div>
      </div>
    </div>
  )
}
