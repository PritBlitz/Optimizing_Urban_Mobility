"use client";

import React, { useState } from "react";
import { MapPin, Navigation, Bike, Car, Truck } from "lucide-react";
import Link from "next/link";

const BookingPage = () => {
  const [selectedVehicle, setSelectedVehicle] = useState("");

  const vehicles = [
    { id: "two-wheeler", name: "Two-Wheelers", icon: <Bike className="w-6 h-6 text-cyan-400" />, description: "Fast & economical" },
    { id: "three-wheeler", name: "Three-Wheelers", icon: <Car className="w-6 h-6 text-cyan-400" />, description: "Auto rickshaw" },
    { id: "four-wheeler", name: "Four-Wheelers", icon: <Car className="w-6 h-6 text-cyan-400" />, description: "Comfortable cars" },
    { id: "multi-axle", name: "Multi-Axle Vehicles", icon: <Truck className="w-6 h-6 text-cyan-400" />, description: "6, 8, 10+ wheels" },
  ];

  return (
    <div className="min-h-screen bg-[#0a0f1e] p-8 relative overflow-hidden">
      {/* Floating Glow Effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-72 h-72 bg-cyan-500 opacity-20 blur-3xl top-10 left-20 rounded-full"></div>
        <div className="absolute w-96 h-96 bg-purple-600 opacity-20 blur-3xl bottom-20 right-20 rounded-full"></div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        {/* Left Section */}
        <div className="bg-opacity-20 bg-white backdrop-blur-md rounded-2xl shadow-xl p-6 space-y-6 border border-gray-500/20">
          <h1 className="text-3xl font-bold text-white neon-glow">Book Your Ride</h1>

          {/* Location Inputs */}
          <div className="space-y-6">
  <div className="relative group">
    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400 transition-all duration-300 group-focus-within:scale-110" />
    <input
      type="text"
      placeholder="Enter Pickup Location"
      className="w-full pl-12 pr-4 py-3 bg-transparent border border-gray-600 rounded-lg text-white transition-all duration-300 ease-in-out focus:ring-2 focus:ring-cyan-500 focus:border-cyan-400 focus:shadow-lg focus:shadow-cyan-500/30 group-hover:border-cyan-300 group-hover:shadow-md group-hover:shadow-cyan-500/20"
    />
  </div>

  <div className="relative group">
    <Navigation className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400 transition-all duration-300 group-focus-within:scale-110" />
    <input
      type="text"
      placeholder="Enter Destination"
      className="w-full pl-12 pr-4 py-3 bg-transparent border border-gray-600 rounded-lg text-white transition-all duration-300 ease-in-out focus:ring-2 focus:ring-cyan-500 focus:border-cyan-400 focus:shadow-lg focus:shadow-cyan-500/30 group-hover:border-cyan-300 group-hover:shadow-md group-hover:shadow-cyan-500/20"
    />
  </div>
</div>


          {/* Vehicle Selection */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-cyan-400">Select Vehicle Type</h2>
            <div className="grid grid-cols-1 gap-3">
              {vehicles.map((vehicle) => (
                <button
                  key={vehicle.id}
                  onClick={() => setSelectedVehicle(vehicle.id)}
                  className={`flex items-center p-4 border border-gray-600 rounded-lg transition-all ${
                    selectedVehicle === vehicle.id
                      ? "border-cyan-500 bg-cyan-900/20 shadow-lg shadow-cyan-500/20"
                      : "hover:border-cyan-400 hover:bg-cyan-900/10"
                  }`}
                >
                  <div className="bg-gray-800 p-2 rounded-lg">{vehicle.icon}</div>
                  <div className="ml-4 text-left">
                    <div className="font-medium text-white">{vehicle.name}</div>
                    <div className="text-sm text-gray-400">{vehicle.description}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Book Now Button */}
          <Link
            href="/pre"
            className="w-full bg-cyan-600 text-white py-4 rounded-lg font-semibold hover:bg-cyan-500 transition-all block text-center shadow-md hover:shadow-cyan-400/50"
          >
            Find Best Routes
          </Link>
        </div>

        {/* Right Section - Image */}
        <div className="hidden md:block">
          <div className="h-full w-full rounded-2xl overflow-hidden border border-gray-600 shadow-lg shadow-gray-500/10">
            <img src="travel.webp" alt="Transportation" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
