import { useEffect, useState } from "react";
import { tv } from "tailwind-variants";
import Logo from "./Logo";
import NavbarSearchBox from "./NavbarSearchBox";
import UserMenu from "./UserMenu";
import Button from "@components/ui/Button";
import Login from "@pages/authentication/Login";
import NavbarMenu from "./NavbarMenu";
import SignUp from "@pages/authentication/SignUp";
import OTP from "@pages/authentication/OTP";
import TwoFactor from "@pages/authentication/TwoFactor";

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

const { nav, navCol } = classes();

const Navbar = () => {
  const [isOpenLogin, setOpenLogin] = useState(false);
  const [isOpenSignUp, setOpenSignUp] = useState(false);
  const [switchToSignUp, setSwitchToSignUp] = useState(false);
  const [switchToLogin, setSwitchToLogin] = useState(false);
  const [isOpenOTP, setOpenOTP] = useState(false);
  const [isOpenTwoFactor, setOpenTwoFactor] = useState(false);

  useEffect(() => {
    if (switchToLogin) {
      setSwitchToSignUp(false);
      setOpenSignUp(false);
      setOpenLogin(true);
    }

    if (switchToSignUp) {
      setSwitchToLogin(false);
      setOpenLogin(false);
      setSwitchToSignUp(true);
      setOpenSignUp(true);
    }
  }, [switchToLogin, switchToSignUp]);

  useEffect(() => {
    if (!isOpenLogin) {
      setSwitchToSignUp(false);
    }

    if (!isOpenSignUp) {
      setSwitchToLogin(false);
    }
  }, [isOpenLogin, isOpenSignUp]);

  return (
    <div>
      {isOpenLogin && (
        <Login
          isOpenLogin={isOpenLogin}
          setOpenLogin={setOpenLogin}
          setSwitchToSignUp={setSwitchToSignUp}
        />
      )}

      {isOpenSignUp && (
        <SignUp
          isOpenSignUp={isOpenSignUp}
          setOpenSignUp={setOpenSignUp}
          setSwitchToLogin={setSwitchToLogin}
          setOpenOTP={setOpenOTP}
        />
      )}

      {isOpenOTP && <OTP isOpenOTP={isOpenOTP} setOpenOTP={setOpenOTP} />}

      {isOpenTwoFactor && (
        <TwoFactor
          isOpenTwoFactor={isOpenTwoFactor}
          setOpenTwoFactor={setOpenTwoFactor}
          setOpenLogin={setOpenLogin}
        />
      )}
      
      <nav className={nav()}>
        <div className={navCol()}>
          <div className="w-[48px] justify-center flex">
            <Logo />
          </div>
          <NavbarMenu />
        </div>
        <div className={navCol({ class: "justify-center" })}>
          <NavbarSearchBox className="hidden sm:flex" />
        </div>
        <div className={navCol({ class: "justify-end gap-2.5" })}>
          <Button onClick={() => setOpenLogin(true)}>Log In</Button>
          <Button color="primary" onClick={() => setOpenSignUp(true)}>
            Sign Up
          </Button>
          <Button color="primary" onClick={() => setOpenTwoFactor(true)}>
            2FA
          </Button>
          <UserMenu />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
