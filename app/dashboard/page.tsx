"use client"

import { useState } from "react"
import { Clock, ChevronDown, ChevronUp, Search, Filter, Bell, User, MenuIcon, X } from "lucide-react"
import Image from "next/image"

// Sample data for orders
const sampleOrders = [
  {
    id: "ORD-1234",
    customer: "John Smith",
    items: [
      { name: "Margherita Pizza", quantity: 1, price: 12.99, notes: "Extra cheese please" },
      { name: "Garlic Bread", quantity: 1, price: 4.99, notes: "" },
      { name: "Coca Cola", quantity: 2, price: 2.99, notes: "No ice" },
    ],
    total: 23.96,
    time: "10:30 AM",
    status: "New",
    tableNumber: "12",
    type: "Dine-in",
  },
  {
    id: "ORD-1235",
    customer: "Sarah Johnson",
    items: [
      { name: "Chicken Alfredo", quantity: 1, price: 15.99, notes: "" },
      { name: "Caesar Salad", quantity: 1, price: 8.99, notes: "Dressing on the side" },
      { name: "Iced Tea", quantity: 1, price: 2.99, notes: "" },
    ],
    total: 27.97,
    time: "10:35 AM",
    status: "Preparing",
    tableNumber: "8",
    type: "Dine-in",
  },
  {
    id: "ORD-1236",
    customer: "Michael Brown",
    items: [
      { name: "Double Cheeseburger", quantity: 2, price: 14.99, notes: "Medium well" },
      { name: "French Fries", quantity: 2, price: 4.99, notes: "Extra crispy" },
      { name: "Chocolate Milkshake", quantity: 2, price: 5.99, notes: "" },
    ],
    total: 51.94,
    time: "10:40 AM",
    status: "Ready",
    tableNumber: "Pickup",
    type: "Takeout",
  },
  {
    id: "ORD-1237",
    customer: "Emily Davis",
    items: [
      { name: "Vegetable Stir Fry", quantity: 1, price: 13.99, notes: "No mushrooms" },
      { name: "Spring Rolls", quantity: 1, price: 6.99, notes: "" },
      { name: "Green Tea", quantity: 1, price: 2.99, notes: "" },
    ],
    total: 23.97,
    time: "10:45 AM",
    status: "New",
    tableNumber: "15",
    type: "Dine-in",
  },
  {
    id: "ORD-1238",
    customer: "David Wilson",
    items: [
      { name: "Pepperoni Pizza", quantity: 1, price: 14.99, notes: "" },
      { name: "Buffalo Wings", quantity: 1, price: 10.99, notes: "Extra spicy" },
      { name: "Beer", quantity: 2, price: 5.99, notes: "" },
    ],
    total: 37.96,
    time: "10:50 AM",
    status: "Completed",
    tableNumber: "Delivery",
    type: "Delivery",
  },
  {
    id: "ORD-1239",
    customer: "Jennifer Taylor",
    items: [
      { name: "Spaghetti Bolognese", quantity: 1, price: 13.99, notes: "" },
      { name: "Garlic Bread", quantity: 1, price: 4.99, notes: "" },
      { name: "Tiramisu", quantity: 1, price: 7.99, notes: "" },
      { name: "Sparkling Water", quantity: 1, price: 2.99, notes: "" },
    ],
    total: 29.96,
    time: "10:55 AM",
    status: "Preparing",
    tableNumber: "6",
    type: "Dine-in",
  },
]

// Status colors
const statusColors = {
  New: "bg-blue-100 text-blue-800",
  Preparing: "bg-yellow-100 text-yellow-800",
  Ready: "bg-green-100 text-green-800",
  Completed: "bg-gray-100 text-gray-800",
}

// Action buttons based on status
const getActionButtons = (status: string, onStatusChange: (newStatus: string) => void) => {
  switch (status) {
    case "New":
      return (
        <button
          onClick={() => onStatusChange("Preparing")}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md transition-colors"
        >
          Start Preparing
        </button>
      )
    case "Preparing":
      return (
        <button
          onClick={() => onStatusChange("Ready")}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors"
        >
          Mark as Ready
        </button>
      )
    case "Ready":
      return (
        <button
          onClick={() => onStatusChange("Completed")}
          className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-md transition-colors"
        >
          Complete Order
        </button>
      )
    case "Completed":
      return (
        <button className="bg-gray-300 text-gray-600 px-4 py-2 rounded-md cursor-not-allowed" disabled>
          Completed
        </button>
      )
    default:
      return null
  }
}

export default function Dashboard() {
  const [orders, setOrders] = useState(sampleOrders)
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null)
  const [activeFilter, setActiveFilter] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  // Filter orders based on active filter and search query
  const filteredOrders = orders.filter((order) => {
    const matchesFilter = activeFilter === "All" || order.status === activeFilter
    const matchesSearch =
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesFilter && matchesSearch
  })

  // Handle order status change
  const handleStatusChange = (orderId: string, newStatus: string) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)),
    )
  }

  // Toggle order expansion
  const toggleOrderExpansion = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => setIsSidebarOpen(false)}
      ></div>

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-4 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-800">OrderEdziban Dashboard</h2>
            <button onClick={() => setIsSidebarOpen(false)} className="text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <a href="#" className="flex items-center p-2 rounded-md bg-primary-50 text-primary-600">
                <span className="mr-3">📋</span>
                Orders
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center p-2 rounded-md text-gray-700 hover:bg-gray-100">
                <span className="mr-3">🍽️</span>
                Menu
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center p-2 rounded-md text-gray-700 hover:bg-gray-100">
                <span className="mr-3">👥</span>
                Customers
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center p-2 rounded-md text-gray-700 hover:bg-gray-100">
                <span className="mr-3">📊</span>
                Analytics
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center p-2 rounded-md text-gray-700 hover:bg-gray-100">
                <span className="mr-3">⚙️</span>
                Settings
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="md:hidden p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none"
              >
                <MenuIcon size={24} />
              </button>
              <div className="hidden md:flex items-center">
                <Image
                  src="/placeholder.svg?height=40&width=40"
                  alt="Restaurant Logo"
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-md"
                />
                <h1 className="ml-3 text-xl font-bold text-gray-800">OrderEdziban Dashboard</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 relative">
                <Bell size={20} />
                <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                  3
                </span>
              </button>
              <div className="relative">
                <button className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100">
                  <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                    <User size={16} className="text-gray-600" />
                  </div>
                  <span className="hidden md:inline text-sm font-medium text-gray-700">Chef Michael</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="md:flex md:items-center md:justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Order Management</h2>
          <div className="mt-4 md:mt-0 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search orders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 w-full"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            </div>
            <div className="relative inline-block text-left">
              <button className="inline-flex justify-center items-center w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500">
                <Filter size={18} className="mr-2" />
                Filter
              </button>
            </div>
          </div>
        </div>

        {/* Status Tabs */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="flex space-x-4 overflow-x-auto pb-1 hide-scrollbar">
            {["All", "New", "Preparing", "Ready", "Completed"].map((status) => (
              <button
                key={status}
                onClick={() => setActiveFilter(status)}
                className={`px-3 py-2 text-sm font-medium rounded-md whitespace-nowrap ${
                  activeFilter === status
                    ? "bg-primary-100 text-primary-700 border-b-2 border-primary-500"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                }`}
              >
                {status}
                {status !== "All" && (
                  <span className="ml-2 bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs">
                    {orders.filter((order) => order.status === status).length}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <p className="text-gray-500">No orders found matching your criteria.</p>
            </div>
          ) : (
            filteredOrders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg shadow overflow-hidden">
                {/* Order Header */}
                <div
                  className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => toggleOrderExpansion(order.id)}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <div
                          className={`h-10 w-10 rounded-md flex items-center justify-center ${
                            order.status === "New"
                              ? "bg-blue-100 text-blue-600"
                              : order.status === "Preparing"
                                ? "bg-yellow-100 text-yellow-600"
                                : order.status === "Ready"
                                  ? "bg-green-100 text-green-600"
                                  : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {order.type === "Dine-in" ? "🍽️" : order.type === "Takeout" ? "🥡" : "🚚"}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">{order.id}</h3>
                        <p className="text-sm text-gray-600">{order.customer}</p>
                      </div>
                    </div>
                    <div className="mt-2 sm:mt-0 flex flex-col sm:flex-row sm:items-center sm:space-x-4">
                      <div className="flex items-center space-x-2">
                        <Clock size={16} className="text-gray-400" />
                        <span className="text-sm text-gray-500">{order.time}</span>
                      </div>
                      <div className="mt-1 sm:mt-0">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[order.status as keyof typeof statusColors]}`}
                        >
                          {order.status}
                        </span>
                      </div>
                      <div className="mt-1 sm:mt-0 flex items-center space-x-2">
                        <span className="text-sm font-medium text-gray-900">${order.total.toFixed(2)}</span>
                        {expandedOrder === order.id ? (
                          <ChevronUp size={16} className="text-gray-500" />
                        ) : (
                          <ChevronDown size={16} className="text-gray-500" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Details (Expanded) */}
                {expandedOrder === order.id && (
                  <div className="border-t border-gray-200 px-4 py-5 sm:p-6 bg-gray-50">
                    <div className="mb-4 flex justify-between items-center">
                      <div>
                        <span className="text-sm font-medium text-gray-500">Table/Delivery:</span>
                        <span className="ml-2 text-sm text-gray-900">{order.tableNumber}</span>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500">Order Type:</span>
                        <span className="ml-2 text-sm text-gray-900">{order.type}</span>
                      </div>
                    </div>

                    <h4 className="text-sm font-medium text-gray-500 mb-3">Order Items</h4>
                    <ul className="divide-y divide-gray-200 mb-6">
                      {order.items.map((item, index) => (
                        <li key={index} className="py-3">
                          <div className="flex justify-between">
                            <div className="flex-1">
                              <div className="flex justify-between">
                                <p className="text-sm font-medium text-gray-900">
                                  {item.quantity}x {item.name}
                                </p>
                                <p className="text-sm text-gray-900 ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                              </div>
                              {item.notes && <p className="mt-1 text-xs text-gray-500 italic">Note: {item.notes}</p>}
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>

                    <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
                      <div>
                        <p className="text-base font-medium text-gray-900">Total: ${order.total.toFixed(2)}</p>
                      </div>
                      <div>
                        {getActionButtons(order.status, (newStatus) => handleStatusChange(order.id, newStatus))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  )
}

