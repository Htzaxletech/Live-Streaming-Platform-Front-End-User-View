import { useTranslation } from "react-i18next"
import { tv } from "tailwind-variants"
import { IoMdHeart } from "react-icons/io"
import { IoCopyOutline } from "react-icons/io5"

import Button from "@components/ui/Button"
import Logo from "@components/shared/Logo"
import Icon from "@components/shared/Icon"
import UserMenu from "@components/shared/UserMenu"
import NavbarLink from "./NavbarLink"
import NavbarSearchBox from "./NavbarSearchBox"

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
    navCol: ["flex flex-1 h-full items-center", "gap-3 md:gap-5"],
  },
})

const { nav, navCol } = classes()

const Navbar = () => {
  const { t } = useTranslation()

  return (
    <nav className={nav()}>
      <div className={navCol()}>
        <Logo />

        <NavbarLink to={"/following"}>
          <span className="block md:hidden">
            <Icon icon={IoMdHeart} />
          </span>
          <span className="md:block hidden">{t("navbar.link1")}</span>
        </NavbarLink>
        <NavbarLink to={"/directory"}>
          <span className="block md:hidden">
            <Icon icon={IoCopyOutline} />
          </span>
          <span className="md:block hidden">{t("navbar.link2")}</span>
        </NavbarLink>
      </div>
      <div className={navCol({ class: "justify-center hidden md:flex" })}>
        <NavbarSearchBox />
      </div>
      <div className={navCol({ class: "justify-end gap-2.5" })}>
        <Button>{t("navbar.login")}</Button>
        <Button color="primary">{t("navbar.signup")}</Button>
        <UserMenu />
      </div>
    </nav>
  )
}

export default Navbar
