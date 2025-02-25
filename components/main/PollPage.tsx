import React, { useState, ChangeEvent ,useEffect} from "react";
import { useUser } from "@clerk/nextjs";
// const { user } = useUser();
// return <h1>Your User ID: {user?.id}</h1>;
import axios from "axios";
import { 
  Autocomplete, 
  TextField, 
  Button, 
  IconButton, 
  Radio, 
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel
} from "@mui/material";
import { motion } from "framer-motion";
import { 
  PhotoCamera, 
  Close, 
  Place, 
  ThumbUp, 
  ThumbsUpDown, 
  ThumbDown 
} from "@mui/icons-material";
import { Card, CardContent } from "@mui/material";


const predefinedConditions = [
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
// Road quality type
type RoadQuality = "good" | "medium" | "bad";

// User data interface
interface UserData {
    id: string;
    name: string;
  }
const PollPage: React.FC = () => {
  const [location, setLocation] = useState<string>("");
  const [condition, setCondition] = useState<string>("");
  const [roadQuality, setRoadQuality] = useState<RoadQuality>("medium");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserData | null>(null);

  // Get user data from local storage on component mount
  useEffect(() => {
    try {
      const storedUserId = localStorage.getItem('userId');
      const storedUserName = localStorage.getItem('userName');
      
      if (storedUserId && storedUserName) {
        setUserData({
          id: storedUserId,
          name: storedUserName
        });
      }
    } catch (error) {
      console.error("Error accessing localStorage:", error);
    }
  }, []);


  // Handle file selection
  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      setImage(file);

      // Preview Image
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setPreview(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle road quality change
  const handleRoadQualityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRoadQuality(event.target.value as RoadQuality);
  };

  // Handle submitting data to API
  const handleSubmit = async () => {
    if (!location || !condition) return alert("Please fill all required fields!");

    const formData = new FormData();
    formData.append("location", location);
    formData.append("condition", condition);
    formData.append("roadQuality", roadQuality);

    if (userData) {
        formData.append("userId", userData.id);
        formData.append("userName", userData.name);
      }
    if (image) formData.append("image", image);

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Report Submitted Successfully!");
      console.log(response.data);
    } catch (error) {
      console.error("Error uploading data:", error);
      alert("Failed to submit report.");
    }
    setLoading(false);
  };

  return (
    <motion.div className="relative">
      <Card className="rounded-2xl shadow-2xl bg-white border border-gray-200">
        <CardContent className="p-6 space-y-4">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Report Road Conditions</h2>
            <p className="text-gray-600">Help others by sharing real-time updates</p>
          </div>

          {/* Location Input */}
          <motion.div>
            <TextField
              fullWidth
              label="Location"
              variant="outlined"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              InputProps={{ startAdornment: <Place className="text-gray-400 mr-2" /> }}
            />
          </motion.div>

          {/* Road Quality Selector */}
          <motion.div>
            <FormControl component="fieldset">
              <FormLabel component="legend" className="text-gray-700 mb-2">Road Quality</FormLabel>
              <RadioGroup
                row
                aria-label="road-quality"
                name="road-quality"
                value={roadQuality}
                onChange={handleRoadQualityChange}
              >
                <FormControlLabel
                  value="good"
                  control={<Radio color="success" />}
                  label={
                    <div className="flex items-center gap-1">
                      <ThumbUp className="text-green-500" />
                      <span>Good</span>
                    </div>
                  }
                  className="mr-4"
                />
                <FormControlLabel
                  value="medium"
                  control={<Radio color="warning" />}
                  label={
                    <div className="flex items-center gap-1">
                      <ThumbsUpDown className="text-amber-500" />
                      <span>Medium</span>
                    </div>
                  }
                  className="mr-4"
                />
                <FormControlLabel
                  value="bad"
                  control={<Radio color="error" />}
                  label={
                    <div className="flex items-center gap-1">
                      <ThumbDown className="text-red-500" />
                      <span>Bad</span>
                    </div>
                  }
                />
              </RadioGroup>
            </FormControl>
          </motion.div>

          {/* Condition Selector */}
          <motion.div>
            <Autocomplete
              freeSolo
              options={predefinedConditions}
              value={condition}
              onInputChange={(_, newValue: string | null) => setCondition(newValue || "")}
              renderInput={(params) => <TextField {...params} label="Select Condition" variant="outlined" fullWidth />}
            />
          </motion.div>

          {/* Image Upload */}
          <motion.div>
            <label className="block text-sm font-medium text-gray-700">Upload Photo Evidence</label>
            <div className="flex gap-4">
              <Button component="label" variant="outlined" startIcon={<PhotoCamera />}>
                Upload
                <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
              </Button>
            </div>
          </motion.div>

          {/* Image Preview */}
          {preview && (
            <motion.div className="relative">
              <img src={preview} alt="Uploaded preview" className="w-full h-48 object-cover rounded-xl border-2 border-gray-200" />
              <IconButton 
                onClick={() => { setImage(null); setPreview(null); }} 
                className="absolute top-2 right-2 bg-white/90 hover:bg-gray-100"
              >
                <Close />
              </IconButton>
            </motion.div>
          )}

          {/* Submit Button */}
          <motion.div>
            <Button 
              fullWidth 
              variant="contained" 
              onClick={handleSubmit} 
              disabled={loading} 
              className="rounded-xl bg-blue-500 text-white"
            >
              {loading ? "Submitting..." : "Submit Report"}
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PollPage;