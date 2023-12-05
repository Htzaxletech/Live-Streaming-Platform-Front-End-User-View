import * as RadixSwitch from "@radix-ui/react-switch"
import { tv } from "tailwind-variants"

const switchVariants = tv({
  slots: {
    root: [
      "relative",
      "w-[35px] h-5",
      "border-foreground border-[2px]",
      "rounded-full",
      "data-[state=checked]:border-primary",
      "disabled:!border-foreground/50",
      "transition-[border-color]",
      "group",
    ],
    thumb: [
      "absolute",
      "top-1/2 left-0",
      "-translate-y-1/2 translate-x-[2px]",
      "w-[12px] h-[12px]",
      "bg-foreground block rounded-full",
      "data-[state=checked]:translate-x-[17px]",
      "data-[state=checked]:bg-primary",
      "group-disabled:!bg-foreground/50",
      "transition-all",
    ],
  },
})

const { root, thumb } = switchVariants()

const Switch = ({ className, ...props }: RadixSwitch.SwitchProps) => (
  <RadixSwitch.Root {...props} className={root({ class: className })}>
    <RadixSwitch.Thumb className={thumb()} />
  </RadixSwitch.Root>
)

export default Switch
