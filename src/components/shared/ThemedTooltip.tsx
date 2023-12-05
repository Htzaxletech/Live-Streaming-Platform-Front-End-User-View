import { Tooltip } from "react-tooltip"

const ThemedTooltip = () => {
  return (
    <Tooltip
      id="my-tooltip"
      className="!bg-foreground !text-background-body !py-1 !px-2 !text-sm font-semibold"
    />
  )
}

export default ThemedTooltip
