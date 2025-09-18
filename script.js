import { Chart } from "@/components/ui/chart"
// Global Variables
let currentPage = "home"
let isDarkMode = false
let isRecording = false
let priceChart = null

// DOM Elements
const navLinks = document.querySelectorAll(".nav-link")
const pages = document.querySelectorAll(".page")
const themeToggle = document.getElementById("themeToggle")
const navToggle = document.getElementById("navToggle")
const navMenu = document.getElementById("navMenu")
const toast = document.getElementById("toast")

// Initialize App
document.addEventListener("DOMContentLoaded", () => {
  initializeApp()
  setupEventListeners()
  initializePriceChart()
  checkSystemTheme()
})

// Initialize Application
function initializeApp() {
  // Set initial page
  showPage("home")

  // Load saved preferences
  loadUserPreferences()

  // Setup drag and drop for pest detection
  setupDragAndDrop()

  // Initialize voice recognition if available
  initializeVoiceRecognition()

  console.log("[v0] Smart Crop Advisory System initialized")
}

// Setup Event Listeners
function setupEventListeners() {
  // Navigation
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault()
      const page = link.getAttribute("data-page")
      showPage(page)
    })
  })

  // Theme toggle
  themeToggle.addEventListener("click", toggleTheme)

  // Mobile navigation toggle
  navToggle.addEventListener("click", toggleMobileNav)

  // Close mobile nav when clicking outside
  document.addEventListener("click", (e) => {
    if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
      navMenu.classList.remove("active")
    }
  })

  // Chatbot functionality
  const messageInput = document.getElementById("messageInput")
  const sendBtn = document.getElementById("sendBtn")
  const voiceBtn = document.getElementById("voiceBtn")

  if (messageInput && sendBtn) {
    messageInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        sendMessage()
      }
    })
    sendBtn.addEventListener("click", sendMessage)
  }

  if (voiceBtn) {
    voiceBtn.addEventListener("click", toggleVoiceRecording)
  }

  // Pest detection image upload
  const imageInput = document.getElementById("imageInput")
  const analyzeBtn = document.getElementById("analyzeBtn")
  const removeBtn = document.getElementById("removeBtn")

  if (imageInput) {
    imageInput.addEventListener("change", handleImageUpload)
  }

  if (analyzeBtn) {
    analyzeBtn.addEventListener("click", analyzeImage)
  }

  if (removeBtn) {
    removeBtn.addEventListener("click", removeImage)
  }

  // Settings theme options
  const themeOptions = document.querySelectorAll(".theme-option")
  themeOptions.forEach((option) => {
    option.addEventListener("click", (e) => {
      const theme = e.currentTarget.getAttribute("data-theme")
      setTheme(theme)

      // Update active state
      themeOptions.forEach((opt) => opt.classList.remove("active"))
      e.currentTarget.classList.add("active")
    })
  })

  // Market filters
  const cropFilter = document.getElementById("cropFilter")
  const regionFilter = document.getElementById("regionFilter")

  if (cropFilter) {
    cropFilter.addEventListener("change", filterMarketData)
  }

  if (regionFilter) {
    regionFilter.addEventListener("change", filterMarketData)
  }
}

// Page Navigation
function showPage(pageId) {
  // Hide all pages
  pages.forEach((page) => {
    page.classList.remove("active")
  })

  // Show selected page
  const targetPage = document.getElementById(pageId)
  if (targetPage) {
    targetPage.classList.add("active")
    currentPage = pageId
  }

  // Update navigation
  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("data-page") === pageId) {
      link.classList.add("active")
    }
  })

  // Close mobile navigation
  navMenu.classList.remove("active")

  // Page-specific initialization
  if (pageId === "market") {
    setTimeout(() => {
      if (priceChart) {
        priceChart.resize()
      }
    }, 100)
  }

  console.log(`[v0] Navigated to page: ${pageId}`)
}

// Theme Management
function checkSystemTheme() {
  const savedTheme = localStorage.getItem("theme")
  if (savedTheme) {
    setTheme(savedTheme)
  } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    setTheme("dark")
  }
}

function toggleTheme() {
  const newTheme = isDarkMode ? "light" : "dark"
  setTheme(newTheme)
}

function setTheme(theme) {
  isDarkMode = theme === "dark"

  if (isDarkMode) {
    document.body.classList.add("dark")
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>'
  } else {
    document.body.classList.remove("dark")
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>'
  }

  // Save preference
  localStorage.setItem("theme", theme)

  // Update theme options in settings
  const themeOptions = document.querySelectorAll(".theme-option")
  themeOptions.forEach((option) => {
    option.classList.remove("active")
    if (option.getAttribute("data-theme") === theme) {
      option.classList.add("active")
    }
  })

  console.log(`[v0] Theme changed to: ${theme}`)
}

// Mobile Navigation
function toggleMobileNav() {
  navMenu.classList.toggle("active")
}

// Chatbot Functionality
function sendMessage() {
  const messageInput = document.getElementById("messageInput")
  const message = messageInput.value.trim()

  if (!message) return

  // Add user message to chat
  addMessageToChat(message, "user")

  // Clear input
  messageInput.value = ""

  // Simulate AI response
  setTimeout(() => {
    const response = generateAIResponse(message)
    addMessageToChat(response, "bot")
  }, 1000)
}

function sendQuickMessage(message) {
  addMessageToChat(message, "user")

  setTimeout(() => {
    const response = generateAIResponse(message)
    addMessageToChat(response, "bot")
  }, 1000)
}

function addMessageToChat(message, sender) {
  const chatMessages = document.getElementById("chatMessages")
  const messageDiv = document.createElement("div")
  messageDiv.className = `message ${sender}-message`

  messageDiv.innerHTML = `
        <div class="message-avatar">
            <i class="fas fa-${sender === "user" ? "user" : "robot"}"></i>
        </div>
        <div class="message-content">
            <p>${message}</p>
        </div>
    `

  chatMessages.appendChild(messageDiv)
  chatMessages.scrollTop = chatMessages.scrollHeight
}

function generateAIResponse(message) {
  const responses = {
    fertilizer:
      "For tomatoes, I recommend using a balanced NPK fertilizer (10-10-10) during the growing season. Apply 2-3 tablespoons per plant every 2-3 weeks. Also consider adding compost for organic matter.",
    pest: "For wheat pest control, monitor regularly for aphids and armyworms. Use neem oil spray (2-3ml per liter) as an organic solution, or apply recommended insecticides during early morning or evening.",
    planting:
      "The best time to plant rice depends on your region. In most areas, plant during monsoon season (June-July) for kharif rice or November-December for rabi rice. Ensure adequate water availability.",
    soil: "For soil preparation: 1) Test soil pH (should be 6.0-7.0), 2) Add organic compost, 3) Ensure proper drainage, 4) Deep plowing before planting, 5) Level the field properly.",
    default:
      "Thank you for your question! Based on your query, I recommend consulting with local agricultural experts for specific advice. You can also check our dashboard for personalized recommendations based on your location and crops.",
  }

  const lowerMessage = message.toLowerCase()

  if (lowerMessage.includes("fertilizer") || lowerMessage.includes("tomato")) {
    return responses.fertilizer
  } else if (lowerMessage.includes("pest") || lowerMessage.includes("control")) {
    return responses.pest
  } else if (lowerMessage.includes("plant") || lowerMessage.includes("time")) {
    return responses.planting
  } else if (lowerMessage.includes("soil") || lowerMessage.includes("preparation")) {
    return responses.soil
  } else {
    return responses.default
  }
}

// Voice Recognition
function initializeVoiceRecognition() {
  if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    window.recognition = new SpeechRecognition()
    window.recognition.continuous = false
    window.recognition.interimResults = false
    window.recognition.lang = "en-US"

    window.recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript
      document.getElementById("messageInput").value = transcript
      stopVoiceRecording()
    }

    window.recognition.onerror = (event) => {
      console.error("[v0] Speech recognition error:", event.error)
      stopVoiceRecording()
      showToast("Voice recognition error. Please try again.", "error")
    }

    window.recognition.onend = () => {
      stopVoiceRecording()
    }
  }
}

function toggleVoiceRecording() {
  const voiceBtn = document.getElementById("voiceBtn")

  if (!window.recognition) {
    showToast("Voice recognition not supported in this browser.", "error")
    return
  }

  if (isRecording) {
    window.recognition.stop()
    stopVoiceRecording()
  } else {
    window.recognition.start()
    startVoiceRecording()
  }
}

function startVoiceRecording() {
  isRecording = true
  const voiceBtn = document.getElementById("voiceBtn")
  voiceBtn.classList.add("recording")
  voiceBtn.innerHTML = '<i class="fas fa-stop"></i>'
  showToast("Listening... Speak now!", "info")
}

function stopVoiceRecording() {
  isRecording = false
  const voiceBtn = document.getElementById("voiceBtn")
  voiceBtn.classList.remove("recording")
  voiceBtn.innerHTML = '<i class="fas fa-microphone"></i>'
}

// Pest Detection
function setupDragAndDrop() {
  const uploadArea = document.getElementById("uploadArea")

  if (!uploadArea) return

  uploadArea.addEventListener("dragover", (e) => {
    e.preventDefault()
    uploadArea.classList.add("dragover")
  })

  uploadArea.addEventListener("dragleave", (e) => {
    e.preventDefault()
    uploadArea.classList.remove("dragover")
  })

  uploadArea.addEventListener("drop", (e) => {
    e.preventDefault()
    uploadArea.classList.remove("dragover")

    const files = e.dataTransfer.files
    if (files.length > 0 && files[0].type.startsWith("image/")) {
      handleImageFile(files[0])
    }
  })

  uploadArea.addEventListener("click", () => {
    document.getElementById("imageInput").click()
  })
}

function handleImageUpload(event) {
  const file = event.target.files[0]
  if (file && file.type.startsWith("image/")) {
    handleImageFile(file)
  }
}

function handleImageFile(file) {
  const reader = new FileReader()
  reader.onload = (e) => {
    showImagePreview(e.target.result)
  }
  reader.readAsDataURL(file)
}

function showImagePreview(imageSrc) {
  const uploadArea = document.getElementById("uploadArea")
  const imagePreview = document.getElementById("imagePreview")
  const previewImg = document.getElementById("previewImg")

  uploadArea.style.display = "none"
  previewImg.src = imageSrc
  imagePreview.style.display = "block"
}

function removeImage() {
  const uploadArea = document.getElementById("uploadArea")
  const imagePreview = document.getElementById("imagePreview")
  const imageInput = document.getElementById("imageInput")
  const resultsSection = document.getElementById("resultsSection")

  uploadArea.style.display = "block"
  imagePreview.style.display = "none"
  resultsSection.style.display = "none"
  imageInput.value = ""
}

function analyzeImage() {
  const imagePreview = document.getElementById("imagePreview")
  const analysisProgress = document.getElementById("analysisProgress")
  const progressFill = document.getElementById("progressFill")
  const progressText = document.getElementById("progressText")

  imagePreview.style.display = "none"
  analysisProgress.style.display = "block"

  // Simulate analysis progress
  let progress = 0
  const progressSteps = [
    "Initializing AI analysis...",
    "Processing image...",
    "Identifying patterns...",
    "Analyzing pest characteristics...",
    "Generating recommendations...",
    "Analysis complete!",
  ]

  const progressInterval = setInterval(() => {
    progress += 20
    progressFill.style.width = progress + "%"

    const stepIndex = Math.floor(progress / 20) - 1
    if (stepIndex >= 0 && stepIndex < progressSteps.length) {
      progressText.textContent = progressSteps[stepIndex]
    }

    if (progress >= 100) {
      clearInterval(progressInterval)
      setTimeout(() => {
        showAnalysisResults()
      }, 1000)
    }
  }, 800)
}

function showAnalysisResults() {
  const analysisProgress = document.getElementById("analysisProgress")
  const resultsSection = document.getElementById("resultsSection")

  analysisProgress.style.display = "none"
  resultsSection.style.display = "block"

  // Simulate random results
  const pests = [
    {
      name: "Aphids",
      confidence: "92%",
      severity: "Moderate",
      description: "Small, soft-bodied insects that feed on plant sap, causing yellowing and curling of leaves.",
      organic: [
        "Spray neem oil solution (2-3ml per liter of water)",
        "Use insecticidal soap spray",
        "Introduce ladybugs as natural predators",
        "Remove affected leaves manually",
      ],
      chemical: [
        "Apply Imidacloprid 17.8% SL @ 0.3ml/liter",
        "Use Thiamethoxam 25% WG @ 0.2g/liter",
        "Spray during early morning or evening",
        "Follow safety precautions and PHI period",
      ],
      prevention: [
        "Maintain proper plant spacing for air circulation",
        "Remove weeds that harbor pests",
        "Monitor plants regularly for early detection",
        "Use reflective mulch to deter aphids",
      ],
    },
    {
      name: "Whitefly",
      confidence: "87%",
      severity: "High",
      description: "Small white flying insects that feed on plant juices and transmit viral diseases.",
      organic: [
        "Use yellow sticky traps",
        "Spray neem oil regularly",
        "Apply insecticidal soap",
        "Encourage beneficial insects",
      ],
      chemical: [
        "Apply Acetamiprid 20% SP @ 0.2g/liter",
        "Use Spiromesifen 22.9% SC @ 1ml/liter",
        "Rotate different chemical groups",
        "Follow resistance management practices",
      ],
      prevention: [
        "Use resistant varieties when available",
        "Install fine mesh screens",
        "Remove infected plant debris",
        "Maintain field hygiene",
      ],
    },
  ]

  const randomPest = pests[Math.floor(Math.random() * pests.length)]

  // Update results display
  document.getElementById("pestName").textContent = randomPest.name
  document.getElementById("confidenceScore").textContent = randomPest.confidence
  document.getElementById("severityBadge").textContent = randomPest.severity
  document.getElementById("pestDescription").textContent = randomPest.description

  // Update treatment options
  const organicTreatment = document.getElementById("organicTreatment")
  const chemicalTreatment = document.getElementById("chemicalTreatment")
  const preventionTips = document.getElementById("preventionTips")

  organicTreatment.innerHTML = "<ul>" + randomPest.organic.map((item) => `<li>${item}</li>`).join("") + "</ul>"
  chemicalTreatment.innerHTML = "<ul>" + randomPest.chemical.map((item) => `<li>${item}</li>`).join("") + "</ul>"
  preventionTips.innerHTML = randomPest.prevention.map((item) => `<li>${item}</li>`).join("")

  showToast("Pest analysis completed successfully!", "success")
}

function showTreatment(type) {
  const tabs = document.querySelectorAll(".tab-btn")
  const treatments = document.querySelectorAll(".treatment-option")

  tabs.forEach((tab) => tab.classList.remove("active"))
  treatments.forEach((treatment) => treatment.classList.remove("active"))

  document.querySelector(`[onclick="showTreatment('${type}')"]`).classList.add("active")
  document.getElementById(`${type}Treatment`).classList.add("active")
}

// Market Price Chart
function initializePriceChart() {
  const ctx = document.getElementById("priceChart")
  if (!ctx) return

  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Wheat",
        data: [2000, 2100, 2050, 2150, 2200, 2150],
        borderColor: "rgb(5, 150, 105)",
        backgroundColor: "rgba(5, 150, 105, 0.1)",
        tension: 0.4,
      },
      {
        label: "Rice",
        data: [1800, 1850, 1900, 1880, 1920, 1890],
        borderColor: "rgb(16, 185, 129)",
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        tension: 0.4,
      },
      {
        label: "Tomato",
        data: [35, 40, 38, 42, 45, 45],
        borderColor: "rgb(71, 85, 105)",
        backgroundColor: "rgba(71, 85, 105, 0.1)",
        tension: 0.4,
      },
    ],
  }

  const config = {
    type: "line",
    data: chartData,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: false,
        },
      },
      scales: {
        y: {
          beginAtZero: false,
          grid: {
            color: isDarkMode ? "#334155" : "#e2e8f0",
          },
          ticks: {
            color: isDarkMode ? "#f1f5f9" : "#475569",
          },
        },
        x: {
          grid: {
            color: isDarkMode ? "#334155" : "#e2e8f0",
          },
          ticks: {
            color: isDarkMode ? "#f1f5f9" : "#475569",
          },
        },
      },
    },
  }

  priceChart = new Chart(ctx, config)
}

function filterMarketData() {
  const cropFilter = document.getElementById("cropFilter").value
  const regionFilter = document.getElementById("regionFilter").value

  console.log(`[v0] Filtering market data: crop=${cropFilter}, region=${regionFilter}`)
  showToast(`Filtered by ${cropFilter} crops in ${regionFilter} region`, "info")
}

// Utility Functions
function showToast(message, type = "info") {
  const toast = document.getElementById("toast")
  const toastIcon = toast.querySelector(".toast-icon")
  const toastMessage = toast.querySelector(".toast-message")

  // Set icon based on type
  const icons = {
    success: "fas fa-check-circle",
    error: "fas fa-exclamation-circle",
    info: "fas fa-info-circle",
  }

  toastIcon.className = `toast-icon ${icons[type] || icons.info}`
  toastMessage.textContent = message
  toast.className = `toast ${type}`

  // Show toast
  toast.classList.add("show")

  // Hide after 3 seconds
  setTimeout(() => {
    toast.classList.remove("show")
  }, 3000)
}

function loadUserPreferences() {
  // Load saved theme
  const savedTheme = localStorage.getItem("theme")
  if (savedTheme) {
    setTheme(savedTheme)
  }

  // Load other preferences
  const savedLanguage = localStorage.getItem("language")
  if (savedLanguage) {
    const languageSelect = document.getElementById("languageSelect")
    if (languageSelect) {
      languageSelect.value = savedLanguage
    }
  }
}

// Animation helpers
function animateElement(element, animationClass) {
  element.classList.add(animationClass)
  element.addEventListener(
    "animationend",
    () => {
      element.classList.remove(animationClass)
    },
    { once: true },
  )
}

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in")
    }
  })
}, observerOptions)

// Observe elements for animation
document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(".feature-card, .dashboard-card")
  animatedElements.forEach((el) => observer.observe(el))
})

// Error handling
window.addEventListener("error", (e) => {
  console.error("[v0] Application error:", e.error)
  showToast("An error occurred. Please refresh the page.", "error")
})

// Service Worker registration (for PWA capabilities)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("[v0] SW registered: ", registration)
      })
      .catch((registrationError) => {
        console.log("[v0] SW registration failed: ", registrationError)
      })
  })
}

console.log("[v0] Smart Crop Advisory System script loaded successfully")
