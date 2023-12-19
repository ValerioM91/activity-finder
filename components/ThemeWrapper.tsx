import { cookies } from "next/headers"
import ThemeToggle, { type Theme } from "./ThemeToggle"

const ThemeWrapper = () => {
  const cookieStore = cookies()
  const themeValue = cookieStore.get("theme")?.value as Theme | undefined

  return <ThemeToggle initialValue={themeValue} />
}
export default ThemeWrapper
