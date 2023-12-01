import type { Meta, StoryObj } from "@storybook/react"
import { Button } from "@components/ui/Button"

const meta = {
  title: "Button",
  component: Button,
  argTypes: {
    color: {
      options: ["default", "primary"],
      control: { type: "select" },
    },
    // size: {
    //   options: ["md", "lg"],
    //   control: { type: "radio" },
    // },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: "Button",
    color: "default",
    size: "md",
  },
}

export const Primary: Story = {
  args: {
    children: "Button",
    color: "primary",
    size: "md",
  },
}
