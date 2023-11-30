import { tv } from "tailwind-variants"
import LogoImage from "@assets/images/logo.svg?react"
import { ComponentProps } from "react"

const logo = tv({
  base: ["w-6 h-7"],
})

const Logo = ({ className }: ComponentProps<"svg">) => {
  return <LogoImage className={logo({ class: className })} />
}

export default Logo
