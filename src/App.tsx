import { createBrowserRouter, RouterProvider } from "react-router"
import "./App.css"
import { RootLayout } from "./components/RootLayout"
import {Customers} from "./pages/Customer"
import  {Items} from "./pages/Item"
import PlaceOrder from "./pages/PlaceOrder"
import {Dashboard} from "./pages/Dashboard"
import {Provider} from "react-redux";
import {store} from "./store/store.tsx";

function App() {
  const routes = createBrowserRouter([
    {
      path: "",
      element: <RootLayout />,
      children: [
        { path: "", element: <Dashboard /> },
        { path: "/customer", element: <Customers /> },
        { path: "/item", element: <Items /> },
        { path: "/place-order", element: <PlaceOrder /> }
      ]
    }
  ])

  return (
    <>
      <Provider store={store}>
        <RouterProvider router={routes} />
      </Provider>
    </>
  )
}

export default App
