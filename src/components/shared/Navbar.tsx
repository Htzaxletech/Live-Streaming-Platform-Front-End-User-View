import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"

import LanguageSwitch from "./LanguageSwitch"
import ThemeSwitch from "./ThemeSwitch"
import Logo from "./Logo"

const Navbar = () => {
  const { t } = useTranslation()

  return (
    <nav className="flex space-x-6 py-3 items-center">
      <div className="">
        <Logo />
      </div>
      <Link to={`/`}>{t("navbar.link1")}</Link>
      <Link to={`/directory`}>{t("navbar.link2")}</Link>
      <LanguageSwitch />
      <ThemeSwitch />
    </nav>
  )
}

export default Navbar
