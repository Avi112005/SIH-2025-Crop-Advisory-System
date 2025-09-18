"use client"
import { Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    setMounted(true)
    const isDarkMode = document.body.classList.contains("dark-mode")
    setIsDark(isDarkMode)
  }, [])

  useEffect(() => {
    if (mounted) {
      const handleThemeToggle = () => {
        document.body.classList.toggle("dark-mode")
        const newIsDark = document.body.classList.contains("dark-mode")
        setIsDark(newIsDark)
        // Store theme preference in localStorage
        localStorage.setItem("theme", newIsDark ? "dark" : "light")
      }

      const themeToggleBtn = document.getElementById("themeToggle")
      if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", handleThemeToggle)
        return () => themeToggleBtn.removeEventListener("click", handleThemeToggle)
      }
    }
  }, [mounted])

  useEffect(() => {
    if (mounted) {
      const savedTheme = localStorage.getItem("theme")
      if (savedTheme === "dark") {
        document.body.classList.add("dark-mode")
        setIsDark(true)
      } else {
        document.body.classList.remove("dark-mode")
        setIsDark(false)
      }
    }
  }, [mounted])

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="h-9 w-9">
        <Sun className="h-4 w-4" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    )
  }

  return (
    <Button id="themeToggle" variant="ghost" size="icon" className="h-9 w-9">
      <Sun className={`h-4 w-4 transition-all duration-300 ${isDark ? "rotate-90 scale-0" : "rotate-0 scale-100"}`} />
      <Moon
        className={`absolute h-4 w-4 transition-all duration-300 ${isDark ? "rotate-0 scale-100" : "-rotate-90 scale-0"}`}
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
