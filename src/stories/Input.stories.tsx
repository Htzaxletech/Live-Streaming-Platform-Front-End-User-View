import type { Meta, StoryObj } from "@storybook/react"
import { RiSearchLine, RiChatSmileLine } from "react-icons/ri"

import Input from "@components/ui/Input"

const meta = {
  title: "Primitives/Input",
  component: Input,
  argTypes: {
    size: {
      options: ["sm", "md"],
      control: { type: "radio" },
    },
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: "Input",
    size: "md",
    startContent: <RiSearchLine />,
    endContent: <RiChatSmileLine />,
  },
}
