import { FC, ComponentPropsWithRef, forwardRef } from "react"
import { tv, type VariantProps } from "tailwind-variants"

type ButtonVariants = VariantProps<typeof button>

type ButtonProps = ButtonVariants & ComponentPropsWithRef<"button">

const button = tv({
  base: [
    "font-semibold text-sm/none",
    "flex flex-shrink-0 items-center",
    "px-3 rounded",
    "disabled:opacity-70 disabled:pointer-events-none",
  ],
  variants: {
    color: {
      default: [
        "bg-background-item/10 text-foreground",
        "hover:bg-background-item/20",
        "active:bg-background-item/30",
      ],
      primary: [
        "bg-primary text-white",
        "hover:bg-primary-600",
        "active:bg-teal-600",
      ],
      danger: ["bg-danger text-foreground", "hover:bg-danger-600"],
      white: ["bg-white text-black", "hover:bg-white/90", "active:bg-white/80"],
    },
    size: {
      md: ["h-[30px]"],
      lg: ["h-[36px]"],
    },
    variant: {
      solid: [""],
      light: [
        "bg-transparent",
        "hover:bg-foreground/10",
        "active:bg-foreground/20",
      ],
    },
  },
  compoundVariants: [
    {
      color: "default",
      variant: "light",
      className: ["text-foreground"],
    },
    {
      color: "primary",
      variant: "light",
      className: ["text-primary"],
    },
  ],
  defaultVariants: {
    color: "default",
    size: "md",
    variant: "solid",
  },
})

const Button: FC<ButtonProps> = forwardRef(
  ({ children, className, color, size, variant, ...props }, ref) => {
    return (
      <button
        ref={ref}
        {...props}
        className={button({ color, size, variant, class: className })}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = "Button"

export default Button
