import type { Preview } from "@storybook/react"

import "../src/styles/index.css"

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: "dark",
      values: [
        {
          name: "dark",
          value: "#141614",
        },
        {
          name: "light",
          value: "#ffffff",
        },
      ],
    },
    darkMode: {
      classTarget: "html",
      current: "light",
      stylePreview: true,
    },
  },
}

export default preview
