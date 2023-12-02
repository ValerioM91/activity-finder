"use client"

import { BsMoonFill, BsSunFill } from "react-icons/bs"
import { useEffect, useState } from "react"

const ThemeToggle = () => {
  const [theme, setTheme] = useState<"light" | "dark" | undefined>("light")

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = window.localStorage.getItem("theme") as "light" | "dark"
      const theme = stored || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
      document.documentElement.setAttribute("data-theme", theme)
      setTheme(theme)
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    document.documentElement.setAttribute("data-theme", newTheme)
    setTheme(newTheme)
    window.localStorage.setItem("theme", newTheme)
  }

  if (!theme) return null

  return (
    <button className="btn btn-primary btn-sm" onClick={toggleTheme}>
      {theme === "light" ? <BsMoonFill /> : <BsSunFill />}
    </button>
  )
}
export default ThemeToggle
