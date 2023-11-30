import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"
import path from "path"
import svgr from "vite-plugin-svgr"

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@styles": path.resolve(__dirname, "./src/styles"),
    },
  },
  plugins: [
    svgr({
      // svgr options: https://react-svgr.com/docs/options/
      svgrOptions: {},
      esbuildOptions: {},
      include: "**/*.svg?react",
      exclude: "",
    }),
    react(),
  ],
})
