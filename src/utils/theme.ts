import store from "store2"

const THEME = "theme"

const documentClasses = document.documentElement.classList

const setTheme = (theme: string) => {
  if (theme === "dark") {
    documentClasses.add("dark")
    store(THEME, "dark")
  } else {
    documentClasses.remove("dark")
    store(THEME, "light")
  }
}

const getCurrentTheme = () => store.get("theme") || "light"

export default { setTheme, getCurrentTheme }
