import type { Meta, StoryObj } from "@storybook/react"

import Logo from "@components/shared/Logo"

const meta = {
  title: "Logo",
  component: Logo,
  argTypes: {},
} satisfies Meta<typeof Logo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
