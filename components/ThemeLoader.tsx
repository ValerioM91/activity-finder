import Script from "next/script"

const ThemeLoader = () => {
  return (
    <Script id="theme-loader-script">
      {`
        try {
          const stored = window.localStorage.getItem("theme")
          const theme = stored || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
          document.documentElement.setAttribute("data-theme", theme)
        } catch (err) {}
    `}
    </Script>
  )
}

export default ThemeLoader
