import { ReactNode, forwardRef, HTMLAttributes } from "react"
import { type VariantProps, tv } from "tailwind-variants"

const heading = tv({
  base: ["text-foreground", "font-bold"],
  variants: {
    size: {
      xl: ["text-[54px]"],
      lg: ["text-4xl"],
      md: ["text-2xl"],
      sm: ["text-lg"],
    },
  },
  defaultVariants: {
    size: "md",
  },
})

type HeadingVariantProps = VariantProps<typeof heading> &
  HTMLAttributes<HTMLHeadingElement>

export interface HeadingProps extends HeadingVariantProps {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
  children?: ReactNode
}

const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ as: Component = "h1", children, className, size, ...props }, ref) => {
    return (
      <Component
        {...props}
        ref={ref}
        className={heading({ size, class: className })}
      >
        {children}
      </Component>
    )
  }
)

export default Heading
