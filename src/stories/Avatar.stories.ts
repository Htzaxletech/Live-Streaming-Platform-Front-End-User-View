import type { Meta, StoryObj } from "@storybook/react"

import Avatar from "@components/ui/Avatar"

const meta = {
  title: "Primitives/Avatar",
  component: Avatar,
  argTypes: {
    size: {
      options: ["sm", "md", "lg", "xl"],
      control: { type: "radio" },
    },
  },
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    size: "md",
  },
}
export const DefaultPrimary: Story = {
  args: {
    size: "md",
    color: "primary",
  },
}

export const WithImage: Story = {
  args: {
    size: "md",
    src: "/test-avatar.png",
  },
}
