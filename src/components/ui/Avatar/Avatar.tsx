import { FC, ComponentPropsWithRef, forwardRef } from "react"
import { tv, type VariantProps } from "tailwind-variants"
import { GoPerson } from "react-icons/go"

type AvatarVariantProps = VariantProps<typeof avatar> &
  ComponentPropsWithRef<"span">

export interface AvatarProps extends AvatarVariantProps {
  src?: string
  alt?: string
}

const avatar = tv({
  slots: {
    root: [
      "flex",
      "relative",
      "justify-center items-center",
      "w-fit h-fit",
      "text-foreground-secondary",
      "bg-background-base",
      "rounded-full",
      "overflow-hidden",
    ],
    icon: ["w-5 h-5 flex-shrink-0"],
    image: ["w-full h-full object-cover"],
  },
  variants: {
    color: {
      default: {},
      primary: {
        root: ["bg-primary"],
        icon: ["text-foreground"],
      },
    },
    size: {
      sm: {
        root: ["w-[30px] h-[30px]"],
        icon: ["w-4 h-4"],
      },
      md: {
        root: ["w-[40px] h-[40px]"],
        icon: [""],
      },
      lg: {
        root: ["w-[50px] h-[50px]"],
        icon: ["w-7 h-7"],
      },
      xl: {
        root: ["w-[64px] h-[64px]"],
        icon: ["w-9 h-9"],
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
})

const { root, icon, image } = avatar()

const Avatar: FC<AvatarProps> = forwardRef(
  ({ src, alt, color, size, className, ...props }, ref) => {
    return (
      <span
        {...props}
        ref={ref}
        className={root({ color, size, class: className })}
      >
        {src ? (
          <img src={src} alt={alt ? alt : ""} className={image()}></img>
        ) : (
          <GoPerson className={icon({ color, size })} />
        )}
      </span>
    )
  }
)
export default Avatar
