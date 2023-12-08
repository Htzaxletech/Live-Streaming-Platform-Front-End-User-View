import { ChangeEvent, useRef, useState } from "react"
import { useTranslation } from "react-i18next"

import { lngs } from "@utils/i18n"
import { twJoin } from "tailwind-merge"

const LanguageSwitch = () => {
  const { i18n } = useTranslation()
  const selectRef = useRef<HTMLSelectElement>(null)

  const [currentLng, setCurrentLng] = useState(i18n.resolvedLanguage)

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const lng = event.target.value
    setCurrentLng(lng)
    i18n.changeLanguage(lng)
  }

  return (
    // this is temporary select, replace it with custom one
    <select
      ref={selectRef}
      onChange={handleSelectChange}
      className="p-2 w-full bg-inherit text-foreground outline-none cursor-pointer"
      defaultValue={currentLng}
    >
      {Object.keys(lngs).map((lng) => (
        <option
          key={lng}
          value={lng}
          className={twJoin(
            "bg-background-base text-foreground text-[13px]",
            currentLng === lng && "text-primary"
          )}
        >
          {lngs[lng].nativeName}
        </option>
      ))}
    </select>
  )
}

export default LanguageSwitch
