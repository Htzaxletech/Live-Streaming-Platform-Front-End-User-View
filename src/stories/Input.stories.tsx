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
    disabled: false,
  },
}

export const withContents: Story = {
  args: {
    placeholder: "Input",
    size: "md",
    startContent: <RiSearchLine className="w-5 h-5 flex-shrink-0" />,
    endContent: <RiChatSmileLine className="w-5 h-5 flex-shrink-0" />,
    disabled: false,
  },
}
