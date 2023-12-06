import { ComponentProps } from "react"
import { Link } from "react-router-dom"
import { tv } from "tailwind-variants"

import LogoImage from "@assets/images/logo.svg?react"

const logo = tv({
  base: ["flex w-6 h-7"],
})

const Logo = ({ className }: ComponentProps<"svg">) => {
  return (
    <Link to={"/"} className={logo({ class: className })}>
      <LogoImage className="w-full h-full" />
    </Link>
  )
}

export default Logo
