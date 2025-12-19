import { createBrowserRouter } from "react-router-dom"
import { Home } from "./pages/home"
import { Admin } from "./pages/admin"
import { Loguin } from "./pages/Loguin"
import { Network } from "./pages/network"
import { Private } from "./routes/private"
import { Error } from "./pages/error"
import { Cadastro } from "./pages/cadastro" 

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
    path: "/cadastro", 
    element: <Cadastro />
  },
  {
    path: "/admin",
    element: (
      <Private>
        <Admin />
      </Private>
    )
  },
  {
    path: "/network",
    element: <Network />
  },
  {
    path: "*",
    element: <Error />
  }
])

export { router }
