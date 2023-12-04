import { ComponentPropsWithRef, FC, ReactNode, forwardRef } from "react"
import { tv, type VariantProps } from "tailwind-variants"

type InputVariantProps = VariantProps<typeof input>

export type InputProps = Omit<ComponentPropsWithRef<"input">, "size"> &
  InputVariantProps & {
    startContent?: ReactNode
    endContent?: ReactNode
  }

const input = tv({
  slots: {
    root: [
      "flex",
      "items-center",
      "w-fit",
      "outline-none",
      "text-xl",
      "bg-background-base",
      "text-foreground-secondary",
      "border border-border",
      "rounded",
      "hover:ring-[1px] hover:ring-border",
      "focus-within:!ring focus-within:!ring-primary",
    ],
    inputBox: ["text-sm", "h-full", "bg-transparent", "outline-none"],
  },
  variants: {
    size: {
      sm: { root: ["h-[30px]", "px-1", "gap-1"] },
      md: { root: ["h-9", "px-2", "gap-2"] },
    },
  },
  defaultVariants: {
    size: "md",
  },
})

const { root, inputBox } = input()

const Input: FC<InputProps> = forwardRef(
  ({ startContent, endContent, className, size, ...props }, forwardedRef) => {
    return (
      <div className={root({ size, class: className })}>
        {startContent}
        <input {...props} ref={forwardedRef} className={inputBox()}></input>
        {endContent}
      </div>
    )
  }
)

Input.displayName = "Input"

export default Input
