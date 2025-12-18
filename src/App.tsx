import { createBrowserRouter } from "react-router-dom"
import { Home } from "./pages/home"
import { Admin } from "./pages/admin"
import { Loguin } from "./pages/Loguin"
import { Network } from "./pages/network"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/loguin",
    element: <Loguin />
  },
  {
    path: "/admin",
    element: <Admin />   // 🔥 LIBERADO
  },
  {
    path: "/network",
    element: <Network />
  }
])

export { router }
