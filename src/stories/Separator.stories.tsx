import type { Meta, StoryObj } from "@storybook/react"
import { IoChevronDown } from "react-icons/io5"

import Separator from "@components/ui/Separator"
import Button from "@components/ui/Button"

const meta = {
  title: "Primitives/Separator",
  component: Separator,
} satisfies Meta<typeof Separator>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const withChildren: Story = {
  args: {
    children: (
      <Button color="primary" variant="light" className="gap-[5px]">
        See More
        <IoChevronDown className="w-5 h-5 flex-shrink-0" />
      </Button>
    ),
  },
}
