import { useState } from "react"
import {
  Menu as MenuIcon,
  Home,
  Users,
  Package,
  ShoppingCart
} from "react-feather"
import { Link } from "react-router"

export function Menu() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div
      className={`bg-gray-800 text-white ${
        isSidebarOpen ? "w-64" : "w-16"
      } transition-all duration-300 ease-in-out`}
    >
      <div className="p-4 flex flex-col h-full">
        <button
          onClick={toggleSidebar}
          className="text-white focus:outline-none mb-4"
        >
          <MenuIcon
            className={`w-6 h-6 transform transition-transform ${
              isSidebarOpen ? "rotate-180" : ""
            }`}
          />
        </button>
        {isSidebarOpen && (
          <h1 className="text-center text-4xl font-bold">Welcome</h1>
        )}
        <ul className="flex flex-col space-y-5 mt-5">
          <li>
            <Link
              to=""
              className="flex items-center space-x-4 p-2 rounded-md transition-colors hover:bg-blue-700 hover:text-gray-200"
            >
              <Home className="w-6 h-6" />
              {isSidebarOpen && <span>Dashboard</span>}
            </Link>
          </li>
          <li>
            <Link
              to="customer"
              className="flex items-center space-x-4 p-2 rounded-md transition-colors hover:bg-blue-700 hover:text-gray-200"
            >
              <Users className="w-6 h-6" />
              {isSidebarOpen && <span>Customer</span>}
            </Link>
          </li>
          <li>
            <Link
              to="item"
              className="flex items-center space-x-4 p-2 rounded-md transition-colors hover:bg-blue-700 hover:text-gray-200"
            >
              <Package className="w-6 h-6" />
              {isSidebarOpen && <span>Item</span>}
            </Link>
          </li>
          <li>
            <Link
              to="place-order"
              className="flex items-center space-x-4 p-2 rounded-md transition-colors hover:bg-blue-700 hover:text-gray-200"
            >
              <ShoppingCart className="w-6 h-6" />
              {isSidebarOpen && <span>Place Order</span>}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}
