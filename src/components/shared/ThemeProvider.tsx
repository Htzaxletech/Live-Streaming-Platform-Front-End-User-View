import { PropsWithChildren, createContext, useState } from "react"
import store from "store2"

import { setDocumentTheme } from "@utils/theme"

const initialTheme: string = store.get("theme") || "light"
setDocumentTheme(initialTheme)

export const ThemeContext = createContext({
  theme: initialTheme,
  toggleTheme: () => {},
})

const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [theme, setTheme] = useState(initialTheme)

  const handToggleTheme = () => {
    setTheme((prev) => {
      const currentTheme = prev === "dark" ? "light" : "dark"
      setDocumentTheme(currentTheme)
      return currentTheme
    })
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme: handToggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
