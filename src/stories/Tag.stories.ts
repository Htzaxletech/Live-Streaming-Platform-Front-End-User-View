import type { Meta, StoryObj } from "@storybook/react"

import Tag from "@components/ui/Tag"

const meta = {
  title: "Primitives/Tag",
  component: Tag,
} satisfies Meta<typeof Tag>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: "Tag Component",
    href: "#",
  },
}
