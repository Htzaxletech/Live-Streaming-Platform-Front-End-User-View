import { GoPerson } from "react-icons/go"

import Button from "@components/ui/Button"
import { Dropdown } from "@components/ui/Dropdown"
import LanguageSwitch from "./LanguageSwitch"
import ThemeSwitch from "./ThemeSwitch"

const UserMenu = () => {
  return (
    <Dropdown.Root modal={false}>
      <Dropdown.Trigger asChild className="text-foreground outline-none">
        <Button iconOnly variant="light">
          <GoPerson className="icon stroke-[0.8px]" />
        </Button>
      </Dropdown.Trigger>

      <Dropdown.Portal>
        <Dropdown.Content align="end">
          <Dropdown.Group>
            <LanguageSwitch />

            <ThemeSwitch />
          </Dropdown.Group>
          <Dropdown.Separator />
          <Dropdown.Group>
            <Dropdown.Item>Log Out</Dropdown.Item>
          </Dropdown.Group>
        </Dropdown.Content>
      </Dropdown.Portal>
    </Dropdown.Root>
  )
}

export default UserMenu
