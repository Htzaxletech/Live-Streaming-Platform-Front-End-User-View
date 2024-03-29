import UserMenu from "@components/shared/UserMenu"
import type { Meta, StoryObj } from "@storybook/react"

const meta = {
  title: "Shared/Dropdown Menu",
  component: UserMenu,
} satisfies Meta<typeof UserMenu>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
