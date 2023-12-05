import { ComponentPropsWithRef, FC, ReactNode, forwardRef } from "react"
import { IoCloseSharp } from "react-icons/io5"
import { tv, type VariantProps } from "tailwind-variants"

type InputVariantProps = VariantProps<typeof input>

export type InputProps = Omit<ComponentPropsWithRef<"input">, "size"> &
  InputVariantProps & {
    startContent?: ReactNode
    endContent?: ReactNode
    withClearButton?: boolean
    onClear?: () => void
  }

const input = tv({
  slots: {
    root: [
      "flex",
      "relative",
      "items-center",
      "w-56",
      "outline-none",
      "text-xl",
      "bg-background-base",
      "text-foreground-secondary",
      "border border-border",
      "rounded-md",
      "hover:ring-[1px] hover:ring-border",
      "focus-within:!ring-[2px] focus-within:!ring-primary",
    ],
    inputBox: ["text-sm", "w-full h-full", "bg-transparent", "outline-none"],
    clearButton: ["w-7 h-7", "hidden"],
  },
  variants: {
    size: {
      sm: { root: ["h-[30px]", "px-1", "gap-1"] },
      md: { root: ["h-9", "px-2", "gap-2"] },
    },
    disabled: {
      true: { root: "!opacity-70 !pointer-events-none" },
    },
    show: {
      true: {
        clearButton: ["block"],
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
})

const { root, inputBox, clearButton } = input()

const Input: FC<InputProps> = forwardRef(
  (
    {
      value,
      disabled,
      withClearButton,
      startContent,
      endContent,
      className,
      size,
      onClear,
      ...props
    },
    forwardedRef
  ) => {
    return (
      <div className={root({ disabled, size, class: className })}>
        {startContent}
        <input
          {...props}
          value={value}
          disabled={disabled}
          ref={forwardedRef}
          className={inputBox()}
        ></input>
        {withClearButton && (
          <IoCloseSharp
            onClick={onClear}
            className={clearButton({ show: Boolean(value) })}
          />
        )}

        {endContent}
      </div>
    )
  }
)

Input.displayName = "Input"

export default Input
