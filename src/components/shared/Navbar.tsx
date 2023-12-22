import { useState } from "react";
import { useTranslation } from "react-i18next"
import { tv } from "tailwind-variants"
import { HiDotsVertical } from "react-icons/hi";
import Logo from "./Logo"
import NavbarLink from "./NavbarLink"
import NavbarSearchBox from "./NavbarSearchBox"
import UserMenu from "./UserMenu"
import Button from "@components/ui/Button"
import Login from "@pages/authentication/Login";

const classes = tv({
  base: ["border-2 border-black"],
  slots: {
    nav: [
      "h-navbar",
      "flex",
      "px-3 gap-5",
      "fixed top-0 w-full z-40",
      "shadow-[0_1px_2px_rgba(0,0,0,0.16)]",
      "dark:shadow-[0_1px_2px_rgba(0,0,0,0.8)]",
      "bg-background-base dark:bg-background-float",
    ],
    navCol: ["flex flex-1 h-full items-center", "gap-5"],
  },
});

const { nav, navCol } = classes()

const Navbar = () => {
  const { t } = useTranslation()
  const [isLoginOpen, setLoginOpen] = useState(false);


  return (
    <div>
      <Login isLoginOpen={isLoginOpen} setLoginOpen={setLoginOpen} />
      <nav className={nav()}>
        <div className={navCol()}>
          <Logo />
          <NavbarLink to={"/following"}>{t("navbar.link1")}</NavbarLink>
          <NavbarLink to={"/directory"}>{t("navbar.link2")}</NavbarLink>
          <NavbarLink to={"/channel/1"}>Socket</NavbarLink>
          <a data-tooltip-id="my-tooltip" data-tooltip-content="More">
            <Button className="bg-transparent p-0">
              <HiDotsVertical className="text-xl" />
            </Button>
          </a>
        </div>
        <div className={navCol({ class: "justify-center" })}>
          <NavbarSearchBox />
        </div>
        <div className={navCol({ class: "justify-end gap-2.5" })}>
          <Button onClick={() => setLoginOpen(true)}>Log In</Button>
          <Button color="primary">Sign Up</Button>
          <UserMenu />
        </div>
        <Login />
      </nav>
    </div>
  );
}

export default Navbar
