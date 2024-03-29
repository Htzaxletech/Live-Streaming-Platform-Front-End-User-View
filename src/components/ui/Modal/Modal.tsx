import { forwardRef, Ref } from "react"
import * as Dialog from "@radix-ui/react-dialog"
import { tv, type VariantProps } from "tailwind-variants"
import { IoCloseSharp } from "react-icons/io5"

import Button from "../Button"

const modal = tv({
  slots: {
    content: [
      "fixed",
      "flex",
      "py-5 px-6",
      "left-1/2 top-1/2",
      "-translate-x-1/2 -translate-y-1/2",
      "w-[calc(100%-30px)]",
      "rounded-md",
      "bg-background-body dark:bg-background-float text-foreground",
    ],
    overlay: ["bg-black/50 fixed inset-0"],
    close: ["absolute", "right-2 top-2"],
  },
  variants: {
    size: {
      md: {
        content: ["max-w-[500px]"],
      },
      lg: {
        content: ["max-w-[800px]"],
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
})

const { content, overlay, close } = modal()

export const Content = forwardRef(
  (
    {
      children,
      className,
      size,
      ...props
    }: Dialog.DialogContentProps & VariantProps<typeof modal>,
    forwardedRef: Ref<HTMLDivElement>
  ) => (
    <Dialog.Portal>
      <Dialog.Overlay className={overlay()} />
      <Dialog.Content
        {...props}
        ref={forwardedRef}
        className={content({ size, class: className })}
      >
        {children}
        <Dialog.Close asChild aria-label="Close" className={close()}>
          <Button variant="light" className="text-xl" iconOnly={true}>
            <IoCloseSharp />
          </Button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  )
)

export const Root = Dialog.Root
export const Trigger = Dialog.Trigger
