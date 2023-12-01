import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { tv } from "tailwind-variants"

const dropdown = tv({
  slots: {
    content: [
      "text-foreground",
      "bg-background-base",
      "rounded-md",
      "p-3",
      "min-w-[200px]",
      "shadow-[0_0_0_1px_rgba(0,0,0,0.1)]",
    ],
    group: [""],
    item: [
      "text-sm",
      "px-2",
      "h-[30px]",
      "flex",
      "items-center",
      "rounded-md",
      "hover:bg-foreground/10",
      "hover:outline-none",
    ],
    separator: ["h-[1px]", "my-2", "bg-foreground/30"],
  },
})

const { content, group, item, separator } = dropdown()

export const Root = (props: DropdownMenu.DropdownMenuProps) => (
  <DropdownMenu.Root {...props}>{props.children}</DropdownMenu.Root>
)
export const Trigger = (props: DropdownMenu.DropdownMenuTriggerProps) => (
  <DropdownMenu.Trigger {...props}>{props.children}</DropdownMenu.Trigger>
)
export const Portal = (props: DropdownMenu.DropdownMenuPortalProps) => (
  <DropdownMenu.Portal {...props}>{props.children}</DropdownMenu.Portal>
)
export const Content = (props: DropdownMenu.DropdownMenuContentProps) => (
  <DropdownMenu.Content
    {...props}
    className={content({ class: props.className })}
  >
    {props.children}
  </DropdownMenu.Content>
)
export const Group = (props: DropdownMenu.DropdownMenuGroupProps) => (
  <DropdownMenu.Group {...props} className={group({ class: props.className })}>
    {props.children}
  </DropdownMenu.Group>
)
export const Item = (props: DropdownMenu.DropdownMenuItemProps) => (
  <DropdownMenu.Item {...props} className={item({ class: props.className })}>
    {props.children}
  </DropdownMenu.Item>
)
export const Separator = (props: DropdownMenu.DropdownMenuSeparatorProps) => (
  <DropdownMenu.Separator
    {...props}
    className={separator({ class: props.className })}
  >
    {props.children}
  </DropdownMenu.Separator>
)
