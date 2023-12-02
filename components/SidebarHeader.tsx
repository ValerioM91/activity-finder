import ThemeToggle from "./ThemeToggle"
import { SiOpenai } from "react-icons/si"

const SidebarHeader = () => {
  return (
    <div className="mb-4 flex items-center gap-4 px-4">
      <SiOpenai className="h-10 w-10 text-primary" />
      <h2 className="mr-auto font-taviraj text-2xl text-primary">Activity Finder</h2>
      <ThemeToggle />
    </div>
  )
}
export default SidebarHeader
