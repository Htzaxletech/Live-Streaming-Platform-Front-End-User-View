import type { Meta, StoryObj } from "@storybook/react"

import { VerifiedBadge } from "@components/shared/VerifiedBadge"

const meta = {
  title: "Shared/VerifiedBadge",
  component: VerifiedBadge,
} satisfies Meta<typeof VerifiedBadge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
