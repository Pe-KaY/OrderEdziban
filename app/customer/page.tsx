"use client"

import CustomerHeader from "../components/customer/Header"
import {
  Star,
  LocateOffIcon as LocationOn,
  CalendarIcon as Schedule,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function CustomerDashboard() {
  return (
    <div className="w-full max-w-[1200px] mx-auto bg-white">
      <CustomerHeader />
      <section className="p-6">
        <h2 className="text-2xl font-bold mb-6">
          Distinguished Establishments in Your Vicinity
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link href="/restaurant/garden-bistro" className="block">
            <RestaurantCard
              name="The Garden Bistro & Lounge"
              image="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
              rating={4.8}
              distance="1.2 miles away"
              time="25-35 min"
              description="Refined dining experience featuring farm-to-table cuisine in an elegant garden environment. Renowned for organic produce and seasonal culinary offerings."
              tags={["Italian Cuisine", "Fine Dining", "Organic"]}
            />
          </Link>
          <Link href="/restaurant/mamas-kitchen" className="block">
            <RestaurantCard
              name="Mama's Professional Kitchen"
              image="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
              rating={4.6}
              distance="0.8 miles away"
              time="15-25 min"
              description="Traditional comfort cuisine served in substantial portions. Family recipes preserved through generations. Inviting and accommodating atmosphere."
              tags={["Comfort Cuisine", "Local Cuisine", "Family-operated"]}
            />
          </Link>
          <Link href="/restaurant/culinary-fusion" className="block">
            <RestaurantCard
              name="Culinary Fusion"
              image="https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
              rating={4.9}
              distance="1.5 miles away"
              time="30-40 min"
              description="Modern fusion cuisine integrating Asian and Mediterranean influences. Innovative dishes with sophisticated presentation and distinctive flavor compositions."
              tags={["Fusion Cuisine", "Asian", "Premium Dining"]}
            />
          </Link>
        </div>
      </section>
    </div>
  )
}

interface RestaurantCardProps {
  name: string
  image: string
  rating: number
  distance: string
  time: string
  description: string
  tags: string[]
}

function RestaurantCard({
  name,
  image,
  rating,
  distance,
  time,
  description,
  tags,
}: RestaurantCardProps) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1 border border-gray-200">
      <div className="h-48 overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          width={500}
          height={300}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold">{name}</h3>
          <div className="flex items-center space-x-1">
            <Star className="text-yellow-500 w-4 h-4" />
            <span className="font-medium">{rating}</span>
          </div>
        </div>
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <LocationOn className="w-3 h-3 mr-1" />
          <span>{distance}</span>
          <span className="mx-2">•</span>
          <span className="flex items-center">
            <Schedule className="w-3 h-3 mr-1" />
            <span>{time}</span>
          </span>
        </div>
        <p className="text-sm text-gray-600 mb-3">{description}</p>
        <div className="flex flex-wrap gap-2 mb-3">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
