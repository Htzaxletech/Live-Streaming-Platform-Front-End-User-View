import { ChangeEvent, FormEvent, useCallback, useRef, useState } from "react"
import { tv } from "tailwind-variants"
import { RiSearchLine } from "react-icons/ri"

import Button from "@components/ui/Button"
import Input from "@components/ui/Input"

const classes = tv({
  base: ["flex", "w-full", "max-w-[300px]"],
})

const NavbarSearchBox = ({ className }: { className?: string }) => {
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
    clearInputValue()
  }

  return (
    <form onSubmit={handleSubmit} className={classes({ class: className })}>
      <Input
        ref={inputRef}
        placeholder="Search"
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
        onClick={clearInputValue}
        disabled={!searchValue}
        type="submit"
      >
        <RiSearchLine className="w-6 h-6" />
      </Button>
    </form>
  )
}

export default NavbarSearchBox
