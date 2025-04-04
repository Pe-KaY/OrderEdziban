"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Utensils, ShoppingBag } from "lucide-react"

export default function LandingPage() {
  const router = useRouter()
  const [hoveredRole, setHoveredRole] = useState<string | null>(null)

  const handleRoleSelection = (role: string) => {
    if (role === "customer") {
      router.push("/customer")
    } else {
      router.push("/dashboard")
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header with logo */}
      <header className="bg-primary-600 text-white py-6">
        <div className="container mx-auto px-4 flex justify-center items-center">
          <div className="flex items-center space-x-2">
            <div className="bg-white/20 p-2 rounded-full">
              <Utensils className="h-6 w-6" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold">OrderEdziban</h1>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow flex flex-col items-center justify-center p-4 md:p-8 bg-gradient-to-b from-primary-50 to-white">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Welcome to OrderEdziban</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            The ultimate platform connecting food lovers with amazing restaurants. Please select how you'd like to
            continue.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full">
          {/* Customer Option */}
          <div
            className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 transform ${
              hoveredRole === "customer" ? "scale-105" : ""
            } hover:shadow-xl border-2 ${hoveredRole === "customer" ? "border-primary-400" : "border-transparent"}`}
            onMouseEnter={() => setHoveredRole("customer")}
            onMouseLeave={() => setHoveredRole(null)}
          >
            <div className="h-48 bg-gradient-to-r from-primary-100 to-primary-200 flex items-center justify-center">
              <div className="relative h-32 w-32">
                <Image
                  src="/placeholder.svg?height=128&width=128"
                  alt="Food lover"
                  width={128}
                  height={128}
                  className="rounded-full border-4 border-white shadow-md"
                />
                <ShoppingBag className="absolute bottom-0 right-0 h-10 w-10 text-primary-600 bg-white rounded-full p-2 shadow-lg" />
              </div>
            </div>
            <div className="p-6 text-center">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Customer</h3>
              <p className="text-gray-600 mb-6">Browse restaurants, build your meal, and place orders easily.</p>
              <button
                onClick={() => handleRoleSelection("customer")}
                className="w-full py-3 px-6 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                Continue as Customer
              </button>
            </div>
          </div>

          {/* Restaurant Option */}
          <div
            className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 transform ${
              hoveredRole === "restaurant" ? "scale-105" : ""
            } hover:shadow-xl border-2 ${hoveredRole === "restaurant" ? "border-primary-400" : "border-transparent"}`}
            onMouseEnter={() => setHoveredRole("restaurant")}
            onMouseLeave={() => setHoveredRole(null)}
          >
            <div className="h-48 bg-gradient-to-r from-blue-100 to-blue-200 flex items-center justify-center">
              <div className="relative h-32 w-32">
                <Image
                  src="/placeholder.svg?height=128&width=128"
                  alt="Chef"
                  width={128}
                  height={128}
                  className="rounded-full border-4 border-white shadow-md"
                />
                <Utensils className="absolute bottom-0 right-0 h-10 w-10 text-blue-600 bg-white rounded-full p-2 shadow-lg" />
              </div>
            </div>
            <div className="p-6 text-center">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Chop Bar / Restaurant</h3>
              <p className="text-gray-600 mb-6">View and manage incoming orders from customers.</p>
              <button
                onClick={() => handleRoleSelection("restaurant")}
                className="w-full py-3 px-6 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Continue as Restaurant
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 py-6 border-t">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          <p>© 2023 OrderEdziban. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <a href="#" className="hover:text-primary-600 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-primary-600 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-primary-600 transition-colors">
              Contact Us
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

