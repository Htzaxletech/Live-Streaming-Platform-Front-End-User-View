import react from "@vitejs/plugin-react-swc";
import path from "path";
import svgr from "vite-plugin-svgr";
import { defineConfig } from "vite";
import { qrcode } from "vite-plugin-qrcode";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";

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
			"@store": path.resolve(__dirname, "./src/store"),
			"@routes": path.resolve(__dirname, "./src/routes"),
			"@services": path.resolve(__dirname, "./src/services"),
			"@socket": path.resolve(__dirname, "./src/socket"),
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
		qrcode(),
		ViteImageOptimizer(),
	],
	server: {
		open: "/",
	},
});
