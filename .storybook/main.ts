import type { StorybookConfig } from "@storybook/react-vite"
import { mergeConfig } from "vite"
import svgr from "vite-plugin-svgr"

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
    "storybook-dark-mode",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  core: {
    builder: "@storybook/builder-vite", // The builder enabled here.
  },
  viteFinal: (config) =>
    mergeConfig(config, {
      plugins: [svgr({ include: "**/*.svg" })],
    }),
}
export default config
