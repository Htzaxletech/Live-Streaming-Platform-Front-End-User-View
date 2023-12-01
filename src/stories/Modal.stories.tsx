import type { Meta, StoryObj } from "@storybook/react"

import { Modal } from "@components/ui/Modal"

const meta = {
  title: "Primitives/Modal",
  component: Modal.Content,
  decorators: [
    (story) => (
      <Modal.Root defaultOpen={true}>
        <Modal.Trigger>Trigger</Modal.Trigger>
        {story()}
      </Modal.Root>
    ),
  ],
} satisfies Meta<typeof Modal.Content>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: "Content",
  },
}
