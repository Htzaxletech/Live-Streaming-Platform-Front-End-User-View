import { ChangeEvent, FormEvent, lazy, useCallback, useRef, useState } from "react"
import { tv } from "tailwind-variants"
import { RiSearchLine } from "react-icons/ri"

// import Button from "@components/ui/Button"
// import Input from "@components/ui/Input"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next";

const Button = lazy(() => import("@components/ui/Button"));
const Input = lazy(() => import("@components/ui/Input"));

const classes = tv({
  base: ["flex", "w-full", "max-w-[300px]"],
})

const NavbarSearchBox = ({ className }: { className?: string }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null)
  const [searchValue, setSearchValue] = useState<string>("")

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  const clearInputValue = useCallback(() => {
    setSearchValue("")
    inputRef?.current?.focus()
  }, [])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    navigate(`/search/${searchValue}`, );
    clearInputValue();
  }

  return (
    <form onSubmit={handleSubmit} className={classes({ class: className })}>
      <Input
        ref={inputRef}
        placeholder={t("navbar.search")}
        className="rounded-e-none flex-1"
        value={searchValue}
        onClear={clearInputValue}
        onChange={handleInputChange}
        withClearButton
      />

      <Button
        size="lg"
        iconOnly
        className="rounded-s-none"
        disabled={!searchValue}
        type="submit"
      >
        <RiSearchLine className="w-6 h-6" />
      </Button>
    </form>
  )
}

export default NavbarSearchBox
