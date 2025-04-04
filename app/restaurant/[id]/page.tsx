"use client"

import type React from "react"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import {
  Star,
  Clock,
  Truck,
  ChevronLeft,
  ShoppingBag,
  Heart,
  Share2,
  Filter,
  Search,
  Plus,
  Minus,
  Trash2,
} from "lucide-react"

// Sample restaurant data
const restaurantData = {
  id: "garden-bistro",
  name: "The Garden Bistro & Lounge",
  rating: 4.8,
  reviews: 324,
  deliveryTime: "25-35 min",
  deliveryFee: "Free",
  image:
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
  coverImage:
    "https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
  description:
    "Refined dining experience featuring farm-to-table cuisine in an elegant garden environment. Renowned for organic produce and seasonal culinary offerings.",
  categories: [
    {
      id: "starters",
      name: "Starters",
      items: [
        {
          id: "garden-salad",
          name: "Garden Fresh Seasonal Salad",
          description: "Organic greens, heritage tomatoes, cucumber, with proprietary dressing.",
          price: 9.95,
          image:
            "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
        },
        {
          id: "bruschetta",
          name: "Artisanal Bruschetta",
          description: "Toasted sourdough topped with diced tomatoes, fresh basil, and aged balsamic glaze.",
          price: 8.95,
          image:
            "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
        },
      ],
    },
    {
      id: "main-courses",
      name: "Main Courses",
      items: [
        {
          id: "margherita-pizza",
          name: "Margherita Pizza (Signature)",
          description: "Premium mozzarella, vine-ripened tomatoes, fresh basil on house-crafted sourdough foundation.",
          price: 14.95,
          image:
            "https://images.unsplash.com/photo-1551183053-bf91a1d81141?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
        },
        {
          id: "grilled-salmon",
          name: "Grilled Wild Salmon (Sustainable)",
          description: "Responsibly sourced salmon with organic quinoa and seasonal vegetable accompaniment.",
          price: 22.95,
          image:
            "https://images.unsplash.com/photo-1560717789-0ac7c58ac90a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
        },
        {
          id: "gourmet-burger",
          name: "Signature Gourmet Burger",
          description:
            "Grass-fed premium beef, aged artisanal cheddar, caramelized onion reduction, house-made aioli, on a freshly baked brioche bun.",
          price: 16.95,
          image:
            "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
        },
      ],
    },
    {
      id: "desserts",
      name: "Desserts",
      items: [
        {
          id: "tiramisu",
          name: "Classic Tiramisu",
          description: "Espresso-soaked ladyfingers layered with mascarpone cream and dusted with cocoa powder.",
          price: 8.95,
          image:
            "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
        },
        {
          id: "chocolate-lava-cake",
          name: "Chocolate Lava Cake",
          description: "Warm chocolate cake with a molten center, served with vanilla bean ice cream.",
          price: 9.95,
          image:
            "https://images.unsplash.com/photo-1617305855058-336d24456869?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
        },
      ],
    },
    {
      id: "beverages",
      name: "Beverages",
      items: [
        {
          id: "fresh-lemonade",
          name: "Fresh-Squeezed Lemonade",
          description: "House-made lemonade with mint and honey.",
          price: 4.95,
          image:
            "https://images.unsplash.com/photo-1621263764928-df1444c5e859?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
        },
        {
          id: "iced-tea",
          name: "Artisanal Iced Tea",
          description: "Cold-brewed black tea with seasonal fruit infusions.",
          price: 3.95,
          image:
            "https://images.unsplash.com/photo-1556679343-c1306ee5277b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
        },
      ],
    },
  ],
}

// Types
type MenuItem = {
  id: string
  name: string
  description: string
  price: number
  image: string
}

type CartItem = MenuItem & {
  quantity: number
}

export default function RestaurantPage() {
  const params = useParams()
  const router = useRouter()
  const [activeCategory, setActiveCategory] = useState("all")
  const [cart, setCart] = useState<CartItem[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isDragging, setIsDragging] = useState(false)

  // Calculate totals
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * 0.085 // 8.5% tax
  const deliveryFee = 0 // Free delivery
  const total = subtotal + tax + deliveryFee

  // Filter menu items based on search query and active category
  const filteredItems = restaurantData.categories.flatMap((category) => {
    if (activeCategory !== "all" && category.id !== activeCategory) {
      return []
    }

    return category.items.filter(
      (item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  })

  // Handle drag start
  const handleDragStart = (e: React.DragEvent, item: MenuItem) => {
    e.dataTransfer.setData("application/json", JSON.stringify(item))
    setIsDragging(true)
  }

  // Handle drag end
  const handleDragEnd = () => {
    setIsDragging(false)
  }

  // Handle drop
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    try {
      const itemData = JSON.parse(e.dataTransfer.getData("application/json")) as MenuItem
      addToCart(itemData)
    } catch (error) {
      console.error("Error parsing dropped item:", error)
    }
    setIsDragging(false)
  }

  // Handle drag over
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  // Add item to cart
  const addToCart = (item: MenuItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id)

      if (existingItem) {
        // Item already exists, increase quantity
        return prevCart.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem,
        )
      } else {
        // Add new item with quantity 1
        return [...prevCart, { ...item, quantity: 1 }]
      }
    })
  }

  // Remove item from cart
  const removeFromCart = (itemId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId))
  }

  // Update item quantity
  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(itemId)
      return
    }

    setCart((prevCart) => prevCart.map((item) => (item.id === itemId ? { ...item, quantity: newQuantity } : item)))
  }

  // Handle place order
  const handlePlaceOrder = () => {
    if (cart.length === 0) {
      alert("Please add items to your cart before placing an order.")
      return
    }

    // In a real app, this would send the order to a backend
    alert(`Order placed successfully! Total: $${total.toFixed(2)}`)
    setCart([])
  }

  return (
    <div className="max-w-7xl mx-auto bg-white">
      {/* Restaurant Header */}
      <div className="relative h-64 md:h-80">
        <Image
          src={restaurantData.coverImage || "/placeholder.svg"}
          alt={restaurantData.name}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <button
          onClick={() => router.back()}
          className="absolute top-4 left-4 bg-white/20 backdrop-blur-md p-2 rounded-full hover:bg-white/30 transition-colors"
        >
          <ChevronLeft className="text-white" />
        </button>
        <div className="absolute bottom-4 left-4 text-white">
          <h1 className="text-2xl md:text-3xl font-bold">{restaurantData.name}</h1>
          <div className="flex items-center mt-2 space-x-4">
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-400 mr-1" />
              <span>{restaurantData.rating}</span>
              <span className="text-gray-300 ml-1">({restaurantData.reviews} reviews)</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              <span>{restaurantData.deliveryTime}</span>
            </div>
            <div className="flex items-center">
              <Truck className="w-4 h-4 mr-1" />
              <span>{restaurantData.deliveryFee} delivery</span>
            </div>
          </div>
        </div>
        <div className="absolute top-4 right-4 flex space-x-2">
          <button className="bg-white/20 backdrop-blur-md p-2 rounded-full hover:bg-white/30 transition-colors">
            <Heart className="text-white w-5 h-5" />
          </button>
          <button className="bg-white/20 backdrop-blur-md p-2 rounded-full hover:bg-white/30 transition-colors">
            <Share2 className="text-white w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row">
        {/* Menu Section */}
        <div className="w-full lg:w-2/3 p-4">
          {/* Search and Filter */}
          <div className="mb-6 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search menu items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-300"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
            </div>
            <div className="flex items-center">
              <Filter className="text-gray-500 mr-2" />
              <span className="text-gray-700 mr-2">Filter:</span>
              <select
                value={activeCategory}
                onChange={(e) => setActiveCategory(e.target.value)}
                className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary-300"
              >
                <option value="all">All Items</option>
                {restaurantData.categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Categories */}
          <div className="mb-6 overflow-x-auto">
            <div className="flex space-x-2 pb-2">
              <button
                onClick={() => setActiveCategory("all")}
                className={`whitespace-nowrap px-4 py-2 rounded-full transition-colors ${
                  activeCategory === "all"
                    ? "bg-primary-600 text-white"
                    : "bg-white border border-gray-300 hover:bg-gray-100"
                }`}
              >
                All Items
              </button>
              {restaurantData.categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`whitespace-nowrap px-4 py-2 rounded-full transition-colors ${
                    activeCategory === category.id
                      ? "bg-primary-600 text-white"
                      : "bg-white border border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Menu Items */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                draggable
                onDragStart={(e) => handleDragStart(e, item)}
                onDragEnd={handleDragEnd}
                className={`bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 cursor-move ${
                  isDragging ? "opacity-50" : "opacity-100"
                }`}
              >
                <div className="flex flex-col sm:flex-row">
                  <div className="w-full sm:w-24 h-24 overflow-hidden rounded-t-lg sm:rounded-l-lg sm:rounded-t-none">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3 flex-1">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">{item.description}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="font-medium">${item.price.toFixed(2)}</span>
                      <button
                        onClick={() => addToCart(item)}
                        className="text-primary-600 hover:text-primary-800 transition-colors p-1 rounded-full hover:bg-primary-50"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cart Section */}
        <div className="w-full lg:w-1/3 p-4">
          <div
            className={`sticky top-4 bg-white rounded-lg border border-gray-200 shadow-md p-4 ${
              isDragging ? "ring-2 ring-primary-500 bg-primary-50" : ""
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <ShoppingBag className="mr-2 w-5 h-5" />
              My Meal
            </h2>

            {/* Drop Zone */}
            {cart.length === 0 ? (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 mb-4 flex flex-col items-center justify-center text-center">
                <div className="bg-gray-100 p-3 rounded-full mb-3">
                  <ShoppingBag className="w-6 h-6 text-gray-500" />
                </div>
                <p className="text-gray-500 mb-2">Your meal is empty</p>
                <p className="text-sm text-gray-400">Drag items here to build your meal</p>
              </div>
            ) : (
              <div className="mb-4 max-h-[400px] overflow-y-auto">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center p-3 border-b border-gray-100 last:border-b-0">
                    <div className="w-12 h-12 rounded-md overflow-hidden mr-3">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{item.name}</h4>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-sm text-gray-600">${item.price.toFixed(2)}</span>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="text-gray-500 hover:text-gray-700 transition-colors p-1 rounded-full hover:bg-gray-100"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-sm w-4 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="text-gray-500 hover:text-gray-700 transition-colors p-1 rounded-full hover:bg-gray-100"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-700 transition-colors p-1 rounded-full hover:bg-red-50 ml-1"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Order Summary */}
            <div className="border-t border-gray-200 pt-3 mb-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Tax (8.5%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Delivery Fee</span>
                <span>${deliveryFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold mt-3 pt-3 border-t border-gray-200">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Place Order Button */}
            <button
              onClick={handlePlaceOrder}
              disabled={cart.length === 0}
              className={`w-full py-3 px-4 rounded-lg font-medium flex items-center justify-center ${
                cart.length === 0
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-primary-600 text-white hover:bg-primary-700 transition-colors"
              }`}
            >
              <ShoppingBag className="mr-2 w-5 h-5" />
              Place Order
            </button>

            <div className="text-xs text-gray-500 mt-4 text-center">
              Estimated delivery: {restaurantData.deliveryTime}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

