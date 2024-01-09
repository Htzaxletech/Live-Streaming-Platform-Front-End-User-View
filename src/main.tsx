import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import { appRouter } from "./routes";

import ThemeProvider from "@components/shared/ThemeProvider";
import ThemedTooltip from "@components/shared/ThemedTooltip";

import "@styles/tailwind.css";
import "./i18n";

ReactDOM.createRoot(document.getElementById("root")!).render(
	// <React.StrictMode>
	<Provider store={store}>
		<ThemeProvider>
			<RouterProvider router={appRouter} />
			<ThemedTooltip />
		</ThemeProvider>
	</Provider>
	// </React.StrictMode>
);
