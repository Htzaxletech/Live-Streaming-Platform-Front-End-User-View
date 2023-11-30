import { useState } from "react"
import { useTranslation } from "react-i18next"

import { lngs } from "@utils/i18n"

const LanguageSwitch = () => {
  const { i18n } = useTranslation()

  const [currentLng, setCurrentLng] = useState(i18n.resolvedLanguage)

  const handleChangeLng = (lng: string) => {
    setCurrentLng(lng)
    i18n.changeLanguage(lng)
  }

  return (
    <div>
      {Object.keys(lngs).map((lng) => (
        <button
          key={lng}
          type="submit"
          onClick={() => handleChangeLng(lng)}
          className={currentLng === lng ? "text-primary" : ""}
        >
          {lngs[lng].nativeName}
        </button>
      ))}
    </div>
  )
}

export default LanguageSwitch
