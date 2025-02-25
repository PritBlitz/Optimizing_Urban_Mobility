import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Button,
  Card,
  CardContent,
  TextField,
  Chip,
  LinearProgress,
  IconButton,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { Search, LocationOn, Warning, CheckCircle, Info, AccessTime } from "@mui/icons-material";

interface PollData {
  id: number;
  name: string;
  location: string;
  roadQuality: string;
  roadCondition: string;
  userID: string;
  createdAt: Date;
  image?: string;
}

const LiveStatusPage: React.FC = () => {
  const [searchLocation, setSearchLocation] = useState("");
  const [searched, setSearched] = useState(false);
  const [filteredData, setFilteredData] = useState<PollData[]>([]);
  const [loading, setLoading] = useState(false);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  // Convert timestamp to "X hours ago"
  const timeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    
    if (hours > 2) return null; // Only show data within 2 hours
  
    if (hours >= 1) return `${hours} hours ${minutes % 60} minutes ago`;
    return `${minutes} minutes ago`;
  };

  // Get color based on road condition
  const getConditionColor = (condition: string) => {
    const conditionMap: Record<string, string> = {
      "Clear": "#10b981", // green
      "Minor Issues": "#f59e0b", // amber
      "Major Issues": "#ef4444", // red
      "Closed": "#6b7280", // gray
      "Flooded": "#3b82f6", // blue
      "Construction": "#f97316", // orange
      "Accident": "#dc2626", // red
    };
    
    return conditionMap[condition] || "#8b5cf6"; // default purple
  };

  // Get icon based on road condition
  const getConditionIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "clear":
        return <CheckCircle />;
      case "minor issues":
      case "major issues":
        return <Warning />;
      case "closed":
      case "construction":
      case "accident":
        return <Warning />;
      default:
        return <Info />;
    }
  };

  // Fetch events based on location using the actual API
  const handleSearch = async () => {
    if (!searchLocation) return;

    setLoading(true);
    setSearched(true);
    setFilteredData([]);

    try {
      const response = await fetch(`http://localhost:8080/events/location/${searchLocation}`);
      const apiData = await response.json();

      // Map API response & filter events within last 2 hours
      const mappedData = apiData
        .map((item: any) => ({
          id: item.id,
          name: item.name,
          location: item.location,
          roadQuality: item.roadQuality,
          roadCondition: item.roadCondition,
          userID: item.userID,
          createdAt: new Date(item.createdAt),
          image: item.poster ? `data:image/jpeg;base64,${item.poster}` : undefined,
        }))
        .filter((data: PollData) => timeAgo(data.createdAt) !== null);

      setFilteredData(mappedData);
    } catch (error) {
      console.error("Error fetching data:", error);
      setFilteredData([]);
    } finally {
      setLoading(false);
    }
  };

  // Count conditions
  const conditionCounts: Record<string, number> = {};
  filteredData.forEach(
    (d) => (conditionCounts[d.roadCondition] = (conditionCounts[d.roadCondition] || 0) + 1)
  );
  const totalReports = filteredData.length;

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: { 
        delay: i * 0.1,
        duration: 0.5,
        type: "spring",
        stiffness: 100
      }
    }),
    hover: { 
      scale: 1.02,
      boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
      transition: { duration: 0.2 }
    }
  };

  return (
    <motion.div 
      className="relative min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      style={{ 
        perspective: 1000,
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        padding: "2rem 1rem"
      }}
    >
      <motion.div
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="max-w-4xl mx-auto"
      >
        <Card className="rounded-3xl shadow-2xl overflow-hidden border-none">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-center"
            >
              <h2 className="text-3xl font-bold mb-2">Live Road Status</h2>
              <p className="text-blue-100">Real-time updates from community reports</p>
            </motion.div>
          </div>
          
          <CardContent className="p-6 space-y-6">
            {/* Search Bar */}
            <motion.div 
              className="flex gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <TextField
                fullWidth
                label="Enter location"
                variant="outlined"
                value={searchLocation}
                onChange={(e) => {
                  setSearchLocation(e.target.value);
                  setSearched(false);
                }}
                InputProps={{
                  startAdornment: (
                    <IconButton>
                      <LocationOn className="text-blue-500" />
                    </IconButton>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    "&:hover fieldset": {
                      borderColor: "#3b82f6",
                    },
                  }
                }}
              />
              <Button
                onClick={handleSearch}
                variant="contained"
                disabled={loading}
                sx={{
                  borderRadius: "12px",
                  background: "linear-gradient(90deg, #3b82f6 0%, #4f46e5 100%)",
                  padding: "0 24px",
                  boxShadow: "0 4px 14px rgba(59, 130, 246, 0.4)",
                  minWidth: "120px",
                  "&:hover": {
                    background: "linear-gradient(90deg, #60a5fa 0%, #5e54e9 100%)",
                  }
                }}
              >
                {loading ? "Searching..." : "Search"}
              </Button>
            </motion.div>

            {/* Loading state */}
            <Backdrop
              sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={loading}
            >
              <CircularProgress color="inherit" />
            </Backdrop>

            {/* Results */}
            <AnimatePresence>
              {searched && !loading && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  {totalReports === 0 ? (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-12 text-gray-600"
                    >
                      <motion.div
                        animate={{ 
                          scale: [1, 1.05, 1],
                          rotate: [0, 2, -2, 0] 
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          repeatType: "reverse" 
                        }}
                        className="text-5xl mb-4"
                      >
                        🛣️
                      </motion.div>
                      <h3 className="text-xl font-medium mb-2">No recent reports found</h3>
                      <p className="text-gray-500">Try another location or check back later</p>
                    </motion.div>
                  ) : (
                    <>
                      {/* Statistics */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white rounded-2xl p-5 border border-gray-100 shadow-lg"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center">
                            <LocationOn className="text-blue-500 mr-2" />
                            <h3 className="font-bold text-lg text-gray-800">{searchLocation}</h3>
                          </div>
                          <Chip
                            label={`${totalReports} reports`}
                            sx={{
                              backgroundColor: 'rgba(59, 130, 246, 0.1)',
                              color: '#3b82f6',
                              fontWeight: 600,
                              border: '1px solid rgba(59, 130, 246, 0.2)',
                              borderRadius: '8px',
                            }}
                          />
                        </div>
                        <div className="space-y-4">
                          {Object.entries(conditionCounts).map(([condition, count]) => (
                            <motion.div 
                              key={condition} 
                              className="space-y-1"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.3 }}
                            >
                              <div className="flex justify-between items-center text-sm mb-1">
                                <div className="flex items-center">
                                  <div 
                                    className="w-3 h-3 rounded-full mr-2" 
                                    style={{ backgroundColor: getConditionColor(condition) }}
                                  />
                                  <span className="text-gray-700 font-medium">{condition}</span>
                                </div>
                                <span className="text-blue-600 font-medium">
                                  {((count / totalReports) * 100).toFixed(1)}%
                                </span>
                              </div>
                              <LinearProgress
                                variant="determinate"
                                value={(count / totalReports) * 100}
                                sx={{
                                  height: 8,
                                  borderRadius: 4,
                                  backgroundColor: 'rgba(209, 213, 219, 0.5)',
                                  '& .MuiLinearProgress-bar': {
                                    backgroundColor: getConditionColor(condition),
                                    borderRadius: 4,
                                  },
                                }}
                              />
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>

                      {/* Reports List */}
                      <motion.div className="space-y-4">
                        {filteredData.map((data, index) => (
                          <motion.div
                            key={data.id}
                            custom={index}
                            initial="hidden"
                            animate="visible"
                            whileHover="hover"
                            variants={cardVariants}
                            className={`p-5 rounded-2xl shadow-md transition-all ${
                              expandedCard === data.id 
                                ? "border-2 border-blue-500" 
                                : "border border-gray-100"
                            }`}
                            style={{ 
                              backgroundColor: 'white',
                              cursor: 'pointer'
                            }}
                            onClick={() => setExpandedCard(expandedCard === data.id ? null : data.id)}
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-bold text-gray-800 text-lg flex items-center">
                                  {data.name}
                                  <div 
                                    className="ml-2 p-1 rounded-full" 
                                    style={{ backgroundColor: getConditionColor(data.roadCondition) + '20' }}
                                  >
                                    {getConditionIcon(data.roadCondition)}
                                  </div>
                                </h4>
                                <p className="text-sm text-gray-600 mt-1">{data.location}</p>
                              </div>
                              <Chip
                                size="small"
                                label={data.roadCondition}
                                sx={{
                                  backgroundColor: getConditionColor(data.roadCondition) + '20',
                                  color: getConditionColor(data.roadCondition),
                                  fontWeight: 600,
                                  borderRadius: '8px',
                                }}
                              />
                            </div>
                            
                            <div className="flex items-center text-xs text-gray-500 mt-3">
                              <AccessTime fontSize="small" sx={{ fontSize: 14, marginRight: 0.5 }} />
                              <span>{timeAgo(data.createdAt)}</span>
                            </div>

                            <AnimatePresence>
                              {data.image && expandedCard === data.id && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="mt-3"
                                >
                                  <img
                                    src={data.image}
                                    alt={`Report by ${data.name}`}
                                    className="w-full h-48 object-cover rounded-lg border border-gray-200 mt-2"
                                  />
                                  <div className="mt-2 text-sm">
                                    <p><span className="font-medium">Road Quality:</span> {data.roadQuality}</p>
                                    <p><span className="font-medium">Condition:</span> {data.roadCondition}</p>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.div>
                        ))}
                      </motion.div>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default LiveStatusPage;