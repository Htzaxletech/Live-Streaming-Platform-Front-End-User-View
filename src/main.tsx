import React from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import { Tooltip } from "react-tooltip"

import { store } from "./store"
import "./i18n"
import "@styles/tailwind.css"

import HomePage from "./pages/HomePage"
import RootPage from "./pages/RootPage"
import ErrorPage from "./pages/ErrorPage"
import DirectoryPage from "./pages/DirectoryPage"
import ThemeProvider from "@components/shared/ThemeProvider"

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "/directory",
        element: <DirectoryPage />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <RouterProvider router={router} />

        <Tooltip
          id="my-tooltip"
          className="!bg-foreground !text-background-body !py-1 !px-2 !text-sm font-semibold"
        />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
)
