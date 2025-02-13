import React, { useState } from 'react';
import { Clock, AlertTriangle, ThumbsUp, Car } from 'lucide-react';

interface RouteFeature {
  id: number;
  name: string;
  probability: number;
  duration: string;
  distance: string;
  trafficLevel: 'Low' | 'Medium' | 'High';
  roadQuality: string;
  features: string[];
  imageUrl: string;
}

const CustomCard: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
    <div className="p-6">{children}</div>
  </div>
);

// Simple Google Maps Component
const SimpleMap: React.FC = () => {
  return (
    <div className="w-full h-full">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6049.881319200985!2d-74.00599351744384!3d40.71277565698254!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1652813109840!5m2!1sen!2s"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
};

const RoutePredictionPage: React.FC = () => {
  const [selectedRoute, setSelectedRoute] = useState<number>(0);

  const routes: RouteFeature[] = [
    {
      id: 1,
      name: "Route 1",
      probability: 85,
      duration: "45 mins",
      distance: "12.5 km",
      trafficLevel: "Low",
      roadQuality: "Excellent",
      features: ["Highway", "Well-lit", "Camera monitored"],
      imageUrl: "/api/placeholder/400/200"
    },
    {
      id: 2,
      name: "Route 2",
      probability: 70,
      duration: "52 mins",
      distance: "14.2 km",
      trafficLevel: "Medium",
      roadQuality: "Good",
      features: ["Scenic route", "Multiple lanes"],
      imageUrl: "/api/placeholder/400/200"
    },
    {
      id: 3,
      name: "Route 3",
      probability: 55,
      duration: "58 mins",
      distance: "13.8 km",
      trafficLevel: "High",
      roadQuality: "Fair",
      features: ["City roads", "Multiple signals"],
      imageUrl: "/api/placeholder/400/200"
    }
  ];

  const getTrafficColor = (level: 'Low' | 'Medium' | 'High'): string => {
    const colors = {
      Low: "text-green-600",
      Medium: "text-yellow-600",
      High: "text-red-600"
    };
    return colors[level] || "text-gray-600";
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Section - Route Details */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-gray-800">Recommended Routes</h1>
          
          {routes.map((route, index) => (
            <div 
              key={route.id}
              onClick={() => setSelectedRoute(index)}
              className="cursor-pointer"
            >
              <CustomCard>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">{route.name}</h2>
                  <div className="flex items-center space-x-2">
                    <ThumbsUp className={`w-5 h-5 ${selectedRoute === index ? 'text-blue-600' : 'text-gray-400'}`} />
                    <span className={`text-lg font-bold ${selectedRoute === index ? 'text-blue-600' : 'text-gray-400'}`}>
                      {route.probability}%
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-gray-500" />
                    <span>{route.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Car className="w-5 h-5 text-gray-500" />
                    <span>{route.distance}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="w-5 h-5" />
                    <span className={getTrafficColor(route.trafficLevel)}>
                      {route.trafficLevel} Traffic
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <h3 className="font-medium text-gray-700 mb-2">Route Features:</h3>
                  <div className="flex flex-wrap gap-2">
                    {route.features.map((feature, featureIndex) => (
                      <span
                        key={featureIndex}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </CustomCard>
            </div>
          ))}
        </div>

        {/* Right Section - Simple Google Maps */}
        <div className="bg-white rounded-2xl shadow-lg p-6 lg:sticky lg:top-8 h-[calc(100vh-4rem)]">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Route Map</h2>
          <div className="h-[calc(100%-4rem)] rounded-lg overflow-hidden">
            <SimpleMap />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoutePredictionPage;