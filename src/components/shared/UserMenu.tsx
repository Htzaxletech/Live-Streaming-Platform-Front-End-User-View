import { Dropdown } from "@components/ui/Dropdown"

const UserMenu = () => {
  return (
    <Dropdown.Root>
      <Dropdown.Trigger className="text-foreground">Trigger</Dropdown.Trigger>

      <Dropdown.Portal>
        <Dropdown.Content>
          <Dropdown.Group>
            <Dropdown.Item>User</Dropdown.Item>
          </Dropdown.Group>
          <Dropdown.Separator />
          <Dropdown.Group>
            <Dropdown.Item>Gitem 1</Dropdown.Item>
            <Dropdown.Item>Gitem 2</Dropdown.Item>
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
