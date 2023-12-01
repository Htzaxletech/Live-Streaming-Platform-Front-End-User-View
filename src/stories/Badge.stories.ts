import type { Meta, StoryObj } from "@storybook/react"

import { Badge } from "@components/ui/Badge"

const meta = {
  title: "Badge",
  component: Badge,
  argTypes: {
    color: {
      options: ["default", "danger"],
      control: { type: "select" },
    },
  },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: "Badge",
    color: "default",
  },
}

export const Danger: Story = {
  args: {
    children: "Badge",
    color: "danger",
  },
}
