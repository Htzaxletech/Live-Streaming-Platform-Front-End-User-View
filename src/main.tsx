import React from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"

import HomePage from "@pages/HomePage"
import RootPage from "@pages/RootPage"
import ErrorPage from "@pages/ErrorPage"
import DirectoryPage from "@pages/DirectoryPage"

import ThemeProvider from "@components/shared/ThemeProvider"
import ThemedTooltip from "@components/shared/ThemedTooltip"
import FollowingPage from "@pages/FollowingPage"
import ChannelPage from "@pages/ChannelPage"

import { store } from "./store"
import "./i18n"
import "@styles/tailwind.css"

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
      {
        path: "/following",
        element: <FollowingPage />,
      },
      {
        path: "/channel/:id",
        element: <ChannelPage />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <RouterProvider router={router} />
        <ThemedTooltip />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
)
