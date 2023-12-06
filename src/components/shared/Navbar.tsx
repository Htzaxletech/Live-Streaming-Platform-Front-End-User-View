import { useTranslation } from "react-i18next"
import { tv } from "tailwind-variants"

import Logo from "./Logo"
import NavbarLink from "./NavbarLink"
import NavbarSearchBox from "./NavbarSearchBox"
import Button from "@components/ui/Button"
import UserMenu from "./UserMenu"

const classes = tv({
  base: ["border-2 border-black"],
  slots: {
    nav: [
      "h-navbar",
      "flex",
      "px-3 gap-5",
      "shadow-[0_1px_2px_rgba(0,0,0,0.16)]",
      "dark:shadow-[0_1px_2px_rgba(0,0,0,0.8)]",
      "bg-background-base dark:bg-background-float",
    ],
    navCol: ["flex flex-1 h-full items-center", "gap-5"],
  },
})

const { nav, navCol } = classes()

const Navbar = () => {
  const { t } = useTranslation()

  return (
    <nav className={nav()}>
      <div className={navCol()}>
        <Logo />
        <NavbarLink to={"/following"}>{t("navbar.link1")}</NavbarLink>
        <NavbarLink to={"/directory"}>{t("navbar.link2")}</NavbarLink>
        <NavbarLink to={"/channel"}>Socket</NavbarLink>
      </div>
      <div className={navCol({ class: "justify-center" })}>
        <NavbarSearchBox />
      </div>
      <div className={navCol({ class: "justify-end gap-2.5" })}>
        <Button>Log In</Button>
        <Button color="primary">Sign Up</Button>
        <UserMenu />
      </div>
    </nav>
  )
}

export default Navbar
