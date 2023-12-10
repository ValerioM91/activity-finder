"use client"

import { BsMoonFill, BsSunFill } from "react-icons/bs"
import { useState } from "react"

export type Theme = "light" | "dark"

const ThemeToggle = ({ initialValue }: { initialValue?: Theme }) => {
  const [theme, setTheme] = useState<Theme>(initialValue || "light")

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    document.cookie = "theme=" + newTheme
    document.documentElement.setAttribute("data-theme", newTheme)
    setTheme(newTheme)
  }

  if (!theme) return null

  return (
    <button className="btn btn-primary btn-sm" onClick={toggleTheme}>
      {theme === "light" ? <BsMoonFill /> : <BsSunFill />}
    </button>
  )
}
export default ThemeToggle
