import { Link, LinkProps, useLocation } from "react-router-dom"
import { VariantProps, tv } from "tailwind-variants"

const navbarlink = tv({
  base: [
    "font-bold",
    "h-full pt-0.5",
    "flex items-center",
    "border-b-2 border-transparent",
    "hover:text-primary",
    "transition-all duration-200",
  ],
  variants: {
    active: {
      true: ["text-primary border-primary"],
    },
  },
})

const NavbarLink = ({
  children,
  className,
  ...props
}: LinkProps & VariantProps<typeof navbarlink>) => {
  const location = useLocation()

  return (
    <Link
      {...props}
      className={navbarlink({
        active: location.pathname === props.to,
        class: className,
      })}
    >
      {children}
    </Link>
  )
}

export default NavbarLink
