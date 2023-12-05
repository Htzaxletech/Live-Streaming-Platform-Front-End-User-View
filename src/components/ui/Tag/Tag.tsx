import { FC, Ref, forwardRef } from "react"
import { Link, LinkProps } from "react-router-dom"
import { tv, type VariantProps } from "tailwind-variants"

export type TagProps = VariantProps<typeof tag> & LinkProps

const tag = tv({
  base: [
    "text-xs",
    "font-semibold",
    "text-foreground-secondary",
    "bg-background-item/10",
    "rounded-full",
    "px-2 py-[3px]",
    "hover:bg-background-item/15",
    "active:bg-background-item/20",
  ],
})

const Tag: FC<TagProps> = forwardRef(
  ({ children, className, ...props }, ref: Ref<HTMLAnchorElement>) => {
    return (
      <Link {...props} ref={ref} className={tag({ class: className })}>
        {children}
      </Link>
    )
  }
)

export default Tag
