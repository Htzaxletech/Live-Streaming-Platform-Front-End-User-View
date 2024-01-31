import { FC, ComponentPropsWithRef, forwardRef } from "react"
import { tv, type VariantProps } from "tailwind-variants"

type ButtonVariantProps = VariantProps<typeof button>

type ButtonProps = ButtonVariantProps & ComponentPropsWithRef<"button">

const button = tv({
  base: [
    "font-semibold text-sm/none",
    "flex flex-shrink-0 whitespace-nowrap",
    "items-center justify-center",
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
        "active:bg-primary-700",
      ],
      danger: ["bg-danger text-white", "hover:bg-danger-600"],
      white: ["bg-white text-black", "hover:bg-white/90", "active:bg-white/80"],
    },
    size: {
      md: ["h-[30px] min-w-[30px]"],
      lg: ["h-[36px] min-w-[36px]"],
    },
    variant: {
      solid: [""],
      light: [
        "bg-transparent",
        "hover:bg-foreground/10",
        "active:bg-foreground/20",
      ],
    },
    iconOnly: {
      true: ["justify-center", "px-0 py-0"],
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
  ({ children, className, color, size, variant, iconOnly, ...props }, ref) => {
    return (
      <button
        ref={ref}
        {...props}
        className={button({ color, size, variant, iconOnly, class: className })}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = "Button"

export default Button
