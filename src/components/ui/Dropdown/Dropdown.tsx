import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { tv } from "tailwind-variants"

const dropdown = tv({
  slots: {
    content: [
      "text-foreground text-[0.8125rem]",
      "bg-background-base",
      "rounded-md",
      "p-3",
      "min-w-[12.75rem]",
      "shadow-[0_0_0_1px_rgba(0,0,0,0.1)]",
    ],
    group: [""],
    item: [
      "px-2",
      "h-[30px]",
      "flex",
      "items-center",
      "rounded-md",
      "hover:bg-foreground/10",
      "hover:outline-none",
    ],
    separator: ["h-[0.8px]", "my-2", "bg-foreground/20"],
  },
})

const { content, group, item, separator } = dropdown()

export const Content = forwardRef<
  ElementRef<typeof DropdownMenu.Content>,
  ComponentPropsWithoutRef<typeof DropdownMenu.Content>
>((props, forwardedRef) => (
  <DropdownMenu.Content
    {...props}
    ref={forwardedRef}
    className={content({ class: props.className })}
  >
    {props.children}
  </DropdownMenu.Content>
))

Content.displayName = "DropdownConent"

export const Group = forwardRef<
  ElementRef<typeof DropdownMenu.Group>,
  ComponentPropsWithoutRef<typeof DropdownMenu.Group>
>((props, forwardedRef) => (
  <DropdownMenu.Group
    {...props}
    ref={forwardedRef}
    className={group({ class: props.className })}
  >
    {props.children}
  </DropdownMenu.Group>
))

export const Item = forwardRef<
  ElementRef<typeof DropdownMenu.Item>,
  ComponentPropsWithoutRef<typeof DropdownMenu.Item>
>((props, forwardedRef) => (
  <DropdownMenu.Item
    {...props}
    ref={forwardedRef}
    className={item({ class: props.className })}
  >
    {props.children}
  </DropdownMenu.Item>
))

export const Separator = (props: DropdownMenu.DropdownMenuSeparatorProps) => (
  <DropdownMenu.Separator
    {...props}
    className={separator({ class: props.className })}
  >
    {props.children}
  </DropdownMenu.Separator>
)

export const Root = DropdownMenu.Root
export const Trigger = DropdownMenu.Trigger
export const Portal = DropdownMenu.Portal
export const Sub = DropdownMenu.Sub
export const SubTrigger = DropdownMenu.SubTrigger
export const SubContent = DropdownMenu.SubContent
