import { PropsWithChildren, createContext, useState } from "react"

import themeUtils from "@utils/theme"
import { useDispatch } from "react-redux"
import { themeSwitch } from "@store/slices/themeSlice"

const initialTheme: string = themeUtils.getCurrentTheme()
themeUtils.setTheme(initialTheme)

export const ThemeContext = createContext({
  theme: initialTheme,
  toggleTheme: () => {},
})

const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [theme, setTheme] = useState(initialTheme)
  const dispatch = useDispatch();

  const handleToggleTheme = () => {
    setTheme((prev) => {
      const currentTheme = prev === "dark" ? "light" : "dark"
      themeUtils.setTheme(currentTheme)
      dispatch(themeSwitch(currentTheme));
      return currentTheme
    })
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme: handleToggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
