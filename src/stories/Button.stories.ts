import type { Meta, StoryObj } from "@storybook/react"
import { Button } from "@components/ui/Button"

const meta = {
  title: "Primitives/Button",
  component: Button,
  argTypes: {
    color: {
      options: ["default", "primary", "white"],
      control: { type: "select" },
    },
    variant: {
      options: ["solid", "light"],
      control: { type: "select" },
    },
    disabled: {
      control: "boolean",
    },
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

export const DefaultLight: Story = {
  args: {
    children: "Button",
    color: "default",
    size: "md",
    variant: "light",
    disabled: false,
  },
}

export const Primary: Story = {
  args: {
    children: "Button",
    color: "primary",
    size: "md",
    disabled: false,
  },
}

export const PrimaryLight: Story = {
  args: {
    children: "Button",
    color: "primary",
    size: "md",
    variant: "light",
    disabled: false,
  },
}

export const White: Story = {
  args: {
    children: "Button",
    color: "white",
    size: "md",
    disabled: false,
  },
}
