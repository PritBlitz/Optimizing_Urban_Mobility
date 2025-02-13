import React, { useState } from 'react';
import { MapPin, Navigation, Bike, Car, Truck, Bus } from 'lucide-react';

const BookingPage = () => {
  const [selectedVehicle, setSelectedVehicle] = useState('');

  const vehicles = [
    { id: 'two-wheeler', name: 'Two-Wheelers', icon: <Bike className="w-6 h-6" />, description: 'Fast & economical' },
    { id: 'three-wheeler', name: 'Three-Wheelers', icon: <Car className="w-6 h-6" />, description: 'Auto rickshaw' },
    { id: 'four-wheeler', name: 'Four-Wheelers', icon: <Car className="w-6 h-6" />, description: 'Comfortable cars' },
    { id: 'multi-axle', name: 'Multi-Axle Vehicles', icon: <Truck className="w-6 h-6" />, description: '6, 8, 10+ wheels' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
          <h1 className="text-3xl font-bold text-gray-800">Book Your Ride</h1>
          
          {/* Location Inputs */}
          <div className="space-y-4">
            <div className="relative">
              <MapPin className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Enter Pickup Location"
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="relative">
              <Navigation className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Enter Destination"
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Vehicle Selection */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-700">Select Vehicle Type</h2>
            <div className="grid grid-cols-1 gap-3">
              {vehicles.map((vehicle) => (
                <button
                  key={vehicle.id}
                  onClick={() => setSelectedVehicle(vehicle.id)}
                  className={`flex items-center p-4 border rounded-lg transition-all ${
                    selectedVehicle === vehicle.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-200 hover:bg-gray-50'
                  }`}
                >
                  <div className="bg-gray-100 p-2 rounded-lg">
                    {vehicle.icon}
                  </div>
                  <div className="ml-4 text-left">
                    <div className="font-medium text-gray-800">{vehicle.name}</div>
                    <div className="text-sm text-gray-500">{vehicle.description}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Book Now Button */}
          <button className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            Book Now
          </button>
        </div>

        {/* Right Section - Image */}
        <div className="hidden md:block">
          <div className="h-full w-full rounded-2xl overflow-hidden">
            <img
              src="/api/placeholder/600/800"
              alt="Transportation"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;