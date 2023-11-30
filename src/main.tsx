import React from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"

import { store } from "./store"
import "./styles/index.css"
import "./i18n"

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
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
)
