import { useContext } from "react"

import { ThemeContext } from "./ThemeProvider"

const ThemeSwitch = () => {
  const { theme, toggleTheme } = useContext(ThemeContext)

  return (
    <button onClick={toggleTheme} className="capitalize">
      {theme}
    </button>
  )
}

export default ThemeSwitch
