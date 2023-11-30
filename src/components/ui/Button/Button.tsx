import { FC, ComponentPropsWithRef, forwardRef } from "react"
import { tv, type VariantProps } from "tailwind-variants"

type ButtonVariants = VariantProps<typeof button>

type ButtonProps = ButtonVariants & ComponentPropsWithRef<"button">

const button = tv({
  base: [
    "font-semibold text-sm/none",
    "flex flex-shrink-0 items-center",
    "px-3 rounded",
  ],
  variants: {
    color: {
      default: [
        "bg-background-item/10 text-foreground",
        "hover:bg-background-item/20",
      ],
      primary: [
        "bg-primary text-white",
        "hover:bg-primary-600",
        "active:bg-teal-600",
      ],
      danger: ["bg-danger text-foreground", "hover:bg-danger-600"],
    },
    size: {
      md: ["h-[30px]"],
      lg: ["h-[36px]"],
    },
  },
  defaultVariants: {
    color: "default",
    size: "md",
  },
})

const Button: FC<ButtonProps> = forwardRef(
  ({ children, className, color, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        {...props}
        className={button({ color, size, class: className })}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = "Button"

export default Button
