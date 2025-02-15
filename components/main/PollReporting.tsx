import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Button,
  Card,
  CardContent,
  TextField,
  Autocomplete,
  Chip,
  LinearProgress,
  IconButton,
} from "@mui/material";
import {
  PhotoCamera,
  Place,
  Report,
  CameraAlt,
  Close,
  Search,
} from "@mui/icons-material";

const predefinedConditions = [
  "Good",
  "Bad",
  "Traffic Jam",
  "Roadblock",
  "Accident",
  "Construction",
  "Flooded",
  "Slippery Road",
  "Potholes",
  "Foggy",
  "Landslide",
  "Bridge Collapse",
  "Snow Accumulation",
  "Icy Road",
  "Wildfire Nearby",
  "Hailstorm",
  "Tornado Damage",
  "Power Outage",
  "Low Visibility",
  "Heavy Rain",
  "Sandstorm",
  "Blocked Drain",
  "Oil Spill",
  "Road Under Repair",
  "Vehicle Breakdown",
  "Pedestrian Congestion",
  "Unmarked Speed Bumps",
  "Fallen Trees",
  "Stray Animals",
  "Bike Lane Blocked",
  "No Streetlights",
  "Overcrowded Area",
  "Parade or Event",
  "Festival Crowd",
  "Emergency Vehicles Nearby",
  "Police Checkpoint",
  "Bridge Closed",
  "Toll Booth Traffic",
  "One-Way Traffic",
  "Overloaded Trucks",
  "Speeding Vehicles",
  "Railway Crossing Blocked",
  "Bus Breakdown",
  "Fallen Electric Poles",
  "Protest or Demonstration",
  "Waterlogging",
  "Underground Gas Leak",
  "Fallen Rocks",
  "Detour Suggested",
  "Temporary Road Closure",
  "Long Waiting Time",
  "Unsafe Road Shoulder",
  "Bridge Swing Open",
  "Airport Traffic",
  "Highway Patrol Monitoring",
  "Wildlife Crossing",
  "Mountain Pass Blocked",
  "Fog Lights Required",
  "Truck Overturn",
  "Cyclists in Large Numbers",
  "Multiple Accidents",
  "Diverted Traffic",
  "Landslide Warning",
  "Heavy Vehicle Congestion",
  "Vehicle Fire",
  "Broken Traffic Signals",
  "Debris on Road",
  "Gas Station Overcrowded",
  "Collapsed Tunnel",
  "Tourist Rush",
  "Deserted Area",
  "Roadside Assistance Needed",
  "Excessive Dust",
  "Drowsy Driving Hotspot",
  "Speed Cameras Ahead",
  "Checkpoint Delay",
  "Dangerous Curve",
  "Sharp Turns Ahead",
  "Emergency Roadwork",
  "Weather Advisory",
  "Road Expansion Work",
  "Tunnel Blockage",
  "U-Turn Prohibited",
  "Overbridge Blocked",
  "Rerouted Public Transport",
  "Remote Area Connectivity Issue",
  "Restricted Zone",
  "Cliffside Route Caution",
  "Pedestrian Overpass Blocked",
  "Unsafe Railway Crossing",
  "Dead End",
  "Water Tanker Spillage",
  "Runaway Vehicle",
  "Truck Tire Burst",
  "Herding Animals Nearby",
  "Unmarked Road Work",
  "Sewage Overflow",
  "CCTV Surveillance in Progress",
  "Dust Storm Red Alert",
  "Public Protest Roadblock",
  "Highway Tolls Crowded",
  "Checkpost Verifications",
  "Breakdown in Fast Lane",
  "Emergency Landing Site Nearby",
];

const floatingAnimation = {
  initial: { y: 0 },
  animate: {
    y: [0, -20, 0],
    transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
  },
};

const card3DEffect = {
  whileHover: {
    rotateY: 3,
    rotateX: -2,
    scale: 1.02,
    transition: { duration: 0.3 },
  },
  whileTap: { scale: 0.98 },
};

const button3DEffect = {
  whileHover: {
    y: -2,
    scale: 1.05,
    boxShadow: "0 8px 20px -6px rgba(0,0,0,0.3)",
  },
  whileTap: { y: 1, scale: 0.98 },
};

const PollAndLiveStatus = () => {
  const [currentView, setCurrentView] = useState("poll");
  const [pollData, setPollData] = useState<
    { location: string; condition: string; image?: string }[]
  >([]);

  const handlePollSubmit = (
    location: string,
    condition: string,
    image?: string
  ) => {
    setPollData([...pollData, { location, condition, image }]);
    setCurrentView("status");
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-100 to-white relative overflow-hidden">
      <motion.div
        {...floatingAnimation}
        className="absolute w-64 h-64 bg-purple-100 rounded-full -top-32 -left-32"
      />
      <motion.div
        {...floatingAnimation}
        className="absolute w-96 h-96 bg-blue-100 rounded-full -bottom-48 -right-48"
      />

      <div className="w-full max-w-3xl mx-auto p-4 relative z-10">
        <div className="flex justify-center space-x-4 mb-8">
          <motion.div {...card3DEffect}>
            <Button
              onClick={() => setCurrentView("poll")}
              variant={currentView === "poll" ? "contained" : "outlined"}
              startIcon={<Report />}
              className="rounded-xl px-8 py-4 font-bold shadow-2xl bg-white hover:bg-gray-50 text-gray-800"
              sx={{
                "&.MuiButton-contained": {
                  background:
                    "linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)",
                  color: "white",
                },
              }}
            >
              Report Conditions
            </Button>
          </motion.div>
          <motion.div {...card3DEffect}>
            <Button
              onClick={() => setCurrentView("status")}
              variant={currentView === "status" ? "contained" : "outlined"}
              startIcon={<Place />}
              className="rounded-xl px-8 py-4 font-bold shadow-2xl bg-white hover:bg-gray-50 text-gray-800"
              sx={{
                "&.MuiButton-contained": {
                  background:
                    "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                  color: "white",
                },
              }}
            >
              Live Status
            </Button>
          </motion.div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 20, rotateX: -5 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            exit={{ opacity: 0, y: -20, rotateX: 5 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            {currentView === "poll" ? (
              <PollPage onSubmit={handlePollSubmit} />
            ) : (
              <LiveStatusPage pollData={pollData} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

const PollPage = ({
  onSubmit,
}: {
  onSubmit: (location: string, condition: string, image?: string) => void;
}) => {
  const [location, setLocation] = useState("");
  const [condition, setCondition] = useState("");
  const [image, setImage] = useState<string | undefined>();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const reader = new FileReader();
      reader.onload = (event) =>
        event.target && setImage(event.target.result as string);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleCameraCapture = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.capture = "environment";
    input.onchange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      if (target.files?.[0]) {
        const reader = new FileReader();
        reader.onload = (event) =>
          event.target && setImage(event.target.result as string);
        reader.readAsDataURL(target.files[0]);
      }
    };
    input.click();
  };

  return (
    <motion.div
      {...card3DEffect}
      className="relative"
      style={{ perspective: 1000 }}
    >
      <Card className="rounded-2xl shadow-2xl bg-white border border-gray-200">
        <CardContent className="p-6 space-y-4">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Report Road Conditions
            </h2>
            <p className="text-gray-600">
              Help others by sharing real-time updates
            </p>
          </div>

          <motion.div {...card3DEffect}>
            <TextField
              fullWidth
              label="Location"
              variant="outlined"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              InputProps={{
                startAdornment: <Place className="text-gray-400 mr-2" />,
              }}
              className="rounded-lg"
            />
          </motion.div>

          <motion.div {...card3DEffect}>
            <Autocomplete
              freeSolo
              options={predefinedConditions}
              value={condition}
              onInputChange={(_, newValue: string | null) =>
                setCondition(newValue || "")
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Condition"
                  variant="outlined"
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: <Report className="text-gray-400 mr-2" />,
                  }}
                />
              )}
              renderOption={(props, option) => (
                <li
                  {...props}
                  className="px-4 py-2 hover:bg-gray-100 text-gray-700"
                >
                  {option}
                </li>
              )}
              className="rounded-lg"
            />
          </motion.div>

          <motion.div {...card3DEffect} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Upload Photo Evidence
            </label>
            <div className="flex gap-4">
              <motion.div {...button3DEffect}>
                <Button
                  component="label"
                  variant="outlined"
                  startIcon={<PhotoCamera />}
                  className="rounded-xl flex-1 bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  Upload
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </Button>
              </motion.div>
              <motion.div {...button3DEffect}>
                <Button
                  variant="outlined"
                  startIcon={<CameraAlt />}
                  onClick={handleCameraCapture}
                  className="rounded-xl flex-1 bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  Camera
                </Button>
              </motion.div>
            </div>
          </motion.div>

          {image && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative group"
            >
              <img
                src={image}
                alt="Uploaded preview"
                className="w-full h-48 object-cover rounded-xl border-2 border-gray-200"
              />
              <IconButton
                onClick={() => setImage(undefined)}
                className="absolute top-2 right-2 bg-white/90 hover:bg-gray-100"
              >
                <Close />
              </IconButton>
            </motion.div>
          )}

          <motion.div {...button3DEffect}>
            <Button
              fullWidth
              variant="contained"
              size="large"
              onClick={() => onSubmit(location, condition, image)}
              disabled={!location || !condition}
              className="rounded-xl py-4 text-lg font-bold shadow-2xl bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-400 hover:to-blue-500"
            >
              Submit Report
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

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
    (d) =>
      (conditionCounts[d.condition] = (conditionCounts[d.condition] || 0) + 1)
  );
  const totalReports = filteredData.length;

  return (
    <motion.div
      {...card3DEffect}
      className="relative"
      style={{ perspective: 1000 }}
    >
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
            <motion.div {...card3DEffect} className="flex-1">
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
                  startAdornment: <Search className="text-gray-400 mr-2" />,
                }}
                className="rounded-lg"
              />
            </motion.div>
            <motion.div {...button3DEffect}>
              <Button
                onClick={handleSearch}
                variant="contained"
                className="rounded-xl px-8 bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-400 hover:to-green-500"
              >
                Go
              </Button>
            </motion.div>
          </div>

          {searched && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              {totalReports === 0 ? (
                <motion.div
                  {...card3DEffect}
                  className="text-center py-8 text-gray-600 bg-gray-50 rounded-xl"
                >
                  🛣️ No reports found for this location
                </motion.div>
              ) : (
                <>
                  <motion.div
                    {...card3DEffect}
                    className="bg-gray-50 rounded-xl p-4 border border-gray-200"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-lg text-gray-800">
                        {searchLocation}
                      </h3>
                      <Chip
                        label={`${totalReports} reports`}
                        className="bg-blue-100 text-blue-600 border border-blue-200"
                      />
                    </div>
                    <div className="space-y-3">
                      {Object.entries(conditionCounts).map(
                        ([condition, count]) => (
                          <motion.div
                            key={condition}
                            {...card3DEffect}
                            className="space-y-1"
                          >
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
                        )
                      )}
                    </div>
                  </motion.div>

                  {filteredData.some((d) => d.image) && (
                    <motion.div
                      {...card3DEffect}
                      className="bg-gray-50 rounded-xl p-4 border border-gray-200"
                    >
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
                              <motion.div
                                key={index}
                                {...button3DEffect}
                                className="relative"
                              >
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

export default PollAndLiveStatus;
