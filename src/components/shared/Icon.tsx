import { ComponentProps, HTMLAttributes } from "react"
import { twMerge } from "tailwind-merge"

export interface IconProps extends HTMLAttributes<SVGElement> {
  icon: (props: ComponentProps<"svg">) => JSX.Element
}

const Icon = ({ icon: Component, className, ...props }: IconProps) => {
  return (
    <Component
      {...props}
      className={twMerge("w-5 h-5 flex-shrink-0", className)}
    />
  )
}

export default Icon
