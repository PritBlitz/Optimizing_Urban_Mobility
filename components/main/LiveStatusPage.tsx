import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Button,
  Card,
  CardContent,
  TextField,
  Chip,
  LinearProgress,
  IconButton,
} from "@mui/material";
import { Search } from "@mui/icons-material";
// Handle file selection



const LiveStatusPage = ({
  pollData,
}: {
  pollData: { location: string; condition: string; image?: string }[];
}) => {
  const [searchLocation, setSearchLocation] = useState("");
  const [searched, setSearched] = useState(false);
  const [filteredData, setFilteredData] = useState<typeof pollData>([]);

  const handleSearch = () => {
    const filtered = pollData.filter((data) =>
      data.location.toLowerCase().includes(searchLocation.toLowerCase())
    );
    setFilteredData(filtered);
    setSearched(true);
  };

  const conditionCounts: Record<string, number> = {};
  filteredData.forEach(
    (d) => (conditionCounts[d.condition] = (conditionCounts[d.condition] || 0) + 1)
  );
  const totalReports = filteredData.length;

  return (
    <motion.div className="relative" style={{ perspective: 1000 }}>
      <Card className="rounded-2xl shadow-2xl bg-white border border-gray-200">
        <CardContent className="p-6 space-y-4">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Live Road Status
            </h2>
            <p className="text-gray-600">
              Real-time updates from community reports
            </p>
          </div>

          <div className="flex gap-2">
            <TextField
              fullWidth
              label="Search location"
              variant="outlined"
              value={searchLocation}
              onChange={(e) => {
                setSearchLocation(e.target.value);
                setSearched(false);
              }}
              InputProps={{
                startAdornment: (
                  <IconButton>
                    <Search className="text-gray-400" />
                  </IconButton>
                ),
              }}
              className="rounded-lg"
            />
            <Button
              onClick={handleSearch}
              variant="contained"
              className="rounded-xl px-8 bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-400 hover:to-green-500"
            >
              Go
            </Button>
          </div>

          {searched && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              {totalReports === 0 ? (
                <motion.div className="text-center py-8 text-gray-600 bg-gray-50 rounded-xl">
                  🛣️ No reports found for this location
                </motion.div>
              ) : (
                <>
                  <motion.div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-lg text-gray-800">{searchLocation}</h3>
                      <Chip
                        label={`${totalReports} reports`}
                        className="bg-blue-100 text-blue-600 border border-blue-200"
                      />
                    </div>
                    <div className="space-y-3">
                      {Object.entries(conditionCounts).map(([condition, count]) => (
                        <motion.div key={condition} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-700">{condition}</span>
                            <span className="text-blue-600 font-mono">
                              {((count / totalReports) * 100).toFixed(1)}%
                            </span>
                          </div>
                          <LinearProgress
                            variant="determinate"
                            value={(count / totalReports) * 100}
                            className="h-2 rounded-full bg-gray-200"
                            sx={{
                              "& .MuiLinearProgress-bar": {
                                backgroundColor: "#3b82f6",
                              },
                            }}
                          />
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {filteredData.some((d) => d.image) && (
                    <motion.div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                      <h4 className="font-semibold mb-3 text-gray-800">
                        📸 Photo Evidence
                        <span className="text-sm text-blue-600 ml-2">
                          ({filteredData.filter((d) => d.image).length} photos)
                        </span>
                      </h4>
                      <div className="grid grid-cols-3 gap-2">
                        {filteredData.map(
                          (data, index) =>
                            data.image && (
                              <motion.div key={index} className="relative">
                                <img
                                  src={data.image}
                                  alt={`Report ${index + 1}`}
                                  className="w-full h-24 object-cover rounded-lg border border-gray-200 hover:border-blue-300"
                                />
                                <div className="absolute bottom-1 left-1 text-xs bg-white/80 px-2 py-1 rounded text-blue-600">
                                  #{index + 1}
                                </div>
                              </motion.div>
                            )
                        )}
                      </div>
                    </motion.div>
                  )}
                </>
              )}
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default LiveStatusPage;
