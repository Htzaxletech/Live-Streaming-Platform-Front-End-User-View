import { ComponentPropsWithRef, FC, forwardRef } from "react"
import { tv, type VariantProps } from "tailwind-variants"

export type TagProps = VariantProps<typeof tag> & ComponentPropsWithRef<"a">

const tag = tv({
  base: [
    "text-xs",
    "font-semibold",
    "text-foreground-secondary",
    "bg-background-item/10",
    "dark:bg-background-item/20",
    "rounded-full",
    "px-2 py-[1px]",
    "hover:bg-background-item/15",
    "dark:hover:bg-background-item/25",
  ],
})

const Tag: FC<TagProps> = forwardRef(
  ({ children, className, ...props }, ref) => {
    return (
      <a {...props} ref={ref} className={tag({ class: className })}>
        {children}
      </a>
    )
  }
)

export default Tag
