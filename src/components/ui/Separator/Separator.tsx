import { ComponentPropsWithRef, FC, forwardRef } from "react"
import { tv, type VariantProps } from "tailwind-variants"

type SeparatorProps = VariantProps<typeof separator> &
  ComponentPropsWithRef<"div">

const separator = tv({
  slots: {
    root: ["flex", "items-center", "gap-[10px]"],
    line: ["h-[0.8px]", "flex-1", "w-full", "bg-foreground/20"],
  },
})

const { root, line } = separator()

const Separator: FC<SeparatorProps> = forwardRef(
  ({ className, children, ...props }, ref) => {
    return children ? (
      <div {...props} ref={ref} className={root({ class: className })}>
        <div className={line()} />
        {children}
        <div className={line()} />
      </div>
    ) : (
      <div {...props} ref={ref} className={line({ class: className })} />
    )
  }
)

export default Separator
