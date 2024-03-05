import ReactDOM from "react-dom/client";
// import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
// import { appRouter } from "./routes";

import ThemeProvider from "@components/shared/ThemeProvider";
import ThemedTooltip from "@components/shared/ThemedTooltip";

import "@styles/tailwind.css";
import "react-toastify/dist/ReactToastify.css";
import "react-loading-skeleton/dist/skeleton.css";
import "./i18n";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
	// <React.StrictMode>
	<Provider store={store}>
		<ThemeProvider>
			<App />
			<ThemedTooltip />
		</ThemeProvider>
	</Provider>
	// </React.StrictMode>
);
