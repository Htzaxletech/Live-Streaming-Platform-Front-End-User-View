import { ComponentPropsWithRef, FC } from "react"
import { type VariantProps, tv } from "tailwind-variants"

type BadgeVariantProps = VariantProps<typeof badge>

type BadgeProps = BadgeVariantProps & ComponentPropsWithRef<"span">

const badge = tv({
  base: [
    "flex",
    "justify-center items-center",
    "font-semibold text-[13px]",
    "w-fit h-fit",
    "min-w-[8px] min-h-[8px]",
    "px-2 py-[1px]",
    "rounded-md",
  ],
  variants: {
    color: {
      default: ["text-black bg-foreground/40"],
      danger: ["bg-danger text-white"],
    },
  },
  defaultVariants: {
    color: "default",
  },
})

const Badge: FC<BadgeProps> = ({ children, className, color, ...props }) => {
  return (
    <span {...props} className={badge({ color, class: className })}>
      {children}
    </span>
  )
}

export default Badge
