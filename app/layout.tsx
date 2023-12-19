import type { Metadata } from "next"
import { Figtree, Taviraj } from "next/font/google"
import { cookies } from "next/headers"
import { FaBarsStaggered } from "react-icons/fa6"

import "./globals.css"
import Providers from "./providers"
import Sidebar from "@/components/Sidebar"

const figtree = Figtree({ subsets: ["latin"] })
const taviraj = Taviraj({ weight: ["600"], variable: "--taviraj", subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Activity Finder",
  description: "Activity Finder: Your AI companion. Powered by OpenAI, it helps you find activity for you holidays!",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies()
  const themeValue = cookieStore.get("theme")?.value

  return (
    <html lang="en" data-theme={themeValue}>
      <body className={`${figtree.className} ${taviraj.variable}`}>
        <Providers>
          <div className="drawer lg:drawer-open">
            <input type="checkbox" id="my-drawer-2" className="drawer-toggle" />
            <div className="drawer-content">
              <label htmlFor="my-drawer-2" className="drawer-button fixed right-6 top-6 lg:hidden">
                <FaBarsStaggered className="h-8 w-8 text-primary" />
              </label>
              <div className="min-h-screen max-w-7xl bg-base-100 px-4 py-12 pt-20 md:px-8 lg:pt-12">{children}</div>
            </div>
            <div className="drawer-side">
              <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
              <Sidebar />
            </div>
          </div>
        </Providers>
      </body>
    </html>
  )
}
