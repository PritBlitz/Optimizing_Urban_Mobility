import React, { useState, useEffect } from 'react';
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

const FloatingParticles: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: 20 }).map((_, i) => {
        const size = Math.random() * 6 + 4;
        const duration = Math.random() * 10 + 5;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        return (
          <div
            key={i}
            className="absolute bg-white rounded-full blur-lg opacity-40"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              top: `${y}%`,
              left: `${x}%`,
              animation: `floatUp ${duration}s infinite ease-in-out alternate`,
            }}
          />
        );
      })}
      <style>
        {`
          @keyframes floatUp {
            from {
              transform: translateY(0px);
              opacity: 0.3;
            }
            to {
              transform: translateY(-20px);
              opacity: 0.7;
            }
          }
        `}
      </style>
    </div>
  );
};

const CustomCard: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="bg-white/5 backdrop-blur-lg border border-purple-500/50 shadow-lg hover:shadow-purple-500/70 transition-all rounded-xl p-6">
    {children}
  </div>
);

const SimpleMap: React.FC = () => {
  return (
    <div className="w-full h-full">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6049.881319200985!2d-74.00599351744384!3d40.71277565698254!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1652813109840!5m2!1sen!2s"
        width="100%"
        height="100%"
        className="rounded-lg shadow-lg"
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
      Low: "text-green-400",
      Medium: "text-yellow-400",
      High: "text-red-500"
    };
    return colors[level] || "text-gray-400";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white p-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/space-bg.jpg')] bg-cover bg-center opacity-30"></div>
      <FloatingParticles />
      
      <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Section - Route Details */}
        <div className="space-y-6">
        <h1 className="text-4xl font-bold text-white tracking-wide neon-glow drop-shadow-md">
          Recommended <span className="text-purple-400">Routes</span>
          </h1>


          
          {routes.map((route, index) => (
            <div 
              key={route.id}
              onClick={() => setSelectedRoute(index)}
              className="cursor-pointer transition-all hover:scale-105"
            >
              <CustomCard>
  <div className="relative p-6 bg-gradient-to-br from-black/60 via-gray-900 to-black/80 backdrop-blur-xl border border-cyan-400/40 shadow-[0_0_20px_#00ffff44] rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_30px_#00ffff88]">
    {/* Glowing Border Animation */}
    <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent animate-pulse" />

    {/* Route Name & Probability */}
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-2xl font-semibold text-white tracking-wide drop-shadow-md">{route.name}</h2>
      <div className="flex items-center space-x-2">
        <ThumbsUp className={`w-5 h-5 ${selectedRoute === index ? 'text-cyan-300 drop-shadow-glow' : 'text-gray-500'}`} />
        <span className={`text-lg font-bold ${selectedRoute === index ? 'text-cyan-300 drop-shadow-glow' : 'text-gray-500'}`}>
          {route.probability}%
        </span>
      </div>
    </div>

    {/* Route Details */}
    <div className="grid grid-cols-2 gap-4 mb-4 text-white text-lg">
      <div className="flex items-center space-x-2">
        <Clock className="w-5 h-5 text-cyan-300" />
        <span>{route.duration}</span>
      </div>
      <div className="flex items-center space-x-2">
        <Car className="w-5 h-5 text-cyan-300" />
        <span>{route.distance}</span>
      </div>
      <div className="flex items-center space-x-2">
        <AlertTriangle className="w-5 h-5 text-red-400 animate-pulse" />
        <span className={getTrafficColor(route.trafficLevel)}>
          {route.trafficLevel} Traffic
        </span>
      </div>
    </div>
  </div>
</CustomCard>


            </div>
          ))}
        </div>

        {/* Right Section - Simple Google Maps */}
        <div className="bg-white/5 backdrop-blur-md rounded-2xl shadow-lg p-6 lg:sticky lg:top-8 h-[calc(100vh-4rem)] border border-purple-500/50">
        <h2 className="text-2xl font-bold text-cyan-300 tracking-wider uppercase drop-shadow-glow  neon-glow"> Route Map</h2>

          <div className="h-[calc(100%-4rem)] rounded-lg overflow-hidden">
            <SimpleMap />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoutePredictionPage;
