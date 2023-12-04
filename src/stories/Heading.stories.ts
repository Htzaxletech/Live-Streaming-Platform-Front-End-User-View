import type { Meta, StoryObj } from "@storybook/react"

import Heading from "@components/ui/Heading"

const meta = {
  title: "Primitives/Heading",
  component: Heading,
  argTypes: {
    size: {
      options: ["sm", "md", "lg", "xl"],
      control: { type: "radio" },
    },
  },
} satisfies Meta<typeof Heading>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: "Heading",
    size: "md",
  },
}
